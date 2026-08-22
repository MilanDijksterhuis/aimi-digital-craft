import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";

/* ---------------------------------------------------------------------------
 * Herbruikbare dienst-/contentpagina in de AIMI-huisstijl (donker + rood).
 * Elke pagina levert unieke content aan via props — geen thin content en geen
 * duplicate content. Bevat H1, dienst-uitleg, proces, prijsindicatie,
 * interne links en een CTA richting /contact.
 * ------------------------------------------------------------------------- */

const RED = "#fe2c02";
const BG = "#1a1a1a";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

export type InternalLink = { label: string; href: string };
export type ServiceExample = { src: string; alt: string };

export type ServicePageData = {
  kicker: string;
  h1: string;
  intro: string;
  offerings: { title: string; desc: string; details: string[] }[];
  steps: { title: string; desc: string }[];
  priceLabel: string;
  priceNote: string;
  related: InternalLink[];
  ctaTitle: string;
  ctaText: string;
  examples?: ServiceExample[];
};

function ExampleSlideshow({ images }: { images: ServiceExample[] }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* A-40: de timer liep permanent door, ook buiten het viewport en op mobiel
     waar het element verborgen was. Nu draait hij alleen als de slideshow
     daadwerkelijk zichtbaar is, en respecteert hij prefers-reduced-motion. */
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
          /* A-48: expliciete afmetingen + loading/decoding. CLS was al afgevangen
             door de aspect-ratio op de container, maar de attributen horen erop. */
          width={1440}
          height={900}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div style={{ position: "absolute", bottom: "2px", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "0px" }}>
          {images.map((img, i) => (
            /* M-5: het tapdoel was 8x8 px. De stip blijft visueel 8 px, maar het
               klikbare gebied is nu 32x32 — relevant nu de slideshow ook op
               mobiel staat (A-16). */
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

export function ServicePage({ data }: { data: ServicePageData }) {
  const { kicker, h1, intro, offerings, steps, priceLabel, priceNote, related, ctaTitle, ctaText, examples } = data;
  const [openOffering, setOpenOffering] = useState<number | null>(null);

  return (
    <div style={{ position: "relative", background: BG, color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      {/* Sfeer-achtergrond: zachte rode gloed + heel fijne grid, in de huisstijl */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundColor: BG,
          backgroundImage: [
            "radial-gradient(62% 48% at 85% -5%, rgba(254,44,2,0.13), transparent 68%)",
            "radial-gradient(48% 42% at 2% 108%, rgba(254,44,2,0.07), transparent 70%)",
          ].join(","),
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
      <Nav />

      <main id="main-content" className="mx-auto max-w-5xl px-6 pt-28 pb-16">
        {/* Hero */}
        <section
          className={examples && examples.length > 0 ? "grid md:grid-cols-[1fr_1.15fr] gap-12 items-center" : undefined}
        >
          <div>
            {/* A-29 + I-5: dit was een generieke "← Terug naar home"-link. Een
                echt kruimelpad spiegelt de BreadcrumbList-markup én levert een
                beschrijvende ankertekst op. */}
            <Breadcrumbs trail={[["Home", "/"], [h1, "#"]]} />
            <div
              style={{
                marginTop: "28px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: RED,
              }}
            >
              {kicker}
            </div>
            <h1
              style={{
                margin: "14px 0 18px",
                fontSize: "clamp(22px, 3.4vw, 34px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {h1}
            </h1>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#b6b6bd", maxWidth: "62ch" }}>{intro}</p>
            <div style={{ marginTop: "26px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a
                href="/contact"
                style={{ padding: "12px 22px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}
              >
                Vraag een offerte aan
              </a>
              <a
                href="/tarieven"
                style={{ padding: "12px 22px", border: "1px solid rgba(255,255,255,0.18)", color: "#efeff1", borderRadius: "4px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}
              >
                Bekijk tarieven
              </a>
            </div>
          </div>
          {examples && examples.length > 0 && (
            /* A-16: stond op `hidden md:block`. Dit zijn de enige echte
               afbeeldingen van de site, dus bij mobile-first indexing bestonden
               ze voor Google niet. Nu ook op mobiel zichtbaar. */
            <div className="mt-10 md:mt-0">
              <ExampleSlideshow images={examples} />
            </div>
          )}
        </section>

        {/* Wat je krijgt — uitklapbare kaarten */}
        <section style={{ marginTop: "64px" }}>
          <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Wat je krijgt</h2>
          <p style={{ marginTop: "10px", fontSize: "13px", color: "#7d7d85" }}>Klik op een onderdeel voor meer uitleg.</p>
          <div
            style={{
              marginTop: "26px",
              display: "grid",
              gap: "16px",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              alignItems: "start",
            }}
          >
            {offerings.map((o, i) => {
              const isOpen = openOffering === i;
              return (
                /* A-57: dit was een klikbare motion.div zonder role, tabIndex of
                   keyboard-handler. Nu het standaard accordion-patroon: de knop
                   zit ín de heading (een <h3> mag niet binnen een <button>), met
                   aria-expanded en aria-controls. */
                <motion.div
                  key={o.title}
                  whileHover={{ y: -3, borderColor: "rgba(254,44,2,0.35)" }}
                  transition={{ duration: 0.18 }}
                  style={{
                    padding: "22px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: isOpen ? "rgba(254,44,2,0.05)" : "rgba(255,255,255,0.02)",
                  }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>
                    <button
                      type="button"
                      onClick={() => setOpenOffering(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`offering-panel-${i}`}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "12px",
                        width: "100%",
                        marginBottom: "8px",
                        padding: 0,
                        font: "inherit",
                        color: "inherit",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <span>{o.title}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ flex: "none", color: isOpen ? RED : "#a4a9b2", marginTop: "2px" }}
                      >
                        <Plus className="w-4 h-4" strokeWidth={1.5} />
                      </motion.span>
                    </button>
                  </h3>
                  <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#9a9aa2" }}>{o.desc}</p>
                  <motion.div
                    id={`offering-panel-${i}`}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <ul style={{ margin: "16px 0 2px", paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {o.details.map((d) => (
                        <li key={d} style={{ fontSize: "13px", lineHeight: 1.6, color: "#b6b6bd" }}>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Proces — genummerde stappenkaarten */}
        <section style={{ marginTop: "64px" }}>
          <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Zo werkt het</h2>
          <div
            style={{
              marginTop: "26px",
              display: "grid",
              gap: "16px",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
          >
            {steps.map((s, i) => (
              <div
                key={s.title}
                style={{
                  position: "relative",
                  padding: "24px 22px 22px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    borderRadius: "9999px",
                    marginBottom: "16px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: RED,
                    border: `1px solid rgba(254,44,2,0.4)`,
                    background: "rgba(254,44,2,0.08)",
                  }}
                >
                  {i + 1}
                </div>
                <h3 style={{ fontSize: "15.5px", fontWeight: 600, marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#9a9aa2" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prijs */}
        <section
          style={{
            marginTop: "64px",
            padding: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.02)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", color: "#9a9aa2", marginBottom: "6px" }}>Prijsindicatie</div>
            <div style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em" }}>{priceLabel}</div>
            <p style={{ marginTop: "8px", fontSize: "13px", color: "#9a9aa2", maxWidth: "46ch" }}>{priceNote}</p>
          </div>
          <a
            href="/contact"
            style={{ padding: "13px 26px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "14px", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Offerte aanvragen
          </a>
        </section>

        {/* Interne links */}
        {related.length > 0 && (
          <section style={{ marginTop: "56px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "14px", color: "#b6b6bd" }}>Ook interessant</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {related.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    padding: "9px 16px",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: "9999px",
                    fontSize: "13px",
                    color: "#efeff1",
                    textDecoration: "none",
                  }}
                >
                  {l.label} →
                </a>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section
          style={{
            marginTop: "56px",
            padding: "34px",
            borderRadius: "8px",
            border: "1px solid rgba(254,44,2,0.3)",
            background: "rgba(254,44,2,0.06)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "clamp(19px, 3vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em" }}>{ctaTitle}</h2>
          <p style={{ margin: "12px auto 20px", fontSize: "14px", color: "#b6b6bd", maxWidth: "52ch" }}>{ctaText}</p>
          <a
            href="/contact"
            style={{ display: "inline-block", padding: "13px 28px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}
          >
            Neem contact op
          </a>
        </section>
      </main>

      <Footer />
      <CookieBanner />
      </div>
    </div>
  );
}
