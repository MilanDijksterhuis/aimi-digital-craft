import { createFileRoute } from "@tanstack/react-router";
import { LocationPageV2, type LocationPageData } from "@/components/LocationPageV2";
import { SITE_URL, OG_IMAGE_URL, serviceJsonLd, breadcrumbJsonLd, cityAreaServed} from "@/lib/seo";

const CITY = "Roden";
const URL = `${SITE_URL}/website-laten-maken-roden`;
const TITLE = "Website laten maken in Roden | AIMI";
const DESCRIPTION =
  "Webdesigner in Roden gezocht? AIMI bouwt snelle, professionele websites voor ZZP'ers en mkb in Noordenveld.";

const data: LocationPageData = {
  city: CITY,
  region: "Drenthe",
  kicker: "Webdesign in Roden",
  intro:
    "Op zoek naar een webdesigner in Roden? AIMI ontwerpt, bouwt en host snelle, professionele websites voor ondernemers in Roden en de rest van gemeente Noordenveld. Persoonlijk contact, korte lijnen en een website die daadwerkelijk nieuwe klanten oplevert via Google.",
  contextHeading: "Webdesign voor ondernemers in Roden en Noordenveld",
  contextBody: [
    "Roden is de grootste kern van de gemeente Noordenveld en heeft een opvallend profiel: het is voor een groot deel forensendorp. Veel inwoners werken in Groningen, maar een substantieel deel van de lokale economie draait juist om mensen die vanuit huis of vanuit een kleine bedrijfsruimte in en rond Roden hun eigen bedrijf runnen. Die groep zelfstandigen — van adviseurs en coaches tot vakmensen in de bouw, zorg en dienstverlening — heeft andere eisen aan een website dan een winkel met een vaste laadstroom aan klanten. Een ZZP'er in Roden heeft een website nodig die 's avonds en in het weekend werk doet: duidelijk maken wat je doet, vertrouwen wekken en het makkelijk maken om contact op te nemen, zonder dat er de hele dag iemand achter de site hoeft te zitten.",
    "Wij merken in gesprekken met ondernemers uit Roden dat veel websites zijn blijven hangen bij het niveau van 'digitaal visitekaartje': een paar pagina's, een verouderd sjabloon en geen duidelijke koppeling met hoe iemand daadwerkelijk klant wordt. Dat is jammer, want de concurrentie om zichtbaar te zijn in Google is ook in een dorp als Roden reëel — zeker omdat veel zoekopdrachten van forensen en regionale klanten via Groningen en omliggende plaatsen lopen. Een website die technisch in orde is, snel laadt en helder communiceert wat je als ondernemer uniek maakt, maakt in die concurrentie het verschil.",
    "AIMI bouwt websites op maat, zonder gebruik te maken van zware page builders die de site vertragen. Voor een ZZP'er in Roden betekent dat een site die op een telefoon binnen een fractie van een seconde laadt, die overzichtelijk is opgebouwd rond je diensten en die zonder gedoe uit te breiden is als je aanbod groeit. Omdat we zelf hosten en monitoren, hoef je je geen zorgen te maken over updates, beveiliging of een site die 's nachts plat gaat — dat regelen wij.",
  ],
  businessTypesHeading: "Voor wie bouwen we websites in Roden?",
  businessTypesBody:
    "We werken voor zelfstandig ondernemers en kleine bedrijven in Roden: van zzp'ers in advies, coaching, zorg en persoonlijke dienstverlening tot vakmensen zoals installateurs, hoveniers en aannemers, en lokale winkels of praktijken die naast hun fysieke locatie ook online gevonden willen worden. Juist voor de forensen onder de Roder ondernemers — die vaak buiten kantooruren aan hun bedrijf werken — bouwen we websites die ook zonder dagelijks onderhoud goed blijven presteren: technisch stabiel, met heldere contactmogelijkheden en zonder afhankelijkheid van plugins die kunnen breken.",
  workflowHeading: "Zo werken we samen aan jouw website in Roden",
  workflowSteps: [
    {
      title: "Kennismaking en doelen bepalen",
      desc: "We bespreken telefonisch of via een videogesprek wat je met je website wilt bereiken: meer aanvragen, een professionelere uitstraling of simpelweg een werkende basis om vindbaar te zijn.",
    },
    {
      title: "Ontwerp op maat",
      desc: "Geen kant-en-klaar sjabloon, maar een ontwerp dat past bij jouw dienstverlening en doelgroep, opgebouwd rond een heldere structuur en duidelijke call-to-actions.",
    },
    {
      title: "Bouw en techniek",
      desc: "We bouwen de site met moderne, lichte techniek zodat laadtijden kort blijven — belangrijk voor zowel bezoekers als de vindbaarheid in Google.",
    },
    {
      title: "Testen en livegang",
      desc: "Voor livegang testen we de site op verschillende apparaten en schermformaten, zodat hij overal goed werkt, van desktop tot smartphone.",
    },
    {
      title: "Hosting, monitoring en klantenportaal",
      desc: "Na livegang hosten en monitoren we je website zelf. Via een eigen klantenportaal kun je inzicht houden in je website, zonder dat je hoeft uit te zoeken hoe alles technisch in elkaar zit.",
    },
  ],
  faqs: [
    {
      q: "Bouwen jullie ook websites voor ZZP'ers in Roden die vanuit huis werken?",
      a: "Ja. Een groot deel van onze klanten in de regio Noordenveld werkt als zelfstandige vanuit een thuiskantoor. We houden daar rekening mee door websites te bouwen die weinig onderhoud vragen en die ook buiten kantooruren goed blijven functioneren.",
    },
    {
      q: "Kan een website mij helpen klanten te bereiken buiten Roden, bijvoorbeeld in Groningen?",
      a: "Zeker. Omdat veel inwoners van Roden werk- en klantcontacten hebben richting Groningen, richten we de vindbaarheid van je website niet alleen op Roden zelf, maar ook op het bredere werkgebied dat voor jouw dienstverlening relevant is.",
    },
    {
      q: "Hoe lang duurt het om een website te laten maken?",
      a: "Dat hangt af van de omvang van het project, maar een gemiddelde website is binnen enkele weken te realiseren, van eerste gesprek tot livegang.",
    },
    {
      q: "Wat kost een website laten maken?",
      a: "De kosten zijn afhankelijk van je wensen en de omvang van de website. In een vrijblijvend gesprek bekijken we samen wat past bij jouw situatie en budget.",
    },
    {
      q: "Verzorgen jullie ook de hosting na livegang?",
      a: "Ja, wij hosten en monitoren de website zelf. Je hoeft dus niet zelf op zoek naar een aparte hostingpartij of technisch beheer.",
    },
    {
      q: "Kan ik zelf tekst en afbeeldingen aanpassen na livegang?",
      a: "Via het klantenportaal houd je overzicht over je website. Voor grotere aanpassingen kun je altijd bij ons terecht, zodat de site technisch en visueel in orde blijft.",
    },
  ],
  related: [
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Website laten maken Groningen", href: "/website-laten-maken-groningen" },
    { label: "Website laten maken Assen", href: "/website-laten-maken-assen" },
    { label: "Website laten maken Hoogezand", href: "/website-laten-maken-hoogezand" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["context", "workflow", "businessTypes", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-roden")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "geo.region", content: "NL-DR" },
      { name: "geo.placename", content: "Roden" },
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
        name: "Website laten maken in Roden",
        description: DESCRIPTION,
        url: URL,
        serviceType: "Webdesign",
        areaServed: cityAreaServed("Roden", "Drenthe"),
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Webdesign", "/webdesign"],
        ["Website laten maken in Roden", "/website-laten-maken-roden"],
      ]),
    ],
  }),
  component: () => <LocationPageV2 data={data} />,
});
