import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, Paintbrush, Code2, Rocket } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL, OG_IMAGE_URL, breadcrumbJsonLd, howToJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/werkwijze`;

const RED = "#fe2c02";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

const steps = [
  {
    icon: ClipboardList,
    title: "Kennismaking & briefing",
    desc: "We beginnen met een vrijblijvend gesprek. Wat doet je bedrijf, wie is je klant en wat moet de site opleveren? Zo weten we precies waar we het voor doen.",
  },
  {
    icon: Paintbrush,
    title: "Ontwerp",
    desc: "Je krijgt een concreet ontwerp te zien voordat er iets gebouwd wordt. Je geeft feedback en we schaven bij tot het klopt, geen verrassingen achteraf.",
  },
  {
    icon: Code2,
    title: "Bouwen & testen",
    desc: "We bouwen je site met moderne techniek, vullen 'm met content en testen op elk scherm en elke browser. Snelheid en vindbaarheid zitten er vanaf de basis in.",
  },
  {
    icon: Rocket,
    title: "Livegang & nazorg",
    desc: "We zetten de site live op onze eigen snelle hosting en blijven bereikbaar. Updates, aanpassingen of vragen? Je praat altijd direct met de mensen die je site gebouwd hebben.",
  },
];

const principles = [
  { title: "Direct contact", desc: "Je werkt rechtstreeks met Aidan of Milan. Geen accountmanagers, geen tussenlagen, geen wachttijden." },
  { title: "Vaste prijzen", desc: "Je weet vooraf wat het kost. Geen uurtje-factuurtje en geen verrassingen op de rekening." },
  { title: "Alles in eigen beheer", desc: "Design, development én hosting doen we zelf. Zo houden we kwaliteit en snelheid volledig in eigen hand." },
  { title: "Snel en betrokken", desc: "Korte lijnen betekenen snelle beslissingen. We denken met je mee, ook na de livegang." },
];

const standards = [
  { title: "Snel & mobiel", desc: "Groene Core Web Vitals en een perfecte weergave op elk apparaat." },
  { title: "Vindbaar in Google", desc: "Een nette technische SEO-basis zit standaard in elk project." },
  { title: "Veilig & up-to-date", desc: "SSL, dagelijkse back-ups en updates op onze eigen Nederlandse servers." },
];

export const Route = createFileRoute("/werkwijze")({
  head: () => ({
    meta: [
      { title: "Onze werkwijze | Zo bouwen wij jouw website — AIMI" },
      {
        name: "description",
        content:
          "Zo werkt AIMI: van kennismaking en ontwerp tot livegang en nazorg. Vaste prijzen, direct contact met de developers en volledig eigenaarschap na oplevering.",
      },
      { property: "og:title", content: "Onze werkwijze — AIMI" },
      { property: "og:description", content: "Van kennismaking tot livegang: zo bouwen wij jouw website. Vaste prijzen, direct contact." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Onze werkwijze — AIMI" },
      { name: "twitter:description", content: "Van kennismaking tot livegang: zo bouwen wij jouw website. Vaste prijzen, direct contact." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      breadcrumbJsonLd([["Home", "/"], ["Werkwijze", "/werkwijze"]]),
      // A-27: dit is dé processpagina van de site en had als enige geen HowTo,
      // terwijl de stappen hieronder er letterlijk al staan.
      howToJsonLd({
        name: "Zo bouwen wij jouw website",
        description:
          "Van kennismaking en ontwerp tot livegang en nazorg: de vier stappen waarin AIMI een website oplevert.",
        steps: steps.map((s) => ({ title: s.title, desc: s.desc })),
      }),
    ],
  }),
  component: WerkwijzePage,
});

function WerkwijzePage() {
  return (
    <div style={{ background: "#1a1a1a", color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      <Nav />
      <main id="main-content" className="mx-auto max-w-5xl px-6 pt-28 pb-16">
        <a href="/" style={{ fontSize: "13px", color: "#a4a9b2", textDecoration: "none" }}>
          ← Terug naar home
        </a>
        <div style={{ marginTop: "28px", fontSize: "12px", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: RED }}>
          Onze werkwijze
        </div>
        <h1 style={{ margin: "14px 0 18px", fontSize: "clamp(22px, 3.4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Zo bouwen wij jouw website
        </h1>
        <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#b6b6bd", maxWidth: "62ch" }}>
          Een goede website laten maken begint bij een goede aanpak. Bij AIMI werk je van begin tot
          eind direct met de twee developers die je site bouwen: Aidan &amp; Milan. Geen
          bureaupolitiek, geen tussenlagen, geen verrassingen, wel een helder webdesign-traject en
          vaste prijzen. Van de eerste kennismaking tot de livegang van je website of webshop, en ook
          daarna blijf je altijd rechtstreeks in contact met de mensen die je project bouwen.
          Hieronder lees je precies hoe ons ontwikkelproces eruitziet en wat je in elke fase kunt
          verwachten.
        </p>

        {/* Proces */}
        <section style={{ marginTop: "64px" }}>
          <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Van idee naar livegang</h2>
          <div style={{ marginTop: "30px" }}>
            {steps.map((s, i) => {
              const Icon = s.icon;
              const last = i === steps.length - 1;
              return (
                <div key={s.title} style={{ display: "flex", gap: "18px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: "rgba(254,44,2,0.1)",
                        border: "1px solid rgba(254,44,2,0.22)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={17} color={RED} strokeWidth={1.75} />
                    </div>
                    {!last && <div style={{ flex: 1, width: "1px", background: "rgba(255,255,255,0.14)", marginTop: "8px" }} />}
                  </div>
                  <div style={{ paddingBottom: last ? 0 : "28px" }}>
                    <h3 style={{ fontSize: "15.5px", fontWeight: 600, marginBottom: "6px", marginTop: "6px" }}>{s.title}</h3>
                    <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#9a9aa2", maxWidth: "58ch" }}>{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Principes */}
        <section style={{ marginTop: "64px" }}>
          <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Waar we voor staan</h2>
          <div style={{ marginTop: "26px", display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {principles.map((p) => (
              <div key={p.title} style={{ padding: "22px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>{p.title}</h3>
                <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#9a9aa2" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kwaliteitsstandaard */}
        <section style={{ marginTop: "64px" }}>
          <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Wat elke site standaard meekrijgt</h2>
          <div style={{ marginTop: "26px", display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {standards.map((s) => (
              <div key={s.title}>
                <div style={{ width: "9px", height: "9px", background: RED, transform: "rotate(45deg)", marginBottom: "14px" }} />
                <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "7px" }}>{s.title}</h3>
                <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#9a9aa2" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interne links */}
        <section style={{ marginTop: "56px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "14px", color: "#b6b6bd" }}>Ook interessant</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {[
              { label: "Website laten maken", href: "/website-laten-maken" },
              { label: "Webshop laten maken", href: "/webshop-laten-maken" },
              { label: "Over ons", href: "/over-ons" },
            ].map((l) => (
              <a key={l.href} href={l.href} style={{ padding: "9px 16px", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "9999px", fontSize: "13px", color: "#efeff1", textDecoration: "none" }}>
                {l.label} →
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ marginTop: "56px", padding: "34px", borderRadius: "8px", border: "1px solid rgba(254,44,2,0.3)", background: "rgba(254,44,2,0.06)", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(19px, 3vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Klaar om te beginnen?</h2>
          <p style={{ margin: "12px auto 20px", fontSize: "14px", color: "#b6b6bd", maxWidth: "52ch" }}>
            Vertel ons kort over je plannen. Je krijgt binnen één werkdag een reactie en een vrijblijvende offerte.
          </p>
          <a href="/contact" style={{ display: "inline-block", padding: "13px 28px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
            Neem contact op
          </a>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
