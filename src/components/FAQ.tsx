import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const items = [
  {
    q: "Hoelang duurt een project?",
    a: "Een Starter-site is doorgaans binnen 1–2 weken live. Een Pro-traject plan je in op 3–5 weken, afhankelijk van feedback-rondes en content-aanlevering.",
  },
  {
    q: "Wat als ik geen content of teksten heb?",
    a: "Geen probleem. We helpen je met een basis copystructuur. Voor uitgebreide copywriting werken we samen met vaste tekstschrijvers — vraag ernaar tijdens het intakegesprek.",
  },
  {
    q: "Kan ik later upgraden van Starter naar Pro?",
    a: "Ja. We bouwen Starter-sites zo dat uitbreiding eenvoudig is. De investering die je al hebt gedaan verrekenen we deels in het Pro-traject.",
  },
  {
    q: "Wat is inbegrepen bij hosting?",
    a: "SSL-certificaat, uptime-monitoring, maandelijkse backups en security-updates. Alles draait op onze eigen VPS — geen gedeelde hosting, geen verborgen limieten.",
  },
  {
    q: "Wat als ik al een website heb?",
    a: "Dan kun je kiezen voor ons Hosting Only-pakket (€30/maand) en wij nemen je site over. Of we bouwen een nieuwe versie en migreren alles voor je.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24" style={{ background: "#0f0e0d" }}>
      <div className="mx-auto max-w-3xl px-6">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3 text-sm font-medium"
          style={{ color: "#fe2c02", fontFamily: "Inter, sans-serif", letterSpacing: "0.05em" }}
        >
          Alles wat je wil weten
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-white mb-12"
        >
          Veelgestelde vragen
        </motion.h2>

        <div className="divide-y" style={{ borderColor: "#2a2b2b" }}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderColor: "#2a2b2b" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className="text-base font-medium text-white"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                    style={{ color: isOpen ? "#fe2c02" : "#8a8f98" }}
                  >
                    <Plus className="w-5 h-5" strokeWidth={1.5} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-base leading-relaxed" style={{ color: "#8a8f98", fontFamily: "Inter, sans-serif" }}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
