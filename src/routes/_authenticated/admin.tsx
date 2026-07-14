import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useMemo, useEffect } from "react";
import {
  BarChart2, Users, GitPullRequest, Inbox, MessageSquare, Calendar,
  MessagesSquare, UserCheck, Trash2, Key, ShoppingCart, Link2,
  ChevronDown, ArrowUp, ArrowDown, Users2, Bell, Archive,
  AlertTriangle, Shield, ChevronLeft, RefreshCw, CheckCircle, XCircle,
  Clock, Activity, Target,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminGetOverview,
  adminGetCustomer,
  adminCreateCustomerFn,
  adminUpdateCustomer,
  adminGrantCredits,
  adminSendNotification,
  adminSendPasswordReset,
  adminSetPassword,
  adminAddCost,
  adminDeleteCost,
  adminAddOnboardingItem,
  adminToggleOnboardingItem,
  adminDeleteOnboardingItem,
  adminListAppointments,
  adminCreateAppointment,
  adminDeleteAppointment,
  adminListPasswordResets,
  adminMarkPasswordResetHandled,
  adminListExtraChangeRequests,
  adminApproveExtraChangeRequest,
  adminRejectExtraChangeRequest,
  adminUpdateWebsiteLink,
  adminGetAllAlerts,
  adminSnoozeAlert,
  adminMarkAlertSeen,
} from "@/lib/admin.functions";
import {
  adminListNotifications,
  adminMarkNotificationRead,
  adminMarkAllNotificationsRead,
  adminArchiveChange,
  adminUnarchiveChange,
  adminAssignChange,
  adminListArchivedChanges,
} from "@/lib/accounts.functions";
import {
  adminSetFreeQuota,
} from "@/lib/admin.functions";
import { AdminChatPanel } from "@/components/AdminChatPanel";
import { TeamTab } from "@/components/TeamTab";
import { DeletedChangesTab } from "@/components/DeletedChangesTab";
import { BerichtenTab } from "@/components/BerichtenTab";
import { usePermissions } from "@/hooks/use-permissions";
import { LeadsPanel } from "@/components/LeadsPanel";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="bg-muted/30 p-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="p-3 flex gap-4">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin â€” AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

const eur = (cents: number) => `â‚¬${(cents / 100).toFixed(2)}`;

