import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  ChevronLeft,
  LayoutGrid,
  PlusCircle,
  Copy,
  Trash2,
  CalendarDays,
  Link2,
} from "lucide-react";
import {
  adminListBlogPosts,
  adminCreateBlogPost,
  adminDeleteBlogPost,
  adminDuplicateBlogPost,
  adminBulkDeleteBlogPosts,
  adminBulkSetBlogPostStatus,
  adminBulkScheduleBlogPosts,
  adminBulkShiftBlogPosts,
} from "@/lib/blog.functions";
import { BLOG_STATUS_LABEL, BLOG_STATUS_COLOR } from "@/lib/status";
import { BlogPostForm, type BlogPostFormPayload } from "@/components/BlogPostForm";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogCalendar } from "@/components/BlogCalendar";
import { RedirectsPanel } from "@/components/RedirectsPanel";
import { BulkScheduleDialog } from "@/components/BulkScheduleDialog";
import type { BulkScheduleOptions } from "@/lib/blog-schedule";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  head: () => ({
    meta: [{ title: "Blog — Admin — AIMI" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminBlogPage,
});

function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
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

type Section = "alle" | "nieuw" | "kalender" | "redirects";

function AdminBlogPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [section, setSection] = useState<Section>("alle");

  const list = useServerFn(adminListBlogPosts);
  const { data, isLoading } = useQuery({ queryKey: ["admin-blog-posts"], queryFn: () => list({}) });

  if (pathname !== "/admin/blog") return <Outlet />;

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 max-w-[1600px] px-6 lg:px-10 space-y-6">
      <Link
        to="/admin"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Terug naar Admin
      </Link>

      <div>
        <h1 className="font-display text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground">
          Beheer alle blogposts: concepten, geplande en gepubliceerde artikelen.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <BlogSidebar section={section} onSection={setSection} />
        <div className="flex-1 min-w-0">
          {section === "kalender" ? (
            <BlogCalendar />
          ) : section === "redirects" ? (
            <RedirectsPanel />
          ) : isLoading ? (
            <TableSkeleton />
          ) : section === "nieuw" ? (
            <NewPostSection onCreated={() => setSection("alle")} />
          ) : (
            <PostsListSection data={data} />
          )}
        </div>
      </div>
    </div>
  );
}

