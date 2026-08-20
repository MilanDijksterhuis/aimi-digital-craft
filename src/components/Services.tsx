import { useState } from "react";
import { motion } from "motion/react";

const services = [
  {
    title: "Website laten maken",
    href: "/website-laten-maken",
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
    title: "Webshop laten maken",
    href: "/webshop-laten-maken",
    short: "Verkoopklare online winkel.",
    desc: "Online verkopen zonder gedoe. We bouwen verkoopklare webshops met veilige betaalmethodes en een simpel productbeheer, gericht op meer conversie.",
    steps: [
      "Verkoopklaar ontwerp",
      "Veilig afrekenen (iDEAL e.a.)",
      "Eenvoudig productbeheer",
      "Klaar voor groei",
    ],
  },
  {
    title: "Onderhoud & hosting",
    href: "/onderhoud-hosting",
    short: "Wij regelen alles achter de schermen.",
    desc: "Wij zorgen voor een stabiele, snelle en veilige omgeving voor jouw website. Van serveropzet tot maandelijkse updates. Jij hoeft er niet naar om te kijken.",
    steps: [
      "Server configuratie",
      "SSL en beveiliging",
      "Uptime monitoring",
      "Maandelijkse updates",
    ],
    tag: "vanaf €30/maand",
  },
  {
    title: "Meer diensten",
    href: "/meer-diensten",
    short: "Hosting, performance en SEO los afnemen.",
    desc: "Heb je al een site maar wil je 'm sneller, veiliger of beter vindbaar? Hosting, performance-optimalisatie en SEO nemen we ook los van elkaar af.",
    steps: [
      "Hosting overnemen",
      "Performance-optimalisatie",
      "SEO & vindbaarheid",
      "Geen setup-kosten",
    ],
  },
];

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="py-12" style={{ background: "#161717" }}>
      <div className="mx-auto max-w-7xl px-6">

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white mb-8"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)" }}
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
                  key={s.href}
                  onClick={() => setActive(i)}
                  className="group text-left py-4 pr-4 flex items-start gap-5 transition-all duration-200"
                  style={{ borderColor: "#2a2b2b" }}
                >
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
                        color: isActive ? "#a4a9b2" : "#868b94",
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
            {services.map((s, i) => {
              const isActive = active === i;
              return (
                <div key={s.href} style={{ display: isActive ? "block" : "none" }}>
                  <h3
                    className="text-white mb-3"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                      fontSize: "clamp(1.4rem, 2.3vw, 1.9rem)",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                    }}
                  >
                    {s.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "#a4a9b2", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                  >
                    {s.desc}
                  </p>

                  <div className="flex flex-col gap-3">
                    {s.steps.map((step) => (
                      <div key={step} className="flex items-center gap-3">
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
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <a
                      href={s.href}
                      className="inline-flex items-center gap-2 text-sm font-medium"
                      style={{
                        color: "#0f0e0d",
                        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                        background: "#ffffff",
                        borderRadius: "9999px",
                        padding: "10px 20px",
                      }}
                    >
                      Meer over {s.title.toLowerCase()}
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm font-medium"
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
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
