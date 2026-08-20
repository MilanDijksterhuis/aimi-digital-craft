import { useState } from "react";
import { motion } from "motion/react";
import { ClipboardList, Paintbrush, Code2, Rocket, CheckCircle } from "lucide-react";

const phases = [
  {
    id: "intake",
    name: "Intake & planning",
    duration: "1 week",
    icon: ClipboardList,
    description:
      "We luisteren naar wat je nodig hebt. Geen standaard formulieren een echt gesprek over je merk, je doelgroep en wat je wilt bereiken.",
    clientAction: "Stuur ons je content, logo en eventuele huisstijlgidsen. Hoe meer input, hoe beter het resultaat.",
    deliverables: ["Kickoff gesprek", "Doelen & doelgroepanalyse", "Projectplan & planning", "Prijsofferte"],
  },
  {
    id: "ontwerp",
    name: "Ontwerp",
    duration: "2 weken",
    icon: Paintbrush,
    description:
      "Wij ontwerpen een concept dat past bij jouw merk. Geen templates. Je ziet wat we bouwen voordat we beginnen, en je geeft feedback totdat het klopt.",
    clientAction: "Geef feedback op het design concept. Twee revisierondes zijn inbegrepen.",
    deliverables: ["Design concept", "Typografie & kleurpalet", "Goedgekeurd design", "Responsive layout"],
  },
  {
    id: "ontwikkeling",
    name: "Ontwikkeling",
    duration: "2–3 weken",
    icon: Code2,
    description:
      "We bouwen de site op basis van het goedgekeurde design. Snelle laadtijden, schone code en solide SEO-basis zijn standaard geen betaalde extra's.",
    clientAction: "Controleer de stagingversie en meld eventuele aanpassingen. Jij bepaalt wanneer we live gaan.",
    deliverables: ["Volledig gebouwde site", "Core Web Vitals optimalisatie", "SEO technische basis", "Stagingomgeving"],
  },
  {
    id: "launch",
    name: "Launch",
    duration: "3 dagen",
    icon: Rocket,
    description:
      "We zetten de site live, configureren DNS, SSL en monitoring. Na de launch houden we de site in de gaten zodat alles soepel loopt.",
    clientAction: "Geef ons toegang tot je domeinnaam. Wij regelen de rest.",
    deliverables: ["DNS & SSL configuratie", "Live-gang", "Google PageSpeed rapport", "30 dagen monitoring"],
  },
];

export function ProcessTimeline() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="py-12" style={{ background: "#161717" }}>
      <div className="mx-auto max-w-7xl px-6">

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white mb-2"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)" }}
        >
          Hoe we werken
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm mb-10"
          style={{ color: "#a4a9b2", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
        >
          Transparant proces, geen verrassingen.
        </motion.p>

        {/* Stepper — desktop horizontal, mobile vertical */}
        <div className="flex flex-col lg:flex-row gap-0 mb-8">
          {phases.map((phase, i) => {
            const PhaseIcon = phase.icon;
            const isActive = active === i;
            const isDone = i < active;

            return (
              <button
                key={phase.id}
                onClick={() => setActive(i)}
                className="group flex-1 text-left lg:border-r last:border-r-0"
                style={{ borderColor: "#2a2b2b" }}
              >
                {/* Top bar */}
                <div
                  className="h-0.5 w-full transition-all duration-300"
                  style={{ background: isActive ? "#fe2c02" : isDone ? "#49de80" : "#2a2b2b" }}
                />

                <div className="py-5 pr-6 lg:pr-8 pl-0 lg:pl-0 flex items-start gap-4">
                  {/* Number + icon */}
                  <div className="flex flex-col items-start gap-1 shrink-0 pt-0.5">
                    <PhaseIcon
                      size={16}
                      strokeWidth={1.5}
                      style={{ color: isActive ? "#ffffff" : isDone ? "#49de80" : "#868b94" }}
                      className="transition-colors duration-200"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className="block text-sm font-medium transition-colors duration-200"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                        color: isActive ? "#ffffff" : isDone ? "#a4a9b2" : "#a4a9b2",
                      }}
                    >
                      {phase.name}
                    </span>
                    <span
                      className="block text-xs mt-0.5"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                        color: isActive ? "#fe2c02" : "#868b94",
                      }}
                    >
                      {phase.duration}
                    </span>
                  </div>

                  {isDone && (
                    <CheckCircle size={14} strokeWidth={1.5} style={{ color: "#49de80", marginTop: 2 }} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#1e1f1f" }}
        >
          {phases.map((phase, i) => {
            const isActive = active === i;
            return (
              <div
                key={phase.id}
                style={{ display: isActive ? "grid" : "none" }}
                className="p-6 lg:p-10 lg:grid-cols-3 gap-8"
              >
                {/* Left — description */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <div>
                    <h3
                      className="text-white mb-3"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                        fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
                        fontWeight: 300,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                      }}
                    >
                      {phase.name}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#a4a9b2", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                    >
                      {phase.description}
                    </p>
                  </div>

                  {/* Client action */}
                  <div
                    className="rounded-lg p-4"
                    style={{ background: "rgba(254,44,2,0.06)", border: "1px solid rgba(254,44,2,0.15)" }}
                  >
                    <p
                      className="text-xs uppercase tracking-widest mb-1"
                      style={{ color: "#fe2c02", fontFamily: "var(--font-mono)" }}
                    >
                      Jouw rol
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "#a4a9b2", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                    >
                      {phase.clientAction}
                    </p>
                  </div>
                </div>

                {/* Right — deliverables */}
                <div>
                  <p
                    className="text-xs uppercase tracking-widest mb-4"
                    style={{ color: "#868b94", fontFamily: "var(--font-mono)" }}
                  >
                    Deliverables
                  </p>
                  <div className="flex flex-col gap-3">
                    {phase.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "#49de80" }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: "#ffffff", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", fontWeight: 400 }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 mt-8 text-sm font-medium"
                    style={{
                      color: "#ffffff",
                      fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "9999px",
                      padding: "10px 20px",
                    }}
                  >
                    Plan een gratis intake
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
