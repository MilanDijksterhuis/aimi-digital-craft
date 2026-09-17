import { useState, type ReactElement } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrustStrip } from "@/components/TrustStrip";
import { ExampleSlideshow, GENERIC_EXAMPLES, type ServiceExample } from "@/components/ExampleSlideshow";
import { UpdatedOn } from "@/components/UpdatedOn";
import { webPageJsonLd } from "@/lib/seo";

/* ---------------------------------------------------------------------------
 * Herbruikbare branchepagina ("Website laten maken voor je [branche]").
 * Zusje van LocationPageV2, maar zonder regio-as: geen areaServed, geen
 * plaatsnaam-links. Configureerbare sectievolgorde zodat de 8 pagina's
 * structureel van elkaar verschillen, niet alleen qua brancheterm.
 * ------------------------------------------------------------------------- */

const RED = "#fe2c02";
const BG = "#1a1a1a";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

export type BranchSectionId = "needs" | "pitfalls" | "approach" | "pricing" | "faq";

export type BranchPageData = {
  branch: string; // "kapsalon" — zoals gebruikt in de lopende tekst/H1
  /** A-9: standaard "Website laten maken voor je {branch}". Zie de toelichting
   * in LocationPageV2 — identieke H1-templates over een hele set versterken het
   * doorway-patroon. */
  h1?: string;
  kicker: string;
  intro: string;
  needsHeading: string;
  needsBody: string[];
  pitfallsHeading: string;
  pitfallsBody: string[];
  approachHeading: string;
  approachSteps: { title: string; desc: string }[];
  pricingHeading: string;
  pricingBody: string[];
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
  sectionOrder: BranchSectionId[];
};

function TextSection({ heading, body }: { heading: string; body: string[] }) {
  return (
    <section style={{ marginTop: "64px" }}>
      <h2
        style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        {heading}
      </h2>
      {body.map((p, i) => (
        <p
          key={i}
          style={{
            marginTop: i === 0 ? "18px" : "14px",
            fontSize: "14.5px",
            lineHeight: 1.75,
            color: "#b6b6bd",
            maxWidth: "68ch",
          }}
        >
          {p}
        </p>
      ))}
    </section>
  );
}

function ApproachSection({ data }: { data: BranchPageData }) {
  return (
    <section style={{ marginTop: "64px" }}>
      <h2
        style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        {data.approachHeading}
      </h2>
      <ol style={{ marginTop: "22px", display: "grid", gap: "18px", listStyle: "none", padding: 0 }}>
        {data.approachSteps.map((s) => (
          <li
            key={s.title}
            style={{ paddingLeft: "16px", borderLeft: `2px solid ${RED}` }}
          >
            <div style={{ fontWeight: 600, fontSize: "14.5px" }}>{s.title}</div>
            <div
              style={{
                marginTop: "4px",
                fontSize: "13.5px",
                lineHeight: 1.65,
                color: "#b6b6bd",
                maxWidth: "60ch",
              }}
            >
              {s.desc}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function FaqSection({ data }: { data: BranchPageData }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ marginTop: "64px" }}>
      <h2
        style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        Veelgestelde vragen
      </h2>
      <div style={{ marginTop: "22px" }}>
        {data.faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <h3 style={{ margin: 0 }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`branch-faq-answer-${i}`}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "16px 0",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "inherit",
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: "14.5px" }}>{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ flexShrink: 0, color: isOpen ? RED : "#b6b6bd" }}
                  >
                    <Plus size={18} strokeWidth={1.5} />
                  </motion.span>
                </button>
              </h3>
              <motion.div
                id={`branch-faq-answer-${i}`}
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    paddingBottom: "16px",
                    fontSize: "13.5px",
                    lineHeight: 1.65,
                    color: "#b6b6bd",
                    maxWidth: "62ch",
                  }}
                >
                  {f.a}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const sectionRenderers: Record<BranchSectionId, (data: BranchPageData) => ReactElement> = {
  needs: (data) => <TextSection key="needs" heading={data.needsHeading} body={data.needsBody} />,
  pitfalls: (data) => (
    <TextSection key="pitfalls" heading={data.pitfallsHeading} body={data.pitfallsBody} />
  ),
  approach: (data) => <ApproachSection key="approach" data={data} />,
  pricing: (data) => (
    <TextSection key="pricing" heading={data.pricingHeading} body={data.pricingBody} />
  ),
  faq: (data) => <FaqSection key="faq" data={data} />,
};

