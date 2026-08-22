import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed} from "@/lib/seo";

const CITY = "Stadskanaal";
const URL = `${SITE_URL}/website-laten-maken-stadskanaal`;

const data: LocationPageData = {
  city: CITY,
  h1: "Website laten maken in Stadskanaal",
  region: "Groningen",
  kicker: "Webdesign Stadskanaal",
  intro:
    "Een webdesigner in Stadskanaal nodig die verder kijkt dan een mooi sjabloon? AIMI bouwt snelle, professionele websites voor ondernemers in Stadskanaal en de wijde omgeving, met eigen techniek, eigen hosting en korte lijnen tussen ontwerp en beheer.",
  contextHeading: `Website laten maken in Stadskanaal: waarom lokaal maatwerk telt`,
  contextBody: [
    "Stadskanaal vervult van oudsher een centrumfunctie voor een groot deel van Oost-Groningen. Inwoners uit de omliggende dorpen komen er winkelen, werken en zaken doen, en dat maakt de lokale detailhandel en dienstverlening tot de ruggengraat van de plaatselijke economie. Voor een winkel, praktijk of dienstverlener in Stadskanaal betekent dit dat een website niet alleen bezoekers uit het dorp zelf moet trekken, maar ook uit een breder verzorgingsgebied. Een goed vindbare, snel ladende website is daarbij geen luxe maar een basisvoorwaarde: wie zoekt op webdesign Stadskanaal of webdesigner Stadskanaal verwacht direct een relevant, lokaal antwoord te vinden.",
    "Veel bedrijven in Stadskanaal zijn familiebedrijven die al generaties meegaan. Die opbouw van vertrouwen, persoonlijk contact en betrouwbaarheid is precies wat een website moet uitstralen. AIMI ontwerpt daarom geen anonieme sjabloonsites, maar websites die de toon en werkwijze van het bedrijf weerspiegelen: duidelijke informatie, een heldere navigatie en een technische basis die op lange termijn meegaat. Een website voor een bedrijf in Stadskanaal moet bovendien goed werken op mobiel, want een groeiend deel van de bezoekers zoekt onderweg of vanaf de bank naar een winkel, dienst of afspraak in de buurt.",
  ],
  businessTypesHeading: "Voor wie bouwen we in Stadskanaal",
  businessTypesBody:
    "AIMI werkt voor winkeliers, dienstverleners, ambachtsbedrijven en familiebedrijven in Stadskanaal die hun online aanwezigheid serieus willen aanpakken. Denk aan een webshop naast de fysieke winkel, een informatieve bedrijfswebsite die duidelijk maakt wat je doet en waarom klanten voor jou kiezen, of een eenvoudige maar professionele visitekaartje-website voor een zzp'er of kleine praktijk. Omdat Stadskanaal functioneert als regionaal centrum, is zichtbaarheid in Google voor zowel de plaats zelf als de omliggende dorpen vaak net zo belangrijk als de uitstraling van de site.",
  workflowHeading: "Zo werken we samen aan jouw website",
  workflowSteps: [
    { title: "Kennismaking en wensen", desc: "We bespreken je bedrijf, doelgroep en doelen, zodat de website aansluit op hoe je werkt en wat klanten in Stadskanaal van je verwachten." },
    { title: "Ontwerp op maat", desc: "Geen kant-en-klaar sjabloon, maar een ontwerp dat past bij jouw bedrijf, met een heldere structuur en aandacht voor snelheid vanaf de eerste schets." },
    { title: "Bouw en techniek", desc: "We bouwen de site met eigen, moderne techniek gericht op korte laadtijden, zodat bezoekers en Google de site waarderen." },
    { title: "Livegang en controle", desc: "Voor livegang testen we alles grondig: van formulieren tot weergave op telefoon, tablet en desktop." },
    { title: "Hosting en servermonitoring", desc: "Na oplevering draait je website op onze eigen hosting met actieve servermonitoring, zodat problemen vroeg worden gesignaleerd." },
    { title: "Beheer via klantenportaal", desc: "Via een persoonlijk klantenportaal houd je overzicht op je website en kun je eenvoudig contact opnemen voor aanpassingen." },
  ],
  faqs: [
    { q: "Wat kost een website laten maken in Stadskanaal?", a: "De prijs hangt af van de omvang en functionaliteit van de website. We bespreken dit altijd vooraf, zodat je precies weet waar je aan toe bent, zonder verrassingen achteraf." },
    { q: "Werkt AIMI ook voor bedrijven buiten Stadskanaal zelf?", a: "Ja, veel klanten komen uit de dorpen rond Stadskanaal. Omdat de plaats een regionale centrumfunctie heeft, richten we websites vaak in op zichtbaarheid in zowel Stadskanaal als het omliggende verzorgingsgebied." },
    { q: "Hoe snel is mijn website klaar?", a: "Dat verschilt per project. Na de kennismaking geven we een realistische inschatting op basis van de gewenste functionaliteit en het beschikbare materiaal." },
    { q: "Kan ik zelf teksten en foto's aanpassen na livegang?", a: "Ja, via het klantenportaal kun je eenvoudig in contact blijven over aanpassingen, en waar gewenst richten we de site zo in dat je zelf kleine wijzigingen kunt doen." },
    { q: "Bouwt AIMI ook webshops voor winkels in Stadskanaal?", a: "Zeker. Voor winkeliers die naast hun fysieke zaak online willen verkopen, bouwen we webshops die aansluiten op het assortiment en de uitstraling van de winkel." },
    { q: "Waarom is laadsnelheid zo belangrijk voor mijn website?", a: "Een trage website verliest bezoekers en scoort slechter in Google. Onze eigen techniek en hosting zijn gericht op korte laadtijden, wat direct bijdraagt aan meer klanten." },
    { q: "Blijft AIMI betrokken na oplevering?", a: "Ja. Dankzij servermonitoring en het klantenportaal houden we vinger aan de pols en zijn we bereikbaar voor vragen of aanpassingen, ook na livegang." },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Winschoten", href: "/website-laten-maken-winschoten" },
    { label: "Website laten maken Veendam", href: "/website-laten-maken-veendam" },
    { label: "Website laten maken Emmen", href: "/website-laten-maken-emmen" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["businessTypes", "context", "faq", "workflow"],
};

export const Route = createFileRoute("/website-laten-maken-stadskanaal")({
  head: () => ({
    meta: [
      { title: "Website laten maken in Stadskanaal | AIMI" },
      {
        name: "description",
        content:
          "Webdesigner in Stadskanaal? AIMI bouwt snelle, professionele websites met eigen techniek en hosting voor ondernemers in de regio.",
      },
      { name: "geo.region", content: "NL-GR" },
      { name: "geo.placename", content: "Stadskanaal" },
      { property: "og:title", content: "Website laten maken in Stadskanaal | AIMI" },
      {
        property: "og:description",
        content: "Snelle, professionele websites en webshops voor ondernemers in Stadskanaal en omgeving.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken in Stadskanaal | AIMI" },
      {
        name: "twitter:description",
        content: "Snelle, professionele websites en webshops voor ondernemers in Stadskanaal en omgeving.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        name: "Website laten maken in Stadskanaal",
        description: "Webdesign en websiteontwikkeling voor ondernemers in Stadskanaal en omgeving.",
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Stadskanaal", "Groningen"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Stadskanaal", "/website-laten-maken-stadskanaal"],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
