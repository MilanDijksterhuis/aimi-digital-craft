import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-cateringbedrijf`;

const data: BranchPageData = {
  branch: "cateringbedrijf",
  h1: "Webdesign voor catering: van aanvraag tot offerte",
  kicker: "Webdesign voor catering",
  intro:
    "Catering verkoopt geen product maar een belofte: dat het op de dag zelf goed geregeld is. Iemand die een bruiloft, een personeelsfeest of een uitvaart laat verzorgen, neemt een risico dat hij vooraf niet kan controleren. Een website voor je cateringbedrijf moet dat risico kleiner laten voelen, en tegelijk zorgen dat aanvragen binnenkomen met genoeg informatie om er een offerte op te maken.",
  needsHeading: "Wat een cateringwebsite moet regelen",
  needsBody: [
    "Het aanvraagformulier is het hart van de site. Een cateringofferte hangt op een handvol gegevens: het type gelegenheid, de datum, het aantal personen, de locatie en het soort bediening. Vraag je die niet uit, dan begint elk contact met drie e-mails heen en weer. Vraag je te veel, dan haakt iemand af die nog aan het oriënteren is. Wij zoeken die balans en houden het formulier kort maar bruikbaar.",
    "Daarnaast moet je site meteen duidelijk maken welk soort catering je doet. Een bedrijf dat broodjes en lunches bij kantoren bezorgt, is iets heel anders dan een partij die een walking dinner voor honderd gasten verzorgt. Als een bezoeker dat niet binnen een paar seconden ziet, krijg je aanvragen waar je niets mee kunt en missen de juiste klanten je.",
    "Prijsindicaties helpen enorm, ook als je met maatwerk werkt. Een vanaf-bedrag per persoon per formule geeft mensen houvast en voorkomt dat je offertes maakt voor budgetten die er niet zijn. Je hoeft geen volledige prijslijst te publiceren; een richtprijs met de uitleg wat het bedrag beïnvloedt, is genoeg.",
  ],
  pitfallsHeading: "Veelgemaakte fouten bij websites van cateraars",
  pitfallsBody: [
    "Veel cateringsites tonen prachtige foto's maar vertellen niet wat ze precies leveren. Komt er personeel mee, wordt er afgewassen, hoort serviesgoed erbij, hoe zit het met dieetwensen en allergenen? Dat zijn de vragen waar iemand op afhaakt of juist over de streep gaat. Ze horen op de site te staan, niet pas in gesprek.",
    "Een tweede probleem is beschikbaarheid. Catering is extreem seizoensgebonden en piekt rond feestdagen en het bruiloftsseizoen. Een site die niet aangeeft hoe ver van tevoren je geboekt wilt worden, of dat een bepaalde periode al vol zit, levert aanvragen op die je moet afwijzen. Dat kost jou tijd en de aanvrager een teleurstelling.",
    "Tot slot zien we sites waarop referenties ontbreken. Bij een dienst die je vooraf niet kunt uitproberen, is het oordeel van eerdere klanten je belangrijkste bewijs. Een paar concrete reacties, het liefst met het type gelegenheid erbij, doen meer dan welke omschrijving van je eigen vakmanschap ook.",
  ],
  approachHeading: "Zo pakken we het aan",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken welk type catering je doet, van zakelijke lunches tot bruiloften, en welke klussen je het liefst binnenhaalt." },
    { title: "Formules helder maken", desc: "We geven elke vorm van catering een eigen plek met eigen tekst, zodat bezoekers meteen zien of ze bij je passen." },
    { title: "Aanvraagformulier bouwen", desc: "We richten het formulier zo in dat je gelegenheid, datum, aantal personen en locatie binnenkrijgt zonder mensen af te schrikken." },
    { title: "Verwachtingen vastleggen", desc: "We zetten praktische zaken als personeel, servies, allergenen en boekingstermijn duidelijk op de site." },
    { title: "Livegang en beheer", desc: "Na livegang beheer je zelf je formules, richtprijzen en drukke periodes; wij verzorgen hosting en monitoring." },
  ],
  pricingHeading: "Wat kost een website voor een cateringbedrijf",
  pricingBody: [
    "Voor de meeste cateraars werkt een meerpagina-site goed: een homepage, een pagina per type catering, een pagina met praktische informatie en veelgestelde vragen, referenties en een uitgebreider aanvraagformulier. Dat valt doorgaans binnen ons Pro-pakket.",
    "Wil je dat klanten online een vaste formule kunnen afrekenen, bijvoorbeeld standaard lunchpakketten voor bedrijven, dan schuift het richting een webshop en wordt het maatwerk. Dat prijzen we apart en spreken we vooraf af, zodat de kosten geen verrassing zijn.",
  ],
  faqs: [
    { q: "Welke gegevens moet mijn aanvraagformulier uitvragen?", a: "In de praktijk red je het met vijf: type gelegenheid, datum, aantal personen, locatie en het gewenste soort bediening. Daarmee kun je vrijwel altijd een eerste inschatting maken zonder eerst te bellen." },
    { q: "Moet ik prijzen vermelden als ik alles op maat doe?", a: "Een vanaf-bedrag per persoon per formule is bijna altijd verstandig. Het geeft mensen houvast en voorkomt dat je tijd steekt in offertes voor budgetten die niet aansluiten." },
    { q: "Kan ik aangeven dat een periode volgeboekt is?", a: "Ja. We bouwen een plek in waar je zelf kunt melden dat bijvoorbeeld december vol zit of dat je een bepaalde minimale boekingstermijn hanteert. Dat scheelt je aanvragen die je toch moet afwijzen." },
    { q: "Hoe ga ik om met allergenen en dieetwensen op de site?", a: "Zet op de site dat je ermee werkt en hoe je het uitvraagt, maar publiceer geen dichtgetimmerde allergenenlijst per gerecht als je met maatwerk werkt. Het is beter om dat per opdracht vast te leggen dan een lijst te hebben die veroudert." },
    { q: "Kan ik zelf foto's van opdrachten toevoegen?", a: "Ja, via het klantenportaal. Vraag wel altijd toestemming aan de opdrachtgever voordat je foto's van een besloten gelegenheid publiceert, zeker bij bruiloften en uitvaarten." },
    { q: "Kan ik zakelijke en particuliere catering op één site combineren?", a: "Dat kan prima, mits je ze duidelijk scheidt. Het zijn twee verschillende bezoekers met andere vragen en andere budgetten, dus ze krijgen elk een eigen pad in plaats van één gemengde pagina." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website laten maken restaurant", href: "/website-laten-maken-restaurant" },
    { label: "Webshop laten maken", href: "/webshop-laten-maken" },
    { label: "Tarieven", href: "/tarieven" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["needs", "approach", "pricing", "pitfalls", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-cateringbedrijf")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je cateringbedrijf | AIMI" },
      { name: "description", content: "Website voor je cateringbedrijf met een aanvraagformulier dat bruikbare offerteaanvragen oplevert, heldere formules en richtprijzen." },
      { property: "og:title", content: "Website laten maken voor je cateringbedrijf | AIMI" },
      { property: "og:description", content: "Webdesign voor cateraars: duidelijke formules, richtprijzen en aanvragen met genoeg informatie voor een offerte." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je cateringbedrijf | AIMI" },
      { name: "twitter:description", content: "Webdesign voor cateraars: duidelijke formules, richtprijzen en aanvragen met genoeg informatie voor een offerte." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je cateringbedrijf",
          serviceType: "Webdesign",
          description: "Websites op maat voor cateringbedrijven, met heldere formules, richtprijzen en een bruikbaar aanvraagformulier.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([["Home", "/"], ["Branches", "/branches"], ["Website laten maken voor je cateringbedrijf", "/website-laten-maken-cateringbedrijf"]]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
