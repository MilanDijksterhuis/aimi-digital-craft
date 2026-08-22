import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-bloemist`;

const data: BranchPageData = {
  branch: "bloemenwinkel",
  h1: "Een website voor je bloemenwinkel die ook bestellingen aanneemt",
  kicker: "Webdesign voor bloemisten",
  intro:
    "Een bloemist heeft een website nodig die tegen pieken kan. Het grootste deel van het jaar is het rustig, en dan komen Moederdag, Valentijnsdag en de feestdagen, waarop je in een paar dagen een flink deel van je omzet draait. Daarnaast loopt er het hele jaar door een tweede stroom die weinig met piekdagen te maken heeft: rouwwerk, dat om een heel andere benadering vraagt.",
  needsHeading: "Wat een website voor een bloemenwinkel moet kunnen",
  needsBody: [
    "Bestellen en bezorgen is voor de meeste bloemisten het belangrijkste onderdeel. Mensen willen een boeket kiezen, een bezorgdatum opgeven, een kaartje meesturen en afrekenen. Dat hoeft geen enorme webshop te zijn: een beperkt aantal goede boeketten in een paar prijsklassen werkt in de praktijk beter dan honderd varianten, omdat kiezen dan makkelijk blijft. Belangrijk is dat je zelf kunt aangeven welke bezorgdagen nog beschikbaar zijn.",
    "Rouwwerk verdient een eigen, rustige plek op de site. Iemand die bloemen voor een uitvaart bestelt, staat onder tijdsdruk en emotie en heeft geen behoefte aan vrolijke aanbiedingen. Die pagina moet duidelijk maken hoe snel je kunt leveren, of je rechtstreeks naar het uitvaartcentrum bezorgt en hoe iemand een persoonlijke tekst doorgeeft. In toon en vormgeving hoort dat los te staan van de rest.",
    "Voor de piekdagen is beschikbaarheid het hele verhaal. Rond Moederdag zit je bezorgcapaciteit op een gegeven moment vol, en dan moet de site dat gewoon zeggen in plaats van bestellingen te blijven aannemen die je niet kunt waarmaken. We bouwen daarom in dat je per dag kunt sluiten of een maximum kunt instellen, zodat je piek beheersbaar blijft.",
  ],
  pitfallsHeading: "Wat er misgaat bij websites van bloemisten",
  pitfallsBody: [
    "De klassieke fout is een webshop die veel te veel producten toont. Bloemen zijn seizoensgebonden en je aanbod verandert per week; een catalogus met tachtig boeketten kun je onmogelijk actueel houden. Het resultaat is een shop vol dingen die je niet meer maakt, en dat levert teleurgestelde klanten op. Beperkt aanbod met een duidelijke prijsklasse werkt beter en is bij te houden.",
    "Ten tweede: bestellingen aannemen zonder grip op je capaciteit. Als je site op de vrijdag voor Moederdag nog vrolijk bezorging voor zaterdag verkoopt terwijl je bus al vol zit, koop je een probleem. Dat is geen ontwerpkwestie maar een instelling die er gewoon in hoort te zitten.",
    "Een derde punt is dat het bezorggebied vaak onduidelijk is. Bloemen bezorgen kost tijd en brandstof, en niet elke bloemist rijdt dertig kilometer. Als bezoekers pas bij het afrekenen ontdekken dat je hun postcode niet doet, ben je ze kwijt én heb je een vervelend moment gecreëerd. Zet je bezorggebied vooraan.",
  ],
  approachHeading: "Zo pakken we het aan",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken de verhouding tussen winkelverkoop, bezorging en rouwwerk, en hoe groot je piekdagen zijn." },
    { title: "Aanbod afbakenen", desc: "We bepalen een beperkte, goed te onderhouden set boeketten in duidelijke prijsklassen in plaats van een onhoudbare catalogus." },
    { title: "Rouwwerk apart inrichten", desc: "Rouwwerk krijgt een eigen pagina met eigen toon, levertijden en de mogelijkheid een persoonlijke tekst door te geven." },
    { title: "Capaciteit en bezorggebied", desc: "We bouwen in dat je bezorgdagen kunt sluiten of maximeren, en zetten je bezorggebied vooraan in het bestelproces." },
    { title: "Livegang en beheer", desc: "Na livegang beheer je zelf boeketten, prijzen en bezorgdagen; wij verzorgen hosting, back-ups en monitoring." },
  ],
  pricingHeading: "Wat kost een website voor een bloemenwinkel",
  pricingBody: [
    "Wil je alleen gevonden worden met je openingstijden, assortiment en bezorginformatie, dan is een compacte site voldoende en zit je in de buurt van ons Starter- of Pro-pakket. Dat is voor bloemisten die vooral van de winkel en telefonische bestellingen leven een prima startpunt.",
    "Wil je daadwerkelijk online laten bestellen en afrekenen, met bezorgdatum, kaartje en beschikbaarheid per dag, dan is het een webshoptraject. Dat is maatwerk, omdat betalingen, bezorglogica en voorraad meespelen. We bekijken samen wat je nodig hebt en geven daarna een vaste prijs.",
  ],
  faqs: [
    { q: "Heb ik een volledige webshop nodig?", a: "Niet per se. Veel bloemisten draaien prima op een informatieve site met telefonische en WhatsApp-bestellingen. Een webshop loont zodra je structureel online bestellingen wilt binnenhalen, vooral rond de piekdagen." },
    { q: "Kan ik bezorgdagen dichtzetten als ik vol zit?", a: "Ja, en dat is voor bloemisten een van de belangrijkste functies. Je kunt per dag sluiten of een maximum aantal bezorgingen instellen, zodat je rond Moederdag geen bestellingen aanneemt die je niet kunt rijden." },
    { q: "Hoe ga ik om met rouwwerk op mijn site?", a: "Dat verdient een eigen pagina met een rustiger toon, duidelijke levertijden en de mogelijkheid om een persoonlijke tekst en de locatie van de uitvaart door te geven. Het hoort niet tussen de feestdagenaanbiedingen te staan." },
    { q: "Hoeveel boeketten moet ik online zetten?", a: "Minder dan de meeste mensen denken. Een beperkte set in een paar duidelijke prijsklassen is makkelijker te onderhouden, makkelijker te kiezen en voorkomt dat er producten online staan die je niet meer maakt." },
    { q: "Kan ik mijn bezorggebied instellen?", a: "Ja. We zetten je bezorggebied vooraan in het proces, bijvoorbeeld met een postcodecontrole, zodat niemand pas bij het afrekenen ontdekt dat je zijn adres niet bezorgt." },
    { q: "Kan ik zelf seizoensaanbod wisselen?", a: "Ja, via het klantenportaal. Bij bloemen verandert het aanbod continu, dus je moet boeketten en prijzen zelf kunnen aanpassen zonder ons daarvoor nodig te hebben." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Webshop laten maken", href: "/webshop-laten-maken" },
    { label: "Website laten maken restaurant", href: "/website-laten-maken-restaurant" },
    { label: "Tarieven", href: "/tarieven" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["needs", "pitfalls", "approach", "pricing", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-bloemist")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je bloemenwinkel | AIMI" },
      { name: "description", content: "Website of webshop voor je bloemenwinkel: online bestellen met bezorgdatum, een eigen pagina voor rouwwerk en grip op je piekdagen." },
      { property: "og:title", content: "Website laten maken voor je bloemenwinkel | AIMI" },
      { property: "og:description", content: "Webdesign voor bloemisten: bestellen en bezorgen, rouwwerk apart, en beschikbaarheid per dag instelbaar." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je bloemenwinkel | AIMI" },
      { name: "twitter:description", content: "Webdesign voor bloemisten: bestellen en bezorgen, rouwwerk apart, en beschikbaarheid per dag instelbaar." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je bloemenwinkel",
          serviceType: "Webdesign",
          description: "Websites en webshops op maat voor bloemisten, met bezorging, rouwwerk en beschikbaarheid per dag.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([["Home", "/"], ["Branches", "/branches"], ["Website laten maken voor je bloemenwinkel", "/website-laten-maken-bloemist"]]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
