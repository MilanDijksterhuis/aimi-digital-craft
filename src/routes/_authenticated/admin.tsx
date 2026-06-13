import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import {
  BarChart2, Users, GitPullRequest, Inbox, MessageSquare, Calendar,
  MessagesSquare, UserCheck, Trash2, Key, ShoppingCart, Link2,
  ChevronDown, ArrowUp, ArrowDown, Users2, Bell, Archive,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminGetOverview,
  adminGetCustomer,
  adminCreateCustomerFn,
  adminUpdateCustomer,
  adminUpdateRequestStatus,
  adminSetRequestFields,
  adminPostComment,
  adminGrantCredits,
  adminSendNotification,
  adminSendPasswordReset,
  adminSetPassword,
  adminAddCost,
  adminDeleteCost,
  adminAddOnboardingItem,
  adminToggleOnboardingItem,
  adminDeleteOnboardingItem,
  adminAttachmentUrl,
  adminListAppointments,
  adminCreateAppointment,
  adminDeleteAppointment,
  adminListPasswordResets,
  adminMarkPasswordResetHandled,
  adminListExtraChangeRequests,
  adminApproveExtraChangeRequest,
  adminRejectExtraChangeRequest,
  adminListWebsiteLinks,
  adminUpdateWebsiteLink,
} from "@/lib/admin.functions";
import {
  adminListAllAccounts,
  adminChangeAccountRole,
  adminSetBlocked,
  adminSetAccountTags,
  adminSetAccessExpiry,
  adminHardDeleteAccount,
  adminCreateTempAccount,
  adminListNotifications,
  adminMarkNotificationRead,
  adminMarkAllNotificationsRead,
  adminArchiveChange,
  adminUnarchiveChange,
  adminAssignChange,
  adminListArchivedChanges,
} from "@/lib/accounts.functions";
import {
  STATUS_LABEL,
  PRIORITY_LABEL,
  PRIORITY_WEIGHT,
  PRIORITY_COLOR,
  CATEGORY_LABEL,
  CATEGORY_KEYS,
  PAID_CHANGE_PRICE_EUR,
} from "@/lib/status";
import {
  adminToggleRequestPaid,
  adminSetFreeQuota,
} from "@/lib/admin.functions";
import { AdminChatPanel } from "@/components/AdminChatPanel";
import { TeamTab } from "@/components/TeamTab";
import { DeletedChangesTab } from "@/components/DeletedChangesTab";
import { BerichtenTab } from "@/components/BerichtenTab";
import { adminSoftDeleteChange } from "@/lib/admin.functions";
import { usePermissions } from "@/hooks/use-permissions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

const eur = (cents: number) => `€${(cents / 100).toFixed(2)}`;

