import { motion } from "motion/react";
import { Code2, Server, Gauge, Plus } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Website Design & Development",
    desc: "Maatwerk sites in React & TypeScript. Strak design, snel gebouwd.",
  },
  {
    icon: Server,
    title: "Hosting & Maintenance",
    desc: "Wij hosten, monitoren en updaten. Jij doet je werk zonder zorgen.",
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    desc: "Core Web Vitals, SEO en snelheid die je conversie laat zien.",
  },
  {
    icon: Plus,
    title: "More coming soon…",
    desc: "We breiden uit met automatisering, AI en digitale producten.",
    muted: true,
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <p className="section-label mb-4">01 — Services</p>
            <h2 className="max-w-2xl">
              Alles wat je nodig hebt om <em className="text-primary">online</em> te winnen.
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
              className={`group relative p-6 rounded-lg border border-border bg-card transition-colors hover:border-primary/40 ${
                s.muted ? "opacity-70" : ""
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
