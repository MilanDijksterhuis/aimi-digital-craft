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
