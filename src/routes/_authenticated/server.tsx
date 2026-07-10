import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Activity, Cpu, HardDrive, MemoryStick, Clock, AlertTriangle, ChevronLeft } from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions";
import {
  getMonitoringLatest,
  getMonitoringHistory,
  getMonitoringLogs,
} from "@/lib/monitoring.functions";

export const Route = createFileRoute("/_authenticated/server")({
  head: () => ({ meta: [{ title: "Server — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: ServerPage,
});

function formatUptime(seconds: number): string {
  if (!seconds) return "—";
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${d}d ${h}u ${m}m`;
}

function formatTime(ts: string, hours: number): string {
  const d = new Date(ts.replace(" ", "T") + "Z");
  if (hours <= 1) return d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
  if (hours <= 24) return d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString("nl-NL", { weekday: "short", hour: "2-digit", minute: "2-digit" });
}

function statusColor(cpu: number, disk: number): "green" | "yellow" | "red" {
  if (cpu > 90 || disk > 90) return "red";
  if (cpu > 75 || disk > 75) return "yellow";
  return "green";
}

const STATUS_DOT: Record<string, string> = {
  green: "bg-emerald-500",
  yellow: "bg-amber-500",
  red: "bg-destructive",
};

const HOURS_OPTIONS = [
  { label: "Laatste 1u", value: 1 },
  { label: "Laatste 24u", value: 24 },
  { label: "Laatste 7d", value: 168 },
];

const LOG_LEVELS = ["all", "info", "warning", "error"] as const;

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 animate-pulse space-y-2">
      <div className="h-3 w-20 bg-muted rounded" />
      <div className="h-8 w-16 bg-muted rounded" />
      <div className="h-3 w-28 bg-muted rounded" />
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-5 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-sm">Kan geen verbinding maken met de monitoring service</p>
        <p className="text-xs text-muted-foreground mt-1">{message}</p>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, sub }: {
  icon: any; label: string; value: string; sub?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground mb-3">
        <Icon className="w-4 h-4" />
        <span className="text-xs uppercase tracking-wide">{label}</span>
      </div>
      <p className="font-display text-2xl font-bold">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function ServerPage() {
  const perms = usePermissions();
  const [historyHours, setHistoryHours] = useState(24);
  const [logLevel, setLogLevel] = useState<string>("all");

  const latestFn = useServerFn(getMonitoringLatest);
  const historyFn = useServerFn(getMonitoringHistory);
  const logsFn = useServerFn(getMonitoringLogs);

  const latestQ = useQuery({
    queryKey: ["monitoring-latest"],
    queryFn: () => latestFn({}),
    refetchInterval: 30_000,
    retry: 1,
  });

  const historyQ = useQuery({
    queryKey: ["monitoring-history", historyHours],
    queryFn: () => historyFn({ data: historyHours }),
    retry: 1,
  });

  const logsQ = useQuery({
    queryKey: ["monitoring-logs", logLevel],
    queryFn: () => logsFn({ data: { limit: 100, level: logLevel } }),
    retry: 1,
  });

  if (perms.isLoading) return <p className="text-muted-foreground">Laden…</p>;
  if (!perms.can("view_admin")) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6">
        <h2 className="font-display text-xl font-semibold">Geen toegang</h2>
        <p className="text-sm text-muted-foreground mt-2">Je account heeft geen admin-rol.</p>
      </div>
    );
  }

  const m = latestQ.data as any;
  const status = m ? statusColor(m.cpu_percent ?? 0, m.disk_percent ?? 0) : "green";

  const chartData = ((historyQ.data as any[]) ?? []).map((r: any) => ({
    t: formatTime(r.created_at, historyHours),
    cpu: r.cpu_percent != null ? +r.cpu_percent.toFixed(1) : null,
    ram: r.ram_percent != null ? +r.ram_percent.toFixed(1) : null,
    disk: r.disk_percent != null ? +r.disk_percent.toFixed(1) : null,
  }));

  const logs: any[] = (logsQ.data as any[]) ?? [];

  return (
    <div className="space-y-6">
      {/* Terug */}
      <Link
        to="/admin"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Terug naar Admin
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-4xl font-bold">Server</h1>
            {m && (
              <span
                className={`w-3 h-3 rounded-full ${STATUS_DOT[status]} mt-1`}
                title={status === "green" ? "Alles OK" : status === "yellow" ? "Let op" : "Kritiek"}
              />
            )}
          </div>
          <p className="text-muted-foreground">Live server monitoring van de Hetzner VPS.</p>
        </div>
        {latestQ.dataUpdatedAt > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Bijgewerkt: {new Date(latestQ.dataUpdatedAt).toLocaleTimeString("nl-NL")}
          </p>
        )}
      </div>

      {/* Live cards */}
      {latestQ.isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : latestQ.isError ? (
        <ErrorBox message={(latestQ.error as Error).message} />
      ) : m ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={Cpu}
            label="CPU"
            value={`${m.cpu_percent?.toFixed(1) ?? "—"}%`}
            sub={`Load avg: ${m.load_avg_1m?.toFixed(2) ?? "—"}`}
          />
          <MetricCard
            icon={MemoryStick}
            label="RAM"
            value={`${m.ram_percent?.toFixed(1) ?? "—"}%`}
            sub={`${m.ram_used_mb ? Math.round(m.ram_used_mb) : "—"} / ${m.ram_total_mb ? Math.round(m.ram_total_mb) : "—"} MB`}
          />
          <MetricCard
            icon={HardDrive}
            label="Disk"
            value={`${m.disk_percent?.toFixed(0) ?? "—"}%`}
            sub={`${m.disk_used_gb?.toFixed(1) ?? "—"} / ${m.disk_total_gb?.toFixed(1) ?? "—"} GB`}
          />
          <MetricCard
            icon={Clock}
            label="Uptime"
            value={formatUptime(m.uptime_seconds)}
          />
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">Nog geen metingen ontvangen.</p>
      )}

      {/* Grafiek */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-semibold flex items-center gap-2">
            <Activity className="w-4 h-4" /> Historiek
          </h2>
          <div className="flex gap-1.5">
            {HOURS_OPTIONS.map(o => (
              <button
                key={o.value}
                onClick={() => setHistoryHours(o.value)}
                className={`px-3 py-1 text-xs rounded-md border transition-colors ${historyHours === o.value ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary"}`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {historyQ.isLoading ? (
          <div className="h-52 animate-pulse bg-muted/40 rounded-lg" />
        ) : historyQ.isError ? (
          <ErrorBox message={(historyQ.error as Error).message} />
        ) : chartData.length === 0 ? (
          <p className="text-sm text-muted-foreground py-10 text-center">Geen data voor deze periode.</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} interval="preserveStartEnd" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} unit="%" />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                formatter={(v: any) => [`${v}%`]}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="cpu" name="CPU" stroke="#fe2c02" dot={false} strokeWidth={1.5} connectNulls />
              <Line type="monotone" dataKey="ram" name="RAM" stroke="#3b82f6" dot={false} strokeWidth={1.5} connectNulls />
              <Line type="monotone" dataKey="disk" name="Disk" stroke="#10b981" dot={false} strokeWidth={1.5} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Logs */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-semibold">Logs</h2>
          <div className="flex gap-1.5">
            {LOG_LEVELS.map(l => (
              <button
                key={l}
                onClick={() => setLogLevel(l)}
                className={`px-3 py-1 text-xs rounded-md border transition-colors capitalize ${logLevel === l ? "bg-foreground text-background border-foreground" : l === "error" ? "border-destructive/50 text-destructive hover:bg-destructive/10" : "border-border hover:border-primary"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {logsQ.isLoading ? (
          <div className="p-6 space-y-2 animate-pulse">
            {[1,2,3].map(i => <div key={i} className="h-8 bg-muted/40 rounded" />)}
          </div>
        ) : logsQ.isError ? (
          <div className="p-4"><ErrorBox message={(logsQ.error as Error).message} /></div>
        ) : logs.length === 0 ? (
          <p className="p-6 text-center text-sm text-muted-foreground">Geen logs gevonden.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-muted-foreground text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left p-3 whitespace-nowrap">Tijd</th>
                  <th className="text-left p-3">Source</th>
                  <th className="text-left p-3">Level</th>
                  <th className="text-left p-3">Bericht</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log: any) => (
                  <tr
                    key={log.id}
                    className={`border-t border-border ${log.level === "error" ? "bg-destructive/5" : ""}`}
                  >
                    <td className="p-3 whitespace-nowrap text-muted-foreground text-xs">
                      {new Date(log.created_at.replace(" ", "T") + "Z").toLocaleString("nl-NL")}
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">{log.source ?? "—"}</td>
                    <td className="p-3">
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                        log.level === "error" ? "bg-destructive/20 text-destructive" :
                        log.level === "warning" ? "bg-amber-500/20 text-amber-500" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {log.level ?? "info"}
                      </span>
                    </td>
                    <td className={`p-3 ${log.level === "error" ? "text-destructive" : ""}`}>
                      {log.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
