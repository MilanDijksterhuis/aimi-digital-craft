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

const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

export function AnswerBlock() {
  return (
    <section aria-label="Wat is AIMI" style={{ background: "#161717", padding: "80px 0 88px" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="grid gap-8 pt-12 md:grid-cols-12"
          style={{ borderTop: "1px solid #2a2b2b" }}
        >
          <div className="md:col-span-3">
            <p
              className="text-[13px] font-medium"
              style={{ color: "#fe2c02", fontFamily: FONT, letterSpacing: "0.05em" }}
            >
              Wat is AIMI
            </p>
          </div>

          <div className="md:col-span-8 md:col-start-5">
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
              ondernemers in Noord-Nederland. We bouwen op maat in plaats van met een page builder,
              hosten op een eigen Nederlandse server en leveren de broncode mee, zodat je later
              zonder rebuild kunt overstappen.
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
              Aidan en Milan bouwen de sites zelf. Na oplevering heb je contact met de developer
              die je site gemaakt heeft, niet met een helpdesk.
            </p>

            <div className="mt-8 flex items-center gap-3">
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
          </div>
        </div>
      </div>
    </section>
  );
}
