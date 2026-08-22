import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-autobedrijf`;

const data: BranchPageData = {
  branch: "autobedrijf",
  h1: "Een website waarop je occasions verkopen",
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
    { title: "Kennismaking", desc: "We bespreken de verhouding tussen verkoop en werkplaats in je bedrijf, hoeveel auto's je gemiddeld in voorraad hebt en of je al met een occasionsysteem werkt." },
    { title: "Voorraad en koppeling", desc: "We bepalen hoe de auto's binnenkomen: handmatig via het portaal, of gekoppeld aan het systeem dat je al gebruikt, zodat je niets dubbel invoert." },
    { title: "Twee ingangen bouwen", desc: "Verkoop en werkplaats krijgen elk een eigen pad, met eigen tekst en een eigen actie: bezichtiging aanvragen of een afspraak voor onderhoud." },
    { title: "Snelheid en foto's", desc: "We richten de fotoverwerking zo in dat grote afbeeldingen automatisch verkleind worden, zodat de voorraadpagina ook op mobiel snel blijft." },
    { title: "Livegang en beheer", desc: "Na livegang host je bij AIMI met monitoring, en kun je zelf auto's toevoegen, aanpassen en op verkocht zetten." },
  ],
  pricingHeading: "Wat kost een website voor een autobedrijf",
  pricingBody: [
    "Een autowebsite valt bijna altijd buiten de standaardpakketten, omdat het voorraadgedeelte maatwerk is: het aantal auto's, de filters en een eventuele koppeling met je bestaande systeem bepalen het werk. Een site met een handmatig beheerde voorraad is aanzienlijk eenvoudiger dan een site die automatisch synchroniseert met een occasionplatform.",
    "We bespreken dat vooraf en geven daarna een vaste prijs, zodat je niet halverwege voor verrassingen komt te staan. Op onze tarievenpagina zie je waar onze prijzen beginnen; voor een autobedrijf maken we op basis van je voorraad en wensen een concrete offerte.",
  ],
  faqs: [
    { q: "Kan mijn bestaande occasionvoorraad gekoppeld worden?", a: "Vaak wel. Werk je met een systeem dat een export of koppeling aanbiedt, dan kunnen we je auto's automatisch laten doorstromen naar de site, zodat je ze maar één keer invoert. We kijken bij de kennismaking welke mogelijkheden jouw systeem biedt." },
    { q: "Kan ik zelf auto's toevoegen en op verkocht zetten?", a: "Ja. Dat is juist het belangrijkste onderdeel: via het klantenportaal voeg je een auto met foto's toe en zet je hem met één handeling op verkocht. Hoe sneller dat gaat, hoe actueler je voorraad blijft." },
    { q: "Kunnen klanten online een APK of onderhoudsafspraak maken?", a: "Dat kunnen we inbouwen. Vaak begint het eenvoudig met een formulier waarin iemand kenteken, gewenste dienst en een voorkeursmoment doorgeeft, zodat jij het inplant. Een volledige agendakoppeling kan ook, maar is niet voor elk bedrijf nodig." },
    { q: "Hoeveel foto's per auto zijn verstandig?", a: "In de praktijk werkt zes tot tien foto's per occasion goed: buitenkant van meerdere kanten, interieur, kilometerteller en eventuele gebruikssporen. Eerlijk fotograferen scheelt je bovendien teleurgestelde bezichtigingen." },
    { q: "Blijft de site snel met veel auto's erop?", a: "Daar richten we de site specifiek op in. Afbeeldingen worden automatisch verkleind en de voorraadpagina laadt auto's stapsgewijs, zodat het aantal occasions de snelheid niet opeet." },
    { q: "Kan ik ook alleen de werkplaats online zetten?", a: "Zeker. Niet elk autobedrijf verkoopt occasions. Doe je vooral onderhoud, APK en reparatie, dan bouwen we een compactere site die volledig op die diensten en op bereikbaarheid is gericht." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website laten maken autorijschool", href: "/website-laten-maken-autorijschool" },
    { label: "Website laten maken klusbedrijf", href: "/website-laten-maken-klusbedrijf" },
    { label: "Tarieven", href: "/tarieven" },
    { label: "Neem contact op", href: "/contact" },
  ],
  sectionOrder: ["needs", "pitfalls", "approach", "pricing", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-autobedrijf")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je autobedrijf | AIMI" },
      { name: "description", content: "Website voor je autobedrijf met een actuele occasionvoorraad, een eigen ingang voor de werkplaats en snelle foto's op mobiel." },
      { property: "og:title", content: "Website laten maken voor je autobedrijf | AIMI" },
      { property: "og:description", content: "Webdesign voor autobedrijven: doorzoekbare occasionvoorraad, werkplaatsafspraken en snelle laadtijden." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je autobedrijf | AIMI" },
      { name: "twitter:description", content: "Webdesign voor autobedrijven: doorzoekbare occasionvoorraad, werkplaatsafspraken en snelle laadtijden." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je autobedrijf",
          serviceType: "Webdesign",
          description: "Websites op maat voor autobedrijven, met een doorzoekbare occasionvoorraad, werkplaatsafspraken en eigen hosting.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([["Home", "/"], ["Branches", "/branches"], ["Website laten maken voor je autobedrijf", "/website-laten-maken-autobedrijf"]]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
