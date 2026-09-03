import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const RED = "#fe2c02";

export type ServiceExample = { src: string; alt: string };

/* Uit ServicePage.tsx getrokken zodat branche-/stadspagina's (LocationPageV2,
   BranchPage) dezelfde voorbeeldslideshow kunnen hergebruiken in plaats van
   zonder enige afbeelding te blijven — zie SEO-audit 2026-09-02 (visual.md #2,
   sxo.md SXO-4, geo.md #4). */
export function ExampleSlideshow({ images }: { images: ServiceExample[] }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (images.length < 2) return;
    const el = containerRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      if (timer === undefined) {
        timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
      }
    };
    const stop = () => {
      clearInterval(timer);
      timer = undefined;
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && document.visibilityState === "visible") start();
      else stop();
    });
    io.observe(el);

    const onVisibility = () => {
      if (document.visibilityState === "hidden") stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, [images.length]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1440 / 900",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 24px 60px -20px rgba(0,0,0,0.6)",
      }}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          width={1440}
          height={900}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "2px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: "0px",
          }}
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Toon voorbeeld ${i + 1}`}
              aria-current={i === index}
              style={{
                width: "32px",
                height: "32px",
                display: "grid",
                placeItems: "center",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "9999px",
                  background: i === index ? RED : "rgba(255,255,255,0.35)",
                  transition: "background 0.2s",
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* Generieke voorbeeldenset, al gebruikt op /website-laten-maken. Branche- en
   stadspagina's tonen dezelfde set — geen nep-branchespecifieke screenshots
   verzinnen, wel tenminste íets van visueel bewijs tonen i.p.v. niets. */
export const GENERIC_EXAMPLES: ServiceExample[] = [
  {
    src: "/voorbeelden/voorbeeld-website-1-architectuur.webp",
    alt: "Voorbeeld website voor een architectenbureau",
  },
  {
    src: "/voorbeelden/voorbeeld-website-2-praktijk.webp",
    alt: "Voorbeeld website voor een praktijk",
  },
  {
    src: "/voorbeelden/voorbeeld-website-3-saas.webp",
    alt: "Voorbeeld website voor een SaaS-bedrijf",
  },
];
