import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  SITE_URL,
  OG_IMAGE_URL,
  breadcrumbJsonLd,
  faqJsonLd,
  howToJsonLd,
  serviceJsonLd,
} from "@/lib/seo";

const URL = `${SITE_URL}/seo`;
const RED = "#fe2c02";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

/* ---------------------------------------------------------------------------
 * /seo — SEO werd als dienst verkocht (compleet met Service-schema op
 * /meer-diensten) maar had geen eigen pagina. Dat was het grootste dienstgat
 * van de site: een bureau dat SEO aanbiedt zonder SEO-pagina is zowel
 * commercieel als qua geloofwaardigheid een gemis.
 *
 * Toon bewust in lijn met de rest van de site: geen posities beloven. Dat is
 * ook precies het onderscheid met de meeste SEO-aanbieders.
 * ------------------------------------------------------------------------- */

const included = [
  {
    title: "Technische SEO",
    desc: "De basis waar zoekmachines op afgaan: kan Google je site goed crawlen, renderen en begrijpen?",
    details: [
      "Crawlbaarheid, indexatie, robots.txt en sitemap kloppend maken",
      "Titles, descriptions en koppenstructuur per pagina",
      "Canonicals en dubbele content oplossen",
      "Structured data die overeenkomt met wat er zichtbaar op de pagina staat",
    ],
  },
  {
    title: "Snelheid & Core Web Vitals",
    desc: "Een trage site kost je bezoekers, en snelheid is een van de weinige rankingfactoren die Google expliciet bevestigt.",
    details: [
      "Meting van LCP, CLS en INP op mobiel en desktop",
      "Afbeeldingen, fonts en scripts optimaliseren",
      "Concreet rapport van de situatie voor en na",
    ],
  },
  {
    title: "Zoekintentie & content",
    desc: "De meeste SEO-winst zit niet in techniek maar in de vraag of je pagina's beantwoorden wat mensen daadwerkelijk zoeken.",
    details: [
      "Inventarisatie van zoektermen die passen bij wat je verkoopt",
      "Eén zoekintentie per pagina, zodat je pagina's elkaar niet beconcurreren",
      "Ontbrekende onderwerpen in kaart brengen en invullen",
    ],
  },
  {
    title: "Lokale SEO",
    desc: "Voor bedrijven met een werkgebied is lokaal vindbaar zijn belangrijker dan landelijk scoren.",
    details: [
      "Bedrijfsgegevens consistent op je site, in je schema en op je Google Bedrijfsprofiel",
      "Lokale landingspagina's die echt iets toevoegen, geen doorway-pagina's",
      "Adviezen voor het verzamelen van echte reviews",
    ],
  },
];

const notPromised = [
  "Een gegarandeerde plek 1 in Google. Die kan niemand geven, en wie het wel belooft, verkoopt je iets anders.",
  "Resultaat binnen een maand. SEO werkt cumulatief; de eerste betekenisvolle verschuivingen zie je doorgaans na een aantal maanden.",
  "Honderden backlinks. Ingekochte links zijn een risico voor je site, geen investering.",
  "Rapportages vol grafieken die niets zeggen. Je krijgt liever drie cijfers die kloppen dan dertig die indruk maken.",
];

const steps = [
  { title: "Nulmeting", desc: "We zetten Search Console en analytics goed op en leggen vast waar je nu staat. Zonder die basis is elk SEO-resultaat een mening in plaats van een meting." },
  { title: "Technische audit", desc: "We lopen je site na op crawlbaarheid, indexatie, snelheid, structured data en interne links, en leveren de bevindingen op met prioriteiten." },
  { title: "Zoekintentie in kaart", desc: "We bepalen welke zoekopdrachten passen bij wat je verkoopt, en welke pagina daar de duidelijkste eigenaar van is." },
  { title: "Uitvoeren", desc: "We voeren de technische fixes door en verbeteren of schrijven de pagina's die aan een zoekintentie zijn gekoppeld." },
  { title: "Meten en bijsturen", desc: "Na de eerste maanden kijken we in Search Console wat er daadwerkelijk beweegt en bepalen we op basis daarvan de volgende stap." },
];

