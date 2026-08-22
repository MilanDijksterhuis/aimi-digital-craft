import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-restaurant`;

const data: BranchPageData = {
  branch: "restaurant",
  h1: "Website laten maken voor je restaurant",
  kicker: "Webdesign voor horeca",
  intro:
    "Voor een restaurantwebsite geldt een ongemakkelijke waarheid: de meeste bezoekers komen met een heel klein vraagje. Zijn jullie vanavond open, wat staat er op de kaart, en kan ik een tafel voor vier krijgen. Alles wat tussen die vraag en het antwoord staat, kost je een reservering. Een goede horecasite is daarom vooral snel en kort, niet groots.",
  needsHeading: "Wat een restaurantwebsite echt moet kunnen",
  needsBody: [
    "Openingstijden en de menukaart zijn samen goed voor het overgrote deel van alle bezoeken. Ze horen dus direct zichtbaar te zijn, zonder klikken en zonder scrollen. Vooral op mobiel, want mensen kijken onderweg of aan tafel bij iemand anders. Een menukaart die alleen als PDF te downloaden is, is hier de klassieke misser: dat leest voor geen meter op een telefoon en zoekmachines kunnen er nauwelijks iets mee.",
    "Reserveren moet in een paar tikken kunnen. Werk je al met een reserveringssysteem, dan bouwen we dat netjes in zodat het bij je huisstijl past in plaats van als een vreemd blok in de pagina te hangen. Werk je met de telefoon, dan zorgen we dat het nummer op mobiel aantikbaar is en altijd binnen bereik blijft terwijl iemand de kaart doorleest.",
    "Beeld doet in de horeca het overtuigingswerk, maar het is ook het grootste snelheidsprobleem. Sfeerfoto's van het pand en de gerechten verkopen je zaak, en tegelijk zijn het precies de bestanden die een site traag maken. We verkleinen en optimaliseren die foto's automatisch, zodat je zaak er goed uitziet zonder dat iemand op 4G staat te wachten.",
  ],
  pitfallsHeading: "Wat er vaak misgaat bij horecawebsites",
  pitfallsBody: [
    "Verouderde informatie is in deze branche schadelijker dan een lelijk ontwerp. Een kerstmenu dat er in maart nog staat, of afwijkende openingstijden rond feestdagen die niemand heeft bijgewerkt, leidt tot mensen die voor een dichte deur staan. Dat kost je niet één bezoek maar een klant. We richten het beheer daarom zo in dat tijden en kaart in een minuut aan te passen zijn.",
    "Een tweede fout is een zware intro-animatie of een grote video op de homepage. Het ziet er in een presentatie prachtig uit, maar het staat tussen de bezoeker en het antwoord op zijn vraag. Wie wil weten of je vanavond open bent, wacht niet op een filmpje van een pan die staat te pruttelen.",
    "Tot slot wordt de eigen website vaak verwaarloosd omdat 'alles toch via social media gaat'. Het probleem is dat je op die platforms geen eigenaar bent van je vindbaarheid: iemand die in Google zoekt naar een restaurant in jouw plaats, komt daar niet vanzelf terecht. Je site is de enige plek waar jij de regie hebt over wat er staat.",
  ],
  approachHeading: "Zo pakken we het aan",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken het type zaak, of je met reserveringen werkt en welke informatie je gasten het vaakst bellen om te vragen." },
    { title: "De kern vooropzetten", desc: "Openingstijden, kaart en reserveren krijgen de eerste plek, zodat de meest gestelde vragen direct beantwoord zijn." },
    { title: "Menukaart als echte pagina", desc: "We zetten de kaart om in leesbare tekst in plaats van een PDF, zodat hij op mobiel prettig leest en vindbaar is." },
    { title: "Beeld en snelheid", desc: "We optimaliseren je sfeer- en gerechtfoto's zodat de site snel blijft, ook op een mobiele verbinding." },
    { title: "Livegang en beheer", desc: "Na livegang pas je zelf kaart, prijzen en afwijkende openingstijden aan; wij verzorgen hosting en monitoring." },
  ],
  pricingHeading: "Wat kost een website voor een restaurant",
  pricingBody: [
    "Veel restaurants zijn goed geholpen met een compacte site: openingstijden, de kaart, sfeerbeeld, route en reserveren. Dat past regelmatig binnen ons Starter- of Pro-pakket, afhankelijk van het aantal pagina's en of je de kaart zelf wilt kunnen beheren.",
    "Heb je meerdere vestigingen, een aparte lunchkaart en dinerkaart, een zaal voor groepen of een cadeaubonnenverkoop, dan groeit het naar maatwerk. We bespreken dat vooraf en zetten er een vaste prijs op. Op de tarievenpagina zie je waar we beginnen.",
  ],
  faqs: [
    { q: "Kan ik mijn menukaart zelf aanpassen?", a: "Ja, en dat is bij horeca essentieel. Kaarten en prijzen wijzigen te vaak om daar telkens iemand voor te moeten bellen. Via het klantenportaal pas je gerechten, prijzen en openingstijden zelf aan." },
    { q: "Mag ik mijn kaart als PDF gebruiken?", a: "Het kan, maar we raden het af. Een PDF leest slecht op een telefoon en zoekmachines kunnen de gerechten er nauwelijks uit halen. Als echte pagina is je kaart beter leesbaar én beter vindbaar. Een downloadbare PDF ernaast kan altijd nog." },
    { q: "Kan mijn reserveringssysteem worden ingebouwd?", a: "Meestal wel. De meeste reserveringssystemen bieden een blok dat we in je eigen vormgeving kunnen plaatsen, zodat het geen los element wordt. We kijken bij de kennismaking naar het systeem dat je gebruikt." },
    { q: "Heb ik nog een website nodig als ik actief ben op social media?", a: "Ja. Op social media heb je geen grip op je vindbaarheid en geen eigendom van je informatie. Mensen die in Google zoeken naar eten in jouw plaats, vinden daar je socials meestal niet. Je site is de plek waar jij bepaalt wat er staat." },
    { q: "Hoe zorgen jullie dat de site snel blijft met veel foto's?", a: "We verkleinen en converteren afbeeldingen automatisch naar moderne formaten en laden ze pas in wanneer ze nodig zijn. Zo blijft de zaak er goed uitzien zonder dat de pagina traag wordt." },
    { q: "Kunnen jullie ook afhaal of bezorging inbouwen?", a: "Dat kan, maar dan wordt het een webshop-achtig traject met betalingen en bestelbeheer. Dat is maatwerk en bespreken we apart, omdat het qua omvang echt iets anders is dan een informatieve horecasite." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website laten maken cateringbedrijf", href: "/website-laten-maken-cateringbedrijf" },
    { label: "Webshop laten maken", href: "/webshop-laten-maken" },
    { label: "Tarieven", href: "/tarieven" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["needs", "pitfalls", "approach", "faq", "pricing"],
};

export const Route = createFileRoute("/website-laten-maken-restaurant")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je restaurant | AIMI" },
      { name: "description", content: "Website voor je restaurant met openingstijden, een leesbare menukaart en reserveren binnen een paar tikken. Snel op mobiel, zelf te beheren." },
      { property: "og:title", content: "Website laten maken voor je restaurant | AIMI" },
      { property: "og:description", content: "Webdesign voor horeca: openingstijden en kaart vooraan, snel op mobiel en zelf bij te werken." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je restaurant | AIMI" },
      { name: "twitter:description", content: "Webdesign voor horeca: openingstijden en kaart vooraan, snel op mobiel en zelf bij te werken." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je restaurant",
          serviceType: "Webdesign",
          description: "Websites op maat voor restaurants en horeca, met openingstijden, een leesbare menukaart en reserveren.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([["Home", "/"], ["Branches", "/branches"], ["Website laten maken voor je restaurant", "/website-laten-maken-restaurant"]]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
