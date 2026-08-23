import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createHash } from "node:crypto";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { runWebsiteCheck } from "@/lib/website-checker.server";

const UrlInput = z.object({
  url: z
    .string()
    .trim()
    .min(1)
    .max(2048)
    .transform((val) => (/^https?:\/\//i.test(val) ? val : `https://${val}`))
    .refine((val) => {
      try {
        const u = new URL(val);
        return u.protocol === "http:" || u.protocol === "https:";
      } catch {
        return false;
      }
    }, "Vul een geldige website-URL in."),
});

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "aimi-website-checker-fallback-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export const checkWebsite = createServerFn({ method: "POST" })
  .inputValidator((d) => UrlInput.parse(d))
  .handler(async ({ data }) => {
    const request = getRequest();
    const ip = request ? getClientIp(request) : "unknown";
    const ipHash = hashIp(ip);

    // SEC-7: max 5 checks per IP per uur. Gebruikt dezelfde duurzame,
    // gedeelde Postgres rate-limiter als de rest van de site (SEC-5), zodat
    // de limiet standhoudt over meerdere PM2-instances en een deploy
    // overleeft. Fail-open bij DB-problemen, net als elders in de codebase.
    const { allowed, retryAfter } = await checkRateLimit(`website-check:${ipHash}`, 5, 60 * 60 * 1000);
    if (!allowed) {
      throw new Error(`RATE_LIMITED:${retryAfter}`);
    }

    const report = await runWebsiteCheck(data.url);

    // Best-effort opslag; een DB-fout mag de bezoeker de scan niet onthouden.
    try {
      await supabaseAdmin.from("website_checks" as any).insert({
        url: data.url,
        score: report.score,
        resultaten: report as unknown as Record<string, unknown>,
        ip_hash: ipHash,
      });
    } catch (err) {
      console.error("[website-checker] opslaan mislukt:", err);
    }

    return report;
  });