const faqs = [
  {
    q: "Wat kost SEO bij AIMI?",
    a: "SEO doen we op basis van een offerte, omdat de omvang sterk verschilt: een technische audit met fixes op een bestaande site is iets anders dan doorlopende begeleiding met contentwerk. Na een kort gesprek en een blik op je site krijg je een vaste prijs. Bouwen wij je website, dan zit de technische SEO-basis al standaard in het project.",
  },
  {
    q: "Hoe lang duurt het voordat SEO resultaat oplevert?",
    a: "Technische verbeteringen kunnen binnen enkele weken zichtbaar worden in Search Console. Verschuivingen in posities en verkeer duren doorgaans langer, vaak een aantal maanden, omdat Google tijd nodig heeft om wijzigingen te verwerken en te wegen. Iedereen die je een termijn van weken belooft, gokt.",
  },
  {
    q: "Kunnen jullie garanderen dat ik op nummer 1 kom?",
    a: "Nee. Niemand kan dat, omdat niemand behalve Google de rangschikking bepaalt. Wat we wel doen is de dingen op orde brengen waar je zelf invloed op hebt: techniek, snelheid, structuur en content die aansluit op de zoekopdracht. Dat is precies waar de winst zit die je kunt beïnvloeden.",
  },
  {
    q: "Heb ik SEO nodig als jullie mijn website bouwen?",
    a: "Een gezonde technische basis zit standaard in elk project dat wij bouwen: nette titels, een correcte sitemap, structured data en snelheid. Een los SEO-traject is bedoeld voor wie verder wil, bijvoorbeeld met contentuitbreiding of lokale vindbaarheid, of voor wie een bestaande site heeft die wij niet gebouwd hebben.",
  },
  {
    q: "Doen jullie ook SEO voor een site die niet door jullie is gemaakt?",
    a: "Ja. Dat is zelfs het meest voorkomende geval. We kijken eerst of het technisch fundament van je huidige site het waard is om op te investeren; soms is een audit met gerichte fixes genoeg, soms is opnieuw bouwen goedkoper dan blijven repareren. Dat zeggen we eerlijk, ook als het antwoord ons minder werk oplevert.",
  },
  {
    q: "Wat is het verschil tussen SEO en Google Ads?",
    a: "Met Google Ads koop je bezoekers: je betaalt per klik en zodra je stopt, stopt het verkeer. SEO is werk aan je eigen site dat blijft staan, maar dat tijd kost voordat het rendeert. Wij doen geen advertentiebeheer; we richten ons op de kant die van jou blijft.",
  },
  {
    q: "Wat is lokale SEO precies?",
    a: "Lokale SEO richt zich op zoekopdrachten waar een plaats of regio in meespeelt, en op de kaartresultaten die Google daarbij toont. Daar wegen andere dingen zwaar: kloppende en overal identieke bedrijfsgegevens, een goed ingevuld Google Bedrijfsprofiel en echte reviews. Voor een bedrijf met een werkgebied is dat vaak belangrijker dan landelijk scoren.",
  },
  {
    q: "Werken jullie met SEO-rapportages?",
    a: "Ja, maar bewust beknopt. Je krijgt de cijfers die iets betekenen voor jouw bedrijf: hoeveel mensen je site via Google vinden, op welke zoekopdrachten, en wat daarvan tot aanvragen leidt. Geen rapport van dertig pagina's waarin de conclusie moeilijk te vinden is.",
  },
];

export const Route = createFileRoute("/seo")({
  head: () => ({
    meta: [
      { title: "SEO laten doen | Technische SEO, snelheid & lokale vindbaarheid — AIMI" },
      {
        name: "description",
        content:
          "SEO laten doen bij AIMI: technische SEO, Core Web Vitals, zoekintentie en lokale vindbaarheid. Geen beloftes over posities, wel werk waar je invloed op hebt.",
      },
      { property: "og:title", content: "SEO laten doen — AIMI" },
      {
        property: "og:description",
        content: "Technische SEO, snelheid, zoekintentie en lokale vindbaarheid. Zonder gouden bergen te beloven.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SEO laten doen — AIMI" },
      {
        name: "twitter:description",
        content: "Technische SEO, snelheid, zoekintentie en lokale vindbaarheid. Zonder gouden bergen te beloven.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        id: `${URL}#service`,
        name: "SEO laten doen",
        serviceType: "Zoekmachineoptimalisatie",
        description:
          "Technische SEO, Core Web Vitals, zoekintentie en lokale vindbaarheid voor ondernemers in Noord-Nederland en daarbuiten.",
        url: URL,
      }),
      howToJsonLd({
        name: "Hoe een SEO-traject bij AIMI verloopt",
        description: "Van nulmeting en technische audit tot uitvoeren, meten en bijsturen.",
        steps,
      }),
      faqJsonLd(faqs),
      breadcrumbJsonLd([["Home", "/"], ["SEO", "/seo"]]),
    ],
  }),
  component: SeoPage,
});

