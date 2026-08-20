import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServicePageData } from "@/components/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, howToJsonLd, offeringsJsonLd, SITE_URL, OG_IMAGE_URL } from "@/lib/seo";
import { RedDiagonalBackground } from "@/components/rodeachtergrond";

const URL = `${SITE_URL}/webshop-laten-maken`;

const data: ServicePageData = {
  kicker: "E-commerce op maat",
  h1: "Webshop laten maken",
  intro:
    "Online verkopen zonder gedoe. AIMI bouwt verkoopklare webshops voor ondernemers en ZZP'ers met veilige betaalmethodes, een simpel productbeheer en een ontwerp dat bezoekers naar de kassa leidt. Snel, betrouwbaar en volledig in eigen beheer, zodat je je kunt richten op verkopen.",
  offerings: [
    {
      title: "Verkoopklaar ontwerp",
      desc: "Een webshop die vertrouwen wekt en bezoekers soepel naar de afrekenpagina leidt.",
      details: [
        "Een productpagina-indeling die is opgebouwd rond conversie: duidelijke productfoto's, overtuigende beschrijvingen en een opvallende 'in winkelwagen'-knop.",
        "Vertrouwenselementen zoals reviews, keurmerken en duidelijke verzend- en retourinformatie, zodat twijfelende bezoekers toch afrekenen.",
        "Een opgeruimd afrekenproces in zo min mogelijk stappen, zodat je minder bezoekers verliest vlak voor de aankoop.",
        "Volledig responsive design, getest op telefoon, tablet en desktop, want het merendeel van je bezoekers shopt via mobiel.",
      ],
    },
    {
      title: "Veilig afrekenen",
      desc: "iDEAL, creditcard en meer via een betrouwbare betaalprovider.",
      details: [
        "Koppeling met een erkende Nederlandse betaalprovider, zodat transacties veilig en PCI-DSS-compliant verlopen.",
        "Ondersteuning voor iDEAL, creditcard, Bancontact en desgewenst Klarna of PayPal.",
        "Automatische orderbevestigingen en betaalstatussen, zodat jij en je klant altijd weten waar een bestelling staat.",
        "SSL-beveiliging standaard inbegrepen, zichtbaar via het slotje in de browser voor extra vertrouwen bij je klanten.",
      ],
    },
    {
      title: "Eenvoudig productbeheer",
      desc: "Beheer producten, prijzen, voorraad en bestellingen zonder technische kennis.",
      details: [
        "Een overzichtelijke beheeromgeving waarin je zelf producten toevoegt, wijzigt of tijdelijk offline haalt.",
        "Voorraadbeheer met automatische waarschuwingen bij lage voorraad, zodat je nooit per ongeluk verkoopt wat je niet hebt.",
        "Bestellingenoverzicht met status (nieuw, verzonden, afgerond) en de mogelijkheid om facturen en pakbonnen te printen.",
        "Kortingscodes en actieprijzen instellen zonder tussenkomst van een developer.",
      ],
    },
    {
      title: "Klaar voor groei",
      desc: "Schaalbaar opgezet zodat je assortiment mee kan groeien met je bedrijf.",
      details: [
        "Technisch zo opgezet dat honderden producten en categorieën probleemloos toegevoegd kunnen worden.",
        "Uitbreidbaar met extra functionaliteit zoals kortingsacties, klantaccounts of een loyaliteitsprogramma wanneer je daar klaar voor bent.",
        "Snelle laadtijden blijven behouden naarmate je assortiment groeit, dankzij moderne, geoptimaliseerde techniek.",
        "Eenvoudig te koppelen aan marketingtools zoals Google Ads en Meta-pixels voor verdere groei.",
      ],
    },
  ],
  steps: [
    { title: "Kennismaking & briefing", desc: "We brengen je producten, doelgroep en verkoopdoelen in kaart." },
    { title: "Ontwerp & structuur", desc: "We ontwerpen de shop en bepalen de indeling van categorieën en pagina's." },
    { title: "Bouwen & koppelen", desc: "We bouwen de shop, koppelen betaalmethodes en richten het productbeheer in." },
    { title: "Testen & livegang", desc: "We testen het volledige bestelproces en zetten de shop live op onze hosting." },
  ],
  priceLabel: "op aanvraag",
  priceNote: "Webshops zijn maatwerk. Vertel ons over je assortiment en je krijgt een passende, vaste offerte.",
  related: [
    { label: "Website laten maken", href: "/website-laten-maken" },
    { label: "Onderhoud & hosting", href: "/onderhoud-hosting" },
    { label: "Onze werkwijze", href: "/werkwijze" },
  ],
  ctaTitle: "Klaar om online te verkopen?",
  ctaText: "Vertel ons over je producten en plannen. Je krijgt binnen één werkdag een reactie en een vrijblijvende offerte.",
  examples: [
    { src: "/voorbeelden/voorbeeld-webshop-1-keramiek.webp", alt: "Voorbeeld webshop voor een keramiekmerk" },
    { src: "/voorbeelden/voorbeeld-webshop-2-streetwear.webp", alt: "Voorbeeld webshop voor een streetwearmerk" },
    { src: "/voorbeelden/voorbeeld-webshop-3-koffie.webp", alt: "Voorbeeld webshop voor een koffiemerk" },
  ],
};

export const Route = createFileRoute("/webshop-laten-maken")({
  head: () => ({
    meta: [
      { title: "Webshop laten maken | Verkoopklaar & op maat — AIMI" },
      {
        name: "description",
        content:
          "Webshop laten maken door AIMI? Verkoopklare webshops op maat met iDEAL en eenvoudig productbeheer, voor ondernemers en ZZP'ers.",
      },
      { property: "og:title", content: "Webshop laten maken — AIMI" },
      { property: "og:description", content: "Verkoopklare webshops op maat met veilige betaalmethodes en simpel productbeheer." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Webshop laten maken — AIMI" },
      { name: "twitter:description", content: "Verkoopklare webshops op maat met veilige betaalmethodes en simpel productbeheer." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        name: "Webshop laten maken",
        serviceType: "E-commerce ontwikkeling",
        description: "Verkoopklare webshops op maat voor kleine ondernemers en ZZP'ers.",
        url: URL,
      }),
      breadcrumbJsonLd([["Home", "/"], ["Webshop laten maken", "/webshop-laten-maken"]]),
      howToJsonLd({
        name: "Zo werkt het: webshop laten maken bij AIMI",
        description: "Het proces van kennismaking tot livegang van je webshop.",
        steps: data.steps,
      }),
      offeringsJsonLd({ name: "Wat je krijgt bij een webshop van AIMI", offerings: data.offerings }),
    ],
  }),
  component: () => (
    <>
      <RedDiagonalBackground />
      <ServicePage data={data} />
    </>
  ),
});