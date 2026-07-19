import React, { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  X,
  Globe,
  CheckCircle2,
  PhoneOff,
  CalendarCheck,
  Trash2,
  StickyNote,
  CalendarDays,
  CalendarRange,
  Sun,
} from "lucide-react";
import {
  adminListCallbacks,
  adminCompleteCallback,
  adminDeleteCallback,
  adminUpdateCallback,
} from "@/lib/admin.functions";
import {
  agendaColor,
  AGENDA_COLOR_CLASSES,
  CALLBACK_STATUS_LABEL,
  CALLBACK_OUTCOMES,
  toDatetimeLocalValue,
  type CallbackStatus,
} from "@/lib/callbacks";
import { useConfirm } from "@/components/ConfirmDialog";

// ── Datum-helpers (lokale tijd, week begint op maandag) ──
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
function startOfWeek(d: Date) {
  const s = startOfDay(d);
  const day = (s.getDay() + 6) % 7; // ma=0 … zo=6
  return addDays(s, -day);
}
const sameDay = (a: Date, b: Date) => startOfDay(a).getTime() === startOfDay(b).getTime();
const isToday = (d: Date) => sameDay(d, new Date());

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
const fmtDayLabel = (d: Date) =>
  d.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });
const fmtDayShort = (d: Date) =>
  d.toLocaleDateString("nl-NL", { weekday: "short", day: "numeric" });

type ViewMode = "day" | "week";

