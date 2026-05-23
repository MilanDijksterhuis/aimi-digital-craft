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
            <p className="font-mono text-xs text-primary mb-3 uppercase tracking-widest">
              01 — Services
            </p>
            <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight max-w-2xl">
              Alles wat je nodig hebt om <em className="text-primary not-italic">online</em> te winnen.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative p-8 rounded-2xl border border-border bg-surface/60 hover:bg-surface-elevated transition-all overflow-hidden ${
                s.muted ? "opacity-70" : ""
              }`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              <s.icon className="w-7 h-7 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="font-display font-semibold text-2xl mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
