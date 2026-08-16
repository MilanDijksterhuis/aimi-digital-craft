import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServicePageData } from "@/components/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";
import { RedDiagonalBackground } from "@/components/rodeachtergrond";

const URL = `${SITE_URL}/webshop-laten-maken`;

const faqs = [
  {
    q: "Wat kost een webshop laten maken?",
    a: "Een webshop is maatwerk en start doorgaans hoger dan een reguliere website, omdat er betaalmethodes, producten en een beheeromgeving bij komen kijken. Je krijgt vooraf een heldere offerte op basis van jouw wensen en aantal producten.",
  },
  {
    q: "Welke betaalmethodes zijn mogelijk?",
    a: "We koppelen gangbare Nederlandse betaalmethodes zoals iDEAL, creditcard en Bancontact via een betrouwbare betaalprovider, zodat klanten veilig en vertrouwd kunnen afrekenen.",
  },
  {
    q: "Kan ik zelf producten en voorraad beheren?",
    a: "Ja. Je krijgt een overzichtelijke beheeromgeving waarin je producten, prijzen, voorraad en bestellingen zelf kunt beheren, zonder technische kennis.",
  },
  {
    q: "Is de webshop goed vindbaar in Google?",
    a: "Zeker. We bouwen elke webshop technisch SEO-proof met snelle laadtijden en nette productpagina's, zodat je producten gevonden worden door kopers.",
  },
];

const data: ServicePageData = {
  kicker: "E-commerce op maat",
  h1: "Webshop laten maken",
  intro:
    "Online verkopen zonder gedoe. AIMI bouwt verkoopklare webshops voor ondernemers en ZZP'ers met veilige betaalmethodes, een simpel productbeheer en een ontwerp dat bezoekers naar de kassa leidt. Snel, betrouwbaar en volledig in eigen beheer, zodat je je kunt richten op verkopen.",
  offerings: [
    { title: "Verkoopklaar ontwerp", desc: "Een webshop die vertrouwen wekt en bezoekers soepel naar de afrekenpagina leidt." },
    { title: "Veilig afrekenen", desc: "iDEAL, creditcard en meer via een betrouwbare betaalprovider." },
    { title: "Eenvoudig productbeheer", desc: "Beheer producten, prijzen, voorraad en bestellingen zonder technische kennis." },
    { title: "Klaar voor groei", desc: "Schaalbaar opgezet zodat je assortiment mee kan groeien met je bedrijf." },
  ],
  steps: [
    { title: "Kennismaking & briefing", desc: "We brengen je producten, doelgroep en verkoopdoelen in kaart." },
    { title: "Ontwerp & structuur", desc: "We ontwerpen de shop en bepalen de indeling van categorieën en pagina's." },
    { title: "Bouwen & koppelen", desc: "We bouwen de shop, koppelen betaalmethodes en richten het productbeheer in." },
    { title: "Testen & livegang", desc: "We testen het volledige bestelproces en zetten de shop live op onze hosting." },
  ],
  priceLabel: "op aanvraag",
  priceNote: "Webshops zijn maatwerk. Vertel ons over je assortiment en je krijgt een passende, vaste offerte.",
  faqs,
  related: [
    { label: "Website laten maken", href: "/website-laten-maken" },
    { label: "Onderhoud & hosting", href: "/onderhoud-hosting" },
    { label: "Onze werkwijze", href: "/werkwijze" },
  ],
  ctaTitle: "Klaar om online te verkopen?",
  ctaText: "Vertel ons over je producten en plannen. Je krijgt binnen één werkdag een reactie en een vrijblijvende offerte.",
};

export const Route = createFileRoute("/webshop-laten-maken")({
  head: () => ({
    meta: [
      { title: "Webshop laten maken | Verkoopklaar & op maat AIMI" },
      {
        name: "description",
        content:
          "Webshop laten maken door AIMI? Verkoopklare webshops op maat met iDEAL en eenvoudig productbeheer, voor ondernemers en ZZP'ers.",
      },
      { property: "og:title", content: "Webshop laten maken AIMI" },
      { property: "og:description", content: "Verkoopklare webshops op maat met veilige betaalmethodes en simpel productbeheer." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Webshop laten maken AIMI" },
      { name: "twitter:description", content: "Verkoopklare webshops op maat met veilige betaalmethodes en simpel productbeheer." },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
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
      faqJsonLd(faqs),
    ],
  }),
  component: () => (
    <>
      <RedDiagonalBackground />
      <ServicePage data={data} />
    </>
  ),
});