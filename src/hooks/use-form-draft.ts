import { useCallback, useEffect, useRef } from "react";

// UX-0.5: bewaart formulier-invoer als draft in localStorage zodat er geen data
// verloren gaat bij per ongeluk sluiten, refresh of (idle) uitloggen. Herstelt
// de draft eenmalig bij mount en biedt clear() om te wissen na een succesvolle
// verzending.
//
// Let op: gebruik dit alleen voor formulieren die leeg starten. Voor
// server-voorgevulde formulieren zou het herstellen een oudere draft over
// verse serverdata heen zetten.
export function useFormDraft<T>(key: string, value: T, restore: (draft: T) => void): () => void {
  const restored = useRef(false);

  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    try {
      const raw = localStorage.getItem(key);
      if (raw) restore(JSON.parse(raw) as T);
    } catch {
      /* corrupte/afwezige draft — negeren */
    }
    // Alleen bij mount herstellen; restore/value bewust buiten de deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* quota/privacy-modus — negeren */
      }
    }, 400);
    return () => clearTimeout(t);
  }, [key, value]);

  return useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* negeren */
    }
  }, [key]);
}
