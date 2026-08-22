import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed} from "@/lib/seo";

const CITY = "Coevorden";
const URL = `${SITE_URL}/website-laten-maken-coevorden`;
const TITLE = "Website laten maken in Coevorden | AIMI";
const DESCRIPTION =
  "Professioneel webdesign in Coevorden, ook geschikt voor de Duitse markt. Snel, technisch solide en zelf gehost door AIMI.";

const data: LocationPageData = {
  city: CITY,
  h1: "Een website die werkt voor bedrijven in Coevorden",
  region: "Drenthe",
  kicker: "Webdesign in Coevorden",
  intro:
    "Coevorden ligt direct tegen de Duitse grens en is van oudsher een logistiek en industrieel knooppunt. AIMI bouwt en host websites voor ondernemers in Coevorden die zowel de Nederlandse als de Duitse afzetmarkt willen bedienen, met een heldere structuur en techniek die ook onder wisselende belasting stabiel blijft.",
  contextHeading: "Webdesign voor Coevorden: logistiek, industrie en de Duitse markt",
  contextBody: [
    "Coevorden heeft een economisch profiel dat afwijkt van veel andere Drentse plaatsen: de stad functioneert al decennia als logistiek en industrieel centrum, mede dankzij de directe ligging aan de Duitse grens en de aanwezigheid van bedrijventerreinen die zich richten op transport, techniek en industrie. Voor ondernemers in Coevorden betekent die grensligging iets concreets: een deel van de potentiële klanten en zakenpartners zit niet in Nederland, maar over de grens in Niedersachsen. Een website die alleen is ingericht op een Nederlandstalig publiek, laat daarmee kansen liggen.",
    "Wij houden bij websites voor Coevordense ondernemers rekening met die grensregio-dynamiek. Dat betekent niet automatisch een volledig Duitstalige website — voor veel bedrijven volstaat het om de site zo te structureren dat een Duitse bezoeker moeiteloos de weg vindt, of om een Duitse taalversie toe te voegen wanneer dat voor de doelgroep relevant is. Belangrijker nog is dat de techniek onder de motorkap klopt: een logistiek of industrieel bedrijf met klanten aan weerszijden van de grens heeft baat bij een site die snel laadt, ongeacht vanaf welk netwerk of apparaat hij bezocht wordt, en die duidelijk maakt wat je levert, aan wie en hoe je te bereiken bent.",
    "Voor bedrijven in transport, techniek, groothandel en industrie in en rond Coevorden bouwen we websites die verder gaan dan een digitale folder: heldere productie- of dienstenoverzichten, een logische navigatie voor zakelijke bezoekers die snel willen weten of je de juiste partij bent, en een technische basis die meegroeit met het bedrijf. Omdat we zelf hosten en de site monitoren, blijft de website ook bij piekbelasting — bijvoorbeeld na een beursbezoek of een vermelding in een vakblad — gewoon stabiel.",
  ],
  businessTypesHeading: "Voor welke bedrijven in Coevorden bouwen we websites?",
  businessTypesBody:
    "We werken voor bedrijven in logistiek, transport, techniek, groothandel en lokale dienstverlening in Coevorden, evenals voor kleinere ondernemers zoals vakspecialisten en zzp'ers. Voor bedrijven met een grensoverschrijdende klantkring denken we mee over een heldere structuur richting de Duitse markt, zonder dat de website onnodig complex wordt. Voor lokaal georiënteerde ondernemers ligt de focus juist op snelheid, duidelijkheid en een goede vindbaarheid in Coevorden en de directe omgeving.",
  workflowHeading: "Onze werkwijze voor een website in Coevorden",
  workflowSteps: [
    {
      title: "Intake en doelgroepbepaling",
      desc: "We bespreken wie je klanten zijn — lokaal, regionaal of grensoverschrijdend — en wat de website concreet moet opleveren.",
    },
    {
      title: "Structuur en ontwerp",
      desc: "We bouwen een heldere sitestructuur die past bij je diensten of producten, met aandacht voor een eventueel Duitstalig publiek.",
    },
    {
      title: "Technische bouw",
      desc: "De website wordt gebouwd met moderne, lichte techniek voor een snelle laadtijd, ook bij pieken in bezoekersaantallen.",
    },
    {
      title: "Controle en livegang",
      desc: "We testen de site grondig op verschillende apparaten en browsers voordat hij live gaat.",
    },
    {
      title: "Hosting en beheer via klantenportaal",
      desc: "Na livegang verzorgen we hosting en servermonitoring, en houd je via een eigen klantenportaal overzicht.",
    },
  ],
  faqs: [
    {
      q: "Kunnen jullie een website maken die ook geschikt is voor Duitse klanten?",
      a: "Ja. Voor ondernemers in Coevorden met klanten over de grens denken we mee over een structuur die ook voor Duitse bezoekers logisch is, met de mogelijkheid om een Duitstalige versie toe te voegen als dat past bij je doelgroep.",
    },
    {
      q: "Is jullie webdesign geschikt voor logistieke en industriële bedrijven?",
      a: "Zeker. We bouwen websites voor bedrijven in transport, techniek en industrie in Coevorden, met heldere overzichten van diensten of producten en een technische basis die stabiel blijft bij wisselende bezoekersaantallen.",
    },
    {
      q: "Hoe zorgen jullie dat de website ook bij drukte snel blijft?",
      a: "We hosten en monitoren de website zelf op eigen infrastructuur, zodat we snel kunnen ingrijpen als er iets misgaat en de site ook bij piekbelasting soepel blijft draaien.",
    },
    {
      q: "Wat kost een website laten maken bij AIMI?",
      a: "De kosten hangen af van de omvang en wensen van het project. In een vrijblijvend gesprek bekijken we wat bij jouw bedrijf past.",
    },
    {
      q: "Wie regelt hosting en onderhoud na de livegang?",
      a: "Ja, we verzorgen hosting, servermonitoring en onderhoud, zodat je website veilig en up-to-date blijft zonder dat je daar zelf tijd in hoeft te steken.",
    },
    {
      q: "Hoe lang duurt het bouwen van een website?",
      a: "Afhankelijk van de omvang van het project ben je meestal binnen enkele weken van intake tot livegang.",
    },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Emmen", href: "/website-laten-maken-emmen" },
    { label: "Website laten maken Hoogeveen", href: "/website-laten-maken-hoogeveen" },
    { label: "Website laten maken Meppel", href: "/website-laten-maken-meppel" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["context", "businessTypes", "faq", "workflow"],
};

export const Route = createFileRoute("/website-laten-maken-coevorden")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "geo.region", content: "NL-DR" },
      { name: "geo.placename", content: "Coevorden" },
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
        name: "Website laten maken in Coevorden",
        description: DESCRIPTION,
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Coevorden", "Drenthe"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Coevorden", "/website-laten-maken-coevorden"],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
