import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Minus,
  Plus,
  Globe,
} from "lucide-react";
import {
  getMyDashboard,
  submitChangeRequest,
  requestExtraChanges,
  markNotificationRead,
  markAllNotificationsRead,
  postCustomerComment,
  getAttachmentUrl,
  cancelMyChange,
} from "@/lib/portal.functions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChatWidget } from "@/components/ChatWidget";

import { supabase } from "@/integrations/supabase/client";
import {
  STATUS_LABEL,
  PRIORITY_LABEL,
  CATEGORY_LABEL,
  CATEGORY_KEYS,
  isCategoryFree,
  priceForChange,
  PAID_CHANGE_PRICE_EUR,
  RUSH_SURCHARGE_EUR,
  PRIORITY_WEIGHT,
  CHANGE_TEMPLATES,
} from "@/lib/status";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => ({ meta: [{ title: "Portaal — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: PortalPage,
});

// ---------- Status mapping for new visual system ----------

type StatusKey = "ingediend" | "in_behandeling" | "in_uitvoering" | "review" | "afgerond" | "afgewezen";

function mapStatus(s: string): StatusKey {
  if (s === "pending") return "ingediend";
  if (s === "in_review" || s === "approved" || s === "waiting_customer") return "in_behandeling";
  if (s === "in_progress") return "in_uitvoering";
  if (s === "review") return "review";
  if (s === "done" || s === "invoiced") return "afgerond";
  return "afgewezen"; // rejected, cancelled
}

const STATUS_STYLE: Record<StatusKey, { bg: string; fg: string; border: string; label: string; dot?: boolean }> = {
  ingediend:       { bg: "#EEF2FF", fg: "#3B5BDB", border: "#BAC8FF", label: "Ingediend" },
  in_behandeling:  { bg: "#FFF3BF", fg: "#856404", border: "#FFD43B", label: "In behandeling" },
  in_uitvoering:   { bg: "#FBF0E8", fg: "#D4622A", border: "#F0A070", label: "In uitvoering" },
  review:          { bg: "#E8F5E9", fg: "#2E7D32", border: "#81C784", label: "Klaar voor review", dot: true },
  afgerond:        { bg: "#F5F5F5", fg: "#6B6560", border: "#D9D4C8", label: "Afgerond" },
  afgewezen:       { bg: "#FAEBEB", fg: "#C0392B", border: "#E57373", label: "Afgewezen" },
};

const STEPS = ["Ingediend", "Beoordeeld", "In uitvoering", "Review", "Afgerond"] as const;
function stepIndex(k: StatusKey): number {
  switch (k) {
    case "ingediend": return 0;
    case "in_behandeling": return 1;
    case "in_uitvoering": return 2;
    case "review": return 3;
    case "afgerond": return 4;
    default: return 0;
  }
}

type FilterKey = "all" | "open" | "in_behandeling" | "afgerond" | "afgewezen";
const FILTER_LABEL: Record<FilterKey, string> = {
  all: "Alle",
  open: "Open",
  in_behandeling: "In behandeling",
  afgerond: "Afgerond",
  afgewezen: "Afgewezen",
};

function matchesFilter(s: string, f: FilterKey): boolean {
  const k = mapStatus(s);
  if (f === "all") return true;
  if (f === "open") return k === "ingediend";
  if (f === "in_behandeling") return k === "in_behandeling" || k === "in_uitvoering" || k === "review";
  if (f === "afgerond") return k === "afgerond";
  if (f === "afgewezen") return k === "afgewezen";
  return true;
}

// ---------- Page ----------

function PortalPage() {
  const fetchDash = useServerFn(getMyDashboard);
  const submit = useServerFn(submitChangeRequest);
  const buy = useServerFn(requestExtraChanges);
  const markRead = useServerFn(markNotificationRead);
  const markAll = useServerFn(markAllNotificationsRead);
  const postComment = useServerFn(postCustomerComment);
  const attUrl = useServerFn(getAttachmentUrl);
  const cancelChange = useServerFn(cancelMyChange);
  const qc = useQueryClient();

  const cancelM = useMutation({
    mutationFn: (i: { id: string; reason?: string }) => cancelChange({ data: i }),
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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Aanvraag ontvangen, wij verwerken dit binnen 1 werkdag.");
    },
    onError: (e: any) => toast.error(e.message ?? "Er ging iets mis."),
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
  const [purchaseConfirm, setPurchaseConfirm] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [openThread, setOpenThread] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState<"overview" | "changes" | "website">("overview");
  const [showNewChange, setShowNewChange] = useState(false);

  // Changes tab filters
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "priority">("newest");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Must be declared before any early return to keep hook order stable.
  const filteredChanges = useMemo(() => {
    const requests = (data?.requests as any[] | undefined) ?? [];
    let list = requests.filter((r) => matchesFilter(r.status, filter));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((r) => {
        const num = r.request_number ? `#chg-${String(r.request_number).padStart(4, "0")}` : "";
        return (r.title ?? "").toLowerCase().includes(q) || num.includes(q);
      });
    }
    list = [...list].sort((a, b) => {
      if (sort === "priority") {
        return (PRIORITY_WEIGHT[b.priority] ?? 0) - (PRIORITY_WEIGHT[a.priority] ?? 0);
      }
      const da = new Date(a.created_at).getTime();
      const db = new Date(b.created_at).getTime();
      return sort === "newest" ? db - da : da - db;
    });
    return list;
  }, [data?.requests, filter, sort, search]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-64 bg-muted rounded" />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="h-40 bg-muted/60 rounded-lg border border-border" />
          <div className="h-40 bg-muted/60 rounded-lg border border-border" />
        </div>
        <div className="h-24 bg-muted/40 rounded-lg border border-border" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6">
        <p className="text-sm text-destructive">Kon portaal niet laden: {(error as Error).message}</p>
        <button onClick={() => qc.invalidateQueries({ queryKey: ["dashboard"] })} className="btn-secondary mt-3">
          Probeer opnieuw
        </button>
      </div>
    );
  }
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
      await submitM.mutateAsync({
        title, description, priority, category, rush, attachments: uploaded,
      });
      setTitle(""); setDescription(""); setPriority("normal");
      setCategory("text"); setRush(false); setFiles([]);
      setShowNewChange(false);
    } finally {
      setUploading(false);
    }
  };

  const openChanges = data.requests.filter(
    (r: any) => r.status !== "done" && r.status !== "rejected" && r.status !== "invoiced",
  ).length;
  const reachedOpenLimit = openChanges >= 10;
  const formIsFree = isCategoryFree(category);
  const formPrice = priceForChange(category, rush);

  const openAttachment = async (file_path: string) => {
    const { url } = await attUrl({ data: { file_path } });
    window.open(url, "_blank");
  };


  return (
    <div className="space-y-10 pb-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold">
            Hoi {data.profile?.full_name || "klant"}
          </h1>
          <p className="text-muted-foreground">{data.profile?.company}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowNotifs((v) => !v)}
            aria-label={`Meldingen openen${unread.length > 0 ? `, ${unread.length} ongelezen` : ""}`}
            aria-expanded={showNotifs}
            className="relative rounded-full border border-border bg-card px-3 py-2 text-sm hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span aria-hidden="true" className="text-xs font-medium tracking-wide">Inbox</span>
            {unread.length > 0 && (
              <span aria-hidden="true" className="absolute -top-1 -right-1 rounded-full bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 min-w-[20px] text-center">
                {unread.length}
              </span>
            )}
          </button>
          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto rounded-lg border border-border bg-card shadow-lg z-50">
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

      {/* Tabs */}
      <div role="tablist" aria-label="Portaal secties" className="flex gap-2 border-b border-border overflow-x-auto">
        {([
          ["overview", "Overzicht"],
          ["changes", "Jouw changes"],
          ["website", "Mijn website"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap focus-visible:ring-2 focus-visible:ring-ring ${
              tab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <OverviewSection
          data={data}
          openChanges={openChanges}
          onGoToChanges={() => setTab("changes")}
          purchaseQty={purchaseQty}
          setPurchaseQty={setPurchaseQty}
          onBuy={() => setPurchaseConfirm(true)}
          buying={buyM.isPending}
        />
      )}

      {tab === "website" && (
        <WebsiteTab data={data} />
      )}

      {tab === "changes" && (
        <section className="space-y-5">
          {/* Filterbar + new change CTA */}
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {(Object.keys(FILTER_LABEL) as FilterKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    filter === k
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card text-foreground border-border hover:border-primary"
                  }`}
                >
                  {FILTER_LABEL[k]}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowNewChange((v) => !v)}
              className="btn-primary"
            >
              + Nieuwe change
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="newest">Nieuwste eerst</option>
                <option value="oldest">Oudste eerst</option>
                <option value="priority">Prioriteit</option>
              </select>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Zoek op titel of #CHG-nummer"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm min-w-[240px]"
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {filteredChanges.length} change{filteredChanges.length === 1 ? "" : "s"} gevonden
            </span>
          </div>

          {/* New change form (collapsible) */}
          {showNewChange && (
            <section className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                <h2 className="font-display text-xl font-semibold">Nieuwe change indienen</h2>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-md ${
                    formIsFree ? "bg-primary/15 text-primary" : "bg-amber-500/15 text-amber-600"
                  }`}
                >
                  {formIsFree
                    ? `Gratis${rush ? ` + €${RUSH_SURCHARGE_EUR} spoed` : ""}`
                    : `€${formPrice}${rush ? " (incl. spoed)" : ""}`}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs text-muted-foreground self-center">Snel starten:</span>
                {CHANGE_TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTitle(t.title); setDescription(t.description); setCategory(t.category);
                    }}
                    className="text-xs rounded-md border border-border bg-background px-3 py-1 hover:border-primary"
                  >
                    {t.label}
                  </button>
                ))}
              </div>

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
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="block text-sm">
                    <span className="text-muted-foreground text-xs">Categorie</span>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {CATEGORY_KEYS.map((k) => (
                        <option key={k} value={k}>
                          {CATEGORY_LABEL[k]} {isCategoryFree(k) ? "· gratis" : `· €${PAID_CHANGE_PRICE_EUR}`}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm">
                    <span className="text-muted-foreground text-xs">Prioriteit</span>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="low">Laag</option>
                      <option value="normal">Normaal</option>
                      <option value="high">Hoog</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </label>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-sm rounded-md border border-input bg-background px-3 py-2 cursor-pointer">
                    <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} />
                    Spoed (binnen 24u, +€{RUSH_SURCHARGE_EUR})
                  </label>
                  <label className="rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer hover:border-primary">
                    Bestanden ({files.length})
                    <input type="file" multiple accept="image/*,.pdf" className="hidden"
                      onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
                  </label>
                  <button
                    type="submit"
                    disabled={submitM.isPending || uploading || reachedOpenLimit || (formIsFree && data.availableCredits <= 0)}
                    className="btn-primary disabled:opacity-50"
                  >
                    {uploading || submitM.isPending ? "Bezig…" : "Indienen"}
                  </button>
                  {reachedOpenLimit && (
                    <span className="text-sm text-destructive">Max. 10 openstaande changes bereikt.</span>
                  )}
                  {formIsFree && data.availableCredits <= 0 && !reachedOpenLimit && (
                    <span className="text-sm text-destructive">
                      Geen gratis changes meer — kies een betaalde categorie of koop bij.
                    </span>
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
          )}

          {/* Changes list */}
          {filteredChanges.length === 0 ? (
            <EmptyChanges onNew={() => setShowNewChange(true)} hasAny={data.requests.length > 0} />
          ) : (
            <div className="space-y-4">
              {filteredChanges.map((r: any, idx: number) => (
                <ChangeCard
                  key={r.id}
                  r={r}
                  idx={idx}
                  profileId={data.profile?.id}
                  websiteUrl={data.profile?.website_url}
                  expanded={!!expanded[r.id]}
                  setExpanded={(v: boolean) => setExpanded({ ...expanded, [r.id]: v })}
                  openThread={openThread === r.id}
                  setOpenThread={(v: boolean) => setOpenThread(v ? r.id : null)}
                  comment={comment}
                  setComment={setComment}
                  onPostComment={() => {
                    if (!comment.trim()) return;
                    commentM.mutate(
                      { request_id: r.id, body: comment },
                      { onSuccess: () => setComment("") },
                    );
                  }}
                  commentPending={commentM.isPending}
                  openAttachment={openAttachment}
                  onCancel={(id: string, reason?: string) => cancelM.mutate({ id, reason })}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <ChatWidget />

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
        @keyframes card-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .change-card { animation: card-in 0.35s cubic-bezier(0.4,0,0.2,1) both; }
        .pulse-dot { animation: pulse-dot 1.8s ease-in-out infinite; }
      `}</style>

      <Dialog open={purchaseConfirm} onOpenChange={(open) => !buyM.isPending && setPurchaseConfirm(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bevestig je aanvraag</DialogTitle>
            <DialogDescription className="pt-2 space-y-3 text-sm">
              <span className="block">
                Je staat op het punt <strong>{purchaseQty} extra change{purchaseQty === 1 ? "" : "s"}</strong> aan te vragen.
              </span>
              <span className="block">
                Kosten: <strong>€{purchaseQty * 20} excl. BTW</strong>
              </span>
              <span className="block">
                Er wordt een factuur verzonden naar:{" "}
                <strong>{data?.profile?.email ?? "je geregistreerde e-mailadres"}</strong>
              </span>
              <span className="block text-xs opacity-70 pt-1">
                Betaling dient te geschieden binnen 14 dagen na ontvangst van de factuur.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPurchaseConfirm(false)}
              disabled={buyM.isPending}
            >
              Annuleer
            </Button>
            <Button
              onClick={() => {
                buyM.mutate(purchaseQty, {
                  onSuccess: () => setPurchaseConfirm(false),
                });
              }}
              disabled={buyM.isPending}
              style={{ background: "#D4622A", color: "#F5F0E8" }}
            >
              {buyM.isPending ? "Bezig…" : "Ja, aanvragen en factuur ontvangen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Components ----------

function Stat({ label, value, accent }: { label: string; value: any; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-5 ${accent ? "border-primary/40 bg-primary/5" : "border-border bg-card"}`}>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
    </div>
  );
}

function EmptyChanges({ onNew, hasAny }: { onNew: () => void; hasAny: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-card p-12 text-center">
      <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-4">Geen items</div>
      <h3 className="font-display text-xl font-semibold mb-2">
        {hasAny ? "Geen changes voor dit filter" : "Nog geen changes ingediend"}
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
        {hasAny
          ? "Probeer een ander filter of zoekterm."
          : "Heb je iets nodig op je site? Dien je eerste aanvraag in."}
      </p>
      {!hasAny && (
        <button onClick={onNew} className="btn-primary">+ Nieuwe change indienen</button>
      )}
    </div>
  );
}

function StatusBadge({ k }: { k: StatusKey }) {
  const s = STATUS_STYLE[k];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold border"
      style={{ background: s.bg, color: s.fg, borderColor: s.border }}
    >
      {s.dot && (
        <span
          className="pulse-dot inline-block w-2 h-2 rounded-full"
          style={{ background: s.fg }}
          aria-hidden
        />
      )}
      {s.label}
    </span>
  );
}

function Stepper({ k }: { k: StatusKey }) {
  if (k === "afgewezen") return null;
  const current = stepIndex(k);
  return (
    <div className="flex items-center gap-1 overflow-x-auto">
      {STEPS.map((label, i) => {
        const done = i < current;
        const isCurrent = i === current;
        return (
          <div key={label} className="flex items-center flex-1 min-w-[80px]">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all ${
                  done || isCurrent
                    ? "text-primary-foreground"
                    : "bg-background text-muted-foreground border border-border"
                }`}
                style={done || isCurrent ? { background: "#D4622A" } : undefined}
              >
                {done ? "OK" : i + 1}
                {isCurrent && (
                  <span
                    className="absolute w-7 h-7 rounded-full pulse-dot pointer-events-none"
                    style={{ boxShadow: "0 0 0 3px rgba(212,98,42,0.25)" }}
                    aria-hidden
                  />
                )}
              </div>
              <span className={`text-[10px] text-center whitespace-nowrap ${isCurrent ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-1 mb-5 ${i < current ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ChangeCard({
  r, idx, profileId, websiteUrl, expanded, setExpanded,
  openThread, setOpenThread, comment, setComment, onPostComment, commentPending,
  openAttachment, onCancel,
}: any) {
  const k = mapStatus(r.status);
  const num = r.request_number ? `#CHG-${String(r.request_number).padStart(4, "0")}` : "";
  const desc: string = r.description ?? "";
  const longDesc = desc.length > 180;
  const shortDesc = longDesc && !expanded ? desc.slice(0, 180) + "…" : desc;

  const priorityColor =
    r.priority === "urgent" ? "text-destructive" :
    r.priority === "high" ? "text-amber-600" :
    "text-muted-foreground";

  const comments = r.change_comments ?? [];
  const lastComment = comments.length > 0
    ? [...comments].sort((a: any, b: any) => b.created_at.localeCompare(a.created_at))[0]
    : null;

  // Extract URL out of description prefix "🌐 Website: ..."
  const urlMatch = desc.match(/🌐 Website: (\S+)/);
  const linkUrl = urlMatch?.[1] ?? websiteUrl;

  return (
    <article
      className="change-card rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary"
      style={{ animationDelay: `${Math.min(idx * 60, 600)}ms` }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[12px] text-muted-foreground">{num}</span>
          {r.category && (
            <span className="text-[11px] px-2 py-0.5 rounded-md border border-border bg-background text-muted-foreground">
              {CATEGORY_LABEL[r.category] ?? r.category}
            </span>
          )}
          {r.rush && (
            <span className="text-[11px] px-2 py-0.5 rounded-md border border-destructive/30 bg-destructive/10 text-destructive">
              Spoed
            </span>
          )}
        </div>
        <StatusBadge k={k} />
      </div>

      {/* Title + description */}
      <div className="mt-3">
        <h3 className="text-[17px] font-semibold text-foreground leading-snug">{r.title}</h3>
        {desc && (
          <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
            {shortDesc}
            {longDesc && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="ml-1 text-primary hover:underline"
              >
                {expanded ? "Minder tonen" : "Meer tonen"}
              </button>
            )}
          </p>
        )}
        {linkUrl && (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline break-all"
          >
            {linkUrl}
            <span aria-hidden>↗</span>
          </a>
        )}
      </div>

      {/* Stepper */}
      <div className="mt-5 relative">
        <Stepper k={k} />
      </div>

      {/* Metadata row */}
      <div className="mt-5 grid grid-cols-2 sm:flex sm:flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span>Aangemaakt: {new Date(r.created_at).toLocaleDateString("nl-NL")}</span>
        <span className={priorityColor}>Prioriteit: {PRIORITY_LABEL[r.priority] ?? r.priority}</span>
        <span>Deadline: {r.due_date ? new Date(r.due_date).toLocaleDateString("nl-NL") : "Nog niet gepland"}</span>
        <span>Uren: {r.estimated_hours ? `${r.estimated_hours} uur` : "Wordt beoordeeld"}</span>
        <span>Kosten: {r.is_paid ? `€${PAID_CHANGE_PRICE_EUR}` : "Gratis"}</span>
      </div>

      {/* Attachments */}
      {r.change_attachments?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {r.change_attachments.map((a: any) => (
            <button
              key={a.id}
              onClick={() => openAttachment(a.file_path)}
              className="text-xs rounded-md border border-border bg-background px-2 py-1 hover:border-primary"
            >
              {a.file_name}
            </button>
          ))}
        </div>
      )}

      {/* Bottom bar */}
      <div className="mt-5 border-t border-border pt-3 flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={() => setOpenThread(!openThread)}
          className="inline-flex items-center gap-2 text-sm rounded-md border border-border bg-background px-3 py-1.5 hover:border-primary"
        >
          {comments.length} bericht{comments.length === 1 ? "" : "en"}
        </button>

        <div className="flex items-center gap-3">
          {(k === "ingediend" || k === "in_behandeling") && (
            <button
              onClick={() => {
                const reason = window.prompt("Reden voor annulering? (optioneel)") ?? undefined;
                if (window.confirm("Weet je zeker dat je deze change wilt annuleren?")) {
                  onCancel(r.id, reason);
                }
              }}
              className="text-sm text-destructive hover:underline"
            >
              Annuleer
            </button>
          )}
          {k === "review" && (
            <>
              <button
                className="text-sm rounded-md px-4 py-1.5 font-medium"
                style={{ background: "#2E7D32", color: "#fff" }}
                onClick={() => alert("Neem contact op met AIMI om goed te keuren.")}
              >
                Goedkeuren
              </button>
              <button
                onClick={() => setOpenThread(true)}
                className="text-sm text-muted-foreground hover:underline"
              >
                Revisie vragen
              </button>
            </>
          )}
          {k === "afgerond" && (
            <span className="text-sm text-muted-foreground">⭐ Beoordeel deze change</span>
          )}
        </div>
      </div>

      {/* Last comment preview */}
      {lastComment && !openThread && (
        <div className="mt-3 border-l-2 border-border pl-3 text-[13px] italic text-muted-foreground">
          {lastComment.author_id === profileId ? "Jij" : "AIMI"}:{" "}
          {(lastComment.body ?? "").slice(0, 80)}
          {(lastComment.body ?? "").length > 80 ? "…" : ""}
        </div>
      )}

      {/* Thread */}
      {openThread && (
        <div className="mt-4 space-y-2 border-t border-border pt-4">
          {[...comments]
            .sort((a: any, b: any) => a.created_at.localeCompare(b.created_at))
            .map((c: any) => {
              const mine = c.author_id === profileId;
              return (
                <div
                  key={c.id}
                  className={`rounded-md p-2 text-sm ${mine ? "bg-background border border-border" : "bg-primary/10"}`}
                >
                  <p className="text-xs text-muted-foreground">
                    {mine ? "Jij" : "AIMI"} · {new Date(c.created_at).toLocaleString("nl-NL")}
                  </p>
                  <p className="whitespace-pre-wrap">{c.body}</p>
                </div>
              );
            })}
          <form
            onSubmit={(e) => { e.preventDefault(); onPostComment(); }}
            className="flex gap-2"
          >
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Bericht…"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <button type="submit" disabled={commentPending} className="btn-primary">
              Verstuur
            </button>
          </form>
        </div>
      )}

      {r.admin_notes && (
        <p className="mt-3 rounded-md bg-muted/50 p-2 text-xs">
          <strong>AIMI:</strong> {r.admin_notes}
        </p>
      )}
    </article>
  );
}

// ---------- Website tab ----------

function WebsiteTab({ data }: { data: any }) {
  const uptime = data.uptimePct as number | null;
  const totalPings = data.totalPings ?? 0;
  const errorCount = data.siteErrors?.length ?? 0;
  const uptimeColor = uptime == null ? "text-muted-foreground" : uptime >= 99 ? "text-emerald-600" : uptime >= 95 ? "text-amber-600" : "text-destructive";
  const lastErr = data.siteErrors?.[0];
  const lastCheck = lastErr ? new Date(lastErr.created_at) : null;

  const minsAgo = (d: Date) => {
    const m = Math.floor((Date.now() - d.getTime()) / 60000);
    if (m < 1) return "zojuist";
    if (m < 60) return `${m} minuten geleden`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} uur geleden`;
    return `${Math.floor(h / 24)} dagen geleden`;
  };

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="font-display text-2xl font-semibold mb-2 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" /> Mijn website
        </h2>
        {data.profile?.website_url ? (
          <a href={data.profile.website_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline break-all">
            {data.profile.website_url}<span aria-hidden>↗</span>
          </a>
        ) : (
          <p className="text-sm text-muted-foreground">Nog geen website gekoppeld. Voeg de URL toe via <em>Mijn gegevens</em>.</p>
        )}
      </section>

      <section className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-display text-xl font-semibold mb-4">Statistieken (laatste 30 dagen)</h3>
        {totalPings === 0 ? (
          <div className="rounded-md border border-dashed border-border bg-background p-6 text-center">
            <p className="text-sm text-muted-foreground">
              We zijn bezig je site te koppelen. Dit kan tot 24 uur duren.
            </p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-md border border-border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Uptime</p>
                <p className={`mt-2 font-display text-3xl font-semibold ${uptimeColor}`}>
                  {uptime?.toFixed(2)}%
                </p>
              </div>
              <div className="rounded-md border border-border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Pings ontvangen</p>
                <p className="mt-2 font-display text-3xl font-semibold">{totalPings}</p>
              </div>
              <div className="rounded-md border border-border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Fouten</p>
                <p className={`mt-2 font-display text-3xl font-semibold ${errorCount > 0 ? "text-destructive" : ""}`}>
                  {errorCount}
                </p>
              </div>
            </div>
            {lastCheck && (
              <p className="mt-4 text-xs text-muted-foreground">
                Laatste check: {minsAgo(lastCheck)}
              </p>
            )}
          </>
        )}
      </section>

      {data.siteErrors && data.siteErrors.length > 0 && (
        <section className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-display text-xl font-semibold mb-3">Laatste fouten</h3>
          <ul className="space-y-2 text-sm">
            {data.siteErrors.map((e: any) => (
              <li key={e.id} className="rounded-md border border-border p-3">
                <p className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleString("nl-NL")}</p>
                <p className="mt-1">{e.message}</p>
                {e.resolved && <span className="text-primary text-xs">(opgelost)</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

// ---------- Overview section ----------

function OverviewSection({
  data, openChanges, onGoToChanges, purchaseQty, setPurchaseQty, onBuy, buying,
}: {
  data: any;
  openChanges: number;
  onGoToChanges: () => void;
  purchaseQty: number;
  setPurchaseQty: (n: number) => void;
  onBuy: () => void;
  buying: boolean;
}) {
  const totalQuota = (data.profile?.free_quota_override ?? 3) + (data.extraTotal ?? 0);
  const used = data.usedThisMonth ?? 0;
  const pct = totalQuota > 0 ? Math.min(100, (used / totalQuota) * 100) : 100;
  const exhausted = used >= totalQuota;
  const recent = (data.requests as any[]).slice(0, 3);
  const siteOk = (data.totalPings ?? 0) === 0 || ((data.uptimePct ?? 100) >= 95);

  return (
    <div className="space-y-8">
      {/* Afspraken */}
      {data.appointments && data.appointments.length > 0 && (
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-2xl font-semibold mb-4">Afspraken</h2>
          <ul className="space-y-2">
            {data.appointments.map((a: any) => (
              <li key={a.id} className="rounded-md border border-border p-3 text-sm">
                <p className="font-semibold">{a.title}</p>
                <p className="text-muted-foreground">{new Date(a.scheduled_at).toLocaleString("nl-NL")}</p>
                {a.location && <p className="text-xs text-muted-foreground mt-1">{a.location}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Budget + open + website grid */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Budget card spanning 2 */}
        <section className="lg:col-span-2 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg font-semibold">Changes deze maand</h3>
            <span className={`text-sm font-medium ${exhausted ? "text-destructive" : "text-foreground"}`}>
              {used} van {totalQuota} gebruikt
            </span>
          </div>
          <div className="h-3 w-full rounded-full overflow-hidden" style={{ background: "#E8E3D8" }}>
            <div
              className="h-full transition-all"
              style={{ width: `${pct}%`, background: exhausted ? "#C0392B" : "#D4622A" }}
            />
          </div>
          <p className={`mt-3 text-sm ${exhausted ? "text-destructive" : "text-muted-foreground"}`}>
            {exhausted ? "Je gratis changes zijn op." : `Nog ${data.availableCredits} gratis change${data.availableCredits === 1 ? "" : "s"} over.`}
          </p>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Open changes</p>
            <p className="font-display text-4xl font-semibold mt-1">{openChanges}</p>
            <button
              onClick={onGoToChanges}
              className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Bekijk je changes <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* Website status */}
        <section className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold mb-3">Website</h3>
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${siteOk ? "bg-emerald-500" : "bg-destructive"}`} />
            <span className="text-sm font-medium">
              {siteOk ? "Je site is online" : "Controleer je site"}
            </span>
          </div>
          {data.profile?.website_url ? (
            <a href={data.profile.website_url} target="_blank" rel="noopener noreferrer" className="mt-3 block text-xs text-primary hover:underline break-all">
              {data.profile.website_url}
            </a>
          ) : (
            <p className="mt-3 text-xs text-muted-foreground">Nog geen website gekoppeld.</p>
          )}
        </section>
      </div>

      {/* Recente activiteit */}
      {recent.length > 0 && (
        <section className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Recente activiteit</h3>
          <ul className="divide-y divide-border">
            {recent.map((r: any) => {
              const k = mapStatus(r.status);
              const s = STATUS_STYLE[k];
              return (
                <li key={r.id} className="flex items-center justify-between py-3 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.fg }} />
                    <span className="text-sm truncate">{r.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {new Date(r.created_at).toLocaleDateString("nl-NL")}
                  </span>
                </li>
              );
            })}
          </ul>
          <button onClick={onGoToChanges} className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline">
            Bekijk alle changes <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>
      )}

      {/* Onboarding */}
      {data.onboarding.length > 0 && (
        <section className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold mb-3">Onboarding</h3>
          <ul className="space-y-2">
            {data.onboarding.map((o: any) => (
              <li key={o.id} className="flex items-center gap-2 text-sm">
                {o.done ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Circle className="w-4 h-4 text-muted-foreground" />}
                <span className={o.done ? "line-through text-muted-foreground" : ""}>{o.label}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Extra changes banner */}
      <section className="rounded-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5" style={{ background: "#1C1917", color: "#F5F0E8" }}>
        <div>
          <h3 className="font-display text-xl font-semibold">Meer changes nodig?</h3>
          <p className="text-sm opacity-80 mt-1">€20 per extra change, direct verwerkt door ons team.</p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPurchaseQty(Math.max(1, purchaseQty - 1))}
              className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center hover:bg-white/10"
              aria-label="Minder"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{purchaseQty}</span>
            <button
              type="button"
              onClick={() => setPurchaseQty(Math.min(50, purchaseQty + 1))}
              className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center hover:bg-white/10"
              aria-label="Meer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onBuy}
              disabled={buying}
              className="ml-2 rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
              style={{ background: "#D4622A", color: "#F5F0E8" }}
            >
              {buying ? "Bezig…" : "Aanvragen"}
            </button>
          </div>
          <p className="text-xs opacity-70">Totaal: €{purchaseQty * 20}</p>
        </div>
      </section>
    </div>
  );
}

