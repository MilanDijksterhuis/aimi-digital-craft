// Status/prioriteit stijl-mapping voor PROJECTEN (projects tabel).
// Losstaand van src/lib/status.ts (change_requests) — andere waarden, andere levenscyclus.
// Waarden komen 1-op-1 overeen met de database-enums project_status/project_priority.

export const PROJECT_STATUS_VALUES = [
  "concept",
  "in_uitvoering",
  "review",
  "afgerond",
  "on_hold",
  "geannuleerd",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUS_VALUES)[number];

export const PROJECT_STATUS_LABEL: Record<string, string> = {
  concept: "Concept",
  in_uitvoering: "In uitvoering",
  review: "Review",
  afgerond: "Afgerond",
  on_hold: "On hold",
  geannuleerd: "Geannuleerd",
};

export const PROJECT_STATUS_COLOR: Record<string, string> = {
  concept: "bg-muted text-muted-foreground",
  in_uitvoering: "bg-secondary/30 text-secondary-foreground",
  review: "bg-primary/10 text-primary",
  afgerond: "bg-emerald-500/20 text-emerald-600",
  on_hold: "bg-amber-500/20 text-amber-600",
  geannuleerd: "bg-destructive/20 text-destructive",
};

export const PROJECT_PRIORITY_VALUES = ["laag", "normaal", "hoog", "urgent"] as const;

export type ProjectPriority = (typeof PROJECT_PRIORITY_VALUES)[number];

export const PROJECT_PRIORITY_LABEL: Record<string, string> = {
  laag: "Laag",
  normaal: "Normaal",
  hoog: "Hoog",
  urgent: "Urgent",
};

export const PROJECT_PRIORITY_ORDER: Record<string, number> = {
  urgent: 4,
  hoog: 3,
  normaal: 2,
  laag: 1,
};

export const PROJECT_PRIORITY_COLOR: Record<string, string> = {
  laag: "text-muted-foreground",
  normaal: "text-foreground",
  hoog: "text-amber-500",
  urgent: "text-destructive font-semibold",
};

export function isProjectOverdue(deadline: string | null | undefined, status: string | null | undefined): boolean {
  if (!deadline) return false;
  if (status === "afgerond" || status === "geannuleerd") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(deadline) < today;
}

// Voortgang: progress_percentage is de bron van waarheid. Als die (nog) 0 is
// maar er wel budget-uren of milestones bekend zijn, vallen we terug op een
// berekende schatting zodat de voortgangsbalk niet altijd leeg oogt voor
// oudere/handmatig aangemaakte projecten.
export function projectProgress(
  project: { progress_percentage?: number | null; budget?: number | null; hours_estimated?: number | null; hours_spent?: number | null },
  milestones: Array<{ status: string }>,
): number | null {
  if (project.progress_percentage && project.progress_percentage > 0) {
    return Math.max(0, Math.min(100, Math.round(project.progress_percentage)));
  }
  if (project.hours_estimated && project.hours_estimated > 0) {
    const pct = ((project.hours_spent ?? 0) / project.hours_estimated) * 100;
    return Math.max(0, Math.min(100, Math.round(pct)));
  }
  if (milestones.length > 0) {
    const done = milestones.filter((m) => m.status === "done").length;
    return Math.round((done / milestones.length) * 100);
  }
  return project.progress_percentage === 0 ? 0 : null;
}
