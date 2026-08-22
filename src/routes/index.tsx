import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, OG_IMAGE_URL } from "@/lib/seo";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CookieBanner } from "@/components/CookieBanner";

import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      // A-03: de homepage mikte op exact dezelfde term als /website-laten-maken
      // (en /webdesign). Die kernterm hoort nu bij /website-laten-maken; de
      // homepage positioneert op merk + overzicht van de diensten.
      { title: "AIMI — Webdesignbureau uit Noord-Nederland | Websites & webshops" },
      {
        name: "description",
        content:
          "AIMI is een webdesignbureau uit Veendam: twee developers die websites en webshops ontwerpen, bouwen en hosten. Vaste prijzen vanaf € 499 en direct contact.",
      },
      { property: "og:title", content: "AIMI — Webdesignbureau uit Noord-Nederland" },
      {
        property: "og:description",
        content:
          "Twee developers uit Veendam die websites en webshops ontwerpen, bouwen en hosten. Vaste prijzen vanaf € 499 en direct contact.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AIMI — Webdesignbureau uit Noord-Nederland" },
      {
        name: "twitter:description",
        content:
          "Twee developers uit Veendam die websites en webshops ontwerpen, bouwen en hosten. Vaste prijzen vanaf € 499 en direct contact.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      // Font wordt self-hosted (zie styles.css) — geen externe Google-Fonts link meer.
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content">
        <Hero />
        <Services />
        <ProcessTimeline />
        <About />

        <Pricing />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
