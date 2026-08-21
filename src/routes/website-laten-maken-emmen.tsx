import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed} from "@/lib/seo";

const CITY = "Emmen";
const URL = `${SITE_URL}/website-laten-maken-emmen`;

const data: LocationPageData = {
  city: CITY,
  region: "Drenthe",
  kicker: "Webdesign Emmen",
  intro:
    "AIMI bouwt professionele, snelle websites voor ondernemers in en rond Emmen, de grootste stad van Drenthe. Van industrie en logistiek tot toerisme en lokale dienstverlening: een website die past bij jouw bedrijf en klaar is voor groei.",
  contextHeading: "Een website laten maken die past bij Emmen",
  contextBody: [
    "Emmen is de grootste stad van Drenthe en heeft een gevarieerde economie. Naast een sterke industriële en logistieke sector, met bedrijven die profiteren van de ligging nabij grensovergangen en belangrijke verbindingswegen, trekt de stad ook veel bezoekers door toerisme, met attracties als Wildlands als bekend voorbeeld. Die combinatie van sectoren betekent dat er in Emmen behoefte is aan heel verschillende soorten websites: van zakelijke, informatieve sites voor industriële toeleveranciers tot aantrekkelijke, visueel sterke websites voor horeca en vrijetijdsbedrijven die bezoekers willen verleiden.",
    "Rond Emmen liggen bovendien tal van dorpen met een actief MKB, van ambachtsbedrijven tot dienstverleners. Voor deze ondernemers is een goed vindbare website vaak de eerste indruk die een potentiële klant krijgt. Wie zoekt op webdesign Emmen of webdesigner Emmen wil een partij vinden die begrijpt hoe divers de lokale markt is en die zonder omwegen een website oplevert die past bij het karakter van het bedrijf. AIMI ontwerpt websites op maat, met een technische basis die is gericht op snelheid en betrouwbaarheid, zodat een website voor een bedrijf in Emmen ook op de lange termijn meegaat.",
  ],
  businessTypesHeading: "Voor wie bouwen we in Emmen en omgeving",
  businessTypesBody:
    "We bouwen websites voor uiteenlopende ondernemers in Emmen: van bedrijven in de industrie en logistiek die vooral zakelijke klanten bereiken, tot horeca- en vrijetijdsondernemers die profiteren van het toerisme in de regio. Ook voor het brede MKB in de omliggende dorpen, van ambachtslieden tot lokale dienstverleners, ontwikkelen we websites die duidelijk maken wat een bedrijf te bieden heeft. Steeds met dezelfde uitgangspunten: een snelle, overzichtelijke website die goed werkt op mobiel en die bijdraagt aan vindbaarheid in Google, zowel voor zoekopdrachten binnen Emmen als in de wijdere regio.",
  workflowHeading: "De stappen naar jouw nieuwe website",
  workflowSteps: [
    { title: "Kennismaking", desc: "We inventariseren je doelen, doelgroep en de plek die je bedrijf inneemt in Emmen of de regio." },
    { title: "Ontwerp", desc: "Op basis daarvan maken we een ontwerp dat past bij de sector waarin je actief bent, van industrieel zakelijk tot toeristisch aantrekkelijk." },
    { title: "Ontwikkeling", desc: "De website wordt gebouwd met eigen techniek, met nadruk op laadsnelheid en stabiliteit." },
    { title: "Testen", desc: "Voor livegang controleren we functionaliteit, weergave en snelheid op verschillende apparaten." },
    { title: "Livegang", desc: "We zetten de website live en zorgen dat alles direct correct werkt, inclusief eventuele koppelingen." },
    { title: "Hosting en monitoring", desc: "Na livegang draait je site op onze eigen hosting, met servermonitoring die de prestaties in de gaten houdt." },
    { title: "Doorlopend contact", desc: "Via het klantenportaal houden we korte lijnen voor vragen, updates of uitbreidingen." },
  ],
  faqs: [
    { q: "Bouwt AIMI ook websites voor toeristische bedrijven in Emmen?", a: "Ja, we ontwikkelen visueel aantrekkelijke websites voor horeca en vrijetijdsondernemers die inspelen op de toeristische aantrekkingskracht van Emmen." },
    { q: "Kan AIMI een website maken voor een industrieel of logistiek bedrijf?", a: "Zeker. We bouwen zakelijke, heldere websites die precies communiceren wat een bedrijf in de industrie of logistiek te bieden heeft aan zakelijke klanten." },
    { q: "Wat kost een website laten maken in Emmen?", a: "Dat hangt af van de gewenste functionaliteit. We bespreken dit vooraf, zodat er geen verrassingen zijn." },
    { q: "Werkt AIMI ook voor bedrijven in de dorpen rond Emmen?", a: "Ja, een groot deel van onze klanten in de regio komt uit de dorpen rond Emmen, waar veel actief MKB zit." },
    { q: "Hoe zorgt AIMI voor een snelle website?", a: "We gebruiken eigen techniek en eigen hosting, specifiek gericht op korte laadtijden, wat ook bijdraagt aan een betere positie in Google." },
    { q: "Kan ik na livegang nog aanpassingen laten doen?", a: "Ja, via het klantenportaal blijf je eenvoudig in contact voor updates, aanpassingen of uitbreidingen van je website." },
    { q: "Blijft mijn website in de gaten gehouden na oplevering?", a: "Ja, we gebruiken actieve servermonitoring zodat technische problemen vroeg worden opgemerkt en opgelost." },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Coevorden", href: "/website-laten-maken-coevorden" },
    { label: "Website laten maken Hoogeveen", href: "/website-laten-maken-hoogeveen" },
    { label: "Website laten maken", href: "/website-laten-maken" },
  ],
  sectionOrder: ["context", "workflow", "businessTypes", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-emmen")({
  head: () => ({
    meta: [
      { title: "Website laten maken in Emmen | AIMI" },
      {
        name: "description",
        content:
          "Voor bedrijven in Emmen: AIMI ontwikkelt snelle websites met eigen hosting, gericht op industrie, toerisme en lokaal MKB.",
      },
      { name: "geo.region", content: "NL-DR" },
      { name: "geo.placename", content: "Emmen" },
      { property: "og:title", content: "Website laten maken in Emmen | AIMI" },
      {
        property: "og:description",
        content: "Snelle, professionele websites en webshops voor ondernemers in Emmen en omgeving.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken in Emmen | AIMI" },
      {
        name: "twitter:description",
        content: "Snelle, professionele websites en webshops voor ondernemers in Emmen en omgeving.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        name: "Website laten maken in Emmen",
        description: "Webdesign en websiteontwikkeling voor ondernemers in Emmen en omgeving.",
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Emmen", "Drenthe"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Emmen", "/website-laten-maken-emmen"],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
