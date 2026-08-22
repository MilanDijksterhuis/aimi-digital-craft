import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed} from "@/lib/seo";

const CITY = "Drachten";
const REGION = "Friesland";
const PATH = "/website-laten-maken-drachten";
const URL = `${SITE_URL}${PATH}`;

const data: LocationPageData = {
  city: CITY,
  h1: "Een zakelijke website voor ondernemers in Drachten",
  region: REGION,
  kicker: "Webdesign in Drachten",
  intro:
    "Drachten, hoofdplaats van de gemeente Smallingerland, staat bekend om zijn technische maakindustrie en innovatieve bedrijfsleven. AIMI bouwt websites voor die technische en industriële ondernemers, met dezelfde nauwkeurigheid en betrouwbaarheid die je van hun eigen producten verwacht.",
  contextHeading: "Webdesign in Drachten: techniek verdient een technische partner",
  contextBody: [
    "Drachten is binnen Friesland een uitzondering: een plaats waar technische maakindustrie en innovatie een prominente plek innemen in de lokale economie. De gemeente Smallingerland telt van oudsher een sterk technisch bedrijfsleven, met bedrijven die precisie, betrouwbaarheid en engineering hoog in het vaandel hebben staan. Die mentaliteit vraagt om een website die dezelfde eigenschappen uitstraalt: geen loze marketingtaal, maar een heldere, functionele presentatie van wat een bedrijf daadwerkelijk kan.",
    "AIMI bouwt websites voor technische bedrijven en maakindustrie in Drachten met oog voor die nuchtere, resultaatgerichte instelling. Dat betekent een website die snel laadt, duidelijk communiceert wat je doet en voor wie, en technisch op orde is tot in de details, van paginastructuur tot laadtijd. Voor bedrijven die zakelijke klanten of toeleveranciers bedienen, is een professionele eerste indruk vaak doorslaggevend, en die indruk begint tegenwoordig bij de website.",
    "Naast de technische en industriële sector heeft Drachten ook een breed lokaal bedrijfsleven met retail, dienstverlening en horeca. Ook voor die ondernemers geldt dat een website geen los project moet zijn, maar een verlengstuk van hoe je zaken doet: betrouwbaar, snel en zonder poespas. We houden daarbij de techniek zelf beheerd, inclusief hosting en servermonitoring, zodat je niet afhankelijk bent van losse leveranciers voor elk onderdeel.",
  ],
  businessTypesHeading: "Websites voor technische bedrijven en ondernemers in Drachten",
  businessTypesBody:
    "We bouwen websites voor uiteenlopende bedrijven in en rond Drachten: technische dienstverleners en toeleveranciers die vooral hun expertise en betrouwbaarheid willen tonen, maakindustrie die producten en processen inzichtelijk wil maken voor zakelijke klanten, en lokale ondernemers in retail en horeca die behoefte hebben aan een snelle, overzichtelijke website. Voor elk type bedrijf geldt dat we de website afstemmen op de doelgroep, met een duidelijke structuur en zonder onnodige franje.",
  workflowHeading: "Hoe we een website voor jouw bedrijf in Drachten bouwen",
  workflowSteps: [
    { title: "Intake", desc: "We brengen in kaart wat je bedrijf doet, wie je klanten zijn en wat de website concreet moet opleveren." },
    { title: "Structuur en ontwerp", desc: "We werken een heldere paginastructuur en ontwerp uit die past bij een technisch of zakelijk publiek." },
    { title: "Ontwikkeling", desc: "De website wordt gebouwd met moderne, snelle technologie, met aandacht voor techniek achter de schermen." },
    { title: "Controle en livegang", desc: "We testen functionaliteit, snelheid en weergave op alle apparaten voordat de website live gaat." },
    { title: "Beheer na livegang", desc: "We hosten en monitoren de website zelf en houden je via een klantenportaal op de hoogte van status en updates." },
  ],
  faqs: [
    { q: "Bouwt AIMI ook websites voor technische bedrijven en maakindustrie in Drachten?", a: "Ja, we hebben ervaring met het presenteren van technische producten en diensten op een heldere, geloofwaardige manier voor een zakelijk publiek." },
    { q: "Wat kost een website laten maken in Drachten?", a: "De kosten hangen af van de omvang en functionaliteit die je nodig hebt. Na een kennismakingsgesprek stellen we een concrete, passende offerte op." },
    { q: "Kan de website gekoppeld worden aan bestaande systemen?", a: "Afhankelijk van je situatie bespreken we de mogelijkheden voor koppelingen, zodat de website aansluit op de manier waarop je nu al werkt." },
    { q: "Hoe zorgt AIMI voor een snelle website?", a: "We bouwen met moderne technologie en hosten op eigen, gemonitorde infrastructuur, met laadsnelheid als vast uitgangspunt." },
    { q: "Onderhouden jullie de website ook na livegang?", a: "Ja, hosting, onderhoud en servermonitoring zijn standaard bij ons inbegrepen, zodat je er na livegang niet alleen voor staat." },
    { q: "Werken jullie alleen voor technische bedrijven in Drachten?", a: "Nee, we bouwen voor uiteenlopende ondernemers in Drachten en omgeving, van technische bedrijven tot horeca en lokale dienstverleners." },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Leeuwarden", href: "/website-laten-maken-leeuwarden" },
    { label: "Website laten maken Sneek", href: "/website-laten-maken-sneek" },
    { label: "Bekijk onze werkwijze", href: "/website-laten-maken" },
  ],
  sectionOrder: ["businessTypes", "context", "faq", "workflow"],
};

const TITLE = "Website laten maken in Drachten | AIMI";
const DESCRIPTION = "Website nodig voor je technische bedrijf in Drachten? AIMI bouwt snelle, heldere websites met eigen hosting en servermonitoring.";

export const Route = createFileRoute("/website-laten-maken-drachten")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      // A-45: deze vier Friese pagina's misten de geo-meta die de 11 andere
      // plaatspagina's wel hadden. Google gebruikt ze niet, maar een set die
      // half is ingevuld is een onderhoudssignaal.
      { name: "geo.region", content: "NL-FR" },
      { name: "geo.placename", content: "Drachten" },
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
        name: "Website laten maken in Drachten",
        description: DESCRIPTION,
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Drachten", "Friesland"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Drachten", PATH],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
