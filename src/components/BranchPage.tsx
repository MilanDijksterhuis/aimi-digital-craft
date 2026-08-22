import type { ReactElement } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
      <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>{heading}</h2>
      {body.map((p, i) => (
        <p key={i} style={{ marginTop: i === 0 ? "18px" : "14px", fontSize: "14.5px", lineHeight: 1.75, color: "#b6b6bd", maxWidth: "68ch" }}>
          {p}
        </p>
      ))}
    </section>
  );
}

function ApproachSection({ data }: { data: BranchPageData }) {
  return (
    <section style={{ marginTop: "64px" }}>
      <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>{data.approachHeading}</h2>
      <ol style={{ marginTop: "22px", display: "grid", gap: "18px" }}>
        {data.approachSteps.map((s, i) => (
          <li key={s.title} style={{ display: "flex", gap: "16px" }}>
            <span style={{ color: RED, fontWeight: 700, fontSize: "13px", minWidth: "22px" }}>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: "14.5px" }}>{s.title}</div>
              <div style={{ marginTop: "4px", fontSize: "13.5px", lineHeight: 1.65, color: "#b6b6bd", maxWidth: "60ch" }}>{s.desc}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function FaqSection({ data }: { data: BranchPageData }) {
  return (
    <section style={{ marginTop: "64px" }}>
      <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Veelgestelde vragen</h2>
      <div style={{ marginTop: "22px", display: "grid", gap: "16px" }}>
        {data.faqs.map((f) => (
          <div key={f.q} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "16px" }}>
            <div style={{ fontWeight: 600, fontSize: "14.5px" }}>{f.q}</div>
            <div style={{ marginTop: "8px", fontSize: "13.5px", lineHeight: 1.65, color: "#b6b6bd", maxWidth: "62ch" }}>{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const sectionRenderers: Record<BranchSectionId, (data: BranchPageData) => ReactElement> = {
  needs: (data) => <TextSection key="needs" heading={data.needsHeading} body={data.needsBody} />,
  pitfalls: (data) => <TextSection key="pitfalls" heading={data.pitfallsHeading} body={data.pitfallsBody} />,
  approach: (data) => <ApproachSection key="approach" data={data} />,
  pricing: (data) => <TextSection key="pricing" heading={data.pricingHeading} body={data.pricingBody} />,
  faq: (data) => <FaqSection key="faq" data={data} />,
};

export function BranchPage({ data }: { data: BranchPageData }) {
  const { branch, intro, related, kicker } = data;

  return (
    <div style={{ background: BG, color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      <Nav />

      <main id="main-content">
        <div className="mx-auto max-w-5xl px-6 pt-32">
          <section>
            {/* A-29: spiegelt de BreadcrumbList-markup uit de route-head. */}
            <Breadcrumbs
              className="mb-5"
              trail={[
                ["Home", "/"],
                ["Branches", "/branches"],
                [`Website laten maken voor je ${branch}`, `#${branch}`],
              ]}
            />
            <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: RED }}>
              {kicker}
            </div>
            <h1 style={{ margin: "14px 0 18px", fontSize: "clamp(22px, 3.4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {data.h1 ?? `Website laten maken voor je ${branch}`}
            </h1>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#b6b6bd", maxWidth: "60ch" }}>{intro}</p>
            <div style={{ marginTop: "26px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href="/contact" style={{ padding: "12px 22px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                Vraag een offerte aan
              </a>
              <a href="/tarieven" style={{ padding: "12px 22px", border: "1px solid rgba(255,255,255,0.18)", color: "#efeff1", borderRadius: "4px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                Bekijk tarieven
              </a>
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-5xl px-6 pb-24">
          {data.sectionOrder.map((id) => sectionRenderers[id](data))}

          {related && related.length > 0 && (
            <section style={{ marginTop: "56px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "14px", color: "#b6b6bd" }}>Ook interessant</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {related.map((l) => (
                  <a key={l.href} href={l.href} style={{ padding: "9px 16px", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "9999px", fontSize: "13px", color: "#efeff1", textDecoration: "none" }}>
                    {l.label} →
                  </a>
                ))}
              </div>
            </section>
          )}

          <section style={{ marginTop: "64px", padding: "34px", borderRadius: "8px", border: "1px solid rgba(254,44,2,0.3)", background: "rgba(254,44,2,0.06)", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(19px, 3vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Klaar voor een nieuwe website voor je {branch}?
            </h2>
            <p style={{ margin: "12px auto 20px", fontSize: "14px", color: "#b6b6bd", maxWidth: "52ch" }}>
              Vertel ons kort over je plannen. Je krijgt binnen één werkdag een reactie en een vrijblijvende offerte.
            </p>
            <a href="/contact" style={{ display: "inline-block", padding: "13px 28px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
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
