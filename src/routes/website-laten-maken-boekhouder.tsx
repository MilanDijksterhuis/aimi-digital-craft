import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-boekhouder`;

const data: BranchPageData = {
  branch: "administratiekantoor",
  h1: "Een website die je boekhoudkantoor serieus laat overkomen",
  kicker: "Webdesign voor boekhouders",
  intro:
    "Wie een boekhouder zoekt, doet dat meestal omdat het knelt: de aangifte komt eraan, de vorige boekhouder reageert niet, of de administratie is uit de hand gelopen. Die bezoeker zoekt geen mooie woorden over 'financieel partnerschap', maar een duidelijk antwoord op drie vragen: doe je wat ik nodig heb, wat kost het ongeveer, en kan ik je vertrouwen met mijn cijfers.",
  needsHeading: "Wat een website voor een administratiekantoor moet doen",
  needsBody: [
    "Begin bij de doelgroep, niet bij de dienst. Een zzp'er met één bankrekening heeft iets heel anders nodig dan een bv met personeel en een loonadministratie. Als je site alle diensten op één hoop gooit, moet elke bezoeker zelf uitzoeken of hij bij je past. We splitsen dat daarom op naar type ondernemer, zodat iemand zichzelf herkent en meteen de juiste informatie leest.",
    "Prijsindicaties zijn in deze branche een onderscheidend middel. Veel kantoren zwijgen erover, waardoor ondernemers ervan uitgaan dat het duur en ondoorzichtig is. Een maandbedrag vanaf-prijs per type klant, met daarbij wat er wél en niet in zit, levert je betere gesprekken op en filtert de aanvragen die toch niet passen.",
    "Vertrouwen bouw je hier op met concrete dingen, niet met adjectieven. Welke boekhoudsoftware je gebruikt, of je aangesloten bent bij een beroepsorganisatie, hoe snel je gemiddeld reageert, en wie de persoon is die je stukken ziet. Dat zijn de signalen waarop ondernemers een kantoor kiezen, en ze staan verrassend vaak nergens.",
  ],
  pitfallsHeading: "Veelgemaakte fouten bij boekhouderswebsites",
  pitfallsBody: [
    "De meest voorkomende fout is een site vol vakjargon en abstracte beloften. 'Wij ontzorgen u volledig' zegt letterlijk niets, en het staat op de site van elk kantoor in Nederland. Concreet opschrijven wat je maandelijks doet, wat de klant zelf moet aanleveren en wanneer, werkt beter dan welke slogan ook.",
    "Een tweede probleem is dat de overstap onbesproken blijft. De meeste nieuwe klanten hebben al een boekhouder en zien vooral op tegen het gedoe van wisselen. Als je uitlegt hoe een overstap verloopt, wat je van de oude boekhouder nodig hebt en dat het ook midden in het jaar kan, neem je de grootste drempel weg.",
    "Ten derde: veel kantoren behandelen hun site als een digitaal visitekaartje dat na oplevering nooit meer verandert. Juist in deze branche verandert er ieder jaar iets aan regelgeving en tarieven. Een site met verouderde bedragen erop werkt averechts, want je verkoopt nu precies actualiteit en nauwkeurigheid.",
  ],
  approachHeading: "Zo pakken we het aan",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken op welk type ondernemer je je richt, welke diensten je aanbiedt en met welke software je werkt." },
    { title: "Diensten opsplitsen", desc: "We geven de verschillende doelgroepen een eigen pad, zodat een zzp'er en een bv-eigenaar allebei het juiste verhaal lezen." },
    { title: "Prijzen en verwachtingen", desc: "We zetten prijsindicaties en de verdeling van taken helder neer, inclusief wat de klant zelf moet aanleveren." },
    { title: "Overstap wegnemen", desc: "We bouwen een pagina die precies uitlegt hoe overstappen van een andere boekhouder verloopt." },
    { title: "Livegang en beheer", desc: "Na livegang kun je tarieven en teksten zelf bijwerken; wij verzorgen hosting, back-ups en monitoring." },
  ],
  pricingHeading: "Wat kost een website voor een administratiekantoor",
  pricingBody: [
    "Voor de meeste administratiekantoren volstaat een meerpagina-site: een homepage, een pagina per doelgroep, een pagina over het kantoor en de mensen, een pagina over overstappen en een contactpagina met aanvraagformulier. Dat valt doorgaans binnen ons Pro-pakket.",
    "Wil je daarnaast een beveiligde omgeving waarin klanten stukken kunnen aanleveren, dan wordt het maatwerk. Dat is technisch goed te doen, maar vraagt extra aandacht voor beveiliging en bewaartermijnen, en dat prijzen we apart. Op de tarievenpagina zie je waar we beginnen.",
  ],
  faqs: [
    { q: "Moet ik tarieven op mijn website zetten?", a: "Een vanaf-prijs per type klant helpt vrijwel altijd. Veel ondernemers gaan er zonder prijsinformatie van uit dat het duur is en klikken door. Je hoeft geen volledige prijslijst te publiceren, wel een richting." },
    { q: "Kan ik een beveiligde omgeving krijgen waar klanten stukken uploaden?", a: "Dat kan, als maatwerk. We kijken dan expliciet naar wie toegang heeft, hoe lang bestanden bewaard blijven en hoe ze beveiligd worden opgeslagen. Voor veel kantoren is het overigens niet nodig, omdat hun boekhoudsoftware dat al biedt." },
    { q: "Kan de site koppelen met mijn boekhoudsoftware?", a: "Meestal is dat niet nodig: klanten werken direct in de software zelf. Wel verwijzen we er duidelijk naar, zodat bestaande klanten snel op de juiste plek belanden in plaats van jou te bellen." },
    { q: "Hoe help ik bezoekers over de drempel van het overstappen?", a: "Door het proces expliciet te beschrijven: dat het ook midden in het jaar kan, wat je van de vorige boekhouder nodig hebt en hoeveel werk het de klant zelf kost. Die pagina is bij boekhouders vaak de best gelezen pagina van de site." },
    { q: "Kan ik zelf teksten en bedragen aanpassen?", a: "Ja. In deze branche veranderen tarieven en regels jaarlijks, dus je moet dat zelf kunnen bijwerken zonder ons erbij te halen. Dat richten we in via het klantenportaal." },
    { q: "Werken jullie ook voor kantoren buiten de regio?", a: "Ja. We zitten in Veendam en werken veel in Noord-Nederland, maar het traject verloopt volledig op afstand. Het werkgebied op je site stemmen we af op waar jij klanten wilt hebben." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website laten maken makelaar", href: "/website-laten-maken-makelaar" },
    { label: "Onze werkwijze", href: "/werkwijze" },
    { label: "Tarieven", href: "/tarieven" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["needs", "approach", "pitfalls", "pricing", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-boekhouder")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je administratiekantoor | AIMI" },
      { name: "description", content: "Website voor je boekhoud- of administratiekantoor: opgesplitst per type ondernemer, met heldere prijsindicaties en een uitgelegde overstap." },
      { property: "og:title", content: "Website laten maken voor je administratiekantoor | AIMI" },
      { property: "og:description", content: "Webdesign voor boekhouders: concreet in plaats van jargon, met duidelijke tarieven en een lage overstapdrempel." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je administratiekantoor | AIMI" },
      { name: "twitter:description", content: "Webdesign voor boekhouders: concreet in plaats van jargon, met duidelijke tarieven en een lage overstapdrempel." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je administratiekantoor",
          serviceType: "Webdesign",
          description: "Websites op maat voor boekhouders en administratiekantoren, opgesplitst per doelgroep en met heldere tarieven.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([["Home", "/"], ["Branches", "/branches"], ["Website laten maken voor je administratiekantoor", "/website-laten-maken-boekhouder"]]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
