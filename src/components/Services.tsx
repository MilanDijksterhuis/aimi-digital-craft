import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const services = [
  {
    num: "01",
    title: "Design & Development",
    desc: "Maatwerk in React & TypeScript. We bouwen wat je nodig hebt, niet meer en niet minder.",
  },
  {
    num: "02",
    title: "Hosting & Beheer",
    desc: "Wij regelen de hosting, updates en monitoring. Jij hoeft er niet naar om te kijken.",
  },
  {
    num: "03",
    title: "Performance",
    desc: "Snelle laadtijden en goede SEO-scores. Standaard inbegrepen, geen extra kosten.",
  },
  {
    num: "04",
    title: "Hosting Only — €30/maand",
    desc: "Heb je al een site? Wij nemen de hosting over. SSL, backups, updates — geen setup-kosten.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-28" style={{ background: "#161717" }}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white mb-16 max-w-sm"
        >
          Wat we doen
        </motion.h2>

        <div className="divide-y" style={{ borderColor: "#2a2b2b" }}>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group grid grid-cols-[40px_1fr_24px] items-start gap-8 py-7 cursor-default"
            >
              <span className="text-xs pt-1" style={{ color: "#8a8f98", fontFamily: "var(--font-mono)" }}>
                {s.num}
              </span>
              <div>
                <h3
                  className="text-white mb-1.5 group-hover:text-[#fe2c02] transition-colors duration-200"
                  style={{ fontSize: "1.125rem", fontWeight: 500, fontFamily: "Inter, sans-serif", letterSpacing: "-0.01em" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm" style={{ color: "#8a8f98" }}>{s.desc}</p>
              </div>
              <ArrowRight
                className="w-4 h-4 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5"
                style={{ color: "#fe2c02" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
