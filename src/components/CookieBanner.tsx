import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

type CookiePrefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "aimi_cookie_consent";

function loadPrefs(): CookiePrefs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function savePrefs(prefs: CookiePrefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!loadPrefs()) setVisible(true);
  }, []);

  const accept = () => {
    savePrefs({ necessary: true, analytics: true, marketing: true });
    setVisible(false);
  };

  const reject = () => {
    savePrefs({ necessary: true, analytics: false, marketing: false });
    setVisible(false);
  };

  const saveCustom = () => {
    savePrefs({ necessary: true, analytics, marketing });
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 z-50 w-full max-w-lg px-4"
          style={{ transform: "translateX(-50%)" }}
        >
          <div
            className="rounded-2xl p-6 shadow-2xl"
            style={{
              background: "#1e1f1f",
              border: "1px solid #2a2b2b",
              fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
            }}
          >
            <p className="text-white text-sm font-medium mb-1">
              Wij gebruiken cookies
            </p>
            <p className="text-sm mb-4" style={{ color: "#8a8f98" }}>
              We gebruiken cookies om de site goed te laten werken en om te begrijpen hoe bezoekers de site gebruiken. Jij bepaalt wat je toestaat.
            </p>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden mb-4"
                >
                  <div className="flex flex-col gap-3 pt-1">
                    {/* Noodzakelijk */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-white text-xs font-medium">Noodzakelijk</p>
                        <p className="text-xs mt-0.5" style={{ color: "#8a8f98" }}>
                          Vereist voor de werking van de site. Kan niet worden uitgeschakeld.
                        </p>
                      </div>
                      <div
                        className="shrink-0 w-9 h-5 rounded-full flex items-center justify-end pr-1"
                        style={{ background: "#49de80" }}
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-white" />
                      </div>
                    </div>

                    {/* Analytisch */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-white text-xs font-medium">Analytisch</p>
                        <p className="text-xs mt-0.5" style={{ color: "#8a8f98" }}>
                          Helpt ons begrijpen hoe bezoekers de site gebruiken.
                        </p>
                      </div>
                      <button
                        onClick={() => setAnalytics((v) => !v)}
                        className="shrink-0 w-9 h-5 rounded-full flex items-center transition-all duration-200"
                        style={{
                          background: analytics ? "#49de80" : "#3a3b3b",
                          justifyContent: analytics ? "flex-end" : "flex-start",
                          paddingLeft: analytics ? 0 : 4,
                          paddingRight: analytics ? 4 : 0,
                        }}
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-white" />
                      </button>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-white text-xs font-medium">Marketing</p>
                        <p className="text-xs mt-0.5" style={{ color: "#8a8f98" }}>
                          Wordt gebruikt voor gepersonaliseerde advertenties.
                        </p>
                      </div>
                      <button
                        onClick={() => setMarketing((v) => !v)}
                        className="shrink-0 w-9 h-5 rounded-full flex items-center transition-all duration-200"
                        style={{
                          background: marketing ? "#49de80" : "#3a3b3b",
                          justifyContent: marketing ? "flex-end" : "flex-start",
                          paddingLeft: marketing ? 0 : 4,
                          paddingRight: marketing ? 4 : 0,
                        }}
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={accept}
                className="btn-primary text-xs px-4 py-2"
                style={{ borderRadius: "9999px", fontSize: 13 }}
              >
                Alles accepteren
              </button>
              <button
                onClick={reject}
                className="btn-secondary text-xs px-4 py-2"
                style={{ borderRadius: "9999px", fontSize: 13 }}
              >
                Alleen noodzakelijk
              </button>
              {expanded ? (
                <button
                  onClick={saveCustom}
                  className="text-xs underline underline-offset-2 transition-colors"
                  style={{ color: "#8a8f98" }}
                >
                  Opslaan
                </button>
              ) : (
                <button
                  onClick={() => setExpanded(true)}
                  className="text-xs underline underline-offset-2 transition-colors"
                  style={{ color: "#8a8f98" }}
                >
                  Aanpassen
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
