import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-hovenier`;

const data: BranchPageData = {
  branch: "hoveniersbedrijf",
  h1: "Een website die je hovenierswerk laat spreken",
  kicker: "Webdesign voor hoveniers",
  intro:
    "Een hoveniersbedrijf verkoopt vooral op basis van wat klanten kunnen zien: aangelegde tuinen, strak onderhoud, vakwerk in bestrating en beplanting. Een website voor je hoveniersbedrijf moet dat werk goed laten zien en het makkelijk maken om een offerte aan te vragen, zonder dat bezoekers eerst hoeven te bellen.",
  needsHeading: "Wat een hovenierswebsite moet kunnen",
  needsBody: [
    "Bij het laten maken van een website voor je hoveniersbedrijf draait alles om beeld en overzicht. Een galerij met voor- en na-foto's van aangelegde tuinen laat in één oogopslag zien wat je kunt, veel directer dan een lap tekst. Wij bouwen die galerij zo dat foto's snel laden, ook op mobiel, en dat je ze zelf via het klantenportaal kunt aanvullen als er weer een project klaar is.",
    "Daarnaast maken we onderscheid tussen aanleg en onderhoud, want dat zijn voor veel hoveniersbedrijven twee verschillende diensten met een ander soort klant. Iemand die een nieuwe tuin wil laten aanleggen zoekt anders dan iemand die op zoek is naar een vaste hovenier voor maandelijks onderhoud. Door die twee duidelijk te scheiden op de website, met eigen tekst en eigen offerteknop, voorkom je dat bezoekers het verkeerde beeld krijgen van wat je aanbiedt.",
    "Een offerteformulier dat overzichtelijk is en niet te veel vraagt, werkt beter dan alleen een telefoonnummer. Mensen die 's avonds op de bank aan het oriënteren zijn, vullen liever rustig een formulier in dan dat ze overdag moeten bellen. We zorgen dat het formulier duidelijk vraagt om het type werk, een indicatie van de tuin en eventueel een foto, zodat jij met een compleet beeld reageert.",
  ],
  pitfallsHeading: "Veelgemaakte fouten bij een website voor een hoveniersbedrijf",
  pitfallsBody: [
    "Een website die alleen bestaat uit een paar losse foto's zonder duidelijke indeling, laat bezoekers zelf uitzoeken wat ze bij je kunnen halen. Dat kost aanvragen: mensen die niet meteen snappen of jij ook kleinere klussen doet naast grote aanleg, haken af en zoeken verder. Structuur in wat je aanbiedt is minstens zo belangrijk als de foto's zelf.",
    "Ook zien we vaak sites die niet aangeven in welk gebied een hoveniersbedrijf werkt. Dat hoeft geen lange lijst met plaatsnamen te zijn, maar een bezoeker wil wel snel weten of jij bij hem in de buurt komt, voordat hij tijd steekt in een offerteaanvraag. Wij maken dat functioneel duidelijk, zonder dat de tekst een opsomming van dorpen wordt.",
    "Een derde valkuil is een website die niet meebeweegt met de seizoenen. Voorjaar en najaar zijn voor veel hoveniers drukke periodes met andere vragen dan in de winter. Een website die het hele jaar door precies dezelfde tekst toont, mist de kans om op het juiste moment de juiste dienst onder de aandacht te brengen.",
  ],
  approachHeading: "Zo pakken we het aan",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken welk deel van je hoveniersbedrijf het meeste aandacht verdient: aanleg, onderhoud, of allebei, en wat voor soort klanten je wilt aantrekken." },
    { title: "Structuur en foto's", desc: "We bepalen samen welke projecten en foto's het beste laten zien wat je kunt, en bouwen een indeling die aanleg en onderhoud helder scheidt." },
    { title: "Techniek en snelheid", desc: "De site wordt gebouwd op eigen techniek, met aandacht voor snelle laadtijden van fotogalerijen, ook op een mobiele verbinding buiten." },
    { title: "Offerteformulier", desc: "We richten een offerteformulier in dat compact genoeg is om ingevuld te worden, maar compleet genoeg om er direct mee te kunnen reageren." },
    { title: "Livegang en beheer", desc: "Na livegang host je de website bij AIMI met servermonitoring, en via het klantenportaal kun je zelf nieuwe projectfoto's en teksten laten aanpassen." },
  ],
  pricingHeading: "Wat kost een website voor een hoveniersbedrijf",
  pricingBody: [
    "De prijs van een hovenierswebsite hangt af van de omvang: een eenvoudige site met een projectgalerij en offerteformulier vraagt minder werk dan een uitgebreide site met aparte pagina's voor aanleg, onderhoud en losse diensten. Via het offerteformulier op onze site vertel je kort wat je nodig hebt, waarna we een reactie geven die aansluit op de daadwerkelijke omvang van het project.",
    "Onze tarieven staan overzichtelijk op de pricing-pagina als startpunt. Voor de meeste hoveniersbedrijven is een site met een aantal vaste pagina's, een projectgalerij en een offerteformulier voldoende; wie meerdere specialismen apart wil uitlichten of een uitgebreidere fotobibliotheek wil, kiest vaak voor een groter pakket. We bespreken dat altijd vooraf, zodat er geen verrassingen zijn.",
  ],
  faqs: [
    { q: "Kan ik zelf nieuwe projectfoto's toevoegen na livegang?", a: "Ja, via het klantenportaal kun je aanvragen indienen om foto's van nieuwe projecten toe te voegen aan je galerij, zonder dat je zelf hoeft te programmeren." },
    { q: "Kan de website onderscheid maken tussen aanleg en onderhoud?", a: "Ja, we richten dat standaard als aparte onderdelen in, met eigen tekst en een eigen offertepad, zodat bezoekers meteen snappen wat ze bij je kunnen halen." },
    { q: "Werkt de offerteaanvraag ook met foto's van de tuin?", a: "Dat kunnen we inbouwen: bezoekers kunnen dan een foto van hun tuin meesturen, zodat jij met meer context kunt reageren op een aanvraag." },
    { q: "Hoeveel kost een website voor mijn hoveniersbedrijf?", a: "Dat hangt af van de omvang van het project. Vraag via het offerteformulier een vrijblijvende inschatting aan, of bekijk onze tarievenpagina als startpunt." },
    { q: "Werken jullie alleen in één regio?", a: "We werken voor hoveniersbedrijven in Noord-Nederland, maar de website zelf richten we in op het werkgebied dat voor jouw bedrijf klopt." },
    { q: "Wordt de site ook gevonden op zoektermen als 'hovenier website laten maken'?", a: "We leggen een technisch gezonde basis neer (snelheid, structuur, duidelijke pagina's) waarmee zoekmachines de site goed kunnen doorgronden. Verdere groei in vindbaarheid volgt uit content en tijd." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website laten maken klusbedrijf", href: "/website-laten-maken-klusbedrijf" },
    { label: "Website laten maken schilder", href: "/website-laten-maken-schilder" },
    { label: "Webdesign", href: "/webdesign" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["needs", "approach", "pitfalls", "pricing", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-hovenier")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je hoveniersbedrijf | AIMI" },
      { name: "description", content: "Website voor je hoveniersbedrijf met projectfoto's, offerteaanvraag en duidelijk onderscheid tussen aanleg en onderhoud." },
      { property: "og:title", content: "Website laten maken voor je hoveniersbedrijf | AIMI" },
      { property: "og:description", content: "Webdesign voor hoveniersbedrijven: projectgalerij, offerteformulier en snelle techniek." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je hoveniersbedrijf | AIMI" },
      { name: "twitter:description", content: "Webdesign voor hoveniersbedrijven: projectgalerij, offerteformulier en snelle techniek." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je hoveniersbedrijf",
          serviceType: "Webdesign",
          description: "Websites op maat voor hoveniersbedrijven, met projectgalerij, offerteformulier en eigen hosting.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([["Home", "/"], ["Branches", "/branches"], ["Website laten maken voor je hoveniersbedrijf", "/website-laten-maken-hovenier"]]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
