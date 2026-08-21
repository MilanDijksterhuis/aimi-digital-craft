import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-klusbedrijf`;

const data: BranchPageData = {
  branch: "klusbedrijf",
  kicker: "Webdesign voor klusbedrijven",
  intro:
    "Klanten van een klusbedrijf zoeken vaak vanaf hun telefoon, tussen andere dingen door, naar iemand die snel en breed inzetbaar is. Een website voor je klusbedrijf moet daarom vooral mobiel-first zijn: snel laden, direct duidelijk wat je doet, en een laagdrempelige manier om een klus aan te melden.",
  needsHeading: "Wat een website voor een klusbedrijf moet kunnen",
  needsBody: [
    "Het overgrote deel van de bezoekers van een klusbedrijf-website zoekt vanaf een telefoon, vaak op het moment dat er thuis iets kapot is of verbouwd moet worden. Dat betekent dat elke pagina snel moet laden en makkelijk te bedienen moet zijn met een duim, zonder inzoomen of eindeloos scrollen. Wij bouwen websites voor klusbedrijven met die realiteit als uitgangspunt, niet als extra check achteraf.",
    "Een overzicht van specialismen helpt bezoekers snel te zien of jij de juiste persoon bent voor hun klus: van badkamers en keukens tot kleine reparaties en onderhoud. Door dat overzicht helder te structureren, in plaats van alles in één lange tekst te proppen, vinden bezoekers sneller wat ze zoeken en stellen ze minder vaak de verkeerde vraag.",
    "Een offerteformulier met de mogelijkheid om een foto van de klus te uploaden maakt het voor jou als klusbedrijf makkelijker om vooraf in te schatten wat er nodig is, en voor de klant makkelijker om in één keer duidelijk te maken wat er aan de hand is. Dat scheelt over-en-weer gebel voordat er een concrete afspraak staat.",
  ],
  pitfallsHeading: "Wat er vaak misgaat bij klusbedrijf-websites",
  pitfallsBody: [
    "Een website die traag laadt op mobiel is voor een klusbedrijf een directe reden om aanvragen mis te lopen: iemand met een lekkende kraan of een kapotte deur wacht niet op een pagina die drie seconden nodig heeft om te tonen. Snelheid is bij dit type bedrijf geen bijzaak maar een randvoorwaarde.",
    "Een andere valkuil is een te lange lijst van diensten zonder duidelijke structuur, waardoor bezoekers niet snel zien of een specifieke klus wel bij je past. Overzicht en duidelijke categorieën werken beter dan een opsomming van twintig losse werkzaamheden onder elkaar.",
    "Ook ontbreekt vaak een duidelijk werkgebied. Niet iedereen wil ver rijden voor een kleine klus, dus bezoekers willen snel weten of jij in hun omgeving actief bent, zonder dat de website daarvoor een lange lijst met plaatsnamen hoeft op te sommen.",
  ],
  approachHeading: "Zo werken we het uit",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken welke klussen je het liefst doet en welk type klant je wilt aantrekken, van particulier onderhoud tot grotere verbouwingen." },
    { title: "Mobiel-first ontwerp", desc: "We ontwerpen eerst voor het telefoonscherm, omdat de meeste bezoekers van klusbedrijf-websites vanaf mobiel zoeken." },
    { title: "Specialismen overzichtelijk", desc: "We structureren je diensten in heldere categorieën, zodat bezoekers snel zien of hun klus bij je past." },
    { title: "Offerte met foto-upload", desc: "We bouwen een offerteformulier waarin een foto van de klus meegestuurd kan worden, zodat je vooraf een goed beeld hebt." },
    { title: "Livegang en beheer", desc: "Na livegang hosten we de website op eigen infrastructuur met servermonitoring, en via het klantenportaal beheer je zelf aanvragen en teksten." },
  ],
  pricingHeading: "Wat kost een website voor een klusbedrijf",
  pricingBody: [
    "Wat een website voor een klusbedrijf kost, hangt af van het aantal pagina's en de functionaliteit die je nodig hebt: een compacte site met dienstenoverzicht en offerteformulier is minder werk dan een uitgebreide site met aparte pagina's per specialisme. Via het offerteformulier geef je aan wat je ongeveer nodig hebt, waarna we een reactie geven die aansluit op de daadwerkelijke omvang.",
    "Onze tarieven staan als startpunt op de pricing-pagina. Voor de meeste klusbedrijven volstaat een site met een handvol pagina's, een duidelijk overzicht van specialismen en een offerteformulier met foto-upload; wie meerdere aparte diensten breed wil uitlichten, kiest vaak voor een uitgebreider pakket. We stemmen dat altijd vooraf met je af, zodat je precies weet waar je aan toe bent.",
  ],
  faqs: [
    { q: "Kunnen klanten een foto van hun klus meesturen bij een aanvraag?", a: "Ja, we bouwen het offerteformulier standaard met de mogelijkheid om een foto te uploaden, zodat jij vooraf een goed beeld hebt van de klus." },
    { q: "Is de website ook echt snel op mobiel?", a: "Snelheid op mobiel is voor een klusbedrijf-website een randvoorwaarde. We bouwen op eigen techniek en testen expliciet op mobiele laadtijden." },
    { q: "Kan ik meerdere specialismen apart laten zien?", a: "Ja, we richten een overzicht in waarin je specialismen los van elkaar zichtbaar zijn, zodat bezoekers snel zien of hun klus bij je past." },
    { q: "Hoeveel kost een website voor mijn klusbedrijf?", a: "Dat is afhankelijk van het aantal pagina's en of je een uitgebreid offerteformulier met foto-upload wilt. Bekijk de tarievenpagina voor een indicatie of vraag direct een offerte aan." },
    { q: "Wat als ik na livegang teksten wil aanpassen?", a: "Via het klantenportaal kun je aanvragen indienen voor tekstuele of visuele aanpassingen, zonder dat je zelf hoeft te programmeren." },
    { q: "Werken jullie landelijk of in een bepaalde regio?", a: "We werken voor klusbedrijven in Noord-Nederland, maar richten de website in op het werkgebied dat voor jouw bedrijf klopt." },
    { q: "Wordt mijn klusbedrijf gevonden op zoektermen als 'klusbedrijf website laten maken'?", a: "Een snelle, technisch schone site is de basis waarop Google kan vertrouwen. Wij zorgen dat die basis klopt; verdere groei in vindbaarheid hangt ook af van je content en tijd." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website laten maken hovenier", href: "/website-laten-maken-hovenier" },
    { label: "Website laten maken schilder", href: "/website-laten-maken-schilder" },
    { label: "Website laten maken loodgieter", href: "/website-laten-maken-loodgieter" },
    { label: "Webdesign", href: "/webdesign" },
  ],
  sectionOrder: ["pitfalls", "needs", "approach", "faq", "pricing"],
};

export const Route = createFileRoute("/website-laten-maken-klusbedrijf")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je klusbedrijf | AIMI" },
      { name: "description", content: "Mobiel-first website voor je klusbedrijf: overzicht van specialismen, offerte met foto-upload en snelle techniek." },
      { property: "og:title", content: "Website laten maken voor je klusbedrijf | AIMI" },
      { property: "og:description", content: "Webdesign voor klusbedrijven, gebouwd voor bezoekers die zoeken vanaf hun telefoon." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je klusbedrijf | AIMI" },
      { name: "twitter:description", content: "Webdesign voor klusbedrijven, gebouwd voor bezoekers die zoeken vanaf hun telefoon." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je klusbedrijf",
          serviceType: "Webdesign",
          description: "Mobiel-first websites voor klusbedrijven, met offerteformulier, foto-upload en eigen hosting.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([["Home", "/"], ["Branches", "/branches"], ["Website laten maken voor je klusbedrijf", "/website-laten-maken-klusbedrijf"]]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
