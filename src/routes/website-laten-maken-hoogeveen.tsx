import { createFileRoute } from "@tanstack/react-router";
import { LocationLanding, type LocationData } from "@/components/LocationLanding";
import { ORG_ID, OG_IMAGE_URL, LOGO_URL, localBusinessId } from "@/lib/seo";

const CITY = "Hoogeveen";
const REGION = "Drenthe";
const URL = "https://aimi-development.nl/website-laten-maken-hoogeveen";

const data: LocationData = {
  city: CITY,
  region: REGION,
  nearby: ["Hollandscheveld", "Nieuwlande", "Pesse", "Meppel", "Beilen", "Assen"],
  intro:
    "Op zoek naar een webdesigner in Hoogeveen? AIMI ontwerpt, bouwt en host snelle, professionele websites en webshops voor ondernemers in Hoogeveen en omgeving. Van eerste schets tot livegang persoonlijk, lokaal en gericht op meer klanten via Google.",
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
          "Webdesigner in Hoogeveen nodig? AIMI bouwt snelle, professionele websites voor ondernemers in Zuid-Drenthe. Persoonlijk contact, vanaf € 499.",
      },
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
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken in Hoogeveen | AIMI Webdesign" },
      {
        name: "twitter:description",
        content: "Snelle, professionele websites en webshops voor ondernemers in Hoogeveen en omgeving.",
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
          "@id": localBusinessId("/website-laten-maken-hoogeveen"),
          parentOrganization: { "@id": ORG_ID },
          name: "AIMI",
          description:
            "Webdesigner in Hoogeveen. Websites, webshops, SEO en hosting voor ondernemers in Hoogeveen en omgeving.",
          url: URL,
          image: LOGO_URL,
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