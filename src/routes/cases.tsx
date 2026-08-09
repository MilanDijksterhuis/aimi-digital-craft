import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/cases`;

const RED = "#fe2c02";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

const workTypes = [
  {
    title: "Bedrijfswebsites",
    desc: "Professionele websites voor kleine ondernemers en ZZP'ers die vertrouwen wekken en nieuwe klanten aantrekken. Van eenpitter tot lokaal MKB.",
  },
  {
    title: "Webshops",
    desc: "Verkoopklare webshops met veilige betaalmethodes en eenvoudig productbeheer, gebouwd om te verkopen.",
  },
  {
    title: "Portalen & maatwerk",
    desc: "Klantportalen en maatwerkoplossingen — zoals ons eigen klantenportaal waarin klanten hun project live volgen.",
  },
];

const approach = [
  { title: "Direct contact", desc: "Je werkt rechtstreeks met de developers, niet met een accountmanager." },
  { title: "Vaste prijzen", desc: "Vooraf duidelijk wat het kost. Geen verrassingen achteraf." },
  { title: "Snel live", desc: "De meeste projecten staan binnen twee weken online." },
  { title: "In eigen beheer", desc: "Design, development én hosting draaien op onze eigen infrastructuur." },
];

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: "Cases & werkwijze | Ons werk — AIMI" },
      {
        name: "description",
        content:
          "Bekijk het soort projecten dat AIMI oplevert: bedrijfswebsites, webshops en maatwerkportalen voor ondernemers en ZZP'ers. Ontdek onze werkwijze en aanpak.",
      },
      { name: "keywords", content: "AIMI cases, portfolio webdesign, voorbeelden websites, ons werk webdesign" },
      { property: "og:title", content: "Cases & werkwijze — AIMI" },
      { property: "og:description", content: "Het soort projecten dat we opleveren en hoe we werken." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: `${SITE_URL}/og-image.svg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cases & werkwijze — AIMI" },
      { name: "twitter:description", content: "Het soort projecten dat we opleveren en hoe we werken." },
      { name: "twitter:image", content: `${SITE_URL}/og-image.svg` },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [breadcrumbJsonLd([["Home", "/"], ["Cases", "/cases"]])],
  }),
  component: CasesPage,
});

function CasesPage() {
  return (
    <div style={{ background: "#0f0e0d", color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <a href="/" style={{ fontSize: "13px", color: "#a4a9b2", textDecoration: "none" }}>
          ← Terug naar home
        </a>
        <div style={{ marginTop: "28px", fontSize: "12px", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: RED }}>
          Ons werk
        </div>
        <h1 style={{ margin: "18px 0 22px", fontSize: "clamp(34px, 6vw, 60px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.03 }}>
          Cases &amp; werkwijze
        </h1>
        <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#b6b6bd", maxWidth: "62ch" }}>
          AIMI heeft inmiddels ruim tien projecten opgeleverd voor ondernemers in de regio en
          daarbuiten. Van strakke bedrijfswebsites tot verkoopklare webshops en maatwerkportalen.
          Hieronder lees je wat voor werk we doen en hoe we te werk gaan. Benieuwd naar concrete
          voorbeelden? Die laten we je graag persoonlijk zien.
        </p>

        <section style={{ marginTop: "72px" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Wat we bouwen</h2>
          <div style={{ marginTop: "34px", display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {workTypes.map((w) => (
              <div key={w.title} style={{ padding: "26px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>{w.title}</h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#9a9aa2" }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: "72px" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Onze aanpak</h2>
          <div style={{ marginTop: "34px", display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {approach.map((a) => (
              <div key={a.title}>
                <div style={{ width: "10px", height: "10px", background: RED, transform: "rotate(45deg)", marginBottom: "16px" }} />
                <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "8px" }}>{a.title}</h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#9a9aa2" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

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

        <section style={{ marginTop: "72px", padding: "44px", borderRadius: "8px", border: "1px solid rgba(254,44,2,0.3)", background: "rgba(254,44,2,0.06)", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Benieuwd wat we voor jou kunnen maken?</h2>
          <p style={{ margin: "16px auto 26px", fontSize: "15.5px", color: "#b6b6bd", maxWidth: "52ch" }}>
            We laten je graag voorbeelden zien die passen bij jouw branche. Plan een vrijblijvend gesprek.
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
