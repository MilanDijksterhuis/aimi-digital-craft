import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed } from "@/lib/seo";

const CITY = "Hoogeveen";
const PATH = "/website-laten-maken-hoogeveen";
const URL = `https://aimi-development.nl${PATH}`;
const TITLE = "Website laten maken in Hoogeveen | AIMI Webdesign";
const DESCRIPTION =
  "Zoek je een webdesigner in Hoogeveen? AIMI bouwt en host snelle websites voor ondernemers in Zuid-Drenthe. Persoonlijk contact, vanaf € 499.";

const data: LocationPageData = {
  city: CITY,
  region: "Drenthe",
  kicker: "Webdesign in Hoogeveen",
  intro:
    "Hoogeveen is een van de grotere kernen van Drenthe en fungeert als verzorgingscentrum voor een flink gebied eromheen. AIMI ontwerpt, bouwt en host websites voor ondernemers die het hier van die regiofunctie moeten hebben: goed vindbaar voor mensen uit de wijde omgeving, en snel genoeg om ze niet kwijt te raken voordat de pagina geladen is.",
  businessTypesHeading: "Welke Hoogeveense bedrijven hebben wat aan een nieuwe website?",
  businessTypesBody:
    "Hoogeveen combineert een levendige detailhandel in het centrum met bedrijvigheid op de bedrijventerreinen aan de rand van de stad. Voor winkels, horeca en behandelpraktijken bouwen we websites waarop bezoekers direct vinden wat ze zoeken: openingstijden, aanbod en een manier om contact te leggen zonder te hoeven zoeken. Voor productie-, installatie- en handelsbedrijven met een regionale of landelijke klantenkring ligt de nadruk juist op een heldere presentatie van diensten en machines, en op een site die serieus overkomt bij een inkoper die drie leveranciers naast elkaar legt.",
  contextHeading: "Online opvallen in een stad met een streekfunctie",
  contextBody: [
    "De ligging van Hoogeveen aan de A28 en A37 heeft de stad tot een logistiek gunstig punt gemaakt, en dat zie je terug in het soort bedrijven dat er zit. Tegelijk trekt het centrum bezoekers uit een ruime omtrek, want veel omliggende dorpen hebben zelf beperkt voorzieningen. Voor ondernemers levert dat een specifieke uitdaging op: je concurreert niet alleen met de zaak twee straten verderop, maar ook met bedrijven in Emmen, Assen en Meppel die dezelfde regionale klant proberen te bereiken.",
    "Vindbaarheid is daarmee geen bijzaak. Iemand die vanuit een dorp zoekt naar een dienstverlener, doet dat vrijwel altijd op zijn telefoon, en klikt zelden verder dan de eerste resultaten. Een website die traag laadt of op mobiel rommelig oogt, verliest die bezoeker voordat je aanbod überhaupt in beeld is gekomen. Wij bouwen daarom zonder zware page builders, met lichte techniek en een structuur die zoekmachines goed kunnen lezen — dat is de basis waarop vindbaarheid rust.",
    "Wat we niet doen, is beloften verkopen over posities in Google. Wat we wel kunnen garanderen is de kant die in onze hand ligt: een technisch schone site, korte laadtijden, hosting op eigen infrastructuur die we zelf monitoren, en korte lijnen als er iets moet veranderen. Voor een ondernemer in Hoogeveen betekent dat vooral rust: je hoeft niet zelf uit te zoeken hoe hosting, updates of certificaten werken.",
  ],
  workflowHeading: "Van eerste gesprek tot livegang",
  workflowSteps: [
    {
      title: "Uitzoeken wat je nodig hebt",
      desc: "We bespreken je bedrijf, je klanten en of je vooral lokaal of juist regionaal gevonden wilt worden.",
    },
    {
      title: "Opzet en vormgeving",
      desc: "We bepalen de paginastructuur en ontwerpen de site in een stijl die past bij je vak, niet in een kant-en-klaar jasje.",
    },
    {
      title: "Technische realisatie",
      desc: "De website wordt gebouwd met snelle, moderne techniek en getest op mobiel, waar de meeste bezoekers vandaan komen.",
    },
    {
      title: "Livegang",
      desc: "Na een laatste controle van formulieren, weergave en snelheid zetten we de site live.",
    },
    {
      title: "Beheer daarna",
      desc: "Hosting en servermonitoring lopen via ons; wijzigingen dien je in via het klantenportaal.",
    },
  ],
  faqs: [
    {
      q: "Is AIMI ook in Hoogeveen gevestigd?",
      a: "Nee, ons kantoor staat in Veendam. We werken wel voor ondernemers in Hoogeveen en Zuid-Drenthe; overleg gaat telefonisch of via video, en waar dat nuttig is komen we langs.",
    },
    {
      q: "Hoe zorgen jullie dat ik gevonden word door mensen uit de dorpen rond Hoogeveen?",
      a: "Door de site technisch schoon en snel op te leveren en de inhoud zo in te richten dat duidelijk is wat je doet en voor wie. Dat is de basis; verdere groei in vindbaarheid komt uit content en tijd.",
    },
    {
      q: "Wat kost een website in Hoogeveen?",
      a: "De prijs hangt af van de omvang: het aantal pagina's en of er extra functionaliteit bij komt. Onze tarievenpagina geeft een startpunt en na een gesprek volgt een concrete offerte.",
    },
    {
      q: "Kan ik mijn bestaande website laten vernieuwen in plaats van opnieuw beginnen?",
      a: "Vaak wel. We kijken eerst wat er staat: soms is de inhoud prima en is vooral de techniek verouderd, soms is opnieuw opbouwen goedkoper dan lappen.",
    },
    {
      q: "Verhuizen jullie ook mijn domeinnaam en e-mail?",
      a: "Ja, de overstap naar onze hosting regelen wij, inclusief domein en e-mail, zodat je zo min mogelijk merkt van de overgang.",
    },
    {
      q: "Wie regelt updates en beveiliging na livegang?",
      a: "Dat doen wij. De site draait op onze eigen servers met monitoring, zodat problemen opvallen voordat jij ze merkt.",
    },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Meppel", href: "/website-laten-maken-meppel" },
    { label: "Website laten maken Emmen", href: "/website-laten-maken-emmen" },
    { label: "Website laten maken Assen", href: "/website-laten-maken-assen" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["businessTypes", "context", "workflow", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-hoogeveen")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "geo.region", content: "NL-DR" },
      { name: "geo.placename", content: "Hoogeveen" },
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
      // Service i.p.v. LocalBusiness: AIMI heeft alleen een vestiging in Veendam.
      serviceJsonLd({
        name: "Website laten maken in Hoogeveen",
        description: DESCRIPTION,
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Hoogeveen", "Drenthe"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Hoogeveen", PATH],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
