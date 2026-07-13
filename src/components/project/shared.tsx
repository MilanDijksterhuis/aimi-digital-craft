import { CheckCircle2, Circle, Clock, AlertTriangle } from "lucide-react";

// ---------- Status & priority mappings ----------

export type ProjectStatus = "concept" | "in_uitvoering" | "review" | "afgerond" | "on_hold" | "geannuleerd";
export type ProjectPriority = "laag" | "normaal" | "hoog" | "urgent";

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  concept: "Concept",
  in_uitvoering: "In uitvoering",
  review: "Review",
  afgerond: "Afgerond",
  on_hold: "On hold",
  geannuleerd: "Geannuleerd",
};

export const STATUS_STYLE: Record<ProjectStatus, { bg: string; fg: string; border: string }> = {
  concept: { bg: "#f9fafb", fg: "#6b7280", border: "#e5e7eb" },
  in_uitvoering: { bg: "#fff7ed", fg: "#c2760a", border: "#fde3b8" },
  review: { bg: "#eeedff", fg: "#7270ff", border: "#d6d5ff" },
  afgerond: { bg: "#ecfdf5", fg: "#10b981", border: "#bbf7d0" },
  on_hold: { bg: "#f9fafb", fg: "#9ca3af", border: "#e5e7eb" },
  geannuleerd: { bg: "#fdecec", fg: "#c0392b", border: "#f5c2c2" },
};

export const STATUS_PIPELINE: ProjectStatus[] = ["concept", "in_uitvoering", "review", "afgerond"];

export const PRIORITY_LABEL: Record<ProjectPriority, string> = {
  laag: "Laag",
  normaal: "Normaal",
  hoog: "Hoog",
  urgent: "Urgent",
};

export const PRIORITY_COLOR: Record<ProjectPriority, string> = {
  laag: "text-muted-foreground",
  normaal: "text-foreground",
  hoog: "text-amber-600",
  urgent: "text-destructive",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = STATUS_STYLE[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold border"
      style={{ background: s.bg, color: s.fg, borderColor: s.border }}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: ProjectPriority }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${PRIORITY_COLOR[priority]}`}>
      {(priority === "urgent" || priority === "hoog") && <AlertTriangle className="w-3 h-3" />}
      {PRIORITY_LABEL[priority]}
    </span>
  );
}

export function ProgressBar({ value }: { value: number }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="h-2.5 w-full rounded-full overflow-hidden bg-muted">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, background: pct >= 100 ? "#10b981" : "var(--primary)" }}
      />
    </div>
  );
}

export function DeadlineBadge({ deadline, status }: { deadline: string | null | undefined; status: ProjectStatus }) {
  if (!deadline) return <span className="text-xs text-muted-foreground">Geen deadline</span>;
  if (status === "afgerond" || status === "geannuleerd") {
    return <span className="text-xs text-muted-foreground">{new Date(deadline).toLocaleDateString("nl-NL")}</span>;
  }
  const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
  const overdue = days < 0;
  const soon = days >= 0 && days <= 3;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${overdue ? "text-destructive" : soon ? "text-amber-600" : "text-muted-foreground"}`}>
      <Clock className="w-3 h-3" />
      {new Date(deadline).toLocaleDateString("nl-NL")}
      {overdue && ` · ${Math.abs(days)} dag${Math.abs(days) === 1 ? "" : "en"} te laat`}
      {soon && !overdue && ` · nog ${days} dag${days === 1 ? "" : "en"}`}
    </span>
  );
}

