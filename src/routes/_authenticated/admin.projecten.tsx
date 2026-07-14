import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ChevronLeft, ChevronDown, RefreshCw, Shield, Activity, Clock, AlertTriangle,
  CheckCircle, XCircle, LayoutGrid, PlusCircle, Archive, BarChart3, Columns3,
  FileStack, GripVertical,
} from "lucide-react";
import { DndContext, useDraggable, useDroppable, type DragEndEvent } from "@dnd-kit/core";
import {
  adminListProjects,
  adminCreateProject,
  adminDeleteProject,
  adminUpdateProject,
  adminListWebsiteLinks,
  adminGetCustomerMonitoring,
  adminSyncCustomerMonitoring,
  adminRunSSLCheck,
  adminRunDNSCheck,
  adminListProjectTemplates,
  adminCreateProjectTemplate,
  adminDeleteProjectTemplate,
  adminCreateProjectFromTemplate,
  adminGetProjectsDashboardWidgets,
} from "@/lib/admin.functions";
import {
  PROJECT_STATUS_VALUES,
  PROJECT_STATUS_LABEL,
  PROJECT_STATUS_COLOR,
  PROJECT_PRIORITY_VALUES,
  PROJECT_PRIORITY_LABEL,
  PROJECT_PRIORITY_COLOR,
  PROJECT_PRIORITY_ORDER,
  isProjectOverdue,
} from "@/lib/project-status";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/admin/projecten")({
  head: () => ({ meta: [{ title: "Projecten — Admin — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AdminProjectenPage,
});

function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="bg-muted/30 p-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="p-3 flex gap-4">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Pagina met sidebar-navigatie (zelfde patroon als AdminSidebar) ----------

type Section = "alle" | "archief" | "statistieken" | "nieuw" | "kanban" | "sjablonen" | "dashboard";

function AdminProjectenPage() {
  // Kind-route (/admin/projecten/$projectId) deelt deze route als parent
  // (TanStack Router file-based routing) en moet via Outlet gerenderd worden.
  // Deze check staat ná alle hooks om de Rules of Hooks niet te schenden.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [section, setSection] = useState<Section>("alle");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [detailUserId, setDetailUserId] = useState<string | null>(null);

  if (pathname !== "/admin/projecten") return <Outlet />;

  const goSection = (s: Section) => { setSection(s); setDetailUserId(null); };
  const goStatus = (s: string) => { setStatusFilter(s); setSection("alle"); setDetailUserId(null); };

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 max-w-[1600px] px-6 lg:px-10 space-y-6">
      <Link
        to="/admin"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Terug naar Admin
      </Link>

      <div>
        <h1 className="font-display text-4xl font-bold">Projecten</h1>
        <p className="text-muted-foreground">Beheer alle klantprojecten: status, prioriteit, deadlines en monitoring.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <ProjectenSidebar section={section} statusFilter={statusFilter} onSection={goSection} onStatus={goStatus} showingDetail={!!detailUserId} />

        <div className="flex-1 min-w-0">
          {detailUserId ? (
            <WebsiteLinkDetail userId={detailUserId} onBack={() => setDetailUserId(null)} />
          ) : section === "nieuw" ? (
            <NewProjectSection onCreated={() => goSection("alle")} />
          ) : section === "statistieken" ? (
            <StatsSection />
          ) : section === "kanban" ? (
            <KanbanSection />
          ) : section === "sjablonen" ? (
            <TemplatesSection onCreated={() => goSection("alle")} />
          ) : section === "dashboard" ? (
            <DashboardWidgetsSection />
          ) : (
            <ProjectsListSection
              archivedOnly={section === "archief"}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onOpenDetail={setDetailUserId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectenSidebar({ section, statusFilter, onSection, onStatus, showingDetail }: {
  section: Section; statusFilter: string; showingDetail: boolean;
  onSection: (s: Section) => void; onStatus: (s: string) => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({ Overzicht: true, Snelfilters: true, Beheer: true });

  const groups: { label: string; items: { key: string; label: string; icon: any; active: boolean; onClick: () => void }[] }[] = [
    {
      label: "Overzicht",
      items: [
        { key: "alle", label: "Alle projecten", icon: LayoutGrid, active: !showingDetail && section === "alle" && !statusFilter, onClick: () => onSection("alle") },
        { key: "kanban", label: "Kanban", icon: Columns3, active: !showingDetail && section === "kanban", onClick: () => onSection("kanban") },
        { key: "statistieken", label: "Statistieken", icon: BarChart3, active: !showingDetail && section === "statistieken", onClick: () => onSection("statistieken") },
        { key: "dashboard", label: "Dashboard", icon: Activity, active: !showingDetail && section === "dashboard", onClick: () => onSection("dashboard") },
      ],
    },
    {
      label: "Snelfilters",
      items: PROJECT_STATUS_VALUES.map((s) => ({
        key: `status-${s}`,
        label: PROJECT_STATUS_LABEL[s],
        icon: LayoutGrid,
        active: !showingDetail && section === "alle" && statusFilter === s,
        onClick: () => onStatus(s),
      })),
    },
    {
      label: "Beheer",
      items: [
        { key: "nieuw", label: "Nieuw project", icon: PlusCircle, active: !showingDetail && section === "nieuw", onClick: () => onSection("nieuw") },
        { key: "sjablonen", label: "Sjablonen", icon: FileStack, active: !showingDetail && section === "sjablonen", onClick: () => onSection("sjablonen") },
        { key: "archief", label: "Archief", icon: Archive, active: !showingDetail && section === "archief", onClick: () => onSection("archief") },
      ],
    },
  ];

  return (
    <nav aria-label="Projecten secties" className="md:w-60 md:shrink-0 md:border-r border-border md:pr-4">
      {groups.map((g) => {
        const isOpen = open[g.label] ?? true;
        return (
          <div key={g.label} className="mb-2">
            <button
              type="button"
              onClick={() => setOpen({ ...open, [g.label]: !isOpen })}
              className="w-full flex items-center justify-between py-1 text-[10px] font-semibold uppercase text-muted-foreground"
              style={{ letterSpacing: "0.1em" }}
            >
              <span>{g.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
            </button>
            {isOpen && (
              <ul className="mt-1 space-y-0.5">
                {g.items.map((it) => {
                  const Icon = it.icon;
                  return (
                    <li key={it.key}>
                      <button
                        onClick={it.onClick}
                        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm transition-colors"
                        style={{
                          borderLeft: it.active ? "2px solid var(--primary)" : "2px solid transparent",
                          color: it.active ? "var(--primary)" : undefined,
                          paddingLeft: "8px",
                        }}
                        onMouseEnter={(e) => { if (!it.active) (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)"; }}
                        onMouseLeave={(e) => { if (!it.active) (e.currentTarget as HTMLButtonElement).style.color = ""; }}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate text-left">{it.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ---------- Statistieken ----------

function StatsSection() {
  const list = useServerFn(adminListProjects);
  const { data, isLoading } = useQuery({ queryKey: ["admin-projects"], queryFn: () => list({}) });
  if (isLoading) return <TableSkeleton cols={3} />;
  const items = (data?.items ?? []).filter((p: any) => !p.archived);

  const statusCounts: Record<string, number> = {};
  const priorityCounts: Record<string, number> = {};
  let overdueCount = 0;
  for (const p of items) {
    statusCounts[p.status ?? "concept"] = (statusCounts[p.status ?? "concept"] ?? 0) + 1;
    priorityCounts[p.priority ?? "normaal"] = (priorityCounts[p.priority ?? "normaal"] ?? 0) + 1;
    if (isProjectOverdue(p.deadline, p.status)) overdueCount++;
  }
  const max = Math.max(1, ...Object.values(statusCounts));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Actieve projecten</p>
          <p className="mt-1 text-2xl font-bold">{items.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Over deadline</p>
          <p className={`mt-1 text-2xl font-bold ${overdueCount > 0 ? "text-destructive" : ""}`}>{overdueCount}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Urgente prioriteit</p>
          <p className="mt-1 text-2xl font-bold">{priorityCounts["urgent"] ?? 0}</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="font-semibold text-sm mb-3">Projecten per status</h3>
        <div className="space-y-2">
          {PROJECT_STATUS_VALUES.map((s) => (
            <div key={s} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-28 shrink-0">{PROJECT_STATUS_LABEL[s]}</span>
              <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${((statusCounts[s] ?? 0) / max) * 100}%` }} />
              </div>
              <span className="text-xs font-medium w-6 text-right">{statusCounts[s] ?? 0}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="font-semibold text-sm mb-3">Projecten per prioriteit</h3>
        <div className="flex gap-2">
          {PROJECT_PRIORITY_VALUES.map((p) => (
            <div key={p} className="flex-1 rounded-md border border-border p-3 text-center">
              <p className={`text-lg font-bold ${PROJECT_PRIORITY_COLOR[p] ?? ""}`}>{priorityCounts[p] ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{PROJECT_PRIORITY_LABEL[p]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Nieuw project ----------

function NewProjectSection({ onCreated }: { onCreated: () => void }) {
  const listCustomers = useServerFn(adminListWebsiteLinks);
  const create = useServerFn(adminCreateProject);
  const qc = useQueryClient();

  const { data: customersData } = useQuery({ queryKey: ["admin-website-links"], queryFn: () => listCustomers({}) });
  const customers = customersData?.items ?? [];

  const [form, setForm] = useState({ name: "", website_url: "", snippet_active: false, primary_user_id: "", member_ids: [] as string[] });

  const createM = useMutation({
    mutationFn: () => create({ data: form }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("Project aangemaakt.");
      setForm({ name: "", website_url: "", snippet_active: false, primary_user_id: "", member_ids: [] });
      onCreated();
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-4 max-w-2xl">
      <h2 className="text-lg font-semibold">Nieuw project</h2>
      <div className="rounded-lg border border-border p-4 space-y-3">
        <label className="block text-sm">
          <span className="text-muted-foreground">Projectnaam</span>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="bijv. aimi-development.nl" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Website URL</span>
          <input value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Hoofdklant (drijft de monitoring)</span>
          <select value={form.primary_user_id} onChange={(e) => setForm({ ...form, primary_user_id: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="">Kies klant…</option>
            {customers.map((c: any) => <option key={c.id} value={c.id}>{c.full_name || c.email}</option>)}
          </select>
        </label>
        <div>
          <span className="text-muted-foreground text-sm">Extra gekoppelde klanten</span>
          <div className="mt-1 max-h-40 overflow-y-auto rounded-md border border-border p-2 space-y-1">
            {customers.filter((c: any) => c.id !== form.primary_user_id).map((c: any) => (
              <label key={c.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.member_ids.includes(c.id)}
                  onChange={(e) => setForm({ ...form, member_ids: e.target.checked ? [...form.member_ids, c.id] : form.member_ids.filter((id) => id !== c.id) })}
                />
                {c.full_name || c.email}
              </label>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.snippet_active} onChange={(e) => setForm({ ...form, snippet_active: e.target.checked })} />
          Snippet actief
        </label>
        <button onClick={() => createM.mutate()} disabled={!form.name || !form.primary_user_id || createM.isPending} className="btn-primary text-sm">
          {createM.isPending ? "Bezig…" : "Project aanmaken"}
        </button>
      </div>
    </div>
  );
}

// ---------- Lijst (Alle projecten / Archief) ----------

function ProjectsListSection({ archivedOnly, statusFilter, setStatusFilter, onOpenDetail }: {
  archivedOnly: boolean; statusFilter: string; setStatusFilter: (s: string) => void; onOpenDetail: (id: string) => void;
}) {
  const nav = useNavigate();
  const list = useServerFn(adminListProjects);
  const del = useServerFn(adminDeleteProject);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["admin-projects"], queryFn: () => list({}) });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-projects"] });
  const delM = useMutation({ mutationFn: (i: any) => del({ data: i }), onSuccess: () => { invalidate(); toast.success("Project verwijderd."); } });

  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"created" | "deadline" | "priority" | "name">("created");

  if (isLoading) return <TableSkeleton cols={4} />;
  const allItems = (data?.items ?? []).filter((p: any) => !!p.archived === archivedOnly);

  const categories = Array.from(new Set(allItems.map((p: any) => p.category).filter(Boolean))) as string[];

  const statusCounts: Record<string, number> = {};
  for (const p of allItems) statusCounts[p.status ?? "concept"] = (statusCounts[p.status ?? "concept"] ?? 0) + 1;

  let items = allItems.filter((p: any) => {
    if (statusFilter && p.status !== statusFilter) return false;
    if (priorityFilter && p.priority !== priorityFilter) return false;
    if (categoryFilter && p.category !== categoryFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const inName = p.name?.toLowerCase().includes(q);
      const inTags = (p.tags ?? []).some((t: string) => t.toLowerCase().includes(q));
      if (!inName && !inTags) return false;
    }
    return true;
  });
  items = [...items].sort((a: any, b: any) => {
    if (sortBy === "name") return (a.name ?? "").localeCompare(b.name ?? "");
    if (sortBy === "deadline") return (a.deadline ? new Date(a.deadline).getTime() : Infinity) - (b.deadline ? new Date(b.deadline).getTime() : Infinity);
    if (sortBy === "priority") return (PROJECT_PRIORITY_ORDER[b.priority] ?? 0) - (PROJECT_PRIORITY_ORDER[a.priority] ?? 0);
    return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{archivedOnly ? "Archief" : "Alle projecten"}</h2>

      {!archivedOnly && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PROJECT_STATUS_VALUES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
              className={`rounded-lg border p-3 text-left transition-colors ${statusFilter === s ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`}
            >
              <p className="text-xs text-muted-foreground">{PROJECT_STATUS_LABEL[s]}</p>
              <p className="text-xl font-bold mt-1">{statusCounts[s] ?? 0}</p>
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          placeholder="Zoeken op naam of tag…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm w-56"
        />
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="rounded-md border border-input bg-background px-2 py-2 text-sm">
          <option value="">Alle prioriteiten</option>
          {PROJECT_PRIORITY_VALUES.map((p) => <option key={p} value={p}>{PROJECT_PRIORITY_LABEL[p]}</option>)}
        </select>
        {categories.length > 0 && (
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-md border border-input bg-background px-2 py-2 text-sm">
            <option value="">Alle categorieën</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        )}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="rounded-md border border-input bg-background px-2 py-2 text-sm">
          <option value="created">Sorteer: nieuwste eerst</option>
          <option value="deadline">Sorteer: deadline</option>
          <option value="priority">Sorteer: prioriteit</option>
          <option value="name">Sorteer: naam</option>
        </select>
        {(statusFilter || priorityFilter || categoryFilter || search) && (
          <button onClick={() => { setStatusFilter(""); setPriorityFilter(""); setCategoryFilter(""); setSearch(""); }} className="text-xs text-muted-foreground hover:text-foreground">
            Filters wissen
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-muted-foreground">
            <tr>
              <th className="text-left p-3">Project</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Prioriteit</th>
              <th className="text-left p-3">Deadline</th>
              <th className="text-left p-3">Klanten</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p: any) => {
              const overdue = isProjectOverdue(p.deadline, p.status);
              return (
                <tr key={p.id} className="border-t border-border hover:bg-muted/20 cursor-pointer" onClick={() => nav({ to: "/admin/projecten/$projectId", params: { projectId: p.id } })}>
                  <td className="p-3 font-medium">
                    <Link to="/admin/projecten/$projectId" params={{ projectId: p.id }} className="hover:text-primary" onClick={(e) => e.stopPropagation()}>
                      {p.name}
                    </Link>
                    <div className="text-xs text-muted-foreground truncate max-w-xs">{p.website_url || "—"}</div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PROJECT_STATUS_COLOR[p.status] ?? "bg-muted"}`}>
                      {PROJECT_STATUS_LABEL[p.status] ?? p.status}
                    </span>
                  </td>
                  <td className={`p-3 text-xs font-medium ${PROJECT_PRIORITY_COLOR[p.priority] ?? ""}`}>{PROJECT_PRIORITY_LABEL[p.priority] ?? p.priority}</td>
                  <td className={`p-3 text-xs ${overdue ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                    {p.deadline ? new Date(p.deadline).toLocaleDateString("nl-NL") : "—"}
                  </td>
                  <td className="p-3 text-muted-foreground text-xs">{(p.members ?? []).map((m: any) => m.full_name || m.email).join(", ") || "—"}</td>
                  <td className="p-3 text-right space-x-3" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => onOpenDetail(p.primary_user_id)} className="text-xs text-primary hover:underline">Monitoring</button>
                    <button onClick={() => { if (confirm(`Project "${p.name}" verwijderen?`)) delM.mutate({ project_id: p.id }); }} className="text-xs text-destructive hover:underline">Verwijder</button>
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Geen projecten gevonden.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WebsiteLinkDetail({ userId, onBack }: { userId: string; onBack: () => void }) {
  const getMonitoring = useServerFn(adminGetCustomerMonitoring);
  const syncFn = useServerFn(adminSyncCustomerMonitoring);
  const runSSL = useServerFn(adminRunSSLCheck);
  const runDNS = useServerFn(adminRunDNSCheck);
  const qc = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["admin-monitoring", userId],
    queryFn: () => getMonitoring({ data: { user_id: userId } }),
    refetchInterval: 60_000,
  });

  const syncM = useMutation({
    mutationFn: async () => {
      // Responstijdmeting is de kern — als die faalt (bijv. geen website_url)
      // moet dat zichtbaar zijn i.p.v. stil weggeslikt worden.
      await syncFn({ data: { user_id: userId } });
      // SSL & DNS zijn aanvullend; die mogen best afzonderlijk falen.
      await Promise.allSettled([
        runSSL({ data: { user_id: userId } }),
        runDNS({ data: { user_id: userId } }),
      ]);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-monitoring", userId] });
      toast.success("Sync voltooid — responstijd, SSL & DNS gecheckt.");
    },
    onError: (e: any) => toast.error(`Sync mislukt: ${e.message}`),
  });

  // Auto-sync als er nog geen responstijdmeting is
  const monAvg = (data as any)?.avg;
  useEffect(() => {
    if (!isLoading && data && monAvg == null && !syncM.isPending) {
      syncM.mutate();
    }
  }, [isLoading, monAvg]); // eslint-disable-line react-hooks/exhaustive-deps

  const sslM = useMutation({
    mutationFn: () => runSSL({ data: { user_id: userId } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-monitoring", userId] }); toast.success("SSL check uitgevoerd."); },
    onError: (e: any) => toast.error(e.message),
  });
  const dnsM = useMutation({
    mutationFn: () => runDNS({ data: { user_id: userId } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-monitoring", userId] }); toast.success("DNS check uitgevoerd."); },
    onError: (e: any) => toast.error(e.message),
  });

  const mon = data as any;
  const ssl = mon?.ssl ?? null;
  const dns = mon?.dns ?? null;
  const alerts: any[] = mon?.alerts ?? [];
  const avgMs: number | null = mon?.avg ?? null;
  const uptimePct: string | null = mon?.uptimePct != null ? (mon.uptimePct as number).toFixed(1) : null;
  const dailyUptime: any[] = mon?.dailyUptime ?? [];
  const hasData = (mon?.total24h ?? 0) > 0 || dailyUptime.some((d: any) => d.total > 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4" /> Terug
          </button>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">Monitoring</span>
        </div>
        <button
          onClick={() => syncM.mutate()}
          disabled={syncM.isPending || isFetching}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-border hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${syncM.isPending || isFetching ? "animate-spin" : ""}`} />
          {syncM.isPending ? "Bezig…" : "Sync"}
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3 animate-pulse">
          {[1,2,3].map(i => <div key={i} className="h-24 bg-muted rounded-lg" />)}
        </div>
      ) : !hasData ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground text-sm">
          Nog geen meetdata. Druk op Sync om een eerste meting te starten.
        </div>
      ) : (
        <>
          {/* Statistieken */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Uptime (24u)</p>
              <p className={`mt-1 text-2xl font-bold ${uptimePct && parseFloat(uptimePct) < 95 ? "text-destructive" : uptimePct ? "text-emerald-500" : ""}`}>
                {uptimePct ? `${uptimePct}%` : "—"}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Gem. respons (24u)</p>
              <p className={`mt-1 text-2xl font-bold ${avgMs && avgMs > 3000 ? "text-amber-500" : ""}`}>
                {avgMs ? `${avgMs}ms` : "—"}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Metingen (24u)</p>
              <p className="mt-1 text-2xl font-bold">{mon?.total24h ?? 0}</p>
            </div>
          </div>

          {/* Uptime grafiek */}
          {dailyUptime.length > 0 && (
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
                <Activity className="w-3 h-3" /> Uptime afgelopen 7 dagen
              </p>
              <div className="flex items-end gap-2 h-20">
                {dailyUptime.map((d: any) => {
                  const pct = d.uptime;
                  const color = pct == null ? "bg-muted" : pct >= 99 ? "bg-emerald-500" : pct >= 95 ? "bg-amber-500" : "bg-destructive";
                  return (
                    <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-muted-foreground">{pct != null ? `${pct}%` : "—"}</span>
                      <div className={`w-full rounded-t ${color}`} style={{ height: `${pct != null ? Math.max(8, pct) : 20}%` }} title={d.total > 0 ? `${d.ok}/${d.total} OK` : "Geen data"} />
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
          )}

          {/* SSL */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <Shield className="w-3 h-3" /> SSL Certificaat
              </p>
              <button onClick={() => sslM.mutate()} disabled={sslM.isPending} className="text-xs text-primary hover:underline flex items-center gap-1">
                <RefreshCw className={`w-3 h-3 ${sslM.isPending ? "animate-spin" : ""}`} />
                {sslM.isPending ? "Bezig…" : "Check uitvoeren"}
              </button>
            </div>
            {ssl ? (
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  {ssl.valid ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-destructive" />}
                  <span>{ssl.valid ? "Geldig" : "Ongeldig"}</span>
                  {ssl.days_remaining !== null && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${ssl.days_remaining < 14 ? "bg-destructive/20 text-destructive" : ssl.days_remaining < 30 ? "bg-amber-500/20 text-amber-500" : "bg-emerald-500/20 text-emerald-600"}`}>
                      {ssl.days_remaining}d resterend
                    </span>
                  )}
                </div>
                {ssl.issuer && <p className="text-xs text-muted-foreground">Uitgever: {ssl.issuer}</p>}
                {ssl.expires_at && <p className="text-xs text-muted-foreground">Verloopt: {new Date(ssl.expires_at).toLocaleDateString("nl-NL")}</p>}
                {ssl.error && <p className="text-xs text-destructive">{ssl.error}</p>}
                <p className="text-xs text-muted-foreground">Gecontroleerd: {new Date(ssl.checked_at).toLocaleString("nl-NL")}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nog geen SSL check uitgevoerd.</p>
            )}
          </div>

          {/* DNS */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <Activity className="w-3 h-3" /> DNS Status
              </p>
              <button onClick={() => dnsM.mutate()} disabled={dnsM.isPending} className="text-xs text-primary hover:underline flex items-center gap-1">
                <RefreshCw className={`w-3 h-3 ${dnsM.isPending ? "animate-spin" : ""}`} />
                {dnsM.isPending ? "Bezig…" : "Check uitvoeren"}
              </button>
            </div>
            {dns ? (
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  {dns.healthy ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-destructive" />}
                  <span>{dns.healthy ? "Gezond" : "Problemen gevonden"}</span>
                </div>
                {dns.issues?.length > 0 && (
                  <ul className="text-xs text-destructive space-y-0.5 mt-1">
                    {dns.issues.map((issue: string, i: number) => <li key={i}>• {issue}</li>)}
                  </ul>
                )}
                <p className="text-xs text-muted-foreground">Gecontroleerd: {new Date(dns.checked_at).toLocaleString("nl-NL")}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nog geen DNS check uitgevoerd.</p>
            )}
          </div>

          {/* Actieve alerts */}
          {alerts.length > 0 && (
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
              <p className="text-xs text-amber-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                <AlertTriangle className="w-3 h-3" /> Actieve alerts ({alerts.length})
              </p>
              <ul className="space-y-1">
                {alerts.map((a: any) => (
                  <li key={a.id} className="text-sm flex items-start gap-2">
                    <span className={`text-xs px-1.5 py-0.5 rounded shrink-0 ${a.severity === "critical" ? "bg-destructive/20 text-destructive" : "bg-amber-500/20 text-amber-600"}`}>
                      {a.severity}
                    </span>
                    <span>{a.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Last sync */}
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Laatste ping: {mon?.lastSync ? new Date(mon.lastSync).toLocaleString("nl-NL") : "—"}
          </p>
        </>
      )}
    </div>
  );
}

// ---------- Kanban ----------

function KanbanCard({ project }: { project: any }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: project.id });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 50 }
    : undefined;
  const overdue = isProjectOverdue(project.deadline, project.status);
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-lg border border-border bg-card p-3 space-y-1.5 cursor-grab active:cursor-grabbing touch-none ${isDragging ? "opacity-50 shadow-lg" : "hover:border-primary/40"}`}
    >
      <div className="flex items-start gap-1.5">
        <GripVertical className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-sm font-medium truncate">{project.name}</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap pl-5">
        <span className={`text-xs font-medium ${PROJECT_PRIORITY_COLOR[project.priority] ?? ""}`}>{PROJECT_PRIORITY_LABEL[project.priority] ?? project.priority}</span>
        {project.deadline && (
          <span className={`text-xs ${overdue ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
            {new Date(project.deadline).toLocaleDateString("nl-NL")}
          </span>
        )}
      </div>
    </div>
  );
}

function KanbanColumn({ status, projects }: { status: string; projects: any[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg border p-3 min-w-[260px] w-[260px] shrink-0 space-y-2 min-h-[200px] transition-colors ${isOver ? "border-primary bg-primary/5" : "border-border bg-muted/20"}`}
    >
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold">{PROJECT_STATUS_LABEL[status]}</h3>
        <span className="text-xs text-muted-foreground">{projects.length}</span>
      </div>
      <div className="space-y-2">
        {projects.map((p) => <KanbanCard key={p.id} project={p} />)}
        {projects.length === 0 && <p className="text-xs text-muted-foreground px-1 py-4 text-center">Geen projecten</p>}
      </div>
    </div>
  );
}

function KanbanSection() {
  const list = useServerFn(adminListProjects);
  const update = useServerFn(adminUpdateProject);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["admin-projects"], queryFn: () => list({}) });
  const updateM = useMutation({
    mutationFn: (i: any) => update({ data: i }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-projects"] }),
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <TableSkeleton cols={6} />;
  const items = (data?.items ?? []).filter((p: any) => !p.archived);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    const newStatus = String(over.id);
    const project = items.find((p: any) => p.id === active.id);
    if (!project || project.status === newStatus) return;
    updateM.mutate({ project_id: project.id, status: newStatus });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Kanban</h2>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {PROJECT_STATUS_VALUES.map((s) => (
            <KanbanColumn key={s} status={s} projects={items.filter((p: any) => p.status === s)} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

// ---------- Sjablonen ----------

function TemplatesSection({ onCreated }: { onCreated: () => void }) {
  const listTemplates = useServerFn(adminListProjectTemplates);
  const createTemplate = useServerFn(adminCreateProjectTemplate);
  const delTemplate = useServerFn(adminDeleteProjectTemplate);
  const createFromTemplate = useServerFn(adminCreateProjectFromTemplate);
  const listCustomers = useServerFn(adminListWebsiteLinks);
  const qc = useQueryClient();

  const { data: templatesData, isLoading } = useQuery({ queryKey: ["admin-project-templates"], queryFn: () => listTemplates({}) });
  const { data: customersData } = useQuery({ queryKey: ["admin-website-links"], queryFn: () => listCustomers({}) });
  const templates = templatesData?.items ?? [];
  const customers = customersData?.items ?? [];

  const invalidateTemplates = () => qc.invalidateQueries({ queryKey: ["admin-project-templates"] });
  const delM = useMutation({ mutationFn: (i: any) => delTemplate({ data: i }), onSuccess: () => { invalidateTemplates(); toast.success("Sjabloon verwijderd."); }, onError: (e: any) => toast.error(e.message) });
  const createFromM = useMutation({
    mutationFn: (i: any) => createFromTemplate({ data: i }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-projects"] }); toast.success("Project aangemaakt vanuit sjabloon."); onCreated(); },
    onError: (e: any) => toast.error(e.message),
  });
  const createTemplateM = useMutation({
    mutationFn: (i: any) => createTemplate({ data: i }),
    onSuccess: () => {
      invalidateTemplates();
      toast.success("Sjabloon aangemaakt.");
      setNewTemplate({ name: "", description: "" });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [projectForm, setProjectForm] = useState({ name: "", primary_user_id: "", start_date: "" });
  const [newTemplate, setNewTemplate] = useState<{ name: string; description: string }>({ name: "", description: "" });

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-semibold">Sjablonen</h2>

      <div className="rounded-lg border border-border p-4 space-y-3">
        <h3 className="font-semibold text-sm">Nieuw project vanuit sjabloon</h3>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Laden…</p>
        ) : templates.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nog geen sjablonen. Maak er hieronder een aan.</p>
        ) : (
          <>
            <div className="space-y-2">
              {templates.map((t: any) => (
                <label key={t.id} className={`flex items-start gap-2 rounded-md border p-2.5 cursor-pointer ${selectedTemplateId === t.id ? "border-primary bg-primary/5" : "border-border"}`}>
                  <input type="radio" name="template" checked={selectedTemplateId === t.id} onChange={() => setSelectedTemplateId(t.id)} className="mt-1" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{t.name}</p>
                    {t.description && <p className="text-xs text-muted-foreground">{t.description}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); if (confirm(`Sjabloon "${t.name}" verwijderen?`)) delM.mutate({ id: t.id }); }}
                    className="ml-auto text-xs text-destructive hover:underline shrink-0"
                  >Verwijder</button>
                </label>
              ))}
            </div>

            {selectedTemplateId && (
              <div className="space-y-3 pt-2 border-t border-border">
                <label className="block text-sm">
                  <span className="text-muted-foreground">Projectnaam</span>
                  <input value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </label>
                <label className="block text-sm">
                  <span className="text-muted-foreground">Hoofdklant</span>
                  <select value={projectForm.primary_user_id} onChange={(e) => setProjectForm({ ...projectForm, primary_user_id: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Kies klant…</option>
                    {customers.map((c: any) => <option key={c.id} value={c.id}>{c.full_name || c.email}</option>)}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="text-muted-foreground">Startdatum</span>
                  <input type="date" value={projectForm.start_date} onChange={(e) => setProjectForm({ ...projectForm, start_date: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </label>
                <button
                  onClick={() => createFromM.mutate({
                    template_id: selectedTemplateId,
                    name: projectForm.name,
                    primary_user_id: projectForm.primary_user_id,
                    start_date: projectForm.start_date || null,
                  })}
                  disabled={!projectForm.name || !projectForm.primary_user_id || createFromM.isPending}
                  className="btn-primary text-sm"
                >
                  {createFromM.isPending ? "Bezig…" : "Project aanmaken vanuit sjabloon"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="rounded-lg border border-border p-4 space-y-3">
        <h3 className="font-semibold text-sm">Nieuw sjabloon aanmaken</h3>
        <label className="block text-sm">
          <span className="text-muted-foreground">Naam</span>
          <input value={newTemplate.name} onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Beschrijving</span>
          <textarea rows={2} value={newTemplate.description} onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <button
          onClick={() => createTemplateM.mutate({ name: newTemplate.name, description: newTemplate.description || null, milestones: [] })}
          disabled={!newTemplate.name || createTemplateM.isPending}
          className="btn-primary text-sm"
        >
          {createTemplateM.isPending ? "Bezig…" : "Sjabloon opslaan"}
        </button>
      </div>
    </div>
  );
}

// ---------- Dashboard widgets ----------

function DashboardWidgetsSection() {
  const getWidgets = useServerFn(adminGetProjectsDashboardWidgets);
  const { data, isLoading } = useQuery({ queryKey: ["admin-projects-dashboard-widgets"], queryFn: () => getWidgets({}) });

  if (isLoading) return <TableSkeleton cols={3} />;
  const upcoming = data?.upcomingDeadlines ?? [];
  const stale = data?.stale ?? [];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <h3 className="font-semibold text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Naderende deadlines</h3>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">Geen deadlines binnen 14 dagen.</p>
        ) : (
          <ul className="space-y-1.5">
            {upcoming.map((p: any) => {
              const overdue = isProjectOverdue(p.deadline, p.status);
              const days = Math.ceil((new Date(p.deadline).getTime() - Date.now()) / 86400000);
              return (
                <li key={p.id} className="flex items-center justify-between text-sm">
                  <Link to="/admin/projecten/$projectId" params={{ projectId: p.id }} className="hover:text-primary truncate">{p.name}</Link>
                  <span className={overdue ? "text-destructive font-semibold text-xs" : "text-muted-foreground text-xs"}>
                    {overdue ? `${Math.abs(days)}d verlopen` : `${days}d resterend`}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <h3 className="font-semibold text-sm flex items-center gap-2"><Clock className="w-4 h-4" /> Stilgevallen projecten</h3>
        {stale.length === 0 ? (
          <p className="text-sm text-muted-foreground">Geen stilgevallen projecten.</p>
        ) : (
          <ul className="space-y-1.5">
            {stale.map((p: any) => {
              const days = Math.floor((Date.now() - new Date(p.created_at).getTime()) / 86400000);
              return (
                <li key={p.id} className="flex items-center justify-between text-sm">
                  <Link to="/admin/projecten/$projectId" params={{ projectId: p.id }} className="hover:text-primary truncate">{p.name}</Link>
                  <span className="text-muted-foreground text-xs">geen activiteit &gt;14d</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
