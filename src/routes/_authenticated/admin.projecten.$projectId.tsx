import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import {
  ChevronLeft, Plus, Trash2, Pencil, Check, X,
  Archive, ArchiveRestore, AlertTriangle, Calendar, FileText,
  Activity, Users, Settings, Tag, ListTodo, Clock, GitBranch, Download,
} from "lucide-react";
import {
  adminGetProject,
  adminUpdateProject,
  adminArchiveProject,
  adminDeleteProject,
  adminListWebsiteLinks,
  adminSetProjectMembers,
  adminCreateProjectNote,
  adminUpdateProjectNote,
  adminDeleteProjectNote,
  adminCreateProjectContact,
  adminUpdateProjectContact,
  adminDeleteProjectContact,
  adminListProjectTasks,
  adminCreateProjectTask,
  adminUpdateProjectTask,
  adminDeleteProjectTask,
  adminListProjectTimeEntries,
  adminCreateProjectTimeEntry,
  adminDeleteProjectTimeEntry,
  adminExportProjectTimeEntriesCsv,
  adminListStaff,
} from "@/lib/admin.functions";
import { STATUS_LABEL, STATUS_COLOR, PRIORITY_LABEL } from "@/lib/status";
import {
  PROJECT_STATUS_VALUES,
  PROJECT_STATUS_LABEL,
  PROJECT_STATUS_COLOR,
  PROJECT_PRIORITY_VALUES,
  PROJECT_PRIORITY_LABEL,
  PROJECT_PRIORITY_COLOR,
  isProjectOverdue,
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

  const project = { ...data.project, primary_customer: data.primary_customer ?? null };
  const overdue = isProjectOverdue(project.deadline, project.status);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm">
        <Link to="/admin/projecten" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Terug naar Projecten
        </Link>
      </div>

      <ProjectHeader project={project} overdue={overdue} onChanged={invalidate} />

      <Tabs defaultValue="overzicht">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="overzicht"><FileText className="w-3.5 h-3.5 mr-1.5" />Overzicht</TabsTrigger>
          <TabsTrigger value="taken"><ListTodo className="w-3.5 h-3.5 mr-1.5" />Taken</TabsTrigger>
          <TabsTrigger value="tijd"><Clock className="w-3.5 h-3.5 mr-1.5" />Tijd</TabsTrigger>
          <TabsTrigger value="changes"><GitBranch className="w-3.5 h-3.5 mr-1.5" />Changes</TabsTrigger>
          <TabsTrigger value="activiteit"><Activity className="w-3.5 h-3.5 mr-1.5" />Activiteit</TabsTrigger>
          <TabsTrigger value="notities"><FileText className="w-3.5 h-3.5 mr-1.5" />Notities</TabsTrigger>
          <TabsTrigger value="contacten"><Users className="w-3.5 h-3.5 mr-1.5" />Contacten</TabsTrigger>
          <TabsTrigger value="instellingen"><Settings className="w-3.5 h-3.5 mr-1.5" />Instellingen</TabsTrigger>
        </TabsList>

        <TabsContent value="overzicht">
          <OverzichtTab project={project} notes={data.notes ?? []} members={data.members ?? []} />
        </TabsContent>
        <TabsContent value="taken">
          <TasksTab projectId={projectId} />
        </TabsContent>
        <TabsContent value="tijd">
          <TimeTab projectId={projectId} />
        </TabsContent>
        <TabsContent value="changes">
          <ChangesTab changeRequests={data.changeRequests ?? []} />
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

function ProjectHeader({ project, overdue, onChanged }: { project: any; overdue: boolean; onChanged: () => void }) {
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
                  "{project.name}" en alle bijbehorende taken, notities en contacten worden permanent verwijderd. Dit kan niet ongedaan worden gemaakt.
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

    </div>
  );
}

