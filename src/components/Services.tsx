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
    desc: "Snelle laadtijden en goede SEO-scores. Niet als extra — standaard inbegrepen.",
  },
  {
    num: "04",
    title: "Hosting Only — €30/maand",
    desc: "Heb je al een site? Wij nemen de hosting over. SSL, backups en updates — geen setup-kosten.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <p className="section-label mb-4">Wat we doen</p>
          <h2 className="max-w-sm">
            Websites bouwen en onderhouden.
          </h2>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group grid grid-cols-[48px_1fr_auto] items-center gap-8 py-7 cursor-default"
            >
              <span className="font-mono text-xs text-muted-foreground">{s.num}</span>
              <div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-200">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
