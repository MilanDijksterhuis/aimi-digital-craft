import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, FileText, Shield, Activity, Trash2, Users } from "lucide-react";
import { adminGetRole, adminDeleteRole, adminSetRolePermission } from "@/lib/admin.functions";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const ROLE_LABEL: Record<string, string> = {
  super_admin: "Super Admin",
  co_admin: "Co-Admin",
  support_agent: "Support Agent",
  viewer: "Viewer",
  sales: "Sales",
  admin: "Admin (legacy)",
};

const ALL_PERMISSIONS = [
  { key: "view_all_changes", label: "Changes bekijken" },
  { key: "edit_change_status", label: "Change status wijzigen" },
  { key: "edit_change_fields", label: "Change velden bewerken" },
  { key: "delete_change_soft", label: "Change verwijderen (soft)" },
  { key: "force_paid", label: "Betaald forceren" },
  { key: "create_change_for_customer", label: "Change aanmaken voor klant" },
  { key: "manage_customers", label: "Klanten beheren" },
  { key: "generate_invoice", label: "Factuur genereren" },
  { key: "export_csv", label: "CSV exporteren" },
  { key: "chat_with_customers", label: "Chat met klanten" },
  { key: "website_links_view", label: "Website koppelingen bekijken" },
  { key: "website_links_manage", label: "Website koppelingen beheren" },
  { key: "appointments_manage", label: "Afspraken beheren" },
  { key: "alerts_view", label: "Alerts bekijken" },
  { key: "leads_view", label: "Leads bekijken" },
  { key: "leads_manage", label: "Leads beheren" },
];

