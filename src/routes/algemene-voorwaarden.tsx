import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/algemene-voorwaarden")({
  head: () => ({
    meta: [
      { title: "Algemene Voorwaarden — AIMI" },
      { name: "description", content: "De algemene voorwaarden van AIMI." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VoorwaardenPage,
});

function VoorwaardenPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Terug naar home
        </Link>

        <h1 className="mt-8 text-4xl font-bold" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          Algemene Voorwaarden
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Laatst bijgewerkt: juni 2025</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">1. Definities</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-foreground">AIMI:</strong> het web agency van Aidan en Milan, gevestigd in Nederland.</li>
              <li><strong className="text-foreground">Opdrachtgever:</strong> de natuurlijke of rechtspersoon die een overeenkomst aangaat met AIMI.</li>
              <li><strong className="text-foreground">Overeenkomst:</strong> elke afspraak tussen AIMI en opdrachtgever.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">2. Toepasselijkheid</h2>
            <p>
              Deze voorwaarden zijn van toepassing op alle offertes, overeenkomsten en leveringen van AIMI, tenzij
              schriftelijk anders overeengekomen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">3. Offertes en overeenkomsten</h2>
            <p>
              Alle offertes zijn vrijblijvend en geldig gedurende 30 dagen. Een overeenkomst komt tot stand na schriftelijke
              bevestiging (e-mail volstaat) van beide partijen of na betaling van de aanbetaling.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">4. Betaling</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Projecten worden gefactureerd met 50% aanbetaling bij akkoord en 50% bij oplevering.</li>
              <li>Maandelijkse abonnementen worden vooraf gefactureerd.</li>
              <li>Betalingstermijn is 14 dagen na factuurdatum.</li>
              <li>Bij niet-tijdige betaling behoudt AIMI zich het recht voor de dienstverlening op te schorten.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">5. Oplevering en revisies</h2>
            <p>
              AIMI levert werk op conform de overeengekomen specificaties. In de prijs zijn maximaal twee revisierondes
              inbegrepen, tenzij anders afgesproken. Meerwerk wordt separaat geoffreerd.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">6. Intellectueel eigendom</h2>
            <p>
              Na volledige betaling draagt AIMI de eigendomsrechten van het opgeleverde werk over aan de opdrachtgever.
              AIMI behoudt het recht het werk te tonen in een portfolio, tenzij schriftelijk anders overeengekomen.
              Gebruikte frameworks, libraries en open-source componenten blijven onderworpen aan hun eigen licenties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">7. Hosting en onderhoud</h2>
            <p>
              Hostingdiensten worden geleverd op maandbasis. Opzegging dient minimaal 30 dagen voor de volgende
              factuurdatum schriftelijk te worden doorgegeven. AIMI streeft naar maximale uptime maar biedt geen
              garantie van ononderbroken beschikbaarheid.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">8. Aansprakelijkheid</h2>
            <p>
              De aansprakelijkheid van AIMI is beperkt tot het bedrag dat voor de betreffende opdracht in rekening is
              gebracht. AIMI is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">9. Opzegging</h2>
            <p>
              Projectovereenkomsten kunnen door de opdrachtgever worden opgezegd met inachtneming van 14 dagen schriftelijke
              opzegtermijn. Het reeds verrichte werk wordt naar rato gefactureerd.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">10. Toepasselijk recht</h2>
            <p>
              Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden bij voorkeur in goed overleg
              opgelost. Indien dat niet lukt, is de bevoegde rechter in Nederland exclusief bevoegd.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">11. Contact</h2>
            <p>
              Vragen over deze voorwaarden? Neem contact op via{" "}
              <a href="mailto:sales@aimi-development.nl" className="text-foreground underline underline-offset-2">
                sales@aimi-development.nl
              </a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
