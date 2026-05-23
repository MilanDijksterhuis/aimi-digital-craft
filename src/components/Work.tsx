import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Nordlys Studio",
    type: "Creative agency",
    stack: ["React", "Tailwind", "Sanity"],
    hue: "from-primary/30 to-accent/10",
  },
  {
    name: "Kade 14",
    type: "Restaurant",
    stack: ["Next.js", "Stripe", "Supabase"],
    hue: "from-accent/30 to-primary/10",
  },
  {
    name: "Forma Athletics",
    type: "E-commerce",
    stack: ["Shopify", "Hydrogen", "TS"],
    hue: "from-primary/20 to-accent/20",
  },
  {
    name: "Mono Coffee",
    type: "Brand site",
    stack: ["Astro", "Motion", "MDX"],
    hue: "from-accent/20 to-primary/30",
  },
];

export function Work() {
  return (
    <section id="work" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <p className="font-mono text-xs text-primary mb-3 uppercase tracking-widest">
              03 — Selected work
            </p>
            <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight">
              Recent shipped.
            </h2>
          </div>
          <a href="#contact" className="font-mono text-sm text-muted-foreground hover:text-foreground">
            Jouw project hier? →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-[4/3] rounded-2xl border border-border bg-surface overflow-hidden block"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.hue} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="absolute inset-0 grid-bg opacity-50" />
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-background/60 backdrop-blur grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="font-mono text-xs text-muted-foreground mb-2">{p.type}</div>
                <h3 className="font-display text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-background/80 border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
