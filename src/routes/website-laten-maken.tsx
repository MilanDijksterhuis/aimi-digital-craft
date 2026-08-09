import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServicePageData } from "@/components/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";

const URL = `${SITE_URL}/website-laten-maken`;

const faqs = [
  {
    q: "Wat kost een website laten maken?",
    a: "Een professionele website bij AIMI start vanaf € 499. De uiteindelijke prijs hangt af van het aantal pagina's, de gewenste functionaliteiten en of je bijvoorbeeld een blog of boekingssysteem nodig hebt. Je krijgt altijd vooraf een vaste prijs — geen uurtje-factuurtje.",
  },
  {
    q: "Hoe lang duurt het om een website te maken?",
    a: "Gemiddeld staat een nieuwe website binnen 2 tot 4 weken live. De doorlooptijd hangt vooral af van hoe snel we teksten, foto's en feedback ontvangen.",
  },
  {
    q: "Kan ik mijn website daarna zelf aanpassen?",
    a: "Ja. We leveren een website op waarin je zelf teksten en afbeeldingen kunt beheren, of we nemen het onderhoud voor je uit handen via een onderhoudsabonnement.",
  },
  {
    q: "Is SEO inbegrepen?",
    a: "De technische SEO-basis zit standaard in elk project: snelle laadtijden, nette structuur, meta-tags en mobielvriendelijk. Uitgebreidere SEO-campagnes bieden we los aan.",
  },
];

const data: ServicePageData = {
  kicker: "Webdesign op maat",
  h1: "Website laten maken",
  intro:
    "Een professionele website die past bij jouw bedrijf en die bezoekers omzet in klanten. AIMI ontwerpt, bouwt en host websites op maat voor kleine ondernemers en ZZP'ers. snel, mobielvriendelijk en goed vindbaar in Google. Geen templates, wel een vaste prijs en direct contact met de mensen die je site bouwen.",
  offerings: [
    { title: "Design op maat", desc: "Een uniek ontwerp dat aansluit op je merk en doelgroep geen standaardthema uit de kast." },
    { title: "Razendsnel & mobiel", desc: "Gebouwd op moderne techniek met groene Core Web Vitals, perfect op elk scherm." },
    { title: "SEO-basis inbegrepen", desc: "Nette structuur, meta-tags en snelheid zodat je vanaf dag één vindbaar bent." },
    { title: "Zelf te beheren", desc: "Pas eenvoudig teksten en foto's aan, of laat het onderhoud aan ons over." },
  ],
  steps: [
    { title: "Kennismaking & briefing", desc: "We bespreken je bedrijf, doelen en wensen. Wat moet de site opleveren?" },
    { title: "Ontwerp", desc: "Je krijgt een concept te zien en geeft feedback tot het klopt." },
    { title: "Bouwen & testen", desc: "We bouwen de site, vullen 'm met content en testen op alle apparaten." },
    { title: "Livegang & nazorg", desc: "We zetten de site live op onze snelle hosting en blijven bereikbaar." },
  ],
  priceLabel: "vanaf € 499",
  priceNote: "Eenmalig, met een vaste prijs vooraf. Hosting en onderhoud kunnen los worden afgenomen.",
  faqs,
  related: [
    { label: "Webshop laten maken", href: "/webshop-laten-maken" },
    { label: "Onderhoud & hosting", href: "/onderhoud-hosting" },
    { label: "Website laten maken Veendam", href: "/website-laten-maken-veendam" },
    { label: "Website laten maken Hoogeveen", href: "/website-laten-maken-hoogeveen" },
  ],
  ctaTitle: "Klaar voor een nieuwe website?",
  ctaText: "Vertel ons kort over je plannen. Je krijgt binnen één werkdag een reactie en een vrijblijvende offerte.",
};

export const Route = createFileRoute("/website-laten-maken")({
  head: () => ({
    meta: [
      { title: "Website laten maken | Professioneel & vanaf € 499 AIMI" },
      {
        name: "description",
        content:
          "Website laten maken door AIMI? Professioneel webdesign op maat voor ondernemers en ZZP'ers. Snel, mobielvriendelijk en goed vindbaar. Vaste prijs vanaf € 499.",
      },
      { name: "keywords", content: "website laten maken, professionele website, webdesign, website bouwen, website op maat, website ZZP" },
      { property: "og:title", content: "Website laten maken AIMI Webdesign" },
      { property: "og:description", content: "Professioneel webdesign op maat voor ondernemers en ZZP'ers. Vanaf € 499." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: `${SITE_URL}/og-image.svg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken AIMI Webdesign" },
      { name: "twitter:description", content: "Professioneel webdesign op maat voor ondernemers en ZZP'ers. Vanaf € 499." },
      { name: "twitter:image", content: `${SITE_URL}/og-image.svg` },
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
      faqJsonLd(faqs),
    ],
  }),
  component: () => <ServicePage data={data} />,
});