export function BranchPage({
  data,
  images = GENERIC_EXAMPLES,
  /** Standaard 1440/900 (brede homepage-screenshots). Sommige aangeleverde
      voorbeelden zijn volle-pagina-exports met een heel andere (staande)
      verhouding — die moet hier overeenkomen, anders knipt object-fit:
      cover het beeld af en lijkt de foto ingezoomd. */
  imageAspectRatio = "1440 / 900",
  imageWidth = 1440,
  imageHeight = 900,
  /** Optionele maximumbreedte voor de kolom, nodig bij een staand formaat
      zodat de afbeelding niet torenhoog wordt op de gebruikelijke breedte. */
  imageMaxWidth,
}: {
  data: BranchPageData;
  images?: ServiceExample[];
  imageAspectRatio?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageMaxWidth?: string;
}) {
  const { branch, intro, related, kicker } = data;
  // Alle brancheslugs zijn /website-laten-maken-{branch}; pad voor het
  // WebPage-schema en de "Bijgewerkt op"-datum uit PAGE_DATES.
  const slug = `/website-laten-maken-${branch}`;
  const definitie = `Een website laten maken voor je ${branch} kost bij AIMI € 499 tot € 749 eenmalig, plus € 30 per maand voor hosting en onderhoud. AIMI is een webdesignbureau uit Veendam dat sites op maat bouwt, ook voor ondernemers in de branche ${branch}.`;

  return (
    <div style={{ background: BG, color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: webPageJsonLd({
            path: slug,
            name: data.h1 ?? `Website laten maken voor je ${branch} | AIMI`,
            description: definitie,
          }).children,
        }}
      />
      <Nav />

      <main id="main-content">
        <div className="mx-auto max-w-6xl px-6 pt-32">
          <section className="grid md:grid-cols-[1fr_1.1fr] gap-12 items-start">
            <div>
              {/* A-29: spiegelt de BreadcrumbList-markup uit de route-head. */}
              <Breadcrumbs
                className="mb-5"
                trail={[
                  ["Home", "/"],
                  ["Branches", "/branches"],
                  [`Website laten maken voor je ${branch}`, `#${branch}`],
                ]}
              />
              <div
                style={{
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
                {data.h1 ?? `Website laten maken voor je ${branch}`}
              </h1>
              <UpdatedOn path={slug} style={{ marginBottom: "16px" }} />
              <p
                style={{
                  fontSize: "15.5px",
                  lineHeight: 1.7,
                  color: "#efeff1",
                  maxWidth: "60ch",
                  fontWeight: 500,
                }}
              >
                {definitie}
              </p>
              <p
                style={{
                  marginTop: "14px",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "#b6b6bd",
                  maxWidth: "60ch",
                }}
              >
                {intro}
              </p>
              {/* SEO-audit 2026-09-02 (sxo.md SXO-4): checkbaar vertrouwenssignaal
                  vooraan, geen jaartal/aantal verzinnen. */}
              <TrustStrip areaLabel="Noord-Nederland, heel het land op afstand" />
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
            {/* SEO-audit 2026-09-02 (visual.md #2, sxo.md SXO-4): branchepagina's
                hadden geen enkele afbeelding. */}
            <div className="mt-10 md:mt-0" style={imageMaxWidth ? { width: imageMaxWidth, marginLeft: "auto" } : undefined}>
              <ExampleSlideshow
                images={images}
                aspectRatio={imageAspectRatio}
                width={imageWidth}
                height={imageHeight}
              />
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-24">
          {data.sectionOrder.map((id) => sectionRenderers[id](data))}

          {related && related.length > 0 && (
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
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
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

          <section
            style={{
              marginTop: "64px",
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
              Klaar voor een nieuwe website voor je {branch}?
            </h2>
            <p
              style={{
                margin: "12px auto 20px",
                fontSize: "14px",
                color: "#b6b6bd",
                maxWidth: "52ch",
              }}
            >
              Vertel ons kort over je plannen. Je krijgt binnen één werkdag een reactie en een
              vrijblijvende offerte.
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
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