export const Route = createFileRoute("/_authenticated/admin/rollen/$roleId")({
  head: () => ({ meta: [{ title: "Rol — Admin — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AdminRoleDetailPage,
});

function AdminRoleDetailPage() {
  const { roleId } = useParams({ from: "/_authenticated/admin/rollen/$roleId" });
  const getRole = useServerFn(adminGetRole);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-role", roleId],
    queryFn: () => getRole({ data: { role_id: roleId } }),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
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

  return <RoleDetail data={data} roleId={roleId} />;
}

function RoleDetail({ data, roleId }: { data: any; roleId: string }) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-role", roleId] });

  const role = data.role;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm">
        <Link to="/admin/rollen" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Terug naar Rollen
        </Link>
      </div>

      <RoleHeader role={role} accountCount={data.accounts?.length ?? 0} />

      <Tabs defaultValue="overzicht">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="overzicht"><FileText className="w-3.5 h-3.5 mr-1.5" />Overzicht</TabsTrigger>
          <TabsTrigger value="permissies"><Shield className="w-3.5 h-3.5 mr-1.5" />Permissiematrix</TabsTrigger>
          <TabsTrigger value="activiteit"><Activity className="w-3.5 h-3.5 mr-1.5" />Activiteit</TabsTrigger>
        </TabsList>

        <TabsContent value="overzicht">
          <OverzichtTab role={role} accounts={data.accounts ?? []} />
        </TabsContent>
        <TabsContent value="permissies">
          <PermissiesTab role={role} permissions={data.permissions ?? []} onChanged={invalidate} />
        </TabsContent>
        <TabsContent value="activiteit">
          <ActivityTab activity={data.activity ?? []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RoleHeader({ role, accountCount }: { role: any; accountCount: number }) {
  const del = useServerFn(adminDeleteRole);

  const delM = useMutation({
    mutationFn: () => del({ data: { role_id: role.id } }),
    onSuccess: () => { toast.success("Rol verwijderd."); window.location.href = "/admin/rollen"; },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2 min-w-0">
          <div className="flex items-center flex-wrap gap-2">
            <h1 className="font-display text-2xl font-bold truncate">{role.name}</h1>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${role.is_system ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>
              {role.is_system ? "Systeemrol" : "Custom"}
            </span>
            {!role.is_system && role.base_role && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/30 text-secondary-foreground">
                Basis: {ROLE_LABEL[role.base_role] ?? role.base_role}
              </span>
            )}
          </div>
          {role.description && <p className="text-sm text-muted-foreground">{role.description}</p>}
        </div>

        {!role.is_system && (
          <div className="flex items-center gap-2 shrink-0">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="p-2 rounded-md border border-border text-destructive hover:border-destructive transition-colors" title="Verwijderen">
                  <Trash2 className="w-4 h-4" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Rol verwijderen?</AlertDialogTitle>
                  <AlertDialogDescription>
                    "{role.name}" wordt permanent verwijderd, samen met de bijbehorende permissie-instellingen.
                    {accountCount > 0 && (
                      <span className="block mt-2 text-destructive font-medium">
                        Deze rol is gekoppeld aan {accountCount} account{accountCount === 1 ? "" : "s"}. Verwijderen ontkoppelt deze rol van die account{accountCount === 1 ? "" : "s"}.
                      </span>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuleren</AlertDialogCancel>
                  <AlertDialogAction onClick={() => delM.mutate()} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Verwijderen
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
}

function OverzichtTab({ role, accounts }: { role: any; accounts: any[] }) {
  return (
    <div className="space-y-4 mt-2">
      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <h3 className="font-semibold text-sm">Kerninfo</h3>
        <dl className="text-sm space-y-1">
          <div className="flex justify-between"><dt className="text-muted-foreground">Naam</dt><dd>{role.name}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Sleutel</dt><dd className="font-mono text-xs">{role.key}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd>{role.is_system ? "Systeemrol" : "Custom"}</dd></div>
          {!role.is_system && (
            <div className="flex justify-between"><dt className="text-muted-foreground">Basisrol</dt><dd>{ROLE_LABEL[role.base_role] ?? role.base_role ?? "—"}</dd></div>
          )}
          <div className="flex justify-between"><dt className="text-muted-foreground">Beschrijving</dt><dd className="text-right max-w-[60%]">{role.description || "—"}</dd></div>
        </dl>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <h3 className="font-semibold text-sm flex items-center gap-1.5"><Users className="w-4 h-4" />Gekoppelde accounts ({accounts.length})</h3>
        {accounts.length === 0 ? (
          <p className="text-sm text-muted-foreground">Geen accounts gekoppeld aan deze rol.</p>
        ) : (
          <ul className="space-y-1.5">
            {accounts.map((a: any) => (
              <li key={a.id} className="text-sm flex items-center justify-between">
                <Link to="/admin/accounts/$accountId" params={{ accountId: a.id }} className="hover:text-primary">{a.full_name || a.email}</Link>
                <span className="text-xs text-muted-foreground">{a.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function PermissiesTab({ role, permissions, onChanged }: { role: any; permissions: any[]; onChanged: () => void }) {
  const setPermFn = useServerFn(adminSetRolePermission);
  const qc = useQueryClient();

  const setM = useMutation({
    mutationFn: (v: { permission: string; allowed: boolean }) => setPermFn({ data: { role: role.key, permission: v.permission, allowed: v.allowed } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-role", role.id] }); onChanged(); },
    onError: (e: any) => toast.error(e.message),
  });

  const lookup: Record<string, boolean> = {};
  for (const p of permissions) lookup[p.permission] = p.allowed;
  const isAllowed = (perm: string) => lookup[perm] ?? false;

  return (
    <div className="space-y-4 mt-2">
      <p className="text-sm text-muted-foreground">Stel in welke acties deze rol mag uitvoeren. Super admin heeft altijd alle rechten.</p>
      <div className="rounded-lg border border-border overflow-hidden">
        <ul className="divide-y divide-border">
          {ALL_PERMISSIONS.map((perm) => (
            <li key={perm.key} className="flex items-center justify-between p-3 text-sm hover:bg-muted/20 transition-colors">
              <span>{perm.label}</span>
              <input
                type="checkbox"
                checked={isAllowed(perm.key)}
                onChange={(e) => setM.mutate({ permission: perm.key, allowed: e.target.checked })}
                disabled={setM.isPending}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-muted-foreground">Wijzigingen worden direct opgeslagen.</p>
    </div>
  );
}

function ActivityTab({ activity }: { activity: any[] }) {
  const [filter, setFilter] = useState("");
  const actions = Array.from(new Set(activity.map((a) => a.action))).sort();
  const filtered = filter ? activity.filter((a) => a.action === filter) : activity;

  return (
    <div className="space-y-3 mt-2">
      {actions.length > 0 && (
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="">Alle acties</option>
          {actions.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      )}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nog geen activiteit.</p>
      ) : (
        <ul className="space-y-2">
          {filtered.map((a) => (
            <li key={a.id} className="rounded-lg border border-border bg-card p-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">{a.action}</span>
                <span className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString("nl-NL")}</span>
              </div>
              {a.details && Object.keys(a.details).length > 0 && (
                <pre className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap break-all">{JSON.stringify(a.details)}</pre>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
