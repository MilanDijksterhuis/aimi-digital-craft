import type { ReactElement } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Services } from "@/components/Services";
import { ProcessTimeline } from "@/components/ProcessTimeline";

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

export type LocationPageData = {
  city: string;
  region: string;
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
      <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
        {data.contextHeading}
      </h2>
      {data.contextBody.map((p, i) => (
        <p key={i} style={{ marginTop: i === 0 ? "18px" : "14px", fontSize: "14.5px", lineHeight: 1.75, color: "#b6b6bd", maxWidth: "68ch" }}>
          {p}
        </p>
      ))}
    </section>
  );
}

function BusinessTypesSection({ data }: { data: LocationPageData }) {
  return (
    <section style={{ marginTop: "64px" }}>
      <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
        {data.businessTypesHeading}
      </h2>
      <p style={{ marginTop: "18px", fontSize: "14.5px", lineHeight: 1.75, color: "#b6b6bd", maxWidth: "68ch" }}>
        {data.businessTypesBody}
      </p>
    </section>
  );
}

function WorkflowSection({ data }: { data: LocationPageData }) {
  return (
    <section style={{ marginTop: "64px" }}>
      <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
        {data.workflowHeading}
      </h2>
      <ol style={{ marginTop: "22px", display: "grid", gap: "18px" }}>
        {data.workflowSteps.map((s, i) => (
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

function FaqSection({ data }: { data: LocationPageData }) {
  return (
    <section style={{ marginTop: "64px" }}>
      <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
        Veelgestelde vragen over webdesign in {data.city}
      </h2>
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

const sectionRenderers: Record<LocationSectionId, (data: LocationPageData) => ReactElement> = {
  context: (data) => <ContextSection key="context" data={data} />,
  businessTypes: (data) => <BusinessTypesSection key="businessTypes" data={data} />,
  workflow: (data) => <WorkflowSection key="workflow" data={data} />,
  faq: (data) => <FaqSection key="faq" data={data} />,
};

export function LocationPageV2({ data }: { data: LocationPageData }) {
  const { city, intro, related, kicker } = data;

  return (
    <div style={{ background: BG, color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      <Nav />

      <main id="main-content">
        <div className="mx-auto max-w-5xl px-6 pt-32">
          <section>
            <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: RED }}>
              {kicker}
            </div>
            <h1 style={{ margin: "14px 0 18px", fontSize: "clamp(22px, 3.4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Website laten maken in {city}
            </h1>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#b6b6bd", maxWidth: "60ch" }}>{intro}</p>
            <div style={{ marginTop: "26px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href="/contact" style={{ padding: "12px 22px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                Vraag een offerte aan
              </a>
              <a href="/#pricing" style={{ padding: "12px 22px", border: "1px solid rgba(255,255,255,0.18)", color: "#efeff1", borderRadius: "4px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                Bekijk tarieven
              </a>
            </div>
          </section>
        </div>

        {/* Services rendert alleen h3-kaarten; zonder deze h2 ontstaat een
            overgeslagen kopniveau (h1 -> h3) op de locatiepagina's. */}
        <div className="mx-auto max-w-5xl px-6 pt-20">
          <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Wat we bouwen voor ondernemers in {city}
          </h2>
        </div>
        <Services />
        <ProcessTimeline />

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
              Klaar voor een nieuwe website in {city}?
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
