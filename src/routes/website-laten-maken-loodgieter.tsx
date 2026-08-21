import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-loodgieter`;

const data: BranchPageData = {
  branch: "loodgietersbedrijf",
  kicker: "Webdesign voor loodgieters",
  intro:
    "Wie een loodgieter zoekt, doet dat vaak midden in een lekkage, met een telefoon in de hand en weinig geduld voor een trage website. Een website voor je loodgietersbedrijf moet daarom binnen een paar seconden laten zien dat je er bent, en het telefoonnummer moet je meteen kunnen zien en aantikken.",
  needsHeading: "Spoed en snelheid: het belangrijkste bij een loodgieterswebsite",
  needsBody: [
    "Bij geen enkele andere branche is snelheid zo bepalend als bij een loodgieter: iemand met water op de vloer wil niet wachten tot een pagina geladen is, hij wil direct een telefoonnummer zien om te bellen. Wij bouwen loodgieterswebsites daarom met het telefoonnummer als belangrijkste conversie-element, groot en aantikbaar bovenaan de pagina, op elk scherm.",
    "Spoedgevallen zetten we bovenaan de pagina, nog voor reguliere diensten als installatie of onderhoud. Een bezoeker die met spoed zoekt, moet in één blik zien dat je storingen en lekkages met voorrang oppakt, zonder eerst door een lange lijst met diensten te hoeven scrollen.",
    "Omdat vrijwel iedereen die met spoed zoekt dit vanaf een telefoon doet, vaak op een slechte verbinding, bouwen we de site technisch zo licht en snel mogelijk. Geen zware afbeeldingen die de boel vertragen, geen overbodige scripts, maar een pagina die ook op een matig 4G-signaal meteen toont wat nodig is: telefoonnummer, spoedmelding, werkgebied.",
  ],
  pitfallsHeading: "Wat er vaak misgaat bij loodgietersbedrijf-websites",
  pitfallsBody: [
    "Een website die het telefoonnummer wegstopt onderaan de pagina of alleen in de footer toont, kost een loodgieter direct spoedaanvragen. Bij dit type bedrijf moet het nummer bovenaan staan, zichtbaar zonder te hoeven scrollen.",
    "Ook een trage website is bij een loodgieter geen kleine ergernis maar een directe reden om af te haken: iemand met een lekkage wacht niet op een pagina die drie seconden nodig heeft om te laden, hij belt de volgende in de zoekresultaten.",
    "Een derde valkuil is geen duidelijk werkgebied tonen. Bezoekers willen snel weten of jij dezelfde dag nog langs kunt komen, zonder dat de website daarvoor een uitgebreide lijst met plaatsnamen hoeft op te sommen.",
  ],
  approachHeading: "Zo werken we het uit",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken welke diensten je aanbiedt, van spoedreparaties tot installaties, en hoe belangrijk spoed is binnen je bedrijf." },
    { title: "Telefoonnummer voorop", desc: "We ontwerpen de pagina met het telefoonnummer als grootste, meest opvallende element, bereikbaar zonder scrollen." },
    { title: "Snelheid op mobiel", desc: "We bouwen de site licht en snel, met prioriteit voor laadtijd op mobiele verbindingen, omdat spoedzoekers zelden op wifi zitten." },
    { title: "Spoed bovenaan", desc: "We plaatsen spoedgevallen en storingsdienst boven reguliere diensten, zodat de urgentie meteen duidelijk is." },
    { title: "Livegang en beheer", desc: "Na livegang host je de website bij AIMI met servermonitoring, zodat de site ook tijdens piekmomenten bereikbaar blijft." },
  ],
  pricingHeading: "Wat kost een website voor een loodgietersbedrijf",
  pricingBody: [
    "De prijs van een website voor een loodgietersbedrijf hangt af van de omvang: een compacte site met spoedmelding, telefoonnummer en dienstenoverzicht vraagt minder werk dan een uitgebreide site met aparte pagina's per dienst. Via het offerteformulier geef je aan wat je nodig hebt, waarna we een reactie geven die aansluit op de daadwerkelijke omvang van het project.",
    "Onze tarieven staan als startpunt op de pricing-pagina. Voor de meeste loodgietersbedrijven is een compacte, snelle site met nadruk op spoedcontact voldoende; wie meerdere diensten apart wil uitlichten, kiest vaak voor een uitgebreider pakket. Dat bespreken we altijd vooraf, zodat je precies weet waar je aan toe bent.",
  ],
  faqs: [
    { q: "Staat het telefoonnummer altijd bovenaan zichtbaar?", a: "Ja, bij een loodgieterswebsite plaatsen we het telefoonnummer standaard bovenaan en aantikbaar, op elk schermformaat." },
    { q: "Is de website snel genoeg voor iemand met een lekkage die snel zoekt?", a: "Snelheid op mobiel is bij een loodgieterswebsite een randvoorwaarde. We bouwen de site licht en testen expliciet op mobiele laadtijden." },
    { q: "Kan spoed apart getoond worden van regulier onderhoud?", a: "Ja, we plaatsen spoedgevallen en storingsdienst bovenaan, boven reguliere diensten zoals installatie en onderhoud." },
    { q: "Hoeveel kost een website voor mijn loodgietersbedrijf?", a: "De prijs hangt af van de gewenste functionaliteit, bijvoorbeeld of spoedcontact en storingsdienst apart uitgelicht moeten worden. Bekijk onze tarievenpagina als startpunt of vraag een offerte aan." },
    { q: "Blijft de website ook bereikbaar tijdens drukte, bijvoorbeeld bij vorst?", a: "We hosten op eigen infrastructuur met servermonitoring, zodat de site ook op piekmomenten bereikbaar blijft." },
    { q: "Werken jullie in een specifieke regio?", a: "We werken voor loodgietersbedrijven in Noord-Nederland, en richten de website in op het werkgebied dat voor jouw bedrijf klopt." },
    { q: "Wordt mijn bedrijf gevonden op zoektermen als 'loodgieter website laten maken'?", a: "Snelheid en een schone technische structuur vormen de basis waarop zoekmachines vertrouwen. Voor een storingsdienst is dat extra belangrijk, omdat mensen tijdens een lekkage snel op mobiel zoeken." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website laten maken klusbedrijf", href: "/website-laten-maken-klusbedrijf" },
    { label: "Webdesign", href: "/webdesign" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["needs", "pitfalls", "approach", "faq", "pricing"],
};

export const Route = createFileRoute("/website-laten-maken-loodgieter")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je loodgieter | AIMI" },
      { name: "description", content: "Snelle website voor je loodgietersbedrijf met telefoonnummer voorop, spoedmelding bovenaan en razendsnelle mobiele laadtijd." },
      { property: "og:title", content: "Website laten maken voor je loodgieter | AIMI" },
      { property: "og:description", content: "Webdesign voor loodgietersbedrijven, gebouwd voor snelheid en spoedcontact op mobiel." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je loodgieter | AIMI" },
      { name: "twitter:description", content: "Webdesign voor loodgietersbedrijven, gebouwd voor snelheid en spoedcontact op mobiel." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je loodgietersbedrijf",
          serviceType: "Webdesign",
          description: "Snelle websites op maat voor loodgietersbedrijven, met nadruk op spoedcontact, telefoonnummer en eigen hosting.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([["Home", "/"], ["Branches", "/branches"], ["Website laten maken voor je loodgieter", "/website-laten-maken-loodgieter"]]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
