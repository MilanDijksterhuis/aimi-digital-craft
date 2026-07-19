import React, { useState } from "react";
import { X, CalendarClock } from "lucide-react";
import { CALLBACK_REASONS, suggestCallbackDate, toDatetimeLocalValue } from "@/lib/callbacks";

export type CallbackScheduleValue = {
  reason: string;
  note: string | null;
  scheduled_at: string;
  auto_scheduled: boolean;
};

/**
 * Het inplan-formulier zelf (reden, notitie, automatisch/handmatig moment).
 * Los van een modal, zodat het zowel in een pop-up als inline (uitklappend
 * binnen de lead-pop-up) gebruikt kan worden.
 */
export function CallbackScheduleForm({
  onSchedule,
  onCancel,
  pending,
  autoFocusReason,
}: {
  onSchedule: (v: CallbackScheduleValue) => void;
  onCancel: () => void;
  pending: boolean;
  autoFocusReason?: boolean;
}) {
  const [reasonChoice, setReasonChoice] = useState<string>(CALLBACK_REASONS[0]);
  const [customReason, setCustomReason] = useState("");
  const [note, setNote] = useState("");
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [manualWhen, setManualWhen] = useState(() => toDatetimeLocalValue(suggestCallbackDate()));

  const isCustom = reasonChoice === "__custom__";
  const reason = isCustom ? customReason.trim() : reasonChoice;
  const canSubmit = reason.length > 0 && (autoSchedule || manualWhen.length > 0);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const when = autoSchedule ? suggestCallbackDate() : new Date(manualWhen);
    onSchedule({
      reason,
      note: note.trim() || null,
      scheduled_at: when.toISOString(),
      auto_scheduled: autoSchedule,
    });
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div>
        <label className="text-sm font-medium">Reden</label>
        <select
          value={reasonChoice}
          onChange={(e) => setReasonChoice(e.target.value)}
          autoFocus={autoFocusReason}
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {CALLBACK_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
          <option value="__custom__">Andere reden…</option>
        </select>
        {isCustom && (
          <input
            autoFocus
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder="Typ een eigen reden…"
            maxLength={120}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Notitie (optioneel)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Extra context voor het gesprek…"
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={autoSchedule}
          onChange={(e) => setAutoSchedule(e.target.checked)}
          className="w-4 h-4 accent-primary"
        />
        Automatisch inplannen
        <span className="text-xs text-muted-foreground">(morgen, zelfde tijd)</span>
      </label>

      {!autoSchedule && (
        <div>
          <label className="text-sm font-medium">Datum en tijd</label>
          <input
            type="datetime-local"
            value={manualWhen}
            onChange={(e) => setManualWhen(e.target.value)}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
      )}

      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/40"
        >
          Annuleren
        </button>
        <button
          type="submit"
          disabled={pending || !canSubmit}
          className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Inplannen…" : "Inplannen"}
        </button>
      </div>
    </form>
  );
}

/**
 * Klein pop-up menu om vanuit een lead een terugbelmoment in te plannen.
 * (Behouden voor losstaand gebruik; de lead-pop-up klapt het formulier inline uit.)
 */
export function CallbackScheduleModal({
  leadName,
  onClose,
  onSchedule,
  pending,
}: {
  leadName: string;
  onClose: () => void;
  onSchedule: (v: CallbackScheduleValue) => void;
  pending: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-border bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-display text-lg font-semibold">Terugbel inplannen</h3>
              <p className="text-xs text-muted-foreground">{leadName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-muted" aria-label="Sluiten">
            <X className="w-5 h-5" />
          </button>
        </div>
        <CallbackScheduleForm onSchedule={onSchedule} onCancel={onClose} pending={pending} />
      </div>
    </div>
  );
}
