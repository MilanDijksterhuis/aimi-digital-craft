import { createFileRoute } from "@tanstack/react-router";
import { LocationLanding, type LocationData } from "@/components/LocationLanding";

const CITY = "Hoogeveen";
const REGION = "Drenthe";
const URL = "https://aimi-development.nl/website-laten-maken-hoogeveen";

const data: LocationData = {
  city: CITY,
  region: REGION,
  nearby: ["Hollandscheveld", "Nieuwlande", "Pesse", "Meppel", "Beilen", "Assen"],
  intro:
    "Op zoek naar een webdesigner in Hoogeveen? AIMI ontwerpt, bouwt en host snelle, professionele websites en webshops voor ondernemers in Hoogeveen en omgeving. Van eerste schets tot livegang persoonlijk, lokaal en gericht op meer klanten via Google.",
  faqs: [
    {
      q: "Wat kost een website laten maken in Hoogeveen?",
      a: "Onze pakketten starten vanaf € 499 voor een professionele website. De uiteindelijke prijs hangt af van het aantal pagina's, functionaliteiten en of je een webshop nodig hebt. Je krijgt altijd vooraf een heldere offerte zonder verrassingen.",
    },
    {
      q: "Werken jullie ook voor bedrijven buiten Hoogeveen?",
      a: "Zeker. We werken veel voor ondernemers in Hoogeveen, Meppel, Beilen en de rest van Drenthe, maar we bouwen websites voor klanten in heel Nederland. Alles kan op afstand, en persoonlijk contact blijft altijd mogelijk.",
    },
    {
      q: "Hoe snel staat mijn website online?",
      a: "Een standaard website staat gemiddeld binnen 2 tot 4 weken live, afhankelijk van de omvang en hoe snel we content en feedback ontvangen. Voor een spoedopdracht kunnen we vaak sneller schakelen.",
    },
    {
      q: "Komt mijn website ook goed vindbaar in Google?",
      a: "Ja. We bouwen elke site technisch SEO-proof en optimaliseren voor lokale zoekwoorden zoals 'website laten maken Hoogeveen'. Zo word je gevonden door klanten uit jouw eigen regio.",
    },
  ],
  related: [
    { label: "Website laten maken", href: "/website-laten-maken" },
    { label: "Webshop laten maken", href: "/webshop-laten-maken" },
    { label: "Onze werkwijze", href: "/werkwijze" },
    { label: "Website laten maken Veendam", href: "/website-laten-maken-veendam" },
  ],
};

export const Route = createFileRoute("/website-laten-maken-hoogeveen")({
  head: () => ({
    meta: [
      { title: "Website laten maken in Hoogeveen | AIMI Webdesign" },
      {
        name: "description",
        content:
          "Website of webshop laten maken in Hoogeveen? AIMI bouwt snelle, professionele websites die goed vindbaar zijn in Google. Lokaal, persoonlijk en vanaf € 499. Vraag een offerte aan.",
      },
      { name: "keywords", content: "website laten maken Hoogeveen, webdesign Hoogeveen, webshop Hoogeveen, website bouwen Hoogeveen, SEO Hoogeveen" },
      { name: "geo.region", content: "NL-DR" },
      { name: "geo.placename", content: "Hoogeveen" },
      { name: "geo.position", content: "52.7225;6.4869" },
      { name: "ICBM", content: "52.7225, 6.4869" },
      { property: "og:title", content: "Website laten maken in Hoogeveen | AIMI Webdesign" },
      {
        property: "og:description",
        content: "Snelle, professionele websites en webshops voor ondernemers in Hoogeveen en omgeving.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://aimi-development.nl/og-image.svg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": URL,
          name: "AIMI Webdesign Hoogeveen",
          description:
            "Webdesigner in Hoogeveen. Websites, webshops, SEO en hosting voor ondernemers in Hoogeveen en omgeving.",
          url: URL,
          image: "https://aimi-development.nl/__l5e/assets-v1/f039dfe4-daef-4864-b2b2-1abd084c3bda/aimi-logo.png",
          email: "sales@aimi-development.nl",
          priceRange: "€€",
          areaServed: [
            { "@type": "City", name: "Hoogeveen" },
            { "@type": "City", name: "Meppel" },
            { "@type": "City", name: "Beilen" },
            { "@type": "AdministrativeArea", name: "Drenthe" },
          ],
          address: { "@type": "PostalAddress", addressLocality: "Hoogeveen", addressRegion: "Drenthe", addressCountry: "NL" },
          geo: { "@type": "GeoCoordinates", latitude: 52.7225, longitude: 6.4869 },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://aimi-development.nl/" },
            { "@type": "ListItem", position: 2, name: "Website laten maken in Hoogeveen", item: URL },
          ],
        }),
      },
    ],
  }),
  component: () => <LocationLanding data={data} />,
});
