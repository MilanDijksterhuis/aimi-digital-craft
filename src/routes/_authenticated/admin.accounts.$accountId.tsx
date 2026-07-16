import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  ChevronLeft, FileText, Shield, Activity, StickyNote, Settings, Trash2, Mail, Building2, Phone,
  FolderKanban, KeyRound, Ban, CheckCircle2, Wallet, ListChecks, Bell, Sparkles, UserCog,
} from "lucide-react";
import { OnboardingWizard } from "@/components/OnboardingWizard";
import {
  adminGetAccountDetail,
  adminChangeAccountRole,
  adminSetBlocked,
  adminSetAccessExpiry,
  adminHardDeleteAccount,
} from "@/lib/accounts.functions";
import {
  adminGetCustomer,
  adminUpdateCustomer,
  adminSendPasswordReset,
  adminSetPassword,
  adminSendNotification,
  adminSetFreeQuota,
  adminGrantCredits,
  adminAddCost,
  adminDeleteCost,
  adminAddOnboardingItem,
  adminToggleOnboardingItem,
  adminDeleteOnboardingItem,
  adminListRoles,
  adminListUserCustomRoles,
  adminAssignCustomRole,
  adminRemoveCustomRole,
  adminSetSelfOnboarding,
  adminSetTutorialEnabled,
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

const ONBOARDING_STATUS_LABEL: Record<string, string> = {
  not_started: "Onboarding: Niet gestart",
  in_progress: "Onboarding: Bezig",
  completed: "Onboarding: Afgerond",
};

const ONBOARDING_STATUS_COLOR: Record<string, string> = {
  not_started: "bg-muted text-muted-foreground",
  in_progress: "bg-amber-500/20 text-amber-600",
  completed: "bg-emerald-500/20 text-emerald-600",
};

function AccountDetail({ data, accountId }: { data: any; accountId: string }) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-account", accountId] });
  const [wizardOpen, setWizardOpen] = useState(false);

  const profile = data.profile;
  const roles: string[] = data.roles ?? [];
  const status = accountStatus(profile);
  const isSuperAdmin = roles.includes("super_admin");
  const isCustomer = !roles.some((r) => STAFF_BASE_ROLES.includes(r));
  const onboardingStatus = profile.onboarding_status ?? "not_started";

  const setSelfOnboarding = useServerFn(adminSetSelfOnboarding);
  const selfOnboardingM = useMutation({
    mutationFn: (enabled: boolean) => setSelfOnboarding({ data: { user_id: accountId, enabled } }),
    onSuccess: () => { invalidate(); toast.success("Bijgewerkt."); },
    onError: (e: any) => toast.error(e.message),
  });

  const setTutorialEnabled = useServerFn(adminSetTutorialEnabled);
  const tutorialEnabledM = useMutation({
    mutationFn: (enabled: boolean) => setTutorialEnabled({ data: { user_id: accountId, enabled } }),
    onSuccess: () => { invalidate(); toast.success("Bijgewerkt."); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 text-sm">
        <Link to="/admin/accounts" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Terug naar Accounts
        </Link>
        {isCustomer && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => selfOnboardingM.mutate(!profile.onboarding_self_enabled)}
              disabled={selfOnboardingM.isPending}
              className={`text-sm inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 transition-colors ${
                profile.onboarding_self_enabled
                  ? "border-emerald-500/40 text-emerald-600 hover:bg-emerald-500/10"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              <UserCog className="w-3.5 h-3.5" />
              Klant onboardt zelf: {profile.onboarding_self_enabled ? "Aan" : "Uit"}
            </button>
            <button
              onClick={() => tutorialEnabledM.mutate(!profile.tutorial_enabled)}
              disabled={tutorialEnabledM.isPending}
              className={`text-sm inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 transition-colors ${
                profile.tutorial_enabled
                  ? "border-emerald-500/40 text-emerald-600 hover:bg-emerald-500/10"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Portaal tutorial: {profile.tutorial_enabled ? "Aan" : "Uit"}
            </button>
            <button onClick={() => setWizardOpen(true)} className="btn-secondary text-sm inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Onboarding
            </button>
          </div>
        )}
      </div>

      <AccountHeader
        profile={profile}
        roles={roles}
        status={status}
        onboardingStatus={isCustomer ? onboardingStatus : null}
      />

      {wizardOpen && (
        <OnboardingWizard
          userId={accountId}
          onClose={() => {
            setWizardOpen(false);
            invalidate();
          }}
        />
      )}

      <Tabs defaultValue="overzicht">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="overzicht"><FileText className="w-3.5 h-3.5 mr-1.5" />Overzicht</TabsTrigger>
          <TabsTrigger value="toegang"><Shield className="w-3.5 h-3.5 mr-1.5" />Toegang &amp; rechten</TabsTrigger>
          <TabsTrigger value="activiteit"><Activity className="w-3.5 h-3.5 mr-1.5" />Activiteit</TabsTrigger>
          {isCustomer && <TabsTrigger value="financieel"><Wallet className="w-3.5 h-3.5 mr-1.5" />Financieel</TabsTrigger>}
          {isCustomer && <TabsTrigger value="onboarding"><ListChecks className="w-3.5 h-3.5 mr-1.5" />Onboarding</TabsTrigger>}
          <TabsTrigger value="notities"><StickyNote className="w-3.5 h-3.5 mr-1.5" />Notities</TabsTrigger>
          <TabsTrigger value="instellingen"><Settings className="w-3.5 h-3.5 mr-1.5" />Instellingen</TabsTrigger>
        </TabsList>

        <TabsContent value="overzicht">
          <OverzichtTab accountId={accountId} profile={profile} projects={data.projects ?? []} isCustomer={isCustomer} onChanged={invalidate} />
        </TabsContent>
        <TabsContent value="toegang">
          <ToegangTab accountId={accountId} profile={profile} roles={roles} projects={data.projects ?? []} isSuperAdmin={isSuperAdmin} onChanged={invalidate} />
        </TabsContent>
        <TabsContent value="activiteit">
          <ActiviteitTab loginEvents={data.loginEvents ?? []} auditLog={data.auditLog ?? []} siteErrors={(data as any).siteErrors ?? []} />
        </TabsContent>
        {isCustomer && (
          <TabsContent value="financieel">
            <FinancieelTab accountId={accountId} onChanged={invalidate} />
          </TabsContent>
        )}
        {isCustomer && (
          <TabsContent value="onboarding">
            <OnboardingTab accountId={accountId} onChanged={invalidate} />
          </TabsContent>
        )}
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

function AccountHeader({ profile, roles, status, onboardingStatus }: { profile: any; roles: string[]; status: string; onboardingStatus?: string | null }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center flex-wrap gap-2">
            <h1 className="font-display text-2xl font-bold truncate">{profile.full_name || "—"}</h1>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ACCOUNT_STATUS_COLOR[status]}`}>{ACCOUNT_STATUS_LABEL[status]}</span>
            {onboardingStatus && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ONBOARDING_STATUS_COLOR[onboardingStatus]}`}>
                {ONBOARDING_STATUS_LABEL[onboardingStatus]}
              </span>
            )}
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

function ProjectsCard({ projects }: { projects: any[] }) {
  return (
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
  );
}

function OverzichtTab({ accountId, profile, projects, isCustomer, onChanged }: { accountId: string; profile: any; projects: any[]; isCustomer: boolean; onChanged: () => void }) {
  const update = useServerFn(adminUpdateCustomer);
  const [form, setForm] = useState<any>(null);

  const updateM = useMutation({
    mutationFn: (i: any) => update({ data: i }),
    onSuccess: () => { onChanged(); toast.success("Opgeslagen."); },
    onError: (e: any) => toast.error(e.message),
  });

  if (!isCustomer) {
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

        <ProjectsCard projects={projects} />
      </div>
    );
  }

  const f = form ?? {
    full_name: profile.full_name ?? "", company: profile.company ?? "", email: profile.email ?? "",
    phone: profile.phone ?? "", address: profile.address ?? "", kvk: profile.kvk ?? "", btw: profile.btw ?? "",
    package: profile.package ?? "", monthly_price_cents: profile.monthly_price_cents ?? 0,
    website_url: profile.website_url ?? "", contact_person: profile.contact_person ?? "",
    billing_address: profile.billing_address ?? "",
  };

  return (
    <div className="space-y-4 mt-2">
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-sm">Accountgegevens</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["full_name", "Naam"], ["company", "Bedrijf"], ["email", "Email"],
            ["phone", "Telefoon"], ["contact_person", "Contactpersoon"],
            ["address", "Adres"], ["billing_address", "Factuuradres"],
            ["kvk", "KVK"], ["btw", "BTW"],
            ["website_url", "Website URL (klant ziet 'Mijn Website' knop)"],
            ["package", "Pakket (bv. Starter/Pro)"],
          ].map(([k, label]) => (
            <label key={k} className="block text-sm">
              <span className="text-muted-foreground">{label}</span>
              <input value={f[k] ?? ""} onChange={(e) => setForm({ ...f, [k]: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </label>
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
        <button
          onClick={() => updateM.mutate({ user_id: accountId, ...f })}
          disabled={updateM.isPending}
          className="btn-primary text-sm"
        >
          {updateM.isPending ? "Bezig…" : "Opslaan"}
        </button>
        {updateM.error && <p className="text-sm text-destructive">{(updateM.error as Error).message}</p>}
      </div>

      <ProjectsCard projects={projects} />
    </div>
  );
}

// ---------------- Financieel ----------------

function FinancieelTab({ accountId, onChanged }: { accountId: string; onChanged: () => void }) {
  const get = useServerFn(adminGetCustomer);
  const setQuota = useServerFn(adminSetFreeQuota);
  const grant = useServerFn(adminGrantCredits);
  const addCost = useServerFn(adminAddCost);
  const delCost = useServerFn(adminDeleteCost);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-customer", accountId],
    queryFn: () => get({ data: { user_id: accountId } }),
  });

  const inv = () => { qc.invalidateQueries({ queryKey: ["admin-customer", accountId] }); onChanged(); };

  const setQuotaM = useMutation({
    mutationFn: (i: any) => setQuota({ data: i }),
    onSuccess: () => { inv(); toast.success("Quotum opgeslagen."); },
    onError: (e: any) => toast.error(e.message),
  });
  const grantM = useMutation({
    mutationFn: (i: any) => grant({ data: i }),
    onSuccess: () => { inv(); toast.success("Credits toegekend."); },
    onError: (e: any) => toast.error(e.message),
  });
  const addCostM = useMutation({
    mutationFn: (i: any) => addCost({ data: i }),
    onSuccess: () => inv(),
    onError: (e: any) => toast.error(e.message),
  });
  const delCostM = useMutation({
    mutationFn: (id: string) => delCost({ data: { id } }),
    onSuccess: () => inv(),
    onError: (e: any) => toast.error(e.message),
  });

  const [costForm, setCostForm] = useState({ description: "", amount: "" });

  if (isLoading || !data || !data.profile) return <Skeleton className="h-48 w-full rounded-lg" />;
  const p = data.profile;

  return (
    <div className="space-y-4 mt-2 max-w-2xl">
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-sm">Gratis change-quotum</h3>
        <p className="text-xs text-muted-foreground">Standaard 3 per maand. Leeg = standaard.</p>
        <div className="flex items-center gap-2">
          <input
            type="number" min={0} max={100}
            defaultValue={p.free_quota_override ?? ""}
            placeholder="3"
            onBlur={(e) => {
              const v = e.target.value === "" ? null : parseInt(e.target.value, 10);
              setQuotaM.mutate({ user_id: accountId, free_quota_override: v });
            }}
            className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <span className="text-xs text-muted-foreground">gratis changes / maand</span>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-sm">Credits toekennen</h3>
        <button
          onClick={() => {
            const n = parseInt(prompt("Extra credits toekennen?", "1") || "0", 10);
            if (n > 0) grantM.mutate({ user_id: accountId, amount: n, reason: "Handmatig" });
          }}
          disabled={grantM.isPending}
          className="inline-flex items-center gap-2 text-sm rounded-md border border-border px-3 py-2 hover:border-primary hover:text-primary transition-colors"
        >
          + Credits toekennen
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-sm">Kosten / facturen</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCostM.mutate({
              user_id: accountId,
              description: costForm.description,
              amount_cents: Math.round(parseFloat(costForm.amount) * 100),
            }, { onSuccess: () => setCostForm({ description: "", amount: "" }) });
          }}
          className="flex gap-2"
        >
          <input required placeholder="Omschrijving" value={costForm.description}
            onChange={(e) => setCostForm({ ...costForm, description: e.target.value })}
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input required type="number" step="0.01" placeholder="€" value={costForm.amount}
            onChange={(e) => setCostForm({ ...costForm, amount: e.target.value })}
            className="w-28 rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <button className="btn-primary text-sm px-4">+</button>
        </form>
        <div className="space-y-1">
          {data.costs.map((c: any) => (
            <div key={c.id} className="flex justify-between border-b border-border py-1 text-sm">
              <span>{c.cost_date} · {c.description}</span>
              <span>
                €{(c.amount_cents / 100).toFixed(2)}
                <button onClick={() => delCostM.mutate(c.id)} className="ml-2 text-destructive">×</button>
              </span>
            </div>
          ))}
          {data.costs.length === 0 && <p className="text-muted-foreground text-xs">Geen kosten geregistreerd.</p>}
        </div>
      </div>
    </div>
  );
}

