import { createFileRoute } from "@tanstack/react-router";
import { LocationLanding, type LocationData } from "@/components/LocationLanding";
import { RedDiagonalBackground } from "../components/rodeachtergrond";

const CITY = "Veendam";
const REGION = "Groningen";
const URL = "https://aimi-development.nl/website-laten-maken-veendam";

const data: LocationData = {
  city: CITY,
  region: REGION,
  nearby: ["Wildervank", "Muntendam", "Zuidbroek", "Pekela", "Winschoten", "Stadskanaal"],
  intro:
    "Op zoek naar een webdesigner in Veendam? AIMI ontwerpt, bouwt en host snelle, professionele websites en webshops voor ondernemers in Veendam en omgeving. Van eerste schets tot livegang persoonlijk, lokaal en gericht op meer klanten via Google.",
  faqs: [
    {
      q: "Wat kost een website laten maken in Veendam?",
      a: "Onze pakketten starten vanaf € 499 voor een professionele website. De uiteindelijke prijs hangt af van het aantal pagina's, functionaliteiten en of je een webshop nodig hebt. Je krijgt altijd vooraf een heldere offerte zonder verrassingen.",
    },
    {
      q: "Werken jullie ook voor bedrijven buiten Veendam?",
      a: "Zeker. We werken veel voor ondernemers in Veendam, Wildervank, Muntendam en de rest van Oost-Groningen, maar we bouwen websites voor klanten in heel Nederland. Alles kan op afstand, en persoonlijk contact blijft altijd mogelijk.",
    },
    {
      q: "Hoe snel staat mijn website online?",
      a: "Een standaard website staat gemiddeld binnen 2 tot 4 weken live, afhankelijk van de omvang en hoe snel we content en feedback ontvangen. Voor een spoedopdracht kunnen we vaak sneller schakelen.",
    },
    {
      q: "Komt mijn website ook goed vindbaar in Google?",
      a: "Ja. We bouwen elke site technisch SEO-proof en optimaliseren voor lokale zoekwoorden zoals 'website laten maken Veendam'. Zo word je gevonden door klanten uit jouw eigen regio.",
    },
  ],
  related: [
    { label: "Website laten maken", href: "/website-laten-maken" },
    { label: "Webshop laten maken", href: "/webshop-laten-maken" },
    { label: "Onze werkwijze", href: "/werkwijze" },
    { label: "Website laten maken Hoogeveen", href: "/website-laten-maken-hoogeveen" },
  ],
};

export const Route = createFileRoute("/website-laten-maken-veendam")({
  head: () => ({
    meta: [
      { title: "Website laten maken in Veendam | AIMI Webdesign" },
      {
        name: "description",
        content:
          "Website of webshop laten maken in Veendam? AIMI bouwt snelle, professionele websites die goed vindbaar zijn in Google. Lokaal, persoonlijk en vanaf € 499. Vraag een offerte aan.",
      },
      { name: "keywords", content: "website laten maken Veendam, webdesign Veendam, webshop Veendam, website bouwen Veendam, SEO Veendam" },
      { name: "geo.region", content: "NL-GR" },
      { name: "geo.placename", content: "Veendam" },
      { name: "geo.position", content: "53.1042;6.8778" },
      { name: "ICBM", content: "53.1042, 6.8778" },
      { property: "og:title", content: "Website laten maken in Veendam | AIMI Webdesign" },
      {
        property: "og:description",
        content: "Snelle, professionele websites en webshops voor ondernemers in Veendam en omgeving.",
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
          name: "AIMI Webdesign Veendam",
          description:
            "Webdesigner in Veendam. Websites, webshops, SEO en hosting voor ondernemers in Veendam en omgeving.",
          url: URL,
          image: "https://aimi-development.nl/__l5e/assets-v1/f039dfe4-daef-4864-b2b2-1abd084c3bda/aimi-logo.png",
          email: "sales@aimi-development.nl",
          priceRange: "€€",
          areaServed: [
            { "@type": "City", name: "Veendam" },
            { "@type": "City", name: "Wildervank" },
            { "@type": "City", name: "Muntendam" },
            { "@type": "AdministrativeArea", name: "Groningen" },
          ],
          address: { "@type": "PostalAddress", addressLocality: "Veendam", addressRegion: "Groningen", addressCountry: "NL" },
          geo: { "@type": "GeoCoordinates", latitude: 53.1042, longitude: 6.8778 },
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
            { "@type": "ListItem", position: 2, name: "Website laten maken in Veendam", item: URL },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <>
      <RedDiagonalBackground />
      <LocationLanding data={data} />
    </>
  ),
});