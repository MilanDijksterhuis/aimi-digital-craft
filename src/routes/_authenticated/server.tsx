import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush,
} from "recharts";
import {
  Activity, Cpu, HardDrive, MemoryStick, Clock, AlertTriangle, ChevronLeft,
  Gauge, Users, Shield, Network, Server as ServerIcon, RotateCcw, Globe,
  Lock, PackageCheck, ArrowDownUp, ChevronDown, Bell, Download,
  KeyRound, Euro, TrendingUp, TrendingDown, Minus, BarChart2, FileText,
  Info, Boxes, CheckCircle2, XCircle,
} from "lucide-react";
import { usePermissions } from "@/hooks/use-permissions";
import {
  getMonitoringLatest,
  getMonitoringHistory,
  getMonitoringLogs,
  getDailyCheckLatest,
  getAlerts,
  resolveAlert,
  getSshLoginsLatest,
  getHetznerCostsLatest,
  getHetznerCostsHistory,
  getMetricsCompareWeeks,
  getMetricsExportCsv,
  getLogsExportCsv,
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

function MetricCard({ icon: Icon, label, value, sub, warn }: {
  icon: any; label: string; value: string; sub?: string; warn?: boolean;
}) {
  return (
    <div className={`rounded-lg border p-5 ${warn ? "border-amber-500/40 bg-amber-500/5" : "border-border bg-card"}`}>
      <div className="flex items-center gap-2 text-muted-foreground mb-3">
        <Icon className="w-4 h-4" />
        <span className="text-xs uppercase tracking-wide">{label}</span>
        {warn && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 ml-auto" />}
      </div>
      <p className={`font-display text-2xl font-bold ${warn ? "text-amber-500" : ""}`}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function na(v: number | null | undefined, suffix = ""): string {
  return v == null ? "n.v.t." : `${v}${suffix}`;
}

function safeJsonParse<T>(raw: unknown): T | null {
  if (typeof raw !== "string" || raw.trim() === "") return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function formatSslDate(daysRemaining: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysRemaining);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${d.getFullYear()}`;
}

function formatServerAge(createdAt: unknown): string {
  if (typeof createdAt !== "string" || createdAt.trim() === "") return "onbekend";
  const d = new Date(createdAt.includes("T") || createdAt.includes("Z") ? createdAt : createdAt.replace(" ", "T") + "Z");
  if (Number.isNaN(d.getTime())) return "onbekend";
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (days < 0) return "onbekend";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${days} dagen oud (sinds ${dd}-${mm}-${d.getFullYear()})`;
}

function StatusIndicator({ label, active, invert, warnLabel }: {
  label: string; active: boolean | null | undefined; invert?: boolean; warnLabel?: string;
}) {
  if (active == null) {
    return (
      <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-muted shrink-0" />
        <span className="text-sm text-muted-foreground">{label}: n.v.t.</span>
      </div>
    );
  }
  const isGood = invert ? !active : active;
  const Icon = isGood ? CheckCircle2 : XCircle;
  const text = invert
    ? (active ? (warnLabel ?? "Waarschuwing") : "Geen actie nodig")
    : (active ? "Actief" : "Inactief");
  return (
    <div className={`rounded-lg border p-4 flex items-center gap-2 ${isGood ? "border-emerald-500/30 bg-emerald-500/5" : "border-destructive/40 bg-destructive/10"}`}>
      <Icon className={`w-4 h-4 shrink-0 ${isGood ? "text-emerald-500" : "text-destructive"}`} />
      <span className="text-sm">
        <span className="font-medium">{label}:</span> {text}
      </span>
    </div>
  );
}

function downloadCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function ExportButton({ onExport, label = "Exporteer als CSV" }: { onExport: () => Promise<void>; label?: string }) {
  const [busy, setBusy] = useState(false);
  return (
    <button
      onClick={async () => {
        setBusy(true);
        try {
          await onExport();
        } catch (err: any) {
          toast.error(err?.message ?? "Export mislukt");
        } finally {
          setBusy(false);
        }
      }}
      disabled={busy}
      className="px-3 py-1 text-xs rounded-md border border-border hover:border-primary transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
    >
      <Download className="w-3.5 h-3.5" /> {busy ? "Bezig…" : label}
    </button>
  );
}

function formatDateShort(ts: string): string {
  const d = new Date(ts.replace(" ", "T") + (ts.includes("Z") ? "" : "Z"));
  return d.toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit" });
}

function formatDateTimeShort(ts: string): string {
  const d = new Date(ts.replace(" ", "T") + (ts.includes("Z") ? "" : "Z"));
  return d.toLocaleString("nl-NL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function TrendIcon({ pct }: { pct: number }) {
  if (Math.abs(pct) < 1) return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
  return pct > 0
    ? <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
    : <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />;
}

function ExpandableMetricCard({ icon: Icon, label, value, sub, warn, children }: {
  icon: any; label: string; value: string; sub?: string; warn?: boolean; children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-lg border p-5 ${warn ? "border-amber-500/40 bg-amber-500/5" : "border-border bg-card"}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <Icon className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wide">{label}</span>
          {warn && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 ml-auto" />}
          <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${warn ? "" : "ml-auto"} ${open ? "rotate-180" : ""}`} />
        </div>
        <p className={`font-display font-bold ${warn ? "text-amber-500" : ""} ${value.length > 20 ? "text-lg" : "text-2xl"}`}>{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </button>
      <div className={`grid transition-all duration-200 ease-in-out ${open ? "grid-rows-[1fr] mt-4 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="pt-3 border-t border-border">{children}</div>
        </div>
      </div>
    </div>
  );
}

type ServerSection = "algemeen" | "security" | "pm2" | "historie" | "netwerk" | "disk-groei" | "week" | "hetzner" | "logs";

function ServerSidebar({ groups, active, setActive }: {
  groups: { label: string; items: { key: ServerSection; label: string; icon: any; badge?: number; alert?: boolean }[] }[];
  active: ServerSection;
  setActive: (k: ServerSection) => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(
    Object.fromEntries(groups.map((g) => [g.label, true])),
  );
  return (
    <nav aria-label="Server secties" className="md:w-60 md:shrink-0 md:border-r border-border md:pr-4">
      {groups.map((g) => {
        const isOpen = open[g.label] ?? true;
        return (
          <div key={g.label} className="mb-2">
            <button
              type="button"
              onClick={() => setOpen({ ...open, [g.label]: !isOpen })}
              className="w-full flex items-center justify-between py-1 text-[10px] font-semibold uppercase text-muted-foreground"
              style={{ letterSpacing: "0.1em" }}
            >
              <span>{g.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
            </button>
            {isOpen && (
              <ul className="mt-1 space-y-0.5">
                {g.items.map((it) => {
                  const Icon = it.icon;
                  const isActive = active === it.key;
                  return (
                    <li key={it.key}>
                      <button
                        onClick={() => setActive(it.key)}
                        className="w-full flex items-center justify-between gap-2 px-2 py-1.5 text-sm transition-colors"
                        style={{
                          borderLeft: isActive ? "2px solid var(--primary)" : "2px solid transparent",
                          color: isActive ? "var(--primary)" : undefined,
                          paddingLeft: "8px",
                        }}
                        onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)"; }}
                        onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = ""; }}
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="truncate text-left">{it.label}</span>
                        </span>
                        {it.badge != null && it.badge > 0 && (
                          <span className={`text-[10px] font-semibold rounded-full px-1.5 py-0.5 shrink-0 ${it.alert ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"}`}>
                            {it.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}

const DISK_DAYS_OPTIONS = [
  { label: "7d", value: 7 },
  { label: "30d", value: 30 },
  { label: "90d", value: 90 },
];

function ServerPage() {
  const perms = usePermissions();
  const qc = useQueryClient();
  const [historyHours, setHistoryHours] = useState(24);
  const [networkHours, setNetworkHours] = useState(24);
  const [diskDays, setDiskDays] = useState(30);
  const [logLevel, setLogLevel] = useState<string>("all");
  const [autoScale, setAutoScale] = useState(true);
  const [visibleSeries, setVisibleSeries] = useState<Record<"cpu" | "ram" | "disk", boolean>>({
    cpu: true, ram: true, disk: true,
  });
  const [networkAutoScale, setNetworkAutoScale] = useState(true);
  const [visibleNetworkSeries, setVisibleNetworkSeries] = useState<Record<"rx" | "tx", boolean>>({
    rx: true, tx: true,
  });
  const [diskAutoScale, setDiskAutoScale] = useState(true);
  const [sshTab, setSshTab] = useState<"success" | "failed">("success");
  const [activeSection, setActiveSection] = useState<ServerSection>("algemeen");

  const latestFn = useServerFn(getMonitoringLatest);
  const historyFn = useServerFn(getMonitoringHistory);
  const logsFn = useServerFn(getMonitoringLogs);
  const dailyCheckFn = useServerFn(getDailyCheckLatest);
  const alertsFn = useServerFn(getAlerts);
  const resolveAlertFn = useServerFn(resolveAlert);
  const sshLoginsFn = useServerFn(getSshLoginsLatest);
  const hetznerLatestFn = useServerFn(getHetznerCostsLatest);
  const hetznerHistoryFn = useServerFn(getHetznerCostsHistory);
  const compareWeeksFn = useServerFn(getMetricsCompareWeeks);
  const metricsExportFn = useServerFn(getMetricsExportCsv);
  const logsExportFn = useServerFn(getLogsExportCsv);

  const latestQ = useQuery({
    queryKey: ["monitoring-latest"],
    queryFn: () => latestFn({}),
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
    retry: 1,
  });

  const dailyCheckQ = useQuery({
    queryKey: ["daily-check-latest"],
    queryFn: () => dailyCheckFn({}),
    refetchInterval: 5 * 60_000,
    refetchIntervalInBackground: false,
    retry: 1,
  });

  const historyQ = useQuery({
    queryKey: ["monitoring-history", historyHours],
    queryFn: () => historyFn({ data: historyHours }),
    retry: 1,
  });

  const networkHistoryQ = useQuery({
    queryKey: ["monitoring-history", networkHours],
    queryFn: () => historyFn({ data: networkHours }),
    retry: 1,
  });

  const diskHistoryQ = useQuery({
    queryKey: ["monitoring-history", diskDays * 24],
    queryFn: () => historyFn({ data: diskDays * 24 }),
    retry: 1,
  });

  const logsQ = useQuery({
    queryKey: ["monitoring-logs", logLevel],
    queryFn: () => logsFn({ data: { limit: 100, level: logLevel } }),
    retry: 1,
  });

  const alertsQ = useQuery({
    queryKey: ["monitoring-alerts"],
    queryFn: () => alertsFn({ data: { resolved: false, limit: 50 } }),
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
    retry: 1,
  });

  const resolveAlertM = useMutation({
    mutationFn: (id: string) => resolveAlertFn({ data: id }),
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: ["monitoring-alerts"] });
      const previous = qc.getQueryData<any[]>(["monitoring-alerts"]);
      qc.setQueryData<any[]>(["monitoring-alerts"], (old) => (old ?? []).filter((a) => a.id !== id));
      return { previous };
    },
    onError: (err: any, _id, context) => {
      if (context?.previous) qc.setQueryData(["monitoring-alerts"], context.previous);
      toast.error(err?.message ?? "Kon alert niet afhandelen");
    },
    onSuccess: () => toast.success("Alert afgehandeld"),
  });

  const sshLoginsQ = useQuery({
    queryKey: ["ssh-logins-latest"],
    queryFn: () => sshLoginsFn({}),
    retry: 1,
  });

  const hetznerLatestQ = useQuery({
    queryKey: ["hetzner-costs-latest"],
    queryFn: () => hetznerLatestFn({}),
    retry: 1,
  });

  const hetznerHistoryQ = useQuery({
    queryKey: ["hetzner-costs-history"],
    queryFn: () => hetznerHistoryFn({ data: 6 }),
    retry: 1,
  });

  const compareWeeksQ = useQuery({
    queryKey: ["metrics-compare-weeks"],
    queryFn: () => compareWeeksFn({}),
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
  const dc = dailyCheckQ.data as any;
  const status = m ? statusColor(m.cpu_percent ?? 0, m.disk_percent ?? 0) : "green";

  const chartData = ((historyQ.data as any[]) ?? []).map((r: any) => ({
    t: formatTime(r.created_at, historyHours),
    cpu: r.cpu_percent != null ? +r.cpu_percent.toFixed(1) : null,
    ram: r.ram_percent != null ? +r.ram_percent.toFixed(1) : null,
    disk: r.disk_percent != null ? +r.disk_percent.toFixed(1) : null,
  }));

  const logs: any[] = (logsQ.data as any[]) ?? [];

  const chartMax = chartData.reduce((max, r) => {
    const vals = ([
      visibleSeries.cpu ? r.cpu : null,
      visibleSeries.ram ? r.ram : null,
      visibleSeries.disk ? r.disk : null,
    ]).filter((v): v is number => v != null);
    return vals.length ? Math.max(max, ...vals) : max;
  }, 0);
  const yDomain: [number, number] = autoScale ? [0, Math.max(10, Math.ceil((chartMax + 1) / 10) * 10)] : [0, 100];

  const fail2banDetail = safeJsonParse<{ banned_ips?: string[] }>(m?.fail2ban_detail);
  const pm2Detail = safeJsonParse<Array<{ name: string; status: string; restarts: number; memory_mb: number; cpu_percent: number }>>(m?.pm2_detail);
  const networkDetail = safeJsonParse<{ top_ips?: { ip: string; connections: number }[] }>(m?.network_detail);

  const alerts: any[] = (alertsQ.data as any[]) ?? [];

  const networkChartData = ((networkHistoryQ.data as any[]) ?? []).map((r: any) => ({
    t: formatTime(r.created_at, networkHours),
    rx: r.network_rx_mb != null ? +Number(r.network_rx_mb).toFixed(1) : null,
    tx: r.network_tx_mb != null ? +Number(r.network_tx_mb).toFixed(1) : null,
  }));
  const hasNetworkData = networkChartData.some((r) => r.rx != null || r.tx != null);
  const networkChartMax = networkChartData.reduce((max, r) => {
    const vals = ([
      visibleNetworkSeries.rx ? r.rx : null,
      visibleNetworkSeries.tx ? r.tx : null,
    ]).filter((v): v is number => v != null);
    return vals.length ? Math.max(max, ...vals) : max;
  }, 0);
  const networkYDomain: [number, number] | undefined = networkAutoScale
    ? [0, Math.max(10, Math.ceil((networkChartMax + 1) / 10) * 10)]
    : undefined;

  const diskRows: any[] = (diskHistoryQ.data as any[]) ?? [];
  const diskChartData = diskRows
    .filter((r) => r.disk_used_gb != null)
    .map((r: any) => ({
      t: formatDateShort(r.created_at),
      ts: new Date(r.created_at.replace(" ", "T") + "Z").getTime(),
      disk: +Number(r.disk_used_gb).toFixed(2),
    }));

  let diskForecastText: string | null = null;
  let diskForecastCritical = false;
  if (diskChartData.length >= 2 && m?.disk_total_gb) {
    const first = diskChartData[0];
    const last = diskChartData[diskChartData.length - 1];
    const daysSpan = (last.ts - first.ts) / 86_400_000;
    const growthPerDay = daysSpan > 0 ? (last.disk - first.disk) / daysSpan : 0;
    if (growthPerDay > 0.001) {
      const remainingGb = m.disk_total_gb - last.disk;
      const daysUntilFull = Math.round(remainingGb / growthPerDay);
      diskForecastCritical = daysUntilFull < 30;
      diskForecastText = `Bij dit tempo (± ${growthPerDay.toFixed(2)} GB/dag) is je schijf vol over ongeveer ${daysUntilFull} dagen.`;
    } else {
      diskForecastText = "Schijfgebruik groeit momenteel niet noemenswaardig.";
    }
  }

  const diskChartMax = diskChartData.reduce((max, r) => Math.max(max, r.disk), 0);
  const diskYDomain: [number, number] = diskAutoScale
    ? [0, Math.max(10, Math.ceil((diskChartMax + 1) / 10) * 10)]
    : [0, m?.disk_total_gb ? Math.ceil(m.disk_total_gb) : Math.max(10, Math.ceil((diskChartMax + 1) / 10) * 10)];

  const ssh = sshLoginsQ.data as any;
  const sshSuccess: any[] = ssh?.successful ?? ssh?.success ?? [];
  const sshFailed: any[] = ssh?.failed ?? [];

  const hetznerLatest = hetznerLatestQ.data as any;
  const hetznerHistory: any[] = (hetznerHistoryQ.data as any[]) ?? [];

  const compareWeeks = compareWeeksQ.data as any;
  const compareRows: Array<{ key: string; label: string }> = [
    { key: "cpu", label: "CPU" },
    { key: "ram", label: "RAM" },
    { key: "disk", label: "Disk" },
    { key: "network", label: "Netwerkverkeer" },
  ];

  function getCompareMetric(key: string): { pct: number; thisWeek: number; lastWeek: number; unit: string } | null {
    const src = compareWeeks?.[key];
    if (!src || typeof src !== "object") return null;
    const thisWeek = src.this_week ?? src.thisWeek ?? src.current ?? null;
    const lastWeek = src.last_week ?? src.lastWeek ?? src.previous ?? null;
    let pct = src.pct_change ?? src.percent_change ?? src.change_pct ?? null;
    if (pct == null && thisWeek != null && lastWeek != null && lastWeek !== 0) {
      pct = ((thisWeek - lastWeek) / lastWeek) * 100;
    }
    if (pct == null || thisWeek == null) return null;
    const unit = key === "network" ? "MB" : "%";
    return { pct: Number(pct), thisWeek: Number(thisWeek), lastWeek: Number(lastWeek ?? 0), unit };
  }

  const sidebarGroups: { label: string; items: { key: ServerSection; label: string; icon: any; badge?: number; alert?: boolean }[] }[] = [
    { label: "Algemeen", items: [
      { key: "algemeen", label: "Algemeen", icon: BarChart2 },
    ]},
    { label: "Security", items: [
      { key: "security", label: "Security", icon: Shield, badge: sshFailed.length > 10 ? sshFailed.length : undefined, alert: true },
    ]},
    { label: "PM2", items: [
      { key: "pm2", label: "PM2", icon: Boxes, badge: m?.pm2_apps_online != null && m?.pm2_apps_total != null && m.pm2_apps_online !== m.pm2_apps_total ? 1 : undefined, alert: true },
    ]},
    { label: "Grafieken", items: [
      { key: "historie", label: "Historie (CPU/RAM/Disk)", icon: Activity },
      { key: "netwerk", label: "Netwerkverkeer", icon: Network },
      { key: "disk-groei", label: "Disk-groei", icon: HardDrive },
    ]},
    { label: "Analyse", items: [
      { key: "week", label: "Week-vergelijking", icon: TrendingUp },
      { key: "hetzner", label: "Hetzner kosten", icon: Euro },
    ]},
    { label: "Logs", items: [
      { key: "logs", label: "Logs & alerts", icon: FileText, badge: alerts.length || undefined, alert: alerts.some((a) => a.severity === "critical") },
    ]},
  ];

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 max-w-[1600px] px-6 lg:px-10 space-y-6">
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

      <div className="flex flex-col md:flex-row gap-6">
        <ServerSidebar groups={sidebarGroups} active={activeSection} setActive={setActiveSection} />

        <div className="flex-1 min-w-0 space-y-6">
      {activeSection === "security" && (
        <>
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4" /> Security
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatusIndicator label="Fail2ban" active={m?.fail2ban_active === 1 || m?.fail2ban_active === true} />
          <StatusIndicator label="Unattended-upgrades" active={m?.unattended_upgrades_active === 1 || m?.unattended_upgrades_active === true} />
          <StatusIndicator label="UFW" active={m?.ufw_active === 1 || m?.ufw_active === true} />
          <StatusIndicator
            label="Reboot"
            active={m?.reboot_required === 1 || m?.reboot_required === true}
            invert
            warnLabel="Reboot vereist door pending updates"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <ExpandableMetricCard
            icon={Shield}
            label="Fail2ban banned"
            value={na(m?.fail2ban_banned)}
          >
            {fail2banDetail?.banned_ips && fail2banDetail.banned_ips.length > 0 ? (
              <ul className="space-y-1">
                {fail2banDetail.banned_ips.map((ip) => (
                  <li key={ip} className="text-xs font-mono px-2 py-1 rounded bg-muted/40">{ip}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground">Geen geblokkeerde IP's op dit moment</p>
            )}
          </ExpandableMetricCard>
          <ExpandableMetricCard
            icon={Lock}
            label="SSL certificaat"
            value={
              dc?.ssl_days_remaining != null
                ? `Verloopt over ${dc.ssl_days_remaining} dagen (${formatSslDate(dc.ssl_days_remaining)})`
                : "n.v.t."
            }
            warn={typeof dc?.ssl_days_remaining === "number" && dc.ssl_days_remaining < 14}
          >
            {typeof dc?.ssl_days_remaining === "number" ? (
              <p className="text-xs text-muted-foreground">
                {dc.ssl_days_remaining < 14
                  ? "Let op: certificaat verloopt binnenkort, vernieuwing wordt aangeraden."
                  : "Certificaat is geldig, geen actie nodig."}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">Geen data beschikbaar</p>
            )}
          </ExpandableMetricCard>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-semibold flex items-center gap-2">
            <KeyRound className="w-4 h-4" /> SSH-logins
          </h2>
          <div className="flex gap-1.5">
            <button
              onClick={() => setSshTab("success")}
              className={`px-3 py-1 text-xs rounded-md border transition-colors ${sshTab === "success" ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary"}`}
            >
              Succesvol ({sshSuccess.length})
            </button>
            <button
              onClick={() => setSshTab("failed")}
              className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                sshTab === "failed"
                  ? "bg-foreground text-background border-foreground"
                  : sshFailed.length > 10
                  ? "border-destructive/50 text-destructive hover:bg-destructive/10"
                  : "border-border hover:border-primary"
              }`}
            >
              Mislukt ({sshFailed.length})
            </button>
          </div>
        </div>

        {sshLoginsQ.isLoading ? (
          <div className="p-6 space-y-2 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-8 bg-muted/40 rounded" />)}
          </div>
        ) : sshLoginsQ.isError ? (
          <div className="p-4"><ErrorBox message={(sshLoginsQ.error as Error).message} /></div>
        ) : (
          <>
            {sshTab === "failed" && sshFailed.length > 10 && (
              <div className="px-4 pt-4">
                <p className="text-xs text-destructive flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Ongebruikelijk veel mislukte pogingen
                </p>
              </div>
            )}
            {(sshTab === "success" ? sshSuccess : sshFailed).length === 0 ? (
              <p className="p-6 text-center text-sm text-muted-foreground">
                Geen {sshTab === "success" ? "succesvolle logins" : "mislukte pogingen"} gevonden.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/30 text-muted-foreground text-xs uppercase tracking-wide">
                    <tr>
                      <th className="text-left p-3 whitespace-nowrap">Tijd</th>
                      <th className="text-left p-3">Gebruiker</th>
                      <th className="text-left p-3">IP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(sshTab === "success" ? sshSuccess : sshFailed).map((entry: any, i: number) => (
                      <tr key={entry.id ?? i} className={`border-t border-border ${sshTab === "failed" ? "bg-destructive/5" : ""}`}>
                        <td className="p-3 whitespace-nowrap text-muted-foreground text-xs">
                          {entry.created_at ? formatDateTimeShort(entry.created_at) : "—"}
                        </td>
                        <td className="p-3">{entry.user ?? entry.username ?? "—"}</td>
                        <td className="p-3 font-mono text-xs">{entry.ip ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
        </>
      )}

      {activeSection === "pm2" && (
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Boxes className="w-4 h-4" /> PM2
        </h2>
        {latestQ.isLoading ? (
          <div className="h-32 animate-pulse bg-muted/40 rounded-lg" />
        ) : latestQ.isError ? (
          <ErrorBox message={(latestQ.error as Error).message} />
        ) : m ? (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <ExpandableMetricCard
                icon={ServerIcon}
                label="PM2 status"
                value={m.pm2_apps_online != null && m.pm2_apps_total != null ? `${m.pm2_apps_online}/${m.pm2_apps_total} online` : "n.v.t."}
                warn={m.pm2_apps_online != null && m.pm2_apps_total != null && m.pm2_apps_online !== m.pm2_apps_total}
              >
                {pm2Detail && pm2Detail.length > 0 ? (
                  <table className="w-full text-xs">
                    <thead className="text-muted-foreground uppercase tracking-wide">
                      <tr>
                        <th className="text-left font-medium pb-1">App</th>
                        <th className="text-left font-medium pb-1">Status</th>
                        <th className="text-right font-medium pb-1">Restarts</th>
                        <th className="text-right font-medium pb-1">MB</th>
                        <th className="text-right font-medium pb-1">CPU%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pm2Detail.map((app) => (
                        <tr key={app.name} className="border-t border-border/60">
                          <td className="py-1 pr-2">{app.name}</td>
                          <td className="py-1">
                            <span className="inline-flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${app.status === "online" ? "bg-emerald-500" : "bg-destructive"}`} />
                              {app.status}
                            </span>
                          </td>
                          <td className={`py-1 text-right ${app.restarts > 5 ? "text-destructive font-medium" : ""}`}>
                            {app.restarts}
                          </td>
                          <td className="py-1 text-right">{app.memory_mb}</td>
                          <td className="py-1 text-right">{app.cpu_percent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-xs text-muted-foreground">Geen data beschikbaar</p>
                )}
              </ExpandableMetricCard>
              <MetricCard
                icon={RotateCcw}
                label="PM2 restarts"
                value={na(m.pm2_restart_count)}
                warn={typeof m.pm2_restart_count === "number" && m.pm2_restart_count > 10}
              />
            </div>

            {pm2Detail && pm2Detail.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">CPU% en geheugen per app</p>
                {pm2Detail.map((app) => {
                  const maxCpu = Math.max(...pm2Detail.map((a) => a.cpu_percent ?? 0), 1);
                  const maxMem = Math.max(...pm2Detail.map((a) => a.memory_mb ?? 0), 1);
                  return (
                    <div key={app.name} className="space-y-1.5">
                      <p className="text-sm font-medium">{app.name}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-10 shrink-0">CPU</span>
                        <div className="flex-1 h-2 rounded-full bg-muted/40 overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${Math.max(4, (app.cpu_percent / maxCpu) * 100)}%` }} />
                        </div>
                        <span className="text-xs font-medium w-14 text-right shrink-0">{app.cpu_percent}%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-10 shrink-0">MEM</span>
                        <div className="flex-1 h-2 rounded-full bg-muted/40 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.max(4, (app.memory_mb / maxMem) * 100)}%` }} />
                        </div>
                        <span className="text-xs font-medium w-14 text-right shrink-0">{app.memory_mb} MB</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Geen per-app data beschikbaar</p>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Nog geen metingen ontvangen.</p>
        )}
      </div>
      )}

      {activeSection === "algemeen" && (
        <>
      <h2 className="font-semibold flex items-center gap-2">
        <BarChart2 className="w-4 h-4" /> Algemeen
      </h2>
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

      {/* Extra live cards */}
      {!latestQ.isLoading && !latestQ.isError && m && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={Gauge}
            label="Load average"
            value={`${m.load_avg_1m?.toFixed(2) ?? "—"}`}
            sub={`5m: ${m.load_avg_5m?.toFixed(2) ?? "—"} · 15m: ${m.load_avg_15m?.toFixed(2) ?? "—"}`}
          />
          <MetricCard
            icon={Users}
            label="SSH sessies"
            value={na(m.ssh_users)}
            warn={typeof m.ssh_users === "number" && m.ssh_users > 1}
          />
          <ExpandableMetricCard
            icon={Network}
            label="Netwerkverbindingen"
            value={na(m.network_connections)}
          >
            {networkDetail?.top_ips && networkDetail.top_ips.length > 0 ? (
              <ul className="space-y-1">
                {networkDetail.top_ips.map((entry) => (
                  <li key={entry.ip} className="flex items-center justify-between text-xs px-2 py-1 rounded bg-muted/40">
                    <span className="font-mono">{entry.ip}</span>
                    <span className="text-muted-foreground">{entry.connections} verbindingen</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground">Geen data beschikbaar</p>
            )}
          </ExpandableMetricCard>
          <MetricCard
            icon={Globe}
            label="Nginx connecties"
            value={na(m.nginx_connections)}
          />
        </div>
      )}

      {/* Systeem gezondheid */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-semibold flex items-center gap-2">
            <Lock className="w-4 h-4" /> Systeem gezondheid
          </h2>
          <p className="text-xs text-muted-foreground">Ververst 1x per dag</p>
        </div>

        {dailyCheckQ.isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : dailyCheckQ.isError ? (
          <ErrorBox message={(dailyCheckQ.error as Error).message} />
        ) : dc ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              icon={PackageCheck}
              label="Pending updates"
              value={na(dc.pending_updates)}
              warn={typeof dc.pending_updates === "number" && dc.pending_updates > 0}
            />
            <MetricCard
              icon={ArrowDownUp}
              label="Bandbreedte (totaal)"
              value={
                dc.network_rx_total_mb != null && dc.network_tx_total_mb != null
                  ? `${(dc.network_rx_total_mb / 1024).toFixed(1)} / ${(dc.network_tx_total_mb / 1024).toFixed(1)} GB`
                  : "n.v.t."
              }
              sub="RX / TX"
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-6 text-center">Nog geen daily-check data ontvangen.</p>
        )}
      </div>

      {/* Server-basis */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Info className="w-4 h-4" /> Server-basis
        </h2>
        {dailyCheckQ.isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : dailyCheckQ.isError ? (
          <ErrorBox message={(dailyCheckQ.error as Error).message} />
        ) : dc ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard icon={Globe} label="Datacenter" value={dc.datacenter_location ?? "Falkenstein"} />
            <MetricCard icon={ServerIcon} label="OS-versie" value={dc.os_version ?? "n.v.t."} />
            <MetricCard icon={ServerIcon} label="Kernel-versie" value={dc.kernel_version ?? "n.v.t."} />
            <MetricCard icon={Network} label="IP-adres" value={dc.ip_address ?? "n.v.t."} />
            <MetricCard icon={ServerIcon} label="Hostname" value={dc.hostname ?? "n.v.t."} />
            <MetricCard icon={Clock} label="Tijdzone" value={dc.timezone ?? "n.v.t."} />
            <MetricCard icon={Activity} label="Server-leeftijd" value={formatServerAge(dc.server_created_at)} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-6 text-center">Nog geen daily-check data ontvangen.</p>
        )}
      </div>
        </>
      )}

      {activeSection === "week" && (
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Activity className="w-4 h-4" /> Week-over-week vergelijking
        </h2>
        {compareWeeksQ.isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : compareWeeksQ.isError ? (
          <ErrorBox message={(compareWeeksQ.error as Error).message} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {compareRows.map(({ key, label }) => {
              const metric = getCompareMetric(key);
              if (!metric) {
                return (
                  <div key={key} className="rounded-lg border border-border bg-card p-5">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">{label}</p>
                    <p className="text-sm text-muted-foreground">Geen data beschikbaar</p>
                  </div>
                );
              }
              return (
                <div key={key} className="rounded-lg border border-border bg-card p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">{label}</p>
                  <p className="font-display text-xl font-bold flex items-center gap-1.5">
                    <TrendIcon pct={metric.pct} />
                    {metric.pct > 0 ? "+" : ""}{metric.pct.toFixed(0)}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    t.o.v. vorige week ({metric.thisWeek.toFixed(1)}{metric.unit} vs {metric.lastWeek.toFixed(1)}{metric.unit})
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      )}

      {activeSection === "hetzner" && (
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Euro className="w-4 h-4" /> Hetzner kosten
        </h2>
        {hetznerLatestQ.isLoading ? (
          <div className="h-16 animate-pulse bg-muted/40 rounded-lg" />
        ) : hetznerLatestQ.isError ? (
          <ErrorBox message={(hetznerLatestQ.error as Error).message} />
        ) : hetznerLatest ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Huidige maand</p>
              <p className="font-display text-3xl font-bold">
                {(hetznerLatest.amount ?? hetznerLatest.amount_eur ?? hetznerLatest.cost) != null
                  ? `€${Number(hetznerLatest.amount ?? hetznerLatest.amount_eur ?? hetznerLatest.cost).toFixed(2)}`
                  : "n.v.t."}
              </p>
            </div>
            {hetznerHistoryQ.isLoading ? (
              <div className="h-24 animate-pulse bg-muted/40 rounded-lg" />
            ) : hetznerHistory.length > 0 ? (
              <div className="space-y-1.5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Laatste 6 maanden</p>
                {hetznerHistory.map((row: any, i: number) => {
                  const rowAmount = (r: any) => Number(r.amount ?? r.amount_eur ?? r.cost ?? 0);
                  const max = Math.max(...hetznerHistory.map(rowAmount), 1);
                  const pct = Math.max(4, (rowAmount(row) / max) * 100);
                  return (
                    <div key={row.month ?? i} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-16 shrink-0">{row.month ?? "—"}</span>
                      <div className="flex-1 h-2 rounded-full bg-muted/40 overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-medium w-16 text-right shrink-0">
                        €{rowAmount(row).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Nog geen historische kostendata beschikbaar.</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-6 text-center">Nog geen kostendata ontvangen.</p>
        )}
      </div>
      )}

      {activeSection === "netwerk" && (
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-semibold flex items-center gap-2">
            <Network className="w-4 h-4" /> Netwerkverkeer
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setNetworkAutoScale((a) => !a)}
              className={`px-3 py-1 text-xs rounded-md border transition-colors ${networkAutoScale ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary"}`}
              title="Schaal automatisch aanpassen op basis van de hoogste waarde"
            >
              {networkAutoScale ? "Auto-schaal" : "Vast"}
            </button>
            <div className="flex gap-1.5">
              {HOURS_OPTIONS.map(o => (
                <button
                  key={o.value}
                  onClick={() => setNetworkHours(o.value)}
                  className={`px-3 py-1 text-xs rounded-md border transition-colors ${networkHours === o.value ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary"}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {networkHistoryQ.isLoading ? (
          <div className="h-52 animate-pulse bg-muted/40 rounded-lg" />
        ) : networkHistoryQ.isError ? (
          <ErrorBox message={(networkHistoryQ.error as Error).message} />
        ) : !hasNetworkData ? (
          <p className="text-sm text-muted-foreground py-10 text-center">Geen netwerkdata voor deze periode.</p>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={networkChartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} interval="preserveStartEnd" />
                <YAxis domain={networkYDomain ?? ["auto", "auto"]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} unit=" MB" />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: any) => [`${v} MB`]}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, cursor: "pointer" }}
                  onClick={(e: any) => {
                    const key = e.dataKey as "rx" | "tx";
                    setVisibleNetworkSeries((prev) => ({ ...prev, [key]: !prev[key] }));
                  }}
                  formatter={(value: string, entry: any) => (
                    <span style={{ opacity: visibleNetworkSeries[entry.dataKey as "rx" | "tx"] ? 1 : 0.4 }}>
                      {value}
                    </span>
                  )}
                />
                <Line type="monotone" dataKey="rx" name="Inkomend (RX)" stroke="#8b5cf6" dot={false} strokeWidth={1.5} connectNulls hide={!visibleNetworkSeries.rx} />
                <Line type="monotone" dataKey="tx" name="Uitgaand (TX)" stroke="#f59e0b" dot={false} strokeWidth={1.5} connectNulls hide={!visibleNetworkSeries.tx} />
                <Brush
                  dataKey="t"
                  height={22}
                  travellerWidth={8}
                  stroke="var(--border)"
                  fill="var(--card)"
                  tickFormatter={() => ""}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground text-center">
              Sleep de balk onderaan om in te zoomen op een periode. Klik op RX/TX in de legenda om te filteren.
            </p>
          </>
        )}
      </div>
      )}

      {activeSection === "disk-groei" && (
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-semibold flex items-center gap-2">
            <HardDrive className="w-4 h-4" /> Disk-groei
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setDiskAutoScale((a) => !a)}
              className={`px-3 py-1 text-xs rounded-md border transition-colors ${diskAutoScale ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary"}`}
              title="Schaal automatisch aanpassen op basis van de hoogste waarde"
            >
              {diskAutoScale ? "Auto-schaal" : "Vast"}
            </button>
            <div className="flex gap-1.5">
              {DISK_DAYS_OPTIONS.map(o => (
                <button
                  key={o.value}
                  onClick={() => setDiskDays(o.value)}
                  className={`px-3 py-1 text-xs rounded-md border transition-colors ${diskDays === o.value ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary"}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {diskHistoryQ.isLoading ? (
          <div className="h-52 animate-pulse bg-muted/40 rounded-lg" />
        ) : diskHistoryQ.isError ? (
          <ErrorBox message={(diskHistoryQ.error as Error).message} />
        ) : diskChartData.length === 0 ? (
          <p className="text-sm text-muted-foreground py-10 text-center">Geen data voor deze periode.</p>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={diskChartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} interval="preserveStartEnd" />
                <YAxis domain={diskYDomain} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} unit=" GB" />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: any) => [`${v} GB`]}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="disk" name="Disk gebruikt" stroke="#10b981" dot={false} strokeWidth={1.5} connectNulls />
                <Brush
                  dataKey="t"
                  height={22}
                  travellerWidth={8}
                  stroke="var(--border)"
                  fill="var(--card)"
                  tickFormatter={() => ""}
                />
              </LineChart>
            </ResponsiveContainer>
            {diskForecastText && (
              <p className={`text-xs text-center ${diskForecastCritical ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                {diskForecastText}
              </p>
            )}
            <p className="text-xs text-muted-foreground text-center">
              Sleep de balk onderaan om in te zoomen op een periode.
            </p>
          </>
        )}
      </div>
      )}

      {activeSection === "historie" && (
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-semibold flex items-center gap-2">
            <Activity className="w-4 h-4" /> Historie
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setAutoScale((a) => !a)}
              className={`px-3 py-1 text-xs rounded-md border transition-colors ${autoScale ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary"}`}
              title="Schaal automatisch aanpassen op basis van de hoogste waarde"
            >
              {autoScale ? "Auto-schaal" : "0-100%"}
            </button>
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
            <ExportButton
              onExport={async () => {
                const csv = await metricsExportFn({ data: 168 });
                downloadCsv("metrics-export.csv", csv as string);
              }}
            />
          </div>
        </div>

        {historyQ.isLoading ? (
          <div className="h-52 animate-pulse bg-muted/40 rounded-lg" />
        ) : historyQ.isError ? (
          <ErrorBox message={(historyQ.error as Error).message} />
        ) : chartData.length === 0 ? (
          <p className="text-sm text-muted-foreground py-10 text-center">Geen data voor deze periode.</p>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} interval="preserveStartEnd" />
                <YAxis domain={yDomain} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} unit="%" />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: any) => [`${v}%`]}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, cursor: "pointer" }}
                  onClick={(e: any) => {
                    const key = e.dataKey as "cpu" | "ram" | "disk";
                    setVisibleSeries((prev) => ({ ...prev, [key]: !prev[key] }));
                  }}
                  formatter={(value: string, entry: any) => (
                    <span style={{ opacity: visibleSeries[entry.dataKey as "cpu" | "ram" | "disk"] ? 1 : 0.4 }}>
                      {value}
                    </span>
                  )}
                />
                <Line type="monotone" dataKey="cpu" name="CPU" stroke="#fe2c02" dot={false} strokeWidth={1.5} connectNulls hide={!visibleSeries.cpu} />
                <Line type="monotone" dataKey="ram" name="RAM" stroke="#3b82f6" dot={false} strokeWidth={1.5} connectNulls hide={!visibleSeries.ram} />
                <Line type="monotone" dataKey="disk" name="Disk" stroke="#10b981" dot={false} strokeWidth={1.5} connectNulls hide={!visibleSeries.disk} />
                <Brush
                  dataKey="t"
                  height={22}
                  travellerWidth={8}
                  stroke="var(--border)"
                  fill="var(--card)"
                  tickFormatter={() => ""}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground text-center">
              Sleep de balk onderaan om in te zoomen op een periode. Klik op CPU/RAM/Disk in de legenda om te filteren.
            </p>
          </>
        )}
      </div>
      )}

      {activeSection === "logs" && (
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-semibold">Logs</h2>
          <div className="flex items-center gap-3 flex-wrap">
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
            <ExportButton
              onExport={async () => {
                const csv = await logsExportFn({ data: 1000 });
                downloadCsv("logs-export.csv", csv as string);
              }}
            />
          </div>
        </div>

        {/* Actieve alerts, samen met de logs */}
        {!alertsQ.isLoading && !alertsQ.isError && alerts.length > 0 && (
          <div className="divide-y divide-border border-b border-border">
            {alerts.map((alert) => {
              const critical = alert.severity === "critical";
              return (
                <div
                  key={alert.id}
                  className={`p-3 flex items-start gap-3 ${critical ? "bg-destructive/5" : "bg-amber-500/5"}`}
                >
                  <Bell className={`w-4 h-4 shrink-0 mt-0.5 ${critical ? "text-destructive" : "text-amber-500"}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold ${critical ? "text-destructive" : "text-amber-600"}`}>
                      {critical ? "Kritiek" : "Waarschuwing"}
                    </p>
                    <p className="text-sm mt-0.5">{alert.message}</p>
                    {alert.created_at && (
                      <p className="text-xs text-muted-foreground mt-0.5">{formatDateTimeShort(alert.created_at)}</p>
                    )}
                  </div>
                  <button
                    onClick={() => resolveAlertM.mutate(alert.id)}
                    disabled={resolveAlertM.isPending}
                    className="px-2.5 py-1 text-xs rounded-md border border-border bg-card hover:border-primary transition-colors shrink-0 disabled:opacity-50"
                  >
                    Afhandelen
                  </button>
                </div>
              );
            })}
          </div>
        )}

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
      )}

        </div>
      </div>
    </div>
  );
}
