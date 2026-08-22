import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed} from "@/lib/seo";

const CITY = "Sneek";
const REGION = "Friesland";
const PATH = "/website-laten-maken-sneek";
const URL = `${SITE_URL}${PATH}`;

const data: LocationPageData = {
  city: CITY,
  h1: "Webdesign in Sneek, van watersport tot dienstverlening",
  region: REGION,
  kicker: "Webdesign in Sneek",
  intro:
    "Sneek is onlosmakelijk verbonden met watersport en toerisme, met de jaarlijkse Sneekweek als bekendste voorbeeld. AIMI bouwt websites voor ondernemers in Sneek die met seizoensgebonden drukte te maken hebben, van horeca tot detailhandel, en die willen dat hun website daar goed op is voorbereid.",
  contextHeading: "Webdesign in Sneek: bouwen voor seizoen en watersport",
  contextBody: [
    "Sneek trekt dankzij watersport en evenementen als de Sneekweek een grote stroom bezoekers aan, vooral in de zomermaanden. Voor lokale ondernemers in horeca, detailhandel en verhuur betekent dit dat een groot deel van de omzet en klantcontacten geconcentreerd is in een relatief kort seizoen. Een website die dan traag is, verouderde informatie toont of moeilijk te vinden is, kost je in die periode direct klanten.",
    "AIMI bouwt websites die rekening houden met dat seizoensritme. Denk aan een duidelijke presentatie van openingstijden, arrangementen of aanbod die je zelf eenvoudig kunt aanpassen wanneer het seizoen verandert, en een technische basis die stevig genoeg is om extra bezoekers tijdens drukke periodes zoals de Sneekweek soepel te verwerken. Snelheid en betrouwbaarheid zijn daarbij geen extra's, maar een voorwaarde.",
    "Naast de directe watersport- en toeristensector heeft Sneek ook een breder lokaal bedrijfsleven, met dienstverleners, makelaars en zakelijke ondernemingen die het hele jaar door actief zijn. Voor die bedrijven bouwen we websites die vooral geloofwaardigheid en duidelijkheid centraal stellen, met dezelfde technische zorgvuldigheid: eigen hosting, servermonitoring en een opzet die is gericht op vindbaarheid in zoekmachines.",
  ],
  businessTypesHeading: "Websites voor watersport, horeca en lokale bedrijven in Sneek",
  businessTypesBody:
    "We bouwen websites voor uiteenlopende ondernemers in Sneek: horecazaken en verhuurbedrijven die seizoensgebonden aanbod overzichtelijk willen tonen, toeristische ondernemingen die bezoekers willen informeren en enthousiasmeren, en lokale dienstverleners die het hele jaar door klanten willen bereiken. Voor elk type onderneming stemmen we de website af op de manier waarop bezoekers zoeken, of dat nu vlak voor de Sneekweek is of daarbuiten.",
  workflowHeading: "Zo bouwen we jouw website in Sneek op",
  workflowSteps: [
    { title: "Kennismaking", desc: "We inventariseren je onderneming, seizoenspatroon en doelgroep, zodat de website daarop is afgestemd." },
    { title: "Ontwerp", desc: "We stellen een ontwerp op dat past bij je branche, met aandacht voor content die je zelf eenvoudig kunt bijwerken per seizoen." },
    { title: "Bouw", desc: "De website wordt technisch gebouwd met snelheid en stabiliteit als uitgangspunt, ook onder verhoogde bezoekersdrukte." },
    { title: "Testen", desc: "We testen de website grondig, inclusief belasting en weergave op mobiele apparaten, voor livegang." },
    { title: "Livegang en beheer", desc: "Na livegang hosten en monitoren we de website zelf, met een klantenportaal voor overzicht en snelle aanpassingen." },
  ],
  faqs: [
    { q: "Kan mijn website tegen de drukte van de Sneekweek?", a: "We bouwen en hosten websites met performance en stabiliteit als uitgangspunt, zodat ook piekperiodes zoals de Sneekweek geen probleem vormen." },
    { q: "Wat kost een website laten maken in Sneek?", a: "De kosten zijn afhankelijk van de omvang van je project. Na een kennismakingsgesprek stellen we een passende offerte op." },
    { q: "Kan ik zelf openingstijden en aanbod per seizoen aanpassen?", a: "Ja, je krijgt een beheeromgeving waarmee je zelf eenvoudig content kunt bijwerken wanneer het seizoen verandert." },
    { q: "Bouwt AIMI ook websites voor watersport- en verhuurbedrijven?", a: "Ja, we hebben ervaring met het overzichtelijk presenteren van aanbod, arrangementen en beschikbaarheid voor de watersport- en toeristensector." },
    { q: "Werken jullie ook voor lokale bedrijven buiten het toeristische seizoen?", a: "Zeker, we bouwen ook websites voor dienstverleners en zakelijke ondernemingen in Sneek die het hele jaar door actief zijn." },
    { q: "Hoe snel is een website van AIMI?", a: "We bouwen met moderne technologie en hosten op eigen, gemonitorde infrastructuur, met laadsnelheid als vast aandachtspunt." },
    { q: "Zorgen jullie ook voor onderhoud na livegang?", a: "Ja, hosting, servermonitoring en onderhoud zijn standaard bij ons inbegrepen." },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Heerenveen", href: "/website-laten-maken-heerenveen" },
    { label: "Website laten maken Leeuwarden", href: "/website-laten-maken-leeuwarden" },
    { label: "Website laten maken", href: "/website-laten-maken" },
  ],
  sectionOrder: ["context", "faq", "businessTypes", "workflow"],
};

const TITLE = "Website laten maken in Sneek | AIMI";
const DESCRIPTION = "Ondernemer in Sneek? AIMI bouwt snelle websites die ook tijdens de Sneekweek en drukke seizoenen stabiel en vindbaar blijven.";

export const Route = createFileRoute("/website-laten-maken-sneek")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      // A-45: deze vier Friese pagina's misten de geo-meta die de 11 andere
      // plaatspagina's wel hadden. Google gebruikt ze niet, maar een set die
      // half is ingevuld is een onderhoudssignaal.
      { name: "geo.region", content: "NL-FR" },
      { name: "geo.placename", content: "Sneek" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        name: "Website laten maken in Sneek",
        description: DESCRIPTION,
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Sneek", "Friesland"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Sneek", PATH],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