// ---------------- Onboarding ----------------

function OnboardingTab({ accountId, onChanged }: { accountId: string; onChanged: () => void }) {
  const get = useServerFn(adminGetCustomer);
  const addOnb = useServerFn(adminAddOnboardingItem);
  const togOnb = useServerFn(adminToggleOnboardingItem);
  const delOnb = useServerFn(adminDeleteOnboardingItem);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-customer", accountId],
    queryFn: () => get({ data: { user_id: accountId } }),
  });

  const inv = () => { qc.invalidateQueries({ queryKey: ["admin-customer", accountId] }); onChanged(); };

  const addOnbM = useMutation({ mutationFn: (i: any) => addOnb({ data: i }), onSuccess: () => inv(), onError: (e: any) => toast.error(e.message) });
  const togOnbM = useMutation({ mutationFn: (i: any) => togOnb({ data: i }), onSuccess: () => inv(), onError: (e: any) => toast.error(e.message) });
  const delOnbM = useMutation({ mutationFn: (id: string) => delOnb({ data: { id } }), onSuccess: () => inv(), onError: (e: any) => toast.error(e.message) });

  const [onbLabel, setOnbLabel] = useState("");

  if (isLoading || !data) return <Skeleton className="h-48 w-full rounded-lg" />;

  return (
    <div className="space-y-4 mt-2 max-w-2xl">
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-sm">Onboarding checklist</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!onbLabel.trim()) return;
            addOnbM.mutate({ user_id: accountId, label: onbLabel }, { onSuccess: () => setOnbLabel("") });
          }}
          className="flex gap-2"
        >
          <input value={onbLabel} onChange={(e) => setOnbLabel(e.target.value)}
            placeholder="Stap (bv. Domein gekoppeld)"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <button className="btn-primary text-sm px-4">+</button>
        </form>
        <ul className="space-y-1.5">
          {data.onboarding.map((o: any) => (
            <li key={o.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={o.done}
                onChange={() => togOnbM.mutate({ id: o.id, done: !o.done })} />
              <span className={o.done ? "line-through text-muted-foreground" : ""}>{o.label}</span>
              <button onClick={() => delOnbM.mutate(o.id)} className="ml-auto text-destructive text-xs">×</button>
            </li>
          ))}
          {data.onboarding.length === 0 && <p className="text-muted-foreground text-xs">Nog geen stappen toegevoegd.</p>}
        </ul>
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

function ActiviteitTab({ loginEvents, auditLog, siteErrors = [] }: { loginEvents: any[]; auditLog: any[]; siteErrors?: any[] }) {
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

      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <h3 className="font-semibold text-sm">Site errors (client-side + server-side)</h3>
        {siteErrors.length === 0 ? (
          <p className="text-sm text-muted-foreground">Geen gelogde fouten.</p>
        ) : (
          <ul className="space-y-1.5">
            {siteErrors.map((e: any) => (
              <li key={e.id} className="text-sm border-t border-border first:border-t-0 pt-1.5 first:pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleString("nl-NL")}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[50%]">{e.url}</span>
                </div>
                <pre className="text-xs text-destructive mt-1 whitespace-pre-wrap break-all">{e.message}</pre>
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
  const setPw = useServerFn(adminSetPassword);
  const notify = useServerFn(adminSendNotification);
  const hardDel = useServerFn(adminHardDeleteAccount);

  const [notifyForm, setNotifyForm] = useState({ title: "", message: "" });

  const setPwM = useMutation({
    mutationFn: (password: string) => setPw({ data: { user_id: accountId, password } }),
    onSuccess: () => toast.success("Wachtwoord aangepast."),
    onError: (e: any) => toast.error(e.message),
  });
  const notifyM = useMutation({
    mutationFn: (i: any) => notify({ data: i }),
    onSuccess: () => { setNotifyForm({ title: "", message: "" }); toast.success("Notificatie verstuurd."); },
    onError: (e: any) => toast.error(e.message),
  });

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
        <div className="flex flex-wrap gap-2">
          <button onClick={() => resetM.mutate()} disabled={resetM.isPending} className="inline-flex items-center gap-2 text-sm rounded-md border border-border px-3 py-2 hover:border-primary hover:text-primary transition-colors">
            <KeyRound className="w-4 h-4" />
            {resetM.isPending ? "Bezig…" : "Wachtwoord-reset e-mail versturen"}
          </button>
          <button
            onClick={() => {
              const pw = prompt(`Nieuw wachtwoord voor ${profile.email} (min 8 tekens):`);
              if (pw && pw.length >= 8) setPwM.mutate(pw);
            }}
            disabled={setPwM.isPending}
            className="inline-flex items-center gap-2 text-sm rounded-md border border-border px-3 py-2 hover:border-primary hover:text-primary transition-colors"
          >
            <KeyRound className="w-4 h-4" />
            Wachtwoord direct instellen
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-sm flex items-center gap-1.5"><Bell className="w-4 h-4" />Notificatie versturen</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            notifyM.mutate({ user_id: accountId, title: notifyForm.title, message: notifyForm.message });
          }}
          className="space-y-2"
        >
          <input required placeholder="Titel" value={notifyForm.title}
            onChange={(e) => setNotifyForm({ ...notifyForm, title: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <textarea required placeholder="Bericht" rows={3} value={notifyForm.message}
            onChange={(e) => setNotifyForm({ ...notifyForm, message: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <button type="submit" disabled={notifyM.isPending} className="btn-primary text-sm">
            {notifyM.isPending ? "Bezig…" : "Verstuur"}
          </button>
        </form>
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
