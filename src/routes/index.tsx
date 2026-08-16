import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, LOGO_URL, OG_IMAGE_URL, ORG_ID } from "@/lib/seo";
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
      { title: "Website laten maken | Webdesign Veendam & Hoogeveen | AIMI" },
      {
        name: "description",
        content:
          "Website of webshop laten maken? AIMI bouwt snelle, professionele websites voor ondernemers in Veendam, Hoogeveen en heel Nederland. Vanaf € 499.",
      },
      { property: "og:title", content: "AIMI Websites die werken." },
      {
        property: "og:description",
        content: "Design, development & hosting door Aidan & Milan.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      // Font wordt self-hosted (zie styles.css) — geen externe Google-Fonts link meer.
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": ORG_ID,
          name: "AIMI",
          description:
            "Web agency van Aidan & Milan. Design, development & hosting voor groeiende merken.",
          url: `${SITE_URL}/`,
          logo: LOGO_URL,
          image: LOGO_URL,
          email: "sales@aimi-development.nl",
          areaServed: [
            { "@type": "City", name: "Veendam" },
            { "@type": "City", name: "Hoogeveen" },
            { "@type": "AdministrativeArea", name: "Groningen" },
            { "@type": "AdministrativeArea", name: "Drenthe" },
            { "@type": "Country", name: "Nederland" },
          ],
          founder: [
            { "@type": "Person", name: "Aidan" },
            { "@type": "Person", name: "Milan" },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Web services",
            itemListElement: [
              { "@type": "Offer", name: "Starter", price: "499", priceCurrency: "EUR" },
              { "@type": "Offer", name: "Pro", price: "749", priceCurrency: "EUR" },
            ],
          },
        }),
      },
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
