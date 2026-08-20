import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Server, Zap, Search, ArrowRight, Check, Plus } from "lucide-react";
import { CookieBanner } from "@/components/CookieBanner";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { OG_IMAGE_URL, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

/* ---------------------------------------------------------------------------
 * "Meer diensten" — rustige, geanimeerde pagina in de AIMI-huisstijl.
 * Vervangt de vorige interactieve boom: te druk, te weinig leesbaar.
 * Scroll-reveals + ambient glow, verder gewoon leesbare content.
 * ------------------------------------------------------------------------- */

const RED = "#fe2c02";
const BG = "#1a1a1a";
const PANEL = "#222222";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

const SERVICES = [
  {
    key: "hosting",
    icon: Server,
    label: "Hosting",
    serviceType: "Webhosting",
    price: "€ 29,50",
    suffix: "/maand",
    desc: "Snelle, veilige hosting met monitoring en updates. We nemen je bestaande site over, ongeacht waar hij nu draait.",
    points: [
      "Dagelijkse back-ups en 24/7 monitoring",
      "SSL, updates en security-patches inbegrepen",
      "Nederlandse servers, geen verrassingen",
    ],
  },
  {
    key: "perf",
    icon: Zap,
    label: "Performance",
    serviceType: "Website performance-optimalisatie",
    price: "Op aanvraag",
    suffix: "",
    desc: "Snelheidsoptimalisatie voor een snellere, soepelere site, merkbaar voor bezoekers én voor Google.",
    points: [
      "Core Web Vitals naar groen",
      "Afbeeldingen, caching en scripts geoptimaliseerd",
      "Meetrapport voor en na",
    ],
  },
  {
    key: "seo",
    icon: Search,
    label: "SEO",
    serviceType: "Zoekmachineoptimalisatie",
    price: "Op aanvraag",
    suffix: "",
    desc: "Vindbaarheid verbeteren met technische en content-SEO, gericht op zoekwoorden die klanten opleveren.",
    points: [
      "Technische audit en fixes",
      "Zoekwoordonderzoek en contentplan",
      "Maandelijkse rapportage",
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] },
});

