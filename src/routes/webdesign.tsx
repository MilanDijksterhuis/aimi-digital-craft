import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Services } from "@/components/Services";
import { SITE_URL, OG_IMAGE_URL, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

const RED = "#fe2c02";
const BG = "#1a1a1a";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const URL = `${SITE_URL}/webdesign`;

const locations: { city: string; href: string; label: string }[] = [
  { city: "Veendam", href: "/website-laten-maken-veendam", label: "Website laten maken in Veendam" },
  { city: "Hoogeveen", href: "/website-laten-maken-hoogeveen", label: "Website laten maken in Hoogeveen" },
  { city: "Groningen", href: "/website-laten-maken-groningen", label: "Website laten maken in Groningen" },
  { city: "Assen", href: "/website-laten-maken-assen", label: "Website laten maken in Assen" },
  { city: "Hoogezand", href: "/website-laten-maken-hoogezand", label: "Website laten maken in Hoogezand" },
  { city: "Stadskanaal", href: "/website-laten-maken-stadskanaal", label: "Website laten maken in Stadskanaal" },
  { city: "Emmen", href: "/website-laten-maken-emmen", label: "Website laten maken in Emmen" },
  { city: "Winschoten", href: "/website-laten-maken-winschoten", label: "Website laten maken in Winschoten" },
  { city: "Roden", href: "/website-laten-maken-roden", label: "Website laten maken in Roden" },
  { city: "Coevorden", href: "/website-laten-maken-coevorden", label: "Website laten maken in Coevorden" },
  { city: "Meppel", href: "/website-laten-maken-meppel", label: "Website laten maken in Meppel" },
  { city: "Leeuwarden", href: "/website-laten-maken-leeuwarden", label: "Website laten maken in Leeuwarden" },
  { city: "Drachten", href: "/website-laten-maken-drachten", label: "Website laten maken in Drachten" },
  { city: "Heerenveen", href: "/website-laten-maken-heerenveen", label: "Website laten maken in Heerenveen" },
  { city: "Sneek", href: "/website-laten-maken-sneek", label: "Website laten maken in Sneek" },
];

export const Route = createFileRoute("/webdesign")({
  head: () => ({
    meta: [
      { title: "Webdesign per regio in Noord-Nederland | AIMI" },
      {
        name: "description",
        content: "AIMI bouwt websites voor ondernemers in Groningen, Drenthe en Friesland. Bekijk per plaats wat we voor jouw onderneming kunnen betekenen.",
      },
      { property: "og:title", content: "Webdesign per regio | AIMI" },
      { property: "og:description", content: "Websites en webshops voor ondernemers in Noord-Nederland, vanuit Veendam." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Webdesign per regio | AIMI" },
      { name: "twitter:description", content: "Websites en webshops voor ondernemers in Noord-Nederland, vanuit Veendam." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        name: "Webdesign per regio",
        description: "Websites en webshops voor ondernemers in Groningen, Drenthe en Friesland, gebouwd en gehost door AIMI vanuit Veendam.",
        url: URL,
        serviceType: "Webdesign",
        // Expliciet: de hub dekt ook Friesland, dat ontbreekt in het standaardlijstje.
        areaServed: [
          { "@type": "AdministrativeArea", name: "Groningen" },
          { "@type": "AdministrativeArea", name: "Drenthe" },
          { "@type": "AdministrativeArea", name: "Friesland" },
          { "@type": "Country", name: "Nederland" },
        ],
      }),
      breadcrumbJsonLd([["Home", "/"], ["Webdesign", "/webdesign"]]),
    ],
  }),
  component: () => (
    <div style={{ background: BG, color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      <Nav />
      <main id="main-content">
        <div className="mx-auto max-w-5xl px-6 pt-32">
          <section>
            <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: RED }}>
              Webdesign in Noord-Nederland
            </div>
            <h1 style={{ margin: "14px 0 18px", fontSize: "clamp(24px, 3.6vw, 36px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {/* A-23: H1 cannibaliseerde met /website-laten-maken. Deze pagina is
                  de regio-hub, niet de dienstpagina. */}
              Webdesign per regio in Noord-Nederland
            </h1>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#b6b6bd", maxWidth: "62ch" }}>
              AIMI ontwerpt, bouwt en host websites en webshops vanuit Veendam. We werken voor ondernemers
              in heel Nederland, maar zitten fysiek in Noord-Nederland en kennen de regio: van de
              studentenstad Groningen tot de watersportplaatsen rond Sneek. Kies hieronder je plaats voor
              lokale context, of ga direct naar onze{" "}
              <a href="/website-laten-maken" style={{ color: RED }}>
                algemene dienstpagina
              </a>
              .
            </p>
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

        <Services />

        <div className="mx-auto max-w-5xl px-6 pb-24">
          <section style={{ marginTop: "64px" }}>
            <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Kies je plaats
            </h2>
            <p style={{ marginTop: "14px", fontSize: "14.5px", lineHeight: 1.75, color: "#b6b6bd", maxWidth: "68ch" }}>
              Elke plaats heeft een eigen pagina met lokale context: welk type bedrijven we er vaak
              tegenkomen, hoe we werken en antwoorden op vragen die in die regio vaak terugkomen.
            </p>
            <ul style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px", listStyle: "none", padding: 0 }}>
              {locations.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{
                      display: "block",
                      padding: "14px 16px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "6px",
                      color: "#efeff1",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    {l.label} →
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
