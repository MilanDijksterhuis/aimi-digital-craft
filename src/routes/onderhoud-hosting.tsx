import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServicePageData } from "@/components/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, SITE_URL, OG_IMAGE_URL } from "@/lib/seo";
import { RedDiagonalBackground } from "../components/rodeachtergrond";

const URL = `${SITE_URL}/onderhoud-hosting`;

const data: ServicePageData = {
  kicker: "Zorgeloos online",
  h1: "Onderhoud & hosting",
  intro:
    "Snelle, veilige hosting en onderhoud zonder gedoe. AIMI host je website op een eigen VPS met Nederlandse servers, verzorgt updates en back-ups en houdt 24/7 de uptime in de gaten. Heb je al een site? Wij nemen 'm probleemloos over. Geen setup-kosten, geen serverstress.",
  offerings: [
    {
      title: "Snelle Nederlandse hosting",
      desc: "Je site draait op onze eigen VPS, geoptimaliseerd voor snelheid en betrouwbaarheid.",
      details: [
        "Geen gedeelde hosting met andere klanten: je site heeft eigen serverruimte, zonder dat de drukte van andere sites jouw snelheid beïnvloedt.",
        "Servers staan in Nederland, wat zorgt voor lage latency en een snelle laadtijd voor je Nederlandse bezoekers.",
      ],
    },
    {
      title: "Beveiliging & updates",
      desc: "SSL, security-patches en updates zitten standaard bij het abonnement inbegrepen.",
      details: [
        "SSL-certificaat wordt automatisch aangevraagd en vernieuwd, zodat je site altijd veilig en vertrouwd oogt.",
        "We houden software en afhankelijkheden actief bij, zodat bekende kwetsbaarheden snel worden gedicht.",
      ],
    },
    {
      title: "Dagelijkse back-ups",
      desc: "Automatische back-ups zodat je nooit werk of data verliest.",
      details: [
        "Elke dag wordt automatisch een volledige back-up gemaakt en veilig bewaard, los van de productieomgeving.",
        "Bij problemen kunnen we je site binnen enkele minuten terugzetten naar de laatste werkende versie.",
      ],
    },
    {
      title: "24/7 monitoring",
      desc: "We houden de uptime in de gaten en grijpen in vóór jij het merkt.",
      details: [
        "Geautomatiseerde monitoring controleert continu of je site bereikbaar is en signaleert storingen direct.",
        "Bij een probleem grijpen we zelf in, vaak nog voordat jij of je bezoekers er iets van merken.",
      ],
    },
  ],
  steps: [
    { title: "Kennismaking", desc: "We bekijken je huidige site en hostingwensen." },
    { title: "Migratie", desc: "We verhuizen je site naar onze infrastructuur zonder downtime waar mogelijk." },
    { title: "Beveiligen & instellen", desc: "SSL, back-ups en monitoring worden ingericht." },
    { title: "Doorlopend beheer", desc: "We houden alles up-to-date en zijn bereikbaar bij vragen." },
  ],
  priceLabel: "vanaf € 30 / maand",
  priceNote: "Inclusief hosting, SSL, updates, back-ups en monitoring. Geen setup-kosten bij overname van een bestaande site.",
  related: [
    { label: "Website laten maken", href: "/website-laten-maken" },
    { label: "Meer diensten", href: "/meer-diensten" },
    { label: "Onze werkwijze", href: "/werkwijze" },
  ],
  ctaTitle: "Klaar voor zorgeloze hosting?",
  ctaText: "Vertel ons over je website. We nemen de hosting en het onderhoud graag van je over.",
};

export const Route = createFileRoute("/onderhoud-hosting")({
  head: () => ({
    meta: [
      { title: "Onderhoud & hosting | Vanaf € 30 p/m — AIMI" },
      {
        name: "description",
        content:
          "Website hosting en onderhoud door AIMI. Snelle Nederlandse hosting, SSL, updates, back-ups en 24/7 monitoring vanaf € 30 per maand.",
      },
      { property: "og:title", content: "Onderhoud & hosting — AIMI" },
      { property: "og:description", content: "Snelle Nederlandse hosting, updates, back-ups en 24/7 monitoring vanaf € 30 per maand." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Onderhoud & hosting — AIMI" },
      { name: "twitter:description", content: "Snelle Nederlandse hosting, updates, back-ups en 24/7 monitoring vanaf € 30 per maand." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        name: "Onderhoud & hosting",
        serviceType: "Webhosting & onderhoud",
        description: "Snelle Nederlandse hosting, onderhoud, back-ups en monitoring voor websites.",
        url: URL,
      }),
      breadcrumbJsonLd([["Home", "/"], ["Onderhoud & hosting", "/onderhoud-hosting"]]),
    ],
  }),
  component: () => (
    <>
      <RedDiagonalBackground />
      <ServicePage data={data} />
    </>
  ),
});