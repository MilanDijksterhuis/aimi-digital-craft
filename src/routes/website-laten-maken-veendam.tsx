import { createFileRoute } from "@tanstack/react-router";
import { LocationLanding, type LocationData } from "@/components/LocationLanding";
import { ORG_ID, OG_IMAGE_URL, LOGO_URL, localBusinessId } from "@/lib/seo";

const CITY = "Veendam";
const REGION = "Groningen";
const URL = "https://aimi-development.nl/website-laten-maken-veendam";

const data: LocationData = {
  city: CITY,
  region: REGION,
  nearby: ["Wildervank", "Muntendam", "Zuidbroek", "Pekela", "Winschoten", "Stadskanaal"],
  intro:
    "Op zoek naar een webdesigner in Veendam? AIMI ontwerpt, bouwt en host snelle, professionele websites en webshops voor ondernemers in Veendam en omgeving. Van eerste schets tot livegang persoonlijk, lokaal en gericht op meer klanten via Google.",
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
          "Webdesigner in Veendam nodig? AIMI bouwt snelle, professionele websites voor ondernemers in Oost-Groningen. Persoonlijk contact, vanaf € 499.",
      },
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
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken in Veendam | AIMI Webdesign" },
      {
        name: "twitter:description",
        content: "Snelle, professionele websites en webshops voor ondernemers in Veendam en omgeving.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": localBusinessId("/website-laten-maken-veendam"),
          parentOrganization: { "@id": ORG_ID },
          name: "AIMI",
          description:
            "Webdesigner in Veendam. Websites, webshops, SEO en hosting voor ondernemers in Veendam en omgeving.",
          url: URL,
          image: LOGO_URL,
          email: "sales@aimi-development.nl",
          priceRange: "€€",
          areaServed: [
            { "@type": "City", name: "Veendam" },
            { "@type": "City", name: "Wildervank" },
            { "@type": "City", name: "Muntendam" },
            { "@type": "City", name: "Zuidbroek" },
            { "@type": "City", name: "Pekela" },
            { "@type": "City", name: "Winschoten" },
            { "@type": "City", name: "Stadskanaal" },
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
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://aimi-development.nl/" },
            { "@type": "ListItem", position: 2, name: "Website laten maken in Veendam", item: URL },
          ],
        }),
      },
    ],
  }),
  component: () => <LocationLanding data={data} />,
});