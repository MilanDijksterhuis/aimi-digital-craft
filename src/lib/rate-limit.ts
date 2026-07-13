type Entry = { count: number; resetAt: number };
type BanEntry = { until: number; strikes: number };

const store = new Map<string, Entry>();
const bans = new Map<string, BanEntry>();

// Ban durations per strike: 5min → 1h → 24h → 7d
const BAN_DURATIONS_MS = [
  5 * 60 * 1000,
  60 * 60 * 1000,
  24 * 60 * 60 * 1000,
  7 * 24 * 60 * 60 * 1000,
];

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= limit) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { allowed: true, retryAfter: 0 };
}

export function isIpBanned(ip: string): { banned: boolean; retryAfter: number } {
  const ban = bans.get(ip);
  if (!ban) return { banned: false, retryAfter: 0 };
  if (Date.now() >= ban.until) return { banned: false, retryAfter: 0 };
  return { banned: true, retryAfter: Math.ceil((ban.until - Date.now()) / 1000) };
}

export function recordStrike(ip: string): void {
  const existing = bans.get(ip);
  const strikes = (existing?.strikes ?? 0) + 1;
  const durationMs = BAN_DURATIONS_MS[Math.min(strikes - 1, BAN_DURATIONS_MS.length - 1)];
  bans.set(ip, { until: Date.now() + durationMs, strikes });
}

// Dit project draait op Cloudflare Workers: cf-connecting-ip wordt door
// Cloudflare zelf gezet en is niet door de client te overschrijven. De
// x-forwarded-for fallback is dat wél — een client kan die header vrij
// spoofen om rate limits en IP-bans te omzeilen. Gebruik x-forwarded-for
// daarom alleen als cf-connecting-ip echt ontbreekt (buiten Cloudflare, bv.
// lokale dev), nooit als primaire bron in productie.
export function getClientIp(request: Request): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}
