// Gedeelde constanten voor de Terugbel-agenda.
// Zowel de agendapagina (CallbackAgenda) als het inplan-menu in de LeadsPanel
// leunen hierop, zodat labels/kleuren op één plek staan en de feature
// makkelijk uit te breiden is.

/** Vaste redenen voor een terugbelactie. Sales kan daarnaast een eigen reden typen. */
export const CALLBACK_REASONS = [
  "Geen gehoor",
  "Interesse",
  "Later terugbellen",
  "Offerte besproken",
] as const;

export type CallbackStatus = "open" | "done" | "no_answer" | "appointment" | "cancelled";

export const CALLBACK_STATUS_LABEL: Record<CallbackStatus, string> = {
  open: "Gepland",
  done: "Gebeld",
  no_answer: "Geen gehoor",
  appointment: "Afspraak gemaakt",
  cancelled: "Geannuleerd",
};

/** Uitkomsten die sales na een belmoment kan kiezen (snel de agenda actueel houden). */
export const CALLBACK_OUTCOMES = [
  { value: "done" as const, label: "Gebeld" },
  { value: "no_answer" as const, label: "Geen gehoor" },
  { value: "appointment" as const, label: "Afspraak gemaakt" },
];

/**
 * Kleurcodering voor een agenda-item, op basis van lead-status en het aantal
 * keer "geen gehoor". Toont in één oogopslag prioriteit:
 *   groen  = warme lead / interesse
 *   geel   = nieuw / nog te kwalificeren
 *   rood   = koud / meerdere keren geen gehoor
 */
export type AgendaColor = "green" | "yellow" | "red";

export function agendaColor(leadStatus: string, noAnswerCount = 0): AgendaColor {
  if (leadStatus === "interesse" || leadStatus === "klant") return "green";
  if (leadStatus === "geen_interesse" || noAnswerCount >= 2) return "red";
  return "yellow";
}

/** Tailwind-klassen per kleur, in dezelfde stijl als de rest van het portaal. */
export const AGENDA_COLOR_CLASSES: Record<
  AgendaColor,
  { dot: string; border: string; bg: string; text: string; label: string }
> = {
  green: {
    dot: "bg-emerald-400",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    label: "Warm",
  },
  yellow: {
    dot: "bg-amber-400",
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    label: "Te kwalificeren",
  },
  red: {
    dot: "bg-red-400",
    border: "border-red-500/40",
    bg: "bg-red-500/10",
    text: "text-red-400",
    label: "Koud",
  },
};

/** Stel een automatisch terugbelmoment voor: +1 dag, zelfde tijdstip. */
export function suggestCallbackDate(from: Date = new Date()): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + 1);
  return d;
}

/** `Date` → waarde voor een <input type="datetime-local"> (lokale tijd, geen UTC-shift). */
export function toDatetimeLocalValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
