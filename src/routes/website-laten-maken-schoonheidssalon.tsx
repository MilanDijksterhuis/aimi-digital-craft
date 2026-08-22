import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-schoonheidssalon`;

const data: BranchPageData = {
  branch: "schoonheidssalon",
  h1: "Webdesign voor je schoonheidssalon",
  kicker: "Webdesign voor schoonheidssalons",
  intro:
    "Voordat iemand voor het eerst een schoonheidsbehandeling boekt, wil die weten wat er precies gebeurt en bij wie. Daarom bouwt AIMI websites voor schoonheidssalons met een rustige, verzorgde uitstraling, een behandelmenu met uitleg per behandeling en een manier om vooraf intakegegevens door te geven.",
  needsHeading: "Wat een website voor een schoonheidssalon moet kunnen",
  needsBody: [
    "Een behandelmenu met uitleg per behandeling is voor een schoonheidssalon belangrijker dan voor veel andere branches, omdat behandelingen als gezichtsbehandelingen, ontharing of huidverbetering voor een nieuwe klant vaak onbekend terrein zijn. Een korte, heldere uitleg per behandeling, met wat het inhoudt en hoe lang het duurt, neemt onzekerheid weg voordat iemand een afspraak maakt.",
    "Een online intakeformulier hoort daarbij: veel schoonheidssalons werken met een intake voorafgaand aan een eerste behandeling, bijvoorbeeld over huidtype of eerdere behandelingen. Als een klant dat formulier vooraf digitaal kan invullen, bespaart dat tijd tijdens de afspraak zelf en komt de salon voorbereid over.",
    "Cadeaubonnen en herhaalafspraken zijn twee andere onderdelen die specifiek bij deze branche horen. Schoonheidsbehandelingen worden vaak cadeau gedaan, en veel klanten komen periodiek terug voor onderhoud, dus een website die het makkelijk maakt om een volgende afspraak in te plannen sluit aan op hoe een schoonheidssalon daadwerkelijk draait.",
  ],
  pitfallsHeading: "Veelvoorkomende knelpunten bij een website voor je schoonheidssalon",
  pitfallsBody: [
    "Een website die behandelingen alleen met een naam noemt, zonder uitleg, laat een nieuwe klant achter met vragen die de salon niet beantwoordt voordat er contact is geweest. Voor een branche waarin vertrouwen en uitleg vooropstaan, is dat een gemiste kans: juist de uitleg per behandeling overtuigt iemand om de stap te zetten.",
    "Een tweede terugkerend knelpunt is een uitstraling die niet past bij de sfeer van een schoonheidssalon. Een website met drukke kleuren, felle kortingsbanners of een rommelige opbouw werkt averechts in een branche waar rust en verzorging juist de kern zijn van de ervaring die een salon biedt.",
    "Ook het ontbreken van een manier om vooraf intakegegevens door te geven kost tijd tijdens de afspraak zelf, en het niet actief herinneren aan herhaalafspraken laat klanten wegvloeien die eigenlijk periodiek terug zouden willen komen, simpelweg omdat ze het vergeten.",
  ],
  approachHeading: "Zo pakken we het aan",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken welke behandelingen je aanbiedt, of je met een intakeformulier werkt en hoe klanten nu afspraken maken." },
    { title: "Ontwerp met rust en verzorging", desc: "We ontwerpen een pagina met een rustige, verzorgde uitstraling die past bij een schoonheidssalon, zonder drukte of afleiding." },
    { title: "Behandelmenu en intake", desc: "We werken het behandelmenu uit met duidelijke uitleg per behandeling en bouwen een online intakeformulier in." },
    { title: "Boeken, cadeaubonnen en herhaalafspraken", desc: "We richten online boeken in en denken mee over cadeaubonnen en een eenvoudige manier om herhaalafspraken te maken." },
    { title: "Livegang en beheer", desc: "Na livegang host je de website bij AIMI met servermonitoring, en beheer je aanpassingen via het klantenportaal." },
  ],
  pricingHeading: "Wat kost een website voor een schoonheidssalon",
  pricingBody: [
    "De prijs van een website voor een schoonheidssalon hangt af van de omvang van het behandelmenu, of er een intakeformulier en boekingssysteem gekoppeld moeten worden, en hoeveel pagina's er nodig zijn om alle behandelingen goed uit te leggen. Een salon met een uitgebreid aanbod vraagt meer content en structuur dan een salon met een compact menu.",
    "Bekijk de knop 'Bekijk tarieven' hierboven voor onze actuele bedragen. Tijdens de kennismaking bepalen we samen welke onderdelen jouw schoonheidssalon nodig heeft, zodat de offerte precies aansluit op je behandelmenu en werkwijze.",
  ],
  faqs: [
    { q: "Kan ik een intakeformulier op mijn website laten zetten?", a: "Ja, we bouwen een online intakeformulier waarmee klanten vooraf gegevens kunnen invullen, zodat je voorbereid aan een eerste behandeling begint." },
    { q: "Kan de website mensen herinneren aan een herhaalafspraak?", a: "Via een gekoppeld boekingssysteem kunnen klanten eenvoudig een vervolgafspraak inplannen; we denken mee over de beste opzet daarvoor bij jouw salon." },
    { q: "Kan ik cadeaubonnen verkopen via de website?", a: "We denken mee over een werkwijze voor cadeaubonnen die past bij jouw salon en eventueel bij het boekingssysteem dat je gebruikt." },
    { q: "Kan elke behandeling een eigen uitleg krijgen op de website?", a: "Ja, we werken het behandelmenu uit met een korte, heldere uitleg per behandeling, zodat nieuwe klanten weten wat ze kunnen verwachten." },
    { q: "Past de uitstraling van de website bij mijn salon?", a: "We ontwerpen op maat, met een rustige en verzorgde uitstraling die aansluit bij hoe jouw schoonheidssalon zich wil presenteren, zonder standaardsjabloon." },
    { q: "Wat kost een website voor een schoonheidssalon laten maken?", a: "Dat hangt af van de omvang van het behandelmenu en de gewenste functionaliteit. Bekijk de tarievenpagina of vraag een offerte aan voor een indicatie." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website voor je kapsalon", href: "/website-laten-maken-kapsalon" },
    { label: "Website voor je pedicurepraktijk", href: "/website-laten-maken-pedicure" },
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["needs", "approach", "faq", "pitfalls", "pricing"],
};

export const Route = createFileRoute("/website-laten-maken-schoonheidssalon")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je schoonheidssalon | AIMI" },
      {
        name: "description",
        content: "Rustige, verzorgde website voor je schoonheidssalon met behandelmenu, intakeformulier en cadeaubonnen. Gebouwd door AIMI.",
      },
      { property: "og:title", content: "Website laten maken voor je schoonheidssalon | AIMI" },
      { property: "og:description", content: "Behandelmenu met uitleg, intake vooraf en eenvoudig herhaalafspraken maken." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je schoonheidssalon | AIMI" },
      { name: "twitter:description", content: "Behandelmenu met uitleg, intake vooraf en eenvoudig herhaalafspraken maken." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je schoonheidssalon",
          serviceType: "Webdesign voor schoonheidssalons",
          description: "Websites op maat voor schoonheidssalons, met behandelmenu, intakeformulier en boekingsmogelijkheden, gebouwd en gehost door AIMI.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Branches", "/branches"],
        ["Website laten maken voor je schoonheidssalon", "/website-laten-maken-schoonheidssalon"],
      ]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
