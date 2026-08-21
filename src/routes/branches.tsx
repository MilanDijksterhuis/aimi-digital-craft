import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL, OG_IMAGE_URL, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

const RED = "#fe2c02";
const BG = "#1a1a1a";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const URL = `${SITE_URL}/branches`;

const branches: { label: string; href: string; desc: string }[] = [
  { label: "Website laten maken voor je kapsalon", href: "/website-laten-maken-kapsalon", desc: "Online afspraken, prijslijst, team en foto's van je werk" },
  { label: "Website laten maken voor je nagelstudio", href: "/website-laten-maken-nagelstudio", desc: "Portfolio van nailart, snel laden, online boeken" },
  { label: "Website laten maken voor je schoonheidssalon", href: "/website-laten-maken-schoonheidssalon", desc: "Behandelmenu, intake, cadeaubonnen" },
  { label: "Website laten maken voor je pedicurepraktijk", href: "/website-laten-maken-pedicure", desc: "Vertrouwenwekkend, leesbaar, eenvoudig afspraken maken" },
  { label: "Website laten maken voor je hoveniersbedrijf", href: "/website-laten-maken-hovenier", desc: "Voor- en na-foto's, offerteaanvraag, werkgebied" },
  { label: "Website laten maken voor je klusbedrijf", href: "/website-laten-maken-klusbedrijf", desc: "Offerte met foto-upload, mobiel-first" },
  { label: "Website laten maken voor je schildersbedrijf", href: "/website-laten-maken-schilder", desc: "Projectfoto's, offerteaanvraag, seizoensplanning" },
  { label: "Website laten maken voor je loodgietersbedrijf", href: "/website-laten-maken-loodgieter", desc: "Telefoonnummer voorop, spoedgevallen, razendsnel op mobiel" },
];

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Website laten maken per branche | AIMI" },
      {
        name: "description",
        content: "AIMI bouwt websites die aansluiten op hoe jouw vakgebied werkt. Bekijk per branche wat een website écht moet kunnen.",
      },
      { property: "og:title", content: "Website laten maken per branche | AIMI" },
      { property: "og:description", content: "Websites op maat voor kappers, hoveniers, klussenbedrijven en meer vakgebieden." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken per branche | AIMI" },
      { name: "twitter:description", content: "Websites op maat voor kappers, hoveniers, klussenbedrijven en meer vakgebieden." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        name: "Website laten maken per branche",
        description: "Websites op maat voor specifieke vakgebieden, gebouwd en gehost door AIMI.",
        url: URL,
        serviceType: "Webdesign",
        // Branches zijn niet regiogebonden: geen areaServed met plaatsnamen.
        areaServed: null,
      }),
      breadcrumbJsonLd([["Home", "/"], ["Branches", "/branches"]]),
    ],
  }),
  component: () => (
    <div style={{ background: BG, color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      <Nav />
      <main id="main-content">
        <div className="mx-auto max-w-5xl px-6 pt-32">
          <section>
            <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: RED }}>
              Webdesign per branche
            </div>
            <h1 style={{ margin: "14px 0 18px", fontSize: "clamp(24px, 3.6vw, 36px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Een website die past bij je vak
            </h1>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#b6b6bd", maxWidth: "62ch" }}>
              Elk vakgebied heeft andere eisen aan een website: een kapsalon leeft van online boeken, een
              loodgieter van een telefoonnummer dat meteen opvalt. AIMI bouwt en host websites die
              functioneel aansluiten op hoe jouw bedrijf werkt. Bekijk hieronder je branche, of ga naar
              onze{" "}
              <a href="/webdesign" style={{ color: RED }}>
                webdesign-hubpagina
              </a>
              .
            </p>
            <div style={{ marginTop: "26px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href="/contact" style={{ padding: "12px 22px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                Vraag een offerte aan
              </a>
            </div>
          </section>

          <section style={{ marginTop: "64px", paddingBottom: "96px" }}>
            <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Kies je branche</h2>
            <ul style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "10px", listStyle: "none", padding: 0 }}>
              {branches.map((b) => (
                <li key={b.href}>
                  <a
                    href={b.href}
                    style={{
                      display: "block",
                      padding: "16px 18px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "6px",
                      color: "#efeff1",
                      textDecoration: "none",
                    }}
                  >
                    <div style={{ fontSize: "14px", fontWeight: 600 }}>{b.label}</div>
                    <div style={{ marginTop: "4px", fontSize: "12.5px", color: "#a4a9b2" }}>{b.desc}</div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  ),
});
