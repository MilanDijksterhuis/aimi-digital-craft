import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-kapsalon`;

const data: BranchPageData = {
  branch: "kapsalon",
  kicker: "Webdesign voor kapsalons",
  intro:
    "Een kapsalon leeft van boekingen die makkelijk binnenkomen en van klanten die op basis van foto's en prijzen al een keuze maken voordat ze bellen. AIMI bouwt websites voor kapsalons die dat proces soepel laten verlopen, met online afspraken, een duidelijke prijslijst en een uitstraling die past bij je stijl.",
  needsHeading: "Wat een website voor een kapsalon moet kunnen",
  needsBody: [
    "Bij het laten maken van een website voor een kapsalon draait het niet om zoveel mogelijk pagina's, maar om een paar onderdelen die goed werken. Online een afspraak kunnen maken is daarbij het belangrijkste: klanten willen niet bellen tijdens werktijd om te horen of er nog plek is, ze willen zelf een tijdstip kiezen op het moment dat het hen uitkomt, ook 's avonds. Een website voor je kapsalon die dat mogelijk maakt, haalt drempels weg die anders leiden tot een gemiste boeking.",
    "Daarnaast is een heldere prijslijst per behandeling essentieel. Klanten willen vooraf weten wat een knipbeurt, kleuring of coupe soleil ongeveer kost, zonder daarvoor te hoeven bellen. Een overzichtelijke prijslijst voorkomt onduidelijkheid aan de balie en scheelt tijd voor je team.",
    "Een pagina met je stylisten, hun specialisaties en foto's van eigen werk geeft een nieuwe klant vertrouwen: die ziet wie er straks de schaar hanteert en welk soort werk de salon aflevert. Ook openingstijden die meteen zichtbaar zijn, zonder dat een bezoeker daarvoor hoeft te zoeken, horen bij een functionele website voor een kapsalon.",
  ],
  pitfallsHeading: "Veelvoorkomende knelpunten bij een website voor je kapsalon",
  pitfallsBody: [
    "Een website voor een kapsalon die alleen een telefoonnummer toont en verder weinig informatie geeft, jaagt bezoekers naar de concurrent die wel online laat zien wat een behandeling kost en hoe de salon eruitziet. Ontbrekende of verouderde openingstijden zijn een ander terugkerend probleem: niets is vervelender dan voor een dichte deur staan omdat de website nog de tijden van vorig jaar toont.",
    "No-shows zijn voor kapsalons een reëel verlies aan omzet. Een online boekingssysteem met automatische bevestiging en herinnering per e-mail of sms voorkomt een deel daarvan, simpelweg omdat de klant tijdig wordt herinnerd aan de afspraak. Dat is geen extra franje, maar een onderdeel dat we standaard meenemen als een kapsalon kiest voor online afspraken maken via de website.",
    "Ook een langzame website is een probleem specifiek voor kapsalons: veel salons willen graag foto's van geknipt of gekleurd haar tonen, maar onbewerkte, zware afbeeldingen maken een site traag op mobiel, terwijl juist mobiele bezoekers vaak snel willen boeken tussen twee dingen door.",
  ],
  approachHeading: "Zo pakken we het aan",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken hoeveel stylisten er zijn, of je al een boekingssysteem gebruikt en welke behandelingen en prijzen er getoond moeten worden." },
    { title: "Ontwerp op maat", desc: "We ontwerpen een pagina die past bij de sfeer van je salon, met ruimte voor foto's van eigen werk in plaats van generieke stockbeelden." },
    { title: "Techniek en snelheid", desc: "Afbeeldingen worden geoptimaliseerd zodat de website ook met veel foto's snel blijft laden, juist belangrijk op mobiel." },
    { title: "Koppeling boekingssysteem", desc: "Als je al een boekingssysteem gebruikt, koppelen we dat aan de website; gebruik je nog niets, dan denken we mee over een passende oplossing." },
    { title: "Livegang en beheer", desc: "Na livegang host je de website bij AIMI met servermonitoring, en via het klantenportaal kun je aanvragen voor aanpassingen indienen." },
  ],
  pricingHeading: "Wat kost een website voor een kapsalon",
  pricingBody: [
    "De uiteindelijke prijs voor een website voor je kapsalon hangt af van de scope: een eenvoudige site met prijslijst, team en contactgegevens is minder omvangrijk dan een site met een gekoppeld boekingssysteem, meertalige content of een uitgebreide portfolio-pagina per stylist. Ook het aantal pagina's en of er al bruikbare foto's zijn, of dat er nog fotografie nodig is, speelt mee.",
    "Onze tarieven staan overzichtelijk op de website; bekijk de knop 'Bekijk tarieven' hierboven voor de actuele bedragen. In een kennismakingsgesprek bepalen we samen welke onderdelen nodig zijn voor jouw salon, zodat de offerte aansluit op wat je echt gebruikt in plaats van op een standaardpakket.",
  ],
  faqs: [
    { q: "Kan ik klanten online laten boeken via de website?", a: "Ja, we koppelen een boekingssysteem aan je website of adviseren een passende oplossing als je er nog geen hebt, zodat klanten zelf een tijdstip kunnen kiezen." },
    { q: "Kan de website no-shows helpen verminderen?", a: "Een online boekingssysteem met automatische bevestiging en herinnering vooraf helpt klanten hun afspraak niet te vergeten, wat het aantal no-shows kan terugdringen." },
    { q: "Kan ik zelf mijn prijslijst aanpassen?", a: "Via het klantenportaal kun je aanpassingen aan prijzen en teksten aanvragen, zonder dat je zelf hoeft te programmeren." },
    { q: "Werken jullie ook met salons buiten de grote steden?", a: "We werken voor kapsalons in heel Noord-Nederland, van kleine dorpssalons tot salons met meerdere stylisten." },
    { q: "Kan ik foto's van geknipt en gekleurd haar toevoegen zonder dat de site traag wordt?", a: "We optimaliseren alle afbeeldingen bij oplevering, zodat een pagina vol foto's toch snel blijft laden, ook op mobiel." },
    { q: "Wat kost een website voor een kapsalon laten maken?", a: "Dat hangt af van de gewenste functionaliteit, zoals wel of geen boekingssysteem en het aantal pagina's. Bekijk de tarievenpagina voor een indicatie of vraag een offerte aan." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website voor je nagelstudio", href: "/website-laten-maken-nagelstudio" },
    { label: "Website voor je schoonheidssalon", href: "/website-laten-maken-schoonheidssalon" },
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["needs", "approach", "pitfalls", "pricing", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-kapsalon")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je kapsalon | AIMI" },
      {
        name: "description",
        content: "Website voor je kapsalon met online afspraken, prijslijst en teamfoto's. AIMI bouwt en host snelle websites voor kappers in Noord-Nederland.",
      },
      { property: "og:title", content: "Website laten maken voor je kapsalon | AIMI" },
      { property: "og:description", content: "Online boeken, prijslijst en foto's van je werk: een website die aansluit op hoe een kapsalon werkt." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je kapsalon | AIMI" },
      { name: "twitter:description", content: "Online boeken, prijslijst en foto's van je werk: een website die aansluit op hoe een kapsalon werkt." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je kapsalon",
          serviceType: "Webdesign voor kapsalons",
          description: "Websites op maat voor kapsalons, met online afspraken, prijslijst en portfolio, gebouwd en gehost door AIMI.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Branches", "/branches"],
        ["Website laten maken voor je kapsalon", "/website-laten-maken-kapsalon"],
      ]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
