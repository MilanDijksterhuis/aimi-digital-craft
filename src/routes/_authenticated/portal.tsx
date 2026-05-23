import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  getMyDashboard,
  submitChangeRequest,
  requestExtraCredits,
  markNotificationRead,
} from "@/lib/portal.functions";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => ({ meta: [{ title: "Portaal — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: PortalPage,
});

function PortalPage() {
  const fetchDash = useServerFn(getMyDashboard);
  const submit = useServerFn(submitChangeRequest);
  const buy = useServerFn(requestExtraCredits);
  const markRead = useServerFn(markNotificationRead);
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDash({}),
  });

  const submitM = useMutation({
    mutationFn: (input: { title: string; description: string; priority: "low" | "normal" | "high" }) =>
      submit({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dashboard"] }),
  });
  const buyM = useMutation({
    mutationFn: (n: number) => buy({ data: { amount: n } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dashboard"] }),
  });
  const readM = useMutation({
    mutationFn: (id: string) => markRead({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dashboard"] }),
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "normal" | "high">("normal");
  const [purchaseQty, setPurchaseQty] = useState(1);

  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;
  if (error) return <p className="text-destructive">Fout: {(error as Error).message}</p>;
  if (!data) return null;

  const unread = data.notifications.filter((n: any) => !n.read);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-bold">
          Hoi {data.profile?.full_name || "klant"} 👋
        </h1>
        <p className="text-muted-foreground">{data.profile?.company}</p>
      </div>

      {/* Credits */}
      <section className="grid sm:grid-cols-3 gap-4">
        <Stat label="Beschikbaar deze maand" value={data.availableCredits} accent />
        <Stat label="Gebruikt deze maand" value={`${data.usedThisMonth} / ${3 + data.extraTotal}`} />
        <Stat label="Extra gekochte changes" value={data.extraTotal} />
      </section>

      {/* New request */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-2xl font-semibold mb-4">Nieuwe change indienen</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            submitM.mutate(
              { title, description, priority },
              {
                onSuccess: () => {
                  setTitle("");
                  setDescription("");
                  setPriority("normal");
                },
              },
            );
          }}
        >
          <input
            required
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <textarea
            required
            placeholder="Wat moet er aangepast worden?"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <div className="flex items-center gap-3">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="low">Lage prioriteit</option>
              <option value="normal">Normaal</option>
              <option value="high">Hoog</option>
            </select>
            <button
              type="submit"
              disabled={submitM.isPending || data.availableCredits <= 0}
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {submitM.isPending ? "Bezig…" : "Indienen"}
            </button>
            {data.availableCredits <= 0 && (
              <span className="text-sm text-destructive">Geen credits — koop extra hieronder.</span>
            )}
          </div>
          {submitM.error && (
            <p className="text-sm text-destructive">{(submitM.error as Error).message}</p>
          )}
        </form>
      </section>

      {/* Buy extra */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-2xl font-semibold mb-2">Extra changes bijkopen</h2>
        <p className="text-sm text-muted-foreground mb-4">
          €20 per extra change. Na aankoopverzoek voegt AIMI je credits toe en sturen we een factuur.
        </p>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={1}
            max={50}
            value={purchaseQty}
            onChange={(e) => setPurchaseQty(parseInt(e.target.value || "1", 10))}
            className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <button
            onClick={() => buyM.mutate(purchaseQty)}
            disabled={buyM.isPending}
            className="rounded-full border border-primary px-5 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition"
          >
            {buyM.isPending ? "Bezig…" : `Aanvragen (€${purchaseQty * 20})`}
          </button>
          {buyM.isSuccess && (
            <span className="text-sm text-primary">Verzoek verstuurd ✓</span>
          )}
        </div>
      </section>

      {/* Requests list */}
      <section>
        <h2 className="font-display text-2xl font-semibold mb-4">Jouw changes</h2>
        {data.requests.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nog geen changes ingediend.</p>
        ) : (
          <div className="space-y-3">
            {data.requests.map((r: any) => (
              <div key={r.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{r.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{r.description}</p>
                    {r.admin_notes && (
                      <p className="mt-2 rounded-md bg-muted/50 p-2 text-xs">
                        <strong>AIMI:</strong> {r.admin_notes}
                      </p>
                    )}
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString("nl-NL")} · {r.priority}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Notifications */}
      <section>
        <h2 className="font-display text-2xl font-semibold mb-4">
          Meldingen {unread.length > 0 && <span className="text-sm text-primary">({unread.length} nieuw)</span>}
        </h2>
        {data.notifications.length === 0 ? (
          <p className="text-muted-foreground text-sm">Geen meldingen.</p>
        ) : (
          <div className="space-y-2">
            {data.notifications.map((n: any) => (
              <div
                key={n.id}
                className={`rounded-lg border p-3 ${
                  n.read ? "border-border bg-card" : "border-primary/40 bg-primary/5"
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="font-medium text-sm">{n.title}</p>
                    <p className="text-sm text-muted-foreground">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(n.created_at).toLocaleString("nl-NL")}
                    </p>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => readM.mutate(n.id)}
                      className="text-xs text-primary hover:underline"
                    >
                      Markeer als gelezen
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: any; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "border-primary/40 bg-primary/5" : "border-border bg-card"}`}>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-muted text-muted-foreground",
    in_progress: "bg-secondary/20 text-secondary",
    done: "bg-primary/20 text-primary",
    rejected: "bg-destructive/20 text-destructive",
  };
  const labels: Record<string, string> = {
    pending: "In wachtrij",
    in_progress: "In behandeling",
    done: "Klaar",
    rejected: "Afgewezen",
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${map[status] ?? ""}`}>
      {labels[status] ?? status}
    </span>
  );
}
