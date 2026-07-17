// SSRF-bescherming: monitoring-URL's komen uit profiles.website_url (admin-invoer) en
// worden server-side opgevraagd. Zonder deze check kan een kwaadaardige/gecompromitteerde
// staff-invoer de server requests laten doen naar interne diensten of cloud metadata-endpoints.
export async function assertPublicHost(hostname: string): Promise<void> {
  const net = await import("net");
  const dns = await import("dns/promises");

  if (net.isIP(hostname)) {
    if (isPrivateOrReservedIp(hostname)) {
      throw new Error("Interne/private IP-adressen zijn niet toegestaan.");
    }
    return;
  }

  const lower = hostname.toLowerCase();
  if (lower === "localhost" || lower.endsWith(".localhost") || lower.endsWith(".local")) {
    throw new Error("Interne hostnamen zijn niet toegestaan.");
  }

  const addrs = await dns.lookup(hostname, { all: true });
  for (const { address } of addrs) {
    if (isPrivateOrReservedIp(address)) {
      throw new Error("Hostname resolvet naar een interne/private IP-adres.");
    }
  }
}

function isPrivateOrReservedIp(address: string): boolean {
  if (address === "0.0.0.0" || address === "::" || address === "::1") return true;
  if (address.startsWith("127.")) return true;
  if (address.startsWith("10.")) return true;
  if (address.startsWith("169.254.")) return true; // link-local incl. cloud metadata
  if (address.startsWith("192.168.")) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(address)) return true;
  if (address.startsWith("fc") || address.startsWith("fd")) return true; // IPv6 ULA
  if (address.startsWith("fe80:")) return true; // IPv6 link-local
  return false;
}

export async function measureResponseTime(url: string): Promise<{ response_ms: number; status_ok: boolean }> {
  try {
    // Normaliseer: klant-URL's staan vaak opgeslagen zonder protocol
    // (bijv. "aimi-development.nl"). Zonder scheme gooit http/https.get "Invalid URL".
    const target = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    await assertPublicHost(new URL(target).hostname);
    const mod = await import(target.startsWith("https") ? "https" : "http");
    return new Promise((resolve) => {
      const start = Date.now();
      let settled = false;
      const finish = (r: { response_ms: number; status_ok: boolean }) => {
        if (settled) return;
        settled = true;
        resolve(r);
      };
      try {
        const req = (mod as any).get(target, { timeout: 10000 }, (res: any) => {
          const ms = Date.now() - start;
          res.resume();
          finish({ response_ms: ms, status_ok: res.statusCode >= 200 && res.statusCode < 400 });
        });
        req.on("error", () => finish({ response_ms: Date.now() - start, status_ok: false }));
        req.on("timeout", () => { req.destroy(); finish({ response_ms: 10000, status_ok: false }); });
      } catch {
        finish({ response_ms: 10000, status_ok: false });
      }
    });
  } catch {
    return { response_ms: 10000, status_ok: false };
  }
}

export type DayUptime = {
  date: string;
  label: string;
  total: number;
  ok: number;
  uptime: number | null;
};

export type MonitoringStats = {
  uptimePct: number | null;
  avg: number | null;
  dailyUptime: DayUptime[];
  total24h: number;
  lastSync: string | null;
};

export function computeMonitoringStats(rows: { status_ok: boolean; response_ms: number | null; created_at: string }[]): MonitoringStats {
  const now = Date.now();
  const since24h = now - 86400000;

  const last24h = rows.filter((r) => new Date(r.created_at).getTime() >= since24h);
  const ok24h = last24h.filter((r) => r.status_ok).length;
  const uptimePct = last24h.length > 0 ? (ok24h / last24h.length) * 100 : null;

  const msValues = last24h.filter((r) => r.response_ms != null).map((r) => r.response_ms as number);
  const avg = msValues.length > 0 ? Math.round(msValues.reduce((a, b) => a + b, 0) / msValues.length) : null;

  const dailyUptime: DayUptime[] = Array.from({ length: 7 }, (_, i) => {
    const dayStart = new Date(now - (6 - i) * 86400000);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart.getTime() + 86400000);
    const inDay = rows.filter((r) => {
      const t = new Date(r.created_at).getTime();
      return t >= dayStart.getTime() && t < dayEnd.getTime();
    });
    const okDay = inDay.filter((r) => r.status_ok).length;
    return {
      date: dayStart.toISOString().slice(0, 10),
      label: dayStart.toLocaleDateString("nl-NL", { weekday: "short" }),
      total: inDay.length,
      ok: okDay,
      uptime: inDay.length > 0 ? Math.round((okDay / inDay.length) * 100) : null,
    };
  });

  return {
    uptimePct,
    avg,
    dailyUptime,
    total24h: last24h.length,
    lastSync: rows[0]?.created_at ?? null,
  };
}

// CODE-6: gedeelde ping-fetch met fallback (site_response_times -> site_pings).
// Voorheen byte-voor-byte gedupliceerd in portal.functions.ts (getMyDashboard
// en portalGetProjectMonitoring) met een `throw new Error("leeg")` om in de
// catch te springen; hier vervangen door een expliciete conditie.
// `client` is een Supabase-client (user-authed of admin); de aanroeper kiest.
export async function fetchPingRows(
  client: any,
  userId: string,
  since: string,
  limit = 2016,
): Promise<any[]> {
  const rt = await client
    .from("site_response_times")
    .select("status_ok, response_ms, created_at")
    .eq("user_id", userId)
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (!rt.error && rt.data && rt.data.length > 0) {
    return rt.data as any[];
  }
  const fallback = await client
    .from("site_pings")
    .select("status_ok, response_ms, created_at")
    .eq("user_id", userId)
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (fallback.data ?? []) as any[];
}
