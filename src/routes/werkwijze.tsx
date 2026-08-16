import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/werkwijze`;

const RED = "#fe2c02";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

const steps = [
  {
    title: "Kennismaking & briefing",
    desc: "We beginnen met een vrijblijvend gesprek. Wat doet je bedrijf, wie is je klant en wat moet de site opleveren? Zo weten we precies waar we het voor doen.",
  },
  {
    title: "Ontwerp",
    desc: "Je krijgt een concreet ontwerp te zien voordat er iets gebouwd wordt. Je geeft feedback en we schaven bij tot het klopt, geen verrassingen achteraf.",
  },
  {
    title: "Bouwen & testen",
    desc: "We bouwen je site met moderne techniek, vullen 'm met content en testen op elk scherm en elke browser. Snelheid en vindbaarheid zitten er vanaf de basis in.",
  },
  {
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
      { title: "Onze werkwijze | Zo bouwen wij jouw website AIMI" },
      {
        name: "description",
        content:
          "Zo werkt AIMI: van kennismaking en ontwerp tot livegang en nazorg. Vaste prijzen, direct contact met de developers en alles in eigen beheer. Ontdek onze aanpak.",
      },
      { property: "og:title", content: "Onze werkwijze AIMI" },
      { property: "og:description", content: "Van kennismaking tot livegang: zo bouwen wij jouw website. Vaste prijzen, direct contact." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Onze werkwijze AIMI" },
      { name: "twitter:description", content: "Van kennismaking tot livegang: zo bouwen wij jouw website. Vaste prijzen, direct contact." },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [breadcrumbJsonLd([["Home", "/"], ["Werkwijze", "/werkwijze"]])],
  }),
  component: WerkwijzePage,
});

function WerkwijzePage() {
  return (
    <div style={{ background: "#0f0e0d", color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      <Nav />
      <main id="main-content" className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <a href="/" style={{ fontSize: "13px", color: "#a4a9b2", textDecoration: "none" }}>
          ← Terug naar home
        </a>
        <div style={{ marginTop: "28px", fontSize: "12px", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: RED }}>
          Onze werkwijze
        </div>
        <h1 style={{ margin: "18px 0 22px", fontSize: "clamp(34px, 6vw, 60px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.03 }}>
          Zo bouwen wij jouw website
        </h1>
        <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#b6b6bd", maxWidth: "62ch" }}>
          Een goede website begint bij een goede aanpak. Bij AIMI werk je van begin tot eind direct
          met de twee developers die je site bouwen Aidan &amp; Milan. Geen bureaupolitiek, geen
          verrassingen, wel een helder proces en vaste prijzen. Hieronder lees je precies hoe we
          te werk gaan.
        </p>

        {/* Proces */}
        <section style={{ marginTop: "72px" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Van idee naar livegang</h2>
          <div style={{ marginTop: "34px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {steps.map((s, i) => (
              <div key={s.title} style={{ display: "flex", gap: "20px", padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: "22px", fontWeight: 700, color: RED, minWidth: "40px" }}>{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "6px" }}>{s.title}</h3>
                  <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#9a9aa2" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Principes */}
        <section style={{ marginTop: "72px" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Waar we voor staan</h2>
          <div style={{ marginTop: "34px", display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {principles.map((p) => (
              <div key={p.title} style={{ padding: "26px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>{p.title}</h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#9a9aa2" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kwaliteitsstandaard */}
        <section style={{ marginTop: "72px" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Wat elke site standaard meekrijgt</h2>
          <div style={{ marginTop: "34px", display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {standards.map((s) => (
              <div key={s.title}>
                <div style={{ width: "10px", height: "10px", background: RED, transform: "rotate(45deg)", marginBottom: "16px" }} />
                <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#9a9aa2" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interne links */}
        <section style={{ marginTop: "64px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "18px", color: "#b6b6bd" }}>Ook interessant</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {[
              { label: "Website laten maken", href: "/website-laten-maken" },
              { label: "Webshop laten maken", href: "/webshop-laten-maken" },
              { label: "Over ons", href: "/over-ons" },
            ].map((l) => (
              <a key={l.href} href={l.href} style={{ padding: "10px 18px", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "9999px", fontSize: "14px", color: "#efeff1", textDecoration: "none" }}>
                {l.label} →
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ marginTop: "72px", padding: "44px", borderRadius: "8px", border: "1px solid rgba(254,44,2,0.3)", background: "rgba(254,44,2,0.06)", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Klaar om te beginnen?</h2>
          <p style={{ margin: "16px auto 26px", fontSize: "15.5px", color: "#b6b6bd", maxWidth: "52ch" }}>
            Vertel ons kort over je plannen. Je krijgt binnen één werkdag een reactie en een vrijblijvende offerte.
          </p>
          <a href="/contact" style={{ display: "inline-block", padding: "15px 32px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}>
            Neem contact op
          </a>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
