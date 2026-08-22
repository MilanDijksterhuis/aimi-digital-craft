import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, ORG_ID, OG_IMAGE_URL, LOGO_URL, localBusinessId, breadcrumbJsonLd } from "@/lib/seo";

const CITY = "Veendam";
const PATH = "/website-laten-maken-veendam";
const URL = `${SITE_URL}${PATH}`;
const TITLE = "Website laten maken in Veendam | AIMI Webdesign";
const DESCRIPTION =
  "Webdesigner in Veendam nodig? AIMI zit hier zelf gevestigd en bouwt snelle websites voor ondernemers in Oost-Groningen. Persoonlijk contact, vanaf € 499.";

const data: LocationPageData = {
  city: CITY,
  h1: "Website laten maken in Veendam",
  region: "Groningen",
  kicker: "Webdesign vanuit Veendam",
  intro:
    "AIMI is gevestigd in Veendam. Dat maakt deze pagina anders dan de rest: voor ondernemers hier zijn we geen bureau op afstand, maar een partij uit dezelfde plaats. We ontwerpen, bouwen en hosten websites en webshops voor Veendammer ondernemers, en een kop koffie om de plannen door te nemen is letterlijk om de hoek.",
  contextHeading: "Waarom een webdesigner uit Veendam zelf verschil maakt",
  contextBody: [
    "Veendam is ontstaan als veenkolonie en heeft die nuchtere, praktische inslag nooit verloren. De plaats vervult tegelijk een streekfunctie voor Oost-Groningen: wie in de omliggende dorpen woont, komt hier voor winkels, zorg en voorzieningen. Dat betekent dat een Veendammer ondernemer vaak een klantenkring bedient die veel groter is dan de plaats zelf, maar die wel lokaal georiënteerd blijft. Een website moet dat dus allebei kunnen: dichtbij aanvoelen, en tegelijk gevonden worden door iemand uit een dorp verderop die op zijn telefoon zoekt.",
    "Omdat wij zelf in Veendam zitten, verloopt het traject anders dan wanneer je met een bureau in de Randstad werkt. Er is geen tijdverschil tussen een vraag en een antwoord, geen wachtrij van accountmanagers, en als het handiger is om even fysiek af te spreken dan doen we dat gewoon. Dat is geen marketingbelofte maar simpelweg het gevolg van waar we kantoor houden. Voor ondernemers die eerder slechte ervaringen hebben met een websitebouwer die na oplevering onbereikbaar werd, is dat vaak het doorslaggevende punt.",
    "Inhoudelijk verandert er niets aan hoe we bouwen. Elke website die we opleveren draait op onze eigen infrastructuur, die we zelf monitoren, en is gebouwd met lichte, moderne techniek in plaats van een zware page builder. Dat levert korte laadtijden op, ook op een mobiele verbinding buiten het centrum, en een technische basis waar zoekmachines goed doorheen komen. Na livegang beheer je aanpassingen via je eigen klantenportaal, zodat je altijd weet wat de status is.",
  ],
  businessTypesHeading: "Voor welke ondernemers in Veendam werken we?",
  businessTypesBody:
    "We bouwen websites voor de detailhandel en horeca in en rond het centrum, voor zorg- en behandelpraktijken, voor technische en industriële bedrijven op de bedrijventerreinen, en voor de vele zzp'ers en kleine mkb'ers die Veendam telt. Voor een winkel of praktijk ligt de nadruk meestal op vindbaarheid, openingstijden en een laagdrempelige manier om contact op te nemen. Voor technische bedrijven met klanten in de wijde regio draait het eerder om een heldere presentatie van wat je levert en aan wie, zodat een potentiële opdrachtgever binnen een paar seconden ziet of hij bij je aan het juiste adres is.",
  workflowHeading: "Hoe een website in Veendam bij ons tot stand komt",
  workflowSteps: [
    {
      title: "Kennismaking, desnoods aan tafel",
      desc: "We bespreken je plannen telefonisch, via video of gewoon op locatie — we zitten in dezelfde plaats, dus dat kost niemand een reisdag.",
    },
    {
      title: "Structuur en ontwerp",
      desc: "We bepalen welke pagina's je nodig hebt en ontwerpen een uitstraling die bij je bedrijf past, zonder standaardsjabloon.",
    },
    {
      title: "Bouwen op eigen techniek",
      desc: "De site wordt licht en snel gebouwd, zodat hij ook op een matige mobiele verbinding vlot laadt.",
    },
    {
      title: "Testen en live",
      desc: "We controleren weergave, formulieren en snelheid op verschillende apparaten voordat de site online gaat.",
    },
    {
      title: "Hosting, monitoring en portaal",
      desc: "Na livegang hosten en bewaken we de site zelf, en regel je wijzigingen via je klantenportaal.",
    },
  ],
  faqs: [
    {
      q: "Kan ik bij jullie langskomen in Veendam?",
      a: "Ja. We zijn hier gevestigd, dus een afspraak op locatie of bij jou op de zaak is prima te regelen. Voor veel ondernemers is dat prettiger dan alles via de mail afhandelen.",
    },
    {
      q: "Werken jullie ook voor ondernemers in de dorpen rond Veendam?",
      a: "Zeker. Veendam heeft een streekfunctie en dat geldt ook voor ons werkgebied: ondernemers uit de omliggende plaatsen zijn net zo goed welkom, en de werkwijze verandert er niet door.",
    },
    {
      q: "Wat kost een website laten maken in Veendam?",
      a: "Dat hangt af van wat je nodig hebt: het aantal pagina's, of er een webshop of boekingsfunctie bij komt. Op onze tarievenpagina staat een startpunt, en na een kort gesprek weet je waar je concreet aan toe bent.",
    },
    {
      q: "Mijn huidige site is traag op mobiel. Kunnen jullie dat verhelpen?",
      a: "Meestal wel. Trage laadtijden komen vaak door zware thema's en page builders. Wij bouwen zonder die ballast en hosten zelf, wat op mobiel doorgaans het grootste verschil maakt.",
    },
    {
      q: "Blijf ik na oplevering bij jullie terechtkunnen?",
      a: "Ja. Hosting, servermonitoring en onderhoud horen bij de dienstverlening, en via het klantenportaal dien je wijzigingen in. Je hoeft niet te zoeken naar wie je moet bellen.",
    },
    {
      q: "Bouwen jullie ook webshops voor Veendammer winkels?",
      a: "Ja, naast informatieve websites bouwen we webshops, afgestemd op de omvang van je assortiment en hoe je wilt verkopen.",
    },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Hoogezand", href: "/website-laten-maken-hoogezand" },
    { label: "Website laten maken Stadskanaal", href: "/website-laten-maken-stadskanaal" },
    { label: "Website laten maken Winschoten", href: "/website-laten-maken-winschoten" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["context", "workflow", "faq", "businessTypes"],
};

export const Route = createFileRoute("/website-laten-maken-veendam")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "geo.region", content: "NL-GR" },
      { name: "geo.placename", content: "Veendam" },
      { name: "geo.position", content: "53.1042;6.8778" },
      { name: "ICBM", content: "53.1042, 6.8778" },
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
      // Veendam is de enige echte vestiging: hier hoort het LocalBusiness-schema,
      // met het werkelijke adres en de werkelijke coordinaten.
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": localBusinessId(PATH),
          parentOrganization: { "@id": ORG_ID },
          name: "AIMI",
          description:
            "Webdesigner in Veendam. Websites, webshops, SEO en hosting voor ondernemers in Veendam en omgeving.",
          url: URL,
          image: LOGO_URL,
          email: "sales@aimi-development.nl",
          priceRange: "€€",
          areaServed: [
            { "@type": "City", name: "Veendam" },
            { "@type": "AdministrativeArea", name: "Groningen" },
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Veendam",
            addressRegion: "Groningen",
            addressCountry: "NL",
          },
          geo: { "@type": "GeoCoordinates", latitude: 53.1042, longitude: 6.8778 },
        }),
      },
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Veendam", PATH],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
