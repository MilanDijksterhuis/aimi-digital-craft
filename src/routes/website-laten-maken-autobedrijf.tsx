import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/seo";

const PATH = "/website-laten-maken-autobedrijf";
const URL = `${SITE_URL}${PATH}`;

const data: BranchPageData = {
  branch: "autobedrijf",
  path: PATH,
  summary: [
    "Een website voor je autobedrijf of garage doet twee dingen tegelijk: occasions verkopen én de werkplaats met APK, onderhoud en schadeherstel een eigen, duidelijke ingang geven.",
    "AIMI bouwt die site op maat en host hem zelf vanuit Veendam. Omdat het voorraadgedeelte maatwerk is, geven we vooraf een vaste prijs op basis van je aantal auto's en wensen.",
  ],
  h1: "Een website waarop je occasions verkoopt",
  kicker: "Webdesign voor autobedrijven",
  intro:
    "Een autobedrijf verkoopt twee dingen tegelijk: losse occasions én het vertrouwen dat je onderhoud en reparaties goed doet. Die twee vragen om een heel andere pagina. Een website voor je autobedrijf moet de voorraad actueel en doorzoekbaar tonen, en tegelijk duidelijk maken dat je APK, onderhoud en schadeherstel doet voor mensen die hun auto ergens anders gekocht hebben.",
  needsHeading: "Wat een website voor een autobedrijf moet kunnen",
  needsBody: [
    "Het zwaartepunt ligt bij de voorraad. Wie een occasion zoekt, filtert op merk, prijs, bouwjaar en kilometerstand, en wil per auto meteen de belangrijkste gegevens zien zonder eerst te bellen. Wij bouwen dat overzicht zo dat het snel laadt met tientallen auto's en veel foto's, want juist daar lopen veel autositen vast. Werk je al met een voorraadsysteem of een occasionplatform, dan koppelen we dat zodat je auto's niet dubbel hoeft in te voeren.",
    "Daarnaast heb je een tweede, volledig aparte bezoeker: iemand met een auto die stuk is of door de APK moet. Die persoon zoekt geen occasions, maar wil weten of je open bent, wat een APK kost en hoe snel je kunt kijken. Als die informatie verstopt zit onder het verkoopgedeelte, belt hij het volgende garagebedrijf. We geven werkplaats en verkoop daarom een eigen ingang met een eigen pagina.",
    "Foto's doen bij auto's meer dan tekst. Een occasion met acht scherpe foto's van buiten, binnen, de kilometerteller en het interieur verkoopt merkbaar makkelijker dan een auto met één schuine foto op een natte parkeerplaats. We zorgen dat je die foto's zelf kunt uploaden en dat ze automatisch worden verkleind, zodat de pagina snel blijft ook als je twintig auto's in de etalage hebt staan.",
  ],
  pitfallsHeading: "Wat er vaak misgaat bij autowebsites",
  pitfallsBody: [
    "De grootste fout is een voorraad die niet klopt. Auto's die al verkocht zijn maar nog online staan, of nieuwe auto's die er dagen niet op komen, kosten direct vertrouwen. Bezoekers gaan ervan uit dat de rest van de site dan ook niet klopt. Daarom richten we het beheer zo simpel mogelijk in: een auto op verkocht zetten moet iets van tien seconden kosten, anders gebeurt het niet.",
    "Een tweede probleem is een site die alleen op verkoop is gericht, terwijl de werkplaats vaak de stabielere omzet levert. Onderhoud, APK en banden leveren terugkerende klanten op, en dat zijn precies de zoekopdrachten waar je lokaal op gevonden kunt worden. Een autobedrijf dat die diensten niet duidelijk op de site heeft staan, laat dat liggen.",
    "Tot slot zien we vaak sites die zwaar zijn opgetuigd met sliders en video's van automerken, waardoor ze op een telefoon traag laden. Veel mensen kijken 's avonds op de bank naar occasions, op mobiel, soms met matig bereik. Als de eerste foto's er na vijf seconden nog niet staan, is die bezoeker weg voordat hij je voorraad heeft gezien.",
  ],
  approachHeading: "Zo pakken we het aan",
  approachSteps: [
    {
      title: "Kennismaking",
      desc: "We bespreken de verhouding tussen verkoop en werkplaats in je bedrijf, hoeveel auto's je gemiddeld in voorraad hebt en of je al met een occasionsysteem werkt.",
    },
    {
      title: "Voorraad en koppeling",
      desc: "We bepalen hoe de auto's binnenkomen: handmatig via het portaal, of gekoppeld aan het systeem dat je al gebruikt, zodat je niets dubbel invoert.",
    },
    {
      title: "Twee ingangen bouwen",
      desc: "Verkoop en werkplaats krijgen elk een eigen pad, met eigen tekst en een eigen actie: bezichtiging aanvragen of een afspraak voor onderhoud.",
    },
    {
      title: "Snelheid en foto's",
      desc: "We richten de fotoverwerking zo in dat grote afbeeldingen automatisch verkleind worden, zodat de voorraadpagina ook op mobiel snel blijft.",
    },
    {
      title: "Livegang en beheer",
      desc: "Na livegang host je bij AIMI met monitoring. Wil je auto's zelf beheren, dan bouwen we daar een eenvoudig voorraadbeheer voor in waarmee je een occasion toevoegt, aanpast of met één handeling op verkocht zet.",
    },
  ],
  pricingHeading: "Wat kost een website voor een autobedrijf",
  pricingBody: [
    "Een eenvoudige website voor je autobedrijf met voorraadoverzicht, contactgegevens en openingstijden begint bij € 499 eenmalig (Starter). Met een doorzoekbaar voertuigaanbod inclusief filters zit je eerder in het Pro-traject vanaf € 749. Een autowebsite valt bijna altijd buiten de standaardpakketten, omdat het voorraadgedeelte maatwerk is: het aantal auto's, de filters en een eventuele koppeling met je bestaande systeem bepalen het werk. Een site met een handmatig beheerde voorraad is aanzienlijk eenvoudiger dan een site die automatisch synchroniseert met een occasionplatform.",
    "We bespreken dat vooraf en geven daarna een vaste prijs, zodat je niet halverwege voor verrassingen komt te staan. Op onze tarievenpagina zie je waar onze prijzen beginnen; voor een autobedrijf maken we op basis van je voorraad en wensen een concrete offerte.",
  ],
  faqs: [
    {
      q: "Kan mijn bestaande occasionvoorraad gekoppeld worden?",
      a: "Vaak wel. Werk je met een systeem dat een export of koppeling aanbiedt, dan kunnen we je auto's automatisch laten doorstromen naar de site, zodat je ze maar één keer invoert. We kijken bij de kennismaking welke mogelijkheden jouw systeem biedt.",
    },
    {
      q: "Kan ik zelf auto's toevoegen en op verkocht zetten?",
      a: "Als je dat wilt, bouwen we daar een eenvoudig voorraadbeheer voor in: je voegt een auto met foto's toe en zet hem met één handeling op verkocht. Dat is maatwerk dat we per autobedrijf bouwen, los van het standaard klantenportaal voor wijzigingsverzoeken. Hoe sneller het beheer gaat, hoe actueler je voorraad blijft.",
    },
    {
      q: "Kunnen klanten online een APK of onderhoudsafspraak maken?",
      a: "Dat kunnen we inbouwen. Vaak begint het eenvoudig met een formulier waarin iemand kenteken, gewenste dienst en een voorkeursmoment doorgeeft, zodat jij het inplant. Een volledige agendakoppeling kan ook, maar is niet voor elk bedrijf nodig.",
    },
    {
      q: "Hoeveel foto's per auto zijn verstandig?",
      a: "In de praktijk werkt zes tot tien foto's per occasion goed: buitenkant van meerdere kanten, interieur, kilometerteller en eventuele gebruikssporen. Eerlijk fotograferen scheelt je bovendien teleurgestelde bezichtigingen.",
    },
    {
      q: "Blijft de site snel met veel auto's erop?",
      a: "Daar richten we de site specifiek op in. Afbeeldingen worden automatisch verkleind en de voorraadpagina laadt auto's stapsgewijs, zodat het aantal occasions de snelheid niet opeet.",
    },
    {
      q: "Kan ik ook alleen de werkplaats online zetten?",
      a: "Zeker. Niet elk autobedrijf verkoopt occasions. Doe je vooral onderhoud, APK en reparatie, dan bouwen we een compactere site die volledig op die diensten en op bereikbaarheid is gericht.",
    },
    {
      q: "Hoe lang duurt het bouwen van een website voor mijn autobedrijf?",
      a: "Een standaard website met voorraadoverzicht en contactinformatie staat gemiddeld binnen 2 tot 4 weken live, afhankelijk van hoe snel we je voertuigaanbod en foto's ontvangen.",
    },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website laten maken autorijschool", href: "/website-laten-maken-autorijschool" },
    { label: "Onderhoud en hosting", href: "/onderhoud-hosting" },
    { label: "Tarieven", href: "/tarieven" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["needs", "pitfalls", "approach", "pricing", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-autobedrijf")({
  head: () => ({
    meta: [
      { title: "Website autobedrijf of garage laten maken — occasions & APK | AIMI" },
      {
        name: "description",
        content:
          "Website voor je autobedrijf of garage: actuele occasionvoorraad, een aparte ingang voor werkplaats en APK, en snelle foto's op mobiel. Gebouwd door AIMI.",
      },
      { property: "og:title", content: "Website laten maken voor je autobedrijf | AIMI" },
      {
        property: "og:description",
        content:
          "Webdesign voor autobedrijven: doorzoekbare occasionvoorraad, werkplaatsafspraken en snelle laadtijden.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je autobedrijf | AIMI" },
      {
        name: "twitter:description",
        content:
          "Webdesign voor autobedrijven: doorzoekbare occasionvoorraad, werkplaatsafspraken en snelle laadtijden.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        name: "Website laten maken voor je autobedrijf",
        description:
          "Websites op maat voor autobedrijven en garages, met een doorzoekbare occasionvoorraad, werkplaatsafspraken en eigen hosting.",
        url: URL,
        serviceType: "Webdesign voor autobedrijven",
        areaServed: null,
      }),
      breadcrumbJsonLd([
        ["Home", "/"],
        ["Branches", "/branches"],
        ["Website laten maken voor je autobedrijf", PATH],
      ]),
      faqJsonLd(data.faqs),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
