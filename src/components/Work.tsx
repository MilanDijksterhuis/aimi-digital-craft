import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  { name: "Nordlys Studio", type: "Creative agency", stack: ["React", "Tailwind", "Sanity"] },
  { name: "Kade 14", type: "Restaurant", stack: ["Next.js", "Stripe", "Supabase"] },
  { name: "Forma Athletics", type: "E-commerce", stack: ["Shopify", "Hydrogen", "TS"] },
  { name: "Mono Coffee", type: "Brand site", stack: ["Astro", "Motion", "MDX"] },
];

export function Work() {
  return (
    <section id="work" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <p className="section-label mb-4">03 — Selected work</p>
            <h2>Recent shipped.</h2>
          </div>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Jouw project hier? →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative aspect-[4/3] rounded-lg border border-border bg-card overflow-hidden block hover:border-primary/40 transition-colors"
            >
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border bg-background grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="section-label mb-2">{p.type}</div>
                <h3 className="font-display italic text-3xl font-normal mb-4 text-foreground group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] uppercase tracking-[0.08em] px-2 py-1 rounded border border-border bg-background text-muted-foreground"
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
