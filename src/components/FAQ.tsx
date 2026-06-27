import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const items = [
  {
    q: "Hoelang duurt een project?",
    a: "Een Starter-site is doorgaans binnen 1–2 weken live. Een Pro-traject plan je in op 3–5 weken, afhankelijk van feedback-rondes en content-aanlevering. We houden je elke stap op de hoogte.",
  },
  {
    q: "Wat als ik geen content of teksten heb?",
    a: "Geen probleem. We helpen je met een basis copystructuur en kunnen placeholder-teksten schrijven die je later aanvult. Voor uitgebreide copywriting werken we samen met vaste tekstschrijvers — vraag ernaar tijdens het intakegesprek.",
  },
  {
    q: "Kan ik later upgraden van Starter naar Pro?",
    a: "Ja. We bouwen Starter-sites zo dat uitbreiding eenvoudig is. De investering die je al hebt gedaan verrekenen we deels in het Pro-traject. Neem contact op en we kijken samen wat mogelijk is.",
  },
  {
    q: "Wat is inbegrepen bij hosting?",
    a: "SSL-certificaat, uptime-monitoring, maandelijkse backups en security-updates. Alles draait op onze eigen VPS — geen gedeelde hosting, geen verborgen limieten.",
  },
  {
    q: "Wat als ik al een website heb?",
    a: "Dan kun je kiezen voor ons Hosting Only-pakket (€30/maand) en wij nemen je site over. Of we bouwen een nieuwe versie en migreren alles voor je — inclusief domein en e-mail.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-12">
          Veelgestelde <em className="text-primary">vragen</em>
        </h2>

        <div className="divide-y divide-border border-y border-border">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-base">{item.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-primary"
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-muted-foreground leading-relaxed">
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
