import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { computeScheduleDates, type BulkScheduleOptions } from "@/lib/blog-schedule";

type PostLite = { id: string; title: string };

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

function SortableRow({ post, index }: { post: PostLite; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: post.id,
  });
  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground touch-none"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <span className="text-xs text-muted-foreground w-5">{index + 1}.</span>
      <span className="truncate">{post.title}</span>
    </li>
  );
}

export function BulkScheduleDialog({
  open,
  onOpenChange,
  posts,
  onConfirm,
  confirming,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  posts: PostLite[];
  onConfirm: (orderedIds: string[], options: BulkScheduleOptions) => void;
  confirming: boolean;
}) {
  const [order, setOrder] = useState<PostLite[]>(posts);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState("09:00");
  const [intervalDays, setIntervalDays] = useState(3);
  const [workdaysOnly, setWorkdaysOnly] = useState(false);

  useEffect(() => {
    if (open) setOrder(posts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setOrder((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const options: BulkScheduleOptions = { startDate, startTime, intervalDays, workdaysOnly };
  const preview = computeScheduleDates(order.length, options);
  const hasPastDate = preview.some((d) => d.getTime() <= Date.now());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bulk plannen ({order.length} posts)</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
              Volgorde (sleep om aan te passen)
            </p>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={order.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <ul className="space-y-1.5 max-h-48 overflow-y-auto">
                  {order.map((p, i) => (
                    <SortableRow key={p.id} post={p} index={i} />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Startdatum
              </span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`${inputCls} mt-1.5`}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Starttijd
              </span>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={`${inputCls} mt-1.5`}
              />
            </label>
          </div>

          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Interval
            </span>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              {[3, 5, 7].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setIntervalDays(n)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${intervalDays === n ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/40"}`}
                >
                  Elke {n} dagen
                </button>
              ))}
              <div className="flex items-center gap-1.5 text-sm">
                <span>Elke</span>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={intervalDays}
                  onChange={(e) => setIntervalDays(Math.max(1, Number(e.target.value) || 1))}
                  className="w-16 rounded-md border border-input bg-background px-2 py-1 text-sm"
                />
                <span>dagen</span>
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={workdaysOnly}
              onChange={(e) => setWorkdaysOnly(e.target.checked)}
            />
            Alleen op werkdagen plannen (weekenden overslaan)
          </label>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
              Preview
            </p>
            <ul className="space-y-1 text-sm max-h-48 overflow-y-auto rounded-md border border-border p-2">
              {order.map((p, i) => (
                <li key={p.id} className="flex items-center justify-between gap-3">
                  <span className="truncate">{p.title}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {preview[i]?.toLocaleString("nl-NL", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </li>
              ))}
            </ul>
            {hasPastDate && (
              <p className="text-xs text-destructive mt-1.5">
                Een of meer momenten liggen in het verleden — kies een latere startdatum/tijd.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={() =>
              onConfirm(
                order.map((p) => p.id),
                options,
              )
            }
            disabled={confirming || order.length === 0 || hasPastDate}
            className="btn-primary text-sm px-5"
          >
            {confirming ? "Bezig…" : `${order.length} post(s) plannen`}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
