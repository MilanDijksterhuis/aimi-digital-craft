import "./lib/error-capture";

import { brotliCompress, constants as zlibConstants, gzip } from "node:zlib";
import { promisify } from "node:util";

const brotliCompressAsync = promisify(brotliCompress);
const gzipAsync = promisify(gzip);
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { checkRateLimit, getClientIp, isIpBanned, recordStrike } from "./lib/rate-limit";

// Zelfde UID als track.js gebruikt (zie __root.tsx) — zo komen server-side
// crashes (bv. deze catastrophale SSR-fouten) ook in het Alerts-scherm
// terecht, ipv alleen in server-logs die niemand live inziet.
const SITE_TRACK_UID = "6a34e404-ba3e-42d4-965c-62d04aef0f93";

async function logServerCrash(error: unknown, request: Request): Promise<void> {
  try {
    const { supabaseAdmin } = await import("./integrations/supabase/client.server");
    const message =
      error instanceof Error ? `${error.message}\n${error.stack ?? ""}` : String(error);
    await supabaseAdmin.from("site_errors").insert({
      user_id: SITE_TRACK_UID,
      message: `ServerCrash [${request.method} ${new URL(request.url).pathname}]: ${message}`.slice(
        0,
        1900,
      ),
      url: request.url,
    });
  } catch {
    /* logging mag nooit de eigenlijke error-response blokkeren */
  }
}

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry),
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
async function normalizeCatastrophicSsrResponse(
  response: Response,
  request: Request,
): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  const captured = consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`);
  console.error(captured);
  await logServerCrash(captured, request);
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
    "connect-src 'self' https://*.supabase.co https://calendly.com",
    "style-src 'self' 'unsafe-inline'",
    // 'unsafe-inline' is nodig omdat TanStack Start zijn SSR-hydration bootstrap
    // (window.$_TSR) als inline <script> injecteert — zonder deze toestemming
    // faalt hydration op elke pagina (zwart scherm). We hebben geen
    // dangerouslySetInnerHTML met user-content of andere plek waar user-input
    // in een <script> terechtkomt (zie security-audit), dus het reële
    // aanvalsoppervlak hiervan is beperkt tot als er ooit wél zo'n plek bijkomt.
    "script-src 'self' 'unsafe-inline' https://assets.calendly.com",
    "frame-src 'self' https://calendly.com",
    "font-src 'self'",
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

// Content-gehashte build-assets (Vite emit onder /assets/, /_build/) en de
// self-hosted fonts veranderen alleen als hun inhoud verandert. Geef ze een
// lange immutable cache zodat herhaalbezoeken ze niet opnieuw downloaden.
// (Lighthouse markeerde de hero-image met cache-TTL "None".)
const IMMUTABLE_ASSET_RE = /^\/(assets|_build)\/|^\/fonts\/.+\.woff2$/;
// Statische publieke bestanden die zelden wijzigen maar niet content-gehasht
// zijn — kortere, niet-immutable cache zodat een update niet dagenlang stale
// blijft, maar herhaalbezoeken ze wél uit de browsercache krijgen.
const SHORT_CACHE_ASSET_RE =
  /^\/(og-image\.(png|svg)|favicon\.(svg|ico)|apple-touch-icon\.png|aimi-logo\.png|icon-(192|512)\.png|robots\.txt|llms\.txt|manifest\.json)$/;

function applyAssetCaching(response: Response, request: Request): void {
  if (request.method !== "GET" && request.method !== "HEAD") return;
  if (response.status !== 200) return;
  if (response.headers.has("Cache-Control")) return;
  let pathname: string;
  try {
    pathname = new URL(request.url).pathname;
  } catch {
    return;
  }
  if (IMMUTABLE_ASSET_RE.test(pathname)) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (SHORT_CACHE_ASSET_RE.test(pathname)) {
    response.headers.set("Cache-Control", "public, max-age=3600");
  }
}

// SEO-audit 2026-09-02/03 (technical.md "Static JS/CSS assets served with no
// compression at all"): nginx serves /assets/ uncompressed and we have no
// access to that VPS config from this repo. Compress here instead, at the
// app layer that already wraps every response — no nginx change needed.
// Content-hashed assets never change, so a small in-memory cache per
// pathname+encoding avoids recompressing the same bytes on every request;
// it's bounded by the build's asset count and clears on the next deploy's
// process restart.
const COMPRESSIBLE_CONTENT_TYPE_RE =
  /^(application\/javascript|text\/javascript|text\/css|application\/json|image\/svg\+xml|text\/plain|(application|text)\/xml)\b/i;
const MIN_COMPRESSIBLE_BYTES = 512; // niet de moeite voor hele kleine bestanden
const compressedAssetCache = new Map<string, Uint8Array>();
// Voorkomt dat meerdere gelijktijdige requests voor hetzelfde nog-niet-
// gecachte asset elk hun eigen compressie starten (typisch vlak na een
// deploy-restart, wanneer meerdere crawler-/bezoekerrequests dezelfde
// gedeelde JS-chunk tegelijk opvragen).
const compressionInFlight = new Map<string, Promise<Uint8Array | null>>();

function pickEncoding(acceptEncoding: string): "br" | "gzip" | null {
  if (/\bbr\b/.test(acceptEncoding)) return "br";
  if (/\bgzip\b/.test(acceptEncoding)) return "gzip";
  return null;
}

async function compressStaticAsset(response: Response, request: Request): Promise<Response> {
  if (request.method !== "GET") return response;
  if (response.status !== 200) return response;
  if (response.headers.has("Content-Encoding")) return response;

  const contentType = response.headers.get("content-type") ?? "";
  if (!COMPRESSIBLE_CONTENT_TYPE_RE.test(contentType)) return response;

  let pathname: string;
  try {
    pathname = new URL(request.url).pathname;
  } catch {
    return response;
  }
  // Alleen content-gehashte/statische build-assets: HTML/SSR-responses lopen
  // hier expres niet doorheen (die zijn per-request uniek, dus geen bruikbare
  // cache-sleutel en het risico dat gevoelige headers/Server-Timing per
  // request verschillen is niet de moeite van dit optimalisatiepad waard).
  if (!IMMUTABLE_ASSET_RE.test(pathname) && !SHORT_CACHE_ASSET_RE.test(pathname)) return response;

  const acceptEncoding = request.headers.get("accept-encoding") ?? "";
  const encoding = pickEncoding(acceptEncoding);
  if (!encoding) return response;

  const cacheKey = `${encoding}:${pathname}`;
  let compressed: Uint8Array | null = compressedAssetCache.get(cacheKey) ?? null;

  if (!compressed) {
    let inFlight = compressionInFlight.get(cacheKey);
    if (!inFlight) {
      inFlight = (async () => {
        const buf = new Uint8Array(await response.clone().arrayBuffer());
        if (buf.byteLength < MIN_COMPRESSIBLE_BYTES) return null;
        // Async i.p.v. *Sync: brotli op quality 11 kan bij een bundel van
        // honderden KB's merkbaar duren, en de *Sync-varianten blokkeren de
        // event loop volledig zolang ze draaien — elke andere gelijktijdige
        // request zou dan stilstaan, met name direct na een deploy-restart
        // wanneer de cache nog leeg is. De async variant draait via libuv's
        // threadpool, dus de rest van de server blijft intussen bereikbaar.
        const result =
          encoding === "br"
            ? await brotliCompressAsync(buf, {
                params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 11 },
              })
            : await gzipAsync(buf, { level: 9 });
        // Alleen cachen als het écht kleiner is — voorkomt dat al-gecomprimeerde
        // of ongunstige inhoud permanent (nutteloos) in het geheugen blijft staan.
        if (result.byteLength >= buf.byteLength) return null;
        compressedAssetCache.set(cacheKey, result);
        return result;
      })().finally(() => compressionInFlight.delete(cacheKey));
      compressionInFlight.set(cacheKey, inFlight);
    }
    compressed = await inFlight;
    if (!compressed) return response;
  }

  const headers = new Headers(response.headers);
  headers.set("Content-Encoding", encoding);
  headers.set("Content-Length", String(compressed.byteLength));
  headers.append("Vary", "Accept-Encoding");
  return new Response(compressed as BodyInit, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function applySecurityHeaders(response: Response, request: Request): Response {
  try {
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) response.headers.set(k, v);
    applyAssetCaching(response, request);
    // HSTS alleen over https, zodat lokale http-dev niet breekt.
    if (isHttps(request)) {
      response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }
    // 404's mogen niet geïndexeerd worden; via een header werkt dit ook als
    // Googlebot de pagina niet (volledig) rendert.
    if (response.status === 404) {
      response.headers.set("X-Robots-Tag", "noindex");
    }
  } catch {
    /* immutable headers op sommige responses — dan overslaan */
  }
  return response;
}

async function applyRateLimit(request: Request): Promise<Response | null> {
  if (request.method !== "POST" && request.method !== "PUT") return null;

  const ip = getClientIp(request);

  // Geblokkeerde IP's worden geweigerd voor state-changing requests. We
  // beperken dit tot POST/PUT (ipv alle methodes): mobiele providers delen
  // vaak één publiek IP over veel klanten (CGNAT), dus een ban op GET
  // blokkeerde daarmee de hele pagina (incl. inloggen) voor onschuldige
  // mobiele gebruikers op hetzelfde IP als een eerdere misbruiker.
  const ban = await isIpBanned(ip);
  if (ban.banned) {
    console.warn(
      `[security] geweigerd (ban actief) ip=${ip} retryAfter=${ban.retryAfter}s path=${new URL(request.url).pathname}`,
    );
    return rateLimitedResponse(ban.retryAfter);
  }

  const url = new URL(request.url);
  const path = url.pathname;

  // Contact form server function and site-error: strict limit
  if (path.includes("submitContactForm") || path === "/api/public/site-error") {
    const { allowed, retryAfter } = await checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
    if (!allowed) {
      await recordStrike(ip);
      console.warn(
        `[security] rate limit overschreden ip=${ip} path=${new URL(request.url).pathname}`,
      );
      return rateLimitedResponse(retryAfter);
    }
    return null;
  }

  // Website Checker: doet een server-side fetch naar een door de gebruiker
  // opgegeven URL (SSRF-gevoelig) en is duur (netwerk-IO) — extra strikte
  // limiet hier bovenop de per-ip-hash limiet in checkWebsite zelf.
  if (path.includes("checkWebsite")) {
    const { allowed, retryAfter } = await checkRateLimit(
      `website-check-ip:${ip}`,
      5,
      60 * 60 * 1000,
    );
    if (!allowed) {
      console.warn(`[security] website-checker rate limit overschreden ip=${ip}`);
      return rateLimitedResponse(retryAfter);
    }
    return null;
  }

  // All other POST/PUT endpoints: moderate limit
  const { allowed, retryAfter } = await checkRateLimit(`general:${ip}`, 30, 60 * 1000);
  if (!allowed) {
    await recordStrike(ip);
    return rateLimitedResponse(retryAfter);
  }
  return null;
}

const NOT_FOUND_TITLE = "Pagina niet gevonden — AIMI";

/**
 * A-35: op een 404 staan er twee <title>-tags in de SSR-HTML — eerst de
 * root-default uit __root.tsx (via HeadContent), daarna de titel die React 19
 * vanuit NotFoundComponent naar de head hoist. Browsers en crawlers gebruiken
 * de *eerste*, dus zonder deze correctie draagt elke 404 de homepagetitel.
 *
 * We vervangen daarom de eerste titel en gooien de rest weg. Dit gebeurt hier
 * en niet in de component, omdat de volgorde van head-elementen niet vanuit
 * React te sturen is.
 */
async function fixNotFoundTitle(response: Response): Promise<Response> {
  if (response.status !== 404) return response;
  const type = response.headers.get("content-type") ?? "";
  if (!type.includes("text/html")) return response;

  try {
    const html = await response.text();
    let replaced = false;
    const patched = html.replace(/<title>[\s\S]*?<\/title>/g, (match) => {
      if (!replaced) {
        replaced = true;
        return `<title>${NOT_FOUND_TITLE}</title>`;
      }
      return ""; // duplicaat: weg ermee
    });
    return new Response(patched, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch {
    return response;
  }
}

/**
 * Trailing slash: /contact/ hoort permanent naar /contact te wijzen.
 * Productie gaf hier een 307 (tijdelijk). Een 307 vertelt Google dat de
 * situatie kan veranderen, dus consolideert hij de signalen niet en blijft hij
 * beide vormen crawlen. Voor een canonieke URL-vorm hoort dat een 301 te zijn.
 *
 * Alleen voor GET/HEAD op niet-API-paden: een 301 op een POST zou de methode
 * omzetten naar GET en het formulier stilzwijgend slopen.
 */
function redirectTrailingSlash(request: Request): Response | null {
  if (request.method !== "GET" && request.method !== "HEAD") return null;

  const url = new URL(request.url);
  if (url.pathname === "/" || !url.pathname.endsWith("/")) return null;
  if (url.pathname.startsWith("/api/")) return null;

  url.pathname = url.pathname.replace(/\/+$/, "");
  return new Response(null, { status: 301, headers: { Location: url.toString() } });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const slashRedirect = redirectTrailingSlash(request);
    if (slashRedirect) return applySecurityHeaders(slashRedirect, request);

    const limited = await applyRateLimit(request);
    if (limited) return applySecurityHeaders(limited, request);

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response, request);
      const titled = await fixNotFoundTitle(normalized);
      const secured = applySecurityHeaders(titled, request);
      return await compressStaticAsset(secured, request);
    } catch (error) {
      console.error(error);
      await logServerCrash(error, request);
      return applySecurityHeaders(brandedErrorResponse(), request);
    }
  },
};
