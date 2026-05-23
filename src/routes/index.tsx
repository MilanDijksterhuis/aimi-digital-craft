import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
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
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
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
        <Work />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
