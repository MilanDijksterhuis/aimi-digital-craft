import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/wordpress-of-maatwerk`;
const RED = "#fe2c02";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

/* ---------------------------------------------------------------------------
 * /wordpress-of-maatwerk — informatieve vergelijkingspagina. De site had
 * uitsluitend commerciële en navigatiepagina's; voor oriënterende zoekopdrachten
 * was er niets. Bewust eerlijk geschreven, inclusief de gevallen waarin
 * WordPress de betere keuze is: een vergelijking die altijd op "kies ons"
 * uitkomt, wordt door niemand geloofd en beantwoordt de zoekvraag niet.
 * ------------------------------------------------------------------------- */

type Row = { aspect: string; wp: string; custom: string };

const comparison: Row[] = [
  {
    aspect: "Aanschafprijs",
    wp: "Vaak lager bij de start, zeker met een bestaand thema.",
    custom: "Hogere startprijs, omdat er niets wordt hergebruikt.",
  },
  {
    aspect: "Kosten op termijn",
    wp: "Doorlopende licenties voor thema's en plugins, plus onderhoud aan updates.",
    custom: "Geen licenties. Wel hosting en onderhoud, maar minder bewegende delen.",
  },
  {
    aspect: "Snelheid",
    wp: "Kan snel zijn, maar wordt in de praktijk vaak traag door thema's en plugins die je niet allemaal gebruikt.",
    custom: "Alleen de code die je site nodig heeft, dus standaard lichter.",
  },
  {
    aspect: "Zelf aanpassen",
    wp: "Sterk punt: een groot, bekend beheerscherm waar veel mensen mee overweg kunnen.",
    custom: "Hangt af van wat er is ingebouwd. Wij bouwen aanpasbaarheid alleen waar je het echt nodig hebt.",
  },
  {
    aspect: "Functionaliteit uitbreiden",
    wp: "Enorm aanbod plugins voor vrijwel alles, vaak binnen een dag werkend.",
    custom: "Alles kan, maar het moet gebouwd worden. Duurder voor standaardzaken, beter voor eigen processen.",
  },
  {
    aspect: "Beveiliging",
    wp: "Grootste doelwit ter wereld door zijn populariteit; vereist discipline in updates.",
    custom: "Kleiner aanvalsoppervlak, maar geen enkel systeem is vanzelf veilig.",
  },
  {
    aspect: "Afhankelijkheid",
    wp: "Je bent afhankelijk van plugin-makers die kunnen stoppen of hun prijs verhogen.",
    custom: "Je bent afhankelijk van de partij die het gebouwd heeft, tenzij de code netjes en overdraagbaar is.",
  },
  {
    aspect: "SEO",
    wp: "Prima mogelijk; de bekende SEO-plugins doen hun werk goed.",
    custom: "Prima mogelijk; alles is instelbaar omdat er geen thema tussen zit. Geen van beide heeft een ingebouwd voordeel.",
  },
];

const chooseWp = [
  "Je wilt zelf heel veel en heel vaak pagina's toevoegen en herschikken zonder iemand te bellen.",
  "Je hebt een functionaliteit nodig die als volwassen plugin bestaat, bijvoorbeeld een uitgebreid boekingssysteem of een ledenadministratie.",
  "Je budget is nu echt beperkt en je accepteert dat er later onderhoud en licentiekosten bij komen.",
  "Je hebt al een team of bureau dat prettig met WordPress werkt en dat zo wil houden.",
];

const chooseCustom = [
  "Snelheid is belangrijk voor je, bijvoorbeeld omdat veel bezoekers via mobiel binnenkomen.",
  "Je hebt een overzichtelijke site nodig die vooral moet werken en er goed uit moet zien, niet dagelijks moet veranderen.",
  "Je wilt geen stapel plugins beheren en niet elk kwartaal bezig zijn met updates die iets kunnen breken.",
  "Je hebt een eigen proces of koppeling die niet in een standaardplugin past.",
];

const faqs = [
  {
    q: "Is WordPress slechter voor SEO dan maatwerk?",
    a: "Nee. Dat is een hardnekkig misverstand. Google kijkt naar het resultaat: laadt de pagina snel, is hij goed gestructureerd en beantwoordt hij de zoekvraag. Zowel WordPress als maatwerk kan dat uitstekend, en beide kunnen het slecht doen. Het verschil zit in hoe de site is gebouwd, niet in het systeem.",
  },
  {
    q: "Is maatwerk altijd sneller dan WordPress?",
    a: "Niet per definitie, maar in de praktijk meestal wel. Bij maatwerk staat er alleen code die je site daadwerkelijk gebruikt, terwijl een WordPress-site vaak een thema en tien tot twintig plugins meelaadt waarvan je maar een deel benut. Een strak opgezette WordPress-site kan sneller zijn dan slecht gebouwd maatwerk.",
  },
  {
    q: "Kan ik bij maatwerk zelf mijn teksten aanpassen?",
    a: "Ja, als dat wordt ingebouwd. Wij vragen bij de start welke onderdelen je zelf wilt kunnen wijzigen en bouwen dat gericht. Vaak blijkt dat een beperkte set: teksten, prijzen, openingstijden en afbeeldingen. Alles aanpasbaar maken kost geld en levert in de praktijk zelden iets op.",
  },
  {
    q: "Wat gebeurt er met maatwerk als jullie ermee stoppen?",
    a: "Dat is een terechte vraag en je hoort hem te stellen aan iedereen die iets voor je bouwt. Je bent bij ons eigenaar van je site en je code; als je weg wilt, krijg je alles mee. Dat is precies waarom we netjes en overdraagbaar bouwen in plaats van met een eigen gesloten systeem te werken.",
  },
  {
    q: "Wat kost WordPress op de lange termijn?",
    a: "Dat verschilt sterk, maar reken op terugkerende kosten voor premium thema's en plugins, plus onderhoud om alles veilig en werkend te houden. Bij maatwerk vallen die licenties weg, maar betaal je nog steeds hosting en onderhoud. Welke van de twee goedkoper uitpakt, hangt af van hoeveel jaar je vooruit rekent.",
  },
  {
    q: "Wat bouwen jullie zelf?",
    a: "Wij bouwen maatwerk, omdat we snelheid en beheersbaarheid belangrijk vinden en niet afhankelijk willen zijn van plugins van derden. Maar als tijdens het gesprek blijkt dat WordPress voor jouw situatie logischer is, zeggen we dat gewoon. Liever een eerlijk advies dan een klant die na een jaar spijt heeft.",
  },
];

export const Route = createFileRoute("/wordpress-of-maatwerk")({
  head: () => ({
    meta: [
      { title: "WordPress of maatwerk? Een eerlijke vergelijking — AIMI" },
      {
        name: "description",
        content:
          "WordPress of een maatwerk website? Een eerlijke vergelijking van kosten, snelheid, beheer, beveiliging en SEO — inclusief wanneer WordPress de betere keuze is.",
      },
      { property: "og:title", content: "WordPress of maatwerk? Een eerlijke vergelijking" },
      {
        property: "og:description",
        content: "Kosten, snelheid, beheer, beveiliging en SEO naast elkaar. Inclusief wanneer WordPress beter past.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "WordPress of maatwerk? Een eerlijke vergelijking" },
      {
        name: "twitter:description",
        content: "Kosten, snelheid, beheer, beveiliging en SEO naast elkaar. Inclusief wanneer WordPress beter past.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json" as const,
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${URL}#article`,
          headline: "WordPress of maatwerk? Een eerlijke vergelijking",
          description:
            "Een vergelijking van WordPress en maatwerk websites op kosten, snelheid, beheer, beveiliging, afhankelijkheid en SEO.",
          url: URL,
          inLanguage: "nl-NL",
          isAccessibleForFree: true,
          author: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: URL,
        }),
      },
      faqJsonLd(faqs),
      breadcrumbJsonLd([["Home", "/"], ["WordPress of maatwerk", "/wordpress-of-maatwerk"]]),
    ],
  }),
  component: VergelijkingPage,
});

