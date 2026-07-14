import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronDown, LayoutGrid, PlusCircle, Archive, FolderKanban } from "lucide-react";
import { adminListChanges, adminCreateChangeRequest } from "@/lib/admin.functions";
import { adminArchiveChange, adminUnarchiveChange } from "@/lib/accounts.functions";
import { STATUS_LABEL, STATUS_COLOR, PRIORITY_LABEL, PRIORITY_COLOR, PRIORITY_WEIGHT, CATEGORY_LABEL, CATEGORY_KEYS } from "@/lib/status";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/admin/changes")({
  head: () => ({ meta: [{ title: "Changes — Admin — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AdminChangesPage,
});

function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="bg-muted/30 p-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => <Skeleton key={i} className="h-4 flex-1" />)}
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="p-3 flex gap-4">
            {Array.from({ length: cols }).map((_, c) => <Skeleton key={c} className="h-4 flex-1" />)}
          </div>
        ))}
      </div>
    </div>
  );
}

type Section = "alle" | "archief" | "nieuw";

function AdminChangesPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [section, setSection] = useState<Section>("alle");
  const [projectFilter, setProjectFilter] = useState<string>("");

  const list = useServerFn(adminListChanges);
  const { data, isLoading } = useQuery({ queryKey: ["admin-changes"], queryFn: () => list({}) });

  if (pathname !== "/admin/changes") return <Outlet />;

  const goSection = (s: Section) => { setSection(s); setProjectFilter(""); };
  const goProject = (id: string) => { setProjectFilter(id); setSection("alle"); };

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 max-w-[1600px] px-6 lg:px-10 space-y-6">
      <Link to="/admin" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronLeft className="w-4 h-4" /> Terug naar Admin
      </Link>

      <div>
        <h1 className="font-display text-4xl font-bold">Changes</h1>
        <p className="text-muted-foreground">Beheer alle wijzigingsverzoeken: status, prioriteit en communicatie.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <ChangesSidebar
          section={section}
          projectFilter={projectFilter}
          projects={data?.projects ?? []}
          onSection={goSection}
          onProject={goProject}
        />
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <TableSkeleton />
          ) : section === "nieuw" ? (
            <NewChangeSection data={data} onCreated={() => goSection("alle")} />
          ) : (
            <ChangesListSection
              data={data}
              archivedOnly={section === "archief"}
              projectFilter={projectFilter}
              setProjectFilter={setProjectFilter}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ChangesSidebar({ section, projectFilter, projects, onSection, onProject }: {
  section: Section; projectFilter: string; projects: any[];
  onSection: (s: Section) => void; onProject: (id: string) => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({ Overzicht: true, Projecten: true, Beheer: true });

  const groups: { label: string; items: { key: string; label: string; icon: any; active: boolean; onClick: () => void }[] }[] = [
    {
      label: "Overzicht",
      items: [{ key: "alle", label: "Alle changes", icon: LayoutGrid, active: section === "alle" && !projectFilter, onClick: () => onSection("alle") }],
    },
    ...(projects.length > 0
      ? [{
          label: "Projecten",
          items: projects.map((p: any) => ({
            key: `project-${p.id}`,
            label: p.name,
            icon: FolderKanban,
            active: section === "alle" && projectFilter === p.id,
            onClick: () => onProject(p.id),
          })),
        }]
      : []),
    {
      label: "Beheer",
      items: [
        { key: "nieuw", label: "Nieuwe change", icon: PlusCircle, active: section === "nieuw", onClick: () => onSection("nieuw") },
        { key: "archief", label: "Archief", icon: Archive, active: section === "archief", onClick: () => onSection("archief") },
      ],
    },
  ];

  return (
    <nav aria-label="Changes secties" className="md:w-60 md:shrink-0 md:border-r border-border md:pr-4">
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

function ChangesListSection({ data, archivedOnly, projectFilter, setProjectFilter }: {
  data: any; archivedOnly: boolean; projectFilter: string; setProjectFilter: (s: string) => void;
}) {
  const nav = useNavigate();
  const qc = useQueryClient();
  const archiveFn = useServerFn(adminArchiveChange);
  const unarchiveFn = useServerFn(adminUnarchiveChange);
  const archiveM = useMutation({
    mutationFn: (id: string) => archiveFn({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-changes"] }); toast.success("Change gearchiveerd."); },
    onError: (e: any) => toast.error(e.message),
  });
  const unarchiveM = useMutation({
    mutationFn: (id: string) => unarchiveFn({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-changes"] }); toast.success("Change hersteld."); },
    onError: (e: any) => toast.error(e.message),
  });

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"priority" | "date">("priority");

  const allRequests = data?.requests ?? [];
  const customers = data?.customers ?? [];
  const projects = data?.projects ?? [];
  const customerById = new Map(customers.map((c: any) => [c.id, c]));
  const projectById = new Map<string, any>(projects.map((p: any) => [p.id, p]));

  const scoped = allRequests.filter((r: any) => !!r.archived === archivedOnly);

  const statusCounts: Record<string, number> = {};
  for (const r of scoped) statusCounts[r.status] = (statusCounts[r.status] ?? 0) + 1;

  let items = scoped.filter((r: any) => {
    if (statusFilter && r.status !== statusFilter) return false;
    if (priorityFilter && r.priority !== priorityFilter) return false;
    if (categoryFilter && (r.category ?? "other") !== categoryFilter) return false;
    if (projectFilter && r.project_id !== projectFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const c: any = customerById.get(r.user_id);
      const inTitle = r.title?.toLowerCase().includes(q);
      const inDesc = r.description?.toLowerCase().includes(q);
      const inCustomer = c?.full_name?.toLowerCase().includes(q) || c?.email?.toLowerCase().includes(q);
      const num = r.request_number ? `#${r.request_number}` : "";
      if (!inTitle && !inDesc && !inCustomer && !num.includes(q)) return false;
    }
    return true;
  });
  items = [...items].sort((a: any, b: any) => {
    if (sortBy === "priority") return (PRIORITY_WEIGHT[b.priority] ?? 0) - (PRIORITY_WEIGHT[a.priority] ?? 0);
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const activeProject: any = projectFilter ? projectById.get(projectFilter) : null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        {archivedOnly ? "Archief" : activeProject ? `Project: ${activeProject.name}` : "Alle changes"} ({scoped.length})
      </h2>

      {!archivedOnly && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(STATUS_LABEL).map(([k, v]) => (
            <button
              key={k}
              onClick={() => setStatusFilter(statusFilter === k ? "" : k)}
              className={`rounded-lg border p-3 text-left transition-colors ${statusFilter === k ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`}
            >
              <p className="text-xs text-muted-foreground">{v}</p>
              <p className="text-xl font-bold mt-1">{statusCounts[k] ?? 0}</p>
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input placeholder="Zoek op titel, klant, omschrijving of #nummer…" value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm w-64" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-md border border-input bg-background px-2 py-2 text-sm">
          <option value="">Alle statussen</option>
          {Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="rounded-md border border-input bg-background px-2 py-2 text-sm">
          <option value="">Alle prioriteiten</option>
          {Object.entries(PRIORITY_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-md border border-input bg-background px-2 py-2 text-sm">
          <option value="">Alle categorieën</option>
          {CATEGORY_KEYS.map((k) => <option key={k} value={k}>{CATEGORY_LABEL[k]}</option>)}
        </select>
        {projects.length > 0 && (
          <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} className="rounded-md border border-input bg-background px-2 py-2 text-sm">
            <option value="">Alle projecten</option>
            {projects.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        )}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="rounded-md border border-input bg-background px-2 py-2 text-sm">
          <option value="priority">Sorteer: prioriteit</option>
          <option value="date">Sorteer: nieuwste eerst</option>
        </select>
        {(statusFilter || priorityFilter || categoryFilter || projectFilter || search) && (
          <button onClick={() => { setStatusFilter(""); setPriorityFilter(""); setCategoryFilter(""); setProjectFilter(""); setSearch(""); }} className="text-xs text-muted-foreground hover:text-foreground">
            Filters wissen
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-muted-foreground">
            <tr>
              <th className="text-left p-3">Titel</th>
              <th className="text-left p-3">Klant</th>
              <th className="text-left p-3">Project</th>
              <th className="text-left p-3">Categorie</th>
              <th className="text-left p-3">Prioriteit</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Datum</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((r: any) => {
              const c: any = customerById.get(r.user_id);
              const p: any = r.project_id ? projectById.get(r.project_id) : null;
              return (
                <tr
                  key={r.id}
                  className="border-t border-border hover:bg-muted/20 cursor-pointer"
                  onClick={() => nav({ to: "/admin/changes/$changeId", params: { changeId: r.id } })}
                >
                  <td className="p-3 font-medium">
                    <Link to="/admin/changes/$changeId" params={{ changeId: r.id }} className="hover:text-primary" onClick={(e) => e.stopPropagation()}>
                      {r.request_number ? `#${r.request_number} ` : ""}{r.title}
                    </Link>
                    <div className="text-xs text-muted-foreground truncate max-w-xs">{r.description}</div>
                  </td>
                  <td className="p-3 text-muted-foreground text-xs">{c?.full_name || c?.email || "—"}</td>
                  <td className="p-3 text-muted-foreground text-xs">{p?.name || "—"}</td>
                  <td className="p-3 text-xs">{CATEGORY_LABEL[r.category ?? "other"] ?? "Anders"}</td>
                  <td className={`p-3 text-xs font-medium ${PRIORITY_COLOR[r.priority]}`}>{PRIORITY_LABEL[r.priority]}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOR[r.status]}`}>{STATUS_LABEL[r.status]}</span>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("nl-NL")}</td>
                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    {archivedOnly ? (
                      <button onClick={() => unarchiveM.mutate(r.id)} className="text-xs text-primary hover:underline">Herstel</button>
                    ) : (
                      <button onClick={() => archiveM.mutate(r.id)} className="text-xs text-muted-foreground hover:text-destructive hover:underline">Archiveer</button>
                    )}
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && <tr><td colSpan={8} className="p-6 text-center text-muted-foreground">Geen changes gevonden.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FormField({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

function NewChangeSection({ data, onCreated }: { data: any; onCreated: () => void }) {
  const create = useServerFn(adminCreateChangeRequest);
  const qc = useQueryClient();
  const customers = data?.customers ?? [];
  const projects = data?.projects ?? [];

  const [form, setForm] = useState({
    user_id: "", title: "", description: "", priority: "normal", category: "other",
    project_id: "", rush: false, is_paid: false, due_date: "",
  });

  const availableProjects = form.user_id
    ? projects.filter((p: any) => (p.member_ids ?? []).includes(form.user_id))
    : projects;

  const setUserId = (user_id: string) => {
    const stillValid = !form.project_id || projects.find((p: any) => p.id === form.project_id)?.member_ids?.includes(user_id);
    setForm({ ...form, user_id, project_id: stillValid ? form.project_id : "" });
  };

  const createM = useMutation({
    mutationFn: () => create({
      data: {
        user_id: form.user_id,
        title: form.title,
        description: form.description,
        priority: form.priority as any,
        category: form.category as any,
        project_id: form.project_id || null,
        rush: form.rush,
        is_paid: form.is_paid,
        due_date: form.due_date || null,
      },
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-changes"] });
      toast.success("Change aangemaakt.");
      setForm({ user_id: "", title: "", description: "", priority: "normal", category: "other", project_id: "", rush: false, is_paid: false, due_date: "" });
      onCreated();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const canSubmit = !!form.user_id && form.title.trim().length >= 3 && form.description.trim().length >= 5;

  return (
    <div className="max-w-3xl">
      <div className="mb-5">
        <h2 className="font-display text-xl font-semibold flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-primary" /> Nieuwe change
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Maak een wijzigingsverzoek aan namens een klant en koppel het optioneel aan een project.</p>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="p-6 space-y-5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold">1</span>
            Klant &amp; project
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Klant">
              <select value={form.user_id} onChange={(e) => setUserId(e.target.value)} className={inputCls}>
                <option value="">Kies klant…</option>
                {customers.map((c: any) => <option key={c.id} value={c.id}>{c.full_name || c.email}</option>)}
              </select>
            </FormField>
            <FormField
              label="Gekoppeld project"
              hint={form.user_id && availableProjects.length === 0 ? "Deze klant heeft geen gekoppelde projecten." : undefined}
            >
              <select
                value={form.project_id}
                onChange={(e) => setForm({ ...form, project_id: e.target.value })}
                disabled={form.user_id !== "" && availableProjects.length === 0}
                className={`${inputCls} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <option value="">Geen project</option>
                {availableProjects.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </FormField>
          </div>
        </div>

        <div className="p-6 space-y-5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold">2</span>
            Omschrijving
          </h3>
          <FormField label="Titel">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Korte, duidelijke titel…" className={inputCls} />
          </FormField>
          <FormField label="Omschrijving">
            <textarea rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Wat moet er gewijzigd worden?" className={inputCls} />
          </FormField>
        </div>

        <div className="p-6 space-y-5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold">3</span>
            Classificatie &amp; planning
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <FormField label="Prioriteit">
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className={inputCls}>
                {Object.entries(PRIORITY_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </FormField>
            <FormField label="Categorie">
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                {CATEGORY_KEYS.map((k) => <option key={k} value={k}>{CATEGORY_LABEL[k]}</option>)}
              </select>
            </FormField>
            <FormField label="Geschatte oplevering">
              <input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className={inputCls} />
            </FormField>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() => setForm({ ...form, rush: !form.rush })}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${form.rush ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-border text-muted-foreground hover:border-destructive/30 hover:text-destructive"}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${form.rush ? "bg-destructive" : "bg-muted-foreground/40"}`} />
              Spoed
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, is_paid: !form.is_paid })}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${form.is_paid ? "border-primary/40 bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${form.is_paid ? "bg-primary" : "bg-muted-foreground/40"}`} />
              Betaald
            </button>
          </div>
        </div>

        <div className="p-6 flex items-center justify-end gap-3 bg-muted/20">
          {!canSubmit && (
            <span className="text-xs text-muted-foreground mr-auto">Vul klant, titel en omschrijving in om te kunnen aanmaken.</span>
          )}
          <button
            onClick={() => createM.mutate()}
            disabled={!canSubmit || createM.isPending}
            className="btn-primary text-sm px-5"
          >
            {createM.isPending ? "Bezig…" : "Change aanmaken"}
          </button>
        </div>
      </div>
    </div>
  );
}