export function CallbackAgenda() {
  const qc = useQueryClient();
  const { confirm } = useConfirm();
  const listFn = useServerFn(adminListCallbacks);
  const completeFn = useServerFn(adminCompleteCallback);
  const deleteFn = useServerFn(adminDeleteCallback);
  const updateFn = useServerFn(adminUpdateCallback);

  const [view, setView] = useState<ViewMode>("day");
  const [cursor, setCursor] = useState<Date>(() => startOfDay(new Date()));
  const [openId, setOpenId] = useState<string | null>(null);

  // Bereik voor de fetch: hele week rond de cursor (dekt beide views + vandaag).
  const rangeFrom = useMemo(() => addDays(startOfWeek(cursor), -7), [cursor]);
  const rangeTo = useMemo(() => addDays(startOfWeek(cursor), 14), [cursor]);

  const { data, isLoading } = useQuery({
    queryKey: ["lead-callbacks", rangeFrom.toISOString(), rangeTo.toISOString()],
    queryFn: () =>
      listFn({
        data: { from: rangeFrom.toISOString(), to: rangeTo.toISOString(), include_done: true },
      }),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["lead-callbacks"] });

  const completeM = useMutation({
    mutationFn: (v: {
      id: string;
      outcome: "done" | "no_answer" | "appointment";
      outcome_note?: string | null;
    }) => completeFn({ data: v }),
    onSuccess: () => {
      invalidate();
      setOpenId(null);
      toast.success("Uitkomst vastgelegd.");
    },
    onError: (e: any) => toast.error(e.message),
  });
  const deleteM = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      invalidate();
      setOpenId(null);
      toast.success("Terugbelactie verwijderd.");
    },
    onError: (e: any) => toast.error(e.message),
  });
  const rescheduleM = useMutation({
    mutationFn: (v: { id: string; scheduled_at: string }) => updateFn({ data: v }),
    onSuccess: () => {
      invalidate();
      toast.success("Verplaatst.");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const items: any[] = (data as any)?.items ?? [];

  // Leads die vandaag gebeld moeten worden (open, gepland voor vandaag).
  const todayOpen = useMemo(() => {
    const now = new Date();
    return items
      .filter((c) => c.status === "open" && sameDay(new Date(c.scheduled_at), now))
      .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());
  }, [items]);

  const openItem = items.find((c) => c.id === openId) ?? null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-primary" />
          <h2 className="font-display text-xl font-semibold">Terugbel-agenda</h2>
        </div>
        <div className="flex rounded-md border border-border p-0.5">
          {(
            [
              ["day", "Dag", Sun],
              ["week", "Week", CalendarDays],
            ] as const
          ).map(([v, label, Icon]) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-sm transition-colors ${view === v
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Dagoverzicht: vandaag in te plannen belletjes ── */}
      <TodayOverview items={todayOpen} onOpen={(id) => setOpenId(id)} />

      {/* ── Navigatie ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCursor((c) => addDays(c, view === "day" ? -1 : -7))}
            className="p-1.5 rounded-md border border-border hover:bg-muted/40"
            aria-label="Vorige"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCursor(startOfDay(new Date()))}
            className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted/40"
          >
            Vandaag
          </button>
          <button
            onClick={() => setCursor((c) => addDays(c, view === "day" ? 1 : 7))}
            className="p-1.5 rounded-md border border-border hover:bg-muted/40"
            aria-label="Volgende"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground capitalize">
          {view === "day"
            ? fmtDayLabel(cursor)
            : `Week van ${startOfWeek(cursor).toLocaleDateString("nl-NL", { day: "numeric", month: "long" })}`}
        </p>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Laden…</p>
      ) : view === "day" ? (
        <DayView day={cursor} items={items} onOpen={setOpenId} />
      ) : (
        <WeekView
          weekStart={startOfWeek(cursor)}
          items={items}
          onOpen={setOpenId}
          onPickDay={(d) => {
            setCursor(d);
            setView("day");
          }}
        />
      )}

      {openItem && (
        <CallbackDetailModal
          cb={openItem}
          onClose={() => setOpenId(null)}
          onComplete={(outcome, note) =>
            completeM.mutate({ id: openItem.id, outcome, outcome_note: note })
          }
          onReschedule={(iso) => rescheduleM.mutate({ id: openItem.id, scheduled_at: iso })}
          onDelete={async () => {
            if (
              await confirm({ description: "Deze terugbelactie verwijderen?", destructive: true })
            )
              deleteM.mutate(openItem.id);
          }}
          pending={completeM.isPending}
        />
      )}
    </div>
  );
}

function TodayOverview({ items, onOpen }: { items: any[]; onOpen: (id: string) => void }) {
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
      <div className="flex items-center gap-2">
        <Sun className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold">
          Vandaag in te plannen: {items.length} {items.length === 1 ? "belletje" : "belletjes"}
        </h3>
      </div>
      {items.length === 0 ? (
        <p className="mt-1.5 text-sm text-muted-foreground">
          Geen open terugbelacties voor vandaag.
        </p>
      ) : (
        <ul className="mt-3 space-y-1.5">
          {items.map((c) => {
            const col = AGENDA_COLOR_CLASSES[agendaColor(c.lead_status, c.no_answer_count)];
            return (
              <li key={c.id}>
                <button
                  onClick={() => onOpen(c.id)}
                  className="w-full flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2 text-left text-sm transition-colors hover:bg-muted/30"
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${col.dot}`} title={col.label} />
                  <span className="font-mono text-xs text-muted-foreground w-12 shrink-0">
                    {fmtTime(c.scheduled_at)}
                  </span>
                  <span className="font-medium truncate">{c.lead_company}</span>
                  <span className="text-muted-foreground truncate">· {c.reason}</span>
                  {c.lead_phone && (
                    <span className="ml-auto hidden sm:flex items-center gap-1 text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      {c.lead_phone}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function CallbackItem({
  cb,
  onOpen,
  compact,
}: {
  cb: any;
  onOpen: (id: string) => void;
  compact?: boolean;
}) {
  const col = AGENDA_COLOR_CLASSES[agendaColor(cb.lead_status, cb.no_answer_count)];
  const done = cb.status !== "open";
  return (
    <button
      onClick={() => onOpen(cb.id)}
      className={`w-full rounded-md border px-2.5 py-1.5 text-left text-xs transition-colors ${col.border} ${col.bg} hover:brightness-110 ${done ? "opacity-55" : ""}`}
    >
      <div className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${col.dot}`} />
        <span className="font-mono text-[11px] text-muted-foreground">
          {fmtTime(cb.scheduled_at)}
        </span>
        {done && <CheckCircle2 className="w-3 h-3 text-muted-foreground" />}
      </div>
      <p className={`mt-0.5 font-medium truncate ${done ? "line-through" : ""}`}>
        {cb.lead_company}
      </p>
      {!compact && <p className="text-muted-foreground truncate">{cb.reason}</p>}
    </button>
  );
}

function DayView({
  day,
  items,
  onOpen,
}: {
  day: Date;
  items: any[];
  onOpen: (id: string) => void;
}) {
  const dayItems = items
    .filter((c) => sameDay(new Date(c.scheduled_at), day))
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());

  if (dayItems.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-10 text-center text-muted-foreground">
        Geen terugbelacties op deze dag.
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {dayItems.map((c) => {
        const col = AGENDA_COLOR_CLASSES[agendaColor(c.lead_status, c.no_answer_count)];
        const done = c.status !== "open";
        return (
          <button
            key={c.id}
            onClick={() => onOpen(c.id)}
            className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${col.border} ${col.bg} hover:brightness-110 ${done ? "opacity-60" : ""}`}
          >
            <span className="font-mono text-sm text-muted-foreground w-14 shrink-0">
              {fmtTime(c.scheduled_at)}
            </span>
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${col.dot}`} title={col.label} />
            <div className="min-w-0 flex-1">
              <p className={`font-medium truncate ${done ? "line-through" : ""}`}>
                {c.lead_company}
              </p>
              <p className="text-sm text-muted-foreground truncate">{c.reason}</p>
            </div>
            {done ? (
              <span className="text-xs text-muted-foreground shrink-0">
                {CALLBACK_STATUS_LABEL[c.status as CallbackStatus]}
              </span>
            ) : (
              <span className={`text-xs font-medium shrink-0 ${col.text}`}>{col.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function WeekView({
  weekStart,
  items,
  onOpen,
  onPickDay,
}: {
  weekStart: Date;
  items: any[];
  onOpen: (id: string) => void;
  onPickDay: (d: Date) => void;
}) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
      {days.map((d) => {
        const dayItems = items
          .filter((c) => sameDay(new Date(c.scheduled_at), d))
          .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());
        return (
          <div
            key={d.toISOString()}
            className={`rounded-lg border p-2 min-h-28 ${isToday(d) ? "border-primary" : "border-border"} bg-card`}
          >
            <button
              onClick={() => onPickDay(d)}
              className={`w-full text-left text-xs font-medium capitalize mb-2 ${isToday(d) ? "text-primary" : "text-muted-foreground"} hover:underline`}
            >
              {fmtDayShort(d)}
            </button>
            <div className="space-y-1.5">
              {dayItems.length === 0 ? (
                <p className="text-[11px] text-muted-foreground/60">—</p>
              ) : (
                dayItems.map((c) => <CallbackItem key={c.id} cb={c} onOpen={onOpen} compact />)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CallbackDetailModal({
  cb,
  onClose,
  onComplete,
  onReschedule,
  onDelete,
  pending,
}: {
  cb: any;
  onClose: () => void;
  onComplete: (outcome: "done" | "no_answer" | "appointment", note: string | null) => void;
  onReschedule: (iso: string) => void;
  onDelete: () => void;
  pending: boolean;
}) {
  const [note, setNote] = useState("");
  const [when, setWhen] = useState(() => toDatetimeLocalValue(new Date(cb.scheduled_at)));
  const col = AGENDA_COLOR_CLASSES[agendaColor(cb.lead_status, cb.no_answer_count)];
  const done = cb.status !== "open";
  const outcomeIcon: Record<string, any> = {
    done: CheckCircle2,
    no_answer: PhoneOff,
    appointment: CalendarCheck,
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border border-border bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`w-3 h-3 rounded-full shrink-0 ${col.dot}`} title={col.label} />
            <div className="min-w-0">
              <h3 className="font-display text-xl font-semibold truncate">{cb.lead_company}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(cb.scheduled_at).toLocaleString("nl-NL", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {" · "}
                {cb.reason}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-muted shrink-0"
            aria-label="Sluiten"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lead-contact — het item leidt naar de bijbehorende lead. */}
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {cb.lead_phone ? (
            <a
              href={`tel:${cb.lead_phone}`}
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 hover:bg-muted/40"
            >
              <Phone className="w-4 h-4 text-blue-400" /> {cb.lead_phone}
            </a>
          ) : (
            <span className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-muted-foreground">
              <Phone className="w-4 h-4" /> Geen nummer
            </span>
          )}
          {cb.lead_email && (
            <a
              href={`mailto:${cb.lead_email}`}
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 hover:bg-muted/40"
            >
              <Mail className="w-4 h-4 text-violet-400" /> {cb.lead_email}
            </a>
          )}
          <span className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-muted-foreground">
            <Globe className={`w-4 h-4 ${cb.lead_has_website ? "text-emerald-400" : ""}`} />
            {cb.lead_has_website ? "Heeft website" : "Geen website"}
          </span>
        </div>

        {cb.note && (
          <div className="mt-4 flex items-start gap-2 rounded-md bg-muted/30 p-3 text-sm">
            <StickyNote className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
            <p className="whitespace-pre-wrap">{cb.note}</p>
          </div>
        )}

        {done ? (
          <div className="mt-5 rounded-md border border-border p-3 text-sm">
            <p className="font-medium">
              Afgehandeld: {CALLBACK_STATUS_LABEL[cb.status as CallbackStatus]}
            </p>
            {cb.outcome_note && (
              <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{cb.outcome_note}</p>
            )}
          </div>
        ) : (
          <>
            {/* Uitkomst na het bellen — houdt de agenda actueel. */}
            <div className="mt-5">
              <h4 className="text-sm font-medium mb-2">Uitkomst na het bellen</h4>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optionele notitie bij de uitkomst…"
                className="mb-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <div className="flex flex-wrap gap-2">
                {CALLBACK_OUTCOMES.map((o) => {
                  const Icon = outcomeIcon[o.value];
                  return (
                    <button
                      key={o.value}
                      disabled={pending}
                      onClick={() => onComplete(o.value, note.trim() || null)}
                      className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/40 disabled:opacity-50"
                    >
                      <Icon className="w-4 h-4" /> {o.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Verzetten */}
            <div className="mt-5">
              <h4 className="text-sm font-medium mb-2">Verzetten</h4>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="datetime-local"
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <button
                  onClick={() => onReschedule(new Date(when).toISOString())}
                  className="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/40"
                >
                  Verplaatsen
                </button>
              </div>
            </div>
          </>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 rounded-md border border-destructive/40 px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" /> Verwijderen
          </button>
        </div>
      </div>
    </div>
  );
}
