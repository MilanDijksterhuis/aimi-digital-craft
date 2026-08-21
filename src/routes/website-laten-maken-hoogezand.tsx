import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed} from "@/lib/seo";

const CITY = "Hoogezand";
const URL = `${SITE_URL}/website-laten-maken-hoogezand`;

const data: LocationPageData = {
  city: CITY,
  region: "Groningen",
  kicker: "Webdesign in Hoogezand",
  intro:
    "Hoogezand, onderdeel van de gemeente Midden-Groningen, kent van oudsher een sterke maakindustrie en veel kleine zelfstandigen. AIMI bouwt vanuit de buurgemeente Veendam professionele websites voor ondernemers in Hoogezand die technisch in orde willen zijn zonder overbodige poespas.",
  workflowHeading: "Zo pakken we een website in Hoogezand aan",
  workflowSteps: [
    { title: "Kennismaking dichtbij huis", desc: "Omdat we vanuit Veendam werken, is de lijn met ondernemers in Hoogezand kort. We bespreken telefonisch of op locatie wat je nodig hebt." },
    { title: "Ontwerp gericht op je bedrijf", desc: "We ontwerpen een website die past bij het karakter van je onderneming, of dat nu een productiebedrijf, installateur of zzp'er is." },
    { title: "Techniek zonder omwegen", desc: "We bouwen zelf, zonder trage bouwpakketten, zodat de website snel laadt op zowel desktop als mobiel." },
    { title: "Testen en livegang", desc: "Voor livegang controleren we de website op verschillende apparaten, zodat klanten in Hoogezand meteen een goede eerste indruk krijgen." },
    { title: "Onderhoud en klantenportaal", desc: "Na oplevering hosten we de site op eigen servers met monitoring en beheer je aanvragen via het klantenportaal." },
  ],
  contextHeading: "Website laten maken vanuit de buurgemeente Veendam",
  contextBody: [
    "Hoogezand ligt in Midden-Groningen en heeft van oudsher een stevige industriële basis, met bedrijven in productie, techniek en installatie die vaak al jaren bestaan maar wiens website niet meer bij hun huidige niveau past. Bij dit type ondernemer draait het minder om trendy vormgeving en meer om duidelijkheid: wat doet het bedrijf, welke diensten of producten worden geleverd, en hoe neem je contact op.",
    "Naast de maakindustrie telt Hoogezand veel kleine zelfstandigen, van vakmensen tot dienstverleners, die vaak via mond-tot-mondreclame klanten krijgen maar steeds vaker merken dat nieuwe klanten eerst online zoeken voordat ze bellen. Een website die er verouderd uitziet of traag laadt, wekt dan niet het vertrouwen dat nodig is om die stap naar contact te zetten.",
    "Omdat AIMI in de directe buurgemeente Veendam gevestigd is, is de afstand tot Hoogezand letterlijk klein. Dat maakt persoonlijk contact eenvoudig, zonder dat een ondernemer hoeft te reizen naar een bureau verderop in het land. We bouwen elke website zelf, met eigen techniek en zonder onnodige plugins, zodat de site technisch gezond blijft, ook na verloop van jaren.",
  ],
  businessTypesHeading: "Voor wie we in Hoogezand websites bouwen",
  businessTypesBody:
    "In Hoogezand werken we voornamelijk voor bedrijven uit de maakindustrie, zoals metaalbewerkers, installateurs en technische dienstverleners, die behoefte hebben aan een overzichtelijke website met heldere diensteninformatie en een werkend contactformulier. Daarnaast bouwen we websites voor kleine zelfstandigen en vakmensen die hun eerste professionele website laten maken of een verouderde site vervangen. Voor beide groepen geldt dat een snelle, mobielvriendelijke website steeds belangrijker wordt, omdat ook in Hoogezand een groeiend deel van de potentiële klanten eerst op de telefoon zoekt naar een leverancier of dienstverlener voordat er telefonisch contact wordt gezocht.",
  faqs: [
    { q: "Werkt AIMI ook echt dichtbij als je in Hoogezand zit?", a: "Ja, we zijn gevestigd in de buurgemeente Veendam, wat betekent dat persoonlijk contact en eventueel een afspraak op locatie eenvoudig te regelen zijn." },
    { q: "Is AIMI geschikt voor bedrijven uit de maakindustrie in Hoogezand?", a: "We bouwen regelmatig websites voor technische bedrijven en installateurs die vooral behoefte hebben aan duidelijkheid over hun diensten en een goed werkend contactformulier." },
    { q: "Wat kost een website laten maken in Hoogezand?", a: "De prijs hangt af van de omvang van het project. Bekijk de tarieven op onze website of vraag een vrijblijvende offerte aan." },
    { q: "Kan ik mijn verouderde website laten vernieuwen?", a: "Zeker, we vervangen regelmatig bestaande websites die technisch verouderd zijn of niet meer goed werken op mobiel, met behoud van wat al goed werkte." },
    { q: "Hoe snel is mijn nieuwe website klaar?", a: "Na de kennismaking en het aanleveren van content stemmen we een realistische planning met je af, afgestemd op de omvang van het project." },
    { q: "Bieden jullie ook hosting aan voor bedrijven in Hoogezand?", a: "Ja, we hosten websites op eigen servers met monitoring, zodat storingen snel worden opgemerkt en de website betrouwbaar online blijft." },
    { q: "Kan ik zelf aanpassingen laten doorvoeren na livegang?", a: "Via het klantenportaal kun je eenvoudig aanpassingen aanvragen, zonder dat je zelf hoeft te programmeren." },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Veendam", href: "/website-laten-maken-veendam" },
    { label: "Website laten maken Groningen", href: "/website-laten-maken-groningen" },
    { label: "Website laten maken Stadskanaal", href: "/website-laten-maken-stadskanaal" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["workflow", "context", "businessTypes", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-hoogezand")({
  head: () => ({
    meta: [
      { title: "Website laten maken in Hoogezand | AIMI" },
      {
        name: "description",
        content:
          "Ondernemer in Hoogezand? AIMI, gevestigd in buurgemeente Veendam, bouwt snelle websites met eigen techniek en persoonlijk contact.",
      },
      { name: "geo.region", content: "NL-GR" },
      { name: "geo.placename", content: "Hoogezand" },
      { property: "og:title", content: "Website laten maken in Hoogezand | AIMI" },
      {
        property: "og:description",
        content: "Snelle, professionele websites voor ondernemers in Hoogezand en Midden-Groningen.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken in Hoogezand | AIMI" },
      {
        name: "twitter:description",
        content: "Snelle, professionele websites voor ondernemers in Hoogezand en Midden-Groningen.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        name: "Website laten maken in Hoogezand",
        description: "Webdesign en websites op maat voor ondernemers in Hoogezand en Midden-Groningen.",
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Hoogezand", "Groningen"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Hoogezand", "/website-laten-maken-hoogezand"],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
