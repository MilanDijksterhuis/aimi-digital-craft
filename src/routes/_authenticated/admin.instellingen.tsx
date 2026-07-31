import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, Send, Bell, Trash2, Loader2 } from "lucide-react";
import {
  adminListRecipients,
  adminCreateRecipient,
  adminGenerateRecipientLink,
  adminToggleRecipient,
  adminDeleteRecipient,
} from "@/lib/telegram.functions";

export const Route = createFileRoute("/_authenticated/admin/instellingen")({
  head: () => ({ meta: [{ title: "Instellingen — Admin — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AdminInstellingenPage,
});

function AdminInstellingenPage() {
  return (
    <div className="space-y-6">
      <Link to="/admin" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit">
        <ChevronLeft className="w-4 h-4" /> Terug naar Admin
      </Link>
      <div>
        <h1 className="font-display text-3xl font-bold">Instellingen</h1>
        <p className="text-muted-foreground">Beheer o.a. wie een Telegram-melding krijgt bij contactformulier-inzendingen.</p>
      </div>
      <RecipientsPanel />
    </div>
  );
}

function RecipientsPanel() {
  const list = useServerFn(adminListRecipients);
  const create = useServerFn(adminCreateRecipient);
  const genLink = useServerFn(adminGenerateRecipientLink);
  const toggle = useServerFn(adminToggleRecipient);
  const del = useServerFn(adminDeleteRecipient);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["telegram-recipients"], queryFn: () => list({}) });
  const inv = () => qc.invalidateQueries({ queryKey: ["telegram-recipients"] });

  const [label, setLabel] = useState("");

  // Poll zolang er een recipient wacht op koppeling.
  const [waitingId, setWaitingId] = useState<string | null>(null);
  useEffect(() => {
    if (!waitingId) return;
    const t = setInterval(() => inv(), 3000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitingId]);

  const items: any[] = (data as any)?.items ?? [];
  // Stop met wachten zodra de betreffende recipient gekoppeld is.
  useEffect(() => {
    if (waitingId && items.find((r) => r.id === waitingId)?.telegram_chat_id) {
      setWaitingId(null);
      toast.success("Ontvanger gekoppeld ✅");
    }
  }, [items, waitingId]);

  const createM = useMutation({
    mutationFn: () => create({ data: { label: label.trim() } }),
    onSuccess: () => { setLabel(""); inv(); toast.success("Ontvanger toegevoegd."); },
    onError: (e: any) => toast.error(e.message),
  });
  const linkM = useMutation({
    mutationFn: (id: string) => genLink({ data: { id } }),
    onSuccess: ({ deepLink }, id) => { setWaitingId(id); window.open(deepLink, "_blank", "noopener"); },
    onError: (e: any) => toast.error(e.message),
  });
  const toggleM = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) => toggle({ data: { id, active } }),
    onSuccess: () => inv(),
    onError: (e: any) => toast.error(e.message),
  });
  const delM = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => { inv(); toast.success("Ontvanger verwijderd."); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4 max-w-2xl">
      <h2 className="font-semibold text-sm flex items-center gap-1.5">
        <Bell className="w-4 h-4" /> Telegram-notificatie-ontvangers
      </h2>
      <p className="text-xs text-muted-foreground">
        Iedere actieve, gekoppelde ontvanger krijgt een Telegram-bericht zodra iemand het contactformulier invult.
        Een ontvanger moet eenmalig de bot starten via de koppellink (Telegram kan niet naar een los nummer sturen).
      </p>

      <form
        onSubmit={(e) => { e.preventDefault(); if (label.trim()) createM.mutate(); }}
        className="flex gap-2"
      >
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Naam (bv. Milan)"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <button className="btn-primary text-sm px-4" disabled={createM.isPending || !label.trim()}>
          + Toevoegen
        </button>
      </form>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Laden…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nog geen ontvangers.</p>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((r) => {
            const linked = !!r.telegram_chat_id;
            return (
              <li key={r.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{r.label}</p>
                  {linked ? (
                    <p className="text-xs text-emerald-600">Gekoppeld ✅ {r.telegram_username ? `(@${r.telegram_username})` : ""}</p>
                  ) : waitingId === r.id ? (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" /> Wachten op koppeling…
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Nog niet gekoppeld</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!linked && (
                    <button
                      onClick={() => linkM.mutate(r.id)}
                      disabled={linkM.isPending}
                      className="inline-flex items-center gap-1.5 text-xs rounded-md border border-border px-2.5 py-1.5 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" /> Koppel
                    </button>
                  )}
                  <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={r.active}
                      onChange={(e) => toggleM.mutate({ id: r.id, active: e.target.checked })}
                    />
                    Actief
                  </label>
                  <button onClick={() => delM.mutate(r.id)} className="text-destructive hover:opacity-80" aria-label="Verwijderen">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
