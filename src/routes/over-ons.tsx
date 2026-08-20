import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { OG_IMAGE_URL, breadcrumbJsonLd } from "@/lib/seo";

const stats: [string, string][] = [
  ["2", "Directe contactpersonen"],
  ["< 2w", "Doorlooptijd"],
  ["100%", "In eigen beheer"],
  ["24/7", "Monitoring & hosting"],
];

const values: { title: string; desc: string }[] = [
  {
    title: "Direct contact",
    desc: "Je praat altijd met de persoon die je site bouwt. Geen accountmanagers, geen tussenlagen, geen wachttijden.",
  },
  {
    title: "Vaste prijzen",
    desc: "Je weet vooraf wat het kost. Geen uurtje-factuurtje en geen verrassingen achteraf.",
  },
  {
    title: "Alles in eigen beheer",
    desc: "Design, development én hosting draaien op onze eigen VPS. Zo houden we de kwaliteit en snelheid volledig in eigen hand.",
  },
  {
    title: "Snel en betrokken",
    desc: "Korte lijnen betekenen snelle oplevering. De meeste sites staan binnen twee weken live.",
  },
];

export const Route = createFileRoute("/over-ons")({
  head: () => ({
    meta: [
      { title: "Over ons | AIMI Web Agency Veendam & Hoogeveen" },
      {
        name: "description",
        content:
          "AIMI is een web agency van Aidan & Milan. Twee developers die websites ontwerpen, bouwen en hosten voor kleine bedrijven, zelfstandigen en verenigingen.",
      },
      { property: "og:title", content: "Over ons — AIMI" },
      {
        property: "og:description",
        content: "Twee developers, geen groot bureau. Maak kennis met AIMI.",
      },
      { property: "og:url", content: "https://aimi-development.nl/over-ons" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Over ons — AIMI" },
      { name: "twitter:description", content: "Twee developers, geen groot bureau. Maak kennis met AIMI." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: "https://aimi-development.nl/over-ons" }],
    scripts: [breadcrumbJsonLd([["Home", "/"], ["Over ons", "/over-ons"]])],
  }),
  component: OverOns,
});

function OverOns() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main id="main-content">
        <section className="pt-40 pb-24" style={{ background: "#1a1a1a" }}>
          <div className="mx-auto max-w-7xl px-6">
            <Link
              to="/"
              className="text-sm transition-colors"
              style={{ color: "#a4a9b2", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
              ← Terug naar home
            </Link>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-10 mb-3 text-sm font-medium"
              style={{ color: "#fe2c02", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", letterSpacing: "0.05em" }}
            >
              Over ons
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white max-w-3xl"
              style={{ fontSize: "3rem", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Twee developers, geen groot bureau.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-8 max-w-2xl space-y-5 text-sm leading-relaxed"
              style={{ color: "#a4a9b2" }}
            >
              <p>
                AIMI is opgericht door Aidan &amp; Milan. We bouwen websites voor
                kleine bedrijven, zelfstandigen en verenigingen mensen die een
                professionele site willen zonder de trage processen en hoge kosten
                van een groot bureau.
              </p>
              <p>
                Doordat we met z'n tweeën werken zijn de lijnen kort. Je hebt altijd
                direct contact met degene die je site bouwt, en beslissingen worden
                dezelfde dag genomen in plaats van in de volgende vergadering. Van het
                eerste ontwerp tot de hosting nemen we alles zelf voor onze rekening.
              </p>
              <p>
                We geloven in eerlijke, vaste prijzen en werk waar we trots op zijn.
                Elke site die we opleveren draait snel, ziet er premium uit en is
                gebouwd om mee te groeien met jouw bedrijf.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0"
              style={{ borderColor: "#2a2b2b", border: "1px solid #2a2b2b", borderRadius: "16px", overflow: "hidden" }}
            >
              {stats.map(([n, l]) => (
                <div key={l} className="p-8 flex flex-col" style={{ borderColor: "#2a2b2b" }}>
                  <div
                    className="text-white"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                      fontSize: "2.5rem",
                      fontWeight: 300,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {n}
                  </div>
                  <div className="text-xs mt-3 leading-snug" style={{ color: "#a4a9b2" }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24" style={{ background: "#1a1a1a" }}>
          <div className="mx-auto max-w-7xl px-6">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white text-center mb-4"
            >
              Waar we voor staan.
            </motion.h2>
            <p className="text-center text-sm mb-16" style={{ color: "#a4a9b2" }}>
              Een paar principes waar we niet van afwijken.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col p-8"
                  style={{
                    background: "transparent",
                    border: "1px solid #2a2b2b",
                    borderRadius: "16px",
                  }}
                >
                  <h3
                    className="text-white mb-2"
                    style={{ fontSize: "1.1rem", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", fontWeight: 500 }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#a4a9b2" }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center text-sm font-medium transition-opacity duration-150 hover:opacity-75"
                style={{
                  background: "#ffffff",
                  color: "#0f0e0d",
                  borderRadius: "9999px",
                  padding: "12px 24px",
                  fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                }}
              >
                Neem contact op
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
