import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Calendar, AlertTriangle, FileText, Tag, Globe } from "lucide-react";
import {
  portalGetProject,
  portalListProjectNotes,
  portalListMyProjects,
  portalGetProjectMonitoring,
} from "@/lib/portal.functions";
import {
  PROJECT_STATUS_LABEL,
  PROJECT_STATUS_COLOR,
  PROJECT_PRIORITY_LABEL,
  PROJECT_PRIORITY_COLOR,
  isProjectOverdue,
} from "@/lib/project-status";
import { STATUS_LABEL, STATUS_COLOR, PRIORITY_LABEL } from "@/lib/status";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/portal/projecten/$projectId")({
  head: () => ({ meta: [{ title: "Project — Portaal — AIMI" }, { name: "robots", content: "noindex" }] }),
  component: PortalProjectDetailPage,
});

function timeAgo(iso: string) {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return "zojuist";
  if (m < 60) return `${m} min geleden`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} uur geleden`;
  return `${Math.floor(h / 24)} dagen geleden`;
}

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

function ProjectSwitcher({ currentId, projects }: { currentId: string; projects: any[] }) {
  const nav = useNavigate();
  if (projects.length <= 1) return null;

  return (
    <select
      value={currentId}
      onChange={(e) => nav({ to: "/portal/projecten/$projectId", params: { projectId: e.target.value } })}
      className="rounded-md border border-input bg-background px-3 py-2 text-sm"
    >
      {projects.map((p: any) => (
        <option key={p.id} value={p.id}>{p.name}</option>
      ))}
    </select>
  );
}

function MonitoringSection({ projectId }: { projectId: string }) {
  const getMonitoring = useServerFn(portalGetProjectMonitoring);
  const { data, isLoading } = useQuery({
    queryKey: ["portal-project-monitoring", projectId],
    queryFn: () => getMonitoring({ data: { project_id: projectId } }),
  });

  if (isLoading) return <Skeleton className="h-40 w-full rounded-lg" />;

  const uptime = data?.uptimePct ?? null;
  const avgMs = data?.avg ?? null;
  const dailyUptime = data?.dailyUptime ?? [];
  const lastSync = data?.lastSync ?? null;
  const siteErrors = data?.siteErrors ?? [];
  const hasData = (data?.total24h ?? 0) > 0 || dailyUptime.some((d: any) => d.total > 0);
  const uptimeColor = uptime == null ? "text-muted-foreground" : uptime >= 99 ? "text-emerald-500" : uptime >= 95 ? "text-amber-500" : "text-destructive";

  return (
    <>
      <div className="rounded-lg border border-border bg-card p-4 space-y-4">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" /> Website monitoring
        </h3>
        {!hasData ? (
          <div className="rounded-md border border-dashed border-border bg-background p-6 text-center">
            <p className="text-sm text-muted-foreground">We zijn bezig deze site te koppelen. Dit kan tot 24 uur duren.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-md border border-border p-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Uptime (24u)</p>
                <p className={`mt-1 text-2xl font-semibold ${uptimeColor}`}>{uptime != null ? `${uptime.toFixed(1)}%` : "—"}</p>
              </div>
              <div className="rounded-md border border-border p-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Gem. responstijd (24u)</p>
                <p className={`mt-1 text-2xl font-semibold ${avgMs && avgMs > 3000 ? "text-amber-500" : ""}`}>{avgMs != null ? `${avgMs}ms` : "—"}</p>
              </div>
            </div>
            {dailyUptime.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Uptime afgelopen 7 dagen</p>
                <UptimeChart dailyUptime={dailyUptime} />
              </div>
            )}
            {lastSync && <p className="text-xs text-muted-foreground">Laatste meting: {timeAgo(lastSync)}</p>}
          </div>
        )}
      </div>

      {siteErrors.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
          <h3 className="font-semibold text-sm">Laatste fouten</h3>
          <ul className="space-y-2 text-sm">
            {siteErrors.map((e: any) => (
              <li key={e.id} className="rounded-md border border-border p-3">
                <p className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleString("nl-NL")}</p>
                <p className="mt-1">{e.message}</p>
                {e.resolved && <span className="text-primary text-xs">(opgelost)</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function PortalProjectDetailPage() {
  const { projectId } = useParams({ from: "/_authenticated/portal/projecten/$projectId" });
  const getProject = useServerFn(portalGetProject);
  const getNotes = useServerFn(portalListProjectNotes);
  const listProjects = useServerFn(portalListMyProjects);

  const projectQ = useQuery({ queryKey: ["portal-project", projectId], queryFn: () => getProject({ data: { project_id: projectId } }) });
  const notesQ = useQuery({ queryKey: ["portal-project-notes", projectId], queryFn: () => getNotes({ data: { project_id: projectId } }) });
  const projectsQ = useQuery({ queryKey: ["portal-my-projects"], queryFn: () => listProjects({}) });

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
  const myProjects = (projectsQ.data?.items ?? []) as any[];
  const overdue = isProjectOverdue(project.deadline, project.status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link to="/portal" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Terug naar portaal
        </Link>
        <ProjectSwitcher currentId={projectId} projects={myProjects} />
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

            {project.website_url && <MonitoringSection projectId={projectId} />}

            <div className="rounded-lg border border-border bg-card p-4 space-y-2">
              <h3 className="font-semibold text-sm">Gekoppelde changes</h3>
              {changeRequests.length === 0 ? (
                <p className="text-sm text-muted-foreground">Geen changes gekoppeld aan dit project.</p>
              ) : (
                <ul className="space-y-2">
                  {changeRequests.map((c: any) => (
                    <li key={c.id} className="rounded-lg border border-border/60 p-3 flex items-center justify-between gap-3">
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