function OverzichtTab({ project, notes, members }: { project: any; notes: any[]; members: any[] }) {
  const clientNotes = notes.filter((n) => n.is_client_visible);
  const runningDays = project.created_at ? Math.floor((Date.now() - new Date(project.created_at).getTime()) / 86400000) : null;
  const primary = project.primary_customer;
  const extraMembers = members.filter((m: any) => m.id !== project.primary_user_id);

  return (
    <div className="space-y-4 mt-2">
      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Gekoppelde klanten</h3>
          <span className="text-xs text-muted-foreground">Beheer via tabblad "Instellingen"</span>
        </div>
        <ul className="space-y-1.5 pt-1">
          {primary && (
            <li className="flex items-center justify-between text-sm rounded-md bg-primary/10 px-2.5 py-1.5">
              <span>
                <span className="font-medium text-primary">{primary.full_name || "—"}</span>
                <span className="text-muted-foreground"> · {primary.email}</span>
              </span>
              <span className="text-xs text-primary shrink-0 ml-2">Hoofdklant</span>
            </li>
          )}
          {extraMembers.map((m: any) => (
            <li key={m.id} className="flex items-center justify-between text-sm rounded-md bg-muted px-2.5 py-1.5">
              <span>
                <span className="font-medium">{m.full_name || "—"}</span>
                <span className="text-muted-foreground"> · {m.email}</span>
              </span>
            </li>
          ))}
          {!primary && extraMembers.length === 0 && (
            <li className="text-sm text-muted-foreground">Geen klanten gekoppeld.</li>
          )}
        </ul>
      </div>

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
  const [customerSearch, setCustomerSearch] = useState("");

  const setAndSave = (ids: string[]) => {
    setMemberIds(ids);
    membersM.mutate({ project_id: project.id, member_ids: ids });
  };

  const linkedCustomers = customers.filter((c: any) => memberIds.includes(c.id));
  const unlinkedCustomers = customers.filter((c: any) => c.id !== project.primary_user_id && !memberIds.includes(c.id) && (
    !customerSearch || (c.full_name ?? "").toLowerCase().includes(customerSearch.toLowerCase()) || (c.email ?? "").toLowerCase().includes(customerSearch.toLowerCase())
  ));

  const [showChangePrimary, setShowChangePrimary] = useState(false);
  const [newPrimaryId, setNewPrimaryId] = useState("");

  const makePrimary = (userId: string) => {
    const oldPrimaryId = project.primary_user_id;
    updateM.mutate({ primary_user_id: userId });
    const nextMemberIds = [...memberIds.filter((id) => id !== userId), oldPrimaryId].filter(Boolean);
    setAndSave(nextMemberIds);
    setShowChangePrimary(false);
    setNewPrimaryId("");
  };

  return (
    <div className="space-y-6 mt-2 max-w-2xl">
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-3">
        <h3 className="font-semibold text-sm">Klanten koppelen (toegang tot dit project)</h3>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Hoofdklant: <span className="font-medium text-foreground">{project.primary_customer?.full_name || "—"}</span>
            {project.primary_customer?.email && <span> · {project.primary_customer.email}</span>}
          </p>
          <button onClick={() => setShowChangePrimary((s) => !s)} className="text-xs text-primary hover:underline shrink-0">
            {showChangePrimary ? "Annuleren" : "Wijzig hoofdklant"}
          </button>
        </div>
        {showChangePrimary && (
          <div className="flex items-center gap-2">
            <select value={newPrimaryId} onChange={(e) => setNewPrimaryId(e.target.value)} className="flex-1 rounded-md border border-input bg-background px-2 py-2 text-sm">
              <option value="">Kies nieuwe hoofdklant…</option>
              {customers.filter((c: any) => c.id !== project.primary_user_id).map((c: any) => (
                <option key={c.id} value={c.id}>{c.full_name || c.email} ({c.email})</option>
              ))}
            </select>
            <button onClick={() => newPrimaryId && makePrimary(newPrimaryId)} disabled={!newPrimaryId || updateM.isPending} className="btn-primary text-sm shrink-0">
              Bevestigen
            </button>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Een project heeft altijd één hoofdklant. Om de huidige hoofdklant te "ontkoppelen", wijs je hierboven een andere klant als hoofdklant aan — de oude hoofdklant wordt dan automatisch een gewone gekoppelde klant (hieronder), tenzij je die daar ook verwijdert.
        </p>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1.5">Gekoppelde klanten ({linkedCustomers.length})</p>
          {linkedCustomers.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nog geen extra klanten gekoppeld.</p>
          ) : (
            <ul className="space-y-1">
              {linkedCustomers.map((c: any) => (
                <li key={c.id} className="flex items-center justify-between text-sm rounded-md bg-background border border-border px-2.5 py-1.5">
                  <span>
                    <span className="font-medium">{c.full_name || "—"}</span>
                    <span className="text-muted-foreground"> · {c.email}</span>
                  </span>
                  <span className="flex items-center gap-3 shrink-0 ml-2">
                    <button
                      onClick={() => makePrimary(c.id)}
                      disabled={updateM.isPending}
                      className="text-xs text-primary hover:underline"
                    >
                      Maak hoofdklant
                    </button>
                    <button
                      onClick={() => setAndSave(memberIds.filter((id) => id !== c.id))}
                      disabled={membersM.isPending}
                      className="text-xs text-destructive hover:underline"
                    >
                      Ontkoppelen
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1.5">Klant koppelen</p>
          <input
            placeholder="Zoeken op naam of e-mailadres…"
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
            className="mb-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <div className="max-h-48 overflow-y-auto rounded-md border border-border bg-background p-1 space-y-1">
            {unlinkedCustomers.map((c: any) => (
              <div key={c.id} className="flex items-center justify-between text-sm px-1.5 py-1.5 rounded hover:bg-muted/50">
                <span>
                  <span className="font-medium">{c.full_name || "—"}</span>
                  <span className="text-muted-foreground"> · {c.email}</span>
                </span>
                <button
                  onClick={() => setAndSave([...memberIds, c.id])}
                  disabled={membersM.isPending}
                  className="text-xs text-primary hover:underline shrink-0 ml-2"
                >
                  Koppelen
                </button>
              </div>
            ))}
            {customers.length === 0 && <p className="text-sm text-muted-foreground p-2">Klantenlijst wordt geladen…</p>}
            {customers.length > 0 && unlinkedCustomers.length === 0 && <p className="text-sm text-muted-foreground p-2">Geen (overige) klanten gevonden.</p>}
          </div>
        </div>
      </div>

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
    </div>
  );
}

// ---------- Taken ----------

const RECURRENCE_LABEL: Record<string, string> = { weekly: "Wekelijks", monthly: "Maandelijks", quarterly: "Per kwartaal" };

function TasksTab({ projectId }: { projectId: string }) {
  const list = useServerFn(adminListProjectTasks);
  const create = useServerFn(adminCreateProjectTask);
  const update = useServerFn(adminUpdateProjectTask);
  const del = useServerFn(adminDeleteProjectTask);
  const listStaff = useServerFn(adminListStaff);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["admin-project-tasks", projectId], queryFn: () => list({ data: { project_id: projectId } }) });
  const { data: staffData } = useQuery({ queryKey: ["admin-team"], queryFn: () => listStaff({}) });
  const staff = (staffData as any)?.members ?? [];

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-project-tasks", projectId] });
  const createM = useMutation({
    mutationFn: (i: any) => create({ data: i }),
    onSuccess: () => { invalidate(); setShowAdd(false); setForm({ title: "", description: "", assigned_to: "", due_date: "", recurrence: "" }); },
    onError: (e: any) => toast.error(e.message),
  });
  const updateM = useMutation({ mutationFn: (i: any) => update({ data: i }), onSuccess: invalidate, onError: (e: any) => toast.error(e.message) });
  const delM = useMutation({ mutationFn: (i: any) => del({ data: i }), onSuccess: invalidate, onError: (e: any) => toast.error(e.message) });

  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", assigned_to: "", due_date: "", recurrence: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", assigned_to: "", due_date: "" });

  if (isLoading) return <p className="text-sm text-muted-foreground mt-2">Laden…</p>;
  const tasks: any[] = data?.items ?? [];
  const templates = tasks.filter((t) => t.recurrence && !t.recurrence_parent_id);
  const instancesByParent: Record<string, any[]> = {};
  for (const t of tasks) if (t.recurrence_parent_id) (instancesByParent[t.recurrence_parent_id] ??= []).push(t);
  const standalone = tasks.filter((t) => !t.recurrence && !t.recurrence_parent_id);

  const staffName = (id: string | null) => staff.find((s: any) => s.id === id)?.full_name ?? staff.find((s: any) => s.id === id)?.email ?? "—";

  const renderTask = (t: any, isInstance = false) => (
    <li key={t.id} className={`rounded-lg border border-border bg-card p-3 ${isInstance ? "ml-6" : ""}`}>
      {editId === t.id ? (
        <div className="space-y-2">
          <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <textarea rows={2} value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <div className="grid sm:grid-cols-2 gap-2">
            <select value={editForm.assigned_to} onChange={(e) => setEditForm({ ...editForm, assigned_to: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Niet toegewezen</option>
              {staff.map((s: any) => <option key={s.id} value={s.id}>{s.full_name || s.email}</option>)}
            </select>
            <input type="date" value={editForm.due_date} onChange={(e) => setEditForm({ ...editForm, due_date: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { updateM.mutate({ id: t.id, project_id: projectId, title: editForm.title, description: editForm.description || null, assigned_to: editForm.assigned_to || null, due_date: editForm.due_date || null }); setEditId(null); }}
              className="btn-primary text-xs"
            >Opslaan</button>
            <button onClick={() => setEditId(null)} className="btn-secondary text-xs">Annuleren</button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <button
            onClick={() => updateM.mutate({ id: t.id, project_id: projectId, status: t.status === "done" ? "open" : "done" })}
            className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${t.status === "done" ? "bg-primary border-primary text-primary-foreground" : "border-border"}`}
          >
            {t.status === "done" && <Check className="w-3 h-3" />}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2">
              <p className={`text-sm font-medium ${t.status === "done" ? "line-through text-muted-foreground" : ""}`}>{t.title}</p>
              {t.recurrence && !t.recurrence_parent_id && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/30 text-secondary-foreground">Terugkerend: {RECURRENCE_LABEL[t.recurrence] ?? t.recurrence}</span>
              )}
            </div>
            {t.description && <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>}
            <p className="text-xs text-muted-foreground mt-0.5">
              {t.assigned_to ? `Toegewezen aan: ${staffName(t.assigned_to)}` : "Niet toegewezen"}
              {t.due_date && ` · Deadline: ${new Date(t.due_date).toLocaleDateString("nl-NL")}`}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => { setEditId(t.id); setEditForm({ title: t.title, description: t.description ?? "", assigned_to: t.assigned_to ?? "", due_date: t.due_date ?? "" }); }} className="p-1 rounded hover:bg-muted"><Pencil className="w-3.5 h-3.5" /></button>
            <button onClick={() => { if (confirm("Taak verwijderen?")) delM.mutate({ id: t.id, project_id: projectId }); }} className="p-1 rounded hover:bg-muted text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      )}
    </li>
  );

  return (
    <div className="space-y-3 mt-2">
      <div className="flex justify-end">
        <button onClick={() => setShowAdd((s) => !s)} className="btn-primary text-sm">{showAdd ? "Annuleren" : "+ Taak"}</button>
      </div>
      {showAdd && (
        <div className="rounded-lg border border-border p-4 space-y-3">
          <input placeholder="Titel" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <textarea placeholder="Beschrijving (optioneel)" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <div className="grid sm:grid-cols-3 gap-2">
            <select value={form.assigned_to} onChange={(e) => setForm({ ...form, assigned_to: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Niet toegewezen</option>
              {staff.map((s: any) => <option key={s.id} value={s.id}>{s.full_name || s.email}</option>)}
            </select>
            <input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <select value={form.recurrence} onChange={(e) => setForm({ ...form, recurrence: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Geen herhaling</option>
              <option value="weekly">Wekelijks</option>
              <option value="monthly">Maandelijks</option>
              <option value="quarterly">Per kwartaal</option>
            </select>
          </div>
          <button
            onClick={() => createM.mutate({
              project_id: projectId, title: form.title, description: form.description || null,
              assigned_to: form.assigned_to || null, due_date: form.due_date || null,
              recurrence: form.recurrence || null,
            })}
            disabled={!form.title || createM.isPending}
            className="btn-primary text-sm"
          >
            {createM.isPending ? "Bezig…" : "Toevoegen"}
          </button>
        </div>
      )}

      {tasks.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nog geen taken.</p>
      ) : (
        <ul className="space-y-2">
          {[...standalone, ...templates].map((t) => (
            <Fragment key={t.id}>
              {renderTask(t)}
              {(instancesByParent[t.id] ?? []).map((inst) => renderTask(inst, true))}
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------- Tijd ----------

function TimeTab({ projectId }: { projectId: string }) {
  const list = useServerFn(adminListProjectTimeEntries);
  const create = useServerFn(adminCreateProjectTimeEntry);
  const del = useServerFn(adminDeleteProjectTimeEntry);
  const exportCsv = useServerFn(adminExportProjectTimeEntriesCsv);
  const listTasks = useServerFn(adminListProjectTasks);
  const listStaff = useServerFn(adminListStaff);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["admin-project-time", projectId], queryFn: () => list({ data: { project_id: projectId } }) });
  const { data: tasksData } = useQuery({ queryKey: ["admin-project-tasks", projectId], queryFn: () => listTasks({ data: { project_id: projectId } }) });
  const { data: staffData } = useQuery({ queryKey: ["admin-team"], queryFn: () => listStaff({}) });
  const staff = (staffData as any)?.members ?? [];
  const tasks = tasksData?.items ?? [];

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-project-time", projectId] });
  const createM = useMutation({
    mutationFn: (i: any) => create({ data: i }),
    onSuccess: () => { invalidate(); setForm({ ...form, minutes: "", description: "" }); },
    onError: (e: any) => toast.error(e.message),
  });
  const delM = useMutation({ mutationFn: (i: any) => del({ data: i }), onSuccess: invalidate, onError: (e: any) => toast.error(e.message) });
  const exportM = useMutation({
    mutationFn: () => exportCsv({ data: { project_id: projectId } }),
    onSuccess: (res: any) => {
      const blob = new Blob([res.csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tijdregistratie-${projectId}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const [form, setForm] = useState({
    user_id: "", task_id: "", minutes: "", description: "",
    entry_date: new Date().toISOString().slice(0, 10), billable: true,
  });

  if (isLoading) return <p className="text-sm text-muted-foreground mt-2">Laden…</p>;
  const entries: any[] = data?.items ?? [];
  const totalMinutes = entries.reduce((sum, e) => sum + (e.minutes ?? 0), 0);
  const sorted = [...entries].sort((a, b) => new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime());

  return (
    <div className="space-y-4 mt-2">
      <div className="rounded-lg border border-border p-4 space-y-3">
        <h3 className="font-semibold text-sm">Tijd registreren</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <select value={form.user_id} onChange={(e) => setForm({ ...form, user_id: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="">Ingelogde admin</option>
            {staff.map((s: any) => <option key={s.id} value={s.id}>{s.full_name || s.email}</option>)}
          </select>
          <select value={form.task_id} onChange={(e) => setForm({ ...form, task_id: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="">Geen gekoppelde taak</option>
            {tasks.map((t: any) => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
          <input type="number" min={1} placeholder="Minuten" value={form.minutes} onChange={(e) => setForm({ ...form, minutes: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input type="date" value={form.entry_date} onChange={(e) => setForm({ ...form, entry_date: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </div>
        <textarea placeholder="Omschrijving (optioneel)" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.billable} onChange={(e) => setForm({ ...form, billable: e.target.checked })} />
          Facturabel
        </label>
        <button
          onClick={() => createM.mutate({
            project_id: projectId,
            user_id: form.user_id || undefined,
            task_id: form.task_id || null,
            minutes: Number(form.minutes),
            description: form.description || null,
            entry_date: form.entry_date,
            billable: form.billable,
          })}
          disabled={!form.minutes || Number(form.minutes) <= 0 || createM.isPending}
          className="btn-primary text-sm"
        >
          {createM.isPending ? "Bezig…" : "Registreren"}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Totaal: <span className="font-semibold text-foreground">{(totalMinutes / 60).toFixed(1)} uur</span> ({entries.length} registraties)</p>
        <button onClick={() => exportM.mutate()} disabled={exportM.isPending || entries.length === 0} className="btn-secondary text-sm flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" /> {exportM.isPending ? "Bezig…" : "Exporteer CSV"}
        </button>
      </div>

      {sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nog geen tijdregistraties.</p>
      ) : (
        <ul className="space-y-2">
          {sorted.map((e: any) => (
            <li key={e.id} className="rounded-lg border border-border bg-card p-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {new Date(e.entry_date).toLocaleDateString("nl-NL")} · {(e.minutes / 60).toFixed(1)}u · {e.user?.full_name ?? e.user?.email ?? "onbekend"}
                  {e.billable === false && <span className="ml-2 text-xs text-muted-foreground">(niet-facturabel)</span>}
                </p>
                {e.task && <p className="text-xs text-muted-foreground mt-0.5">Taak: {e.task.title}</p>}
                {e.description && <p className="text-xs text-muted-foreground mt-0.5">{e.description}</p>}
              </div>
              <button onClick={() => { if (confirm("Registratie verwijderen?")) delM.mutate({ id: e.id, project_id: projectId }); }} className="p-1 rounded hover:bg-muted text-destructive shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------- Changes ----------

function ChangesTab({ changeRequests }: { changeRequests: any[] }) {
  if (changeRequests.length === 0) return <p className="text-sm text-muted-foreground mt-2">Geen changes gekoppeld aan dit project.</p>;
  return (
    <ul className="space-y-2 mt-2">
      {changeRequests.map((c: any) => (
        <li key={c.id} className="rounded-lg border border-border bg-card p-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{c.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {c.request_number ? `#${c.request_number} · ` : ""}
              {new Date(c.created_at).toLocaleDateString("nl-NL")}
              {c.priority && ` · ${PRIORITY_LABEL[c.priority] ?? c.priority}`}
            </p>
          </div>
          <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOR[c.status] ?? "bg-muted"}`}>
            {STATUS_LABEL[c.status] ?? c.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
