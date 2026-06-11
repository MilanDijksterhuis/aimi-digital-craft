import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="relative mx-auto max-w-5xl px-6">
        <p className="section-label mb-4">02 — About</p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="leading-[1.1] max-w-4xl"
        >
          We zijn <span className="text-primary">Aidan & Milan</span> — Twee twintigers die geloven dat iedere
          ondernemer een sterke online aanwezigheid verdient.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 text-base text-muted-foreground max-w-3xl"
        >
          Wij zijn Aidan en Milan. We bouwen moderne, professionele websites voor ondernemers, verenigingen en
          particulieren die online zichtbaar willen zijn zonder hoge kosten. In een tijd waarin alles duurder wordt,
          vinden wij dat een goede website toegankelijk moet blijven voor iedereen. Daarom bieden wij betaalbare
          maatwerkwebsites die snel, gebruiksvriendelijk en geschikt zijn voor alle apparaten. We luisteren naar jouw
          wensen en zorgen voor een website die past bij jouw doelen, uitstraling en budget.
        </motion.p>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["12+", "Projecten live"],
            ["99.9%", "Uptime"],
            ["<1s", "Avg. load time"],
            ["2", "Founders, geen ruis"],
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
