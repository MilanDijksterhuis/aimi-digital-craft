import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-32 bg-[#1c2b3a]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="leading-[1.1] text-white"
            >
              Twee developers,
              <br />
              geen groot bureau.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-base leading-relaxed"
              style={{ color: "#94a8b8" }}
            >
              We bouwen websites voor kleine bedrijven, zelfstandigen en verenigingen.
              Geen trage processen, geen accountmanagers. Je hebt altijd direct contact
              met degene die je site bouwt.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-3 gap-px bg-white/10 rounded-lg overflow-hidden"
          >
            {[
              ["12+", "Projecten opgeleverd"],
              ["< 2w", "Gemiddelde doorlooptijd"],
              ["2", "Directe contactpersonen"],
            ].map(([n, l]) => (
              <div key={l} className="bg-[#1c2b3a] p-8 flex flex-col">
                <div className="font-display font-bold text-4xl text-white">{n}</div>
                <div className="text-xs mt-2 leading-snug" style={{ color: "#8fa8c0" }}>{l}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
