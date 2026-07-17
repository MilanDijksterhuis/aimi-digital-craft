import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-28" style={{ background: "#0f0e0d" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white"
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
              className="mt-6 text-sm leading-relaxed"
              style={{ color: "#a4a9b2" }}
            >
              We bouwen websites voor kleine bedrijven, zelfstandigen en
              verenigingen. Geen trage processen, geen accountmanagers. Je hebt
              altijd direct contact met degene die je site bouwt.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-3 divide-x"
            style={{ borderColor: "#2a2b2b", border: "1px solid #2a2b2b", borderRadius: "16px", overflow: "hidden" }}
          >
            {[
              ["12+", "Projecten opgeleverd"],
              ["< 2w", "Doorlooptijd"],
              ["2", "Directe contactpersonen"],
            ].map(([n, l]) => (
              <div key={l} className="p-8 flex flex-col" style={{ borderColor: "#2a2b2b" }}>
                <div
                  className="text-white"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                    fontSize: "2.5rem",
                    fontWeight: 300,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
                <div className="text-xs mt-3 leading-snug" style={{ color: "#a4a9b2" }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