export const Route = createFileRoute("/meer-diensten")({
  head: () => ({
    meta: [
      { title: "Meer diensten | Hosting, performance & SEO — AIMI" },
      {
        name: "description",
        content:
          "Losse diensten van AIMI: hosting, performance-optimalisatie en SEO. Voor wie al een website heeft en alleen die diensten los nodig heeft.",
      },
      { property: "og:title", content: "Meer diensten — AIMI" },
      {
        property: "og:description",
        content: "Hosting, performance en SEO ook los af te nemen.",
      },
      { property: "og:url", content: "https://aimi-development.nl/meer-diensten" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Meer diensten — AIMI" },
      { name: "twitter:description", content: "Hosting, performance en SEO ook los af te nemen." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: "https://aimi-development.nl/meer-diensten" }],
    scripts: [
      breadcrumbJsonLd([["Home", "/"], ["Meer diensten", "/meer-diensten"]]),
      ...SERVICES.map((s) =>
        serviceJsonLd({
          name: s.label,
          serviceType: s.serviceType,
          description: s.desc,
          url: "https://aimi-development.nl/meer-diensten",
        }),
      ),
    ],
  }),
  component: MeerDiensten,
});

function MeerDiensten() {
  const [openService, setOpenService] = useState<string | null>(null);

  return (
    <div
      style={{
        position: "relative",
        background: BG,
        color: "#efeff1",
        minHeight: "100dvh",
        fontFamily: FONT,
        overflowX: "hidden",
      }}
    >
      <Nav />

      <main id="main-content" className="mx-auto max-w-5xl px-6 pt-28 pb-16" style={{ position: "relative", zIndex: 1 }}>
        {/* Hero */}
        <section>
          <motion.div
            {...fadeUp()}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: RED,
            }}
          >
            Ook los af te nemen
          </motion.div>
          <motion.h1
            {...fadeUp(0.08)}
            style={{
              margin: "14px 0 18px",
              fontSize: "clamp(22px, 3.4vw, 34px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Alles wat wij kunnen
          </motion.h1>
          <motion.p
            {...fadeUp(0.16)}
            style={{ fontSize: "15px", lineHeight: 1.7, color: "#b6b6bd", maxWidth: "58ch" }}
          >
            Heb je al een site maar wil je 'm sneller, veiliger of beter vindbaar? Hosting,
            performance-optimalisatie en SEO nemen we ook los af, zonder dat we een nieuwe site
            hoeven te bouwen.
          </motion.p>
          <motion.div {...fadeUp(0.24)} style={{ marginTop: "26px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <a
              href="/contact"
              style={{
                padding: "12px 22px",
                background: RED,
                color: "#fff",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Vraag een offerte aan
            </a>
            <a
              href="/werkwijze"
              style={{
                padding: "12px 22px",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#efeff1",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Onze werkwijze
            </a>
          </motion.div>
        </section>

        {/* Diensten — asymmetrische kaarten, geen 3-gelijke-kolommen-sleur */}
        <section style={{ marginTop: "72px" }}>
          <motion.h2
            {...fadeUp()}
            style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "26px" }}
          >
            Onze losse diensten
          </motion.h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              const isOpen = openService === s.key;
              return (
                <motion.div
                  key={s.key}
                  {...fadeUp(i * 0.08)}
                  className="transition-colors duration-300 hover:border-[rgba(254,44,2,0.35)]"
                  style={{
                    borderRadius: "14px",
                    border: "1px solid #2a2b2b",
                    background: PANEL,
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setOpenService(isOpen ? null : s.key)}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${s.key}`}
                    className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] w-full"
                    style={{
                      gap: "16px 20px",
                      alignItems: "center",
                      padding: "24px 26px",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      color: "#efeff1",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        background: "rgba(254,44,2,0.1)",
                        border: "1px solid rgba(254,44,2,0.22)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={19} color={RED} strokeWidth={1.75} />
                    </div>

                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                        <h3 style={{ fontSize: "16.5px", fontWeight: 600 }}>{s.label}</h3>
                        <span style={{ fontSize: "12px", color: "#78787f" }}>
                          {s.price}
                          {s.suffix}
                        </span>
                      </div>
                      <p style={{ marginTop: "6px", fontSize: "13.5px", lineHeight: 1.6, color: "#9a9aa2", maxWidth: "56ch" }}>
                        {s.desc}
                      </p>
                      <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "8px 18px" }}>
                        {s.points.map((pt) => (
                          <div key={pt} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#b6b6bd" }}>
                            <Check size={12} color="#49de80" strokeWidth={2.5} />
                            {pt}
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ flex: "none", color: isOpen ? RED : "#a4a9b2", justifySelf: "end" }}
                    >
                      <Plus size={20} strokeWidth={1.75} />
                    </motion.div>
                  </button>

                  <motion.div
                    id={`service-panel-${s.key}`}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ padding: "0 26px 26px", borderTop: "1px solid #2a2b2b", marginTop: "2px", paddingTop: "22px" }}>
                      <a
                        href="/contact"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "12.5px",
                          fontWeight: 600,
                          color: "#efeff1",
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Aanvragen <ArrowRight size={14} />
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Waarom los afnemen */}
        <section style={{ marginTop: "72px" }}>
          <motion.h2
            {...fadeUp()}
            style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            Eén stam, drie takken
          </motion.h2>
          <motion.p
            {...fadeUp(0.08)}
            style={{ marginTop: "14px", fontSize: "14.5px", lineHeight: 1.75, color: "#b6b6bd", maxWidth: "66ch" }}
          >
            Deze diensten horen bij elkaar, maar je hoeft ze niet allemaal tegelijk af te nemen.
            Neem alleen wat je nodig hebt. We bouwen het bovenop je bestaande site, zonder dat je
            opnieuw hoeft te beginnen.
          </motion.p>
        </section>

        {/* CTA */}
        <motion.section
          {...fadeUp()}
          style={{
            marginTop: "64px",
            padding: "34px",
            borderRadius: "14px",
            border: "1px solid rgba(254,44,2,0.3)",
            background: "rgba(254,44,2,0.06)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "clamp(19px, 3vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Welke dienst heb je nodig?
          </h2>
          <p style={{ margin: "12px auto 20px", fontSize: "14px", color: "#b6b6bd", maxWidth: "52ch" }}>
            Vertel ons kort over je huidige site. Je krijgt binnen één werkdag een reactie en een
            vrijblijvend advies.
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-block",
              padding: "13px 28px",
              background: RED,
              color: "#fff",
              borderRadius: "9999px",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Neem contact op
          </a>
        </motion.section>
      </main>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Footer />
      </div>
      <CookieBanner />
    </div>
  );
}