function AdminPage() {
  // Kind-routes (bv. /admin/projecten) delen deze route als parent
  // (TanStack Router file-based routing) en moeten via Outlet gerenderd worden
  // in plaats van het dashboard hieronder. Deze check staat nÃ¡ alle hooks
  // (verderop) om de Rules of Hooks niet te schenden.
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const fetchOv = useServerFn(adminGetOverview);
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: () => fetchOv({}),
  });

  type TabKey =
    | "dashboard" | "klanten" | "accounts" | "password_resets" | "extra_changes"
    | "changes" | "archived" | "berichten" | "aanvragen" | "notifications"
    | "website_links" | "alerts" | "role_permissions" | "team" | "afspraken"
    | "chat" | "deleted" | "leads";
  const [tab, setTab] = useState<TabKey>("dashboard");
  const [openCustomer, setOpenCustomer] = useState<string | null>(null);
  const perms = usePermissions();

  // Pending counts for sidebar badges
  const listResets = useServerFn(adminListPasswordResets);
  const listExtras = useServerFn(adminListExtraChangeRequests);
  const resetsQ = useQuery({ queryKey: ["admin-password-resets"], queryFn: () => listResets({}) });
  const extrasQ = useQuery({ queryKey: ["admin-extra-changes"], queryFn: () => listExtras({}) });
  const pendingResets = (resetsQ.data?.items ?? []).filter((r: any) => r.status === "pending").length;
  const pendingExtras = (extrasQ.data?.items ?? []).filter((r: any) => r.status === "pending").length;

  // New-activity tracking via localStorage
  const [adminSeen, setAdminSeen] = useState<Record<string, number>>(() => {
    try { return JSON.parse(localStorage.getItem("aimi_admin_seen") ?? "{}"); } catch { return {}; }
  });
  const markAdminTabSeen = (tabKey: string) => {
    const updated = { ...adminSeen, [tabKey]: Date.now() };
    setAdminSeen(updated);
    localStorage.setItem("aimi_admin_seen", JSON.stringify(updated));
  };

  // Unread chat messages from client
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  useEffect(() => {
    supabase
      .from("chat_messages")
      .select("id", { count: "exact", head: true })
      .eq("sender_type", "client")
      .eq("is_read", false)
      .then(({ count }) => setUnreadChatCount(count ?? 0));
  }, []);

  if (pathname !== "/admin") return <Outlet />;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-40" />
        <div className="grid sm:grid-cols-3 gap-4">
          {[1,2,3].map(i => <Skeleton key={i} className="h-28 rounded-lg" />)}
        </div>
        <TableSkeleton cols={5} />
      </div>
    );
  }
  if (error) {
    const msg = (error as Error).message;
    if (msg.includes("Forbidden")) {
      if (perms.isLoading) return <p className="text-muted-foreground">Ladenâ€¦</p>;
      // Sales-rol: geen toegang tot de admin-overzichtsdata, wel tot Leads.
      if (perms.can("leads_view")) {
        return (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-4xl font-bold">Sales</h1>
              <p className="text-muted-foreground">Beheer je leads en houd contact bij.</p>
            </div>
            <LeadsPanel />
          </div>
        );
      }
      return (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6">
          <h2 className="font-display text-xl font-semibold">Geen toegang</h2>
          <p className="text-sm text-muted-foreground mt-2">Je account heeft geen admin-rol.</p>
        </div>
      );
    }
    return <p className="text-destructive">Fout: {msg}</p>;
  }
  if (!data) return null;

  const cutoff24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const customerIds = new Set(data.customers.map((c: any) => c.id));

  // New requests since last time "changes" tab was opened
  const lastSeenChanges = adminSeen["changes"] ?? 0;
  const newChanges = data.requests.filter(
    (r: any) => new Date(r.created_at).getTime() > lastSeenChanges,
  ).length;

  // New customer comments since last time "berichten" tab was opened
  const lastSeenBerichten = adminSeen["berichten"] ?? 0;
  const newBerichten = data.requests.reduce((acc: number, r: any) => {
    const comments: any[] = r.change_comments ?? [];
    return acc + comments.filter(
      (c) => customerIds.has(c.author_id) && new Date(c.created_at).getTime() > lastSeenBerichten,
    ).length;
  }, 0);

  const groups: { label: string; items: { key: TabKey; label: string; icon: any; badge?: number; alert?: boolean; href?: string }[] }[] = [
    { label: "Overzicht", items: [{ key: "dashboard", label: "Dashboard", icon: BarChart2 }] },
    { label: "Klanten", items: [
      { key: "klanten", label: `Alle klanten (${data.customers.length})`, icon: Users },
      { key: "password_resets", label: "Wachtwoord reset verzoeken", icon: Key, badge: pendingResets },
      { key: "extra_changes", label: "Extra change aanvragen", icon: ShoppingCart, badge: pendingExtras },
    ]},
    { label: "Werk", items: [
      { key: "changes" as TabKey, label: `Changes (${data.requests.length})`, icon: GitPullRequest, alert: newChanges > 0, badge: newChanges || undefined, href: "/admin/changes" },
      { key: "archived", label: "Gearchiveerd", icon: Archive },
      { key: "berichten", label: "Berichten", icon: MessageSquare, alert: newBerichten > 0, badge: newBerichten || undefined },
      { key: "aanvragen", label: `Aanvragen (${data.pendingPurchases.length})`, icon: Inbox, badge: data.pendingPurchases.length || undefined },
    ]},
    { label: "Beheer", items: [
      { key: "accounts" as TabKey, label: "Accounts", icon: Users2, href: "/admin/accounts" },
      { key: "notifications", label: "Notificaties", icon: Bell },
      { key: "projecten" as TabKey, label: "Projecten", icon: Link2, href: "/admin/projecten" },
      { key: "alerts", label: "Alerts", icon: AlertTriangle },
      ...(perms.isSuperAdmin ? [{ key: "role_permissions" as TabKey, label: "Rollen & Permissies", icon: Shield, href: "/admin/rollen" }] : []),
      { key: "team", label: "Team", icon: UserCheck },
      { key: "afspraken", label: "Afspraken", icon: Calendar },
      { key: "server" as TabKey, label: "Server monitoring", icon: Activity, href: "/server" },
    ]},
    ...(perms.can("leads_view")
      ? [{ label: "Sales", items: [{ key: "leads" as TabKey, label: "Leads", icon: Target }] }]
      : []),
    { label: "Overig", items: [
      { key: "chat", label: "Chat", icon: MessagesSquare, badge: unreadChatCount || undefined },
      { key: "deleted", label: "Verwijderd", icon: Trash2 },
    ]},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold">Admin</h1>
          <p className="text-muted-foreground">Beheer klanten, changes en groei.</p>
        </div>
        <NotificationsBell onOpen={() => setTab("notifications")} />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <AdminSidebar groups={groups} active={tab} setActive={(k) => { setTab(k); markAdminTabSeen(k); }} />

        <div className="flex-1 min-w-0">
          {tab === "dashboard" && <Dashboard metrics={data.metrics} openChanges={data.requests.filter((r: any) => r.status !== "done" && r.status !== "rejected" && r.status !== "invoiced").length} pendingTotal={pendingResets + pendingExtras} onGoChanges={() => { setTab("changes"); markAdminTabSeen("changes"); }} onGoPending={() => setTab("password_resets")} recentRequests={data.requests.filter((r: any) => new Date(r.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000))} recentComments={data.requests.flatMap((r: any) => (r.change_comments ?? []).filter((c: any) => customerIds.has(c.author_id) && new Date(c.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)).map((c: any) => ({ ...c, requestTitle: r.title })))} onGoBerichten={() => { setTab("berichten"); markAdminTabSeen("berichten"); }} />}
          {tab === "klanten" && (<KlantenTab data={data} qc={qc} openCustomer={openCustomer} setOpenCustomer={setOpenCustomer} />)}
          {tab === "notifications" && <NotificationsPanel />}
          {tab === "password_resets" && <PasswordResetsPanel />}
          {tab === "extra_changes" && <ExtraChangesPanel />}
          {tab === "archived" && <ArchivedChangesPanel />}
          {tab === "aanvragen" && <AanvragenTab data={data} qc={qc} />}
          {tab === "berichten" && <BerichtenTab />}
          {tab === "afspraken" && <AfsprakenTab customers={data.customers} qc={qc} />}
          {tab === "chat" && <AdminChatPanel />}
          {tab === "team" && <TeamTab />}
          {tab === "deleted" && <DeletedChangesTab />}
          {tab === "alerts" && <AlertsPanel />}
          {tab === "leads" && perms.can("leads_view") && <LeadsPanel />}
        </div>

      </div>
    </div>
  );
}

