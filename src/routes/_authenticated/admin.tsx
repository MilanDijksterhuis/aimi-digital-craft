import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  adminGetOverview,
  adminCreateCustomerFn,
  adminUpdateRequestStatus,
  adminGrantCredits,
  adminSendNotification,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const fetchOv = useServerFn(adminGetOverview);
  const createC = useServerFn(adminCreateCustomerFn);
  const updateReq = useServerFn(adminUpdateRequestStatus);
  const grant = useServerFn(adminGrantCredits);
  const notify = useServerFn(adminSendNotification);
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: () => fetchOv({}),
  });

  const createM = useMutation({
    mutationFn: (i: any) => createC({ data: i }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-overview"] }),
  });
  const updateM = useMutation({
    mutationFn: (i: any) => updateReq({ data: i }),
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

  const [newC, setNewC] = useState({ email: "", full_name: "", company: "" });
  const [notifyState, setNotifyState] = useState<{ user_id: string; title: string; message: string } | null>(null);

  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;
  if (error) {
    const msg = (error as Error).message;
    if (msg.includes("Forbidden")) {
      return (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6">
          <h2 className="font-display text-xl font-semibold">Geen toegang</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Je account heeft geen admin-rol. Vraag een admin om jouw rol toe te wijzen.
          </p>
        </div>
      );
    }
    return <p className="text-destructive">Fout: {msg}</p>;
  }
  if (!data) return null;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-bold">Admin dashboard</h1>
        <p className="text-muted-foreground">Beheer klanten, changes en notificaties.</p>
      </div>

      {/* Create customer */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-2xl font-semibold mb-4">Nieuwe klant aanmaken</h2>
        <form
          className="grid sm:grid-cols-4 gap-3 items-end"
          onSubmit={(e) => {
            e.preventDefault();
            createM.mutate(newC, {
              onSuccess: () => setNewC({ email: "", full_name: "", company: "" }),
            });
          }}
        >
          <Field label="Volledige naam" value={newC.full_name} onChange={(v) => setNewC({ ...newC, full_name: v })} required />
          <Field label="Email" type="email" value={newC.email} onChange={(v) => setNewC({ ...newC, email: v })} required />
          <Field label="Bedrijf" value={newC.company} onChange={(v) => setNewC({ ...newC, company: v })} />
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
            <p className="mt-2">Tijdelijk wachtwoord (deel veilig met de klant):</p>
            <code className="block mt-1 rounded bg-background px-2 py-1 font-mono text-base">
              {createM.data.tempPassword}
            </code>
          </div>
        )}
        {createM.error && <p className="mt-3 text-sm text-destructive">{(createM.error as Error).message}</p>}
      </section>

      {/* Pending purchase requests */}
      {data.pendingPurchases.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl font-semibold mb-4">Openstaande aankoopverzoeken</h2>
          <div className="space-y-2">
            {data.pendingPurchases.map((p: any) => {
              const c = data.customers.find((c: any) => c.id === p.user_id);
              return (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="text-sm">
                    <p className="font-medium">{c?.full_name ?? p.user_id} ({c?.email})</p>
                    <p className="text-muted-foreground">wil {p.amount} extra change(s) — €{p.amount * 49}</p>
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
                    className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
                  >
                    Goedkeuren
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Customers */}
      <section>
        <h2 className="font-display text-2xl font-semibold mb-4">Klanten</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-muted-foreground">
              <tr>
                <th className="text-left p-3">Naam</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Bedrijf</th>
                <th className="text-left p-3">Gebruikt</th>
                <th className="text-left p-3">Beschikbaar</th>
                <th className="text-left p-3">Acties</th>
              </tr>
            </thead>
            <tbody>
              {data.customers.map((c: any) => (
                <tr key={c.id} className="border-t border-border">
                  <td className="p-3">{c.full_name || "—"}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.company || "—"}</td>
                  <td className="p-3">{c.usedThisMonth} / {3 + c.extraCredits}</td>
                  <td className="p-3 font-semibold">{c.available}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => {
                        const n = parseInt(prompt(`Hoeveel extra changes toekennen aan ${c.email}?`, "1") || "0", 10);
                        if (n > 0) grantM.mutate({ user_id: c.id, amount: n, reason: "Handmatig" });
                      }}
                      className="text-xs text-primary hover:underline"
                    >
                      + credits
                    </button>
                    <button
                      onClick={() =>
                        setNotifyState({ user_id: c.id, title: "", message: "" })
                      }
                      className="text-xs text-primary hover:underline"
                    >
                      notificatie
                    </button>
                  </td>
                </tr>
              ))}
              {data.customers.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-muted-foreground">
                    Nog geen klanten. Maak hierboven je eerste klant aan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Notification modal */}
      {notifyState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-xl font-semibold mb-4">Notificatie sturen</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                notifyM.mutate(notifyState, {
                  onSuccess: () => setNotifyState(null),
                });
              }}
              className="space-y-3"
            >
              <input
                required
                placeholder="Titel"
                value={notifyState.title}
                onChange={(e) => setNotifyState({ ...notifyState, title: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <textarea
                required
                placeholder="Bericht"
                rows={4}
                value={notifyState.message}
                onChange={(e) => setNotifyState({ ...notifyState, message: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setNotifyState(null)}
                  className="rounded-full px-4 py-2 text-sm hover:bg-accent"
                >
                  Annuleer
                </button>
                <button
                  type="submit"
                  disabled={notifyM.isPending}
                  className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                >
                  Verstuur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* All change requests */}
      <section>
        <h2 className="font-display text-2xl font-semibold mb-4">Alle changes</h2>
        <div className="space-y-3">
          {data.requests.map((r: any) => {
            const c = data.customers.find((c: any) => c.id === r.user_id);
            return (
              <div key={r.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">
                      {c?.email ?? r.user_id} · {new Date(r.created_at).toLocaleDateString("nl-NL")} · {r.priority}
                    </p>
                    <h3 className="font-semibold mt-1">{r.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{r.description}</p>
                  </div>
                  <select
                    value={r.status}
                    onChange={(e) =>
                      updateM.mutate({
                        id: r.id,
                        status: e.target.value as any,
                        admin_notes: r.admin_notes ?? undefined,
                      })
                    }
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                  >
                    <option value="pending">In wachtrij</option>
                    <option value="in_progress">In behandeling</option>
                    <option value="done">Klaar</option>
                    <option value="rejected">Afwijzen</option>
                  </select>
                </div>
              </div>
            );
          })}
          {data.requests.length === 0 && (
            <p className="text-muted-foreground text-sm">Nog geen changes.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}
