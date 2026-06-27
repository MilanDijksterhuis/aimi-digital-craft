import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="relative mx-auto max-w-5xl px-6">
        <p className="section-label mb-4">Over ons</p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="leading-[1.1] max-w-3xl"
        >
          Wij zijn <span className="text-primary">Aidan & Milan</span> — twee developers uit Nederland.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 text-base text-muted-foreground max-w-2xl leading-relaxed"
        >
          We bouwen websites voor kleine bedrijven, zelfstandigen en verenigingen. Geen grote
          bureaus met trage processen — gewoon twee mensen die goed werk afleveren voor een
          eerlijke prijs. Je hebt altijd direct contact met degene die je site bouwt.
        </motion.p>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            ["12+", "Projecten opgeleverd"],
            ["< 2 weken", "Gemiddelde doorlooptijd"],
            ["2", "Directe contactpersonen"],
          ].map(([n, l]) => (
            <div key={l} className="p-6 rounded-lg border border-border bg-card">
              <div className="font-display italic text-4xl text-primary">{n}</div>
              <div className="text-xs uppercase tracking-[0.08em] text-muted-foreground mt-2">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