function Dashboard({ metrics, openChanges, pendingTotal, onGoChanges, onGoPending, recentRequests, recentComments, onGoBerichten }: {
  metrics: any; openChanges: number; pendingTotal: number;
  onGoChanges: () => void; onGoPending: () => void; onGoBerichten: () => void;
  recentRequests: any[]; recentComments: any[];
}) {
  const max = Math.max(1, ...metrics.months.map((m: any) => m.count));
  const hasNew = recentRequests.length > 0 || recentComments.length > 0;
  return (
    <div className="space-y-6">
      {hasNew && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-3">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <span style={{ color: "#fe2c02" }}>!</span> Nieuw binnengekomen (afgelopen 24 uur)
          </h3>
          {recentRequests.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Nieuwe changes ({recentRequests.length})</p>
              <ul className="space-y-1">
                {recentRequests.slice(0, 5).map((r: any) => (
                  <li key={r.id} className="flex items-center justify-between text-sm">
                    <button onClick={onGoChanges} className="text-left hover:text-primary truncate max-w-[70%]">{r.title}</button>
                    <span className="text-xs text-muted-foreground shrink-0">{new Date(r.created_at).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {recentComments.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Nieuwe berichten van klanten ({recentComments.length})</p>
              <ul className="space-y-1">
                {recentComments.slice(0, 5).map((c: any) => (
                  <li key={c.id} className="flex items-center justify-between text-sm">
                    <button onClick={onGoBerichten} className="text-left hover:text-primary truncate max-w-[70%]">{c.requestTitle}: {c.body?.slice(0, 60)}</button>
                    <span className="text-xs text-muted-foreground shrink-0">{new Date(c.created_at).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Users} label="Klanten" value={metrics.totalCustomers} sub="Totaal aantal accounts" trend={0} />
        <MetricCard icon={UserCheck} label="Actief (30d)" value={metrics.activeCount} sub="Inlog in afgelopen 30 dagen" trend={0} />
        <MetricCard icon={GitPullRequest} label="Totaal changes" value={metrics.totalRequests} sub="Sinds start" trend={0} />
        <MetricCard icon={BarChart2} label="Gem. responstijd" value={metrics.avgResponseHours ?? "â€”"} sub="Uren tot afronding" trend={0} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <button onClick={onGoChanges} className="text-left">
          <MetricCard icon={GitPullRequest} label="Openstaande changes" value={openChanges} sub="Bekijk changes â†’" trend={0} />
        </button>
        <button onClick={onGoPending} className="text-left">
          <MetricCard icon={Inbox} label="Pending verzoeken" value={pendingTotal} sub="Reset + extra changes" trend={0} highlight={pendingTotal > 0} />
        </button>
      </div>
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Nieuwe klanten per maand</h3>
        <div className="flex items-end gap-2 h-32">
          {metrics.months.map((m: any) => (
            <div key={m.label} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-primary rounded-t" style={{ height: `${(m.count / max) * 100}%`, minHeight: m.count ? 4 : 0 }} />
              <span className="text-xs text-muted-foreground">{m.label.slice(5)}</span>
              <span className="text-xs font-semibold">{m.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, sub, trend, highlight }: { icon: any; label: string; value: any; sub: string; trend: number; highlight?: boolean }) {
  const TrendIcon = trend >= 0 ? ArrowUp : ArrowDown;
  const trendColor = trend > 0 ? "text-emerald-600" : trend < 0 ? "text-destructive" : "text-muted-foreground";
  return (
    <div className={`rounded-lg border p-5 ${highlight ? "border-amber-500/60 bg-amber-500/5" : "border-border bg-card"}`}>
      <div className="flex items-center justify-between">
        <Icon className="w-4 h-4 text-primary" />
        <span className={`text-xs inline-flex items-center gap-0.5 ${trendColor}`}>
          <TrendIcon className="w-3 h-3" />{Math.abs(trend)}%
        </span>
      </div>
      <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function Card({ label, value, accent }: { label: string; value: any; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-5 ${accent ? "border-primary/40 bg-primary/5" : "border-border bg-card"}`}>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}

function AdminSidebar({ groups, active, setActive }: { groups: any[]; active: string; setActive: (k: any) => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ Overzicht: true, Klanten: true, Werk: true, Beheer: true, Overig: true });
  return (
    <nav aria-label="Admin secties" className="md:w-60 md:shrink-0 md:border-r border-border md:pr-4">
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
                {g.items.map((it: any) => {
                  const Icon = it.icon;
                  const isActive = active === it.key;
                  return (
                    <li key={it.key}>
                      {it.href ? (
                        <Link
                          to={it.href}
                          className="w-full flex items-center gap-2 px-2 py-1.5 text-sm transition-colors"
                          style={{ borderLeft: "2px solid transparent", paddingLeft: "8px" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--primary)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = ""; }}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="truncate">{it.label}</span>
                        </Link>
                      ) : (
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
                          {it.alert && it.badge > 0 ? (
                            <span className="text-[10px] font-semibold rounded-full px-1.5 py-0.5 bg-primary text-white flex items-center gap-0.5">
                              <span>!</span><span>{it.badge}</span>
                            </span>
                          ) : it.badge > 0 ? (
                            <span className="text-[10px] font-semibold rounded-full px-1.5 py-0.5 bg-destructive text-destructive-foreground">
                              {it.badge}
                            </span>
                          ) : null}
                        </button>
                      )}
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

function PasswordResetsPanel() {
  const list = useServerFn(adminListPasswordResets);
  const mark = useServerFn(adminMarkPasswordResetHandled);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-password-resets"], queryFn: () => list({}) });
  const markM = useMutation({
    mutationFn: (id: string) => mark({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-password-resets"] }); toast.success("Gemarkeerd als afgehandeld."); },
  });
  const [view, setView] = useState<"pending" | "handled">("pending");
  if (isLoading) return <TableSkeleton cols={5} />;
  const items = (data?.items ?? []).filter((r: any) => view === "pending" ? r.status === "pending" : r.status !== "pending");
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["pending", "handled"] as const).map(v => (
          <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 text-sm rounded-md border ${view === v ? "bg-foreground text-background border-foreground" : "border-border"}`}>
            {v === "pending" ? "Open" : "Afgehandeld"}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-muted-foreground">
            <tr><th className="text-left p-3">Naam</th><th className="text-left p-3">E-mail</th><th className="text-left p-3">Aangevraagd</th><th className="text-left p-3">Status</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {items.map((r: any) => (
              <tr key={r.id} className="border-t border-border">
                <td className="p-3">{r.user_name || "â€”"}</td>
                <td className="p-3">{r.user_email}</td>
                <td className="p-3">{new Date(r.requested_at).toLocaleString("nl-NL")}</td>
                <td className="p-3">{r.status}</td>
                <td className="p-3 text-right">
                  {r.status === "pending" && (
                    <button onClick={() => markM.mutate(r.id)} className="text-xs text-primary hover:underline">Markeer als afgehandeld</button>
                  )}
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Geen verzoeken.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExtraChangesPanel() {
  const list = useServerFn(adminListExtraChangeRequests);
  const approve = useServerFn(adminApproveExtraChangeRequest);
  const reject = useServerFn(adminRejectExtraChangeRequest);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-extra-changes"], queryFn: () => list({}) });
  const inv = () => qc.invalidateQueries({ queryKey: ["admin-extra-changes"] });
  const approveM = useMutation({ mutationFn: (id: string) => approve({ data: { id } }), onSuccess: () => { inv(); toast.success("Goedgekeurd."); } });
  const rejectM = useMutation({ mutationFn: (id: string) => reject({ data: { id } }), onSuccess: () => { inv(); toast.success("Afgewezen."); } });
  if (isLoading) return <TableSkeleton cols={7} />;
  const items = data?.items ?? [];
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/30 text-muted-foreground">
          <tr><th className="text-left p-3">Naam</th><th className="text-left p-3">E-mail</th><th className="text-left p-3">Aantal</th><th className="text-left p-3">Bedrag</th><th className="text-left p-3">Aangevraagd</th><th className="text-left p-3">Status</th><th className="p-3"></th></tr>
        </thead>
        <tbody>
          {items.map((r: any) => (
            <tr key={r.id} className="border-t border-border">
              <td className="p-3">{r.user_name || "â€”"}</td>
              <td className="p-3">{r.user_email}</td>
              <td className="p-3">{r.amount}</td>
              <td className="p-3">â‚¬{r.total_eur}</td>
              <td className="p-3">{new Date(r.requested_at).toLocaleString("nl-NL")}</td>
              <td className="p-3">{r.status}</td>
              <td className="p-3 text-right space-x-2 whitespace-nowrap">
                {r.status === "pending" && (<>
                  <button onClick={() => approveM.mutate(r.id)} className="text-xs text-primary hover:underline">Goedkeuren</button>
                  <button onClick={() => rejectM.mutate(r.id)} className="text-xs text-destructive hover:underline">Afwijzen</button>
                </>)}
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">Geen aanvragen.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function KlantenTab({ data, qc, openCustomer, setOpenCustomer }: any) {
  const createC = useServerFn(adminCreateCustomerFn);
  const grant = useServerFn(adminGrantCredits);
  const notify = useServerFn(adminSendNotification);
  const sendReset = useServerFn(adminSendPasswordReset);
  const setPw = useServerFn(adminSetPassword);

  const createM = useMutation({
    mutationFn: (i: any) => createC({ data: i }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-overview"] }),
  });
  const grantM = useMutation({
    mutationFn: (i: any) => grant({ data: i }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-overview"] }),
  });
  const notifyM = useMutation({
    mutationFn: (i: any) => notify({ data: i }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-overview"] }),
  });
  const resetM = useMutation({
    mutationFn: (email: string) =>
      sendReset({ data: { email, redirectTo: `${window.location.origin}/reset-password` } }),
  });
  const setPwM = useMutation({ mutationFn: (i: any) => setPw({ data: i }) });

  const [newC, setNewC] = useState({ email: "", full_name: "", company: "" });
  const [notifyState, setNotifyState] = useState<any>(null);
  const [filter, setFilter] = useState("");

  const filtered = data.customers.filter((c: any) => {
    const q = filter.toLowerCase();
    return !q || c.email?.toLowerCase().includes(q) || c.full_name?.toLowerCase().includes(q) || c.company?.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Create */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl font-semibold mb-4">Nieuwe klant</h2>
        <form
          className="grid sm:grid-cols-4 gap-3 items-end"
          onSubmit={(e) => {
            e.preventDefault();
            createM.mutate(newC, {
              onSuccess: () => setNewC({ email: "", full_name: "", company: "" }),
            });
          }}
        >
          <Field label="Naam" value={newC.full_name} onChange={(v: string) => setNewC({ ...newC, full_name: v })} required />
          <Field label="Email" type="email" value={newC.email} onChange={(v: string) => setNewC({ ...newC, email: v })} required />
          <Field label="Bedrijf" value={newC.company} onChange={(v: string) => setNewC({ ...newC, company: v })} />
          <button

            type="submit"
            disabled={createM.isPending}
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {createM.isPending ? "Bezigâ€¦" : "Aanmaken"}
          </button>
        </form>
        {createM.data && (
          <div className="mt-4 rounded-lg border border-primary/40 bg-primary/5 p-4 text-sm">
            <p className="font-semibold">Account aangemaakt voor {createM.data.email}</p>
            <p className="mt-2">Tijdelijk wachtwoord:</p>
            <code className="block mt-1 rounded bg-background px-2 py-1 font-mono">
              {createM.data.tempPassword}
            </code>
          </div>
        )}
        {createM.error && <p className="mt-3 text-sm text-destructive">{(createM.error as Error).message}</p>}
      </section>

      {/* Pending purchases moved to Aanvragen tab */}

      {/* Filter */}
      <input
        placeholder="Zoeken (naam, email, tag)â€¦"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm"
      />

      {/* Customers */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-muted-foreground">
            <tr>
              <th className="text-left p-3">Naam</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Pakket</th>
              <th className="text-left p-3">Gebruikt</th>
              <th className="text-left p-3">Acties</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c: any) => (
              <tr key={c.id} className="border-t border-border hover:bg-muted/20">
                <td className="p-3">
                  <button onClick={() => setOpenCustomer(c.id)} className="text-primary hover:underline">
                    {c.full_name || "â€”"}
                  </button>
                </td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.package || "â€”"} {c.monthly_price_cents ? `(${eur(c.monthly_price_cents)})` : ""}</td>
                <td className="p-3">{c.usedThisMonth}/{3 + c.extraCredits}</td>
                <td className="p-3 space-x-2 whitespace-nowrap">
                  <button onClick={() => setOpenCustomer(c.id)} className="text-xs text-primary hover:underline">bewerk</button>
                  <button
                    onClick={() => {
                      const n = parseInt(prompt(`Extra credits voor ${c.email}?`, "1") || "0", 10);
                      if (n > 0) grantM.mutate({ user_id: c.id, amount: n, reason: "Handmatig" });
                    }}
                    className="text-xs text-primary hover:underline"
                  >+credits</button>
                  <button onClick={() => setNotifyState({ user_id: c.id, title: "", message: "" })} className="text-xs text-primary hover:underline">notify</button>
                  <button
                    onClick={() => resetM.mutate(c.email)}
                    className="text-xs text-primary hover:underline"
                  >reset-mail</button>
                  <button
                    onClick={() => {
                      const pw = prompt(`Nieuw wachtwoord voor ${c.email} (min 8):`);
                      if (pw && pw.length >= 8) setPwM.mutate({ user_id: c.id, password: pw });
                    }}
                    className="text-xs text-primary hover:underline"
                  >set-pw</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Geen klanten.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {resetM.data?.link && (
        <div className="rounded-lg border border-primary/40 bg-primary/5 p-4 text-sm">
          <p className="font-semibold">Reset-link gegenereerd & gemaild:</p>
          <code className="block mt-1 break-all rounded bg-background p-2 text-xs">{resetM.data.link}</code>
        </div>
      )}
      {setPwM.isSuccess && (
        <p className="text-sm text-primary">Wachtwoord aangepast</p>
      )}
      {(resetM.error || setPwM.error) && (
        <p className="text-sm text-destructive">{((resetM.error || setPwM.error) as Error).message}</p>
      )}

      {/* Notification modal */}
      {notifyState && (
        <Modal onClose={() => setNotifyState(null)} title="Notificatie sturen">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              notifyM.mutate(notifyState, { onSuccess: () => setNotifyState(null) });
            }}
            className="space-y-3"
          >
            <input required placeholder="Titel" value={notifyState.title}
              onChange={(e) => setNotifyState({ ...notifyState, title: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <textarea required placeholder="Bericht" rows={4} value={notifyState.message}
              onChange={(e) => setNotifyState({ ...notifyState, message: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <button type="submit" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Verstuur</button>
          </form>
        </Modal>
      )}

      {openCustomer && (
        <CustomerDetailModal userId={openCustomer} onClose={() => setOpenCustomer(null)} qc={qc} />
      )}
    </div>
  );
}

function CustomerDetailModal({ userId, onClose, qc }: any) {
  const get = useServerFn(adminGetCustomer);
  const update = useServerFn(adminUpdateCustomer);
  const setQuota = useServerFn(adminSetFreeQuota);
  const addCost = useServerFn(adminAddCost);
  const delCost = useServerFn(adminDeleteCost);
  const addOnb = useServerFn(adminAddOnboardingItem);
  const togOnb = useServerFn(adminToggleOnboardingItem);
  const delOnb = useServerFn(adminDeleteOnboardingItem);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-customer", userId],
    queryFn: () => get({ data: { user_id: userId } }),
  });

  const inv = () => {
    qc.invalidateQueries({ queryKey: ["admin-customer", userId] });
    qc.invalidateQueries({ queryKey: ["admin-overview"] });
  };

  const updateM = useMutation({ mutationFn: (i: any) => update({ data: i }), onSuccess: inv });
  const setQuotaM = useMutation({ mutationFn: (i: any) => setQuota({ data: i }), onSuccess: inv });
  const addCostM = useMutation({ mutationFn: (i: any) => addCost({ data: i }), onSuccess: inv });
  const delCostM = useMutation({ mutationFn: (id: string) => delCost({ data: { id } }), onSuccess: inv });
  const addOnbM = useMutation({ mutationFn: (i: any) => addOnb({ data: i }), onSuccess: inv });
  const togOnbM = useMutation({ mutationFn: (i: any) => togOnb({ data: i }), onSuccess: inv });
  const delOnbM = useMutation({ mutationFn: (id: string) => delOnb({ data: { id } }), onSuccess: inv });

  const [form, setForm] = useState<any>(null);
  const [costForm, setCostForm] = useState({ description: "", amount: "" });
  const [onbLabel, setOnbLabel] = useState("");

  if (isLoading || !data || !data.profile) {
    return (
      <Modal onClose={onClose} title="Ladenâ€¦">
        <div className="space-y-3">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </Modal>
    );
  }
  const p = data.profile;

  const f = form ?? {
    full_name: p.full_name ?? "", company: p.company ?? "", email: p.email,
    phone: p.phone ?? "", address: p.address ?? "", kvk: p.kvk ?? "", btw: p.btw ?? "",
    package: p.package ?? "", monthly_price_cents: p.monthly_price_cents ?? 0,
    internal_notes: p.internal_notes ?? "",
    website_url: p.website_url ?? "",
    contact_person: p.contact_person ?? "",
    billing_address: p.billing_address ?? "",
  };

  return (
    <Modal onClose={onClose} title={`Klant: ${p.full_name || p.email}`} wide>
      <div className="space-y-6 text-sm">
        <section>
          <h3 className="font-semibold mb-2">Account</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ["full_name", "Naam"], ["company", "Bedrijf"], ["email", "Email"],
              ["phone", "Telefoon"], ["contact_person", "Contactpersoon"],
              ["address", "Adres"], ["billing_address", "Factuuradres"],
              ["kvk", "KVK"], ["btw", "BTW"],
              ["website_url", "Website URL (klant ziet 'Mijn Website' knop)"],
              ["package", "Pakket (bv. Starter/Pro)"],
            ].map(([k, label]) => (
              <Field key={k} label={label} value={f[k] ?? ""} onChange={(v: string) => setForm({ ...f, [k]: v })} />
            ))}
            <label className="block text-sm">
              <span className="text-muted-foreground">Maandprijs (â‚¬)</span>
              <input
                type="number" step="0.01"
                value={(f.monthly_price_cents / 100).toFixed(2)}
                onChange={(e) => setForm({ ...f, monthly_price_cents: Math.round(parseFloat(e.target.value || "0") * 100) })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
          </div>
          <label className="block text-sm mt-3">
            <span className="text-muted-foreground">Interne notities (klant ziet dit niet)</span>
            <textarea rows={3} value={f.internal_notes}
              onChange={(e) => setForm({ ...f, internal_notes: e.target.value })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </label>
          <button
            onClick={() => updateM.mutate({ user_id: userId, ...f })}
            disabled={updateM.isPending}
            className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
          >
            {updateM.isPending ? "Bezigâ€¦" : "Opslaan"}
          </button>
          {updateM.error && <p className="mt-2 text-destructive">{(updateM.error as Error).message}</p>}
        </section>

        <section>
          <h3 className="font-semibold mb-2">Gratis change-quotum</h3>
          <p className="text-xs text-muted-foreground mb-2">Standaard 3 per maand. Leeg = standaard.</p>
          <div className="flex items-center gap-2">
            <input
              type="number" min={0} max={100}
              defaultValue={p.free_quota_override ?? ""}
              placeholder="3"
              onBlur={(e) => {
                const v = e.target.value === "" ? null : parseInt(e.target.value, 10);
                setQuotaM.mutate({ user_id: userId, free_quota_override: v });
              }}
              className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <span className="text-xs text-muted-foreground">gratis changes / maand</span>
            {setQuotaM.isSuccess && <span className="text-xs text-primary">Opgeslagen</span>}
          </div>
        </section>

        <section>
          <h3 className="font-semibold mb-2">Kosten / facturen</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCostM.mutate({
                user_id: userId,
                description: costForm.description,
                amount_cents: Math.round(parseFloat(costForm.amount) * 100),
              }, { onSuccess: () => setCostForm({ description: "", amount: "" }) });
            }}
            className="flex gap-2 mb-3"
          >
            <input required placeholder="Omschrijving" value={costForm.description}
              onChange={(e) => setCostForm({ ...costForm, description: e.target.value })}
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input required type="number" step="0.01" placeholder="â‚¬" value={costForm.amount}
              onChange={(e) => setCostForm({ ...costForm, amount: e.target.value })}
              className="w-28 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <button className="rounded-full bg-primary px-4 text-sm text-primary-foreground">+</button>
          </form>
          <div className="space-y-1">
            {data.costs.map((c: any) => (
              <div key={c.id} className="flex justify-between border-b border-border py-1">
                <span>{c.cost_date} Â· {c.description}</span>
                <span>
                  {eur(c.amount_cents)}
                  <button onClick={() => delCostM.mutate(c.id)} className="ml-2 text-destructive">Ã—</button>
                </span>
              </div>
            ))}
            {data.costs.length === 0 && <p className="text-muted-foreground text-xs">Geen kosten geregistreerd.</p>}
          </div>
        </section>

        <section>
          <h3 className="font-semibold mb-2">Onboarding checklist</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!onbLabel.trim()) return;
              addOnbM.mutate({ user_id: userId, label: onbLabel }, { onSuccess: () => setOnbLabel("") });
            }}
            className="flex gap-2 mb-3"
          >
            <input value={onbLabel} onChange={(e) => setOnbLabel(e.target.value)}
              placeholder="Stap (bv. Domein gekoppeld)"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <button className="rounded-full bg-primary px-4 text-sm text-primary-foreground">+</button>
          </form>
          <ul className="space-y-1">
            {data.onboarding.map((o: any) => (
              <li key={o.id} className="flex items-center gap-2">
                <input type="checkbox" checked={o.done}
                  onChange={() => togOnbM.mutate({ id: o.id, done: !o.done })} />
                <span className={o.done ? "line-through text-muted-foreground" : ""}>{o.label}</span>
                <button onClick={() => delOnbM.mutate(o.id)} className="ml-auto text-destructive text-xs">Ã—</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Modal>
  );
}

function AanvragenTab({ data, qc }: any) {
  const grant = useServerFn(adminGrantCredits);
  const grantM = useMutation({
    mutationFn: (i: any) => grant({ data: i }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-overview"] }),
  });

  if (data.pendingPurchases.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Geen openstaande aanvragen voor extra changes.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Klanten die extra changes hebben aangevraagd. Stuur de factuur handmatig en klik
        daarna op <strong>Toekennen</strong> zodat de klant de changes kan gebruiken.
      </p>
      {data.pendingPurchases.map((p: any) => {
        const c = data.customers.find((c: any) => c.id === p.user_id) ?? {};
        return (
          <div key={p.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="text-sm space-y-1">
                <p className="font-semibold text-base">{c.full_name || "â€”"}</p>
                <p className="text-muted-foreground">{c.email}</p>
                {c.company && <p className="text-muted-foreground">Bedrijf: {c.company}</p>}
                {c.phone && <p className="text-muted-foreground">Tel: {c.phone}</p>}
                {(c.billing_address || c.address) && (
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    Adres: {c.billing_address || c.address}
                  </p>
                )}
                {c.kvk && <p className="text-muted-foreground">KVK: {c.kvk}</p>}
                {c.btw && <p className="text-muted-foreground">BTW: {c.btw}</p>}
                <p className="mt-2 font-medium text-foreground">
                  Aangevraagd: <strong>{p.amount}</strong> extra change(s) â€” â‚¬{p.amount * 20}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(p.created_at).toLocaleString("nl-NL")}
                </p>
              </div>
              <button
                onClick={() =>
                  grantM.mutate({
                    user_id: p.user_id,
                    amount: p.amount,
                    reason: `Aankoop ${p.amount}Ã— change`,
                    purchase_id: p.id,
                  })
                }
                disabled={grantM.isPending}
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
              >
                Toekennen
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AfsprakenTab({ customers, qc }: any) {
  const list = useServerFn(adminListAppointments);
  const create = useServerFn(adminCreateAppointment);
  const del = useServerFn(adminDeleteAppointment);
  const { data, isLoading } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: () => list({}),
  });
  const inv = () => qc.invalidateQueries({ queryKey: ["admin-appointments"] });
  const createM = useMutation({ mutationFn: (i: any) => create({ data: i }), onSuccess: inv });
  const delM = useMutation({ mutationFn: (id: string) => del({ data: { id } }), onSuccess: inv });

  const [form, setForm] = useState({
    user_id: "",
    title: "",
    scheduled_at: "",
    kind: "phone" as "phone" | "teams" | "in_person",
    location: "",
    notes: "",
  });

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createM.mutate(
            { ...form, scheduled_at: new Date(form.scheduled_at).toISOString() },
            {
              onSuccess: () =>
                setForm({
                  user_id: "",
                  title: "",
                  scheduled_at: "",
                  kind: "phone",
                  location: "",
                  notes: "",
                }),
            },
          );
        }}
        className="rounded-2xl border border-border bg-card p-4 space-y-3"
      >
        <h3 className="font-semibold">Nieuwe afspraak inplannen</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <select
            required
            value={form.user_id}
            onChange={(e) => setForm({ ...form, user_id: e.target.value })}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Kies klantâ€¦</option>
            {customers.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.full_name || c.email}
              </option>
            ))}
          </select>
          <input
            required
            placeholder="Onderwerp"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <input
            required
            type="datetime-local"
            value={form.scheduled_at}
            onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <select
            value={form.kind}
            onChange={(e) => setForm({ ...form, kind: e.target.value as any })}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="phone">Telefoon</option>
            <option value="teams">Teams</option>
            <option value="in_person">In het echt</option>
          </select>
          <input
            placeholder="Locatie / Teams-link / nummer"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="sm:col-span-2 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <textarea
            rows={2}
            placeholder="Notities"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="sm:col-span-2 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <button
          disabled={createM.isPending}
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {createM.isPending ? "Bezigâ€¦" : "Inplannen"}
        </button>
        {createM.error && (
          <p className="text-sm text-destructive">{(createM.error as Error).message}</p>
        )}
      </form>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      ) : data?.appointments.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nog geen afspraken.</p>
      ) : (
        <div className="space-y-2">
          {data?.appointments.map((a: any) => {
            const c = customers.find((c: any) => c.id === a.user_id);
            const kindIcon =
              a.kind === "teams" ? "Teams" : a.kind === "in_person" ? "In persoon" : "Telefoon";
            return (
              <div
                key={a.id}
                className="rounded-xl border border-border bg-card p-3 flex justify-between items-start gap-4"
              >
                <div className="text-sm">
                  <p className="font-semibold">
                    <span className="text-xs uppercase tracking-[0.08em] text-muted-foreground mr-2">{kindIcon}</span>{a.title}
                  </p>
                  <p className="text-muted-foreground">
                    {c?.full_name || c?.email || a.user_id} Â·{" "}
                    {new Date(a.scheduled_at).toLocaleString("nl-NL")}
                  </p>
                  {a.location && (
                    <p className="text-xs text-muted-foreground mt-1">Locatie: {a.location}</p>
                  )}
                  {a.notes && (
                    <p className="text-xs mt-1 whitespace-pre-wrap">{a.notes}</p>
                  )}
                </div>
                <button
                  onClick={() => delM.mutate(a.id)}
                  className="text-destructive text-xs"
                >
                  Verwijder
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Modal({ children, onClose, title, wide }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className={`w-full ${wide ? "max-w-3xl" : "max-w-md"} max-h-[90vh] overflow-auto rounded-2xl border border-border bg-card p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-display text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">Ã—</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: any) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input type={type} required={required} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
    </label>
  );
}

// ============================================================
// ============== ADMIN NOTIFICATIONS BELL + PANEL ============
// ============================================================
function NotificationsBell({ onOpen }: { onOpen: () => void }) {
  const list = useServerFn(adminListNotifications);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["admin-notifs"], queryFn: () => list({}), refetchInterval: 30_000 });
  useEffect(() => {
    const ch = supabase
      .channel("admin-notifs-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "admin_notifications" }, () => {
        qc.invalidateQueries({ queryKey: ["admin-notifs"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [qc]);
  const unread = (data?.items ?? []).filter((n: any) => !n.is_read).length;
  return (
    <button onClick={onOpen} className="relative rounded-full border border-border bg-card p-2 hover:bg-accent" aria-label="Notificaties">
      <Bell className="w-4 h-4" />
      {unread > 0 && (
        <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold flex items-center justify-center">{unread}</span>
      )}
    </button>
  );
}

function NotificationsPanel() {
  const list = useServerFn(adminListNotifications);
  const markRead = useServerFn(adminMarkNotificationRead);
  const markAll = useServerFn(adminMarkAllNotificationsRead);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-notifs"], queryFn: () => list({}) });
  const inv = () => qc.invalidateQueries({ queryKey: ["admin-notifs"] });
  const readM = useMutation({ mutationFn: (id: string) => markRead({ data: { id } }), onSuccess: inv });
  const allM = useMutation({ mutationFn: () => markAll({}), onSuccess: () => { inv(); toast.success("Alles gelezen."); } });

  if (isLoading) return <TableSkeleton cols={3} />;
  const items = data?.items ?? [];
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-xl font-semibold">Notificaties</h2>
        <button onClick={() => allM.mutate()} className="text-xs text-primary hover:underline">Alles markeren als gelezen</button>
      </div>
      <ul className="space-y-2">
        {items.map((n: any) => (
          <li key={n.id} className={`rounded-lg border p-3 ${n.is_read ? "border-border bg-card" : "border-primary/40 bg-primary/5"}`}>
            <div className="flex justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(n.created_at).toLocaleString("nl-NL")}</p>
              </div>
              {!n.is_read && <button onClick={() => readM.mutate(n.id)} className="text-xs text-primary hover:underline shrink-0">Gelezen</button>}
            </div>
          </li>
        ))}
        {items.length === 0 && <li className="text-muted-foreground text-sm">Geen notificaties.</li>}
      </ul>
    </div>
  );
}

// ============================================================
// ==================== ARCHIVED CHANGES ======================
// ============================================================
function ArchivedChangesPanel() {
  const list = useServerFn(adminListArchivedChanges);
  const unarch = useServerFn(adminUnarchiveChange);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-archived"], queryFn: () => list({}) });
  const inv = () => { qc.invalidateQueries({ queryKey: ["admin-archived"] }); qc.invalidateQueries({ queryKey: ["admin-overview"] }); };
  const unM = useMutation({ mutationFn: (id: string) => unarch({ data: { id } }), onSuccess: () => { inv(); toast.success("Hersteld."); } });
  if (isLoading) return <TableSkeleton cols={4} />;
  const items = data?.items ?? [];
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/30 text-muted-foreground">
          <tr><th className="text-left p-3">#</th><th className="text-left p-3">Titel</th><th className="text-left p-3">Gearchiveerd</th><th className="p-3"></th></tr>
        </thead>
        <tbody>
          {items.map((r: any) => (
            <tr key={r.id} className="border-t border-border">
              <td className="p-3">{r.request_number ?? "â€”"}</td>
              <td className="p-3">{r.title}</td>
              <td className="p-3">{r.archived_at ? new Date(r.archived_at).toLocaleString("nl-NL") : "â€”"}</td>
              <td className="p-3 text-right">
                <button onClick={() => unM.mutate(r.id)} className="text-xs text-primary hover:underline">Herstel</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Geen gearchiveerde changes.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// ======================= ALERTS PANEL =======================
// ============================================================
function AlertsPanel() {
  const getAlerts = useServerFn(adminGetAllAlerts);
  const snooze = useServerFn(adminSnoozeAlert);
  const markSeen = useServerFn(adminMarkAlertSeen);
  const qc = useQueryClient();
  const [view, setView] = useState<"active" | "archived">("active");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-all-alerts"],
    queryFn: () => getAlerts({}),
    refetchInterval: 60_000,
  });

  const snoozeM = useMutation({
    mutationFn: ({ id, hours }: { id: string; hours: number }) => snooze({ data: { id, hours } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-all-alerts"] }); toast.success("Alert gesnoozed."); },
  });
  const seenM = useMutation({
    mutationFn: (id: string) => markSeen({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-all-alerts"] }); toast.success("Alert gearchiveerd."); },
  });

  if (isLoading) return <TableSkeleton cols={4} />;

  const allAlerts: any[] = (data as any)?.alerts ?? [];
  const active = allAlerts.filter((a: any) => !a.archived_at);
  const archived = allAlerts.filter((a: any) => !!a.archived_at);
  const items = view === "active" ? active : archived;

  const severityColor = (s: string) =>
    s === "critical" ? "text-destructive bg-destructive/10 border-destructive/30" : "text-amber-500 bg-amber-500/10 border-amber-500/30";

  const typeIcon = (t: string) => {
    if (t === "ssl") return <Shield className="w-3.5 h-3.5" />;
    if (t === "dns") return <Activity className="w-3.5 h-3.5" />;
    return <AlertTriangle className="w-3.5 h-3.5" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(["active", "archived"] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${view === v ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/40"}`}>
              {v === "active" ? `Actief (${active.length})` : `Archief (${archived.length})`}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-border p-12 text-center text-muted-foreground">
          <CheckCircle className="w-8 h-8 mx-auto mb-2 text-emerald-500/60" />
          <p className="text-sm">{view === "active" ? "Geen actieve alerts." : "Archief leeg."}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((a: any) => (
            <div key={a.id} className={`rounded-lg border p-4 ${severityColor(a.severity)}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-2 min-w-0">
                  <span className="mt-0.5 shrink-0">{typeIcon(a.type)}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{a.message}</p>
                    <p className="text-xs opacity-70 mt-0.5">
                      {a.customer_name || a.customer_email || a.user_id} Â· {new Date(a.created_at).toLocaleString("nl-NL")}
                    </p>
                    {a.snoozed_until && new Date(a.snoozed_until) > new Date() && (
                      <p className="text-xs opacity-60 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Gesnoozed tot {new Date(a.snoozed_until).toLocaleString("nl-NL")}
                      </p>
                    )}
                  </div>
                </div>
                {view === "active" && (
                  <div className="flex gap-2 shrink-0">
                    <div className="relative group">
                      <button className="text-xs px-2 py-1 rounded border border-current/30 hover:bg-current/10 transition-colors whitespace-nowrap flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Snooze
                      </button>
                      <div className="absolute right-0 top-full mt-1 hidden group-hover:flex flex-col bg-card border border-border rounded-md shadow-lg z-10 min-w-[120px]">
                        {[1, 4, 24].map(h => (
                          <button key={h} onClick={() => snoozeM.mutate({ id: a.id, hours: h })} className="text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors">
                            {h === 1 ? "1 uur" : h === 4 ? "4 uur" : "24 uur"}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => seenM.mutate(a.id)} className="text-xs px-2 py-1 rounded border border-current/30 hover:bg-current/10 transition-colors whitespace-nowrap flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Gezien
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

