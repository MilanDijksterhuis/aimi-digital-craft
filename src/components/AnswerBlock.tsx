/* Citeerbaar antwoordblok (GEO-audit 2026-09-06, punt 8.4 / 10).
 *
 * Zelfstandig leesbaar blok hoog in de DOM dat de kernvraag beantwoordt zonder
 * de rest van de pagina nodig te hebben. Opent met een definitiezin ("X is
 * een…") en bevat de volledige merknaam, de vorm die AI-antwoordmachines als
 * geheel citeren. Server-side gerenderd; geen animatie die de tekst voor
 * crawlers verbergt.
 *
 * Redesign 2026-09-15 (v4): rustig intro-blok in plaats van een groot
 * typografisch statement. Kleine kalme tekst, veel witruimte, twee korte
 * alinea's en een signatuur met de A/M-initialen die ook in de hero staan.
 * Geen cards, kolommenrij, iconen of nummering (design-regels CLAUDE.md). */

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import mapVeendamHoogeveen from "../assets/map-veendam-hoogeveen-clean.png";

/* Pixelposities van de steden in map-veendam-hoogeveen-clean.png (1800x2100),
   opgemeten uit de brondata zodat marker en lijn exact aansluiten. De
   originele afbeelding had eigen rode markers + tekst ingebakken op een
   lichte achtergrond; die zijn eruit gehaald (zie het verwerkingsscript) zodat
   de kaart transparant is. Geen tekstlabels bij de markers (onleesbaar op de
   afbeelding); de stadsnamen staan al in de lopende tekst ernaast. */
const VEENDAM = { x: 1423, y: 445 };
const HOOGEVEEN = { x: 1294, y: 654 };

const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

export function AnswerBlock() {
  return (
    <section
      aria-label="Wat is AIMI"
      className="snap-section snap-center"
      style={{ background: "#161717", padding: "80px 0 88px" }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="pt-12" style={{ borderTop: "1px solid #2a2b2b" }}>
          <p
            className="text-[13px] font-medium"
            style={{ color: "#fe2c02", fontFamily: FONT, letterSpacing: "0.05em" }}
          >
            Wat is AIMI
          </p>

          <div className="mt-8 flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
            <div className="flex-1 min-w-0">
              <p
                className="text-[16.5px]"
                style={{
                  lineHeight: 1.85,
                  color: "#b9bdc4",
                  fontFamily: FONT,
                  textWrap: "pretty",
                  maxWidth: "42rem",
                }}
              >
                <span style={{ color: "#fff", fontWeight: 500 }}>AIMI Development</span> is een
                webdesignbureau in Veendam (Groningen) dat websites en webshops bouwt voor
                ondernemers in Noord-Nederland. We bouwen op maat in plaats van met een page
                builder, hosten op een eigen Nederlandse server en leveren de broncode mee, zodat
                je later zonder rebuild kunt overstappen.
              </p>

              <p
                className="mt-5 text-[16.5px]"
                style={{
                  lineHeight: 1.85,
                  color: "#b9bdc4",
                  fontFamily: FONT,
                  textWrap: "pretty",
                  maxWidth: "42rem",
                }}
              >
                Aidan komt uit Veendam, Milan uit Hoogeveen. Samen bouwen ze elke site zelf. Na
                oplevering heb je contact met de developer die je site gemaakt heeft, niet met een
                helpdesk.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["A", "M"].map((l) => (
                      <div
                        key={l}
                        className="w-8 h-8 rounded-full border border-white/20 bg-white/10 grid place-items-center text-white text-sm font-medium"
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                  <span className="text-[13.5px]" style={{ color: "#868b94", fontFamily: FONT }}>
                    Aidan &amp; Milan, de developers achter AIMI
                  </span>
                </div>

                <a
                  href="/over-ons"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-75"
                  style={{ fontFamily: FONT }}
                >
                  Meer over ons
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            <div
              className="relative w-full lg:w-[340px] shrink-0 self-start overflow-hidden rounded-lg"
              style={{ border: "1px solid #2a2b2b" }}
            >
              <img
                src={mapVeendamHoogeveen}
                alt="Kaart van Nederland met Veendam en Hoogeveen, verbonden door een lijn"
                width={1800}
                height={2100}
                loading="lazy"
                decoding="async"
                className="block w-full h-auto"
              />
              <svg
                viewBox="0 0 1800 2100"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <motion.line
                  x1={VEENDAM.x}
                  y1={VEENDAM.y}
                  x2={HOOGEVEEN.x}
                  y2={HOOGEVEEN.y}
                  stroke="#fe2c02"
                  strokeWidth={16}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
                />
                <motion.circle
                  r={24}
                  fill="#fe2c02"
                  initial={{ opacity: 0, cx: VEENDAM.x, cy: VEENDAM.y }}
                  whileInView={{
                    opacity: [0, 1, 1, 0],
                    cx: [VEENDAM.x, VEENDAM.x, HOOGEVEEN.x, HOOGEVEEN.x],
                    cy: [VEENDAM.y, VEENDAM.y, HOOGEVEEN.y, HOOGEVEEN.y],
                  }}
                  viewport={{ once: true }}
                  transition={{
                    times: [0, 0.1, 0.85, 1],
                    duration: 2.4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 1,
                    delay: 1.4,
                  }}
                />
                <circle cx={VEENDAM.x} cy={VEENDAM.y} r={16} fill="#fe2c02" />
                <circle cx={HOOGEVEEN.x} cy={HOOGEVEEN.y} r={16} fill="#fe2c02" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
