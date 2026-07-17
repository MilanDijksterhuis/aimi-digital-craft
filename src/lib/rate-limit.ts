import { supabaseAdmin } from "@/integrations/supabase/client.server";

// SEC-5: rate limiting en IP-bans worden in een duurzame, gedeelde Postgres-
// store bijgehouden (tabellen rate_limit_hits/rate_limit_bans + de functies
// check_rate_limit/is_ip_banned/record_strike, zie migratie 20260717150000).
// Zo blijven limieten gelden over meerdere PM2-instances en overleven ze een
// deploy. Alle functies zijn fail-open: als de DB (of de nog niet toegepaste
// migratie) onbereikbaar is, wordt het request toegestaan — rate limiting mag
// nooit een single point of failure worden dat de hele site plat legt.

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<{ allowed: boolean; retryAfter: number }> {
  try {
    const { data, error } = await supabaseAdmin.rpc("check_rate_limit" as any, {
      p_key: key,
      p_limit: limit,
      p_window_seconds: Math.ceil(windowMs / 1000),
    });
    const row = Array.isArray(data) ? data[0] : data;
    if (error || !row) return { allowed: true, retryAfter: 0 };
    return { allowed: !!row.allowed, retryAfter: row.retry_after ?? 0 };
  } catch {
    return { allowed: true, retryAfter: 0 };
  }
}

export async function isIpBanned(ip: string): Promise<{ banned: boolean; retryAfter: number }> {
  try {
    const { data, error } = await supabaseAdmin.rpc("is_ip_banned" as any, { p_ip: ip });
    const row = Array.isArray(data) ? data[0] : data;
    if (error || !row) return { banned: false, retryAfter: 0 };
    return { banned: !!row.banned, retryAfter: row.retry_after ?? 0 };
  } catch {
    return { banned: false, retryAfter: 0 };
  }
}

export async function recordStrike(ip: string): Promise<void> {
  try {
    await supabaseAdmin.rpc("record_strike" as any, { p_ip: ip });
  } catch {
    /* fail-open: een niet-geregistreerde strike is acceptabel */
  }
}

// Op de VPS (Nitro node-server achter Nginx, met Cloudflare ervoor) zet
// Cloudflare cf-connecting-ip; die is niet door de client te overschrijven.
// x-forwarded-for is dat wél — een client kan die header spoofen om limieten
// en bans te omzeilen. Gebruik x-forwarded-for daarom alleen als fallback als
// cf-connecting-ip echt ontbreekt (bv. lokale dev), nooit als primaire bron.
export function getClientIp(request: Request): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}
