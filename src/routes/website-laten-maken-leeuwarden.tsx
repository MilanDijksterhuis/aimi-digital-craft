import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed} from "@/lib/seo";

const CITY = "Leeuwarden";
const REGION = "Friesland";
const PATH = "/website-laten-maken-leeuwarden";
const URL = `${SITE_URL}${PATH}`;

const data: LocationPageData = {
  city: CITY,
  h1: "Webdesign in Leeuwarden, hoofdstad van Friesland",
  region: REGION,
  kicker: "Webdesign in Leeuwarden",
  intro:
    "Als hoofdstad van Friesland heeft Leeuwarden een brede en diverse ondernemersbasis: van culturele instellingen en horeca tot zzp'ers, adviesbureaus en maakbedrijven. AIMI bouwt voor die ondernemers snelle, professionele websites, inclusief hosting en onderhoud, zodat je online net zo scherp voor de dag komt als je onderneming dat verdient.",
  contextHeading: "Website laten maken in Leeuwarden: waarom lokaal maatwerk telt",
  contextBody: [
    "Leeuwarden is als hoofdstad van Friesland een stad met een ongewoon brede economische basis voor haar omvang. Naast overheidsinstellingen en onderwijs is er een levendige culturele sector, mede dankzij het jaar als Culturele Hoofdstad van Europa, die de stad blijvend op de kaart heeft gezet als plek waar creativiteit en ondernemerschap samenkomen. Die combinatie zie je terug in het soort bedrijven dat er zit: van musea en theaters tot horeca, retail, zorgpraktijken en zakelijke dienstverleners.",
    "Voor een webdesigner in Leeuwarden betekent dat maatwerk. Een culturele instelling heeft andere prioriteiten dan een advocatenkantoor: de een wil bezoekers verleiden met beeld en verhaal, de ander wil vooral snel en betrouwbaar overkomen. AIMI bouwt websites op basis van wat jouw bedrijf nodig heeft, niet op basis van een vast sjabloon dat voor iedereen hetzelfde is. We kijken naar je doelgroep, je aanbod en de manier waarop mensen in Leeuwarden en de wijde regio naar je op zoek gaan.",
    "Wat daarbij niet verandert, is de technische basis. Iedere website die we opleveren draait op eigen infrastructuur die wij zelf beheren en monitoren, is gebouwd met moderne technologie gericht op laadsnelheid, en is vanaf de eerste regel code opgezet met zoekmachinevindbaarheid in het achterhoofd. Zo sta je als ondernemer in Leeuwarden niet alleen mooi op je scherm, maar ook goed vindbaar in Google.",
  ],
  businessTypesHeading: "Voor wie in Leeuwarden bouwen we websites",
  businessTypesBody:
    "We werken voor uiteenlopende ondernemers in Leeuwarden: van culturele en creatieve organisaties die een verhaal willen vertellen, tot horecazaken die willen dat bezoekers eenvoudig een menukaart of reservering vinden, tot dienstverleners en adviesbureaus die vooral geloofwaardigheid en snelheid nodig hebben. Ook lokale retailers en zzp'ers die een eigen webshop of portfolio willen, kunnen bij AIMI terecht voor een website die aansluit op hun manier van werken, met een overzichtelijk klantenportaal om voortgang en aanpassingen te volgen.",
  workflowHeading: "Zo werken we samen aan jouw website in Leeuwarden",
  workflowSteps: [
    { title: "Kennismaking en analyse", desc: "We bespreken je doelen, doelgroep en concurrenten in Leeuwarden en de regio, en brengen in kaart wat je website moet kunnen presteren." },
    { title: "Ontwerp op maat", desc: "Op basis van jouw huisstijl en branche stellen we een ontwerp op dat past bij hoe je bedrijf zich wil presenteren, geen kant-en-klaar sjabloon." },
    { title: "Bouw en techniek", desc: "We bouwen de website met moderne, snelle technologie en zetten de basis voor zoekmachinevindbaarheid direct goed neer." },
    { title: "Testen en livegang", desc: "Voor livegang testen we snelheid, weergave op verschillende apparaten en formulieren, zodat alles bij lancering foutloos werkt." },
    { title: "Hosting en onderhoud", desc: "Na livegang hosten en monitoren we je website zelf, met een klantenportaal waarin je inzicht hebt in status en aanpassingen." },
  ],
  faqs: [
    { q: "Wat kost een website laten maken in Leeuwarden?", a: "De prijs hangt af van de omvang en functionaliteit van je website. In een vrijblijvend gesprek bekijken we samen wat je nodig hebt en stellen we een passende offerte op, zonder verrassingen achteraf." },
    { q: "Werkt AIMI ook voor culturele en creatieve organisaties in Leeuwarden?", a: "Ja. We hebben ervaring met het bouwen van websites die beeld en verhaal centraal stellen, wat goed aansluit bij de culturele sector die in Leeuwarden sterk vertegenwoordigd is." },
    { q: "Kan ik zelf tekst en beeld aanpassen na livegang?", a: "Ja, je krijgt toegang tot een beheeromgeving waarmee je zelf content kunt bijwerken. Voor grotere aanpassingen staan we via het klantenportaal en persoonlijk contact voor je klaar." },
    { q: "Hoe snel is een website van AIMI?", a: "We bouwen met moderne technologie en hosten op eigen, gemonitorde infrastructuur, met laadsnelheid als vast aandachtspunt bij elk project." },
    { q: "Bouwen jullie ook webshops voor ondernemers in Leeuwarden?", a: "Ja, naast informatieve websites bouwen we ook webshops, afgestemd op het aanbod en de schaal van je onderneming." },
    { q: "Wanneer kan mijn website live staan?", a: "Dat verschilt per project, maar na de kennismaking geven we een realistische planning zodat je weet wanneer je website live gaat." },
    { q: "Bieden jullie ook onderhoud en hosting aan na livegang?", a: "Ja, hosting, servermonitoring en onderhoud zijn standaard onderdeel van onze dienstverlening, zodat je na livegang niet alleen komt te staan." },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Drachten", href: "/website-laten-maken-drachten" },
    { label: "Website laten maken Heerenveen", href: "/website-laten-maken-heerenveen" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["context", "workflow", "businessTypes", "faq"],
};

const TITLE = "Website laten maken in Leeuwarden | AIMI";
const DESCRIPTION = "Professioneel webdesign voor Leeuwarden: snelle websites op maat voor culturele organisaties, horeca en het brede Friese MKB, gebouwd door AIMI.";

export const Route = createFileRoute("/website-laten-maken-leeuwarden")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      // A-45: deze vier Friese pagina's misten de geo-meta die de 11 andere
      // plaatspagina's wel hadden. Google gebruikt ze niet, maar een set die
      // half is ingevuld is een onderhoudssignaal.
      { name: "geo.region", content: "NL-FR" },
      { name: "geo.placename", content: "Leeuwarden" },
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
        name: "Website laten maken in Leeuwarden",
        description: DESCRIPTION,
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Leeuwarden", "Friesland"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Leeuwarden", PATH],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
