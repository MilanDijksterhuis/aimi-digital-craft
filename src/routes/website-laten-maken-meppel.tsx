import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed} from "@/lib/seo";

const CITY = "Meppel";
const URL = `${SITE_URL}/website-laten-maken-meppel`;
const TITLE = "Website laten maken in Meppel | AIMI";
const DESCRIPTION =
  "Snelle, professionele website nodig in Meppel? AIMI bouwt en host websites voor bedrijven in logistiek, grafische sector en mkb.";

const data: LocationPageData = {
  city: CITY,
  region: "Drenthe",
  kicker: "Webdesign in Meppel",
  intro:
    "Meppel geldt van oudsher als poort naar Drenthe: een spoorknooppunt met sterke logistieke en grafische bedrijvigheid. AIMI ontwerpt, bouwt en host websites voor ondernemers in Meppel die net zo snel en betrouwbaar moeten werken als het knooppunt waar ze middenin zitten.",
  contextHeading: "Webdesign in Meppel: van spoorknooppunt tot digitale vindbaarheid",
  contextBody: [
    "Meppel dankt zijn positie voor een belangrijk deel aan de ligging als spoor- en verkeersknooppunt: de stad wordt niet voor niets 'de poort van Drenthe' genoemd. Die functie heeft de lokale economie gevormd. Meppel kent van oudsher een sterke logistieke sector, en daarnaast een opvallend stevige grafische industrie — drukkerijen en aanverwante bedrijven die deels teruggaan tot de negentiende eeuw. Beide sectoren draaien om precisie, betrouwbaarheid en op tijd leveren, en dat zijn precies de eigenschappen die je ook terug wilt zien in de website van een Meppeler bedrijf.",
    "Voor een logistiek bedrijf in Meppel is een website die traag laadt of onduidelijk communiceert een slecht visitekaartje: klanten die op zoek zijn naar een betrouwbare partner in transport of opslag verwachten een site die net zo strak georganiseerd oogt als het proces erachter. Voor bedrijven in de grafische sector geldt iets vergelijkbaars, maar dan visueel: een website is voor een drukkerij of vormgevingsbureau ook een presentatiemiddel van het eigen vakmanschap, en moet er dus verzorgd uitzien, met scherp weergegeven beeldmateriaal en een prettige leeservaring.",
    "AIMI bouwt websites op maat, zonder trage page builders, zodat de laadtijd kort blijft op elk apparaat. Voor Meppeler ondernemers betekent dat een website die past bij de nuchtere, functionele mentaliteit van de stad: geen overbodige versieringen, wel een heldere opbouw, snelle techniek en een duidelijke manier om contact op te nemen. Omdat we zelf hosten en de site monitoren, ligt het technisch beheer niet bij jou, maar bij ons.",
  ],
  businessTypesHeading: "Voor welke ondernemers in Meppel bouwen we websites?",
  businessTypesBody:
    "We bouwen websites voor bedrijven in logistiek en transport, voor drukkerijen en andere spelers in de grafische sector, en voor lokale mkb-bedrijven en zzp'ers in Meppel die online serieus gevonden en overtuigend gepresenteerd willen worden. Voor logistieke bedrijven ligt de nadruk op snelheid en heldere dienstenoverzichten; voor bedrijven in de grafische sector op een sterke visuele uitstraling die het eigen vakmanschap onderstreept.",
  workflowHeading: "Hoe we samenwerken aan jouw website in Meppel",
  workflowSteps: [
    {
      title: "Kennismaking",
      desc: "In een kort gesprek bespreken we wat je bedrijf doet, wie je klanten zijn en wat de website concreet moet bereiken.",
    },
    {
      title: "Ontwerp op maat",
      desc: "We ontwerpen een structuur en uitstraling die past bij jouw sector, of dat nu logistiek, grafisch werk of een andere branche is.",
    },
    {
      title: "Bouw met moderne techniek",
      desc: "De website wordt gebouwd met lichte, snelle techniek, zodat hij op elk apparaat vlot laadt — belangrijk voor zowel bezoekers als vindbaarheid.",
    },
    {
      title: "Testen voor livegang",
      desc: "We controleren de site grondig op functionaliteit en weergave voordat hij live gaat.",
    },
    {
      title: "Hosting en klantenportaal",
      desc: "Na livegang hosten en monitoren we de site zelf, en houd je via een eigen klantenportaal inzicht in je website.",
    },
  ],
  faqs: [
    {
      q: "Bouwen jullie ook websites voor logistieke bedrijven in Meppel?",
      a: "Ja. We hebben oog voor de eisen die logistieke bedrijven aan hun website stellen: snelheid, duidelijkheid en een professionele uitstraling die past bij een betrouwbare partner in transport of opslag.",
    },
    {
      q: "Kan een website mij helpen mijn vakmanschap als drukkerij of vormgever te laten zien?",
      a: "Zeker. Voor bedrijven in de grafische sector in Meppel besteden we extra aandacht aan een verzorgde visuele presentatie, zodat je website recht doet aan het niveau van je werk.",
    },
    {
      q: "Hoe zorgen jullie voor een snelle website?",
      a: "We bouwen zonder zware page builders en met moderne, lichte techniek, wat resulteert in korte laadtijden op zowel desktop als mobiel.",
    },
    {
      q: "Wat kost een website laten maken?",
      a: "De kosten zijn afhankelijk van de omvang en wensen van het project. In een vrijblijvend gesprek bekijken we wat bij jouw situatie past.",
    },
    {
      q: "Verzorgen jullie ook hosting en onderhoud na livegang?",
      a: "Ja, we hosten en monitoren de website zelf, zodat je niet zelf hoeft uit te zoeken hoe technisch beheer werkt.",
    },
    {
      q: "Hoe lang duurt het om een website te laten bouwen?",
      a: "De meeste projecten zijn binnen enkele weken gerealiseerd, van eerste gesprek tot livegang.",
    },
    {
      q: "Kan ik na livegang zelf dingen aanpassen aan de website?",
      a: "Via het klantenportaal houd je overzicht over je website. Voor grotere wijzigingen staan we altijd klaar om mee te denken en aan te passen.",
    },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Hoogeveen", href: "/website-laten-maken-hoogeveen" },
    { label: "Website laten maken Coevorden", href: "/website-laten-maken-coevorden" },
    { label: "Website laten maken Heerenveen", href: "/website-laten-maken-heerenveen" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["context", "businessTypes", "workflow", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-meppel")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "geo.region", content: "NL-DR" },
      { name: "geo.placename", content: "Meppel" },
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
        name: "Website laten maken in Meppel",
        description: DESCRIPTION,
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Meppel", "Drenthe"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Meppel", "/website-laten-maken-meppel"],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
