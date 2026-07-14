import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  ChevronLeft, FileText, Shield, Activity, StickyNote, Settings, Trash2, Mail, Building2, Phone,
  FolderKanban, KeyRound, Ban, CheckCircle2,
} from "lucide-react";
import {
  adminGetAccountDetail,
  adminChangeAccountRole,
  adminSetBlocked,
  adminSetAccessExpiry,
  adminHardDeleteAccount,
} from "@/lib/accounts.functions";
import {
  adminUpdateCustomer,
  adminSendPasswordReset,
  adminListRoles,
  adminListUserCustomRoles,
  adminAssignCustomRole,
  adminRemoveCustomRole,
} from "@/lib/admin.functions";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { accountStatus, ACCOUNT_STATUS_LABEL, ACCOUNT_STATUS_COLOR } from "./admin.accounts";

export const Route = createFileRoute("/_authenticated/admin/accounts/$accountId")({
  head: () => ({ meta: [{ title: "Account — Admin — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AdminAccountDetailPage,
});

const ROLE_LABEL: Record<string, string> = {
  customer: "Klant", super_admin: "Super admin", co_admin: "Co-admin",
  support_agent: "Support", viewer: "Viewer", sales: "Sales",
};

function AdminAccountDetailPage() {
  const { accountId } = useParams({ from: "/_authenticated/admin/accounts/$accountId" });
  const getDetail = useServerFn(adminGetAccountDetail);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-account", accountId],
    queryFn: () => getDetail({ data: { user_id: accountId } }),
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

  return <AccountDetail data={data} accountId={accountId} />;
}

function AccountDetail({ data, accountId }: { data: any; accountId: string }) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-account", accountId] });

  const profile = data.profile;
  const roles: string[] = data.roles ?? [];
  const status = accountStatus(profile);
  const isSuperAdmin = roles.includes("super_admin");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm">
        <Link to="/admin/accounts" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Terug naar Accounts
        </Link>
      </div>

      <AccountHeader profile={profile} roles={roles} status={status} />

      <Tabs defaultValue="overzicht">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="overzicht"><FileText className="w-3.5 h-3.5 mr-1.5" />Overzicht</TabsTrigger>
          <TabsTrigger value="toegang"><Shield className="w-3.5 h-3.5 mr-1.5" />Toegang &amp; rechten</TabsTrigger>
          <TabsTrigger value="activiteit"><Activity className="w-3.5 h-3.5 mr-1.5" />Activiteit</TabsTrigger>
          <TabsTrigger value="notities"><StickyNote className="w-3.5 h-3.5 mr-1.5" />Notities</TabsTrigger>
          <TabsTrigger value="instellingen"><Settings className="w-3.5 h-3.5 mr-1.5" />Instellingen</TabsTrigger>
        </TabsList>

        <TabsContent value="overzicht">
          <OverzichtTab profile={profile} projects={data.projects ?? []} onChanged={invalidate} />
        </TabsContent>
        <TabsContent value="toegang">
          <ToegangTab accountId={accountId} profile={profile} roles={roles} projects={data.projects ?? []} isSuperAdmin={isSuperAdmin} onChanged={invalidate} />
        </TabsContent>
        <TabsContent value="activiteit">
          <ActiviteitTab loginEvents={data.loginEvents ?? []} auditLog={data.auditLog ?? []} />
        </TabsContent>
        <TabsContent value="notities">
          <NotitiesTab accountId={accountId} profile={profile} onChanged={invalidate} />
        </TabsContent>
        <TabsContent value="instellingen">
          <InstellingenTab accountId={accountId} profile={profile} isSuperAdmin={isSuperAdmin} onChanged={invalidate} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AccountHeader({ profile, roles, status }: { profile: any; roles: string[]; status: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center flex-wrap gap-2">
            <h1 className="font-display text-2xl font-bold truncate">{profile.full_name || "—"}</h1>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ACCOUNT_STATUS_COLOR[status]}`}>{ACCOUNT_STATUS_LABEL[status]}</span>
          </div>
          {profile.company && (
            <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />{profile.company}</p>
          )}
          <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{profile.email}</p>
          {profile.phone && <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{profile.phone}</p>}
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Laatste login</p>
          <p className="text-sm font-medium mt-0.5">{profile.last_seen_at ? new Date(profile.last_seen_at).toLocaleString("nl-NL") : "Nooit"}</p>
          {roles.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">{roles.map((r) => ROLE_LABEL[r] ?? r).join(", ")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------- Overzicht ----------------

function OverzichtTab({ profile, projects, onChanged }: { profile: any; projects: any[]; onChanged: () => void }) {
  return (
    <div className="space-y-4 mt-2">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
          <h3 className="font-semibold text-sm">Contactgegevens</h3>
          <dl className="text-sm space-y-1">
            <div className="flex justify-between"><dt className="text-muted-foreground">Contactpersoon</dt><dd>{profile.contact_person || "—"}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Telefoon</dt><dd>{profile.phone || "—"}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Adres</dt><dd className="text-right max-w-[60%]">{profile.address || "—"}</dd></div>
          </dl>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
          <h3 className="font-semibold text-sm">Bedrijfsgegevens</h3>
          <dl className="text-sm space-y-1">
            <div className="flex justify-between"><dt className="text-muted-foreground">Bedrijf</dt><dd>{profile.company || "—"}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">KvK</dt><dd>{profile.kvk || "—"}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">BTW</dt><dd>{profile.btw || "—"}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Factuuradres</dt><dd className="text-right max-w-[60%]">{profile.billing_address || "—"}</dd></div>
          </dl>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <h3 className="font-semibold text-sm">Abonnement / pakket</h3>
        <dl className="text-sm space-y-1">
          <div className="flex justify-between"><dt className="text-muted-foreground">Pakket</dt><dd>{profile.package || "—"}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Maandprijs</dt><dd>{profile.monthly_price_cents != null ? `€${(profile.monthly_price_cents / 100).toFixed(2)}` : "—"}</dd></div>
        </dl>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <h3 className="font-semibold text-sm flex items-center gap-1.5"><FolderKanban className="w-4 h-4" />Gekoppelde projecten ({projects.length})</h3>
        {projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">Geen projecten gekoppeld.</p>
        ) : (
          <ul className="space-y-1.5">
            {projects.map((p: any) => (
              <li key={p.id} className="text-sm flex items-center justify-between">
                <Link to="/admin/projecten/$projectId" params={{ projectId: p.id }} className="hover:text-primary">{p.name}</Link>
                <span className="text-xs text-muted-foreground">{p.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ---------------- Toegang & rechten ----------------

function ToegangTab({ accountId, profile, roles, projects, isSuperAdmin, onChanged }: {
  accountId: string; profile: any; roles: string[]; projects: any[]; isSuperAdmin: boolean; onChanged: () => void;
}) {
  const changeRole = useServerFn(adminChangeAccountRole);
  const primaryRole = roles[0] ?? "customer";

  const roleM = useMutation({
    mutationFn: (role: string) => changeRole({ data: { target_user_id: accountId, role: role as any } }),
    onSuccess: () => { onChanged(); toast.success("Rol gewijzigd."); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-4 mt-2 max-w-2xl">
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-sm">Rol van dit account</h3>
        {isSuperAdmin ? (
          <span className="text-xs rounded-full bg-primary/20 text-primary px-2 py-1 font-medium">Super Admin</span>
        ) : (
          <select value={primaryRole} onChange={(e) => roleM.mutate(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="customer">Klant</option>
            <option value="support_agent">Support</option>
            <option value="viewer">Viewer</option>
            <option value="co_admin">Co-admin</option>
            <option value="sales">Sales</option>
          </select>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <h3 className="font-semibold text-sm">Zichtbare projecten ({projects.length})</h3>
        {projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">Geen projecten zichtbaar voor dit account.</p>
        ) : (
          <ul className="space-y-1.5">
            {projects.map((p: any) => (
              <li key={p.id} className="text-sm flex items-center justify-between">
                <span>{p.name}</span>
                <span className="text-xs text-muted-foreground">{p.primary_user_id === accountId ? "Hoofdklant" : "Lid"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <CustomRolesSection accountId={accountId} roles={roles} />
    </div>
  );
}

const STAFF_BASE_ROLES = ["super_admin", "co_admin", "support_agent", "viewer", "sales", "admin"];

function CustomRolesSection({ accountId, roles }: { accountId: string; roles: string[] }) {
  const listAllRoles = useServerFn(adminListRoles);
  const listAssigned = useServerFn(adminListUserCustomRoles);
  const assign = useServerFn(adminAssignCustomRole);
  const remove = useServerFn(adminRemoveCustomRole);
  const qc = useQueryClient();

  const hasStaffRole = roles.some((r) => STAFF_BASE_ROLES.includes(r));

  const { data: allRolesData, isLoading: loadingAll } = useQuery({ queryKey: ["admin-roles"], queryFn: () => listAllRoles({}) });
  const { data: assignedData, isLoading: loadingAssigned } = useQuery({
    queryKey: ["admin-user-custom-roles", accountId],
    queryFn: () => listAssigned({ data: { user_id: accountId } }),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-user-custom-roles", accountId] });
  const assignM = useMutation({
    mutationFn: (role_id: string) => assign({ data: { user_id: accountId, role_id } }),
    onSuccess: () => { invalidate(); toast.success("Custom rol toegewezen."); },
    onError: (e: any) => toast.error(e.message),
  });
  const removeM = useMutation({
    mutationFn: (role_id: string) => remove({ data: { user_id: accountId, role_id } }),
    onSuccess: () => { invalidate(); toast.success("Custom rol ontkoppeld."); },
    onError: (e: any) => toast.error(e.message),
  });

  const customRoles = ((allRolesData as any)?.items ?? []).filter((r: any) => !r.is_system);
  const assignedRows: any[] = (assignedData as any)?.items ?? [];
  const assignedRoleIds = new Set(assignedRows.map((r: any) => r.role_id));
  const availableRoles = customRoles.filter((r: any) => !assignedRoleIds.has(r.id));

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <h3 className="font-semibold text-sm">Custom rollen</h3>
      {!hasStaffRole ? (
        <p className="text-sm text-muted-foreground">Dit account heeft nog geen teamrol. Ken eerst een teamrol toe voordat je custom rollen kunt koppelen.</p>
      ) : loadingAll || loadingAssigned ? (
        <p className="text-sm text-muted-foreground">Laden…</p>
      ) : (
        <>
          {assignedRows.length === 0 ? (
            <p className="text-sm text-muted-foreground">Geen custom rollen gekoppeld.</p>
          ) : (
            <ul className="space-y-1.5">
              {assignedRows.map((r: any) => (
                <li key={r.role_id} className="text-sm flex items-center justify-between">
                  <span>{r.roles?.name ?? r.role_id}</span>
                  <button onClick={() => removeM.mutate(r.role_id)} disabled={removeM.isPending} className="text-xs text-destructive hover:underline">Ontkoppelen</button>
                </li>
              ))}
            </ul>
          )}
          {availableRoles.length > 0 && (
            <div className="flex items-center gap-2 pt-2">
              <select
                id="custom-role-picker"
                defaultValue=""
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) { assignM.mutate(val); e.target.value = ""; }
                }}
                className="rounded-md border border-input bg-background px-2 py-1.5 text-sm"
              >
                <option value="">Rol toewijzen…</option>
                {availableRoles.map((r: any) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ---------------- Activiteit ----------------

function ActiviteitTab({ loginEvents, auditLog }: { loginEvents: any[]; auditLog: any[] }) {
  const [actionFilter, setActionFilter] = useState("");
  const actions = Array.from(new Set(auditLog.map((a: any) => a.action))).sort();
  const filteredAudit = actionFilter ? auditLog.filter((a: any) => a.action === actionFilter) : auditLog;

  return (
    <div className="space-y-5 mt-2">
      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <h3 className="font-semibold text-sm">Recente inlogs</h3>
        {loginEvents.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nog geen inlogs geregistreerd.</p>
        ) : (
          <ul className="space-y-1.5">
            {loginEvents.map((l: any) => (
              <li key={l.id} className="text-sm flex items-center justify-between border-t border-border first:border-t-0 pt-1.5 first:pt-0">
                <span className="text-muted-foreground">{l.ip || "onbekend IP"}</span>
                <span className="text-xs text-muted-foreground">{new Date(l.created_at).toLocaleString("nl-NL")}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Acties (audit log)</h3>
          {actions.length > 0 && (
            <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} className="rounded-md border border-input bg-background px-2 py-1.5 text-xs">
              <option value="">Alle acties</option>
              {actions.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          )}
        </div>
        {filteredAudit.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nog geen activiteit.</p>
        ) : (
          <ul className="space-y-2">
            {filteredAudit.map((a: any) => (
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
    </div>
  );
}

// ---------------- Notities ----------------

function NotitiesTab({ accountId, profile, onChanged }: { accountId: string; profile: any; onChanged: () => void }) {
  const update = useServerFn(adminUpdateCustomer);
  const [body, setBody] = useState(profile.internal_notes ?? "");

  const saveM = useMutation({
    mutationFn: () => update({ data: { user_id: accountId, internal_notes: body } }),
    onSuccess: () => { onChanged(); toast.success("Notitie opgeslagen."); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-3 mt-2 max-w-2xl">
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-sm">Interne admin-notities</h3>
        <textarea
          rows={8}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Interne notities over dit account (niet zichtbaar voor de klant)…"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <button onClick={() => saveM.mutate()} disabled={saveM.isPending} className="btn-primary text-sm">
          {saveM.isPending ? "Bezig…" : "Opslaan"}
        </button>
      </div>
    </div>
  );
}

// ---------------- Instellingen ----------------

function InstellingenTab({ accountId, profile, isSuperAdmin, onChanged }: {
  accountId: string; profile: any; isSuperAdmin: boolean; onChanged: () => void;
}) {
  const setBlocked = useServerFn(adminSetBlocked);
  const setExpiry = useServerFn(adminSetAccessExpiry);
  const sendReset = useServerFn(adminSendPasswordReset);
  const hardDel = useServerFn(adminHardDeleteAccount);

  const blockM = useMutation({
    mutationFn: (is_blocked: boolean) => setBlocked({ data: { user_id: accountId, is_blocked } }),
    onSuccess: () => { onChanged(); toast.success("Bijgewerkt."); },
    onError: (e: any) => toast.error(e.message),
  });
  const expM = useMutation({
    mutationFn: (access_expires_at: string | null) => setExpiry({ data: { user_id: accountId, access_expires_at } }),
    onSuccess: () => { onChanged(); toast.success("Verloopdatum opgeslagen."); },
    onError: (e: any) => toast.error(e.message),
  });
  const resetM = useMutation({
    mutationFn: () => sendReset({ data: { email: profile.email, redirectTo: `${window.location.origin}/portal` } }),
    onSuccess: () => toast.success("Wachtwoord-reset e-mail verstuurd."),
    onError: (e: any) => toast.error(e.message),
  });
  const delM = useMutation({
    mutationFn: () => hardDel({ data: { user_id: accountId } }),
    onSuccess: () => { toast.success("Account verwijderd."); window.location.href = "/admin/accounts"; },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-4 mt-2 max-w-2xl">
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-sm">Toegang</h3>
        {isSuperAdmin ? (
          <p className="text-sm text-muted-foreground">Super admin-accounts kunnen niet geblokkeerd worden.</p>
        ) : (
          <>
            <button
              onClick={() => blockM.mutate(!profile.is_blocked)}
              disabled={blockM.isPending}
              className={`inline-flex items-center gap-2 text-sm rounded-md border px-3 py-2 transition-colors ${profile.is_blocked ? "border-emerald-500/40 text-emerald-600 hover:bg-emerald-500/10" : "border-destructive/40 text-destructive hover:bg-destructive/10"}`}
            >
              {profile.is_blocked ? <CheckCircle2 className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
              {profile.is_blocked ? "Deblokkeren" : "Blokkeren"}
            </button>
            <label className="block text-sm pt-2">
              <span className="text-muted-foreground">Toegang verloopt op</span>
              <input
                type="date"
                defaultValue={profile.access_expires_at ? profile.access_expires_at.slice(0, 10) : ""}
                onBlur={(e) => {
                  const v = e.target.value ? new Date(e.target.value + "T23:59:59Z").toISOString() : null;
                  if (v !== profile.access_expires_at) expM.mutate(v);
                }}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
          </>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-sm">Wachtwoord</h3>
        <button onClick={() => resetM.mutate()} disabled={resetM.isPending} className="inline-flex items-center gap-2 text-sm rounded-md border border-border px-3 py-2 hover:border-primary hover:text-primary transition-colors">
          <KeyRound className="w-4 h-4" />
          {resetM.isPending ? "Bezig…" : "Wachtwoord-reset e-mail versturen"}
        </button>
      </div>

      {!isSuperAdmin && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 space-y-3">
          <h3 className="font-semibold text-sm text-destructive">Gevarenzone</h3>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="inline-flex items-center gap-2 text-sm rounded-md border border-destructive/40 text-destructive px-3 py-2 hover:bg-destructive/10 transition-colors">
                <Trash2 className="w-4 h-4" /> Account permanent verwijderen
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Account verwijderen?</AlertDialogTitle>
                <AlertDialogDescription>
                  "{profile.email}" en alle bijbehorende gegevens worden permanent verwijderd. Dit kan niet ongedaan worden gemaakt.
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
  );
}