export function StatusPipeline({ status }: { status: ProjectStatus }) {
  if (status === "on_hold" || status === "geannuleerd") {
    return (
      <div className="text-xs font-medium text-muted-foreground">
        Project staat op <StatusBadge status={status} />
      </div>
    );
  }
  const current = STATUS_PIPELINE.indexOf(status);
  return (
    <div className="flex items-center gap-1 overflow-x-auto">
      {STATUS_PIPELINE.map((s, i) => {
        const done = i < current;
        const isCurrent = i === current;
        return (
          <div key={s} className="flex items-center flex-1 min-w-[80px]">
            <div className="flex flex-col items-center gap-1 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                  done || isCurrent
                    ? "bg-primary text-primary-foreground border border-primary"
                    : "bg-background text-muted-foreground border border-border"
                }`}
              >
                {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-[10px] text-center whitespace-nowrap ${isCurrent ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                {STATUS_LABEL[s]}
              </span>
            </div>
            {i < STATUS_PIPELINE.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-4 rounded-full ${i < current ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------- Milestone timeline ----------

export type Milestone = {
  id: string;
  title: string;
  description?: string | null;
  due_date?: string | null;
  completed_at?: string | null;
  status: string;
  order: number;
};

export function MilestoneTimeline({
  milestones,
  editable,
  onToggle,
  onEdit,
  onDelete,
}: {
  milestones: Milestone[];
  editable?: boolean;
  onToggle?: (m: Milestone) => void;
  onEdit?: (m: Milestone) => void;
  onDelete?: (m: Milestone) => void;
}) {
  if (milestones.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center text-sm text-muted-foreground">
        Nog geen milestones toegevoegd.
      </div>
    );
  }
  return (
    <ol className="space-y-3">
      {milestones.map((m) => {
        const completed = m.status === "afgerond";
        const overdue = !completed && m.due_date && new Date(m.due_date).getTime() < Date.now();
        return (
          <li
            key={m.id}
            className={`rounded-lg border p-4 flex items-start gap-3 ${
              overdue ? "border-destructive/40 bg-destructive/5" : "border-border bg-card"
            }`}
          >
            <button
              type="button"
              onClick={() => onToggle?.(m)}
              disabled={!editable}
              className="mt-0.5 shrink-0 disabled:cursor-default"
              aria-label={completed ? "Markeer als open" : "Markeer als afgerond"}
            >
              {completed ? (
                <CheckCircle2 className="w-5 h-5 text-primary" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className={`text-sm font-semibold ${completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {m.title}
                </p>
                {m.due_date && (
                  <span className={`text-xs ${overdue ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                    {new Date(m.due_date).toLocaleDateString("nl-NL")}
                    {overdue ? " · verlopen" : ""}
                  </span>
                )}
              </div>
              {m.description && <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap">{m.description}</p>}
            </div>
            {editable && (
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => onEdit?.(m)} className="text-xs text-muted-foreground hover:text-foreground">
                  Bewerk
                </button>
                <button onClick={() => onDelete?.(m)} className="text-xs text-destructive hover:underline">
                  Verwijder
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ---------- Activity log ----------

export type ActivityEntry = {
  id: string;
  action_type: string;
  description: string;
  created_at: string;
  user_id?: string | null;
};

const ACTION_LABEL: Record<string, string> = {
  status_change: "Status",
  priority_change: "Prioriteit",
  milestone_added: "Milestone",
  milestone_updated: "Milestone",
  milestone_completed: "Milestone",
  note_added: "Notitie",
  project_updated: "Project",
  contact_added: "Contact",
};

export function ActivityLog({ entries, filter }: { entries: ActivityEntry[]; filter?: string }) {
  const filtered = filter && filter !== "all" ? entries.filter((e) => e.action_type === filter) : entries;
  if (filtered.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center text-sm text-muted-foreground">
        Nog geen activiteit.
      </div>
    );
  }
  return (
    <ol className="space-y-2">
      {filtered.map((e) => (
        <li key={e.id} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground shrink-0 w-24">
            {ACTION_LABEL[e.action_type] ?? e.action_type}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground">{e.description}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {new Date(e.created_at).toLocaleString("nl-NL")}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ---------- Notes panel ----------

export type ProjectNote = {
  id: string;
  content: string;
  is_client_visible: boolean;
  created_at: string;
  author_id?: string | null;
};

export function NotesPanel({
  notes,
  editable,
  onDelete,
}: {
  notes: ProjectNote[];
  editable?: boolean;
  onDelete?: (n: ProjectNote) => void;
}) {
  if (notes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center text-sm text-muted-foreground">
        Nog geen notities.
      </div>
    );
  }
  return (
    <ul className="space-y-2">
      {notes.map((n) => (
        <li key={n.id} className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span
              className={`text-[11px] px-2 py-0.5 rounded-md border ${
                n.is_client_visible
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                  : "border-border bg-muted text-muted-foreground"
              }`}
            >
              {n.is_client_visible ? "Klant-zichtbaar" : "Intern"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{new Date(n.created_at).toLocaleString("nl-NL")}</span>
              {editable && (
                <button onClick={() => onDelete?.(n)} className="text-xs text-destructive hover:underline">
                  Verwijder
                </button>
              )}
            </div>
          </div>
          <p className="text-sm text-foreground whitespace-pre-wrap">{n.content}</p>
        </li>
      ))}
    </ul>
  );
}
