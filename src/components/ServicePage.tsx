import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ExampleSlideshow, type ServiceExample } from "@/components/ExampleSlideshow";
import { UpdatedOn } from "@/components/UpdatedOn";
import { webPageJsonLd } from "@/lib/seo";

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

export function ServicePage({ data, path }: { data: ServicePageData; path?: string }) {
  const {
    kicker,
    h1,
    intro,
    offerings,
    steps,
    priceLabel,
    priceNote,
    related,
    ctaTitle,
    ctaText,
    examples,
  } = data;
  const [openOfferings, setOpenOfferings] = useState<Set<number>>(new Set());
  const toggleOffering = (i: number) =>
    setOpenOfferings((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div
      style={{
        position: "relative",
        background: BG,
        color: "#efeff1",
        minHeight: "100dvh",
        fontFamily: FONT,
      }}
    >
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

      {/* WebPage-schema met dateModified (GEO-audit 2026-09-06). Alleen als de
          route een pad meegeeft. */}
      {path && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: webPageJsonLd({ path, name: h1, description: intro }).children,
          }}
        />
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav />

        <main id="main-content" className="mx-auto max-w-6xl px-6 pt-28 pb-16">
          {/* Hero */}
          <section
            className={
              examples && examples.length > 0
                ? "grid md:grid-cols-[1fr_1.15fr] gap-12 items-center"
                : undefined
            }
          >
            <div>
              {/* A-29 + I-5: dit was een generieke "← Terug naar home"-link. Een
                echt kruimelpad spiegelt de BreadcrumbList-markup én levert een
                beschrijvende ankertekst op. */}
              <Breadcrumbs
                trail={[
                  ["Home", "/"],
                  [h1, "#"],
                ]}
              />
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
              {path && <UpdatedOn path={path} style={{ marginBottom: "14px" }} />}
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#b6b6bd", maxWidth: "62ch" }}>
                {intro}
              </p>
              <div style={{ marginTop: "26px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <a
                  href="/contact"
                  style={{
                    padding: "12px 22px",
                    background: RED,
                    color: "#fff",
                    borderRadius: "4px",
                    fontWeight: 600,
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  Vraag een offerte aan
                </a>
                <a
                  href="/tarieven"
                  style={{
                    padding: "12px 22px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "#efeff1",
                    borderRadius: "4px",
                    fontWeight: 600,
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
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

          {/* Wat je krijgt — uitklapbare vakken, geen genummerde kopjes */}
          <section style={{ marginTop: "76px" }}>
            <h2
              style={{
                fontSize: "clamp(17px, 2.3vw, 22px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Wat je krijgt
            </h2>
            <p style={{ marginTop: "10px", fontSize: "13px", color: "#7d7d85" }}>
              Klik op een onderdeel voor meer uitleg.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {offerings.map((o, i) => {
                const isOpen = openOfferings.has(i);
                return (
                  <div
                    key={o.title}
                    className={`rounded-2xl border p-7 transition-all duration-300 ${
                      isOpen
                        ? "border-[rgba(254,44,2,0.4)] bg-[rgba(254,44,2,0.05)]"
                        : "border-white/10 bg-white/[0.02] hover:border-[rgba(254,44,2,0.3)] hover:-translate-y-0.5"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleOffering(i)}
                      aria-expanded={isOpen}
                      aria-controls={`offering-panel-${i}`}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "16px",
                        width: "100%",
                        padding: 0,
                        font: "inherit",
                        color: "inherit",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <div>
                        <h3 style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.01em" }}>
                          {o.title}
                        </h3>
                        <p style={{ marginTop: "8px", fontSize: "13.5px", lineHeight: 1.6, color: "#9a9aa2" }}>
                          {o.desc}
                        </p>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ flex: "none", marginTop: "4px", color: isOpen ? RED : "#a4a9b2" }}
                      >
                        <Plus className="w-5 h-5" strokeWidth={1.5} />
                      </motion.span>
                    </button>
                    <motion.div
                      id={`offering-panel-${i}`}
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <ul
                        style={{
                          margin: "20px 0 0",
                          paddingTop: "18px",
                          borderTop: "1px solid rgba(255,255,255,0.1)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {o.details.map((d) => (
                          <li
                            key={d}
                            style={{
                              position: "relative",
                              paddingLeft: "16px",
                              fontSize: "13px",
                              lineHeight: 1.6,
                              color: "#b6b6bd",
                            }}
                          >
                            <span
                              aria-hidden
                              style={{
                                position: "absolute",
                                left: 0,
                                top: "7px",
                                width: "4px",
                                height: "4px",
                                borderRadius: "9999px",
                                background: RED,
                              }}
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Proces — verbonden stappenlijn i.p.v. losse kaarten */}
          <section style={{ marginTop: "76px" }}>
            <h2
              style={{
                fontSize: "clamp(17px, 2.3vw, 22px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Zo werkt het
            </h2>
            <div style={{ marginTop: "38px", position: "relative" }}>
              <div
                aria-hidden
                className="hidden md:block"
                style={{
                  position: "absolute",
                  top: "15px",
                  left: `calc(100% / ${steps.length * 2})`,
                  right: `calc(100% / ${steps.length * 2})`,
                  height: "1px",
                  background:
                    "linear-gradient(to right, rgba(254,44,2,0.4), rgba(255,255,255,0.08))",
                }}
              />
              <div className="grid gap-y-10 gap-x-6 md:grid-cols-4">
                {steps.map((s, i) => (
                  <div key={s.title} style={{ position: "relative" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "30px",
                        height: "30px",
                        borderRadius: "9999px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: RED,
                        border: `1px solid rgba(254,44,2,0.5)`,
                        background: BG,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {i + 1}
                    </div>
                    <h3 style={{ fontSize: "15.5px", fontWeight: 600, margin: "18px 0 8px" }}>
                      {s.title}
                    </h3>
                    <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#9a9aa2" }}>
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
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
              <div style={{ fontSize: "12px", color: "#9a9aa2", marginBottom: "6px" }}>
                Prijsindicatie
              </div>
              <div
                style={{
                  fontSize: "clamp(24px, 4vw, 34px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {priceLabel}
              </div>
              <p style={{ marginTop: "8px", fontSize: "13px", color: "#9a9aa2", maxWidth: "46ch" }}>
                {priceNote}
              </p>
            </div>
            <a
              href="/contact"
              style={{
                padding: "13px 26px",
                background: RED,
                color: "#fff",
                borderRadius: "4px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Offerte aanvragen
            </a>
          </section>

          {/* Interne links */}
          {related.length > 0 && (
            <section style={{ marginTop: "56px" }}>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBottom: "14px",
                  color: "#b6b6bd",
                }}
              >
                Ook interessant
              </h2>
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
              padding: "48px 0 0",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(19px, 3vw, 24px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              {ctaTitle}
            </h2>
            <p
              style={{
                margin: "12px auto 20px",
                fontSize: "14px",
                color: "#b6b6bd",
                maxWidth: "52ch",
              }}
            >
              {ctaText}
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                padding: "13px 28px",
                background: RED,
                color: "#fff",
                borderRadius: "4px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
              }}
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
