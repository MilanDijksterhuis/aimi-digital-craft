import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacybeleid")({
  head: () => ({
    meta: [
      { title: "Privacybeleid — AIMI" },
      { name: "description", content: "Lees hoe AIMI omgaat met jouw persoonsgegevens." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Terug naar home
        </Link>

        <h1 className="mt-8 text-4xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
          Privacybeleid
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Laatst bijgewerkt: juni 2025</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">1. Wie zijn wij?</h2>
            <p>
              AIMI is een web agency van Aidan en Milan. Wij ontwerpen, bouwen en hosten websites voor groeiende merken.
              Je kunt ons bereiken via{" "}
              <a href="mailto:sales@aimi-development.nl" className="text-foreground underline underline-offset-2">
                sales@aimi-development.nl
              </a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">2. Welke gegevens verzamelen wij?</h2>
            <p>Wij verwerken persoonsgegevens alleen wanneer jij ons die zelf verstrekt, bijvoorbeeld:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Naam en e-mailadres via het contactformulier</li>
              <li>Inloggegevens voor het klantenportaal</li>
              <li>Berichten die je via het portaal met ons deelt</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">3. Waarvoor gebruiken wij jouw gegevens?</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Om contact met je op te nemen naar aanleiding van een aanvraag</li>
              <li>Om de dienstverlening via het klantenportaal te leveren</li>
              <li>Om te voldoen aan onze wettelijke verplichtingen</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">4. Hoe lang bewaren wij jouw gegevens?</h2>
            <p>
              Wij bewaren persoonsgegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld.
              Contactformulierberichten bewaren wij maximaal 12 maanden. Portalgegevens bewaren wij zolang de samenwerking duurt.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">5. Delen wij gegevens met derden?</h2>
            <p>
              Wij delen jouw gegevens niet met derden, tenzij dit noodzakelijk is voor de dienstverlening (zoals onze
              hostingpartner) of wettelijk verplicht. Wij maken gebruik van Supabase voor dataopslag, dat voldoet aan
              Europese privacywetgeving (AVG/GDPR).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">6. Jouw rechten</h2>
            <p>Je hebt het recht om:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Inzage te vragen in jouw persoonsgegevens</li>
              <li>Gegevens te laten corrigeren of verwijderen</li>
              <li>Bezwaar te maken tegen verwerking</li>
              <li>Een klacht in te dienen bij de Autoriteit Persoonsgegevens</li>
            </ul>
            <p className="mt-2">
              Neem contact op via{" "}
              <a href="mailto:sales@aimi-development.nl" className="text-foreground underline underline-offset-2">
                sales@aimi-development.nl
              </a>{" "}
              om een verzoek in te dienen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-foreground">7. Cookies</h2>
            <p>
              Wij gebruiken uitsluitend functionele cookies die noodzakelijk zijn voor het functioneren van de website.
              Er worden geen tracking- of advertentiecookies geplaatst.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
