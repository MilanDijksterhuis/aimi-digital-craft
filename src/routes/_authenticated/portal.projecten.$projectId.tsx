import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Calendar, AlertTriangle, FileText, Tag } from "lucide-react";
import { portalGetProject, portalListProjectNotes } from "@/lib/portal.functions";
import {
  PROJECT_STATUS_LABEL,
  PROJECT_STATUS_COLOR,
  PROJECT_PRIORITY_LABEL,
  PROJECT_PRIORITY_COLOR,
  isProjectOverdue,
} from "@/lib/project-status";
import { STATUS_LABEL, STATUS_COLOR } from "@/lib/status";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/portal/projecten/$projectId")({
  head: () => ({ meta: [{ title: "Project — Portaal — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: PortalProjectDetailPage,
});

function PortalProjectDetailPage() {
  const { projectId } = useParams({ from: "/_authenticated/portal/projecten/$projectId" });
  const getProject = useServerFn(portalGetProject);
  const getNotes = useServerFn(portalListProjectNotes);

  const projectQ = useQuery({ queryKey: ["portal-project", projectId], queryFn: () => getProject({ data: { project_id: projectId } }) });
  const notesQ = useQuery({ queryKey: ["portal-project-notes", projectId], queryFn: () => getNotes({ data: { project_id: projectId } }) });

  if (projectQ.isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (projectQ.error) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6">
        <h2 className="font-display text-xl font-semibold">Geen toegang</h2>
        <p className="text-sm text-muted-foreground mt-2">{(projectQ.error as Error).message}</p>
      </div>
    );
  }

  const project = projectQ.data?.project;
  if (!project) return null;

  const notes = (notesQ.data?.items ?? []) as any[];
  const changeRequests = ((projectQ.data as any)?.changeRequests ?? []) as any[];
  const overdue = isProjectOverdue(project.deadline, project.status);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm">
        <Link to="/portal" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Terug naar portaal
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 space-y-2">
        <h1 className="font-display text-2xl font-bold">{project.name}</h1>
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

      <Tabs defaultValue="overzicht">
        <TabsList>
          <TabsTrigger value="overzicht"><FileText className="w-3.5 h-3.5 mr-1.5" />Overzicht</TabsTrigger>
          <TabsTrigger value="notities"><FileText className="w-3.5 h-3.5 mr-1.5" />Notities</TabsTrigger>
        </TabsList>

        <TabsContent value="overzicht">
          <div className="space-y-4 mt-2">
            <div className="rounded-lg border border-border bg-card p-4 space-y-2">
              {project.category && <p className="text-sm"><span className="text-muted-foreground">Categorie:</span> {project.category}</p>}
              {project.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t: string) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                      <Tag className="w-3 h-3" />{t}
                    </span>
                  ))}
                </div>
              )}
              {project.description && <p className="text-sm text-muted-foreground whitespace-pre-wrap">{project.description}</p>}
            </div>

            <div className="rounded-lg border border-border bg-card p-4 space-y-2">
              <h3 className="font-semibold text-sm">Gekoppelde changes</h3>
              {changeRequests.length === 0 ? (
                <p className="text-sm text-muted-foreground">Geen changes gekoppeld aan dit project.</p>
              ) : (
                <ul className="space-y-2">
                  {changeRequests.map((c: any) => (
                    <li key={c.id} className="flex items-center justify-between gap-3 text-sm border-b border-border/60 last:border-0 pb-2 last:pb-0">
                      <span className="truncate">{c.title}</span>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOR[c.status] ?? "bg-muted"}`}>
                        {STATUS_LABEL[c.status] ?? c.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notities">
          <div className="space-y-2 mt-2">
            {notes.length === 0 ? (
              <p className="text-sm text-muted-foreground">Geen notities.</p>
            ) : (
              <ul className="space-y-2">
                {notes.map((n: any) => (
                  <li key={n.id} className="rounded-lg border border-border bg-card p-3">
                    <p className="text-sm whitespace-pre-wrap">{n.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(n.created_at).toLocaleString("nl-NL")}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
