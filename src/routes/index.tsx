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
      { title: "Website laten maken | Webdesign Veendam & Hoogeveen | AIMI" },
      {
        name: "description",
        content:
          "Website of webshop laten maken? AIMI bouwt snelle, professionele websites voor ondernemers in Veendam, Hoogeveen en heel Nederland. Vanaf € 499.",
      },
      { property: "og:title", content: "Website laten maken | Webdesign Veendam & Hoogeveen — AIMI" },
      {
        property: "og:description",
        content:
          "Website of webshop laten maken? AIMI bouwt snelle, professionele websites voor ondernemers in Veendam, Hoogeveen en heel Nederland. Vanaf € 499.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken | Webdesign Veendam & Hoogeveen — AIMI" },
      {
        name: "twitter:description",
        content:
          "Website of webshop laten maken? AIMI bouwt snelle, professionele websites voor ondernemers in Veendam, Hoogeveen en heel Nederland. Vanaf € 499.",
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
