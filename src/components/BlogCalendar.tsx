import { useMemo, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  format,
} from "date-fns";
import { nl } from "date-fns/locale";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from "@dnd-kit/core";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { adminListBlogPosts, adminRescheduleBlogPost } from "@/lib/blog.functions";
import { BLOG_STATUS_COLOR } from "@/lib/status";

type PostLite = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "scheduled" | "published";
  published_at: string | null;
};

function DraggablePost({ post }: { post: PostLite }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: post.id,
  });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 50 }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`text-[11px] px-1.5 py-1 rounded truncate cursor-grab touch-none ${BLOG_STATUS_COLOR[post.status]} ${isDragging ? "opacity-50" : ""}`}
      title={post.title}
    >
      <Link
        to="/admin/blog/$postId"
        params={{ postId: post.id }}
        onClick={(e) => e.stopPropagation()}
        className="hover:underline"
      >
        {post.title}
      </Link>
    </div>
  );
}

function DayCell({
  day,
  inMonth,
  isToday,
  posts,
}: {
  day: Date;
  inMonth: boolean;
  isToday: boolean;
  posts: PostLite[];
}) {
  const dayKey = format(day, "yyyy-MM-dd");
  const { setNodeRef, isOver } = useDroppable({ id: dayKey });
  return (
    <div
      ref={setNodeRef}
      className={`min-h-[110px] border border-border p-1.5 space-y-1 ${inMonth ? "bg-background" : "bg-muted/10 opacity-50"} ${isOver ? "ring-2 ring-primary/40" : ""}`}
    >
      <div
        className={`text-xs ${isToday ? "text-primary font-semibold" : "text-muted-foreground"}`}
      >
        {format(day, "d")}
      </div>
      {posts.map((p) => (
        <DraggablePost key={p.id} post={p} />
      ))}
    </div>
  );
}

export function BlogCalendar() {
  const [reference, setReference] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "list">("month");
  const qc = useQueryClient();

  const list = useServerFn(adminListBlogPosts);
  const { data, isLoading } = useQuery({ queryKey: ["admin-blog-posts"], queryFn: () => list({}) });
  const posts: PostLite[] = (data?.posts ?? []).filter((p: PostLite) => p.published_at);

  const reschedule = useServerFn(adminRescheduleBlogPost);
  const rescheduleM = useMutation({
    mutationFn: (vars: { id: string; published_at: string }) => reschedule({ data: vars }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast.success("Publicatiedatum aangepast.");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const postsByDay = useMemo(() => {
    const map = new Map<string, PostLite[]>();
    for (const p of posts) {
      if (!p.published_at) continue;
      const key = format(new Date(p.published_at), "yyyy-MM-dd");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    return map;
  }, [posts]);

  const days = useMemo(() => {
    if (viewMode === "week") {
      const start = startOfWeek(reference, { weekStartsOn: 1 });
      const end = endOfWeek(reference, { weekStartsOn: 1 });
      return eachDayOfInterval({ start, end });
    }
    const start = startOfWeek(startOfMonth(reference), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(reference), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [reference, viewMode]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const post = posts.find((p) => p.id === active.id);
    if (!post || !post.published_at) return;
    const newDayKey = String(over.id);
    const oldDate = new Date(post.published_at);
    const [y, m, d] = newDayKey.split("-").map(Number);
    const newDate = new Date(y, m - 1, d, oldDate.getHours(), oldDate.getMinutes());
    if (format(newDate, "yyyy-MM-dd") === format(oldDate, "yyyy-MM-dd")) return;
    rescheduleM.mutate({ id: post.id, published_at: newDate.toISOString() });
  };

  const goPrev = () =>
    setReference((r) => (viewMode === "week" ? subWeeks(r, 1) : subMonths(r, 1)));
  const goNext = () =>
    setReference((r) => (viewMode === "week" ? addWeeks(r, 1) : addMonths(r, 1)));

  if (isLoading) return <p className="text-sm text-muted-foreground">Laden…</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            className="p-1.5 rounded-md border border-border hover:border-foreground/40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-semibold min-w-[10rem]">
            {viewMode === "week"
              ? `Week van ${format(startOfWeek(reference, { weekStartsOn: 1 }), "d MMM", { locale: nl })}`
              : format(reference, "MMMM yyyy", { locale: nl })}
          </h2>
          <button
            onClick={goNext}
            className="p-1.5 rounded-md border border-border hover:border-foreground/40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setReference(new Date())}
            className="text-xs text-primary hover:underline ml-2"
          >
            Vandaag
          </button>
        </div>
        <div className="flex gap-2">
          {(["month", "week", "list"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${viewMode === m ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/40"}`}
            >
              {m === "month" ? "Maand" : m === "week" ? "Week" : "Lijst"}
            </button>
          ))}
        </div>
      </div>

      {viewMode === "list" ? (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {posts
            .slice()
            .sort(
              (a, b) => new Date(a.published_at!).getTime() - new Date(b.published_at!).getTime(),
            )
            .map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 p-3 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${BLOG_STATUS_COLOR[p.status]}`}
                  >
                    {p.status === "scheduled" ? "Gepland" : "Gepubliceerd"}
                  </span>
                  <Link
                    to="/admin/blog/$postId"
                    params={{ postId: p.id }}
                    className="hover:text-primary truncate"
                  >
                    {p.title}
                  </Link>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(p.published_at!).toLocaleString("nl-NL", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </li>
            ))}
          {posts.length === 0 && (
            <li className="p-6 text-center text-sm text-muted-foreground">
              Nog geen geplande of gepubliceerde posts.
            </li>
          )}
        </ul>
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-7 gap-px rounded-lg border border-border overflow-hidden bg-border">
            {["ma", "di", "wo", "do", "vr", "za", "zo"].map((d) => (
              <div
                key={d}
                className="bg-muted/30 p-1.5 text-center text-xs font-medium text-muted-foreground"
              >
                {d}
              </div>
            ))}
            {days.map((day) => (
              <DayCell
                key={day.toISOString()}
                day={day}
                inMonth={viewMode === "week" || isSameMonth(day, reference)}
                isToday={isSameDay(day, new Date())}
                posts={postsByDay.get(format(day, "yyyy-MM-dd")) ?? []}
              />
            ))}
          </div>
        </DndContext>
      )}
    </div>
  );
}
