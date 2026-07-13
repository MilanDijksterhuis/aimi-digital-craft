import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { getProjectDetail } from "@/lib/project-detail.functions";
import {
  StatusBadge,
  ProgressBar,
  DeadlineBadge,
  StatusPipeline,
  MilestoneTimeline,
  NotesPanel,
} from "@/components/project/shared";

export const Route = createFileRoute("/_authenticated/portal/projecten/$projectId")({
  head: () => ({ meta: [{ title: "Project — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: PortalProjectDetailPage,
});

type Tab = "overzicht" | "tijdlijn" | "notities";

function PortalProjectDetailPage() {
  const { projectId } = Route.useParams();
  const [tab, setTab] = useState<Tab>("overzicht");
  const fetchDetail = useServerFn(getProjectDetail);

  const { data, isLoading, error } = useQuery({
    queryKey: ["project-detail", projectId],
    queryFn: () => fetchDetail({ data: { project_id: projectId } }),
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

  const { project, milestones, notes } = data;
  const p = project as any;

  return (
    <div className="space-y-8 pb-24">
      <Link to="/portal" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Terug naar portaal
      </Link>

      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="font-display text-3xl font-semibold">{p.name}</h1>
          <StatusBadge status={p.status} />
        </div>

        <StatusPipeline status={p.status} />

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">Voortgang</p>
            <ProgressBar value={p.progress_percentage ?? 0} />
            <p className="text-xs text-muted-foreground mt-1">{p.progress_percentage ?? 0}%</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">Deadline</p>
            <DeadlineBadge deadline={p.deadline} status={p.status} />
          </div>
        </div>
      </div>

      <div role="tablist" className="flex gap-2 border-b border-border overflow-x-auto no-scrollbar">
        {([
          ["overzicht", "Overzicht"],
          ["tijdlijn", "Tijdlijn"],
          ["notities", "Notities"],
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
        <section className="rounded-lg border border-border bg-card p-6 space-y-3">
          <h3 className="font-display text-lg font-semibold">Notities van ons team</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {p.client_visible_notes || "Nog geen notities gedeeld."}
          </p>
        </section>
      )}

      {tab === "tijdlijn" && <MilestoneTimeline milestones={milestones} />}

      {tab === "notities" && <NotesPanel notes={notes} />}
    </div>
  );
}
