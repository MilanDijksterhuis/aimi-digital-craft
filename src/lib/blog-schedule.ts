// Pure datumberekening voor bulk-plannen, gedeeld door de preview in de UI
// (BulkScheduleDialog) en de server-implementatie (blog.server.ts), zodat de
// preview die de gebruiker bevestigt exact overeenkomt met wat opgeslagen wordt.

export type BulkScheduleOptions = {
  /** "YYYY-MM-DD" */
  startDate: string;
  /** "HH:mm", lokale tijd van de browser/server. */
  startTime: string;
  intervalDays: number;
  workdaysOnly: boolean;
};

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/** Rolt zaterdag/zondag door naar de eerstvolgende maandag. */
function rollToWorkday(date: Date): Date {
  const day = date.getDay(); // 0 = zondag, 6 = zaterdag
  if (day === 6) return addDays(date, 2);
  if (day === 0) return addDays(date, 1);
  return date;
}

/**
 * Berekent voor `count` items de publicatiedatum/tijd: item 0 krijgt de
 * startdatum, elk volgend item schuift `intervalDays` op. Met workdaysOnly
 * wordt een resultaat dat op een weekenddag valt doorgerold naar maandag
 * (de opgetelde interval-stappen blijven ongewijzigd, alleen de uiteindelijke
 * datum wordt gecorrigeerd).
 */
export function computeScheduleDates(count: number, opts: BulkScheduleOptions): Date[] {
  const [h, m] = opts.startTime.split(":").map(Number);
  const [y, mo, d] = opts.startDate.split("-").map(Number);
  const base = new Date(y, (mo ?? 1) - 1, d ?? 1, h ?? 9, m ?? 0, 0, 0);

  const dates: Date[] = [];
  for (let i = 0; i < count; i++) {
    let dt = addDays(base, i * opts.intervalDays);
    if (opts.workdaysOnly) dt = rollToWorkday(dt);
    dates.push(dt);
  }
  return dates;
}
