import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ChevronLeft, ChevronDown, UserCheck, UserX, Clock3, PlusCircle, LayoutGrid, UserPlus,
} from "lucide-react";
import {
  adminListAllAccounts,
  adminCreateTempAccount,
} from "@/lib/accounts.functions";
import { adminCreateCustomerFn } from "@/lib/admin.functions";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/accounts")({
  head: () => ({ meta: [{ title: "Accounts — Admin — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AdminAccountsPage,
});

function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="bg-muted/30 p-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => <Skeleton key={i} className="h-4 flex-1" />)}
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="p-3 flex gap-4">
            {Array.from({ length: cols }).map((_, c) => <Skeleton key={c} className="h-4 flex-1" />)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function accountStatus(a: any): "geblokkeerd" | "pending" | "actief" {
  if (a.is_blocked) return "geblokkeerd";
  if (!a.last_seen_at) return "pending";
  return "actief";
}

export const ACCOUNT_STATUS_LABEL: Record<string, string> = {
  actief: "Actief",
  geblokkeerd: "Geblokkeerd",
  pending: "Pending",
};
export const ACCOUNT_STATUS_COLOR: Record<string, string> = {
  actief: "bg-emerald-500/15 text-emerald-600",
  geblokkeerd: "bg-destructive/15 text-destructive",
  pending: "bg-amber-500/15 text-amber-600",
};

type Section = "alle" | "nieuw" | "nieuwe_klant";

function AdminAccountsPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [section, setSection] = useState<Section>("alle");
  const [statusFilter, setStatusFilter] = useState<string>("");

  if (pathname !== "/admin/accounts") return <Outlet />;

  const goSection = (s: Section) => setSection(s);
  const goStatus = (s: string) => { setStatusFilter(s); setSection("alle"); };

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 max-w-[1600px] px-6 lg:px-10 space-y-6">
      <Link to="/admin" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronLeft className="w-4 h-4" /> Terug naar Admin
      </Link>

      <div>
        <h1 className="font-display text-4xl font-bold">Accounts</h1>
        <p className="text-muted-foreground">Beheer klantaccounts: toegang, rollen, activiteit en notities.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <AccountsSidebar section={section} statusFilter={statusFilter} onSection={goSection} onStatus={goStatus} />
        <div className="flex-1 min-w-0">
          {section === "nieuw" ? (
            <NewAccountSection onCreated={() => goSection("alle")} />
          ) : section === "nieuwe_klant" ? (
            <NewCustomerSection onCreated={() => goSection("alle")} />
          ) : (
            <AccountsListSection statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
          )}
        </div>
      </div>
    </div>
  );
}

function AccountsSidebar({ section, statusFilter, onSection, onStatus }: {
  section: Section; statusFilter: string; onSection: (s: Section) => void; onStatus: (s: string) => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({ Overzicht: true, Snelfilters: true, Beheer: true });

  const groups: { label: string; items: { key: string; label: string; icon: any; active: boolean; onClick: () => void }[] }[] = [
    {
      label: "Overzicht",
      items: [
        { key: "alle", label: "Alle accounts", icon: LayoutGrid, active: section === "alle" && !statusFilter, onClick: () => onSection("alle") },
      ],
    },
    {
      label: "Snelfilters",
      items: [
        { key: "status-actief", label: "Actief", icon: UserCheck, active: section === "alle" && statusFilter === "actief", onClick: () => onStatus("actief") },
        { key: "status-geblokkeerd", label: "Geblokkeerd", icon: UserX, active: section === "alle" && statusFilter === "geblokkeerd", onClick: () => onStatus("geblokkeerd") },
        { key: "status-pending", label: "Pending", icon: Clock3, active: section === "alle" && statusFilter === "pending", onClick: () => onStatus("pending") },
      ],
    },
    {
      label: "Beheer",
      items: [
        { key: "nieuwe_klant", label: "Nieuwe klant", icon: UserPlus, active: section === "nieuwe_klant", onClick: () => onSection("nieuwe_klant") },
        { key: "nieuw", label: "Nieuw tijdelijk account", icon: PlusCircle, active: section === "nieuw", onClick: () => onSection("nieuw") },
      ],
    },
  ];

  return (
    <nav aria-label="Accounts secties" className="md:w-60 md:shrink-0 md:border-r border-border md:pr-4">
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
                  return (
                    <li key={it.key}>
                      <button
                        onClick={it.onClick}
                        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm transition-colors"
                        style={{
                          borderLeft: it.active ? "2px solid var(--primary)" : "2px solid transparent",
                          color: it.active ? "var(--primary)" : undefined,
                          paddingLeft: "8px",
                        }}
                        onMouseEnter={(e) => { if (!it.active) (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)"; }}
                        onMouseLeave={(e) => { if (!it.active) (e.currentTarget as HTMLButtonElement).style.color = ""; }}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate text-left">{it.label}</span>
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

function NewAccountSection({ onCreated }: { onCreated: () => void }) {
  const create = useServerFn(adminCreateTempAccount);
  const qc = useQueryClient();
  const [form, setForm] = useState({ email: "", full_name: "", company: "", days_valid: 14 });

  const createM = useMutation({
    mutationFn: () => create({ data: form }),
    onSuccess: (r: any) => {
      qc.invalidateQueries({ queryKey: ["admin-accounts"] });
      navigator.clipboard?.writeText(`Email: ${r.email}\nWachtwoord: ${r.tempPassword}`).catch(() => {});
      toast.success(`Aangemaakt. Wachtwoord (gekopieerd): ${r.tempPassword}`);
      setForm({ email: "", full_name: "", company: "", days_valid: 14 });
      onCreated();
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-lg font-semibold">Nieuw tijdelijk account</h2>
      <div className="rounded-lg border border-border p-4 space-y-3">
        <label className="block text-sm">
          <span className="text-muted-foreground">E-mail</span>
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Volledige naam</span>
          <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Bedrijf (optioneel)</span>
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Geldig (dagen)</span>
          <input type="number" min={1} max={365} value={form.days_valid} onChange={(e) => setForm({ ...form, days_valid: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <button onClick={() => createM.mutate()} disabled={!form.email || !form.full_name || createM.isPending} className="btn-primary text-sm">
          {createM.isPending ? "Bezig…" : "Account aanmaken"}
        </button>
      </div>
    </div>
  );
}

function NewCustomerSection({ onCreated }: { onCreated: () => void }) {
  const create = useServerFn(adminCreateCustomerFn);
  const qc = useQueryClient();
  const [form, setForm] = useState({ email: "", full_name: "", company: "" });

  const createM = useMutation({
    mutationFn: () => create({ data: form }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-accounts"] });
      qc.invalidateQueries({ queryKey: ["admin-overview"] });
      setForm({ email: "", full_name: "", company: "" });
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-lg font-semibold">Nieuwe klant</h2>
      <div className="rounded-lg border border-border p-4 space-y-3">
        <label className="block text-sm">
          <span className="text-muted-foreground">Volledige naam</span>
          <input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">E-mail</span>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Bedrijf (optioneel)</span>
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <button onClick={() => createM.mutate()} disabled={!form.email || !form.full_name || createM.isPending} className="btn-primary text-sm">
          {createM.isPending ? "Bezig…" : "Klant aanmaken"}
        </button>
        {createM.data && (
          <div className="rounded-lg border border-primary/40 bg-primary/5 p-4 text-sm">
            <p className="font-semibold">Account aangemaakt voor {createM.data.email}</p>
            <p className="mt-2">Tijdelijk wachtwoord:</p>
            <code className="block mt-1 rounded bg-background px-2 py-1 font-mono">{createM.data.tempPassword}</code>
          </div>
        )}
        {createM.error && <p className="text-sm text-destructive">{(createM.error as Error).message}</p>}
      </div>
      <button onClick={onCreated} className="text-xs text-muted-foreground hover:text-foreground">← Terug naar alle accounts</button>
    </div>
  );
}

function AccountsListSection({ statusFilter, setStatusFilter }: { statusFilter: string; setStatusFilter: (s: string) => void }) {
  const nav = useNavigate();
  const list = useServerFn(adminListAllAccounts);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-accounts"], queryFn: () => list({}) });

  useEffect(() => {
    let ch: ReturnType<typeof supabase.channel> | null = null;
    try {
      ch = supabase
        .channel("admin-accounts-presence")
        .on("postgres_changes", { event: "UPDATE", schema: "public", table: "profiles" }, () => {
          qc.invalidateQueries({ queryKey: ["admin-accounts"] });
        })
        .subscribe();
    } catch (e) {
      console.warn("Realtime niet beschikbaar:", e);
    }
    return () => { if (ch) supabase.removeChannel(ch); };
  }, [qc]);

  const [roleFilter, setRoleFilter] = useState("");
  const [packageFilter, setPackageFilter] = useState("");
  const [search, setSearch] = useState("");

  if (isLoading) return <TableSkeleton />;
  const allAccounts = data?.accounts ?? [];

  const packages = Array.from(new Set(allAccounts.map((a: any) => a.package).filter(Boolean))) as string[];

  const statusCounts: Record<string, number> = { actief: 0, geblokkeerd: 0, pending: 0 };
  for (const a of allAccounts) statusCounts[accountStatus(a)]++;

  const filtered = allAccounts.filter((a: any) => {
    if (statusFilter && accountStatus(a) !== statusFilter) return false;
    if (roleFilter) {
      const roles = a.roles ?? [];
      if (roleFilter === "staff") { if (!roles.some((r: string) => ["super_admin", "co_admin", "support_agent", "viewer", "admin"].includes(r))) return false; }
      else if (!roles.includes(roleFilter)) return false;
    }
    if (packageFilter && a.package !== packageFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const inName = a.full_name?.toLowerCase().includes(q);
      const inEmail = a.email?.toLowerCase().includes(q);
      const inCompany = a.company?.toLowerCase().includes(q);
      if (!inName && !inEmail && !inCompany) return false;
    }
    return true;
  });

  const isOnline = (a: any) => a.last_seen_at && Date.now() - new Date(a.last_seen_at).getTime() < 3 * 60_000;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Alle accounts ({allAccounts.length})</h2>

      <div className="grid grid-cols-3 gap-3">
        {(["actief", "geblokkeerd", "pending"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
            className={`rounded-lg border p-3 text-left transition-colors ${statusFilter === s ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`}
          >
            <p className="text-xs text-muted-foreground">{ACCOUNT_STATUS_LABEL[s]}</p>
            <p className="text-xl font-bold mt-1">{statusCounts[s]}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input placeholder="Zoek naam, e-mail of bedrijf…" value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm w-64" />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="rounded-md border border-input bg-background px-2 py-2 text-sm">
          <option value="">Alle rollen</option>
          <option value="customer">Klanten</option>
          <option value="staff">Staff</option>
          <option value="super_admin">Super admin</option>
          <option value="co_admin">Co-admin</option>
          <option value="support_agent">Support</option>
          <option value="viewer">Viewer</option>
          <option value="sales">Sales</option>
        </select>
        {packages.length > 0 && (
          <select value={packageFilter} onChange={(e) => setPackageFilter(e.target.value)} className="rounded-md border border-input bg-background px-2 py-2 text-sm">
            <option value="">Alle pakketten</option>
            {packages.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        )}
        {(statusFilter || roleFilter || packageFilter || search) && (
          <button onClick={() => { setStatusFilter(""); setRoleFilter(""); setPackageFilter(""); setSearch(""); }} className="text-xs text-muted-foreground hover:text-foreground">
            Filters wissen
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-muted-foreground">
            <tr>
              <th className="text-left p-3">Naam</th>
              <th className="text-left p-3">Bedrijf</th>
              <th className="text-left p-3">E-mail</th>
              <th className="text-left p-3">Rol</th>
              <th className="text-left p-3">Pakket</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Laatste login</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a: any) => {
              const status = accountStatus(a);
              const online = isOnline(a);
              const primaryRole = (a.roles ?? [])[0] ?? "customer";
              return (
                <tr
                  key={a.id}
                  className="border-t border-border hover:bg-muted/20 cursor-pointer"
                  onClick={() => nav({ to: "/admin/accounts/$accountId", params: { accountId: a.id } })}
                >
                  <td className="p-3 font-medium">
                    <Link to="/admin/accounts/$accountId" params={{ accountId: a.id }} className="hover:text-primary flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${online ? "bg-emerald-500" : "bg-muted"}`} title={online ? "Online" : "Offline"} />
                      {a.full_name || "—"}
                    </Link>
                  </td>
                  <td className="p-3 text-muted-foreground">{a.company || "—"}</td>
                  <td className="p-3 text-muted-foreground">{a.email}</td>
                  <td className="p-3 text-xs">{primaryRole}</td>
                  <td className="p-3 text-muted-foreground text-xs">{a.package || "—"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ACCOUNT_STATUS_COLOR[status]}`}>{ACCOUNT_STATUS_LABEL[status]}</span>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{a.last_seen_at ? new Date(a.last_seen_at).toLocaleString("nl-NL") : "—"}</td>
                </tr>
              );
            })}
            {filtered.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">Geen accounts gevonden.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
