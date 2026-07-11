import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ADMIN_LIKE = ["super_admin", "co_admin", "admin"];
const BASE = "https://aimi-development.nl/monitoring-api/api";
const TIMEOUT_MS = 5_000;

async function ensureAdmin(supabase: any, userId: string) {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  const roles: string[] = (data ?? []).map((r: any) => r.role);
  if (!roles.some((r) => ADMIN_LIKE.includes(r))) throw new Error("Forbidden");
}

async function monitoringFetch(path: string, method: "GET" | "POST" = "GET"): Promise<any> {
  const key = process.env.MONITORING_ADMIN_KEY;
  if (!key) throw new Error("MONITORING_ADMIN_KEY niet geconfigureerd");

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: { "X-Admin-Key": key },
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`Monitoring API antwoordde met ${res.status}`);
    return await res.json();
  } catch (err: any) {
    if (err.name === "AbortError") throw new Error("Monitoring service reageert niet (timeout)");
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function monitoringFetchText(path: string): Promise<string> {
  const key = process.env.MONITORING_ADMIN_KEY;
  if (!key) throw new Error("MONITORING_ADMIN_KEY niet geconfigureerd");

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { "X-Admin-Key": key },
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`Monitoring API antwoordde met ${res.status}`);
    return await res.text();
  } catch (err: any) {
    if (err.name === "AbortError") throw new Error("Monitoring service reageert niet (timeout)");
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export const getMonitoringLatest = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await ensureAdmin(context.supabase, context.userId);
    return monitoringFetch("/metrics/latest");
  });

export const getMonitoringHistory = createServerFn({ method: "GET" })
  .validator((hours: number) => hours)
  .middleware([requireSupabaseAuth])
  .handler(async ({ data: hours, context }) => {
    await ensureAdmin(context.supabase, context.userId);
    return monitoringFetch(`/metrics/history?hours=${hours}`);
  });

export const getDailyCheckLatest = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await ensureAdmin(context.supabase, context.userId);
    return monitoringFetch("/daily-check/latest");
  });

export const getMonitoringLogs = createServerFn({ method: "GET" })
  .validator((input: { limit?: number; level?: string }) => input)
  .middleware([requireSupabaseAuth])
  .handler(async ({ data, context }) => {
    await ensureAdmin(context.supabase, context.userId);
    const params = new URLSearchParams();
    if (data.limit) params.set("limit", String(data.limit));
    if (data.level && data.level !== "all") params.set("level", data.level);
    return monitoringFetch(`/logs?${params}`);
  });

export const getAlerts = createServerFn({ method: "GET" })
  .validator((input: { resolved?: boolean; limit?: number }) => input)
  .middleware([requireSupabaseAuth])
  .handler(async ({ data, context }) => {
    await ensureAdmin(context.supabase, context.userId);
    const params = new URLSearchParams();
    if (data.resolved != null) params.set("resolved", String(data.resolved));
    if (data.limit) params.set("limit", String(data.limit));
    return monitoringFetch(`/alerts?${params}`);
  });

export const resolveAlert = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .middleware([requireSupabaseAuth])
  .handler(async ({ data: id, context }) => {
    await ensureAdmin(context.supabase, context.userId);
    return monitoringFetch(`/alerts/${encodeURIComponent(id)}/resolve`, "POST");
  });

export const getSshLoginsLatest = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await ensureAdmin(context.supabase, context.userId);
    return monitoringFetch("/ssh-logins/latest");
  });

export const getHetznerCostsLatest = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await ensureAdmin(context.supabase, context.userId);
    return monitoringFetch("/hetzner-costs/latest");
  });

export const getHetznerCostsHistory = createServerFn({ method: "GET" })
  .validator((months: number) => months)
  .middleware([requireSupabaseAuth])
  .handler(async ({ data: months, context }) => {
    await ensureAdmin(context.supabase, context.userId);
    return monitoringFetch(`/hetzner-costs/history?months=${months}`);
  });

export const getMetricsCompareWeeks = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await ensureAdmin(context.supabase, context.userId);
    return monitoringFetch("/metrics/compare-weeks");
  });

export const getMetricsExportCsv = createServerFn({ method: "GET" })
  .validator((hours: number) => hours)
  .middleware([requireSupabaseAuth])
  .handler(async ({ data: hours, context }) => {
    await ensureAdmin(context.supabase, context.userId);
    return monitoringFetchText(`/metrics/export.csv?hours=${hours}`);
  });

export const getLogsExportCsv = createServerFn({ method: "GET" })
  .validator((limit: number) => limit)
  .middleware([requireSupabaseAuth])
  .handler(async ({ data: limit, context }) => {
    await ensureAdmin(context.supabase, context.userId);
    return monitoringFetchText(`/logs/export.csv?limit=${limit}`);
  });
