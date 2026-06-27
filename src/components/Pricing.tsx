import { motion } from "motion/react";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "€ 499",
    desc: "Een professionele één-pagina site. Voor ZZP'ers en kleine bedrijven.",
    features: ["1-pagina site", "Mobile-first design", "Hosting (1 jaar)", "Basic SEO"],
  },
  {
    name: "Pro",
    price: "€ 749",
    desc: "Meerdere pagina's, eigen design en CMS. Voor bedrijven die meer controle willen.",
    features: [
      "Tot 6 pagina's",
      "Custom design",
      "CMS integratie",
      "Hosting + monitoring",
      "Performance optimalisatie",
    ],
    featured: true,
  },
  {
    name: "Custom",
    price: "Op maat",
    desc: "Grotere builds, webshops of web-applicaties. We maken een offerte na een gesprek.",
    features: [
      "Onbeperkte scope",
      "Backend & integraties",
      "Persoonlijke begeleiding",
      "Afspraken op maat",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-28" style={{ background: "#161717" }}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white text-center mb-4"
        >
          Vaste prijzen.
        </motion.h2>
        <p className="text-center text-sm mb-16" style={{ color: "#8a8f98" }}>
          Je weet vooraf wat het kost. Geen uurtje-factuurtje.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex flex-col p-8"
              style={{
                background: t.featured ? "#1e1f1f" : "transparent",
                border: `1px solid ${t.featured ? "rgba(255,255,255,0.12)" : "#2a2b2b"}`,
                borderRadius: "16px",
              }}
            >
              {t.featured && (
                <span
                  className="absolute -top-3 left-6 px-3 py-1 text-xs font-medium"
                  style={{
                    background: "#fe2c02",
                    color: "#ffffff",
                    borderRadius: "9999px",
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  Meest gekozen
                </span>
              )}

              <div
                className="text-white mb-1"
                style={{ fontSize: "13px", fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                {t.name}
              </div>
              <div
                className="text-white mt-2 mb-3"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "3rem",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {t.price}
              </div>
              <p className="text-sm mb-8" style={{ color: "#8a8f98" }}>{t.desc}</p>

              <ul className="space-y-3 flex-1 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "#8a8f98" }}>
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#49de80" }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="inline-flex items-center justify-center text-sm font-medium transition-opacity duration-150 hover:opacity-75"
                style={{
                  background: t.featured ? "#ffffff" : "transparent",
                  color: t.featured ? "#0f0e0d" : "#ffffff",
                  border: t.featured ? "none" : "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "9999px",
                  padding: "10px 20px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Neem contact op
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
