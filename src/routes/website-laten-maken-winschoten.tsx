import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed} from "@/lib/seo";

const CITY = "Winschoten";
const URL = `${SITE_URL}/website-laten-maken-winschoten`;

const data: LocationPageData = {
  city: CITY,
  region: "Groningen",
  kicker: "Webdesign Winschoten",
  intro:
    "Ondernemer in Winschoten en toe aan een professionele website? AIMI ontwerpt en bouwt snelle, overzichtelijke websites voor winkels en dienstverleners in de hoofdplaats van Oldambt, inclusief eigen hosting en persoonlijk beheer.",
  workflowHeading: "Hoe we jouw website in Winschoten opleveren",
  workflowSteps: [
    { title: "Kennismaking", desc: "We bespreken je bedrijf, klanten en wat je met de website wilt bereiken." },
    { title: "Ontwerp", desc: "We maken een ontwerp dat aansluit bij jouw winkel of dienst, met een duidelijke opbouw en heldere navigatie." },
    { title: "Bouw", desc: "De website wordt technisch opgebouwd met focus op snelheid, zodat bezoekers niet afhaken." },
    { title: "Testfase", desc: "Voor livegang testen we de website grondig op verschillende apparaten en schermformaten." },
    { title: "Livegang", desc: "We zetten de site live en controleren of alles correct functioneert, van formulieren tot navigatie." },
    { title: "Hosting en beheer", desc: "Na oplevering draait de website op onze eigen hosting, met servermonitoring en toegang tot een klantenportaal." },
  ],
  contextHeading: "Website laten maken in Winschoten: lokale detailhandel online",
  contextBody: [
    "Winschoten is de hoofdplaats van de gemeente Oldambt en heeft van oudsher een sterke functie als koop- en detailhandelsstad voor de regio. Het centrum trekt bezoekers uit een groot deel van Oost-Groningen, en dat maakt zichtbaarheid voor lokale winkels en dienstverleners extra belangrijk: wie in Winschoten zoekt naar een product of dienst, verwacht direct een duidelijk antwoord te vinden, zowel offline in de winkelstraat als online. Een professionele website is daarmee een logisch verlengstuk van de fysieke winkel of praktijk.",
    "Voor winkeliers en dienstverleners in Winschoten is een website vaak het eerste contactmoment met een potentiële klant. Openingstijden, assortiment, diensten en contactgegevens moeten direct duidelijk zijn, en de site moet snel laden, ook op mobiel, aangezien veel bezoekers onderweg of vanuit de winkelstraat zelf zoeken. Wie zoekt op webdesign Winschoten of webdesigner Winschoten wil een partij die de lokale markt begrijpt en een website oplevert die bijdraagt aan meer bezoekers, zowel in de winkel als online. AIMI bouwt websites met een technische basis die daarop is toegesneden: snel, overzichtelijk en zonder overbodige poespas.",
  ],
  businessTypesHeading: "Voor wie we in Winschoten websites bouwen",
  businessTypesBody:
    "We werken voor winkeliers en detailhandelaren in het centrum van Winschoten die hun assortiment ook online zichtbaar willen maken, voor dienstverleners die duidelijk willen communiceren wat ze bieden, en voor kleinere ondernemers die een professionele visitekaartje-website nodig hebben. Of het nu gaat om een eenvoudige informatieve website of een webshop naast de fysieke winkel, we sluiten aan bij wat past bij jouw bedrijf en de manier waarop klanten in en rond Winschoten naar producten en diensten zoeken.",
  faqs: [
    { q: "Waarom is een website belangrijk voor een winkel in het centrum van Winschoten?", a: "Veel klanten oriënteren zich online voordat ze naar de winkelstraat komen. Een duidelijke, snelle website helpt om die eerste indruk goed te maken en klanten daadwerkelijk naar de winkel te trekken." },
    { q: "Kan AIMI een webshop bouwen naast mijn fysieke winkel in Winschoten?", a: "Ja, we bouwen webshops die aansluiten op het assortiment en de uitstraling van je fysieke winkel, zodat beide kanalen elkaar versterken." },
    { q: "Wat kost een website laten maken in Winschoten?", a: "De kosten hangen af van de gewenste functionaliteit. We bespreken dit altijd vooraf, zodat je precies weet wat je kunt verwachten." },
    { q: "Hoe snel is mijn website klaar?", a: "Dat hangt af van de omvang van het project. Na de kennismaking geven we een reële inschatting van de doorlooptijd." },
    { q: "Blijft AIMI ook na livegang bereikbaar?", a: "Ja, via het klantenportaal en persoonlijk contact blijven we beschikbaar voor vragen, updates of aanpassingen." },
    { q: "Hoe zorgt AIMI dat mijn website snel blijft laden?", a: "We gebruiken eigen techniek en hosting die specifiek is gericht op snelheid, met actieve servermonitoring om problemen vroeg te signaleren." },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Stadskanaal", href: "/website-laten-maken-stadskanaal" },
    { label: "Website laten maken Veendam", href: "/website-laten-maken-veendam" },
    { label: "Website laten maken", href: "/website-laten-maken" },
  ],
  sectionOrder: ["workflow", "context", "businessTypes", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-winschoten")({
  head: () => ({
    meta: [
      { title: "Website laten maken in Winschoten | AIMI" },
      {
        name: "description",
        content:
          "AIMI ontwikkelt professionele websites voor winkels en dienstverleners in Winschoten, met eigen hosting en persoonlijk beheer.",
      },
      { name: "geo.region", content: "NL-GR" },
      { name: "geo.placename", content: "Winschoten" },
      { property: "og:title", content: "Website laten maken in Winschoten | AIMI" },
      {
        property: "og:description",
        content: "Snelle, professionele websites en webshops voor ondernemers in Winschoten en omgeving.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken in Winschoten | AIMI" },
      {
        name: "twitter:description",
        content: "Snelle, professionele websites en webshops voor ondernemers in Winschoten en omgeving.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        name: "Website laten maken in Winschoten",
        description: "Webdesign en websiteontwikkeling voor ondernemers in Winschoten en omgeving.",
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Winschoten", "Groningen"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Winschoten", "/website-laten-maken-winschoten"],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