function VergelijkingPage() {
  return (
    <div style={{ background: "#0f1010", minHeight: "100vh", fontFamily: FONT, color: "#efeff1" }}>
      <Nav />

      <main id="main-content">
        <section className="pt-32 pb-14">
          <div className="mx-auto max-w-7xl px-6">
            <Breadcrumbs className="mb-6" trail={[["Home", "/"], ["WordPress of maatwerk", "/wordpress-of-maatwerk"]]} />
            <div className="text-[13px] font-medium mb-4" style={{ color: RED }}>
              Vergelijking
            </div>
            <h1
              className="max-w-3xl"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              WordPress of maatwerk?
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed" style={{ color: "#a4a9b2" }}>
              Wij bouwen maatwerk, dus je mag dit stuk met gepaste argwaan lezen. Daarom hebben we er ook in gezet
              wanneer WordPress de betere keuze is — want die gevallen bestaan echt. Hieronder de eerlijke
              afweging, zodat je zelf kunt bepalen wat bij je past.
            </p>
          </div>
        </section>

        <section className="py-14" style={{ background: "#161717" }}>
          <div className="mx-auto max-w-7xl px-6">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              De vergelijking op een rij
            </h2>
            <div className="mt-8" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: "680px", borderCollapse: "collapse", fontSize: "14.5px" }}>
                <caption className="text-left pb-4 text-[14px]" style={{ color: "#868b94" }}>
                  WordPress en maatwerk vergeleken op de punten die in de praktijk het verschil maken.
                </caption>
                <thead>
                  <tr>
                    <th scope="col" style={{ textAlign: "left", padding: "12px 14px", borderBottom: "1px solid #2a2b2b", width: "18%" }}>
                      &nbsp;
                    </th>
                    <th scope="col" style={{ textAlign: "left", padding: "12px 14px", borderBottom: "1px solid #2a2b2b", fontWeight: 600 }}>
                      WordPress
                    </th>
                    <th scope="col" style={{ textAlign: "left", padding: "12px 14px", borderBottom: "1px solid #2a2b2b", fontWeight: 600 }}>
                      Maatwerk
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((r) => (
                    <tr key={r.aspect}>
                      <th
                        scope="row"
                        style={{ textAlign: "left", padding: "14px", borderBottom: "1px solid #232424", fontWeight: 600, verticalAlign: "top" }}
                      >
                        {r.aspect}
                      </th>
                      <td style={{ padding: "14px", borderBottom: "1px solid #232424", color: "#a4a9b2", verticalAlign: "top" }}>
                        {r.wp}
                      </td>
                      <td style={{ padding: "14px", borderBottom: "1px solid #232424", color: "#a4a9b2", verticalAlign: "top" }}>
                        {r.custom}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 grid gap-10 md:grid-cols-2">
            <div>
              <h2 style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Kies WordPress als…
              </h2>
              <ul className="mt-6 space-y-3">
                {chooseWp.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: "#a4a9b2" }}>
                    <span className="mt-1 shrink-0" style={{ color: RED }}>
                      →
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Kies maatwerk als…
              </h2>
              <ul className="mt-6 space-y-3">
                {chooseCustom.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: "#a4a9b2" }}>
                    <span className="mt-1 shrink-0" style={{ color: RED }}>
                      →
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16" style={{ background: "#161717" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Veelgestelde vragen
            </h2>
            <div className="mt-10 space-y-6">
              {faqs.map((f) => (
                <div key={f.q} className="pb-6" style={{ borderBottom: "1px solid #2a2b2b" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 500 }}>{f.q}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "#a4a9b2" }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Nog steeds niet zeker?
            </h2>
            <p className="mt-4 text-[16px]" style={{ color: "#a4a9b2" }}>
              Vertel kort wat je site moet doen. We zeggen eerlijk welke kant we in jouw geval zouden kiezen, ook
              als dat WordPress is.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary group">
                Stel je vraag
                <ArrowRight className="w-4 h-4 arrow" />
              </Link>
              <Link to="/website-laten-maken" className="btn-secondary">
                Website laten maken
              </Link>
              <Link to="/website-laten-vernieuwen" className="btn-secondary">
                Website vernieuwen
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
