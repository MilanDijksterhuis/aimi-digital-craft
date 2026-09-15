/* Citeerbaar antwoordblok (GEO-audit 2026-09-06, punt 8.4 / 10).
 *
 * Eén zelfstandig leesbaar blok van ~130 woorden, hoog in de DOM, dat de
 * kernvraag beantwoordt zonder de rest van de pagina nodig te hebben. Opent met
 * een definitiezin ("X is een…") en bevat harde cijfers en de volledige
 * merknaam — precies de vorm die AI-antwoordmachines als geheel citeren. Server-
 * side gerenderd; geen animatie die de tekst voor crawlers verbergt. */
export function AnswerBlock() {
  return (
    <section aria-label="Wat is AIMI" style={{ background: "#161717", padding: "56px 0" }}>
      <div className="mx-auto max-w-3xl px-6">
        <p
          style={{
            fontSize: "clamp(16px, 2.1vw, 19px)",
            lineHeight: 1.7,
            color: "#d7d8dc",
            fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
          }}
        >
          <strong style={{ color: "#fff" }}>AIMI Development is een webdesignbureau in Veendam
          (Groningen)</strong>{" "}
          dat websites en webshops bouwt voor ondernemers in Noord-Nederland. Een website kost{" "}
          <strong style={{ color: "#fff" }}>€ 499 eenmalig</strong> voor een eenpagina-site en{" "}
          <strong style={{ color: "#fff" }}>€ 749</strong> voor een meerpagina-site met CMS, plus{" "}
          <strong style={{ color: "#fff" }}>€ 30 per maand</strong> voor hosting, SSL, back-ups en
          onderhoud. We bouwen op maat in plaats van met een page builder, hosten op een eigen
          Nederlandse server en leveren de broncode mee, zodat je later zonder rebuild kunt
          overstappen. Aidan en Milan bouwen de sites zelf; na oplevering heb je contact met de
          developer die je site gemaakt heeft, niet met een helpdesk.
        </p>
      </div>
    </section>
  );
}