function SeoPage() {
  return (
    <div style={{ background: "#0f1010", minHeight: "100vh", fontFamily: FONT, color: "#efeff1" }}>
      <Nav />

      <main id="main-content">
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-6">
            <Breadcrumbs className="mb-6" trail={[["Home", "/"], ["SEO", "/seo"]]} />
            <div className="text-[13px] font-medium mb-4" style={{ color: RED }}>
              SEO
            </div>
            <h1
              className="max-w-3xl"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              SEO laten doen zonder gouden bergen
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed" style={{ color: "#a4a9b2" }}>
              De meeste SEO-verhalen beginnen met een belofte over plek 1. Dat gaan wij niet doen, want niemand
              behalve Google bepaalt de rangschikking. Wat we wél doen, is de dingen op orde brengen waar je zelf
              invloed op hebt: een site die technisch klopt, snel is en pagina's heeft die precies beantwoorden wat
              iemand intypt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Vraag een SEO-scan aan
              </Link>
              <Link to="/tarieven" className="btn-secondary">
                Bekijk tarieven
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16" style={{ background: "#161717" }}>
          <div className="mx-auto max-w-7xl px-6">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Waar een SEO-traject bij ons uit bestaat
            </h2>
            <p className="mt-4 max-w-2xl text-[15px]" style={{ color: "#a4a9b2" }}>
              Welke onderdelen zwaar wegen verschilt per site. Bij een trage webshop ligt het accent ergens anders
              dan bij een dienstverlener die lokaal gevonden wil worden.
            </p>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {included.map((o) => (
                <div key={o.title} className="p-7" style={{ border: "1px solid #2a2b2b", borderRadius: "14px" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: 600 }}>{o.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: "#a4a9b2" }}>
                    {o.desc}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {o.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-[14px]" style={{ color: "#a4a9b2" }}>
                        <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#49de80" }} />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Wat we niet beloven
            </h2>
            <p className="mt-4 text-[15px]" style={{ color: "#a4a9b2" }}>
              Dit is het deel dat de meeste SEO-aanbieders weglaten. Wij zetten het er expres bij, zodat je weet
              waar je aan begint.
            </p>
            <ul className="mt-8 space-y-4">
              {notPromised.map((n) => (
                <li key={n} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: "#a4a9b2" }}>
                  <span className="mt-1 shrink-0" style={{ color: "#868b94" }}>
                    —
                  </span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16" style={{ background: "#161717" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Hoe een SEO-traject verloopt
            </h2>
            <ol className="mt-10 grid gap-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span style={{ color: RED, fontWeight: 700, fontSize: "13px", minWidth: "24px", marginTop: "3px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 style={{ fontSize: "15.5px", fontWeight: 600 }}>{s.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed" style={{ color: "#a4a9b2" }}>
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Veelgestelde vragen over SEO
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

        <section className="py-16" style={{ background: "#161717" }}>
          <div className="mx-auto max-w-7xl px-6">
            <h2 style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Verder lezen
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { label: "Website laten vernieuwen", to: "/website-laten-vernieuwen" },
                { label: "WordPress of maatwerk?", to: "/wordpress-of-maatwerk" },
                { label: "Onderhoud & hosting", to: "/onderhoud-hosting" },
                { label: "Webdesign per regio", to: "/webdesign" },
                { label: "Tarieven", to: "/tarieven" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{
                    padding: "9px 16px",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: "9999px",
                    fontSize: "13.5px",
                    color: "#efeff1",
                    textDecoration: "none",
                  }}
                >
                  {l.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Benieuwd waar je nu staat?
            </h2>
            <p className="mt-4 text-[16px]" style={{ color: "#a4a9b2" }}>
              Stuur ons je website-adres. Je krijgt een eerlijke eerste indruk van wat er technisch beter kan en of
              een SEO-traject in jouw geval zinvol is.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary group">
                Vraag een SEO-scan aan
                <ArrowRight className="w-4 h-4 arrow" />
              </Link>
              <Link to="/meer-diensten" className="btn-secondary">
                Andere losse diensten
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
