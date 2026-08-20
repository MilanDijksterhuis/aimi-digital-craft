import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServicePageData } from "@/components/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, howToJsonLd, offeringsJsonLd, SITE_URL, OG_IMAGE_URL } from "@/lib/seo";
import { RedDiagonalBackground } from "../components/rodeachtergrond";

const URL = `${SITE_URL}/website-laten-maken`;

const data: ServicePageData = {
  kicker: "Webdesign op maat",
  h1: "Website laten maken",
  intro:
    "Een professionele website die past bij jouw bedrijf en die bezoekers omzet in klanten. AIMI ontwerpt, bouwt en host websites op maat voor kleine ondernemers en ZZP'ers. snel, mobielvriendelijk en goed vindbaar in Google. Geen templates, wel een vaste prijs en direct contact met de mensen die je site bouwen.",
  offerings: [
    {
      title: "Design op maat",
      desc: "Een uniek ontwerp dat aansluit op je merk en doelgroep geen standaardthema uit de kast.",
      details: [
        "Elk ontwerp start blanco: geen sjabloon uit een bibliotheek, maar een lay-out die is afgestemd op jouw merk, kleuren en tone-of-voice.",
        "We denken mee over structuur en gebruikerspad, zodat bezoekers moeiteloos vinden wat ze zoeken en sneller contact opnemen.",
        "Je krijgt een concept te zien voordat we gaan bouwen, met ruimte voor feedback tot het ontwerp precies goed voelt.",
        "Consistente huisstijl over alle pagina's heen, van hero tot contactformulier, voor een professionele uitstraling.",
      ],
    },
    {
      title: "Razendsnel & mobiel",
      desc: "Gebouwd op moderne techniek met groene Core Web Vitals, perfect op elk scherm.",
      details: [
        "Gebouwd met moderne, lichtgewicht techniek in plaats van zware pagebuilders die je site vertragen.",
        "Geoptimaliseerde afbeeldingen en code zorgen voor snelle laadtijden, ook op een mobiele verbinding.",
        "Volledig responsive: de site oogt en werkt even goed op telefoon, tablet als desktop.",
        "Groene Core Web Vitals, wat bijdraagt aan een betere positie in Google en minder bezoekers die afhaken.",
      ],
    },
    {
      title: "SEO-basis inbegrepen",
      desc: "Nette structuur, meta-tags en snelheid zodat je vanaf dag één vindbaar bent.",
      details: [
        "Technisch nette HTML-structuur met correcte koppen, meta-titels en meta-omschrijvingen per pagina.",
        "Automatisch gegenereerde sitemap en correcte indexeerbaarheid, zodat Google je site goed kan doorzoeken.",
        "Structured data (schema.org) waar relevant, voor rijkere zoekresultaten in Google.",
        "Snelheid en mobielvriendelijkheid als vaste basis, twee belangrijke rankingfactoren van Google.",
      ],
    },
    {
      title: "Zelf te beheren",
      desc: "Pas eenvoudig teksten en foto's aan, of laat het onderhoud aan ons over.",
      details: [
        "Je krijgt de mogelijkheid om zelf teksten, afbeeldingen en kleine wijzigingen door te voeren, zonder technische kennis.",
        "Geen zin of tijd om het zelf te doen? Dan nemen wij het onderhoud volledig uit handen via een onderhoudsabonnement.",
        "Heldere uitleg en desgewenst een korte instructie, zodat je precies weet hoe je zelf aan de slag kunt.",
        "Altijd een aanspreekpunt bij vragen, wijzigingen of uitbreidingen achteraf.",
      ],
    },
  ],
  steps: [
    { title: "Kennismaking & briefing", desc: "We bespreken je bedrijf, doelen en wensen. Wat moet de site opleveren?" },
    { title: "Ontwerp", desc: "Je krijgt een concept te zien en geeft feedback tot het klopt." },
    { title: "Bouwen & testen", desc: "We bouwen de site, vullen 'm met content en testen op alle apparaten." },
    { title: "Livegang & nazorg", desc: "We zetten de site live op onze snelle hosting en blijven bereikbaar." },
  ],
  priceLabel: "vanaf € 499",
  priceNote: "Eenmalig, met een vaste prijs vooraf. Hosting en onderhoud kunnen los worden afgenomen.",
  related: [
    { label: "Webshop laten maken", href: "/webshop-laten-maken" },
    { label: "Onderhoud & hosting", href: "/onderhoud-hosting" },
    { label: "Website laten maken Veendam", href: "/website-laten-maken-veendam" },
    { label: "Website laten maken Hoogeveen", href: "/website-laten-maken-hoogeveen" },
  ],
  ctaTitle: "Klaar voor een nieuwe website?",
  ctaText: "Vertel ons kort over je plannen. Je krijgt binnen één werkdag een reactie en een vrijblijvende offerte.",
  examples: [
    { src: "/voorbeelden/voorbeeld-website-1-architectuur.webp", alt: "Voorbeeld website voor een architectenbureau" },
    { src: "/voorbeelden/voorbeeld-website-2-praktijk.webp", alt: "Voorbeeld website voor een praktijk" },
    { src: "/voorbeelden/voorbeeld-website-3-saas.webp", alt: "Voorbeeld website voor een SaaS-bedrijf" },
  ],
};

export const Route = createFileRoute("/website-laten-maken")({
  head: () => ({
    meta: [
      { title: "Website laten maken | Professioneel & vanaf € 499 — AIMI" },
      {
        name: "description",
        content:
          "Website laten maken door AIMI? Professioneel webdesign op maat voor ondernemers en ZZP'ers. Snel en goed vindbaar. Vaste prijs vanaf € 499.",
      },
      { property: "og:title", content: "Website laten maken — AIMI Webdesign" },
      { property: "og:description", content: "Professioneel webdesign op maat voor ondernemers en ZZP'ers. Vanaf € 499." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken — AIMI Webdesign" },
      { name: "twitter:description", content: "Professioneel webdesign op maat voor ondernemers en ZZP'ers. Vanaf € 499." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      serviceJsonLd({
        name: "Website laten maken",
        serviceType: "Webdesign & webdevelopment",
        description: "Professionele websites op maat voor kleine ondernemers en ZZP'ers.",
        url: URL,
      }),
      breadcrumbJsonLd([["Home", "/"], ["Website laten maken", "/website-laten-maken"]]),
      howToJsonLd({
        name: "Zo werkt het: website laten maken bij AIMI",
        description: "Het proces van kennismaking tot livegang van je website.",
        steps: data.steps,
      }),
      offeringsJsonLd({ name: "Wat je krijgt bij een website van AIMI", offerings: data.offerings }),
    ],
  }),
  component: () => (
    <>
      <RedDiagonalBackground />
      <ServicePage data={data} />
    </>
  ),
});