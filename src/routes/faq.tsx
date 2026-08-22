import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { FAQ, faqItems } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL, OG_IMAGE_URL, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

const faqs = faqItems;

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Veelgestelde vragen over websites laten maken — AIMI" },
      {
        name: "description",
        content:
          "Antwoorden op veelgestelde vragen over websites laten maken, doorlooptijd, prijzen, hosting en samenwerken met AIMI. Alles wat je wil weten voor je begint.",
      },
      { property: "og:title", content: "Veelgestelde vragen — AIMI" },
      {
        property: "og:description",
        content: "Antwoorden op veelgestelde vragen over websites, doorlooptijd, hosting en samenwerken met AIMI.",
      },
      { property: "og:url", content: `${SITE_URL}/faq` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Veelgestelde vragen — AIMI" },
      {
        name: "twitter:description",
        content: "Antwoorden op veelgestelde vragen over websites, doorlooptijd, hosting en samenwerken met AIMI.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq` }],
    scripts: [breadcrumbJsonLd([["Home", "/"], ["FAQ", "/faq"]]), faqJsonLd(faqs)],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content">
        <div className="pt-32 pb-8" style={{ background: "#1a1a1a" }}>
          <div className="mx-auto max-w-3xl px-6">
            <Link
              to="/"
              className="text-sm transition-colors"
              style={{ color: "#a4a9b2", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
              ← Terug naar home
            </Link>
            <h1
              className="mt-6 text-white"
              style={{
                fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3rem)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
              }}
            >
              Veelgestelde vragen over websites laten maken
            </h1>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#a4a9b2" }}>
              Antwoorden op de vragen die we het vaakst krijgen over prijzen, doorlooptijd,{" "}
              <Link to="/onderhoud-hosting" style={{ color: "#fe2c02" }}>
                hosting
              </Link>{" "}
              en samenwerken met AIMI. Staat je vraag er niet bij? Stel 'm gerust via{" "}
              <Link to="/contact" style={{ color: "#fe2c02" }}>
                het contactformulier
              </Link>
              .
            </p>
          </div>
        </div>
        <FAQ />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
