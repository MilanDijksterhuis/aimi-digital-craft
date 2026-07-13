import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  ChevronLeft, ArrowUp, ArrowDown, Plus, Trash2, Pencil, Check, X,
  Archive, ArchiveRestore, AlertTriangle, Calendar, Target, FileText,
  Activity, Users, Settings, Tag,
} from "lucide-react";
import {
  adminGetProject,
  adminUpdateProject,
  adminArchiveProject,
  adminDeleteProject,
  adminListWebsiteLinks,
  adminSetProjectMembers,
  adminCreateProjectMilestone,
  adminUpdateProjectMilestone,
  adminDeleteProjectMilestone,
  adminCreateProjectNote,
  adminUpdateProjectNote,
  adminDeleteProjectNote,
  adminCreateProjectContact,
  adminUpdateProjectContact,
  adminDeleteProjectContact,
} from "@/lib/admin.functions";
import {
  PROJECT_STATUS_VALUES,
  PROJECT_STATUS_LABEL,
  PROJECT_STATUS_COLOR,
  PROJECT_PRIORITY_VALUES,
  PROJECT_PRIORITY_LABEL,
  PROJECT_PRIORITY_COLOR,
  isProjectOverdue,
  projectProgress,
} from "@/lib/project-status";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/admin/projecten/$projectId")({
  head: () => ({ meta: [{ title: "Project — Admin — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AdminProjectDetailPage,
});

function AdminProjectDetailPage() {
  const { projectId } = useParams({ from: "/_authenticated/admin/projecten/$projectId" });
  const getProject = useServerFn(adminGetProject);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-project", projectId],
    queryFn: () => getProject({ data: { project_id: projectId } }),
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

  return <ProjectDetail data={data} projectId={projectId} />;
}

function ProjectDetail({ data, projectId }: { data: any; projectId: string }) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-project", projectId] });

  const project = data.project;
  const milestones = data.milestones ?? [];
  const progress = projectProgress(project, milestones);
  const overdue = isProjectOverdue(project.deadline, project.status);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm">
        <Link to="/admin/projecten" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Terug naar Projecten
        </Link>
      </div>

      <ProjectHeader project={project} progress={progress} overdue={overdue} onChanged={invalidate} />

      <Tabs defaultValue="overzicht">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="overzicht"><FileText className="w-3.5 h-3.5 mr-1.5" />Overzicht</TabsTrigger>
          <TabsTrigger value="tijdlijn"><Target className="w-3.5 h-3.5 mr-1.5" />Tijdlijn</TabsTrigger>
          <TabsTrigger value="activiteit"><Activity className="w-3.5 h-3.5 mr-1.5" />Activiteit</TabsTrigger>
          <TabsTrigger value="notities"><FileText className="w-3.5 h-3.5 mr-1.5" />Notities</TabsTrigger>
          <TabsTrigger value="contacten"><Users className="w-3.5 h-3.5 mr-1.5" />Contacten</TabsTrigger>
          <TabsTrigger value="instellingen"><Settings className="w-3.5 h-3.5 mr-1.5" />Instellingen</TabsTrigger>
        </TabsList>

        <TabsContent value="overzicht">
          <OverzichtTab project={project} milestones={milestones} notes={data.notes ?? []} />
        </TabsContent>
        <TabsContent value="tijdlijn">
          <MilestonesTab projectId={projectId} milestones={milestones} onChanged={invalidate} readOnly={false} />
        </TabsContent>
        <TabsContent value="activiteit">
          <ActivityTab activity={data.activity ?? []} />
        </TabsContent>
        <TabsContent value="notities">
          <NotesTab projectId={projectId} notes={data.notes ?? []} onChanged={invalidate} readOnly={false} />
        </TabsContent>
        <TabsContent value="contacten">
          <ContactsTab projectId={projectId} contacts={data.contacts ?? []} onChanged={invalidate} />
        </TabsContent>
        <TabsContent value="instellingen">
          <SettingsTab project={project} members={data.members ?? []} onChanged={invalidate} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProjectHeader({ project, progress, overdue, onChanged }: { project: any; progress: number | null; overdue: boolean; onChanged: () => void }) {
  const update = useServerFn(adminUpdateProject);
  const archive = useServerFn(adminArchiveProject);
  const del = useServerFn(adminDeleteProject);

  const updM = useMutation({
    mutationFn: (i: any) => update({ data: { project_id: project.id, ...i } }),
    onSuccess: () => { onChanged(); toast.success("Opgeslagen."); },
    onError: (e: any) => toast.error(e.message),
  });
  const archiveM = useMutation({
    mutationFn: (archived: boolean) => archive({ data: { project_id: project.id, archived } }),
    onSuccess: () => { onChanged(); toast.success(project.archived ? "Project hersteld." : "Project gearchiveerd."); },
    onError: (e: any) => toast.error(e.message),
  });
  const delM = useMutation({
    mutationFn: () => del({ data: { project_id: project.id } }),
    onSuccess: () => { toast.success("Project verwijderd."); window.location.href = "/admin/projecten"; },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2 min-w-0">
          <div className="flex items-center flex-wrap gap-2">
            <h1 className="font-display text-2xl font-bold truncate">{project.name}</h1>
            {project.archived && <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Gearchiveerd</span>}
          </div>
          <div className="flex items-center flex-wrap gap-3 text-sm">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PROJECT_STATUS_COLOR[project.status] ?? "bg-muted"}`}>
              {PROJECT_STATUS_LABEL[project.status] ?? project.status}
            </span>
            <span className={`text-xs font-medium ${PROJECT_PRIORITY_COLOR[project.priority] ?? ""}`}>
              {PROJECT_PRIORITY_LABEL[project.priority] ?? project.priority}
            </span>
            {project.deadline && (
              <span className={`flex items-center gap-1 text-xs ${overdue ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                <Calendar className="w-3.5 h-3.5" />
                {new Date(project.deadline).toLocaleDateString("nl-NL")}
                {overdue && <AlertTriangle className="w-3.5 h-3.5" />}
              </span>
            )}
            {project.website_url && (
              <a href={project.website_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                {project.website_url} ↗
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={project.status}
            onChange={(e) => updM.mutate({ status: e.target.value })}
            className="rounded-md border border-input bg-background px-2 py-1.5 text-sm"
          >
            {PROJECT_STATUS_VALUES.map((s) => <option key={s} value={s}>{PROJECT_STATUS_LABEL[s]}</option>)}
          </select>
          <select
            value={project.priority}
            onChange={(e) => updM.mutate({ priority: e.target.value })}
            className="rounded-md border border-input bg-background px-2 py-1.5 text-sm"
          >
            {PROJECT_PRIORITY_VALUES.map((p) => <option key={p} value={p}>{PROJECT_PRIORITY_LABEL[p]}</option>)}
          </select>
          <button
            onClick={() => archiveM.mutate(!project.archived)}
            disabled={archiveM.isPending}
            className="p-2 rounded-md border border-border hover:border-primary hover:text-primary transition-colors"
            title={project.archived ? "Herstellen" : "Archiveren"}
          >
            {project.archived ? <ArchiveRestore className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="p-2 rounded-md border border-border text-destructive hover:border-destructive transition-colors" title="Verwijderen">
                <Trash2 className="w-4 h-4" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Project verwijderen?</AlertDialogTitle>
                <AlertDialogDescription>
                  "{project.name}" en alle bijbehorende milestones, notities en contacten worden permanent verwijderd. Dit kan niet ongedaan worden gemaakt.
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
      </div>

      {progress !== null && (
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Voortgang{project.hours_estimated ? ` (${project.hours_spent ?? 0}/${project.hours_estimated} uur)` : ""}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full ${progress >= 100 ? "bg-emerald-500" : progress > 85 ? "bg-amber-500" : "bg-primary"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function OverzichtTab({ project, milestones, notes }: { project: any; milestones: any[]; notes: any[] }) {
  const doneMilestones = milestones.filter((m) => m.status === "done").length;
  const clientNotes = notes.filter((n) => n.is_client_visible);
  const runningDays = project.created_at ? Math.floor((Date.now() - new Date(project.created_at).getTime()) / 86400000) : null;

  return (
    <div className="space-y-4 mt-2">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
          <h3 className="font-semibold text-sm">Kerninfo</h3>
          <dl className="text-sm space-y-1">
            <div className="flex justify-between"><dt className="text-muted-foreground">Categorie</dt><dd>{project.category || "—"}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Website</dt><dd className="truncate max-w-[60%]">{project.website_url || "—"}</dd></div>
          </dl>
          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.map((t: string) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                  <Tag className="w-3 h-3" />{t}
                </span>
              ))}
            </div>
          )}
          {project.description && <p className="text-sm text-muted-foreground pt-2 whitespace-pre-wrap">{project.description}</p>}
        </div>

        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
          <h3 className="font-semibold text-sm">Statistieken</h3>
          <dl className="text-sm space-y-1">
            <div className="flex justify-between"><dt className="text-muted-foreground">Milestones</dt><dd>{doneMilestones}/{milestones.length} voltooid</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Notities</dt><dd>{notes.length}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Budget vs besteed</dt><dd>{project.hours_estimated ? `${project.hours_spent ?? 0}/${project.hours_estimated} uur` : "geen budget"}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Looptijd</dt><dd>{runningDays !== null ? `${runningDays} dagen` : "—"}</dd></div>
          </dl>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <h3 className="font-semibold text-sm">Klant-notities</h3>
        {clientNotes.length === 0 ? (
          <p className="text-sm text-muted-foreground">Geen klant-zichtbare notities.</p>
        ) : (
          <ul className="space-y-2">
            {clientNotes.slice(0, 5).map((n) => (
              <li key={n.id} className="text-sm border-l-2 border-primary/40 pl-3">
                <p className="whitespace-pre-wrap">{n.content}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{new Date(n.created_at).toLocaleString("nl-NL")}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function MilestonesTab({ projectId, milestones, onChanged, readOnly }: { projectId: string; milestones: any[]; onChanged: () => void; readOnly: boolean }) {
  const create = useServerFn(adminCreateProjectMilestone);
  const update = useServerFn(adminUpdateProjectMilestone);
  const del = useServerFn(adminDeleteProjectMilestone);

  const createM = useMutation({ mutationFn: (i: any) => create({ data: i }), onSuccess: () => { onChanged(); setShowAdd(false); setForm({ title: "", description: "", due_date: "" }); }, onError: (e: any) => toast.error(e.message) });
  const updateM = useMutation({ mutationFn: (i: any) => update({ data: i }), onSuccess: onChanged, onError: (e: any) => toast.error(e.message) });
  const delM = useMutation({ mutationFn: (i: any) => del({ data: i }), onSuccess: onChanged, onError: (e: any) => toast.error(e.message) });

  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", due_date: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", due_date: "" });

  const sorted = [...milestones].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const move = (idx: number, dir: -1 | 1) => {
    const other = sorted[idx + dir];
    const cur = sorted[idx];
    if (!other) return;
    updateM.mutate({ id: cur.id, project_id: projectId, order: other.order ?? 0 });
    updateM.mutate({ id: other.id, project_id: projectId, order: cur.order ?? 0 });
  };

  return (
    <div className="space-y-3 mt-2">
      {!readOnly && (
        <div className="flex justify-end">
          <button onClick={() => setShowAdd((s) => !s)} className="btn-primary text-sm">{showAdd ? "Annuleren" : "+ Milestone"}</button>
        </div>
      )}
      {!readOnly && showAdd && (
        <div className="rounded-lg border border-border p-4 space-y-3">
          <input placeholder="Titel" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <textarea placeholder="Beschrijving (optioneel)" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <button
            onClick={() => createM.mutate({ project_id: projectId, title: form.title, description: form.description || null, due_date: form.due_date || null, order: sorted.length })}
            disabled={!form.title || createM.isPending}
            className="btn-primary text-sm"
          >
            {createM.isPending ? "Bezig…" : "Toevoegen"}
          </button>
        </div>
      )}

      {sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nog geen milestones.</p>
      ) : (
        <ul className="space-y-2">
          {sorted.map((m, idx) => (
            <li key={m.id} className="rounded-lg border border-border bg-card p-3">
              {editId === m.id ? (
                <div className="space-y-2">
                  <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <textarea rows={2} value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <input type="date" value={editForm.due_date} onChange={(e) => setEditForm({ ...editForm, due_date: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <div className="flex gap-2">
                    <button
                      onClick={() => { updateM.mutate({ id: m.id, project_id: projectId, title: editForm.title, description: editForm.description || null, due_date: editForm.due_date || null }); setEditId(null); }}
                      className="btn-primary text-xs"
                    >Opslaan</button>
                    <button onClick={() => setEditId(null)} className="btn-secondary text-xs">Annuleren</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  {!readOnly && (
                    <button
                      onClick={() => updateM.mutate({ id: m.id, project_id: projectId, status: m.status === "done" ? "open" : "done" })}
                      className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${m.status === "done" ? "bg-primary border-primary text-primary-foreground" : "border-border"}`}
                    >
                      {m.status === "done" && <Check className="w-3 h-3" />}
                    </button>
                  )}
                  {readOnly && (
                    <span className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${m.status === "done" ? "bg-primary border-primary text-primary-foreground" : "border-border"}`}>
                      {m.status === "done" && <Check className="w-3 h-3" />}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${m.status === "done" ? "line-through text-muted-foreground" : ""}`}>{m.title}</p>
                    {m.description && <p className="text-xs text-muted-foreground mt-0.5">{m.description}</p>}
                    {m.due_date && <p className="text-xs text-muted-foreground mt-0.5">Deadline: {new Date(m.due_date).toLocaleDateString("nl-NL")}</p>}
                  </div>
                  {!readOnly && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => move(idx, -1)} disabled={idx === 0} className="p-1 rounded hover:bg-muted disabled:opacity-30"><ArrowUp className="w-3.5 h-3.5" /></button>
                      <button onClick={() => move(idx, 1)} disabled={idx === sorted.length - 1} className="p-1 rounded hover:bg-muted disabled:opacity-30"><ArrowDown className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { setEditId(m.id); setEditForm({ title: m.title, description: m.description ?? "", due_date: m.due_date ?? "" }); }} className="p-1 rounded hover:bg-muted"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { if (confirm("Milestone verwijderen?")) delM.mutate({ id: m.id, project_id: projectId }); }} className="p-1 rounded hover:bg-muted text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ActivityTab({ activity }: { activity: any[] }) {
  const [filter, setFilter] = useState("");
  const actions = Array.from(new Set(activity.map((a) => a.action))).sort();
  const filtered = filter ? activity.filter((a) => a.action === filter) : activity;

  return (
    <div className="space-y-3 mt-2">
      {actions.length > 0 && (
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="">Alle acties</option>
          {actions.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      )}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nog geen activiteit.</p>
      ) : (
        <ul className="space-y-2">
          {filtered.map((a) => (
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
  );
}

function NotesTab({ projectId, notes, onChanged, readOnly }: { projectId: string; notes: any[]; onChanged: () => void; readOnly: boolean }) {
  const create = useServerFn(adminCreateProjectNote);
  const update = useServerFn(adminUpdateProjectNote);
  const del = useServerFn(adminDeleteProjectNote);

  const createM = useMutation({ mutationFn: (i: any) => create({ data: i }), onSuccess: () => { onChanged(); setBody(""); }, onError: (e: any) => toast.error(e.message) });
  const updateM = useMutation({ mutationFn: (i: any) => update({ data: i }), onSuccess: onChanged, onError: (e: any) => toast.error(e.message) });
  const delM = useMutation({ mutationFn: (i: any) => del({ data: i }), onSuccess: onChanged, onError: (e: any) => toast.error(e.message) });

  const [body, setBody] = useState("");
  const [clientVisible, setClientVisible] = useState(false);
  const list = readOnly ? notes.filter((n) => n.is_client_visible) : notes;

  return (
    <div className="space-y-3 mt-2">
      {!readOnly && (
        <div className="rounded-lg border border-border p-4 space-y-2">
          <textarea placeholder="Nieuwe notitie…" rows={3} value={body} onChange={(e) => setBody(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={clientVisible} onChange={(e) => setClientVisible(e.target.checked)} />
              Klant-zichtbaar
            </label>
            <button
              onClick={() => createM.mutate({ project_id: projectId, content: body, is_client_visible: clientVisible })}
              disabled={!body.trim() || createM.isPending}
              className="btn-primary text-sm"
            >
              {createM.isPending ? "Bezig…" : "Toevoegen"}
            </button>
          </div>
        </div>
      )}

      {list.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nog geen notities.</p>
      ) : (
        <ul className="space-y-2">
          {list.map((n) => (
            <li key={n.id} className="rounded-lg border border-border bg-card p-3">
              <p className="text-sm whitespace-pre-wrap">{n.content}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">{new Date(n.created_at).toLocaleString("nl-NL")}</span>
                {!readOnly && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateM.mutate({ id: n.id, project_id: projectId, is_client_visible: !n.is_client_visible })}
                      className={`text-xs ${n.is_client_visible ? "text-primary" : "text-muted-foreground"} hover:underline`}
                    >
                      {n.is_client_visible ? "Klant-zichtbaar" : "Intern"}
                    </button>
                    <button onClick={() => { if (confirm("Notitie verwijderen?")) delM.mutate({ id: n.id, project_id: projectId }); }} className="text-xs text-destructive hover:underline">Verwijder</button>
                  </div>
                )}
                {readOnly && <span className="text-xs text-primary">Klant-zichtbaar</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ContactsTab({ projectId, contacts, onChanged }: { projectId: string; contacts: any[]; onChanged: () => void }) {
  const create = useServerFn(adminCreateProjectContact);
  const update = useServerFn(adminUpdateProjectContact);
  const del = useServerFn(adminDeleteProjectContact);

  const createM = useMutation({ mutationFn: (i: any) => create({ data: i }), onSuccess: () => { onChanged(); setShowAdd(false); setForm({ name: "", role: "", email: "", phone: "" }); }, onError: (e: any) => toast.error(e.message) });
  const updateM = useMutation({ mutationFn: (i: any) => update({ data: i }), onSuccess: () => { onChanged(); setEditId(null); }, onError: (e: any) => toast.error(e.message) });
  const delM = useMutation({ mutationFn: (i: any) => del({ data: i }), onSuccess: onChanged, onError: (e: any) => toast.error(e.message) });

  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", email: "", phone: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", role: "", email: "", phone: "" });

  return (
    <div className="space-y-3 mt-2">
      <div className="flex justify-end">
        <button onClick={() => setShowAdd((s) => !s)} className="btn-primary text-sm">{showAdd ? "Annuleren" : "+ Contact"}</button>
      </div>
      {showAdd && (
        <div className="rounded-lg border border-border p-4 grid sm:grid-cols-2 gap-3">
          <input placeholder="Naam" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input placeholder="Rol" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input placeholder="Telefoon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <button
            onClick={() => createM.mutate({ project_id: projectId, name: form.name, role: form.role || null, email: form.email || null, phone: form.phone || null })}
            disabled={!form.name || createM.isPending}
            className="btn-primary text-sm sm:col-span-2"
          >
            {createM.isPending ? "Bezig…" : "Toevoegen"}
          </button>
        </div>
      )}

      {contacts.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nog geen contacten.</p>
      ) : (
        <ul className="space-y-2">
          {contacts.map((c) => (
            <li key={c.id} className="rounded-lg border border-border bg-card p-3">
              {editId === c.id ? (
                <div className="grid sm:grid-cols-2 gap-2">
                  <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <input value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  <div className="sm:col-span-2 flex gap-2">
                    <button
                      onClick={() => updateM.mutate({ id: c.id, project_id: projectId, name: editForm.name, role: editForm.role || null, email: editForm.email || null, phone: editForm.phone || null })}
                      className="btn-primary text-xs"
                    >Opslaan</button>
                    <button onClick={() => setEditId(null)} className="btn-secondary text-xs">Annuleren</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm">
                    <p className="font-medium">{c.name} {c.role && <span className="text-muted-foreground font-normal">— {c.role}</span>}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{[c.email, c.phone].filter(Boolean).join(" · ") || "—"}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => { setEditId(c.id); setEditForm({ name: c.name, role: c.role ?? "", email: c.email ?? "", phone: c.phone ?? "" }); }} className="p-1 rounded hover:bg-muted"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => { if (confirm("Contact verwijderen?")) delM.mutate({ id: c.id, project_id: projectId }); }} className="p-1 rounded hover:bg-muted text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SettingsTab({ project, members, onChanged }: { project: any; members: any[]; onChanged: () => void }) {
  const update = useServerFn(adminUpdateProject);
  const listCustomers = useServerFn(adminListWebsiteLinks);
  const setMembers = useServerFn(adminSetProjectMembers);

  const { data: customersData } = useQuery({ queryKey: ["admin-website-links"], queryFn: () => listCustomers({}) });
  const customers = customersData?.items ?? [];

  const updateM = useMutation({ mutationFn: (i: any) => update({ data: { project_id: project.id, ...i } }), onSuccess: () => { onChanged(); toast.success("Opgeslagen."); }, onError: (e: any) => toast.error(e.message) });
  const membersM = useMutation({ mutationFn: (i: any) => setMembers({ data: i }), onSuccess: () => { onChanged(); toast.success("Toegang bijgewerkt."); }, onError: (e: any) => toast.error(e.message) });

  const [form, setForm] = useState({
    name: project.name ?? "",
    website_url: project.website_url ?? "",
    description: project.description ?? "",
    category: project.category ?? "",
    deadline: project.deadline ?? "",
    hours_estimated: project.hours_estimated ?? "",
    tagsInput: (project.tags ?? []).join(", "),
  });
  const [memberIds, setMemberIds] = useState<string[]>(members.filter((m: any) => m.id !== project.primary_user_id).map((m: any) => m.id));

  return (
    <div className="space-y-6 mt-2 max-w-2xl">
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-sm">Project bewerken</h3>
        <label className="block text-sm">
          <span className="text-muted-foreground">Naam</span>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Website URL</span>
          <input value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Beschrijving</span>
          <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block text-sm">
            <span className="text-muted-foreground">Categorie</span>
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Deadline</span>
            <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Budget uren</span>
            <input type="number" min={0} value={form.hours_estimated} onChange={(e) => setForm({ ...form, hours_estimated: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Tags (komma-gescheiden)</span>
            <input value={form.tagsInput} onChange={(e) => setForm({ ...form, tagsInput: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </label>
        </div>
        <button
          onClick={() => updateM.mutate({
            name: form.name,
            website_url: form.website_url || null,
            description: form.description || null,
            category: form.category || null,
            deadline: form.deadline || null,
            hours_estimated: form.hours_estimated === "" ? null : Number(form.hours_estimated),
            tags: form.tagsInput.split(",").map((t: string) => t.trim()).filter(Boolean),
          })}
          disabled={updateM.isPending}
          className="btn-primary text-sm"
        >
          {updateM.isPending ? "Bezig…" : "Opslaan"}
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-sm">Toegang beheren</h3>
        <p className="text-xs text-muted-foreground">Hoofdklant kan hier niet worden ontkoppeld.</p>
        <div className="max-h-48 overflow-y-auto rounded-md border border-border p-2 space-y-1">
          {customers.filter((c: any) => c.id !== project.primary_user_id).map((c: any) => (
            <label key={c.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={memberIds.includes(c.id)}
                onChange={(e) => setMemberIds(e.target.checked ? [...memberIds, c.id] : memberIds.filter((id) => id !== c.id))}
              />
              {c.full_name || c.email}
            </label>
          ))}
        </div>
        <button onClick={() => membersM.mutate({ project_id: project.id, member_ids: memberIds })} disabled={membersM.isPending} className="btn-secondary text-sm">
          {membersM.isPending ? "Bezig…" : "Toegang opslaan"}
        </button>
      </div>
    </div>
  );
}
