import { useEffect } from "react";

const STORAGE_KEY = "aimi_cookie_consent";
const TRACK_SRC = "/track.js?u=6a34e404-ba3e-42d4-965c-62d04aef0f93";

type CookiePrefs = { necessary: true; analytics: boolean; marketing: boolean };

function readPrefs(): CookiePrefs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function loadTrackJs(): void {
  if (document.querySelector(`script[src="${TRACK_SRC}"]`)) return;
  const s = document.createElement("script");
  s.src = TRACK_SRC;
  s.async = true;
  document.body.appendChild(s);
}

/** Laadt track.js pas na toestemming voor analytische cookies, zoals het
 * privacybeleid belooft — in plaats van onvoorwaardelijk vanuit __root.tsx. */
export function AnalyticsLoader() {
  useEffect(() => {
    const prefs = readPrefs();
    if (prefs?.analytics) loadTrackJs();

    const onPrefs = (e: Event) => {
      const detail = (e as CustomEvent<CookiePrefs>).detail;
      if (detail?.analytics) loadTrackJs();
    };
    window.addEventListener("aimi-cookie-prefs", onPrefs);
    return () => window.removeEventListener("aimi-cookie-prefs", onPrefs);
  }, []);

  return null;
}
