import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
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
} from "@/lib/admin.functions";
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

  const [tab, setTab] = useState<"dashboard" | "klanten" | "changes" | "aanvragen" | "afspraken">(
    "dashboard",
  );
  const [openCustomer, setOpenCustomer] = useState<string | null>(null);
  const [openRequest, setOpenRequest] = useState<string | null>(null);

  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl font-bold">Admin</h1>
        <p className="text-muted-foreground">Beheer klanten, changes en groei.</p>
      </div>

      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {[
          ["dashboard", "📊 Groei"],
          ["klanten", `👥 Klanten (${data.customers.length})`],
          ["changes", `🔧 Changes (${data.requests.length})`],
          ["aanvragen", `🛒 Aanvragen (${data.pendingPurchases.length})`],
          ["afspraken", "📅 Afspraken"],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k as any)}
            className={`px-4 py-2 text-sm whitespace-nowrap border-b-2 ${
              tab === k ? "border-primary text-primary" : "border-transparent text-muted-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === "dashboard" && <Dashboard metrics={data.metrics} />}

      {tab === "klanten" && (
        <KlantenTab
          data={data}
          qc={qc}
          openCustomer={openCustomer}
          setOpenCustomer={setOpenCustomer}
        />
      )}

      {tab === "changes" && (
        <ChangesTab
          data={data}
          qc={qc}
          openRequest={openRequest}
          setOpenRequest={setOpenRequest}
        />
      )}

      {tab === "aanvragen" && <AanvragenTab data={data} qc={qc} />}
      {tab === "afspraken" && <AfsprakenTab customers={data.customers} qc={qc} />}
    </div>
  );
}

function Dashboard({ metrics }: { metrics: any }) {
  const max = Math.max(1, ...metrics.months.map((m: any) => m.count));
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <Card label="Klanten" value={metrics.totalCustomers} />
        <Card label="Actief (30d)" value={metrics.activeCount} accent />
        <Card label="Inactief" value={metrics.inactiveCount} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Card
          label="Gem. responstijd (uur)"
          value={metrics.avgResponseHours ?? "—"}
        />
        <Card label="Totaal changes" value={metrics.totalRequests} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Nieuwe klanten per maand</h3>
        <div className="flex items-end gap-2 h-32">
          {metrics.months.map((m: any) => (
            <div key={m.label} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-primary rounded-t"
                style={{ height: `${(m.count / max) * 100}%`, minHeight: m.count ? 4 : 0 }}
              />
              <span className="text-xs text-muted-foreground">{m.label.slice(5)}</span>
              <span className="text-xs font-semibold">{m.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ label, value, accent }: { label: string; value: any; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "border-primary/40 bg-primary/5" : "border-border bg-card"}`}>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
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
        <p className="text-sm text-primary">Wachtwoord aangepast ✓</p>
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
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/15 text-destructive">⚡ Spoed</span>
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
              📎 {a.file_name}
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
                {c.company && <p className="text-muted-foreground">🏢 {c.company}</p>}
                {c.phone && <p className="text-muted-foreground">📞 {c.phone}</p>}
                {(c.billing_address || c.address) && (
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    📍 {c.billing_address || c.address}
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
                ✓ Toekennen
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
            <option value="phone">📞 Telefoon</option>
            <option value="teams">💻 Teams</option>
            <option value="in_person">🤝 In het echt</option>
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
              a.kind === "teams" ? "💻" : a.kind === "in_person" ? "🤝" : "📞";
            return (
              <div
                key={a.id}
                className="rounded-xl border border-border bg-card p-3 flex justify-between items-start gap-4"
              >
                <div className="text-sm">
                  <p className="font-semibold">
                    {kindIcon} {a.title}
                  </p>
                  <p className="text-muted-foreground">
                    {c?.full_name || c?.email || a.user_id} ·{" "}
                    {new Date(a.scheduled_at).toLocaleString("nl-NL")}
                  </p>
                  {a.location && (
                    <p className="text-xs text-muted-foreground mt-1">📍 {a.location}</p>
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
