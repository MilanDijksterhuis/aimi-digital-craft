import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";

import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AIMI — Websites die werken. Design, development & hosting." },
      {
        name: "description",
        content:
          "AIMI is een web agency van Aidan & Milan. We ontwerpen, bouwen en hosten snelle, premium websites voor groeiende merken.",
      },
      { property: "og:title", content: "AIMI — Websites die werken." },
      {
        property: "og:description",
        content: "Design, development & hosting door Aidan & Milan.",
      },
      { property: "og:url", content: "https://aimi-digital-craft.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://aimi-digital-craft.lovable.app/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "AIMI",
          description:
            "Web agency van Aidan & Milan. Design, development & hosting voor groeiende merken.",
          url: "https://aimi-digital-craft.lovable.app/",
          areaServed: "NL",
          founder: [
            { "@type": "Person", name: "Aidan" },
            { "@type": "Person", name: "Milan" },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Web services",
            itemListElement: [
              { "@type": "Offer", name: "Starter", price: "1250", priceCurrency: "EUR" },
              { "@type": "Offer", name: "Pro", price: "3500", priceCurrency: "EUR" },
              { "@type": "Offer", name: "Custom" },
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
      <main>
        <Hero />
        <Services />
        <About />
        
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
