import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  getMyDashboard,
  submitChangeRequest,
  requestExtraCredits,
  markNotificationRead,
  markAllNotificationsRead,
  postCustomerComment,
  getAttachmentUrl,
  updateMyProfile,
} from "@/lib/portal.functions";
import { supabase } from "@/integrations/supabase/client";
import {
  STATUS_LABEL,
  STATUS_FLOW,
  STATUS_COLOR,
  PRIORITY_LABEL,
  PRIORITY_COLOR,
  CATEGORY_LABEL,
  CATEGORY_KEYS,
  isCategoryFree,
  priceForChange,
  PAID_CHANGE_PRICE_EUR,
  RUSH_SURCHARGE_EUR,
  CHANGE_TEMPLATES,
} from "@/lib/status";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => ({ meta: [{ title: "Portaal — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: PortalPage,
});

function PortalPage() {
  const fetchDash = useServerFn(getMyDashboard);
  const submit = useServerFn(submitChangeRequest);
  const buy = useServerFn(requestExtraCredits);
  const markRead = useServerFn(markNotificationRead);
  const markAll = useServerFn(markAllNotificationsRead);
  const postComment = useServerFn(postCustomerComment);
  const attUrl = useServerFn(getAttachmentUrl);
  const updateProfile = useServerFn(updateMyProfile);
  const qc = useQueryClient();
  const updateProfileM = useMutation({
    mutationFn: (i: any) => updateProfile({ data: i }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dashboard"] }),
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDash({}),
  });

  const submitM = useMutation({
    mutationFn: (input: any) => submit({ data: input }),
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
  const commentM = useMutation({
    mutationFn: (i: { request_id: string; body: string }) => postComment({ data: i }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dashboard"] }),
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "normal" | "high" | "urgent">("normal");
  const [category, setCategory] = useState<string>("text");
  const [rush, setRush] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [purchaseQty, setPurchaseQty] = useState(1);
  const [showNotifs, setShowNotifs] = useState(false);
  const [openThread, setOpenThread] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [uploading, setUploading] = useState(false);

  if (isLoading) return <p className="text-muted-foreground">Laden…</p>;
  if (error) return <p className="text-destructive">Fout: {(error as Error).message}</p>;
  if (!data) return null;

  const unread = data.notifications.filter((n: any) => !n.read);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      const uploaded: any[] = [];
      if (files.length && data.profile) {
        for (const f of files) {
          const path = `${data.profile.id}/pending/${crypto.randomUUID()}-${f.name}`;
          const { error: upErr } = await supabase.storage
            .from("change-attachments")
            .upload(path, f, { upsert: false });
          if (upErr) throw upErr;
          uploaded.push({
            file_path: path,
            file_name: f.name,
            mime_type: f.type,
            size_bytes: f.size,
          });
        }
      }
      await submitM.mutateAsync({ title, description, priority, attachments: uploaded });
      setTitle(""); setDescription(""); setPriority("normal"); setFiles([]);
    } finally {
      setUploading(false);
    }
  };

  const openAttachment = async (file_path: string) => {
    const { url } = await attUrl({ data: { file_path } });
    window.open(url, "_blank");
  };

  const referralLink = data.profile?.referral_code
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/?ref=${data.profile.referral_code}`
    : "";

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold">
            Hoi {data.profile?.full_name || "klant"} 👋
          </h1>
          <p className="text-muted-foreground">{data.profile?.company}</p>
        </div>
        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs((v) => !v)}
            className="relative rounded-full border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
          >
            🔔
            {unread.length > 0 && (
              <span className="absolute -top-1 -right-1 rounded-full bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 min-w-[20px] text-center">
                {unread.length}
              </span>
            )}
          </button>
          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto rounded-xl border border-border bg-card shadow-lg z-50">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <span className="font-semibold text-sm">Meldingen</span>
                {unread.length > 0 && (
                  <button
                    onClick={() => markAll({}).then(() => qc.invalidateQueries({ queryKey: ["dashboard"] }))}
                    className="text-xs text-primary hover:underline"
                  >
                    Alles gelezen
                  </button>
                )}
              </div>
              {data.notifications.length === 0 ? (
                <p className="p-4 text-sm text-muted-foreground">Geen meldingen.</p>
              ) : (
                data.notifications.slice(0, 10).map((n: any) => (
                  <div
                    key={n.id}
                    className={`p-3 border-b border-border text-sm ${n.read ? "" : "bg-primary/5"}`}
                    onClick={() => !n.read && readM.mutate(n.id)}
                  >
                    <p className="font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        {data.profile?.website_url && (
          <a
            href={data.profile.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            🌐 Mijn Website
          </a>
        )}
      </div>

      {/* Afspraken */}
      {data.appointments && data.appointments.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl font-semibold mb-4">📅 Afspraken</h2>
          <ul className="space-y-2">
            {data.appointments.map((a: any) => {
              const icon = a.kind === "teams" ? "💻" : a.kind === "in_person" ? "🤝" : "📞";
              return (
                <li key={a.id} className="rounded-lg border border-border p-3 text-sm">
                  <p className="font-semibold">{icon} {a.title}</p>
                  <p className="text-muted-foreground">
                    {new Date(a.scheduled_at).toLocaleString("nl-NL")}
                  </p>
                  {a.location && (
                    <p className="text-xs text-muted-foreground mt-1">📍 {a.location}</p>
                  )}
                  {a.notes && <p className="text-xs mt-1 whitespace-pre-wrap">{a.notes}</p>}
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            Wil je een afspraak inplannen? Stuur een bericht via één van je changes of mail ons.
          </p>
        </section>
      )}

      {/* Mijn gegevens */}
      <ProfileEditor profile={data.profile} onSave={(v: any) => updateProfileM.mutate(v)} pending={updateProfileM.isPending} />

      {/* Credits */}
      <section className="grid sm:grid-cols-3 gap-4">
        <Stat label="Beschikbaar deze maand" value={data.availableCredits} accent />
        <Stat label="Gebruikt deze maand" value={`${data.usedThisMonth} / ${3 + data.extraTotal}`} />
        <Stat label="Extra gekochte changes" value={data.extraTotal} />
      </section>

      {/* Onboarding (only if items exist) */}
      {data.onboarding.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl font-semibold mb-4">Onboarding</h2>
          <ul className="space-y-2">
            {data.onboarding.map((o: any) => (
              <li key={o.id} className="flex items-center gap-2 text-sm">
                <span className={o.done ? "text-primary" : "text-muted-foreground"}>
                  {o.done ? "✓" : "○"}
                </span>
                <span className={o.done ? "line-through text-muted-foreground" : ""}>{o.label}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* New request */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-2xl font-semibold mb-4">Nieuwe change indienen</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            required placeholder="Titel" value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <textarea
            required placeholder="Wat moet er aangepast worden?" rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="low">Laag</option>
              <option value="normal">Normaal</option>
              <option value="high">Hoog</option>
              <option value="urgent">Urgent</option>
            </select>
            <label className="rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer hover:bg-accent">
              📎 Screenshots ({files.length})
              <input
                type="file" multiple accept="image/*,.pdf" className="hidden"
                onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              />
            </label>
            <button
              type="submit"
              disabled={submitM.isPending || uploading || data.availableCredits <= 0}
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {uploading || submitM.isPending ? "Bezig…" : "Indienen"}
            </button>
            {data.availableCredits <= 0 && (
              <span className="text-sm text-destructive">Geen credits — koop hieronder bij.</span>
            )}
          </div>
          {files.length > 0 && (
            <div className="text-xs text-muted-foreground">
              {files.map((f) => f.name).join(", ")}
            </div>
          )}
          {submitM.error && (
            <p className="text-sm text-destructive">{(submitM.error as Error).message}</p>
          )}
        </form>
      </section>

      {/* Buy extra */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-2xl font-semibold mb-2">Extra changes bijkopen</h2>
        <p className="text-sm text-muted-foreground mb-4">€20 per extra change.</p>
        <div className="flex items-center gap-3">
          <input
            type="number" min={1} max={50} value={purchaseQty}
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
          {buyM.isSuccess && <span className="text-sm text-primary">Verzoek verstuurd ✓</span>}
        </div>
      </section>

      {/* Referral */}
      {data.profile?.referral_code && (
        <section className="rounded-2xl border border-primary/40 bg-primary/5 p-6">
          <h2 className="font-display text-2xl font-semibold mb-2">Ken jij iemand?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Deel jouw referral-link. Wie via jou een site bestelt krijgt korting — jij ook.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-md bg-background border border-border px-3 py-2 text-sm overflow-auto">
              {referralLink}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(referralLink)}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Kopieer
            </button>
          </div>
        </section>
      )}

      {/* Requests */}
      <section>
        <h2 className="font-display text-2xl font-semibold mb-4">Jouw changes</h2>
        {data.requests.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nog geen changes ingediend.</p>
        ) : (
          <div className="space-y-3">
            {data.requests.map((r: any) => (
              <div key={r.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold">{r.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{r.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLOR[r.status] ?? ""}`}>
                    {STATUS_LABEL[r.status] ?? r.status}
                  </span>
                </div>

                {/* Status stepper */}
                {r.status !== "rejected" && (
                  <div className="mt-4 flex items-center gap-1 text-xs">
                    {STATUS_FLOW.map((s, i) => {
                      const currentIdx = STATUS_FLOW.indexOf(r.status as any);
                      const reached = i <= currentIdx;
                      return (
                        <div key={s} className="flex-1 flex items-center gap-1">
                          <div
                            className={`flex-1 h-1.5 rounded-full ${reached ? "bg-primary" : "bg-muted"}`}
                          />
                          {i === STATUS_FLOW.length - 1 && (
                            <span className="text-muted-foreground whitespace-nowrap ml-1">
                              {STATUS_LABEL[s]}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{new Date(r.created_at).toLocaleDateString("nl-NL")}</span>
                  <span className={PRIORITY_COLOR[r.priority]}>
                    {PRIORITY_LABEL[r.priority] ?? r.priority}
                  </span>
                  {r.due_date && (
                    <span>Opleverdatum: {new Date(r.due_date).toLocaleDateString("nl-NL")}</span>
                  )}
                </div>

                {/* Attachments */}
                {r.change_attachments?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {r.change_attachments.map((a: any) => (
                      <button
                        key={a.id}
                        onClick={() => openAttachment(a.file_path)}
                        className="text-xs rounded-md border border-border bg-muted/40 px-2 py-1 hover:bg-accent"
                      >
                        📎 {a.file_name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Thread */}
                <div className="mt-3 border-t border-border pt-3">
                  <button
                    onClick={() => setOpenThread(openThread === r.id ? null : r.id)}
                    className="text-xs text-primary hover:underline"
                  >
                    💬 Berichten ({r.change_comments?.length ?? 0})
                  </button>
                  {openThread === r.id && (
                    <div className="mt-3 space-y-2">
                      {(r.change_comments ?? [])
                        .sort((a: any, b: any) => a.created_at.localeCompare(b.created_at))
                        .map((c: any) => {
                          const mine = c.author_id === data.profile?.id;
                          return (
                            <div
                              key={c.id}
                              className={`rounded-lg p-2 text-sm ${mine ? "bg-muted/40" : "bg-primary/10"}`}
                            >
                              <p className="text-xs text-muted-foreground">
                                {mine ? "Jij" : "AIMI"} · {new Date(c.created_at).toLocaleString("nl-NL")}
                              </p>
                              <p className="whitespace-pre-wrap">{c.body}</p>
                            </div>
                          );
                        })}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!comment.trim()) return;
                          commentM.mutate(
                            { request_id: r.id, body: comment },
                            { onSuccess: () => setComment("") },
                          );
                        }}
                        className="flex gap-2"
                      >
                        <input
                          value={openThread === r.id ? comment : ""}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Bericht…"
                          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <button
                          type="submit"
                          disabled={commentM.isPending}
                          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        >
                          Verstuur
                        </button>
                      </form>
                    </div>
                  )}
                </div>

                {r.admin_notes && (
                  <p className="mt-2 rounded-md bg-muted/50 p-2 text-xs">
                    <strong>AIMI:</strong> {r.admin_notes}
                  </p>
                )}
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

function ProfileEditor({ profile, onSave, pending }: { profile: any; onSave: (v: any) => void; pending: boolean }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({
    full_name: profile?.full_name ?? "",
    company: profile?.company ?? "",
    phone: profile?.phone ?? "",
    contact_person: profile?.contact_person ?? "",
    address: profile?.address ?? "",
    billing_address: profile?.billing_address ?? "",
    kvk: profile?.kvk ?? "",
    btw: profile?.btw ?? "",
  });
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-2xl border border-border bg-card p-4 text-left w-full hover:bg-accent transition"
      >
        <p className="font-semibold">⚙️ Mijn gegevens</p>
        <p className="text-sm text-muted-foreground">
          Vul KVK, factuuradres, contactpersoon en meer aan.
        </p>
      </button>
    );
  }
  const fields: [keyof typeof f, string][] = [
    ["full_name", "Naam"],
    ["company", "Bedrijf"],
    ["contact_person", "Contactpersoon"],
    ["phone", "Telefoon"],
    ["address", "Adres"],
    ["billing_address", "Factuuradres"],
    ["kvk", "KVK-nummer"],
    ["btw", "BTW-nummer"],
  ];
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display text-2xl font-semibold">Mijn gegevens</h2>
        <button onClick={() => setOpen(false)} className="text-sm text-muted-foreground">
          Sluiten
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {fields.map(([k, label]) => (
          <label key={k} className="block text-sm">
            <span className="text-muted-foreground">{label}</span>
            <input
              value={f[k]}
              onChange={(e) => setF({ ...f, [k]: e.target.value })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
        ))}
      </div>
      <button
        onClick={() => onSave(f)}
        disabled={pending}
        className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {pending ? "Bezig…" : "Opslaan"}
      </button>
    </section>
  );
}
