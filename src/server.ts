import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { checkRateLimit, getClientIp, isIpBanned, recordStrike } from "./lib/rate-limit";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

function rateLimitedResponse(retryAfter: number): Response {
  return new Response(JSON.stringify({ error: "Too many requests" }), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(retryAfter),
    },
  });
}

// Security headers — defense-in-depth tegen clickjacking, MIME-sniffing,
// referrer-lek en om HTTPS af te dwingen (HSTS, alleen over https).
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-DNS-Prefetch-Control": "off",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    "img-src 'self' data: https://*.supabase.co",
    "connect-src 'self' https://*.supabase.co",
    "style-src 'self' 'unsafe-inline'",
    // 'unsafe-inline' is nodig omdat TanStack Start zijn SSR-hydration bootstrap
    // (window.$_TSR) als inline <script> injecteert — zonder deze toestemming
    // faalt hydration op elke pagina (zwart scherm). We hebben geen
    // dangerouslySetInnerHTML met user-content of andere plek waar user-input
    // in een <script> terechtkomt (zie security-audit), dus het reële
    // aanvalsoppervlak hiervan is beperkt tot als er ooit wél zo'n plek bijkomt.
    "script-src 'self' 'unsafe-inline'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "object-src 'none'",
  ].join("; "),
};

function isHttps(request: Request): boolean {
  const proto = request.headers.get("x-forwarded-proto");
  if (proto) return proto.split(",")[0].trim() === "https";
  try {
    return new URL(request.url).protocol === "https:";
  } catch {
    return false;
  }
}

function applySecurityHeaders(response: Response, request: Request): Response {
  try {
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) response.headers.set(k, v);
    // HSTS alleen over https, zodat lokale http-dev niet breekt.
    if (isHttps(request)) {
      response.headers.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains",
      );
    }
  } catch {
    /* immutable headers op sommige responses — dan overslaan */
  }
  return response;
}

function applyRateLimit(request: Request): Response | null {
  const ip = getClientIp(request);

  // Geblokkeerde IP's worden direct geweigerd, ongeacht methode
  const ban = isIpBanned(ip);
  if (ban.banned) {
    console.warn(`[security] geweigerd (ban actief) ip=${ip} retryAfter=${ban.retryAfter}s path=${new URL(request.url).pathname}`);
    return rateLimitedResponse(ban.retryAfter);
  }

  if (request.method !== "POST" && request.method !== "PUT") return null;

  const url = new URL(request.url);
  const path = url.pathname;

  // Contact form server function and site-error: strict limit
  if (path.includes("submitContactForm") || path === "/api/public/site-error") {
    const { allowed, retryAfter } = checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
    if (!allowed) {
      recordStrike(ip);
      console.warn(`[security] rate limit overschreden ip=${ip} path=${new URL(request.url).pathname}`);
      return rateLimitedResponse(retryAfter);
    }
    return null;
  }

  // All other POST/PUT endpoints: moderate limit
  const { allowed, retryAfter } = checkRateLimit(`general:${ip}`, 30, 60 * 1000);
  if (!allowed) {
    recordStrike(ip);
    return rateLimitedResponse(retryAfter);
  }
  return null;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const limited = applyRateLimit(request);
    if (limited) return applySecurityHeaders(limited, request);

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return applySecurityHeaders(normalized, request);
    } catch (error) {
      console.error(error);
      return applySecurityHeaders(brandedErrorResponse(), request);
    }
  },
};
