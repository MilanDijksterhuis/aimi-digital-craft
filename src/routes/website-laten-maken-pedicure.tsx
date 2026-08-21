import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-pedicure`;

const data: BranchPageData = {
  branch: "pedicurepraktijk",
  kicker: "Webdesign voor pedicurepraktijken",
  intro:
    "We spreken hier bewust van een pedicurepraktijk in plaats van pedicure, omdat dat laatste woord zowel de behandelaar als de behandeling kan betekenen. AIMI bouwt websites voor pedicurepraktijken die vertrouwen wekken bij een vaak oudere doelgroep, met grote leesbare tekst en eenvoudig afspraken maken.",
  needsHeading: "Wat een website voor een pedicurepraktijk moet kunnen",
  needsBody: [
    "Een pedicurepraktijk bedient vaak twee soorten klanten: mensen die voor regulier voetonderhoud komen, en mensen die medisch pedicure nodig hebben, bijvoorbeeld bij diabetes of reuma. Een website moet dat onderscheid duidelijk maken, zodat een bezoeker meteen ziet welke behandeling bij zijn of haar situatie past, in plaats van dat verschil pas telefonisch te ontdekken.",
    "Bij medisch pedicure speelt vaak ook vergoeding via de zorgverzekeraar mee, net als registratie in het kwaliteitsregister. Als dat van toepassing is, hoort die informatie duidelijk op de website te staan, zodat een klant vooraf weet of een behandeling (deels) vergoed kan worden en dat de praktijk aan de juiste eisen voldoet.",
    "Omdat de doelgroep van een pedicurepraktijk gemiddeld ouder is dan bij veel andere branches, is leesbaarheid extra belangrijk: grote, duidelijke tekst, voldoende contrast en een eenvoudige manier om een afspraak te maken, zonder ingewikkelde stappen of kleine knoppen. Een vertrouwenwekkende, rustige toon past daarbij beter dan een drukke of verkoperige uitstraling.",
  ],
  pitfallsHeading: "Veelvoorkomende knelpunten bij een website voor je pedicurepraktijk",
  pitfallsBody: [
    "Een website die regulier en medisch pedicure niet uit elkaar houdt, laat klanten met vragen zitten over waar ze precies voor moeten kiezen en of hun behandeling vergoed kan worden. Dat onderscheid ontbreekt regelmatig, terwijl het voor deze branche een van de eerste dingen is die een bezoeker wil weten.",
    "Kleine tekst, lage contrastwaarden of een ingewikkeld afsprakenformulier vormen een drempel voor een doelgroep die vaker moeite heeft met kleine letters of onduidelijke navigatie op een telefoon. Een website die daar geen rekening mee houdt, verliest juist de klanten die de praktijk het hardst nodig heeft.",
    "Ook het ontbreken van informatie over registratie en vergoeding is een gemiste kans: voor medisch pedicure is dat vaak precies de vraag waarmee iemand op zoek gaat, en als een website daar geen antwoord op geeft, zoekt de bezoeker verder bij een andere praktijk die dat wel duidelijk vermeldt.",
  ],
  approachHeading: "Zo pakken we het aan",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken of je regulier en/of medisch pedicure aanbiedt, of je geregistreerd bent en hoe klanten nu een afspraak maken." },
    { title: "Ontwerp voor leesbaarheid", desc: "We ontwerpen met grote, leesbare tekst en voldoende contrast, passend bij een doelgroep die vaak wat ouder is." },
    { title: "Onderscheid en informatie", desc: "We maken het verschil tussen regulier en medisch pedicure duidelijk, inclusief informatie over registratie en vergoeding waar van toepassing." },
    { title: "Eenvoudig een afspraak maken", desc: "We houden het afsprakenformulier of de boekingsknop simpel, met zo min mogelijk stappen." },
    { title: "Livegang en beheer", desc: "Zodra de site live staat, draait hij op onze eigen, gemonitorde hosting. Wijzigingen vraag je eenvoudig aan via het klantenportaal." },
  ],
  pricingHeading: "Wat kost een website voor een pedicurepraktijk",
  pricingBody: [
    "De prijs van een website voor een pedicurepraktijk hangt onder meer af van of je alleen regulier pedicure aanbiedt of ook medisch pedicure met bijbehorende informatie over registratie en vergoeding, en van het aantal pagina's dat nodig is om dat helder uit te leggen. Een eenvoudige site met contactgegevens en afspraakmogelijkheid vraagt minder werk dan een site die ook uitgebreid ingaat op medische indicaties.",
    "Bekijk de knop 'Bekijk tarieven' hierboven voor onze actuele bedragen. In een kennismakingsgesprek bepalen we samen welke onderdelen jouw praktijk nodig heeft, zodat de offerte aansluit op je daadwerkelijke aanbod.",
  ],
  faqs: [
    { q: "Kan de website duidelijk maken welke behandeling vergoed kan worden?", a: "Ja, we nemen informatie over registratie en vergoeding voor medisch pedicure duidelijk op, zodat een klant vooraf weet waar hij of zij aan toe is." },
    { q: "Is de website ook prettig te gebruiken voor oudere klanten?", a: "We ontwerpen met grote, leesbare tekst en voldoende contrast, en houden het afspraken maken eenvoudig, met de doelgroep van een pedicurepraktijk in gedachten." },
    { q: "Wat is het verschil tussen pedicure als behandeling en een pedicurepraktijk als bedrijf op de website?", a: "We gebruiken bewust de term pedicurepraktijk om verwarring te voorkomen tussen de behandelaar, de behandeling en de praktijk zelf, zodat de website eenduidig is." },
    { q: "Kan ik zowel regulier als medisch pedicure op één website tonen?", a: "Ja, we maken het onderscheid tussen beide duidelijk zichtbaar, zodat een bezoeker meteen ziet welke behandeling bij zijn of haar situatie past." },
    { q: "Kan ik afspraken eenvoudig laten binnenkomen zonder ingewikkeld systeem?", a: "We houden het afsprakenformulier of de boekingsknop bewust simpel, met zo min mogelijk stappen, passend bij een brede doelgroep." },
    { q: "Wat kost een website voor een pedicurepraktijk laten maken?", a: "Dat hangt af van de gewenste functionaliteit en het aantal pagina's. Bekijk de tarievenpagina of vraag een offerte aan voor een indicatie." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website voor je schoonheidssalon", href: "/website-laten-maken-schoonheidssalon" },
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken", href: "/website-laten-maken" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["needs", "pitfalls", "faq", "approach", "pricing"],
};

export const Route = createFileRoute("/website-laten-maken-pedicure")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je pedicurepraktijk | AIMI" },
      {
        name: "description",
        content: "Vertrouwenwekkende, leesbare website voor je pedicurepraktijk, met onderscheid tussen regulier en medisch pedicure. AIMI bouwt en host.",
      },
      { property: "og:title", content: "Website laten maken voor je pedicurepraktijk | AIMI" },
      { property: "og:description", content: "Duidelijk, leesbaar en eenvoudig een afspraak maken, met aandacht voor medisch pedicure en vergoeding." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je pedicurepraktijk | AIMI" },
      { name: "twitter:description", content: "Duidelijk, leesbaar en eenvoudig een afspraak maken, met aandacht voor medisch pedicure en vergoeding." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je pedicurepraktijk",
          serviceType: "Webdesign voor pedicurepraktijken",
          description: "Websites op maat voor pedicurepraktijken, met onderscheid tussen regulier en medisch pedicure, gebouwd en gehost door AIMI.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Branches", "/branches"],
        ["Website laten maken voor je pedicurepraktijk", "/website-laten-maken-pedicure"],
      ]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
