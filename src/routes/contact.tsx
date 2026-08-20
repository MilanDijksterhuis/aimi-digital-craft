import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Contact } from "@/components/Contact";
import { SITE_URL, OG_IMAGE_URL, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/contact`;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Vraag een offerte aan — AIMI" },
      {
        name: "description",
        content:
          "Neem contact op met AIMI voor een nieuwe website of webshop. Plan een gesprek of stuur een bericht je krijgt binnen één werkdag antwoord.",
      },
      { property: "og:title", content: "Contact — AIMI" },
      { property: "og:description", content: "Plan een gesprek of stuur een bericht. Je krijgt binnen één werkdag antwoord." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact — AIMI" },
      { name: "twitter:description", content: "Plan een gesprek of stuur een bericht. Je krijgt binnen één werkdag antwoord." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [breadcrumbJsonLd([["Home", "/"], ["Contact", "/contact"]])],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content">
        <section className="pt-40 pb-8" style={{ background: "#0f0e0d" }}>
          <div className="mx-auto max-w-7xl px-6">
            <p
              className="mb-3 text-sm font-medium"
              style={{ color: "#fe2c02", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", letterSpacing: "0.05em" }}
            >
              Contact
            </p>
            <h1
              className="text-white max-w-3xl"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.4rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Laten we je project bespreken.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed" style={{ color: "#a4a9b2" }}>
              Of je nu een nieuwe website of webshop wilt, je bestaande site wilt vernieuwen of
              alleen hosting zoekt. Vertel ons kort over je plannen. Je praat direct met Aidan of
              Milan en krijgt binnen één werkdag antwoord. Ook per e-mail bereikbaar via{" "}
              <a href="mailto:sales@aimi-development.nl" style={{ color: "#fe2c02" }}>
                sales@aimi-development.nl
              </a>
              .
            </p>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
