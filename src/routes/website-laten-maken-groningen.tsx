import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed} from "@/lib/seo";

const CITY = "Groningen";
const URL = `${SITE_URL}/website-laten-maken-groningen`;

const data: LocationPageData = {
  city: CITY,
  h1: "Website laten maken in Groningen",
  region: "Groningen",
  kicker: "Webdesign in Groningen",
  intro:
    "Groningen is een stad vol starters en groeiende ondernemingen, van horeca in de Folkingestraat tot dienstverleners rond de Grote Markt. AIMI bouwt snelle, professionele websites voor ondernemers in Groningen die willen opvallen tussen de vele webdesignbureaus die de stad rijk is.",
  contextHeading: "Website laten maken in een stad vol concurrentie",
  contextBody: [
    "Groningen telt relatief veel webdesignbureaus en zelfstandige webdesigners, wat logisch is in een stad met zoveel studenten, starters en kleine bedrijven. Voor ondernemers betekent dit dat opvallen niet vanzelf gaat: een website die traag laadt of nauwelijks vindbaar is in Google, valt tussen wal en schip in zo'n drukke markt. Wij richten ons daarom niet op zoveel mogelijk klanten tegelijk, maar op een beperkt aantal projecten per maand, zodat elke website in Groningen persoonlijke aandacht krijgt.",
    "Een groot deel van de bedrijvigheid in Groningen zit in de binnenstad en de wijken eromheen: horeca, kleine winkels, coaches, zzp'ers en dienstverleners die net gestart zijn of net doorgroeien. Voor die groep is een website vaak het eerste contactmoment met een potentiële klant, nog voor er telefonisch of fysiek contact is. Een pagina die traag opent of op mobiel niet prettig leest, kost dan direct omzet, ook al is het aanbod goed.",
    "Wij bouwen websites zelf, zonder tussenkomst van dure sjablonen of externe plugins die de laadsnelheid vertragen. Dat is precies waar veel Groningse ondernemers naar zoeken wanneer ze een webdesigner in Groningen nodig hebben: geen wegwerp-website via een bouwpakket, maar maatwerk dat technisch in orde is en op lange termijn meegroeit.",
  ],
  businessTypesHeading: "Voor wie bouwen we een website in Groningen",
  businessTypesBody:
    "We werken voor uiteenlopende ondernemers in Groningen: van startende zzp'ers die net de stap zetten naar eigen bedrijf, tot horecaondernemingen in de binnenstad die een menukaart, reserveringsknop en actuele openingstijden overzichtelijk willen tonen. Ook dienstverleners zoals coaches, adviseurs en kleine praktijken kiezen voor een professioneel webdesign in Groningen om serieus over te komen bij nieuwe klanten. Juist in een studentenstad met veel korte-termijn ondernemingen is het belangrijk dat een website meteen vertrouwen wekt: duidelijke informatie, een werkend contactformulier en een pagina die ook op een telefoon goed oogt, want een groot deel van de bezoekers in Groningen surft onderweg tussen de universiteit, de binnenstad en huis.",
  workflowHeading: "Zo werken we samen aan jouw website in Groningen",
  workflowSteps: [
    { title: "Kennismaking en doelen", desc: "We bespreken telefonisch of via video wat je onderneming in Groningen nodig heeft: meer aanvragen, een online kaart, een boekingssysteem of simpelweg een professionele uitstraling." },
    { title: "Ontwerp op maat", desc: "We ontwerpen een pagina die past bij je merk, zonder generiek sjabloon. Geen twee websites die we opleveren zien er hetzelfde uit." },
    { title: "Techniek en snelheid", desc: "De website wordt gebouwd op eigen techniek, geoptimaliseerd voor snelle laadtijden, ook op mobiel, wat in een drukke markt als Groningen het verschil maakt." },
    { title: "Livegang en controle", desc: "Voor livegang testen we de site op verschillende schermen en browsers, zodat er geen verrassingen zijn zodra klanten in Groningen de site bezoeken." },
    { title: "Beheer en servermonitoring", desc: "Na oplevering hosten we de website op eigen infrastructuur met servermonitoring, en via het klantenportaal houd je zelf grip op updates en aanvragen." },
  ],
  faqs: [
    { q: "Waarom is er zoveel concurrentie tussen webdesigners in Groningen?", a: "Groningen is een studentenstad met veel starters, wat ook zorgt voor veel aanbod aan webdesign. Wij onderscheiden ons door een beperkt aantal projecten tegelijk aan te nemen, zodat elke klant in Groningen persoonlijk contact en maatwerk krijgt in plaats van een sjabloon." },
    { q: "Kan ik als startende zzp'er in Groningen ook terecht bij AIMI?", a: "Zeker. We werken regelmatig met startende ondernemers die hun eerste professionele website laten maken. We denken mee over wat op dat moment het beste past bij je budget en fase." },
    { q: "Hoe lang duurt het om een website te laten maken in Groningen?", a: "Dat hangt af van de omvang van het project, maar na de kennismaking en het aanleveren van content werken we toe naar een realistische opleverdatum, die we vooraf met je afstemmen." },
    { q: "Wordt mijn website ook gevonden in Google?", a: "We bouwen elke website met aandacht voor techniek en structuur die zoekmachines goed kunnen lezen, zodat je vindbaarheid in Groningen en omgeving een stevige basis heeft." },
    { q: "Kan ik zelf tekst en foto's aanpassen na livegang?", a: "Via het klantenportaal houd je overzicht over je website en kun je aanvragen indienen voor aanpassingen, zonder dat je zelf hoeft te programmeren." },
    { q: "Bieden jullie ook hosting aan voor Groningse bedrijven?", a: "Ja, we hosten websites op eigen servers met monitoring, zodat je niet afhankelijk bent van losse externe hostingpartijen en er snel geschakeld kan worden bij storingen." },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Assen", href: "/website-laten-maken-assen" },
    { label: "Website laten maken Hoogezand", href: "/website-laten-maken-hoogezand" },
    { label: "Website laten maken Winschoten", href: "/website-laten-maken-winschoten" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["context", "businessTypes", "workflow", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-groningen")({
  head: () => ({
    meta: [
      { title: "Website laten maken in Groningen | AIMI" },
      {
        name: "description",
        content:
          "Op zoek naar een webdesigner in Groningen? AIMI bouwt snelle, maatwerk websites met persoonlijke aanpak, eigen hosting en servermonitoring.",
      },
      { name: "geo.region", content: "NL-GR" },
      { name: "geo.placename", content: "Groningen" },
      { property: "og:title", content: "Website laten maken in Groningen | AIMI" },
      {
        property: "og:description",
        content: "Snelle, professionele websites voor ondernemers in Groningen. Maatwerk, geen sjablonen.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken in Groningen | AIMI" },
      {
        name: "twitter:description",
        content: "Snelle, professionele websites voor ondernemers in Groningen. Maatwerk, geen sjablonen.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        name: "Website laten maken in Groningen",
        description: "Webdesign en websites op maat voor ondernemers in Groningen, inclusief hosting en beheer.",
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Groningen", "Groningen"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Groningen", "/website-laten-maken-groningen"],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
