import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed} from "@/lib/seo";

const CITY = "Assen";
const URL = `${SITE_URL}/website-laten-maken-assen`;

const data: LocationPageData = {
  city: CITY,
  h1: "Webdesigner in Assen voor ondernemers in Drenthe",
  region: "Drenthe",
  kicker: "Webdesign in Assen",
  intro:
    "Als provinciehoofdstad van Drenthe combineert Assen bestuurlijke en zakelijke dienstverlening met een stad die rond het TT-circuit ook flink wat evenementenbezoek trekt. AIMI bouwt professionele websites voor ondernemers in Assen die hun online uitstraling willen laten aansluiten op dat brede publiek.",
  businessTypesHeading: "Voor wie we in Assen websites bouwen",
  businessTypesBody:
    "In Assen werken we vooral voor zakelijke dienstverleners: adviesbureaus, financiële dienstverleners en kleinere kantoren die behoefte hebben aan een website die vertrouwen wekt bij zowel particuliere als zakelijke bezoekers. Daarnaast bouwen we websites voor ondernemers die profiteren van de piekmomenten rond evenementen bij het TT-circuit, zoals horeca, verhuur en lokale dienstverlening, waarbij een site die ook onder drukte snel blijft laden essentieel is. Voor een provinciehoofdstad als Assen geldt bovendien dat veel bezoekers eerst online oriënteren voordat ze contact opnemen, dus een heldere website met duidelijke diensteninformatie is geen luxe maar een basisvoorwaarde.",
  contextHeading: "Website laten maken in de provinciehoofdstad van Drenthe",
  contextBody: [
    "Assen heeft een andere dynamiek dan de grotere studentensteden in de regio: hier draait het minder om een overvloed aan starters en meer om gevestigde zakelijke dienstverlening en bedrijven die al langer bestaan maar hun website willen moderniseren. Voor die groep is een website vaak toe aan vervanging, niet omdat de onderneming nieuw is, maar omdat de bestaande site verouderd, traag of niet meer mobielvriendelijk is.",
    "Tegelijk zorgt de aanwezigheid van het TT-circuit voor pieken in bezoekersaantallen en vraag, wat andere technische eisen stelt aan een website dan een gemiddelde bedrijfssite. Een pagina die het tijdens een rustige week prima doet, kan het tijdens een evenementenweekend laten afweten als de techniek niet goed is opgezet. Wij bouwen websites met eigen techniek die stabiel blijft presteren, ook wanneer het bezoekersaantal in Assen tijdelijk flink oploopt.",
    "Voor bestuurlijke en zakelijke dienstverleners in Assen is daarnaast betrouwbaarheid een belangrijk signaal: een professionele, snelle website met correcte informatie draagt direct bij aan het vertrouwen dat nodig is voordat iemand contact opneemt. Dat is precies waar wij op inzetten bij elk webdesign-traject in Assen.",
  ],
  workflowHeading: "De stappen naar jouw nieuwe website in Assen",
  workflowSteps: [
    { title: "Intake op maat", desc: "We bespreken wat je organisatie in Assen nodig heeft, of dat nu structurele zakelijke dienstverlening is of een site die pieken rond evenementen aankan." },
    { title: "Ontwerp en structuur", desc: "We werken een ontwerp uit dat past bij een professionele, zakelijke uitstraling, met heldere navigatie naar diensten en contactmogelijkheden." },
    { title: "Bouw met eigen techniek", desc: "De website wordt gebouwd zonder zware plugins of trage bouwpakketten, zodat de laadsnelheid ook onder drukte op peil blijft." },
    { title: "Testen en opleveren", desc: "We controleren de site grondig op verschillende apparaten voordat deze live gaat, zodat er geen technische verrassingen zijn." },
    { title: "Hosting en klantenportaal", desc: "Na livegang hosten we de website op eigen servers met monitoring, en beheer je aanvragen eenvoudig via het klantenportaal." },
  ],
  faqs: [
    { q: "Kan mijn website tegen drukte rond de TT in Assen?", a: "We bouwen websites op eigen techniek die stabiel presteert, ook als het bezoekersaantal tijdelijk sterk oploopt rond evenementen bij het TT-circuit." },
    { q: "Is AIMI geschikt voor zakelijke dienstverleners in Assen?", a: "Ja, we werken regelmatig voor adviesbureaus en kleinere kantoren die een professionele, betrouwbare website nodig hebben die aansluit bij hun doelgroep." },
    { q: "Wat kost een website laten maken in Assen?", a: "De tarieven verschillen per project. Bekijk de tarieven op onze website of vraag vrijblijvend een offerte aan, dan denken we mee over wat past bij jouw situatie." },
    { q: "Hoe zorgen jullie dat mijn site snel blijft laden?", a: "We gebruiken geen zware sjablonen of overbodige plugins en bouwen de techniek zelf, wat resulteert in een merkbaar snellere website dan bij veel bouwpakketten." },
    { q: "Kan ik na oplevering zelf iets aanpassen aan de website?", a: "Via het klantenportaal houd je overzicht en kun je aanpassingen aanvragen, zonder dat je daarvoor zelf hoeft te programmeren." },
    { q: "Bieden jullie ook hosting en onderhoud in Assen aan?", a: "Ja, we hosten op eigen infrastructuur met servermonitoring, zodat storingen snel worden opgemerkt en verholpen." },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Groningen", href: "/website-laten-maken-groningen" },
    { label: "Website laten maken Hoogeveen", href: "/website-laten-maken-hoogeveen" },
    { label: "Website laten maken Meppel", href: "/website-laten-maken-meppel" },
    { label: "Website laten maken", href: "/website-laten-maken" },
  ],
  sectionOrder: ["businessTypes", "context", "faq", "workflow"],
};

export const Route = createFileRoute("/website-laten-maken-assen")({
  head: () => ({
    meta: [
      { title: "Website laten maken in Assen | AIMI" },
      {
        name: "description",
        content:
          "AIMI ontwikkelt professionele websites voor zakelijke dienstverleners in Assen, met snelle techniek en eigen hosting.",
      },
      { name: "geo.region", content: "NL-DR" },
      { name: "geo.placename", content: "Assen" },
      { property: "og:title", content: "Website laten maken in Assen | AIMI" },
      {
        property: "og:description",
        content: "Professionele, snelle websites voor ondernemers en dienstverleners in Assen.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken in Assen | AIMI" },
      {
        name: "twitter:description",
        content: "Professionele, snelle websites voor ondernemers en dienstverleners in Assen.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        name: "Website laten maken in Assen",
        description: "Webdesign en websites op maat voor ondernemers in Assen, inclusief hosting en beheer.",
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Assen", "Drenthe"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Assen", "/website-laten-maken-assen"],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