function BlogSidebar({
  section,
  onSection,
}: {
  section: Section;
  onSection: (s: Section) => void;
}) {
  const groups = [
    {
      label: "Overzicht",
      items: [
        { key: "alle" as Section, label: "Alle posts", icon: LayoutGrid },
        { key: "kalender" as Section, label: "Kalender", icon: CalendarDays },
      ],
    },
    {
      label: "Beheer",
      items: [
        { key: "nieuw" as Section, label: "Nieuwe post", icon: PlusCircle },
        { key: "redirects" as Section, label: "Redirects", icon: Link2 },
      ],
    },
  ];
  return (
    <nav
      aria-label="Blog secties"
      className="md:w-60 md:shrink-0 md:border-r border-border md:pr-4"
    >
      {groups.map((g) => (
        <div key={g.label} className="mb-2">
          <p
            className="py-1 text-[10px] font-semibold uppercase text-muted-foreground"
            style={{ letterSpacing: "0.1em" }}
          >
            {g.label}
          </p>
          <ul className="mt-1 space-y-0.5">
            {g.items.map((it) => {
              const Icon = it.icon;
              const active = section === it.key;
              return (
                <li key={it.key}>
                  <button
                    onClick={() => onSection(it.key)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-sm transition-colors"
                    style={{
                      borderLeft: active ? "2px solid var(--primary)" : "2px solid transparent",
                      color: active ? "var(--primary)" : undefined,
                      paddingLeft: "8px",
                    }}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate text-left">{it.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

type TabKey = "alle" | "draft" | "scheduled" | "published";

function PostsListSection({ data }: { data: any }) {
  const nav = useNavigate();
  const qc = useQueryClient();
  const inv = () => qc.invalidateQueries({ queryKey: ["admin-blog-posts"] });

  const deleteFn = useServerFn(adminDeleteBlogPost);
  const duplicateFn = useServerFn(adminDuplicateBlogPost);
  const bulkDeleteFn = useServerFn(adminBulkDeleteBlogPosts);
  const bulkStatusFn = useServerFn(adminBulkSetBlogPostStatus);
  const bulkScheduleFn = useServerFn(adminBulkScheduleBlogPosts);
  const bulkShiftFn = useServerFn(adminBulkShiftBlogPosts);

  const deleteM = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      inv();
      toast.success("Post verwijderd.");
    },
    onError: (e: any) => toast.error(e.message),
  });
  const duplicateM = useMutation({
    mutationFn: (id: string) => duplicateFn({ data: { id } }),
    onSuccess: () => {
      inv();
      toast.success("Post gedupliceerd als concept.");
    },
    onError: (e: any) => toast.error(e.message),
  });
  const bulkDeleteM = useMutation({
    mutationFn: (ids: string[]) => bulkDeleteFn({ data: { ids } }),
    onSuccess: () => {
      inv();
      setSelected(new Set());
      toast.success("Geselecteerde posts verwijderd.");
    },
    onError: (e: any) => toast.error(e.message),
  });
  const bulkStatusM = useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: "draft" | "published" }) =>
      bulkStatusFn({ data: { ids, status } }),
    onSuccess: () => {
      inv();
      setSelected(new Set());
      toast.success("Status bijgewerkt.");
    },
    onError: (e: any) => toast.error(e.message),
  });
  const bulkScheduleM = useMutation({
    mutationFn: (vars: { ids: string[]; options: BulkScheduleOptions }) =>
      bulkScheduleFn({ data: vars }),
    onSuccess: (res) => {
      inv();
      setSelected(new Set());
      setBulkScheduleOpen(false);
      toast.success(`${res.scheduled.length} post(s) ingepland.`);
    },
    onError: (e: any) => toast.error(e.message),
  });
  const bulkShiftM = useMutation({
    mutationFn: (vars: { ids: string[]; shiftDays: number }) => bulkShiftFn({ data: vars }),
    onSuccess: () => {
      inv();
      setSelected(new Set());
      toast.success("Geplande posts verschoven.");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const [tab, setTab] = useState<TabKey>("alle");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkScheduleOpen, setBulkScheduleOpen] = useState(false);

  const allPosts: any[] = data?.posts ?? [];
  const counts: Record<TabKey, number> = {
    alle: allPosts.length,
    draft: allPosts.filter((p) => p.status === "draft").length,
    scheduled: allPosts.filter((p) => p.status === "scheduled").length,
    published: allPosts.filter((p) => p.status === "published").length,
  };

  let items = allPosts.filter((p) => tab === "alle" || p.status === tab);
  if (search) {
    const q = search.toLowerCase();
    items = items.filter((p) => p.title.toLowerCase().includes(q));
  }

  const selectedDraftPosts = allPosts.filter((p) => selected.has(p.id) && p.status === "draft");
  const selectedScheduledIds = allPosts
    .filter((p) => selected.has(p.id) && p.status === "scheduled")
    .map((p) => p.id);

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };
  const toggleAll = () => {
    if (selected.size === items.length) setSelected(new Set());
    else setSelected(new Set(items.map((p) => p.id)));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Alle posts ({allPosts.length})</h2>

      <div className="flex flex-wrap gap-2">
        {(["alle", "draft", "scheduled", "published"] as TabKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${tab === k ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/40"}`}
          >
            {k === "alle" ? "Alle" : BLOG_STATUS_LABEL[k]} ({counts[k]})
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          placeholder="Zoek op titel…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm w-64"
        />
        {selected.size > 0 && (
          <div className="flex items-center gap-2 ml-auto text-xs">
            <span className="text-muted-foreground">{selected.size} geselecteerd</span>
            {selectedDraftPosts.length > 0 && (
              <button
                onClick={() => setBulkScheduleOpen(true)}
                className="text-primary hover:underline"
              >
                Plannen ({selectedDraftPosts.length})
              </button>
            )}
            {selectedScheduledIds.length > 0 && (
              <button
                onClick={() => {
                  const raw = window.prompt(
                    "Aantal dagen opschuiven (negatief getal = eerder plannen):",
                    "2",
                  );
                  if (raw === null) return;
                  const shiftDays = parseInt(raw, 10);
                  if (Number.isNaN(shiftDays)) {
                    toast.error("Ongeldig aantal dagen.");
                    return;
                  }
                  bulkShiftM.mutate({ ids: selectedScheduledIds, shiftDays });
                }}
                className="text-primary hover:underline"
              >
                Herplannen ({selectedScheduledIds.length})
              </button>
            )}
            <button
              onClick={() => bulkStatusM.mutate({ ids: Array.from(selected), status: "published" })}
              className="text-primary hover:underline"
            >
              Publiceren
            </button>
            <button
              onClick={() => bulkStatusM.mutate({ ids: Array.from(selected), status: "draft" })}
              className="text-primary hover:underline"
            >
              Naar concept
            </button>
            <button
              onClick={() => {
                if (confirm(`${selected.size} post(s) definitief verwijderen?`))
                  bulkDeleteM.mutate(Array.from(selected));
              }}
              className="text-destructive hover:underline"
            >
              Verwijderen
            </button>
          </div>
        )}
      </div>

      <BulkScheduleDialog
        open={bulkScheduleOpen}
        onOpenChange={setBulkScheduleOpen}
        posts={selectedDraftPosts}
        confirming={bulkScheduleM.isPending}
        onConfirm={(orderedIds, options) => bulkScheduleM.mutate({ ids: orderedIds, options })}
      />

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-muted-foreground">
            <tr>
              <th className="p-3 w-8">
                <input
                  type="checkbox"
                  checked={items.length > 0 && selected.size === items.length}
                  onChange={toggleAll}
                />
              </th>
              <th className="text-left p-3">Titel</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Gepland/gepubliceerd op</th>
              <th className="text-left p-3">Laatst bewerkt</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-t border-border hover:bg-muted/20">
                <td className="p-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selected.has(p.id)}
                    onChange={() => toggle(p.id)}
                  />
                </td>
                <td
                  className="p-3 font-medium cursor-pointer"
                  onClick={() => nav({ to: "/admin/blog/$postId", params: { postId: p.id } })}
                >
                  <Link
                    to="/admin/blog/$postId"
                    params={{ postId: p.id }}
                    className="hover:text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {p.title}
                  </Link>
                  <div className="text-xs text-muted-foreground">/blog/{p.slug}</div>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${BLOG_STATUS_COLOR[p.status]}`}
                  >
                    {BLOG_STATUS_LABEL[p.status]}
                  </span>
                </td>
                <td className="p-3 text-xs text-muted-foreground">
                  {p.published_at ? new Date(p.published_at).toLocaleString("nl-NL") : "—"}
                </td>
                <td className="p-3 text-xs text-muted-foreground">
                  {new Date(p.updated_at).toLocaleString("nl-NL")}
                </td>
                <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => duplicateM.mutate(p.id)}
                      className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" /> Dupliceren
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`"${p.title}" definitief verwijderen?`)) deleteM.mutate(p.id);
                      }}
                      className="text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Verwijder
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-muted-foreground">
                  Geen posts gevonden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NewPostSection({ onCreated }: { onCreated: () => void }) {
  const create = useServerFn(adminCreateBlogPost);
  const qc = useQueryClient();
  const createM = useMutation({
    mutationFn: (payload: BlogPostFormPayload) => create({ data: payload }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast.success("Post aangemaakt.");
      onCreated();
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display text-xl font-semibold flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-primary" /> Nieuwe blogpost
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Sla op als concept, plan een publicatiemoment in, of publiceer direct.
        </p>
      </div>
      <BlogPostForm
        onSave={(payload) => createM.mutate(payload)}
        saving={createM.isPending}
        submitLabel="Post aanmaken"
      />
    </div>
  );
}
