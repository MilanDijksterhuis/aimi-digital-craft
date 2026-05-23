import { useEffect, useState } from "react";

export function A11yBar() {
  const [contrast, setContrast] = useState(false);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const c = localStorage.getItem("a11y-contrast") === "1";
    const s = (localStorage.getItem("a11y-size") as "sm" | "md" | "lg") || "md";
    setContrast(c);
    setSize(s);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.toggle("high-contrast", contrast);
    root.classList.remove("font-sm", "font-md", "font-lg");
    root.classList.add(`font-${size}`);
    localStorage.setItem("a11y-contrast", contrast ? "1" : "0");
    localStorage.setItem("a11y-size", size);
  }, [contrast, size]);

  return (
    <div
      role="region"
      aria-label="Toegankelijkheid"
      className="fixed bottom-3 left-3 z-50 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card/95 backdrop-blur p-2 text-xs shadow-lg max-w-[calc(100vw-1.5rem)]"
    >
      <span className="text-muted-foreground px-2">Toegankelijkheid:</span>
      <button
        type="button"
        onClick={() => setContrast((v) => !v)}
        aria-pressed={contrast}
        aria-label="Hoog contrast modus omschakelen"
        className={`rounded-full border px-3 py-1 focus-visible:ring-2 focus-visible:ring-ring ${contrast ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
      >
        Hoog contrast
      </button>
      <span className="text-muted-foreground ml-2">Tekstgrootte:</span>
      {(["sm", "md", "lg"] as const).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => setSize(s)}
          aria-pressed={size === s}
          aria-label={`Tekstgrootte ${s === "sm" ? "klein" : s === "md" ? "normaal" : "groot"}`}
          className={`rounded-full border w-8 h-8 focus-visible:ring-2 focus-visible:ring-ring ${size === s ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
        >
          {s === "sm" ? "S" : s === "md" ? "M" : "L"}
        </button>
      ))}
    </div>
  );
}
