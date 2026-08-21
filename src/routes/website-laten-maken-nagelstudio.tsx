import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-nagelstudio`;

const data: BranchPageData = {
  branch: "nagelstudio",
  kicker: "Webdesign voor nagelstudio's",
  intro:
    "Bij een nagelstudio verkoopt de website vooral via beeld: klanten kiezen een stijl op basis van foto's van nailart voordat ze een afspraak maken. AIMI bouwt websites voor nagelstudio's waarin dat portfolio centraal staat, zonder dat de site daardoor traag wordt, met online boeken en heldere prijzen erbij.",
  needsHeading: "Wat een website voor een nagelstudio moet kunnen",
  needsBody: [
    "Het portfolio is bij een nagelstudio het hart van de website. Klanten bladeren liever eerst door foto's van eerder werk dan dat ze blind een afspraak boeken, dus een overzichtelijke, visuele galerij van nailart is geen bijzaak maar de kern van een website voor een nagelstudio. Dat portfolio moet gemakkelijk te doorbladeren zijn, zonder dat elke pagina lang moet laden voordat de foto's zichtbaar worden.",
    "Naast het portfolio is het belangrijk dat behandelingen overzichtelijk staan met duur en prijs erbij: een gelakt of gel-set, met of zonder nailart, kost andere tijd en een ander bedrag, en die informatie hoort direct zichtbaar te zijn zodat een klant vooraf weet waar ze aan toe is. Online kunnen boeken hoort daarbij, zodat een klant zelf een tijdstip en behandeling kan kiezen zonder te bellen.",
    "Cadeaubonnen zijn voor nagelstudio's een terugkerende wens: klanten willen een behandeling cadeau kunnen doen aan iemand anders, en een website die dat mogelijk maakt of in elk geval duidelijk aangeeft hoe dat werkt, sluit aan op een reële vraag in deze branche.",
  ],
  pitfallsHeading: "Veelvoorkomende knelpunten bij een website voor je nagelstudio",
  pitfallsBody: [
    "Het grootste risico bij een nagelstudio-website is de spanning tussen veel beeld en snelheid: onbewerkte, zware foto's van nailart maken een site traag, terwijl juist deze branche leeft van visueel aantrekkelijke foto's. Een website die daardoor langzaam laadt op mobiel, verliest bezoekers voordat het portfolio goed te zien is, ook al is het werk zelf van hoog niveau.",
    "Een ander terugkerend knelpunt is een prijslijst die ontbreekt of onduidelijk is. Als behandelingen, duur en prijs niet overzichtelijk staan, blijft een klant twijfelen of belt ze alsnog, terwijl het doel van de website juist is dat drempel weg te nemen.",
    "Ook het ontbreken van een simpele manier om online te boeken is een gemiste kans: veel klanten van nagelstudio's boeken 's avonds of tussendoor via hun telefoon, en als dat alleen via een telefoontje tijdens werktijd kan, loop je die boekingen mis.",
  ],
  approachHeading: "Zo pakken we het aan",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken hoeveel foto's er zijn van eerder werk, welke behandelingen je aanbiedt en of er al een boekingssysteem in gebruik is." },
    { title: "Ontwerp rond het portfolio", desc: "We ontwerpen de website zodat het portfolio met nailart de aandacht krijgt, met een indeling die makkelijk te doorbladeren is." },
    { title: "Snelheid ondanks veel beeld", desc: "Alle foto's worden geoptimaliseerd en op de juiste manier geladen, zodat de site ook met een uitgebreid portfolio snel blijft." },
    { title: "Boeken en cadeaubonnen", desc: "We koppelen een boekingssysteem en denken mee over een werkwijze voor cadeaubonnen, passend bij je huidige aanpak." },
    { title: "Livegang en beheer", desc: "Na livegang host je de website bij AIMI met servermonitoring, en kun je via het klantenportaal aanpassingen aanvragen." },
  ],
  pricingHeading: "Wat kost een website voor een nagelstudio",
  pricingBody: [
    "De prijs van een website voor een nagelstudio hangt samen met de gewenste opzet: een compacte site met portfolio, prijslijst en contactgegevens vraagt minder werk dan een site met online boeken, cadeaubonnen en uitgebreide categorieën binnen het portfolio. Ook het aantal foto's dat verwerkt moet worden en of er al een boekingssysteem is, spelen mee in de scope.",
    "Bekijk de knop 'Bekijk tarieven' hierboven voor onze actuele bedragen. In een kort kennismakingsgesprek kijken we samen welke onderdelen voor jouw nagelstudio nodig zijn, zodat je een offerte krijgt die aansluit op wat je website daadwerkelijk moet doen.",
  ],
  faqs: [
    { q: "Kan mijn website veel foto's van nailart tonen zonder traag te worden?", a: "Ja, we optimaliseren alle afbeeldingen bij oplevering, zodat een uitgebreid portfolio toch snel blijft laden, ook op mobiel." },
    { q: "Kan ik cadeaubonnen aanbieden via de website?", a: "We denken mee over een werkwijze voor cadeaubonnen die past bij jouw studio, van een simpele aanvraagpagina tot een koppeling met een boekingssysteem dat dit ondersteunt." },
    { q: "Kunnen klanten zelf een behandeling met duur en prijs kiezen bij het boeken?", a: "Ja, we koppelen een boekingssysteem waarin behandelingen met hun duur en prijs overzichtelijk staan, zodat een klant vooraf weet wat ze kiest." },
    { q: "Hoeveel foto's kan ik in mijn portfolio zetten?", a: "Er is geen harde limiet; we richten de galerij zo in dat ook een groot portfolio overzichtelijk en snel blijft, bijvoorbeeld met categorieën per stijl." },
    { q: "Werken jullie alleen met nagelstudio's in de grote steden?", a: "We werken voor nagelstudio's in heel Noord-Nederland, ongeacht de grootte van de studio." },
    { q: "Wat kost een website voor een nagelstudio laten maken?", a: "Dat is afhankelijk van de gewenste functionaliteit, zoals online boeken en het aantal foto's. Bekijk de tarievenpagina of vraag een offerte aan voor een indicatie." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website voor je kapsalon", href: "/website-laten-maken-kapsalon" },
    { label: "Website voor je schoonheidssalon", href: "/website-laten-maken-schoonheidssalon" },
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken", href: "/website-laten-maken" },
  ],
  sectionOrder: ["needs", "pitfalls", "approach", "faq", "pricing"],
};

export const Route = createFileRoute("/website-laten-maken-nagelstudio")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je nagelstudio | AIMI" },
      {
        name: "description",
        content: "Snelle website voor je nagelstudio met een visueel portfolio, online boeken en prijzen per behandeling. Gebouwd en gehost door AIMI.",
      },
      { property: "og:title", content: "Website laten maken voor je nagelstudio | AIMI" },
      { property: "og:description", content: "Portfolio van je nailart, snel op mobiel, met online boeken en cadeaubonnen." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je nagelstudio | AIMI" },
      { name: "twitter:description", content: "Portfolio van je nailart, snel op mobiel, met online boeken en cadeaubonnen." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je nagelstudio",
          serviceType: "Webdesign voor nagelstudio's",
          description: "Websites op maat voor nagelstudio's, met visueel portfolio, online boeken en cadeaubonnen, gebouwd en gehost door AIMI.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Branches", "/branches"],
        ["Website laten maken voor je nagelstudio", "/website-laten-maken-nagelstudio"],
      ]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
