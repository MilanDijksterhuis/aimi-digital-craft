import { motion } from "motion/react";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "€ 1.250",
    desc: "Voor solopreneurs en kleine bedrijven.",
    features: ["1-pagina site", "Mobile-first design", "Hosting (1 jaar)", "Basic SEO"],
  },
  {
    name: "Pro",
    price: "€ 2500",
    desc: "Onze sweet spot — perfect voor groeiende merken.",
    features: [
      "Tot 6 pagina's",
      "Custom design system",
      "CMS integratie",
      "Hosting + monitoring",
      "Performance audit",
    ],
    featured: true,
  },
  {
    name: "Custom",
    price: "Op maat",
    desc: "Complexe builds, e-commerce, web apps.",
    features: [
      "Onbeperkt scope",
      "Backend & integraties",
      "Dedicated support",
      "SLA op maat",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-primary mb-3 uppercase tracking-widest">
            04 — Pricing
          </p>
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight">
            Simpel. Transparant.
          </h2>
          <p className="mt-4 text-muted-foreground">Geen verborgen kosten. Geen verrassingen.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative p-8 rounded-2xl border flex flex-col ${t.featured
                ? "border-primary/50 bg-surface-elevated glow-primary"
                : "border-border bg-surface/60"
                }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-mono font-medium">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-2xl font-bold">{t.name}</h3>
              <div className="mt-4 font-display text-5xl font-bold">{t.price}</div>
              <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>

              <ul className="mt-8 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 inline-flex items-center justify-center px-5 py-3 rounded-full font-medium transition ${t.featured
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "border border-border bg-surface hover:bg-surface-elevated"
                  }`}
              >
                Aan de slag
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
