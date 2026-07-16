import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Globe,
  Check,
  Star,
  ExternalLink,
} from "lucide-react";
import {
  getMyDashboard,
  submitChangeRequest,
  markNotificationRead,
  markAllNotificationsRead,
  postCustomerComment,
  getAttachmentUrl,
  cancelMyChange,
  portalListMyProjects,
  portalListMyProjectsForChangeForm,
  portalGetOnboardingState,
  portalGetTutorialState,
} from "@/lib/portal.functions";
import { PROJECT_STATUS_LABEL, PROJECT_STATUS_COLOR, isProjectOverdue } from "@/lib/project-status";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatWidget } from "@/components/ChatWidget";
import { PortalOnboardingTour } from "@/components/PortalOnboardingTour";
import { PortalTutorial } from "@/components/PortalTutorial";

import { supabase } from "@/integrations/supabase/client";

const ALLOWED_ATTACHMENT_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "application/pdf",
]);
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
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
  ingediend:       { bg: "#f9fafb", fg: "#2f2b4a", border: "#e5e7eb", label: "Ingediend" },
  in_behandeling:  { bg: "#f9fafb", fg: "#4b5563", border: "#e5e7eb", label: "In behandeling" },
  in_uitvoering:   { bg: "#eeedff", fg: "#7270ff", border: "#d6d5ff", label: "In uitvoering" },
  review:          { bg: "#eeedff", fg: "#7270ff", border: "#d6d5ff", label: "Klaar voor review", dot: true },
  afgerond:        { bg: "#f9fafb", fg: "#9ca3af", border: "#e5e7eb", label: "Afgerond" },
  afgewezen:       { bg: "#fdecec", fg: "#c0392b", border: "#f5c2c2", label: "Afgewezen" },
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
  // Kind-routes (bv. /portal/projecten) delen deze route als parent
  // (TanStack Router file-based routing) en moeten via Outlet gerenderd worden
  // in plaats van het dashboard hieronder. Deze check staat ná alle hooks
  // (verderop) om de Rules of Hooks niet te schenden.
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const fetchDash = useServerFn(getMyDashboard);
  const listProjectsForChangeForm = useServerFn(portalListMyProjectsForChangeForm);
  const fetchOnboardingState = useServerFn(portalGetOnboardingState);
  const fetchTutorialState = useServerFn(portalGetTutorialState);
  const submit = useServerFn(submitChangeRequest);
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
  const projectsForChangeFormQ = useQuery({
    queryKey: ["portal-my-projects-change-form"],
    queryFn: () => listProjectsForChangeForm({}),
  });
  const changeFormProjects = (projectsForChangeFormQ.data?.items ?? []) as any[];
  const onboardingStateQ = useQuery({
    queryKey: ["portal-onboarding-state"],
    queryFn: () => fetchOnboardingState({}),
  });
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);
  const tutorialStateQ = useQuery({
    queryKey: ["portal-tutorial-state"],
    queryFn: () => fetchTutorialState({}),
  });
  const [tutorialDismissed, setTutorialDismissed] = useState(false);

  const submitM = useMutation({
    mutationFn: (input: any) => submit({ data: input }),
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
  const [changeProjectId, setChangeProjectId] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [openThread, setOpenThread] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState<"overview" | "changes" | "website">("overview");
  const [showNewChange, setShowNewChange] = useState(false);
  const [seenThreads, setSeenThreads] = useState<Record<string, number>>(() => {
    try { return JSON.parse(localStorage.getItem("aimi_seen_threads") ?? "{}"); } catch { return {}; }
  });

  const markThreadSeen = (id: string) => {
    const updated = { ...seenThreads, [id]: Date.now() };
    setSeenThreads(updated);
    localStorage.setItem("aimi_seen_threads", JSON.stringify(updated));
  };

  const hasUnread = (r: any, profileId: string) => {
    const comments = r.change_comments ?? [];
    const adminComments = comments.filter((c: any) => c.author_id !== profileId);
    if (adminComments.length === 0) return false;
    const lastAdmin = Math.max(...adminComments.map((c: any) => new Date(c.created_at).getTime()));
    const lastSeen = seenThreads[r.id] ?? 0;
    return lastAdmin > lastSeen;
  };

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

  if (pathname !== "/portal") return <Outlet />;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid sm:grid-cols-2 gap-4">
          <Skeleton className="h-40 rounded-lg" />
          <Skeleton className="h-40 rounded-lg" />
        </div>
        <Skeleton className="h-24 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>
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
          if (!ALLOWED_ATTACHMENT_MIME.has(f.type)) {
            toast.error(`Bestandstype niet toegestaan: ${f.name}`);
            setUploading(false);
            return;
          }
          if (f.size > MAX_ATTACHMENT_BYTES) {
            toast.error(`Bestand te groot (max 10MB): ${f.name}`);
            setUploading(false);
            return;
          }
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
      const project_id =
        changeFormProjects.length === 1 ? changeFormProjects[0].id : changeProjectId || undefined;
      await submitM.mutateAsync({
        title, description, priority, category, rush, attachments: uploaded, project_id,
      });
      setTitle(""); setDescription(""); setPriority("normal");
      setCategory("text"); setRush(false); setFiles([]); setChangeProjectId("");
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
      <div role="tablist" aria-label="Portaal secties" className="flex gap-2 border-b border-border overflow-x-auto no-scrollbar">
        {([
          ["overview", "Overzicht"],
          ["changes", "Jouw changes"],
          ["website", "Mijn projecten"],
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
        />
      )}

      {tab === "website" && (
        <WebsiteTab data={data} />
      )}

      {tab === "changes" && (
        <section className="space-y-6">

          {/* Header row */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold">Jouw changes</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {data.requests.length === 0
                  ? "Nog geen aanvragen ingediend."
                  : `${data.requests.length} aanvra${data.requests.length === 1 ? "ag" : "gen"} totaal`}
              </p>
            </div>
            <button
              onClick={() => setShowNewChange(true)}
              className="btn-primary shrink-0"
            >
              + Nieuwe change
            </button>
          </div>

          {/* Inline nieuwe change form */}
          {showNewChange && (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div>
                  <h3 className="font-semibold text-foreground">Nieuwe change indienen</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Beschrijf wat je wil aanpassen. Hoe duidelijker, hoe sneller wij het oppakken.</p>
                </div>
                <button
                  onClick={() => setShowNewChange(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none"
                >
                  ×
                </button>
              </div>

              {/* Templates */}
              <div className="px-6 py-4 border-b border-border bg-muted/20">
                <p className="text-xs text-muted-foreground mb-2 font-medium">Snel starten met een template</p>
                <div className="flex flex-wrap gap-2">
                  {CHANGE_TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => { setTitle(t.title); setDescription(t.description); setCategory(t.category); }}
                      className="text-xs rounded-full border border-border bg-background px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <form className="px-6 py-5 space-y-5" onSubmit={handleSubmit}>
                {/* Titel */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Wat moet er aangepast worden? *</label>
                  <input
                    required
                    placeholder="Bijv. Tekst aanpassen op de homepage"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
                  />
                </div>

                {/* Omschrijving */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Meer details *</label>
                  <textarea
                    required
                    placeholder="Geef aan wat er precies veranderd moet worden, waar op de pagina, en wat het gewenste resultaat is."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
                  />
                </div>

                {/* Project */}
                {changeFormProjects.length === 1 && (
                  <p className="text-xs text-muted-foreground">
                    Dit verzoek wordt gekoppeld aan project: <span className="font-medium text-foreground">{changeFormProjects[0].name}</span>
                  </p>
                )}
                {changeFormProjects.length > 1 && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Project</label>
                    <select
                      value={changeProjectId}
                      onChange={(e) => setChangeProjectId(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
                    >
                      <option value="">Geen specifiek project</option>
                      {changeFormProjects.map((p: any) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Categorie + Prioriteit */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Categorie</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
                    >
                      {CATEGORY_KEYS.map((k) => (
                        <option key={k} value={k}>
                          {CATEGORY_LABEL[k]} {isCategoryFree(k) ? "· gratis" : `· €${PAID_CHANGE_PRICE_EUR}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Prioriteit</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
                    >
                      <option value="low">Laag</option>
                      <option value="normal">Normaal</option>
                      <option value="high">Hoog</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                {/* Extra opties */}
                <div className="flex flex-wrap gap-4 items-center">
                  <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} className="rounded" />
                    <span>Spoed — binnen 24u <span className="text-muted-foreground">(+€{RUSH_SURCHARGE_EUR})</span></span>
                  </label>
                  <label className="text-sm cursor-pointer">
                    <span className="rounded-lg border border-input bg-background px-4 py-2 text-sm hover:border-primary transition-colors inline-block">
                      {files.length === 0 ? "Bestand bijvoegen" : `${files.length} bestand${files.length === 1 ? "" : "en"}`}
                    </span>
                    <input type="file" multiple accept="image/*,.pdf" className="hidden" onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
                  </label>
                </div>

                {files.length > 0 && (
                  <p className="text-xs text-muted-foreground">{files.map((f) => f.name).join(", ")}</p>
                )}

                {/* Kosten + submit */}
                <div className="flex items-center justify-between pt-2 border-t border-border flex-wrap gap-3">
                  <div className="text-sm">
                    <span className={formIsFree ? "text-primary font-medium" : "text-amber-600 font-medium"}>
                      {formIsFree ? `Gratis${rush ? ` + €${RUSH_SURCHARGE_EUR} spoed` : ""}` : `€${formPrice}${rush ? " incl. spoed" : ""}`}
                    </span>
                    {formIsFree && <span className="text-muted-foreground ml-2 text-xs">({data.availableCredits} gratis over)</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    {reachedOpenLimit && <span className="text-xs text-destructive">Max. 10 open changes bereikt.</span>}
                    {formIsFree && data.availableCredits <= 0 && !reachedOpenLimit && (
                      <span className="text-xs text-destructive">Geen gratis changes meer.</span>
                    )}
                    {submitM.error && <span className="text-xs text-destructive">{(submitM.error as Error).message}</span>}
                    <button
                      type="submit"
                      disabled={submitM.isPending || uploading || reachedOpenLimit || (formIsFree && data.availableCredits <= 0)}
                      className="btn-primary disabled:opacity-50"
                    >
                      {uploading || submitM.isPending ? "Bezig…" : "Indienen"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Filter + zoek */}
          <div className="rounded-lg border border-border bg-card p-4 flex flex-wrap items-center gap-3 justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {(Object.keys(FILTER_LABEL) as FilterKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    filter === k
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {FILTER_LABEL[k]}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Zoek op titel…"
                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm min-w-[180px]"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
              >
                <option value="newest">Nieuwste eerst</option>
                <option value="oldest">Oudste eerst</option>
                <option value="priority">Prioriteit</option>
              </select>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {filteredChanges.length} resultaat{filteredChanges.length === 1 ? "" : "en"}
              </span>
            </div>
          </div>

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
                  unread={hasUnread(r, data.profile?.id ?? "")}
                  setOpenThread={(v: boolean) => {
                    setOpenThread(v ? r.id : null);
                    if (v) markThreadSeen(r.id);
                  }}
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

      {(() => {
        const showOnboardingTour =
          !!onboardingStateQ.data?.profile &&
          (onboardingStateQ.data.profile as any).onboarding_self_enabled &&
          (onboardingStateQ.data.profile as any).onboarding_status !== "completed" &&
          !onboardingDismissed;

        if (showOnboardingTour) {
          return (
            <PortalOnboardingTour
              profile={onboardingStateQ.data!.profile as any}
              onClose={() => setOnboardingDismissed(true)}
            />
          );
        }

        const showTutorial =
          !!tutorialStateQ.data?.profile &&
          (tutorialStateQ.data.profile as any).tutorial_enabled === true &&
          !(tutorialStateQ.data.profile as any).tutorial_completed_at &&
          !tutorialDismissed;

        if (showTutorial) {
          return <PortalTutorial onClose={() => setTutorialDismissed(true)} />;
        }

        return null;
      })()}

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
    <div className="flex items-start gap-1 overflow-x-auto pb-1">
      {STEPS.map((label, i) => {
        const done = i < current;
        const isCurrent = i === current;
        const isFuture = i > current;
        return (
          <div key={label} className="flex items-start flex-1 min-w-[88px]">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all ${
                    done
                      ? "bg-primary text-primary-foreground border border-primary"
                      : isCurrent
                        ? "bg-primary text-primary-foreground border border-primary"
                        : "bg-background text-muted-foreground border border-border"
                  }`}
                >
                  {done ? <Check className="w-4 h-4" strokeWidth={2.5} /> : i + 1}
                </div>
                {isCurrent && (
                  <span
                    className="absolute inset-0 rounded-full pulse-dot pointer-events-none"
                    style={{ boxShadow: "0 0 0 4px rgba(114,112,255,0.22)" }}
                    aria-hidden
                  />
                )}
              </div>
              <span
                className={`text-[11px] text-center whitespace-nowrap leading-tight ${
                  isCurrent
                    ? "text-foreground font-semibold"
                    : done
                      ? "text-foreground"
                      : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 mt-4 rounded-full transition-colors ${
                  i < current ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ChangeCard({
  r, idx, profileId, websiteUrl, expanded, setExpanded,
  openThread, setOpenThread, unread, comment, setComment, onPostComment, commentPending,
  openAttachment, onCancel,
}: any) {
  const k = mapStatus(r.status);
  const num = r.request_number ? `#CHG-${String(r.request_number).padStart(4, "0")}` : "";
  const desc: string = r.description ?? "";
  const longDesc = desc.length > 180;
  const shortDesc = longDesc && !expanded ? desc.slice(0, 180) + "…" : desc;

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelConfirmed, setCancelConfirmed] = useState(false);

  const priorityColor =
    r.priority === "urgent" ? "text-destructive" :
    r.priority === "high" ? "text-amber-600" :
    "text-muted-foreground";

  const comments = r.change_comments ?? [];
  const lastComment = comments.length > 0
    ? [...comments].sort((a: any, b: any) => b.created_at.localeCompare(a.created_at))[0]
    : null;

  // Extract URL out of description prefix (legacy "🌐 Website: ..." or "Website: ...")
  const urlMatch = desc.match(/(?:🌐\s*)?Website:\s*(\S+)/);
  const linkUrl = urlMatch?.[1] ?? websiteUrl;
  const cleanDesc = desc.replace(/^(?:🌐\s*)?Website:\s*\S+\s*\n?/, "");
  const displayDesc = longDesc && !expanded ? cleanDesc.slice(0, 180) + "…" : cleanDesc;

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
        {cleanDesc && (
          <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
            {displayDesc}
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
            className="inline-flex items-center gap-1.5 mt-2 text-sm text-primary hover:underline break-all"
          >
            <Globe className="w-3.5 h-3.5 shrink-0" />
            {linkUrl}
            <ExternalLink className="w-3 h-3 shrink-0" aria-hidden />
          </a>
        )}
      </div>

      {/* Voortgang */}
      <div className="mt-5 rounded-md border border-border bg-muted/40 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Voortgang</span>
          <span className="text-xs text-foreground font-medium">
            {k === "afgewezen" ? "Geannuleerd" : `Stap ${stepIndex(k) + 1} van ${STEPS.length} · ${STEPS[stepIndex(k)]}`}
          </span>
        </div>
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
          className="inline-flex items-center gap-2 text-sm rounded-md border px-3 py-1.5 transition-colors relative"
          style={{
            borderColor: unread ? "#fe2c02" : undefined,
            background: unread ? "rgba(254,44,2,0.08)" : undefined,
          }}
        >
          {unread && (
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: "#fe2c02" }}
              title="Nieuw bericht"
            />
          )}
          {comments.length} bericht{comments.length === 1 ? "" : "en"}
          {unread && <span style={{ color: "#fe2c02" }}>!</span>}
        </button>

        <div className="flex items-center gap-3">
          {(k === "ingediend" || k === "in_behandeling") && (
            <button
              onClick={() => { setShowCancelDialog(true); setCancelReason(""); setCancelConfirmed(false); }}
              className="text-sm text-destructive hover:underline"
            >
              Annuleer
            </button>
          )}
          {k === "review" && (
            <>
              <button
                className="btn-primary text-sm !py-1.5 !px-4"
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
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Star className="w-4 h-4" /> Beoordeel deze change
            </span>
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

      {/* Annuleer dialog */}
      {showCancelDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowCancelDialog(false); }}
        >
          <div
            className="w-full max-w-md rounded-xl border border-border p-6 space-y-5 shadow-2xl"
            style={{ background: "#25262b" }}
          >
            <div>
              <h3 className="font-semibold text-lg text-foreground">Change annuleren</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Je staat op het punt <strong className="text-foreground">{r.title}</strong> te annuleren.
                Dit kan niet ongedaan worden gemaakt.
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Reden (optioneel)</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Vertel ons waarom je annuleert…"
                rows={3}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:border-primary"
              />
            </div>
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={cancelConfirmed}
                onChange={(e) => setCancelConfirmed(e.target.checked)}
                className="mt-0.5 accent-destructive w-4 h-4 shrink-0"
              />
              <span className="text-sm text-foreground">
                Ik begrijp dat deze change geannuleerd wordt en dit niet ongedaan gemaakt kan worden.
              </span>
            </label>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="px-4 py-2 rounded-md border border-border text-sm text-foreground hover:bg-muted transition-colors"
              >
                Terug
              </button>
              <button
                disabled={!cancelConfirmed}
                onClick={() => {
                  onCancel(r.id, cancelReason.trim() || undefined);
                  setShowCancelDialog(false);
                }}
                className="px-4 py-2 rounded-md text-sm font-medium text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: cancelConfirmed ? "#e05252" : undefined }}
              >
                Ja, annuleer deze change
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

// ---------- Website tab ----------

function UptimeChart({ dailyUptime }: { dailyUptime: any[] }) {
  return (
    <div>
      <div className="flex items-end gap-2 h-20">
        {dailyUptime.map((d: any) => {
          const pct = d.uptime;
          const color = pct == null ? "bg-muted" : pct >= 99 ? "bg-emerald-500" : pct >= 95 ? "bg-amber-500" : "bg-destructive";
          const height = pct == null ? 20 : Math.max(8, pct);
          return (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground">{pct != null ? `${pct}%` : "—"}</span>
              <div className={`w-full rounded-t ${color} transition-all`} style={{ height: `${height}%` }} title={d.total > 0 ? `${d.ok}/${d.total} OK` : "Geen data"} />
              <span className="text-[10px] text-muted-foreground capitalize">{d.label}</span>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-2 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" />≥99%</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-500 inline-block" />95–99%</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-destructive inline-block" />&lt;95%</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-muted inline-block" />Geen data</span>
      </div>
    </div>
  );
}

function WebsiteTab({ data }: { data: any }) {
  const list = useServerFn(portalListMyProjects);
  const { data: projectsData, isLoading } = useQuery({ queryKey: ["portal-my-projects"], queryFn: () => list({}) });
  const items = projectsData?.items ?? [];

  if (isLoading) return <Skeleton className="h-24 w-full rounded-lg" />;

  // Klanten zonder gekoppeld project (nog niet gemigreerd naar het projectensysteem)
  // vallen terug op de oude accountgebonden monitoring-weergave.
  if (items.length === 0) {
    return <LegacyWebsiteMonitoring data={data} />;
  }

  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-display text-2xl font-semibold mb-1">Mijn projecten</h2>
      <p className="text-sm text-muted-foreground mb-4">Klik op een project voor alle informatie: monitoring, notities en gekoppelde changes.</p>
      <ul className="space-y-2">
        {items.map((p: any) => {
          const overdue = isProjectOverdue(p.deadline, p.status);
          return (
            <li key={p.id}>
              <Link
                to="/portal/projecten/$projectId"
                params={{ projectId: p.id }}
                className="flex items-center justify-between rounded-md border border-border p-3 text-sm hover:border-primary transition-colors"
              >
                <span className="font-medium">{p.name}</span>
                <span className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PROJECT_STATUS_COLOR[p.status] ?? "bg-muted"}`}>
                    {PROJECT_STATUS_LABEL[p.status] ?? p.status}
                  </span>
                  {p.deadline && (
                    <span className={`text-xs ${overdue ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                      {new Date(p.deadline).toLocaleDateString("nl-NL")}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function LegacyWebsiteMonitoring({ data }: { data: any }) {
  const uptime = data.uptimePct as number | null;
  const avgMs: number | null = data.avg ?? null;
  const dailyUptime: any[] = data.dailyUptime ?? [];
  const lastSync: string | null = data.lastSync ?? null;
  const errorCount = data.siteErrors?.length ?? 0;
  const hasData = (data.total24h ?? 0) > 0 || dailyUptime.some((d: any) => d.total > 0);

  const uptimeColor = uptime == null ? "text-muted-foreground" : uptime >= 99 ? "text-emerald-500" : uptime >= 95 ? "text-amber-500" : "text-destructive";

  const timeAgo = (iso: string) => {
    const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (m < 1) return "zojuist";
    if (m < 60) return `${m} min geleden`;
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
        <h3 className="font-display text-xl font-semibold mb-4">Website monitoring</h3>
        {!hasData ? (
          <div className="rounded-md border border-dashed border-border bg-background p-6 text-center">
            <p className="text-sm text-muted-foreground">
              We zijn bezig je site te koppelen. Dit kan tot 24 uur duren.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-md border border-border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Uptime (24u)</p>
                <p className={`mt-2 font-display text-3xl font-semibold ${uptimeColor}`}>
                  {uptime != null ? `${uptime.toFixed(1)}%` : "—"}
                </p>
              </div>
              <div className="rounded-md border border-border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Gem. responstijd (24u)</p>
                <p className={`mt-2 font-display text-3xl font-semibold ${avgMs && avgMs > 3000 ? "text-amber-500" : ""}`}>
                  {avgMs != null ? `${avgMs}ms` : "—"}
                </p>
              </div>
            </div>

            {dailyUptime.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Uptime afgelopen 7 dagen</p>
                <UptimeChart dailyUptime={dailyUptime} />
              </div>
            )}

            {lastSync && (
              <p className="text-xs text-muted-foreground">
                Laatste meting: {timeAgo(lastSync)}
              </p>
            )}
          </div>
        )}
      </section>

      {errorCount > 0 && (
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
  data, openChanges, onGoToChanges,
}: {
  data: any;
  openChanges: number;
  onGoToChanges: () => void;
}) {
  const listProjects = useServerFn(portalListMyProjects);
  const { data: projectsData } = useQuery({ queryKey: ["portal-my-projects"], queryFn: () => listProjects({}) });
  const myProjects = (projectsData?.items ?? []) as any[];
  // websites zitten sinds het projectensysteem op het project, niet meer per se op profiles.website_url
  const websiteUrl: string | null = data.profile?.website_url || myProjects.find((p: any) => p.website_url)?.website_url || null;

  const totalQuota = (data.profile?.free_quota_override ?? 3) + (data.extraTotal ?? 0);
  const used = data.usedThisMonth ?? 0;
  const pct = totalQuota > 0 ? Math.min(100, (used / totalQuota) * 100) : 100;
  const exhausted = used >= totalQuota;
  const recent = (data.requests as any[]).slice(0, 3);
  const siteOk = !data.total24h || ((data.uptimePct ?? 100) >= 95);

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
          <div className="h-3 w-full rounded-full overflow-hidden bg-muted">
            <div
              className="h-full transition-all"
              style={{ width: `${pct}%`, background: exhausted ? "var(--destructive)" : "var(--primary)" }}
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
          {websiteUrl ? (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="mt-3 block text-xs text-primary hover:underline break-all">
              {websiteUrl}
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

    </div>
  );
}

