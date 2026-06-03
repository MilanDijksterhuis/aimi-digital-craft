import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/afspraak")({
  head: () => ({
    meta: [
      { title: "Afspraak maken — AIMI" },
      { name: "description", content: "Plan direct een afspraak met AIMI voor design, development of hosting." },
      { property: "og:title", content: "Afspraak maken — AIMI" },
      { property: "og:description", content: "Plan direct een afspraak met AIMI voor design, development of hosting." },
    ],
    links: [
      { rel: "canonical", href: "https://aimi-digital-craft.lovable.app/afspraak" },
    ],
    scripts: [
      {
        type: "text/javascript",
        src: "https://assets.calendly.com/assets/external/widget.js",
        async: true,
      },
    ],
  }),
  component: AfspraakPage,
});

function AfspraakPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2">
              <span className="section-label">Contact</span>
            </div>
            <h1 className="mb-4">Afspraak maken</h1>
            <p className="text-muted-foreground max-w-xl mb-10">
              Plan direct een kennismaking of projectbespreking met Milan.
              Kies hieronder een moment dat jou uitkomt.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-lg border border-border overflow-hidden bg-surface"
          >
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/milan2003"
              style={{ minWidth: 320, height: 700 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Liever eerst mailen? Geen probleem.
            </p>
            <Link
              to="/"
              className="btn-secondary text-[13px] !py-2 !px-4"
              hash="contact"
            >
              Naar contactformulier
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
