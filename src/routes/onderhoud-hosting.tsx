import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServicePageData } from "@/components/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";
import { RedDiagonalBackground } from "../components/rodeachtergrond";

const URL = `${SITE_URL}/onderhoud-hosting`;

const faqs = [
  {
    q: "Wat kost hosting en onderhoud?",
    a: "Onze hosting start vanaf € 30 per maand, inclusief beveiliging, updates, back-ups en monitoring. Er zijn geen setup-kosten wanneer we een bestaande site overnemen.",
  },
  {
    q: "Kunnen jullie mijn bestaande website overnemen?",
    a: "Ja. We migreren je huidige website naar onze eigen infrastructuur en zorgen dat alles snel, veilig en up-to-date blijft zonder dat je er zelf omkijken naar hebt.",
  },
  {
    q: "Waar draaien de servers?",
    a: "We hosten op onze eigen VPS met Nederlandse servers. Zo houden we snelheid, beveiliging en beschikbaarheid volledig in eigen hand.",
  },
  {
    q: "Wat gebeurt er als mijn site plat gaat?",
    a: "We monitoren de uptime 24/7 en grijpen in bij problemen. Dagelijkse back-ups zorgen dat we je site snel kunnen herstellen als dat nodig is.",
  },
];

const data: ServicePageData = {
  kicker: "Zorgeloos online",
  h1: "Onderhoud & hosting",
  intro:
    "Snelle, veilige hosting en onderhoud zonder gedoe. AIMI host je website op een eigen VPS met Nederlandse servers, verzorgt updates en back-ups en houdt 24/7 de uptime in de gaten. Heb je al een site? Wij nemen 'm probleemloos over. Geen setup-kosten, geen serverstress.",
  offerings: [
    { title: "Snelle Nederlandse hosting", desc: "Je site draait op onze eigen VPS, geoptimaliseerd voor snelheid en betrouwbaarheid." },
    { title: "Beveiliging & updates", desc: "SSL, security-patches en updates zitten standaard bij het abonnement inbegrepen." },
    { title: "Dagelijkse back-ups", desc: "Automatische back-ups zodat je nooit werk of data verliest." },
    { title: "24/7 monitoring", desc: "We houden de uptime in de gaten en grijpen in vóór jij het merkt." },
  ],
  steps: [
    { title: "Kennismaking", desc: "We bekijken je huidige site en hostingwensen." },
    { title: "Migratie", desc: "We verhuizen je site naar onze infrastructuur zonder downtime waar mogelijk." },
    { title: "Beveiligen & instellen", desc: "SSL, back-ups en monitoring worden ingericht." },
    { title: "Doorlopend beheer", desc: "We houden alles up-to-date en zijn bereikbaar bij vragen." },
  ],
  priceLabel: "vanaf € 30 / maand",
  priceNote: "Inclusief hosting, SSL, updates, back-ups en monitoring. Geen setup-kosten bij overname van een bestaande site.",
  faqs,
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
      { title: "Onderhoud & hosting | Vanaf € 30 p/m AIMI" },
      {
        name: "description",
        content:
          "Website hosting en onderhoud door AIMI. Snelle Nederlandse hosting, SSL, updates, back-ups en 24/7 monitoring vanaf € 30 per maand. Wij nemen je bestaande site over.",
      },
      { name: "keywords", content: "website hosting, website onderhoud, hosting Nederland, website laten hosten, onderhoudsabonnement website" },
      { property: "og:title", content: "Onderhoud & hosting AIMI" },
      { property: "og:description", content: "Snelle Nederlandse hosting, updates, back-ups en 24/7 monitoring vanaf € 30 per maand." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: `${SITE_URL}/og-image.svg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Onderhoud & hosting AIMI" },
      { name: "twitter:description", content: "Snelle Nederlandse hosting, updates, back-ups en 24/7 monitoring vanaf € 30 per maand." },
      { name: "twitter:image", content: `${SITE_URL}/og-image.svg` },
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