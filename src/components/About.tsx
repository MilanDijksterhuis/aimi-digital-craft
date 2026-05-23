import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
      <div className="relative mx-auto max-w-5xl px-6">
        <p className="font-mono text-xs text-primary mb-3 uppercase tracking-widest">
          02 — About
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.05]"
        >
          We zijn <span className="text-primary">Aidan & Milan</span> — twee
          twintigers die geobsedeerd zijn door goed gebouwde producten.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 text-lg text-muted-foreground max-w-3xl leading-relaxed"
        >
          AIMI begon als zijproject en groeide uit tot een agency. We werken
          direct met onze klanten — geen account managers, geen ruis. Alleen
          twee makers die je site bouwen, hosten en laten groeien. Casual als
          het kan, professioneel waar het moet.
        </motion.p>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
          {[
            ["12+", "Projecten live"],
            ["99.9%", "Uptime"],
            ["<1s", "Avg. load time"],
            ["2", "Founders, geen ruis"],
          ].map(([n, l]) => (
            <div key={l} className="p-5 rounded-xl border border-border bg-surface/60">
              <div className="font-display text-3xl font-bold text-primary">{n}</div>
              <div className="text-xs text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
