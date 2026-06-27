import { motion } from "motion/react";
import { Code2, Server, Gauge, Cloud } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Design & Development",
    desc: "Maatwerk in React & TypeScript. We bouwen wat je nodig hebt, niet meer en niet minder.",
  },
  {
    icon: Server,
    title: "Hosting & Beheer",
    desc: "Wij regelen de hosting, updates en monitoring. Jij hoeft er niet naar om te kijken.",
  },
  {
    icon: Gauge,
    title: "Performance",
    desc: "Snelle laadtijden en goede SEO-scores. Niet als extra — standaard inbegrepen.",
  },
  {
    icon: Cloud,
    title: "Hosting Only — €30/maand",
    desc: "Heb je al een site maar wil je die snel en veilig laten hosten? Wij nemen het over. SSL, backups, updates — geen setup-kosten.",
    highlight: true,
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <p className="section-label mb-4">Wat we doen</p>
            <h2 className="max-w-xl">
              Websites bouwen en <em className="text-primary">onderhouden</em>.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`group relative p-6 rounded-lg border bg-card transition-colors hover:border-primary/40 ${
                s.highlight ? "border-primary/40 bg-primary/5" : "border-border"
              }`}
            >
              <s.icon className="w-6 h-6 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-xl mb-2">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
