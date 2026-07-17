import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const services = [
  {
    title: "Design & Development",
    short: "Maatwerk in React en TypeScript.",
    desc: "We ontwerpen en bouwen websites die precies passen bij jouw merk en doelgroep. Geen templates, geen compromissen. Wij luisteren naar wat je nodig hebt en leveren een site die werkt.",
    steps: [
      "Intake en briefing",
      "Design concept opstellen",
      "Bouwen en testen",
      "Live zetten",
    ],
  },
  {
    title: "Hosting & Beheer",
    short: "Wij regelen alles achter de schermen.",
    desc: "Wij zorgen voor een stabiele, snelle en veilige omgeving voor jouw website. Van serveropzet tot maandelijkse updates. Jij hoeft er niet naar om te kijken.",
    steps: [
      "Server configuratie",
      "SSL en beveiliging",
      "Uptime monitoring",
      "Maandelijkse updates",
    ],
  },
  {
    title: "Performance",
    short: "Snelle laadtijden en sterke SEO scores.",
    desc: "Een trage site kost bezoekers en conversies. Wij optimaliseren je website op snelheid en vindbaarheid. Niet als betaald extra, maar als onderdeel van elk project.",
    steps: [
      "Core Web Vitals optimalisatie",
      "SEO technische basis",
      "Beeldcompressie en caching",
      "Google PageSpeed rapport",
    ],
  },
  {
    title: "Hosting Only",
    short: "Heb je al een site? Wij nemen de hosting over.",
    desc: "Al een bestaande website maar geen zin meer in serverproblemen? Wij migreren jouw site naar onze infrastructuur en zorgen dat alles snel, veilig en up-to-date blijft. Geen setup-kosten.",
    steps: [
      "Site migratie",
      "SSL certificaat",
      "Automatische backups",
      "Security updates",
    ],
    tag: "€30 per maand",
  },
];

export function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="services" className="py-16" style={{ background: "#161717" }}>
      <div className="mx-auto max-w-7xl px-6">

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white mb-8"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Wat we doen
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4 lg:gap-8">

          {/* Left — service list */}
          <div className="flex flex-col divide-y" style={{ borderColor: "#2a2b2b" }}>
            {services.map((s, i) => {
              const isActive = active === i;
              return (
                <button
                  onClick={() => setActive(i)}
                  className="group text-left py-4 pr-4 flex items-start gap-5 transition-all duration-200"
                  style={{ borderColor: "#2a2b2b" }}
                >
                  <span
                    className="text-xs pt-1 shrink-0 transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: isActive ? "#fe2c02" : "#4a4b4b",
                    }}
                  >
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm font-medium transition-colors duration-200"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                          color: isActive ? "#ffffff" : "#a4a9b2",
                        }}
                      >
                        {s.title}
                      </span>
                      {s.tag && (
                        <span
                          className="text-[10px] px-2 py-0.5 shrink-0"
                          style={{
                            background: "rgba(254,44,2,0.12)",
                            color: "#fe2c02",
                            borderRadius: "9999px",
                            fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                            border: "1px solid rgba(254,44,2,0.25)",
                          }}
                        >
                          {s.tag}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs mt-1 transition-colors duration-200"
                      style={{
                        color: isActive ? "#a4a9b2" : "#3a3b3b",
                        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                      }}
                    >
                      {s.short}
                    </p>
                  </div>
                  {/* Active indicator */}
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.2 }}
                    className="w-px self-stretch shrink-0"
                    style={{ background: "#fe2c02", originY: "center" }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right — detail panel */}
          <div
            className="relative rounded-2xl p-6 lg:p-8 overflow-hidden"
            style={{ background: "#1e1f1f", minHeight: 300 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="text-xs mb-3"
                  style={{ color: "#fe2c02", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                </div>

                <h3
                  className="text-white mb-3"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  {current.title}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "#a4a9b2", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                >
                  {current.desc}
                </p>

                <div className="flex flex-col gap-3">
                  {current.steps.map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.22, delay: i * 0.06 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "#49de80" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "#ffffff", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", fontWeight: 400 }}
                      >
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.a
                  href="#contact"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.13)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium"
                  style={{
                    color: "#ffffff",
                    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "9999px",
                    padding: "10px 20px",
                  }}
                >
                  Neem contact op
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
