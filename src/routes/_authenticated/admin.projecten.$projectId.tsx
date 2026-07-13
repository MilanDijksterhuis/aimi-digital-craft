import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, Plus } from "lucide-react";
import {
  getProjectDetail,
  adminUpdateProjectDetail,
  adminUpdateProjectStatus,
  adminUpdateProjectPriority,
  createMilestone,
  updateMilestone,
  toggleMilestone,
  deleteMilestone,
  createProjectNote,
  deleteProjectNote,
  createProjectContact,
  deleteProjectContact,
  adminDeleteProjectDetail,
} from "@/lib/project-detail.functions";
import {
  StatusBadge,
  PriorityBadge,
  ProgressBar,
  DeadlineBadge,
  StatusPipeline,
  MilestoneTimeline,
  ActivityLog,
  NotesPanel,
  STATUS_LABEL,
  PRIORITY_LABEL,
  type ProjectStatus,
  type ProjectPriority,
} from "@/components/project/shared";

export const Route = createFileRoute("/_authenticated/admin/projecten/$projectId")({
  head: () => ({ meta: [{ title: "Project — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: AdminProjectDetailPage,
});

type Tab = "overzicht" | "tijdlijn" | "activiteit" | "notities" | "contacten" | "instellingen";

function AdminProjectDetailPage() {
  const { projectId } = Route.useParams();
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>("overzicht");

  const fetchDetail = useServerFn(getProjectDetail);
  const updateDetail = useServerFn(adminUpdateProjectDetail);
  const updateStatus = useServerFn(adminUpdateProjectStatus);
  const updatePriority = useServerFn(adminUpdateProjectPriority);
  const addMilestone = useServerFn(createMilestone);
  const editMilestone = useServerFn(updateMilestone);
  const toggleMs = useServerFn(toggleMilestone);
  const removeMilestone = useServerFn(deleteMilestone);
  const addNote = useServerFn(createProjectNote);
  const removeNote = useServerFn(deleteProjectNote);
  const addContact = useServerFn(createProjectContact);
  const removeContact = useServerFn(deleteProjectContact);
  const deleteProject = useServerFn(adminDeleteProjectDetail);

  const { data, isLoading, error } = useQuery({
    queryKey: ["project-detail", projectId],
    queryFn: () => fetchDetail({ data: { project_id: projectId } }),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["project-detail", projectId] });

  const statusM = useMutation({
    mutationFn: (status: ProjectStatus) => updateStatus({ data: { project_id: projectId, status } }),
    onSuccess: () => { invalidate(); toast.success("Status bijgewerkt."); },
    onError: (e: any) => toast.error(e.message),
  });
  const priorityM = useMutation({
    mutationFn: (priority: ProjectPriority) => updatePriority({ data: { project_id: projectId, priority } }),
    onSuccess: () => { invalidate(); toast.success("Prioriteit bijgewerkt."); },
    onError: (e: any) => toast.error(e.message),
  });
  const detailM = useMutation({
    mutationFn: (fields: any) => updateDetail({ data: { project_id: projectId, ...fields } }),
    onSuccess: () => { invalidate(); toast.success("Opgeslagen."); },
    onError: (e: any) => toast.error(e.message),
  });
  const msAddM = useMutation({
    mutationFn: (i: any) => addMilestone({ data: { project_id: projectId, ...i } }),
    onSuccess: () => { invalidate(); toast.success("Milestone toegevoegd."); },
    onError: (e: any) => toast.error(e.message),
  });
  const msEditM = useMutation({
    mutationFn: (i: any) => editMilestone({ data: { project_id: projectId, ...i } }),
    onSuccess: () => { invalidate(); toast.success("Milestone bijgewerkt."); },
    onError: (e: any) => toast.error(e.message),
  });
  const msToggleM = useMutation({
    mutationFn: (i: { milestone_id: string; completed: boolean }) =>
      toggleMs({ data: { project_id: projectId, ...i } }),
    onSuccess: () => invalidate(),
    onError: (e: any) => toast.error(e.message),
  });
  const msDeleteM = useMutation({
    mutationFn: (milestone_id: string) => removeMilestone({ data: { project_id: projectId, milestone_id } }),
    onSuccess: () => { invalidate(); toast.success("Milestone verwijderd."); },
    onError: (e: any) => toast.error(e.message),
  });
  const noteAddM = useMutation({
    mutationFn: (i: { content: string; is_client_visible: boolean }) =>
      addNote({ data: { project_id: projectId, ...i } }),
    onSuccess: () => { invalidate(); toast.success("Notitie toegevoegd."); },
    onError: (e: any) => toast.error(e.message),
  });
  const noteDeleteM = useMutation({
    mutationFn: (note_id: string) => removeNote({ data: { note_id } }),
    onSuccess: () => invalidate(),
    onError: (e: any) => toast.error(e.message),
  });
  const contactAddM = useMutation({
    mutationFn: (i: any) => addContact({ data: { project_id: projectId, ...i } }),
    onSuccess: () => { invalidate(); toast.success("Contact toegevoegd."); },
    onError: (e: any) => toast.error(e.message),
  });
  const contactDeleteM = useMutation({
    mutationFn: (contact_id: string) => removeContact({ data: { contact_id } }),
    onSuccess: () => invalidate(),
    onError: (e: any) => toast.error(e.message),
  });
  const deleteM = useMutation({
    mutationFn: () => deleteProject({ data: { project_id: projectId } }),
    onSuccess: () => { toast.success("Project verwijderd."); window.location.href = "/admin"; },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-40 bg-muted rounded" />
        <div className="h-32 bg-muted/60 rounded-lg border border-border" />
        <div className="h-64 bg-muted/40 rounded-lg border border-border" />
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6">
        <p className="text-sm text-destructive">Kon project niet laden: {(error as Error)?.message}</p>
      </div>
    );
  }

  const { project, milestones, activity, notes, contacts, members } = data;
  const p = project as any;

  return (
    <div className="space-y-8 pb-24">
      <Link to="/admin" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Terug naar projectoverzicht
      </Link>

      {/* Header */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-display text-3xl font-semibold">{p.name}</h1>
              <StatusBadge status={p.status} />
              <PriorityBadge priority={p.priority} />
            </div>
            <p className="text-sm text-muted-foreground mt-1">{p.website_url || "Geen website gekoppeld"}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={p.status}
              onChange={(e) => statusM.mutate(e.target.value as ProjectStatus)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {Object.keys(STATUS_LABEL).map((s) => (
                <option key={s} value={s}>{STATUS_LABEL[s as ProjectStatus]}</option>
              ))}
            </select>
            <select
              value={p.priority}
              onChange={(e) => priorityM.mutate(e.target.value as ProjectPriority)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {Object.keys(PRIORITY_LABEL).map((k) => (
                <option key={k} value={k}>{PRIORITY_LABEL[k as ProjectPriority]}</option>
              ))}
            </select>
            <button
              onClick={() => { if (confirm(`Project "${p.name}" definitief verwijderen?`)) deleteM.mutate(); }}
              className="text-sm text-destructive hover:underline"
            >
              Verwijder project
            </button>
          </div>
        </div>

        <StatusPipeline status={p.status} />

        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">Voortgang</p>
            <ProgressBar value={p.progress_percentage ?? 0} />
            <p className="text-xs text-muted-foreground mt-1">{p.progress_percentage ?? 0}%</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">Deadline</p>
            <DeadlineBadge deadline={p.deadline} status={p.status} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">Uren</p>
            <p className="text-sm">
              {p.hours_spent ?? 0} / {p.hours_estimated ?? "?"} uur
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div role="tablist" className="flex gap-2 border-b border-border overflow-x-auto no-scrollbar">
        {([
          ["overzicht", "Overzicht"],
          ["tijdlijn", "Tijdlijn/Milestones"],
          ["activiteit", "Activiteit"],
          ["notities", "Notities"],
          ["contacten", "Contacten"],
          ["instellingen", "Instellingen"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${
              tab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overzicht" && (
        <section className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-card p-6 space-y-3">
            <h3 className="font-display text-lg font-semibold">Kerninfo</h3>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between"><dt className="text-muted-foreground">Categorie</dt><dd>{p.category || "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Tags</dt><dd>{(p.tags ?? []).join(", ") || "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Startdatum</dt><dd>{p.start_date ? new Date(p.start_date).toLocaleDateString("nl-NL") : "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Budget</dt><dd>{p.budget != null ? `€${p.budget}` : "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Klanten</dt><dd>{members.map((m: any) => m.full_name || m.email).join(", ") || "—"}</dd></div>
            </dl>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 space-y-3">
            <h3 className="font-display text-lg font-semibold">Klant-notities</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{p.client_visible_notes || "Geen klant-notities."}</p>
            <h3 className="font-display text-lg font-semibold pt-3 border-t border-border">Interne notities</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{p.internal_notes || "Geen interne notities."}</p>
          </div>
        </section>
      )}

      {tab === "tijdlijn" && (
        <MilestonesTab
          milestones={milestones}
          onAdd={(i) => msAddM.mutate(i)}
          onEdit={(i) => msEditM.mutate(i)}
          onToggle={(m) => msToggleM.mutate({ milestone_id: m.id, completed: m.status !== "afgerond" })}
          onDelete={(m) => { if (confirm(`Milestone "${m.title}" verwijderen?`)) msDeleteM.mutate(m.id); }}
        />
      )}

      {tab === "activiteit" && <ActivityTab activity={activity} />}

      {tab === "notities" && (
        <NotesTab
          notes={notes}
          onAdd={(i) => noteAddM.mutate(i)}
          onDelete={(n) => { if (confirm("Notitie verwijderen?")) noteDeleteM.mutate(n.id); }}
        />
      )}

      {tab === "contacten" && (
        <ContactsTab
          contacts={contacts}
          onAdd={(i) => contactAddM.mutate(i)}
          onDelete={(c) => { if (confirm(`Contact "${c.name}" verwijderen?`)) contactDeleteM.mutate(c.id); }}
        />
      )}

      {tab === "instellingen" && (
        <SettingsTab project={p} onSave={(fields) => detailM.mutate(fields)} saving={detailM.isPending} />
      )}
    </div>
  );
}

function MilestonesTab({ milestones, onAdd, onEdit, onToggle, onDelete }: any) {
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Milestones</h2>
        <button onClick={() => setShowAdd((s) => !s)} className="btn-primary text-sm inline-flex items-center gap-1">
          <Plus className="w-4 h-4" /> Milestone toevoegen
        </button>
      </div>
      {showAdd && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titel" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Omschrijving (optioneel)" rows={2} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <button
            onClick={() => {
              if (!title.trim()) return;
              onAdd({ title, description: description || null, due_date: dueDate || null, order: milestones.length });
              setTitle(""); setDescription(""); setDueDate(""); setShowAdd(false);
            }}
            className="btn-primary text-sm"
          >
            Toevoegen
          </button>
        </div>
      )}
      <MilestoneTimeline milestones={milestones} editable onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
    </section>
  );
}

function ActivityTab({ activity }: { activity: any[] }) {
  const [filter, setFilter] = useState("all");
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="font-display text-xl font-semibold">Activiteit</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-md border border-input bg-background px-3 py-1.5 text-sm">
          <option value="all">Alle types</option>
          <option value="status_change">Status</option>
          <option value="priority_change">Prioriteit</option>
          <option value="milestone_added">Milestone toegevoegd</option>
          <option value="milestone_completed">Milestone afgevinkt</option>
          <option value="note_added">Notitie</option>
          <option value="project_updated">Project bijgewerkt</option>
          <option value="contact_added">Contact</option>
        </select>
      </div>
      <ActivityLog entries={activity} filter={filter} />
    </section>
  );
}

function NotesTab({ notes, onAdd, onDelete }: any) {
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<"all" | "client" | "internal">("all");

  const filtered = notes.filter((n: any) =>
    filter === "all" ? true : filter === "client" ? n.is_client_visible : !n.is_client_visible,
  );

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="font-display text-xl font-semibold">Notities</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="rounded-md border border-input bg-background px-3 py-1.5 text-sm">
          <option value="all">Alle</option>
          <option value="client">Klant-zichtbaar</option>
          <option value="internal">Intern</option>
        </select>
      </div>
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Nieuwe notitie…" rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
            Klant-zichtbaar
          </label>
          <button
            onClick={() => { if (!content.trim()) return; onAdd({ content, is_client_visible: visible }); setContent(""); setVisible(false); }}
            className="btn-primary text-sm"
          >
            Toevoegen
          </button>
        </div>
      </div>
      <NotesPanel notes={filtered} editable onDelete={onDelete} />
    </section>
  );
}

function ContactsTab({ contacts, onAdd, onDelete }: any) {
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Contacten</h2>
        <button onClick={() => setShowAdd((s) => !s)} className="btn-primary text-sm inline-flex items-center gap-1">
          <Plus className="w-4 h-4" /> Contact toevoegen
        </button>
      </div>
      {showAdd && (
        <div className="rounded-lg border border-border bg-card p-4 grid sm:grid-cols-2 gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Naam" className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Rol" className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefoon" className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <button
            onClick={() => {
              if (!name.trim()) return;
              onAdd({ name, role: role || null, email: email || null, phone: phone || null });
              setName(""); setRole(""); setEmail(""); setPhone(""); setShowAdd(false);
            }}
            className="btn-primary text-sm sm:col-span-2"
          >
            Toevoegen
          </button>
        </div>
      )}
      {contacts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center text-sm text-muted-foreground">
          Nog geen contacten toegevoegd.
        </div>
      ) : (
        <ul className="space-y-2">
          {contacts.map((c: any) => (
            <li key={c.id} className="rounded-lg border border-border bg-card p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{c.name} {c.role && <span className="text-muted-foreground font-normal">· {c.role}</span>}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{[c.email, c.phone].filter(Boolean).join(" · ") || "—"}</p>
              </div>
              <button onClick={() => onDelete(c)} className="text-xs text-destructive hover:underline">Verwijder</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function SettingsTab({ project, onSave, saving }: { project: any; onSave: (f: any) => void; saving: boolean }) {
  const [name, setName] = useState(project.name ?? "");
  const [category, setCategory] = useState(project.category ?? "");
  const [tags, setTags] = useState((project.tags ?? []).join(", "));
  const [startDate, setStartDate] = useState(project.start_date ?? "");
  const [deadline, setDeadline] = useState(project.deadline ?? "");
  const [budget, setBudget] = useState(project.budget ?? "");
  const [hoursEstimated, setHoursEstimated] = useState(project.hours_estimated ?? "");
  const [hoursSpent, setHoursSpent] = useState(project.hours_spent ?? 0);
  const [progress, setProgress] = useState(project.progress_percentage ?? 0);
  const [clientNotes, setClientNotes] = useState(project.client_visible_notes ?? "");
  const [internalNotes, setInternalNotes] = useState(project.internal_notes ?? "");

  return (
    <section className="rounded-lg border border-border bg-card p-6 space-y-5 max-w-2xl">
      <h2 className="font-display text-xl font-semibold">Instellingen</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="text-muted-foreground">Naam</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Categorie</span>
          <input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="text-muted-foreground">Tags (komma-gescheiden)</span>
          <input value={tags} onChange={(e) => setTags(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Startdatum</span>
          <input type="date" value={startDate ?? ""} onChange={(e) => setStartDate(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Deadline</span>
          <input type="date" value={deadline ?? ""} onChange={(e) => setDeadline(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Budget (€)</span>
          <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Voortgang (%)</span>
          <input type="number" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Uren geschat</span>
          <input type="number" value={hoursEstimated} onChange={(e) => setHoursEstimated(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Uren besteed</span>
          <input type="number" value={hoursSpent} onChange={(e) => setHoursSpent(Number(e.target.value))} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-muted-foreground">Klant-zichtbare notities</span>
        <textarea value={clientNotes} onChange={(e) => setClientNotes(e.target.value)} rows={3} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Interne notities</span>
        <textarea value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} rows={3} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </label>
      <button
        disabled={saving}
        onClick={() =>
          onSave({
            name,
            category: category || null,
            tags: tags.split(",").map((t: string) => t.trim()).filter(Boolean),
            start_date: startDate || null,
            deadline: deadline || null,
            budget: budget === "" ? null : Number(budget),
            hours_estimated: hoursEstimated === "" ? null : Number(hoursEstimated),
            hours_spent: Number(hoursSpent),
            progress_percentage: Number(progress),
            client_visible_notes: clientNotes || null,
            internal_notes: internalNotes || null,
          })
        }
        className="btn-primary text-sm"
      >
        {saving ? "Bezig…" : "Opslaan"}
      </button>
    </section>
  );
}
