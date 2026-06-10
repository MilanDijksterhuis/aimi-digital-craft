import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "€ 750",
    desc: "Voor solopreneurs en kleine bedrijven.",
    features: ["1-pagina site", "Mobile-first design", "Hosting (1 jaar)", "Basic SEO"],
  },
  {
    name: "Pro",
    price: "€ 1200",
    desc: "Onze sweet spot — perfect voor groeiende merken.",
    features: ["Tot 6 pagina's", "Custom design system", "CMS integratie", "Hosting + monitoring", "Performance audit"],
    featured: true,
  },
  {
    name: "Custom",
    price: "Op maat",
    desc: "Complexe builds, e-commerce, web apps.",
    features: ["Onbeperkt scope", "Backend & integraties", "Dedicated support", "SLA op maat"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">04 — Pricing</p>
          <h2>Simpel. Transparant.</h2>
          <p className="mt-4 text-muted-foreground">Geen verborgen kosten. Geen verrassingen.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`relative p-6 rounded-lg border flex flex-col ${
                t.featured ? "border-primary bg-card" : "border-border bg-card"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-2.5 left-6 px-2 py-0.5 bg-primary text-primary-foreground text-[11px] font-medium uppercase tracking-[0.08em] rounded">
                  Most popular
                </span>
              )}
              <h3 className="text-xl">{t.name}</h3>
              <div className="mt-4 font-display italic text-5xl font-normal text-foreground">{t.price}</div>
              <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>

              <ul className="mt-8 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className={`mt-8 ${t.featured ? "btn-primary" : "btn-secondary"}`}>
                Aan de slag
                <ArrowRight className="w-4 h-4 arrow" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
