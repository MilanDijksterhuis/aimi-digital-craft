import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Veelgestelde vragen — AIMI" },
      {
        name: "description",
        content:
          "Antwoorden op veelgestelde vragen over websites, doorlooptijd, hosting en samenwerken met AIMI.",
      },
      { property: "og:title", content: "Veelgestelde vragen — AIMI" },
      { property: "og:url", content: "https://aimi-development.nl/faq" },
    ],
    links: [{ rel: "canonical", href: "https://aimi-development.nl/faq" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <div className="pt-32" style={{ background: "#0f0e0d" }}>
          <div className="mx-auto max-w-3xl px-6">
            <Link
              to="/"
              className="text-sm transition-colors"
              style={{ color: "#a4a9b2", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
              ← Terug naar home
            </Link>
          </div>
        </div>
        <FAQ />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