function AdminPage() {
  const fetchOv = useServerFn(adminGetOverview);
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: () => fetchOv({}),
  });

  type TabKey =
    | "dashboard" | "klanten" | "accounts" | "password_resets" | "extra_changes"
    | "changes" | "archived" | "berichten" | "aanvragen" | "notifications"
    | "website_links" | "team" | "afspraken"
    | "chat" | "deleted";
  const [tab, setTab] = useState<TabKey>("dashboard");
  const [openCustomer, setOpenCustomer] = useState<string | null>(null);
  const [openRequest, setOpenRequest] = useState<string | null>(null);
  const perms = usePermissions();

  // Pending counts for sidebar badges
  const listResets = useServerFn(adminListPasswordResets);
  const listExtras = useServerFn(adminListExtraChangeRequests);
  const resetsQ = useQuery({ queryKey: ["admin-password-resets"], queryFn: () => listResets({}) });
  const extrasQ = useQuery({ queryKey: ["admin-extra-changes"], queryFn: () => listExtras({}) });
  const pendingResets = (resetsQ.data?.items ?? []).filter((r: any) => r.status === "pending").length;
  const pendingExtras = (extrasQ.data?.items ?? []).filter((r: any) => r.status === "pending").length;

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-40 bg-muted rounded" />
        <div className="grid sm:grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="h-28 bg-muted/60 rounded-lg border border-border" />)}
        </div>
      </div>
    );
  }
  if (error) {
    const msg = (error as Error).message;
    if (msg.includes("Forbidden")) {
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

  const groups: { label: string; items: { key: TabKey; label: string; icon: any; badge?: number }[] }[] = [
    { label: "Overzicht", items: [{ key: "dashboard", label: "Dashboard", icon: BarChart2 }] },
    { label: "Klanten", items: [
      { key: "klanten", label: `Alle klanten (${data.customers.length})`, icon: Users },
      { key: "password_resets", label: "Wachtwoord reset verzoeken", icon: Key, badge: pendingResets },
      { key: "extra_changes", label: "Extra change aanvragen", icon: ShoppingCart, badge: pendingExtras },
    ]},
    { label: "Werk", items: [
      { key: "changes", label: `Changes (${data.requests.length})`, icon: GitPullRequest },
      { key: "archived", label: "Gearchiveerd", icon: Archive },
      { key: "berichten", label: "Berichten", icon: MessageSquare },
      { key: "aanvragen", label: `Aanvragen (${data.pendingPurchases.length})`, icon: Inbox },
    ]},
    { label: "Beheer", items: [
      { key: "accounts", label: "Accounts", icon: Users2 },
      { key: "notifications", label: "Notificaties", icon: Bell },
      { key: "website_links", label: "Website koppelingen", icon: Link2 },
      { key: "team", label: "Team", icon: UserCheck },
      { key: "afspraken", label: "Afspraken", icon: Calendar },
    ]},
    { label: "Overig", items: [
      { key: "chat", label: "Chat", icon: MessagesSquare },
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
        <AdminSidebar groups={groups} active={tab} setActive={setTab} />

        <div className="flex-1 min-w-0">
          {tab === "dashboard" && <Dashboard metrics={data.metrics} openChanges={data.requests.filter((r: any) => r.status !== "done" && r.status !== "rejected" && r.status !== "invoiced").length} pendingTotal={pendingResets + pendingExtras} onGoChanges={() => setTab("changes")} onGoPending={() => setTab("password_resets")} />}
          {tab === "klanten" && (<KlantenTab data={data} qc={qc} openCustomer={openCustomer} setOpenCustomer={setOpenCustomer} />)}
          {tab === "accounts" && <AccountsPanel />}
          {tab === "notifications" && <NotificationsPanel />}
          {tab === "password_resets" && <PasswordResetsPanel />}
          {tab === "extra_changes" && <ExtraChangesPanel />}
          {tab === "changes" && (<ChangesTab data={data} qc={qc} openRequest={openRequest} setOpenRequest={setOpenRequest} />)}
          {tab === "archived" && <ArchivedChangesPanel />}
          {tab === "aanvragen" && <AanvragenTab data={data} qc={qc} />}
          {tab === "berichten" && <BerichtenTab />}
          {tab === "afspraken" && <AfsprakenTab customers={data.customers} qc={qc} />}
          {tab === "chat" && <AdminChatPanel />}
          {tab === "team" && <TeamTab />}
          {tab === "deleted" && <DeletedChangesTab />}
          {tab === "website_links" && <WebsiteLinksPanel />}
        </div>

      </div>
    </div>
  );
}

function Dashboard({ metrics, openChanges, pendingTotal, onGoChanges, onGoPending }: { metrics: any; openChanges: number; pendingTotal: number; onGoChanges: () => void; onGoPending: () => void }) {
  const max = Math.max(1, ...metrics.months.map((m: any) => m.count));
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Users} label="Klanten" value={metrics.totalCustomers} sub="Totaal aantal accounts" trend={0} />
        <MetricCard icon={UserCheck} label="Actief (30d)" value={metrics.activeCount} sub="Inlog in afgelopen 30 dagen" trend={0} />
        <MetricCard icon={GitPullRequest} label="Totaal changes" value={metrics.totalRequests} sub="Sinds start" trend={0} />
        <MetricCard icon={BarChart2} label="Gem. responstijd" value={metrics.avgResponseHours ?? "—"} sub="Uren tot afronding" trend={0} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <button onClick={onGoChanges} className="text-left">
          <MetricCard icon={GitPullRequest} label="Openstaande changes" value={openChanges} sub="Bekijk changes →" trend={0} />
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
              className="w-full flex items-center justify-between py-1 text-[10px] font-semibold uppercase"
              style={{ letterSpacing: "0.1em", color: "#9B958F" }}
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
                      <button
                        onClick={() => setActive(it.key)}
                        className="w-full flex items-center justify-between gap-2 px-2 py-1.5 text-sm transition-colors"
                        style={{
                          borderLeft: isActive ? "2px solid #D4622A" : "2px solid transparent",
                          color: isActive ? "#D4622A" : undefined,
                          paddingLeft: "8px",
                        }}
                        onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "#D4622A"; }}
                        onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = ""; }}
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="truncate text-left">{it.label}</span>
                        </span>
                        {it.badge > 0 && (
                          <span className="text-[10px] font-semibold rounded-full px-1.5 py-0.5 bg-destructive text-destructive-foreground">
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
  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;
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
                <td className="p-3">{r.user_name || "—"}</td>
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
  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;
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
              <td className="p-3">{r.user_name || "—"}</td>
              <td className="p-3">{r.user_email}</td>
              <td className="p-3">{r.amount}</td>
              <td className="p-3">€{r.total_eur}</td>
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

function WebsiteLinksPanel() {
  const list = useServerFn(adminListWebsiteLinks);
  const update = useServerFn(adminUpdateWebsiteLink);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-website-links"], queryFn: () => list({}) });
  const updM = useMutation({
    mutationFn: (i: any) => update({ data: i }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-website-links"] }); toast.success("Opgeslagen."); },
  });
  const [openId, setOpenId] = useState<string | null>(null);
  const [forms, setForms] = useState<Record<string, { website_url: string; snippet_active: boolean }>>({});

  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;
  const items = data?.items ?? [];
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/30 text-muted-foreground">
          <tr><th className="text-left p-3">Klant</th><th className="text-left p-3">Website</th><th className="text-left p-3">Status</th><th className="p-3"></th></tr>
        </thead>
        <tbody>
          {items.map((c: any) => {
            const f = forms[c.id] ?? { website_url: c.website_url ?? "", snippet_active: !!c.snippet_active };
            const isOpen = openId === c.id;
            const snippet = `<script src="${origin}/track.js?u=${c.id}"></script>`;
            const status = c.ping_count > 0
              ? { color: "text-emerald-600", txt: "Actief" }
              : c.website_url ? { color: "text-amber-600", txt: "Geen data" } : { color: "text-muted-foreground", txt: "Niet gekoppeld" };
            return (
              <>
                <tr key={c.id} className="border-t border-border">
                  <td className="p-3">{c.full_name || c.email}</td>
                  <td className="p-3 truncate max-w-xs">{c.website_url || "—"}</td>
                  <td className={`p-3 ${status.color}`}>{status.txt}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => setOpenId(isOpen ? null : c.id)} className="text-xs text-primary hover:underline">
                      {isOpen ? "Sluit" : "Beheer koppeling"}
                    </button>
                  </td>
                </tr>
                {isOpen && (
                  <tr><td colSpan={4} className="bg-muted/20 p-4">
                    <div className="space-y-3 max-w-2xl">
                      <label className="block text-sm">
                        <span className="text-muted-foreground">Website URL</span>
                        <input value={f.website_url} onChange={(e) => setForms({ ...forms, [c.id]: { ...f, website_url: e.target.value } })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                      </label>
                      <div>
                        <span className="text-muted-foreground text-sm">Tracking snippet</span>
                        <div className="mt-1 rounded-md border border-border bg-background p-3 font-mono text-xs break-all">{snippet}</div>
                        <button type="button" onClick={() => { navigator.clipboard.writeText(snippet); toast.success("Gekopieerd."); }} className="btn-secondary mt-2 text-xs">Kopieer</button>
                        <p className="text-xs text-muted-foreground mt-2">Kopieer deze snippet en plak hem in de &lt;head&gt; van het Lovable project van deze klant.</p>
                      </div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={f.snippet_active} onChange={(e) => setForms({ ...forms, [c.id]: { ...f, snippet_active: e.target.checked } })} />
                        Snippet actief
                      </label>
                      <button onClick={() => updM.mutate({ user_id: c.id, website_url: f.website_url || null, snippet_active: f.snippet_active })} disabled={updM.isPending} className="btn-primary text-sm">
                        {updM.isPending ? "Bezig…" : "Opslaan"}
                      </button>
                    </div>
                  </td></tr>
                )}
              </>
            );
          })}
          {items.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Geen klanten.</td></tr>}
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
    return (
      !q ||
      c.email?.toLowerCase().includes(q) ||
      c.full_name?.toLowerCase().includes(q) ||
      c.company?.toLowerCase().includes(q) ||
      (c.tags ?? []).some((t: string) => t.toLowerCase().includes(q))
    );
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
            {createM.isPending ? "Bezig…" : "Aanmaken"}
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
        placeholder="Zoeken (naam, email, tag)…"
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
              <th className="text-left p-3">Tags</th>
              <th className="text-left p-3">Gebruikt</th>
              <th className="text-left p-3">Acties</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c: any) => (
              <tr key={c.id} className="border-t border-border hover:bg-muted/20">
                <td className="p-3">
                  <button onClick={() => setOpenCustomer(c.id)} className="text-primary hover:underline">
                    {c.full_name || "—"}
                  </button>
                </td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.package || "—"} {c.monthly_price_cents ? `(${eur(c.monthly_price_cents)})` : ""}</td>
                <td className="p-3">
                  {(c.tags ?? []).map((t: string) => (
                    <span key={t} className="inline-block mr-1 mb-1 text-xs rounded-full bg-muted px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </td>
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
              <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Geen klanten.</td></tr>
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
  const [tagsInput, setTagsInput] = useState("");

  if (isLoading || !data || !data.profile) {
    return <Modal onClose={onClose} title="Laden…"><p>Laden…</p></Modal>;
  }
  const p = data.profile;

  const f = form ?? {
    full_name: p.full_name ?? "", company: p.company ?? "", email: p.email,
    phone: p.phone ?? "", address: p.address ?? "", kvk: p.kvk ?? "", btw: p.btw ?? "",
    package: p.package ?? "", monthly_price_cents: p.monthly_price_cents ?? 0,
    internal_notes: p.internal_notes ?? "",
    tags: p.tags ?? [],
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
              <span className="text-muted-foreground">Maandprijs (€)</span>
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
          <div className="mt-3">
            <span className="text-muted-foreground text-sm">Tags</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {f.tags.map((t: string) => (
                <span key={t} className="text-xs rounded-full bg-muted px-2 py-0.5 flex items-center gap-1">
                  {t}
                  <button onClick={() => setForm({ ...f, tags: f.tags.filter((x: string) => x !== t) })}>×</button>
                </span>
              ))}
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && tagsInput.trim()) {
                    e.preventDefault();
                    setForm({ ...f, tags: [...f.tags, tagsInput.trim()] });
                    setTagsInput("");
                  }
                }}
                placeholder="+ tag (Enter)"
                className="rounded-md border border-input bg-background px-2 py-1 text-xs"
              />
            </div>
          </div>
          <button
            onClick={() => updateM.mutate({ user_id: userId, ...f })}
            disabled={updateM.isPending}
            className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
          >
            {updateM.isPending ? "Bezig…" : "Opslaan"}
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
            <input required type="number" step="0.01" placeholder="€" value={costForm.amount}
              onChange={(e) => setCostForm({ ...costForm, amount: e.target.value })}
              className="w-28 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <button className="rounded-full bg-primary px-4 text-sm text-primary-foreground">+</button>
          </form>
          <div className="space-y-1">
            {data.costs.map((c: any) => (
              <div key={c.id} className="flex justify-between border-b border-border py-1">
                <span>{c.cost_date} · {c.description}</span>
                <span>
                  {eur(c.amount_cents)}
                  <button onClick={() => delCostM.mutate(c.id)} className="ml-2 text-destructive">×</button>
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
                <button onClick={() => delOnbM.mutate(o.id)} className="ml-auto text-destructive text-xs">×</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Modal>
  );
}

function ChangesTab({ data, qc, openRequest, setOpenRequest }: any) {
  const [sortBy, setSortBy] = useState<"date" | "priority">("priority");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [paidFilter, setPaidFilter] = useState<string>(""); // "", "free", "paid"
  const [customerFilter, setCustomerFilter] = useState<string>("");

  const togglePaid = useServerFn(adminToggleRequestPaid);
  const togglePaidM = useMutation({
    mutationFn: (i: any) => togglePaid({ data: i }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-overview"] }),
  });

  const sorted = useMemo(() => {
    let arr = [...data.requests];
    if (statusFilter) arr = arr.filter((r: any) => r.status === statusFilter);
    if (categoryFilter) arr = arr.filter((r: any) => (r.category ?? "other") === categoryFilter);
    if (paidFilter) arr = arr.filter((r: any) => (paidFilter === "paid" ? r.is_paid : !r.is_paid));
    if (customerFilter) arr = arr.filter((r: any) => r.user_id === customerFilter);
    arr.sort((a: any, b: any) => {
      if (sortBy === "priority") {
        return (PRIORITY_WEIGHT[b.priority] ?? 0) - (PRIORITY_WEIGHT[a.priority] ?? 0);
      }
      return b.created_at.localeCompare(a.created_at);
    });
    return arr;
  }, [data.requests, sortBy, statusFilter, categoryFilter, paidFilter, customerFilter]);

  // Inzicht: top 5 klanten + gemiddelde doorlooptijd (created→done)
  const insights = useMemo(() => {
    const counts: Record<string, number> = {};
    let totalHours = 0;
    let doneCount = 0;
    for (const r of data.requests as any[]) {
      counts[r.user_id] = (counts[r.user_id] ?? 0) + 1;
      if (r.status === "done" || r.status === "invoiced") {
        const h = (new Date(r.updated_at).getTime() - new Date(r.created_at).getTime()) / 36e5;
        if (h > 0) { totalHours += h; doneCount++; }
      }
    }
    const top = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([uid, n]) => {
        const c = data.customers.find((c: any) => c.id === uid);
        return { name: c?.full_name || c?.email || uid, count: n };
      });
    return { top, avgHours: doneCount ? Math.round(totalHours / doneCount) : null };
  }, [data.requests, data.customers]);

  const exportCsv = () => {
    const rows = (data.requests as any[]).filter((r) => r.is_paid && (r.status === "done" || r.status === "invoiced"));
    const header = ["datum", "klant", "email", "titel", "categorie", "spoed", "bedrag_eur", "status"];
    const lines = [header.join(";")];
    for (const r of rows) {
      const c = data.customers.find((c: any) => c.id === r.user_id) ?? {};
      const bedrag = PAID_CHANGE_PRICE_EUR + (r.rush ? 15 : 0);
      lines.push([
        new Date(r.created_at).toISOString().slice(0, 10),
        (c.full_name || "").replace(/;/g, ","),
        c.email ?? "",
        r.title.replace(/;/g, ","),
        CATEGORY_LABEL[r.category ?? "other"] ?? r.category ?? "",
        r.rush ? "ja" : "nee",
        bedrag.toFixed(2),
        STATUS_LABEL[r.status] ?? r.status,
      ].join(";"));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `betaalde-changes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 rounded-2xl border border-border bg-card p-4">
        <div>
          <p className="text-xs uppercase text-muted-foreground">Gem. doorlooptijd</p>
          <p className="text-xl font-bold">{insights.avgHours !== null ? `${insights.avgHours} uur` : "—"}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs uppercase text-muted-foreground mb-1">Top 5 klanten (changes)</p>
          <ol className="text-sm space-y-0.5">
            {insights.top.map((t, i) => (
              <li key={i}>{i + 1}. {t.name} — {t.count}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="rounded-md border border-input bg-background px-2 py-1 text-sm">
          <option value="priority">Sorteer: prioriteit</option>
          <option value="date">Sorteer: datum</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-md border border-input bg-background px-2 py-1 text-sm">
          <option value="">Alle statussen</option>
          {Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-md border border-input bg-background px-2 py-1 text-sm">
          <option value="">Alle categorieën</option>
          {CATEGORY_KEYS.map((k) => <option key={k} value={k}>{CATEGORY_LABEL[k]}</option>)}
        </select>
        <select value={paidFilter} onChange={(e) => setPaidFilter(e.target.value)} className="rounded-md border border-input bg-background px-2 py-1 text-sm">
          <option value="">Gratis + betaald</option>
          <option value="free">Alleen gratis</option>
          <option value="paid">Alleen betaald</option>
        </select>
        <select value={customerFilter} onChange={(e) => setCustomerFilter(e.target.value)} className="rounded-md border border-input bg-background px-2 py-1 text-sm">
          <option value="">Alle klanten</option>
          {data.customers.map((c: any) => (
            <option key={c.id} value={c.id}>{c.full_name || c.email}</option>
          ))}
        </select>
        <button onClick={exportCsv} className="ml-auto rounded-full border border-primary px-3 py-1 text-xs text-primary hover:bg-primary hover:text-primary-foreground">
          ⬇ Export CSV (betaald + gereed)
        </button>
      </div>

      {sorted.map((r: any) => {
        const c = data.customers.find((c: any) => c.id === r.user_id);
        return (
          <div key={r.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">
                  {c?.email ?? r.user_id} · {new Date(r.created_at).toLocaleDateString("nl-NL")} ·{" "}
                  <span className={PRIORITY_COLOR[r.priority]}>{PRIORITY_LABEL[r.priority]}</span>
                  {r.due_date && ` · oplever ${new Date(r.due_date).toLocaleDateString("nl-NL")}`}
                </p>
                <h3 className="font-semibold mt-1">{r.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{r.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted">
                    {CATEGORY_LABEL[r.category ?? "other"] ?? "Anders"}
                  </span>
                  {r.rush && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/15 text-destructive">Spoed</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs px-2 py-1 rounded-full bg-muted">{STATUS_LABEL[r.status]}</span>
                <button
                  onClick={() => togglePaidM.mutate({ id: r.id, is_paid: !r.is_paid })}
                  className={`text-[10px] px-2 py-0.5 rounded-full cursor-pointer ${
                    r.is_paid ? "bg-amber-500/15 text-amber-600" : "bg-primary/15 text-primary"
                  }`}
                  title="Klik om te wisselen tussen gratis en betaald"
                >
                  {r.is_paid ? `€${PAID_CHANGE_PRICE_EUR} · klik voor gratis` : "Gratis · klik voor €20"}
                </button>
              </div>
            </div>
            <button
              onClick={() => setOpenRequest(openRequest === r.id ? null : r.id)}
              className="mt-3 text-xs text-primary hover:underline"
            >
              {openRequest === r.id ? "Inklappen" : "Open details / thread"}
              ({(r.change_comments?.length ?? 0)} berichten, {(r.change_attachments?.length ?? 0)} bijlagen)
            </button>
            {openRequest === r.id && (
              <RequestDetail request={r} qc={qc} />
            )}
          </div>
        );
      })}
      {sorted.length === 0 && <p className="text-muted-foreground text-sm">Geen changes.</p>}
    </div>
  );
}

function RequestDetail({ request, qc }: any) {
  const updateStatus = useServerFn(adminUpdateRequestStatus);
  const setFields = useServerFn(adminSetRequestFields);
  const postComment = useServerFn(adminPostComment);
  const attUrl = useServerFn(adminAttachmentUrl);

  const inv = () => qc.invalidateQueries({ queryKey: ["admin-overview"] });
  const statusM = useMutation({ mutationFn: (i: any) => updateStatus({ data: i }), onSuccess: inv });
  const fieldsM = useMutation({ mutationFn: (i: any) => setFields({ data: i }), onSuccess: inv });
  const commentM = useMutation({ mutationFn: (i: any) => postComment({ data: i }), onSuccess: inv });

  const [internalNote, setInternalNote] = useState(request.internal_note ?? "");
  const [dueDate, setDueDate] = useState(request.due_date ?? "");
  const [adminNotes, setAdminNotes] = useState(request.admin_notes ?? "");
  const [comment, setComment] = useState("");

  const openAtt = async (file_path: string) => {
    const { url } = await attUrl({ data: { file_path } });
    window.open(url, "_blank");
  };

  return (
    <div className="mt-4 space-y-4 border-t border-border pt-4 text-sm">
      <div className="grid sm:grid-cols-3 gap-2">
        <select value={request.status}
          onChange={(e) => statusM.mutate({ id: request.id, status: e.target.value as any })}
          className="rounded-md border border-input bg-background px-2 py-1">
          {Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <input type="date" value={dueDate ?? ""}
          onChange={(e) => setDueDate(e.target.value)}
          onBlur={() => fieldsM.mutate({ id: request.id, due_date: dueDate || null })}
          className="rounded-md border border-input bg-background px-2 py-1" />
      </div>

      <label className="block">
        <span className="text-xs text-muted-foreground">Bericht voor klant (admin_notes)</span>
        <textarea rows={2} value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)}
          onBlur={() => fieldsM.mutate({ id: request.id, admin_notes: adminNotes || null })}
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2" />
      </label>

      <label className="block">
        <span className="text-xs text-muted-foreground">Interne notitie (alleen admin)</span>
        <textarea rows={2} value={internalNote} onChange={(e) => setInternalNote(e.target.value)}
          onBlur={() => fieldsM.mutate({ id: request.id, internal_note: internalNote || null })}
          className="mt-1 w-full rounded-md border border-amber-500/40 bg-amber-500/5 px-3 py-2" />
      </label>

      {request.change_attachments?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {request.change_attachments.map((a: any) => (
            <button key={a.id} onClick={() => openAtt(a.file_path)}
              className="text-xs rounded-md border border-border bg-muted/40 px-2 py-1 hover:bg-accent">
              {a.file_name}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <p className="font-semibold text-xs">Thread</p>
        {(request.change_comments ?? [])
          .sort((a: any, b: any) => a.created_at.localeCompare(b.created_at))
          .map((c: any) => (
            <div key={c.id} className="rounded-lg bg-muted/40 p-2">
              <p className="text-xs text-muted-foreground">
                {new Date(c.created_at).toLocaleString("nl-NL")}
              </p>
              <p className="whitespace-pre-wrap">{c.body}</p>
            </div>
          ))}
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!comment.trim()) return;
          commentM.mutate({ request_id: request.id, body: comment }, { onSuccess: () => setComment("") });
        }} className="flex gap-2">
          <input value={comment} onChange={(e) => setComment(e.target.value)}
            placeholder="Antwoord aan klant…"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2" />
          <button className="rounded-full bg-primary px-4 py-2 text-primary-foreground">Verstuur</button>
        </form>
      </div>
    </div>
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
                <p className="font-semibold text-base">{c.full_name || "—"}</p>
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
                  Aangevraagd: <strong>{p.amount}</strong> extra change(s) — €{p.amount * 20}
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
                    reason: `Aankoop ${p.amount}× change`,
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
            <option value="">Kies klant…</option>
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
          {createM.isPending ? "Bezig…" : "Inplannen"}
        </button>
        {createM.error && (
          <p className="text-sm text-destructive">{(createM.error as Error).message}</p>
        )}
      </form>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Laden…</p>
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
                    {c?.full_name || c?.email || a.user_id} ·{" "}
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
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">×</button>
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
// =================== ACCOUNTS PANEL =========================
// ============================================================
function AccountsPanel() {
  const list = useServerFn(adminListAllAccounts);
  const changeRole = useServerFn(adminChangeAccountRole);
  const setBlocked = useServerFn(adminSetBlocked);
  const setTags = useServerFn(adminSetAccountTags);
  const setExpiry = useServerFn(adminSetAccessExpiry);
  const hardDel = useServerFn(adminHardDeleteAccount);
  const createTemp = useServerFn(adminCreateTempAccount);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-accounts"], queryFn: () => list({}) });

  const [filter, setFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [showTemp, setShowTemp] = useState(false);
  const [tempForm, setTempForm] = useState({ email: "", full_name: "", company: "", days_valid: 14 });
  const [tagsEditing, setTagsEditing] = useState<string | null>(null);
  const [tagsDraft, setTagsDraft] = useState("");

  // Realtime ping on profiles last_seen_at
  useEffect(() => {
    const ch = supabase
      .channel("admin-accounts-presence")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "profiles" }, () => {
        qc.invalidateQueries({ queryKey: ["admin-accounts"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [qc]);

  const inv = () => qc.invalidateQueries({ queryKey: ["admin-accounts"] });
  const roleM = useMutation({ mutationFn: (i: any) => changeRole({ data: i }), onSuccess: () => { inv(); toast.success("Rol gewijzigd."); }, onError: (e: any) => toast.error(e.message) });
  const blockM = useMutation({ mutationFn: (i: any) => setBlocked({ data: i }), onSuccess: () => { inv(); toast.success("Bijgewerkt."); }, onError: (e: any) => toast.error(e.message) });
  const tagsM = useMutation({ mutationFn: (i: any) => setTags({ data: i }), onSuccess: () => { inv(); setTagsEditing(null); toast.success("Tags opgeslagen."); }, onError: (e: any) => toast.error(e.message) });
  const expM = useMutation({ mutationFn: (i: any) => setExpiry({ data: i }), onSuccess: () => { inv(); toast.success("Verloopdatum opgeslagen."); }, onError: (e: any) => toast.error(e.message) });
  const delM = useMutation({
    mutationFn: (id: string) => hardDel({ data: { user_id: id } }),
    onSuccess: () => { inv(); toast.success("Account verwijderd."); },
    onError: (e: any) => toast.error(e.message),
  });
  const tempM = useMutation({
    mutationFn: (i: any) => createTemp({ data: i }),
    onSuccess: (r: any) => {
      inv();
      setShowTemp(false);
      setTempForm({ email: "", full_name: "", company: "", days_valid: 14 });
      navigator.clipboard?.writeText(`Email: ${r.email}\nWachtwoord: ${r.tempPassword}`).catch(() => {});
      toast.success(`Aangemaakt. Wachtwoord (gekopieerd): ${r.tempPassword}`);
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;
  const accounts = data?.accounts ?? [];
  const filtered = accounts.filter((a: any) => {
    const q = filter.toLowerCase();
    const matchQ = !q || a.email?.toLowerCase().includes(q) || a.full_name?.toLowerCase().includes(q) || (a.tags ?? []).some((t: string) => t.toLowerCase().includes(q));
    const matchRole =
      roleFilter === "all" ? true :
      roleFilter === "staff" ? (a.roles ?? []).some((r: string) => ["super_admin", "co_admin", "support_agent", "viewer", "admin"].includes(r)) :
      (a.roles ?? []).includes(roleFilter);
    return matchQ && matchRole;
  });

  const isOnline = (a: any) => a.last_seen_at && Date.now() - new Date(a.last_seen_at).getTime() < 3 * 60_000;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Zoek naam / email / tag…" className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="all">Alle rollen</option>
            <option value="customer">Klanten</option>
            <option value="staff">Staff</option>
            <option value="super_admin">Super admin</option>
            <option value="co_admin">Co-admin</option>
            <option value="support_agent">Support</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
        <button onClick={() => setShowTemp((v) => !v)} className="rounded-md bg-foreground text-background px-3 py-2 text-sm">+ Nieuw tijdelijk account</button>
      </div>

      {showTemp && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-semibold mb-3">Tijdelijk account aanmaken</h3>
          <div className="grid sm:grid-cols-4 gap-3">
            <input placeholder="E-mail" value={tempForm.email} onChange={(e) => setTempForm({ ...tempForm, email: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input placeholder="Volledige naam" value={tempForm.full_name} onChange={(e) => setTempForm({ ...tempForm, full_name: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input placeholder="Bedrijf (optioneel)" value={tempForm.company} onChange={(e) => setTempForm({ ...tempForm, company: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <input type="number" min={1} max={365} value={tempForm.days_valid} onChange={(e) => setTempForm({ ...tempForm, days_valid: Number(e.target.value) })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Geldig (dagen)" />
          </div>
          <div className="mt-3 flex gap-2">
            <button disabled={tempM.isPending || !tempForm.email || !tempForm.full_name} onClick={() => tempM.mutate(tempForm)} className="rounded-md bg-foreground text-background px-3 py-2 text-sm disabled:opacity-50">{tempM.isPending ? "Bezig…" : "Aanmaken"}</button>
            <button onClick={() => setShowTemp(false)} className="rounded-md border border-border px-3 py-2 text-sm">Annuleer</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-muted-foreground">
            <tr>
              <th className="text-left p-3">Naam</th>
              <th className="text-left p-3">E-mail</th>
              <th className="text-left p-3">Rol</th>
              <th className="text-left p-3">Tags</th>
              <th className="text-left p-3">Verloopt</th>
              <th className="text-left p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a: any) => {
              const primaryRole = (a.roles ?? [])[0] ?? "customer";
              const online = isOnline(a);
              return (
                <tr key={a.id} className="border-t border-border align-top">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${online ? "bg-emerald-500" : "bg-muted"}`} title={online ? "Online" : "Offline"} />
                      <span>{a.full_name || "—"}</span>
                    </div>
                    {a.last_seen_at && <p className="text-xs text-muted-foreground ml-4">{online ? "Online nu" : new Date(a.last_seen_at).toLocaleString("nl-NL")}</p>}
                  </td>
                  <td className="p-3">{a.email}</td>
                  <td className="p-3">
                    <select value={primaryRole} onChange={(e) => roleM.mutate({ target_user_id: a.id, role: e.target.value as any })} className="rounded-md border border-input bg-background px-2 py-1 text-xs">
                      <option value="customer">Klant</option>
                      <option value="support_agent">Support</option>
                      <option value="viewer">Viewer</option>
                      <option value="co_admin">Co-admin</option>
                      <option value="super_admin">Super admin</option>
                    </select>
                  </td>
                  <td className="p-3">
                    {tagsEditing === a.id ? (
                      <div className="flex gap-1">
                        <input value={tagsDraft} onChange={(e) => setTagsDraft(e.target.value)} placeholder="tag1, tag2" className="rounded-md border border-input bg-background px-2 py-1 text-xs" />
                        <button onClick={() => tagsM.mutate({ user_id: a.id, tags: tagsDraft.split(",").map((s) => s.trim()).filter(Boolean) })} className="text-xs text-primary">OK</button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1 cursor-pointer" onClick={() => { setTagsEditing(a.id); setTagsDraft((a.tags ?? []).join(", ")); }}>
                        {(a.tags ?? []).map((t: string) => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">{t}</span>)}
                        {(!a.tags || a.tags.length === 0) && <span className="text-xs text-muted-foreground">+ tag</span>}
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <input type="date" defaultValue={a.access_expires_at ? a.access_expires_at.slice(0, 10) : ""} onBlur={(e) => {
                      const v = e.target.value ? new Date(e.target.value + "T23:59:59Z").toISOString() : null;
                      if (v !== a.access_expires_at) expM.mutate({ user_id: a.id, access_expires_at: v });
                    }} className="rounded-md border border-input bg-background px-2 py-1 text-xs" />
                  </td>
                  <td className="p-3">
                    {a.is_blocked ? <span className="text-xs text-destructive">Geblokkeerd</span> : <span className="text-xs text-emerald-600">Actief</span>}
                  </td>
                  <td className="p-3 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => blockM.mutate({ user_id: a.id, is_blocked: !a.is_blocked })} className="text-xs text-primary hover:underline">{a.is_blocked ? "Deblokkeer" : "Blokkeer"}</button>
                    <button onClick={() => { if (confirm(`Account ${a.email} permanent verwijderen?`)) delM.mutate(a.id); }} className="text-xs text-destructive hover:underline">Verwijder</button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">Geen accounts.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
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

  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;
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
  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;
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
              <td className="p-3">{r.request_number ?? "—"}</td>
              <td className="p-3">{r.title}</td>
              <td className="p-3">{r.archived_at ? new Date(r.archived_at).toLocaleString("nl-NL") : "—"}</td>
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
