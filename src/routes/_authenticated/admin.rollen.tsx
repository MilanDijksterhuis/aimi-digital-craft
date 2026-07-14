import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronDown, LayoutGrid, PlusCircle, Shield } from "lucide-react";
import { adminListRoles, adminCreateCustomRole } from "@/lib/admin.functions";
import { Skeleton } from "@/components/ui/skeleton";

const STAFF_BASE_ROLES = ["super_admin", "co_admin", "support_agent", "viewer", "sales", "admin"];
const ROLE_LABEL: Record<string, string> = {
  super_admin: "Super Admin",
  co_admin: "Co-Admin",
  support_agent: "Support Agent",
  viewer: "Viewer",
  sales: "Sales",
  admin: "Admin (legacy)",
};

export const Route = createFileRoute("/_authenticated/admin/rollen")({
  head: () => ({ meta: [{ title: "Rollen & Permissies — Admin — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AdminRollenPage,
});

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

type Section = "alle" | "nieuw";

function AdminRollenPage() {
  // Kind-route (/admin/rollen/$roleId) deelt deze route als parent
  // (TanStack Router file-based routing) en moet via Outlet gerenderd worden.
  // Deze check staat ná alle hooks om de Rules of Hooks niet te schenden.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [section, setSection] = useState<Section>("alle");

  if (pathname !== "/admin/rollen") return <Outlet />;

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 max-w-[1600px] px-6 lg:px-10 space-y-6">
      <Link
        to="/admin"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Terug naar Admin
      </Link>

      <div>
        <h1 className="font-display text-4xl font-bold">Rollen & Permissies</h1>
        <p className="text-muted-foreground">Beheer systeemrollen en custom rollen, en stel per rol de permissies in.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <RollenSidebar section={section} onSection={setSection} />

        <div className="flex-1 min-w-0">
          {section === "nieuw" ? (
            <NewRoleSection onCreated={() => setSection("alle")} />
          ) : (
            <RolesListSection />
          )}
        </div>
      </div>
    </div>
  );
}

function RollenSidebar({ section, onSection }: { section: Section; onSection: (s: Section) => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ Overzicht: true, Beheer: true });

  const groups: { label: string; items: { key: string; label: string; icon: any; active: boolean; onClick: () => void }[] }[] = [
    {
      label: "Overzicht",
      items: [
        { key: "alle", label: "Alle rollen", icon: LayoutGrid, active: section === "alle", onClick: () => onSection("alle") },
      ],
    },
    {
      label: "Beheer",
      items: [
        { key: "nieuw", label: "Nieuwe custom rol", icon: PlusCircle, active: section === "nieuw", onClick: () => onSection("nieuw") },
      ],
    },
  ];

  return (
    <nav aria-label="Rollen secties" className="md:w-60 md:shrink-0 md:border-r border-border md:pr-4">
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

function RolesListSection() {
  const nav = useNavigate();
  const list = useServerFn(adminListRoles);
  const { data, isLoading } = useQuery({ queryKey: ["admin-roles"], queryFn: () => list({}) });

  if (isLoading) return <TableSkeleton cols={4} />;
  const items: any[] = data?.items ?? [];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Alle rollen</h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-muted-foreground">
            <tr>
              <th className="text-left p-3">Naam</th>
              <th className="text-left p-3">Beschrijving</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Accounts</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r: any) => (
              <tr
                key={r.id}
                className="border-t border-border hover:bg-muted/20 cursor-pointer"
                onClick={() => nav({ to: "/admin/rollen/$roleId", params: { roleId: r.id } })}
              >
                <td className="p-3 font-medium">
                  <Link to="/admin/rollen/$roleId" params={{ roleId: r.id }} className="hover:text-primary flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                    {r.name}
                  </Link>
                </td>
                <td className="p-3 text-muted-foreground truncate max-w-xs">{r.description || "—"}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.is_system ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                    {r.is_system ? "Systeemrol" : "Custom"}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground">{r.account_count}</td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Geen rollen gevonden.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NewRoleSection({ onCreated }: { onCreated: () => void }) {
  const create = useServerFn(adminCreateCustomRole);
  const qc = useQueryClient();

  const [form, setForm] = useState({ name: "", description: "", base_role: "support_agent" });

  const createM = useMutation({
    mutationFn: () => create({ data: { name: form.name, description: form.description || null, base_role: form.base_role } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-roles"] });
      toast.success("Custom rol aangemaakt.");
      setForm({ name: "", description: "", base_role: "support_agent" });
      onCreated();
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-4 max-w-2xl">
      <h2 className="text-lg font-semibold">Nieuwe custom rol</h2>
      <div className="rounded-lg border border-border p-4 space-y-3">
        <label className="block text-sm">
          <span className="text-muted-foreground">Naam</span>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="bijv. Junior Support" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Beschrijving</span>
          <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Basisrol</span>
          <select value={form.base_role} onChange={(e) => setForm({ ...form, base_role: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {STAFF_BASE_ROLES.map((r) => <option key={r} value={r}>{ROLE_LABEL[r] ?? r}</option>)}
          </select>
        </label>
        <button onClick={() => createM.mutate()} disabled={!form.name || createM.isPending} className="btn-primary text-sm">
          {createM.isPending ? "Bezig…" : "Rol aanmaken"}
        </button>
      </div>
    </div>
  );
}
