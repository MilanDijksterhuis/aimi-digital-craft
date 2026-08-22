import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-makelaar`;

const data: BranchPageData = {
  branch: "makelaarskantoor",
  h1: "Webdesign voor makelaars die opdrachten willen winnen",
  kicker: "Webdesign voor makelaars",
  intro:
    "Kopers vinden woningen op de grote huizenplatforms, niet op jouw website. Dat is geen probleem, zolang je site doet waar hij wél voor bedoeld is: verkopers overtuigen om jou de opdracht te geven. Een website voor je makelaarskantoor is in de eerste plaats een acquisitie-instrument, en pas daarna een etalage.",
  needsHeading: "Waar een makelaarswebsite echt voor dient",
  needsBody: [
    "De bezoeker die ertoe doet, is iemand die overweegt zijn huis te verkopen en drie makelaars in de buurt naast elkaar legt. Die persoon wil weten wat je courtage is, hoe je de woning in de markt zet en wat je recent in zijn straat of wijk hebt verkocht. Dat is de informatie die de opdracht bepaalt, en precies de informatie die op veel makelaarssites ontbreekt.",
    "Verkochte woningen zijn daarom je sterkste bewijsmateriaal. Niet als eindeloze lijst, maar als selectie die laat zien dat je in dit type woning en deze prijsklasse thuis bent. Iemand met een jaren-dertig woning wil zien dat je jaren-dertig woningen verkoopt. We bouwen dat overzicht zo dat je zelf een woning kunt toevoegen zodra hij is overgedragen.",
    "Een gratis waardebepaling is bij makelaars het meest gebruikte instapmoment, en dat werkt ook. De kunst zit in de drempel: vraag je alleen om een adres en een e-mailadres, dan vullen mensen het in. Vraag je om tien velden inclusief telefoonnummer en verkoopmotief, dan haken ze af. We houden dat formulier daarom bewust kort en laten het echte gesprek daarna plaatsvinden.",
  ],
  pitfallsHeading: "Wat er misgaat bij websites van makelaarskantoren",
  pitfallsBody: [
    "De grootste denkfout is de site inrichten als woningzoekmachine. Je gaat de grote platforms niet verslaan op zoeken en filteren, en elke euro die je daarin steekt levert nauwelijks iets op. Het aanbod hoort er wel te staan, maar als etalage en als bewijs van je activiteit, niet als het hoofdgerecht.",
    "Een tweede probleem is onpersoonlijkheid. Makelaardij is mensenwerk: verkopers kiezen een persoon, niet een logo. Sites met alleen stockfoto's van glimlachende onbekenden en een tekst over 'ontzorgen' zeggen niets. Laat zien wie er langskomt, hoe lang die persoon al in dit gebied werkt en wat hij van de lokale markt weet.",
    "Tot slot: veel makelaarssites zwijgen over kosten. Je hoeft geen vast tarief te publiceren als je dat niet wilt, maar volledige stilte over courtage wekt argwaan. Uitleggen hoe je tarief is opgebouwd en waar het ongeveer ligt, scheelt je bovendien gesprekken met mensen die iets heel anders zoeken.",
  ],
  approachHeading: "Zo pakken we het aan",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken je werkgebied, het type woningen waar je sterk in bent en of je vooral op verkoop, aankoop of taxatie zit." },
    { title: "Positionering", desc: "We bepalen waarmee je je onderscheidt van de andere kantoren in je plaats, en bouwen de site rond dat verhaal in plaats van rond het aanbod." },
    { title: "Bewijs verzamelen", desc: "We richten een overzicht van verkochte woningen in, plus ruimte voor ervaringen van verkopers die je zelf kunt aanvullen." },
    { title: "Waardebepaling inrichten", desc: "We bouwen een kort aanvraagformulier met een lage drempel, zodat het daadwerkelijk wordt ingevuld." },
    { title: "Livegang en beheer", desc: "Na livegang voeg je zelf woningen en ervaringen toe; wij verzorgen hosting, back-ups en monitoring." },
  ],
  pricingHeading: "Wat kost een website voor een makelaarskantoor",
  pricingBody: [
    "Voor een zelfstandig makelaarskantoor is een meerpagina-site meestal precies goed: een sterke homepage, een pagina over verkopen, een pagina over jou of het team, een overzicht van verkochte woningen en een aanvraagformulier voor de waardebepaling. Dat valt doorgaans binnen ons Pro-pakket.",
    "Wil je het actuele aanbod automatisch laten binnenkomen uit je bestaande vastgoedsysteem, dan is dat maatwerk en bepalen we de prijs nadat we weten welke koppeling jouw systeem aanbiedt. We spreken dat vooraf af, zodat je nooit achteraf een rekening krijgt die je niet zag aankomen.",
  ],
  faqs: [
    { q: "Heeft een eigen website nog zin als iedereen op de grote platforms kijkt?", a: "Ja, maar met een ander doel. Kopers vind je via de platforms; verkopers kiezen jou. Je website is het middel waarmee iemand die zijn huis wil verkopen besluit om jou te bellen in plaats van het kantoor verderop." },
    { q: "Kan mijn woningaanbod automatisch op de site komen?", a: "Vaak wel. Werk je met een vastgoedsysteem dat een koppeling of export aanbiedt, dan kunnen we het aanbod automatisch laten doorstromen. We kijken bij de kennismaking wat jouw systeem ondersteunt." },
    { q: "Moet ik mijn courtage op de site zetten?", a: "Dat hoeft niet, maar volledige stilte werkt tegen je. Uitleggen hoe je tarief is opgebouwd en waar het ongeveer ligt, wekt vertrouwen en scheelt je gesprekken met mensen die iets anders zoeken." },
    { q: "Kan ik zelf verkochte woningen toevoegen?", a: "Ja. Dat is juist belangrijk, want je referenties zijn je belangrijkste bewijs. Via het klantenportaal voeg je een woning met foto's toe zodra hij is overgedragen." },
    { q: "Werkt zo'n site ook voor aankoopmakelaardij of taxaties?", a: "Zeker. Dat zijn andere diensten met een andere bezoeker, dus die krijgen een eigen pagina met eigen tekst en een eigen aanvraagpad, in plaats van een voetnoot op de verkooppagina." },
    { q: "Kunnen jullie garanderen dat ik bovenaan kom op 'makelaar' plus mijn plaats?", a: "Nee, en dat belooft niemand die eerlijk is. We leggen een technisch gezonde basis en zorgen dat je pagina's inhoudelijk kloppen. Posities zijn daarna een kwestie van content, tijd en concurrentie." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website laten maken boekhouder", href: "/website-laten-maken-boekhouder" },
    { label: "Webdesign per regio", href: "/webdesign" },
    { label: "Tarieven", href: "/tarieven" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["needs", "pitfalls", "pricing", "approach", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-makelaar")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je makelaarskantoor | AIMI" },
      { name: "description", content: "Website voor je makelaarskantoor die verkopers overtuigt: verkochte woningen als bewijs, heldere tarieven en een waardebepaling met lage drempel." },
      { property: "og:title", content: "Website laten maken voor je makelaarskantoor | AIMI" },
      { property: "og:description", content: "Webdesign voor makelaars: acquisitie van verkoopopdrachten in plaats van concurreren met de grote huizenplatforms." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je makelaarskantoor | AIMI" },
      { name: "twitter:description", content: "Webdesign voor makelaars: acquisitie van verkoopopdrachten in plaats van concurreren met de grote huizenplatforms." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je makelaarskantoor",
          serviceType: "Webdesign",
          description: "Websites op maat voor makelaarskantoren, gericht op het winnen van verkoopopdrachten.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([["Home", "/"], ["Branches", "/branches"], ["Website laten maken voor je makelaarskantoor", "/website-laten-maken-makelaar"]]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
