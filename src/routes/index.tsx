import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CookieBanner } from "@/components/CookieBanner";

import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
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
      { property: "og:url", content: "https://aimi-development.nl/" },
      { property: "og:image", content: "https://aimi-development.nl/og-image.svg" },
      { property: "twitter:image", content: "https://aimi-development.nl/og-image.svg" },
    ],
    links: [
      { rel: "canonical", href: "https://aimi-development.nl/" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@400;500&display=swap",
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
          url: "https://aimi-development.nl/",
          logo: "https://aimi-development.nl/__l5e/assets-v1/f039dfe4-daef-4864-b2b2-1abd084c3bda/aimi-logo.png",
          image: "https://aimi-development.nl/__l5e/assets-v1/f039dfe4-daef-4864-b2b2-1abd084c3bda/aimi-logo.png",
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
        <ProcessTimeline />
        <About />
        
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
