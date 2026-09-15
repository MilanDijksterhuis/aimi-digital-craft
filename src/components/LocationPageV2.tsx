import type { ReactElement } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrustStrip } from "@/components/TrustStrip";
import { ExampleSlideshow, GENERIC_EXAMPLES } from "@/components/ExampleSlideshow";
import { UpdatedOn } from "@/components/UpdatedOn";
import { webPageJsonLd } from "@/lib/seo";

/* ---------------------------------------------------------------------------
 * Uitgebreide lokale landingspagina, opvolger van LocationLanding.tsx.
 * Ondersteunt een configureerbare sectievolgorde en per-stad FAQ's zodat de
 * 13 nieuwe locatiepagina's onderling structureel verschillen (niet alleen de
 * plaatsnaam), wat vereist is om doorway/scaled-content-patronen te vermijden.
 * ------------------------------------------------------------------------- */

const RED = "#fe2c02";
const BG = "#1a1a1a";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

export type LocationSectionId = "context" | "businessTypes" | "workflow" | "faq";

/** Compacte vervanger van het ingesloten <Services/>-blok (A-08): alleen
 * ankertekst + één regel per dienst, zodat de linkwaarde naar de dienstpagina's
 * stroomt zonder honderden woorden duplicaat op 15 URL's te zetten. */
const LOCAL_SERVICES: { label: string; href: string; desc: string }[] = [
  {
    label: "Website laten maken",
    href: "/website-laten-maken",
    desc: "Een professionele site op maat, vanaf € 499 eenmalig.",
  },
  {
    label: "Webshop laten maken",
    href: "/webshop-laten-maken",
    desc: "Verkoopklaar, met veilige betaalmethodes en voorraadbeheer.",
  },
  {
    label: "Onderhoud & hosting",
    href: "/onderhoud-hosting",
    desc: "Nederlandse hosting, back-ups en monitoring vanaf € 30 p/m.",
  },
  {
    label: "Meer diensten",
    href: "/meer-diensten",
    desc: "Performance-optimalisatie en SEO, ook los af te nemen.",
  },
];

export type LocationPageData = {
  city: string;
  region: string;
  /** A-9: standaard "Website laten maken in {city}". Die template stond
   * identiek op alle 15 plaatspagina's, wat samen met het gedeelde
   * boilerplate-blok het doorway-patroon versterkte. Pagina's kunnen nu een
   * eigen H1 meegeven. */
  h1?: string;
  /** A-08: optionele, per stad geschreven inleiding boven het dienstenblok.
   * Zonder waarde valt hij terug op een neutrale zin. Hoe meer steden hier een
   * eigen tekst krijgen, hoe minder gedeelde tekst er overblijft. */
  servicesIntro?: string;
  kicker: string;
  intro: string;
  contextHeading: string;
  contextBody: string[];
  businessTypesHeading: string;
  businessTypesBody: string;
  workflowHeading: string;
  workflowSteps: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
  sectionOrder: LocationSectionId[];
};

