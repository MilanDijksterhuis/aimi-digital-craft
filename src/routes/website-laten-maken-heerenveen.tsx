import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed} from "@/lib/seo";

const CITY = "Heerenveen";
const REGION = "Friesland";
const PATH = "/website-laten-maken-heerenveen";
const URL = `${SITE_URL}${PATH}`;

const data: LocationPageData = {
  city: CITY,
  h1: "Website laten maken in Heerenveen",
  region: REGION,
  kicker: "Webdesign in Heerenveen",
  intro:
    "Heerenveen is een plaats met een uitgesproken identiteit, sterk verbonden met sport en een actief lokaal bedrijfsleven. AIMI bouwt websites voor ondernemers in Heerenveen die net zo scherp voor de dag willen komen als de reputatie van hun eigen plaats, met snelheid, duidelijkheid en een technisch stevige basis.",
  contextHeading: "Website laten maken in Heerenveen: lokale identiteit als vertrekpunt",
  contextBody: [
    "Heerenveen heeft een naam die verder reikt dan de gemeentegrenzen, mede door de sportieve reputatie van de plaats. Die zichtbaarheid heeft ook een positief effect gehad op het lokale ondernemersklimaat: er is een actieve mix van sportgerelateerde bedrijven, retail, horeca en dienstverleners die profiteren van de bekendheid en de bezoekersstroom die Heerenveen aantrekt. Voor ondernemers betekent dit dat online zichtbaarheid net zo belangrijk is als lokale naamsbekendheid, want bezoekers en potentiële klanten zoeken vaak eerst online voordat ze een keuze maken.",
    "AIMI bouwt websites die aansluiten op die lokale identiteit: helder, snel en met een duidelijke boodschap over wat je als ondernemer in Heerenveen te bieden hebt. Of het nu gaat om een sportgerelateerde onderneming, een horecazaak die bezoekers wil informeren over openingstijden en aanbod, of een dienstverlener die vertrouwen wil wekken bij nieuwe klanten, de website moet in enkele seconden duidelijk maken waar je voor staat.",
    "Daarbij hoort een technische basis die niet wankelt zodra het druk wordt. Heerenveen kent piekmomenten rond evenementen en wedstrijden, waarbij lokale ondernemers soms een tijdelijke toename in bezoekers of aanvragen zien. Onze websites draaien op eigen, gemonitorde hosting en zijn gebouwd met performance als uitgangspunt, zodat je website ook op drukke momenten snel en bereikbaar blijft.",
  ],
  businessTypesHeading: "Voor wie we in Heerenveen websites bouwen",
  businessTypesBody:
    "We bouwen websites voor uiteenlopende ondernemers in Heerenveen: sportgerelateerde bedrijven en verenigingen die hun activiteiten en aanbod overzichtelijk willen presenteren, horecaondernemers die bezoekers snel willen informeren, retailers die hun assortiment online zichtbaar willen maken, en dienstverleners die geloofwaardigheid en professionaliteit willen uitstralen. Voor elke branche geldt dat de website is afgestemd op hoe klanten in Heerenveen daadwerkelijk zoeken en beslissen.",
  workflowHeading: "Ons proces voor een nieuwe website in Heerenveen",
  workflowSteps: [
    { title: "Kennismaking", desc: "We bespreken je onderneming, doelgroep en wat je met de website wilt bereiken." },
    { title: "Ontwerp", desc: "We stellen een ontwerp op dat past bij jouw branche en de manier waarop je klanten in Heerenveen worden aangesproken." },
    { title: "Bouw", desc: "De website wordt technisch gebouwd met focus op snelheid, betrouwbaarheid en vindbaarheid in zoekmachines." },
    { title: "Testen", desc: "Voor livegang controleren we de werking op alle apparaten en onder verschillende omstandigheden, inclusief drukte." },
    { title: "Livegang en beheer", desc: "Na livegang hosten en monitoren we de website zelf, met een klantenportaal voor inzicht en updates." },
  ],
  faqs: [
    { q: "Wat kost een website laten maken in Heerenveen?", a: "Dat hangt af van de omvang van je project. Na een kort gesprek over je wensen stellen we een concrete offerte op, zonder verborgen kosten." },
    { q: "Blijft de website ook snel tijdens drukke periodes rond evenementen?", a: "Ja, we hosten op eigen, gemonitorde infrastructuur en bouwen met performance als uitgangspunt, zodat de website ook bij piekmomenten stabiel blijft." },
    { q: "Bouwt AIMI ook websites voor sportgerelateerde bedrijven in Heerenveen?", a: "Ja, we hebben ervaring met het overzichtelijk presenteren van activiteiten, aanbod en informatie voor een sportief publiek." },
    { q: "Kan ik zelf inhoud aanpassen na livegang?", a: "Ja, je krijgt toegang tot een beheeromgeving waarmee je zelf teksten en beeld kunt bijwerken." },
    { q: "Werken jullie ook met horecaondernemers in Heerenveen?", a: "Zeker, we bouwen websites waarop bezoekers snel openingstijden, menukaarten en contactgegevens vinden." },
    { q: "Hoeveel tijd kost het om een nieuwe website te krijgen?", a: "De doorlooptijd verschilt per project; na de intake geven we een realistische inschatting van de planning." },
    { q: "Zorgen jullie ook voor hosting en onderhoud?", a: "Ja, hosting, servermonitoring en onderhoud zijn standaard onderdeel van onze dienstverlening." },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Sneek", href: "/website-laten-maken-sneek" },
    { label: "Website laten maken Drachten", href: "/website-laten-maken-drachten" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["workflow", "context", "businessTypes", "faq"],
};

const TITLE = "Website laten maken in Heerenveen | AIMI";
const DESCRIPTION = "AIMI bouwt snelle, professionele websites voor ondernemers in Heerenveen, met eigen hosting, monitoring en persoonlijk contact.";

export const Route = createFileRoute("/website-laten-maken-heerenveen")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      // A-45: deze vier Friese pagina's misten de geo-meta die de 11 andere
      // plaatspagina's wel hadden. Google gebruikt ze niet, maar een set die
      // half is ingevuld is een onderhoudssignaal.
      { name: "geo.region", content: "NL-FR" },
      { name: "geo.placename", content: "Heerenveen" },
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
        name: "Website laten maken in Heerenveen",
        description: DESCRIPTION,
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Heerenveen", "Friesland"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Heerenveen", PATH],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
