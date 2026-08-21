import { createFileRoute } from "@tanstack/react-router";
import { BranchPage, type BranchPageData } from "@/components/BranchPage";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken-schilder`;

const data: BranchPageData = {
  branch: "schildersbedrijf",
  kicker: "Webdesign voor schilders",
  intro:
    "Bij een schildersbedrijf overtuigt afgewerkt werk het meest, maar bezoekers willen ook snel begrijpen wat je precies doet: binnen, buiten, of beide. Een website voor je schildersbedrijf laat je vakwerk zien en maakt het makkelijk om vrijblijvend een offerte aan te vragen voor een concrete klus.",
  needsHeading: "Wat een website voor een schildersbedrijf moet kunnen",
  needsBody: [
    "Voor een schildersbedrijf is het onderscheid tussen binnen- en buitenschilderwerk belangrijk om vroeg op de website te maken, want het zijn vaak andere klanten met andere vragen: iemand die de kozijnen buiten wil laten schilderen zoekt anders dan iemand die een interieur wil laten opfrissen. Wij richten die twee als aparte, duidelijk herkenbare onderdelen in, zodat bezoekers meteen bij de juiste informatie uitkomen.",
    "Projectfoto's van eerder afgewerkt werk zijn voor een schildersbedrijf net zo belangrijk als voor andere ambachtelijke vakken: ze laten precisie en afwerking zien op een manier die tekst niet kan. We bouwen een fotogalerij die snel laadt en die je zelf, via het klantenportaal, kunt aanvullen met nieuwe projecten.",
    "Een offerteaanvraag die vraagt naar het type werk, de oppervlakte en eventueel de staat van het huidige schilderwerk, geeft jou als schilder een compleet beeld voordat je langsgaat voor een opname. Dat scheelt tijd, en het geeft de bezoeker het gevoel dat hij serieus wordt genomen vanaf het eerste contactmoment.",
  ],
  pitfallsHeading: "Veelgemaakte fouten bij schildersbedrijf-websites",
  pitfallsBody: [
    "Een website zonder onderscheid tussen binnen- en buitenschilderwerk laat bezoekers zelf uitzoeken of hun klus wel bij je past. Dat kost aanvragen, vooral bij bezoekers die snel willen weten of een schilder ook interieurwerk doet naast de gevel.",
    "Ook zien we vaak dat er weinig wordt uitgelegd over werkwijze en materialen, terwijl dat voor veel klanten juist vertrouwen wekt: welke voorbereiding gebeurt er, met welk soort verf wordt gewerkt, en hoe lang duurt een gemiddeld project. Een website die dat kort en concreet toelicht, overtuigt beter dan alleen een fotogalerij.",
    "Een derde valkuil is geen rekening houden met seizoensplanning: buitenschilderwerk is sterk afhankelijk van het weer en de tijd van het jaar. Een website die daar niets over zegt, laat kansen liggen om bezoekers op het juiste moment naar de juiste dienst te sturen.",
  ],
  approachHeading: "Zo werken we het uit",
  approachSteps: [
    { title: "Kennismaking", desc: "We bespreken de verhouding tussen binnen- en buitenschilderwerk in je bedrijf, en welke projecten het beste laten zien wat je kunt." },
    { title: "Structuur en foto's", desc: "We richten een heldere indeling in met een fotogalerij van afgewerkte projecten, gescheiden naar type werk." },
    { title: "Werkwijze en materialen", desc: "We schrijven een kort, concreet stuk over hoe je te werk gaat en met welke materialen, om vertrouwen te wekken bij nieuwe klanten." },
    { title: "Offerteformulier", desc: "We bouwen een offerteformulier dat vraagt naar het type werk en de oppervlakte, zodat je gericht kunt reageren." },
    { title: "Livegang en beheer", desc: "Na livegang host je de website bij AIMI met servermonitoring, en beheer je via het klantenportaal zelf nieuwe projectfoto's." },
  ],
  pricingHeading: "Wat kost een website voor een schildersbedrijf",
  pricingBody: [
    "De prijs van een website voor een schildersbedrijf hangt af van de omvang: een compacte site met projectgalerij en offerteformulier vraagt minder werk dan een uitgebreide site met aparte pagina's voor binnen- en buitenschilderwerk en een toelichting op werkwijze en materialen. Via het offerteformulier geef je aan wat je nodig hebt, waarna we een reactie geven die past bij de daadwerkelijke omvang.",
    "Onze tarieven staan als startpunt op de pricing-pagina. Voor de meeste schildersbedrijven is een site met een aantal vaste pagina's en een goed gevulde fotogalerij voldoende; wie binnen- en buitenwerk allebei breed wil uitlichten, kiest vaak voor een groter pakket. Dat bespreken we altijd vooraf, zodat er geen verrassingen ontstaan.",
  ],
  faqs: [
    { q: "Kan de website onderscheid maken tussen binnen- en buitenschilderwerk?", a: "Ja, we richten dat standaard als aparte onderdelen in, zodat bezoekers meteen bij de juiste informatie en offerteknop uitkomen." },
    { q: "Ik maak regelmatig nieuwe projecten af, kan de galerij meegroeien?", a: "Ja, dat regel je via het klantenportaal: je dient een aanvraag in en wij verwerken de nieuwe foto's, zonder dat je zelf hoeft te programmeren." },
    { q: "Kan de offerteaanvraag rekening houden met oppervlakte?", a: "Ja, we richten het formulier zo in dat bezoekers een indicatie van de oppervlakte kunnen doorgeven, zodat je gerichter kunt reageren." },
    { q: "Hoeveel kost een website voor mijn schildersbedrijf?", a: "De prijs verschilt per project, bijvoorbeeld door het aantal pagina's en of je materiaal- en werkwijze-uitleg opneemt. Bekijk de tarievenpagina als startpunt of vraag een offerte aan." },
    { q: "Kan ik uitleggen welke verf en materialen ik gebruik?", a: "Zeker, we nemen een kort stuk over werkwijze en materialen op, wat bij veel klanten vertrouwen wekt voordat ze contact opnemen." },
    { q: "Werken jullie in een specifieke regio?", a: "We werken voor schildersbedrijven in Noord-Nederland, en richten de website in op het werkgebied dat voor jouw bedrijf klopt." },
    { q: "Wordt mijn schildersbedrijf gevonden op zoektermen als 'schilder website laten maken'?", a: "De technische basis (snelheid, structuur, leesbare pagina's) leggen we goed neer, zodat zoekmachines de site kunnen doorgronden. Vindbaarheid bouw je daarna verder op met content en tijd." },
  ],
  related: [
    { label: "Alle branches", href: "/branches" },
    { label: "Website laten maken klusbedrijf", href: "/website-laten-maken-klusbedrijf" },
    { label: "Website laten maken hovenier", href: "/website-laten-maken-hovenier" },
    { label: "Webdesign", href: "/webdesign" },
    { label: "Website laten maken", href: "/website-laten-maken" },
  ],
  sectionOrder: ["needs", "pricing", "pitfalls", "approach", "faq"],
};

export const Route = createFileRoute("/website-laten-maken-schilder")({
  head: () => ({
    meta: [
      { title: "Website laten maken voor je schilder | AIMI" },
      { name: "description", content: "Website voor je schildersbedrijf: onderscheid binnen/buiten, projectfoto's en een offerteformulier op maat." },
      { property: "og:title", content: "Website laten maken voor je schilder | AIMI" },
      { property: "og:description", content: "Webdesign voor schildersbedrijven, met fotogalerij, werkwijze en offerteaanvraag." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken voor je schilder | AIMI" },
      { name: "twitter:description", content: "Webdesign voor schildersbedrijven, met fotogalerij, werkwijze en offerteaanvraag." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website laten maken voor je schildersbedrijf",
          serviceType: "Webdesign",
          description: "Websites op maat voor schildersbedrijven, met projectgalerij, offerteformulier en eigen hosting.",
          url: URL,
          provider: { "@id": ORG_ID },
        }),
      },
      breadcrumbJsonLd([["Home", "/"], ["Branches", "/branches"], ["Website laten maken voor je schilder", "/website-laten-maken-schilder"]]),
    ],
  }),
  component: () => <BranchPage data={data} />,
});