function ContextSection({ data }: { data: LocationPageData }) {
  return (
    <section style={{ marginTop: "64px" }}>
      <h2
        style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        {data.contextHeading}
      </h2>
      {data.contextBody.map((p, i) => (
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

function BusinessTypesSection({ data }: { data: LocationPageData }) {
  return (
    <section style={{ marginTop: "64px" }}>
      <h2
        style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        {data.businessTypesHeading}
      </h2>
      <p
        style={{
          marginTop: "18px",
          fontSize: "14.5px",
          lineHeight: 1.75,
          color: "#b6b6bd",
          maxWidth: "68ch",
        }}
      >
        {data.businessTypesBody}
      </p>
    </section>
  );
}

function WorkflowSection({ data }: { data: LocationPageData }) {
  return (
    <section style={{ marginTop: "64px" }}>
      <h2
        style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        {data.workflowHeading}
      </h2>
      {/* Verbonden verticale tijdlijn i.p.v. "01/02"-tekstmarkers: zelfde
          visuele taal als de genummerde cirkels in de "Zo werkt het"-tijdlijn
          op /website-laten-maken. Verticaal omdat het aantal stappen per stad
          varieert (5 tot 7), dat schaalt niet netjes in een horizontale rij. */}
      <ol style={{ marginTop: "30px" }}>
        {data.workflowSteps.map((s, i) => {
          const isLast = i === data.workflowSteps.length - 1;
          return (
            <li
              key={s.title}
              style={{
                position: "relative",
                display: "flex",
                gap: "20px",
                paddingBottom: isLast ? 0 : "30px",
              }}
            >
              {!isLast && (
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "30px",
                    bottom: 0,
                    width: "1px",
                    background:
                      "linear-gradient(to bottom, rgba(254,44,2,0.35), rgba(255,255,255,0.08))",
                  }}
                />
              )}
              <span
                aria-hidden
                style={{
                  position: "relative",
                  zIndex: 1,
                  flex: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "30px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: RED,
                  border: "1px solid rgba(254,44,2,0.5)",
                  background: BG,
                }}
              >
                {i + 1}
              </span>
              <div style={{ paddingTop: "3px" }}>
                {/* H3 i.p.v. div: geeft crawlers/AI expliciete substructuur
                    onder de workflow-H2. */}
                <h3 style={{ margin: 0, fontWeight: 600, fontSize: "14.5px" }}>{s.title}</h3>
                <div
                  style={{
                    marginTop: "6px",
                    fontSize: "13.5px",
                    lineHeight: 1.65,
                    color: "#b6b6bd",
                    maxWidth: "60ch",
                  }}
                >
                  {s.desc}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function FaqSection({ data }: { data: LocationPageData }) {
  return (
    <section style={{ marginTop: "64px" }}>
      <h2
        style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        Veelgestelde vragen over webdesign in {data.city}
      </h2>
      <div style={{ marginTop: "22px", display: "grid", gap: "16px" }}>
        {data.faqs.map((f) => (
          <div
            key={f.q}
            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "16px" }}
          >
            <div style={{ fontWeight: 600, fontSize: "14.5px" }}>{f.q}</div>
            <div
              style={{
                marginTop: "8px",
                fontSize: "13.5px",
                lineHeight: 1.65,
                color: "#b6b6bd",
                maxWidth: "62ch",
              }}
            >
              {f.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const sectionRenderers: Record<LocationSectionId, (data: LocationPageData) => ReactElement> = {
  context: (data) => <ContextSection key="context" data={data} />,
  businessTypes: (data) => <BusinessTypesSection key="businessTypes" data={data} />,
  workflow: (data) => <WorkflowSection key="workflow" data={data} />,
  faq: (data) => <FaqSection key="faq" data={data} />,
};

export function LocationPageV2({ data }: { data: LocationPageData }) {
  const { city, intro, related, kicker } = data;
  // Alle 15 plaatsnamen zijn één woord en komen exact overeen met hun slug.
  // Deze waarde dient als React-key én als pad voor het WebPage-schema en de
  // "Bijgewerkt op"-datum (die uit PAGE_DATES komt).
  const slug = `/website-laten-maken-${city.toLowerCase()}`;

  // GEO-audit 2026-09-06 (punt 10): definitiezin met harde cijfers vóór het
  // narratieve verhaal. Dit is de zinsvorm die AI-antwoordmachines als
  // definitie oppikken bij "website laten maken in {stad}".
  const definitie = `Een website laten maken in ${city} kost bij AIMI € 499 tot € 749 eenmalig, plus € 30 per maand voor hosting en onderhoud. AIMI is een webdesignbureau uit Veendam dat sites op maat bouwt voor ondernemers in ${city} en omgeving.`;

  return (
    <div style={{ background: BG, color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      {/* WebPage-schema met dateModified — versheids- en entiteitssignaal voor
          AI-machines. JSON-LD is overal in de HTML geldig; crawlers lezen het. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: webPageJsonLd({
            path: slug,
            name: `Website laten maken in ${city} | AIMI Webdesign`,
            description: definitie,
          }).children,
        }}
      />
      <Nav />

      <main id="main-content">
        <div className="mx-auto max-w-5xl px-6 pt-32">
          <section className="grid md:grid-cols-[1fr_1.1fr] gap-12 items-center">
            <div>
              {/* A-29: spiegelt de BreadcrumbList-markup uit de route-head. */}
              <Breadcrumbs
                className="mb-5"
                trail={[
                  ["Home", "/"],
                  ["Webdesign per regio", "/webdesign"],
                  [`Website laten maken in ${city}`, slug],
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
                  margin: "14px 0 14px",
                  fontSize: "clamp(22px, 3.4vw, 34px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {data.h1 ?? `Website laten maken in ${city}`}
              </h1>
              <UpdatedOn path={slug} style={{ marginBottom: "16px" }} />
              {/* Definitiezin met cijfers, vóór het narratieve intro (GEO-audit
                  2026-09-06 punt 10). */}
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
              {/* SEO-audit 2026-09-02 (sxo.md SXO-1): checkbaar vertrouwenssignaal
                  vooraan, waar rankende concurrenten dat ook zetten. */}
              <TrustStrip areaLabel={`${city} en omgeving, ${data.region}`} />
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
            {/* SEO-audit 2026-09-02 (visual.md #2, sxo.md SXO-4): stadspagina's
                hadden geen enkele afbeelding. Hergebruikt dezelfde generieke
                voorbeeldenset als /website-laten-maken. */}
            <div className="mt-10 md:mt-0">
              <ExampleSlideshow images={GENERIC_EXAMPLES} />
            </div>
          </section>
        </div>

        {/* A-08: hier stonden <Services/> en <ProcessTimeline/> ingesloten —
            samen ~830 woorden identieke tekst op alle 15 plaatspagina's, goed
            voor ~54% van de pagina. Dat is het scaled-content/doorway-patroon.
            Vervangen door een compact linkblok (~60 woorden) dat naar de échte
            dienstpagina's wijst; die pagina's horen op die termen te ranken,
            niet 15 kopieën. Lost meteen A-46 op: de drie opeenvolgende H2's
            over hetzelfde onderwerp zijn nu één H2. */}
        <div className="mx-auto max-w-5xl px-6 pt-20">
          <section>
            <h2
              style={{
                fontSize: "clamp(17px, 2.3vw, 22px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Wat we bouwen voor ondernemers in {city}
            </h2>
            <p
              style={{
                marginTop: "16px",
                fontSize: "14.5px",
                lineHeight: 1.75,
                color: "#b6b6bd",
                maxWidth: "68ch",
              }}
            >
              {data.servicesIntro ??
                `Ondernemers in ${city} kloppen bij ons aan voor uiteenlopend werk. Dit zijn de diensten die we leveren; op elke dienstpagina lees je precies wat je krijgt en wat het kost.`}
            </p>
            <ul
              style={{
                marginTop: "24px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "12px",
                listStyle: "none",
                padding: 0,
              }}
            >
              {LOCAL_SERVICES.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="block h-full rounded-xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-[rgba(254,44,2,0.35)] hover:-translate-y-0.5"
                    style={{
                      padding: "18px",
                      color: "#efeff1",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ display: "block", fontSize: "14.5px", fontWeight: 600 }}>
                      {s.label} →
                    </span>
                    <span
                      style={{
                        display: "block",
                        marginTop: "4px",
                        fontSize: "13.5px",
                        lineHeight: 1.55,
                        color: "#9a9aa2",
                      }}
                    >
                      {s.desc}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: "18px", fontSize: "13.5px", color: "#9a9aa2" }}>
              Benieuwd hoe een traject verloopt? Lees{" "}
              <a href="/werkwijze" style={{ color: "#efeff1" }}>
                onze werkwijze
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mx-auto max-w-5xl px-6 pb-24">
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
              padding: "34px",
              borderRadius: "8px",
              border: "1px solid rgba(254,44,2,0.3)",
              background: "rgba(254,44,2,0.06)",
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
              Klaar voor een nieuwe website in {city}?
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
