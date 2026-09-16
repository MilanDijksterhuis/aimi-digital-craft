/* Kleine helpers voor JSON-LD structured data, gedeeld door alle publieke
 * pagina's. Houdt de route-heads schoon en consistent. */

export const SITE_URL = "https://aimi-development.nl";
export const LOGO_URL = "https://aimi-development.nl/aimi-logo.png";
export const OG_IMAGE_URL = "https://aimi-development.nl/og-image.png";
/** Telefoonnummer als NAP-anker (SEO-audit 2026-09-02: local.md #1, content.md
 * CQ-1) — één plek, zowel voor zichtbare `tel:`-links als voor schema. */
export const PHONE_DISPLAY = "06 11851093";
export const PHONE_E164 = "+31611851093";
/** Zakelijk e-mailadres als NAP-anker, net als het telefoonnummer op één plek
 * (SEO-audit 2026-09-04): gebruikt door zowel het Organization-schema als het
 * ContactPoint, zodat die twee nooit uit elkaar kunnen lopen. */
export const EMAIL = "sales@aimi-development.nl";
/** Actief sinds: trust-signaal op stadspagina's (sxo.md SXO-1). Geen jaartal
 * verzinnen — dit is het echte startjaar. */
export const ACTIVE_SINCE_YEAR = 2025;

/** IndexNow-sleutel (SEO-audit 2026-09-03, technical.md Low priority #5).
 * Moet exact overeenkomen met de bestandsnaam van de key-verificatieroute
 * (`src/routes/${INDEXNOW_KEY}[.]txt.tsx`) en met wat `scripts/indexnow-submit.mjs`
 * meestuurt. Vast en willekeurig gegenereerd — geen geheim, puur eigenaarschap-bewijs. */
export const INDEXNOW_KEY = "b03bb73bce86422c6a74b3cfc829f2dd";
/** Canonieke entiteit-id: elk Organization/LocalBusiness-schema op de site
 * verwijst hiernaar, zodat Google één bedrijf ziet in plaats van meerdere
 * losse entiteiten per pagina. */
export const ORG_ID = `${SITE_URL}/#organization`;

/* ---------------------------------------------------------------------------
 * Bedrijfsgegevens — INVULLEN DOOR AIMI (SEO-audit 2026-09-04).
 *
 * Deze drie constanten zijn de enige plek waar adres, KvK en BTW hoeven te
 * staan; het Organization-schema en de footer pakken ze automatisch op zodra
 * ze gevuld zijn. Bewust leeg gelaten: een half PostalAddress of een verzonnen
 * KvK-nummer is slechter dan géén, want het is een controleerbaar gegeven.
 *
 * Zie schema.md SCH-1, content.md CQ-1 en local.md LOC-1/LOC-2.
 * ------------------------------------------------------------------------- */

/** Vestigingsadres. Vul streetAddress én postalCode in; pas dan wordt het
 * PostalAddress in het schema opgenomen. */
export const ADDRESS = {
  streetAddress: "", // bv. "Kerkstraat 1"
  postalCode: "", // bv. "9641 AA"
  addressLocality: "Veendam",
  addressRegion: "Groningen",
  addressCountry: "NL",
};

/** Handelsregisternummer (8 cijfers). Wettelijk verplicht op de website. */
export const KVK = "";
/** BTW-identificatienummer, formaat NL123456789B01. Wettelijk verplicht. */
export const VAT_ID = "";

/** Geeft het PostalAddress alleen terug als straat én postcode gevuld zijn. */
export const postalAddress = () =>
  ADDRESS.streetAddress && ADDRESS.postalCode
    ? { "@type": "PostalAddress", ...ADDRESS }
    : undefined;

/** Schema-fragment met adres, KvK en BTW: levert per veld alleen iets op als
 * het daadwerkelijk ingevuld is, zodat er nooit lege velden in de JSON-LD
 * belanden. Spread dit in een Organization/LocalBusiness-entiteit. */
export const businessIdentityJsonLd = () => ({
  ...(postalAddress() ? { address: postalAddress() } : {}),
  ...(VAT_ID ? { vatID: VAT_ID } : {}),
  ...(KVK
    ? {
        identifier: {
          "@type": "PropertyValue",
          name: "KvK",
          propertyID: "https://www.kvk.nl",
          value: KVK,
        },
      }
    : {}),
});
/** Eigen entiteit-id per vestigingspagina, los van ORG_ID, zodat stadspagina's
 * geen tegenstrijdig adres/geo claimen op de gedeelde organisatie-entiteit. */
export const localBusinessId = (path: string) => `${SITE_URL}${path}#localbusiness`;

/** A-41: `priceValidUntil` niet hardcoden. Een vaste datum verloopt stilletjes en
 * levert daarna waarschuwingen op in de Rich Results Test. Eén jaar vooruit,
 * berekend bij het renderen. */
export const PRICE_VALID_UNTIL = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

/* ---------------------------------------------------------------------------
 * Versheidssignalen (GEO-audit 2026-09-06, punt 8.1 — zwaarstwegende ingreep).
 *
 * AI-antwoordmachines (met name Google AI Mode) citeren content die aantoonbaar
 * actueel is fors vaker. De sitemap hield de laatste-wijzigingsdatum per pagina
 * al bij, maar die datum stond nergens in de pagina zelf. `PAGE_DATES` is nu de
 * ENIGE bron: zowel de sitemap (`lastmod`), het WebPage-schema (`dateModified`)
 * als de zichtbare "Bijgewerkt op"-regel lezen hieruit, zodat de drie nooit uit
 * elkaar lopen. Datum bijwerken = één regel hier aanpassen.
 * ------------------------------------------------------------------------- */

/** Startdatum van de site: `datePublished`-ondergrens voor pagina's die geen
 * eigen publicatiedatum hebben. Geen jaartal verzinnen — sluit aan op
 * ACTIVE_SINCE_YEAR. */
export const SITE_PUBLISHED = "2025-01-01";

/** Laatste-wijzigingsdatum per pad (ISO). Vult de sitemap én het schema.
 * Bewust een platte, gesorteerde lijst zodat hij makkelijk te onderhouden is. */
export const PAGE_DATES: Record<string, string> = {
  // Kernpagina's
  "/": "2026-09-06",

  // Dienstenpagina's
  "/website-laten-maken": "2026-09-06",
  "/webshop-laten-maken": "2026-08-20",
  "/onderhoud-hosting": "2026-08-20",
  "/website-laten-vernieuwen": "2026-09-04",
  "/seo": "2026-09-06",
  "/tarieven": "2026-09-06",

  // Informatief / oriënterend
  "/wordpress-of-maatwerk": "2026-08-22",
  "/website-checker": "2026-09-03",

  // Branchepagina's
  "/branches": "2026-09-04",
  "/website-laten-maken-kapsalon": "2026-08-21",
  "/website-laten-maken-nagelstudio": "2026-08-21",
  "/website-laten-maken-schoonheidssalon": "2026-08-21",
  "/website-laten-maken-pedicure": "2026-08-21",
  "/website-laten-maken-hovenier": "2026-08-21",
  "/website-laten-maken-klusbedrijf": "2026-09-04",
  "/website-laten-maken-schilder": "2026-09-04",
  "/website-laten-maken-loodgieter": "2026-08-21",
  "/website-laten-maken-autobedrijf": "2026-08-22",
  "/website-laten-maken-autorijschool": "2026-09-04",
  "/website-laten-maken-makelaar": "2026-08-22",
  "/website-laten-maken-boekhouder": "2026-08-22",
  "/website-laten-maken-restaurant": "2026-08-22",
  "/website-laten-maken-cateringbedrijf": "2026-08-22",
  "/website-laten-maken-bloemist": "2026-08-22",

  // Lokale landingspagina's
  "/webdesign": "2026-08-21",
  "/website-laten-maken-veendam": "2026-09-06",
  "/website-laten-maken-hoogeveen": "2026-08-21",
  "/website-laten-maken-groningen": "2026-08-21",
  "/website-laten-maken-assen": "2026-09-04",
  "/website-laten-maken-hoogezand": "2026-08-21",
  "/website-laten-maken-stadskanaal": "2026-08-21",
  "/website-laten-maken-emmen": "2026-08-21",
  "/website-laten-maken-winschoten": "2026-08-21",
  "/website-laten-maken-roden": "2026-09-04",
  "/website-laten-maken-coevorden": "2026-08-21",
  "/website-laten-maken-meppel": "2026-08-21",
  "/website-laten-maken-leeuwarden": "2026-08-21",
  "/website-laten-maken-drachten": "2026-08-21",
  "/website-laten-maken-heerenveen": "2026-08-21",
  "/website-laten-maken-sneek": "2026-08-21",

  // Overige publieke pagina's
  "/werkwijze": "2026-08-20",
  "/meer-diensten": "2026-08-20",
  "/over-ons": "2026-08-20",
  "/faq": "2026-09-06",
  "/contact": "2026-09-04",

  // Blog
  "/blog": "2026-09-16",
  "/blog/wordpress-site-gehackt": "2026-09-16",
  "/blog/core-web-vitals-website-snelheid": "2026-09-16",
  "/blog/vps-hosting-kleine-bedrijven": "2026-09-16",
  "/blog/gratis-website-checker-uitleg": "2026-09-16",
  "/blog/google-business-profile-fouten": "2026-09-16",
  "/blog/mooi-versus-converteert": "2026-09-16",
  "/blog/onderhoudskosten-na-livegang": "2026-09-16",
  "/blog/webshop-vs-gewone-website": "2026-09-16",
  "/blog/verouderde-websites-groningen-drenthe": "2026-09-16",
  "/blog/checklist-nieuwe-website": "2026-09-16",

  // Juridisch
  "/privacybeleid": "2026-09-04",
  "/algemene-voorwaarden": "2026-09-04",
};

/** Laatste-wijzigingsdatum voor een pad; valt terug op vandaag als een pad
 * (nog) niet in PAGE_DATES staat, zodat een nieuwe pagina nooit dateloos is. */
export const pageLastmod = (path: string): string =>
  PAGE_DATES[path] ?? new Date().toISOString().slice(0, 10);

const NL_MONTHS = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];

/** ISO-datum → "6 september 2026" voor de zichtbare "Bijgewerkt op"-regel.
 * Bewust geen `toLocaleDateString`: dat hangt af van de server-locale en zou
 * SSR/client kunnen laten afwijken. */
export const formatDateNL = (iso: string): string => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${NL_MONTHS[m - 1]} ${y}`;
};

/** WebPage-schema (GEO-audit 2026-09-06, punt 9): maakt per pagina expliciet
 * waar hij óver gaat (`about` → de organisatie-entiteit) en wanneer hij voor het
 * laatst is bijgewerkt. `dateModified` is het versheidssignaal; `about`/
 * `isPartOf` geven AI Mode entiteitsduiding. Wordt in de body gerenderd — JSON-LD
 * is overal in de HTML geldig en crawlers lezen het.
 *
 * `datePublished` valt terug op SITE_PUBLISHED; geef een echte publicatiedatum
 * mee zodra die bekend is (bv. voor blog/artikelen). */
export function webPageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  datePublished?: string;
}): LdScript {
  const url = `${SITE_URL}${opts.path}`;
  return ld({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: "nl-NL",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    primaryImageOfPage: OG_IMAGE_URL,
    datePublished: opts.datePublished ?? SITE_PUBLISHED,
    dateModified: pageLastmod(opts.path),
  });
}

type LdScript = { type: "application/ld+json"; children: string };

const ld = (obj: unknown): LdScript => ({
  type: "application/ld+json",
  children: JSON.stringify(obj),
});

/** Standaard werkgebied voor de generieke dienstenpagina's. */
const DEFAULT_AREA_SERVED = [
  { "@type": "City", name: "Veendam" },
  { "@type": "City", name: "Hoogeveen" },
  { "@type": "AdministrativeArea", name: "Groningen" },
  { "@type": "AdministrativeArea", name: "Drenthe" },
  { "@type": "Country", name: "Nederland" },
];

/** Werkgebied voor één plaats: gebruikt door de locatiepagina's, zodat elke
 * stadspagina zijn eigen plaats + provincie claimt in plaats van het generieke
 * lijstje. */
export const cityAreaServed = (city: string, region: string) => [
  { "@type": "City", name: city },
  { "@type": "AdministrativeArea", name: region },
];

/** Service-schema voor een dienstenpagina.
 * `areaServed` overschrijft het standaard werkgebied (locatiepagina's geven hun
 * eigen plaats mee); `null` laat areaServed helemaal weg (branchepagina's, die
 * niet regiogebonden zijn). */
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: unknown[] | null;
  /** Eigen `@id`, nodig zodra één pagina meerdere Services beschrijft: zonder
   * eigen id claimen ze alle drie dezelfde entiteit op dezelfde URL. */
  id?: string;
}): LdScript {
  const area = opts.areaServed === undefined ? DEFAULT_AREA_SERVED : opts.areaServed;
  return ld({
    "@context": "https://schema.org",
    "@type": "Service",
    ...(opts.id ? { "@id": opts.id } : {}),
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: opts.url,
    provider: { "@id": ORG_ID },
    ...(area ? { areaServed: area } : {}),
  });
}

/** BreadcrumbList: [["Home","/"], ["Dienst","/slug"]] */
export function breadcrumbJsonLd(trail: [string, string][]): LdScript {
  return ld({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  });
}

/** ItemList-schema voor de "Wat je krijgt"-onderdelen, incl. uitgebreide uitleg
 * per item zodat de volledige uitklap-content ook voor zoekmachines telt. */
export function offeringsJsonLd(opts: {
  name: string;
  offerings: { title: string; desc: string; details: string[] }[];
}): LdScript {
  return ld({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    itemListElement: opts.offerings.map((o, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: o.title,
      description: [o.desc, ...o.details].join(" "),
    })),
  });
}

/** FAQPage-schema; kan rich results in Google opleveren. */
export function faqJsonLd(faqs: { q: string; a: string }[]): LdScript {
  return ld({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
}

/** ContactPage + ContactPoint (SEO-audit 2026-09-04, schema.md SCH-4).
 * /contact droeg alleen de site-brede Organization/WebSite/Breadcrumb-entiteiten.
 * Een eigen ContactPage maakt expliciet dát dit de contactpagina is, en het
 * ContactPoint zet telefoon, e-mail en taal in een vorm die zoekmachines en
 * AI-assistenten direct kunnen uitlezen.
 *
 * `mainEntity` hergebruikt bewust ORG_ID: JSON-LD voegt nodes met hetzelfde
 * `@id` samen, dus dit hángt het contactPoint aan de bestaande organisatie in
 * plaats van een tweede entiteit te maken. */
export function contactPageJsonLd(opts: {
  url: string;
  name: string;
  description: string;
}): LdScript {
  return ld({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${opts.url}#contactpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: "nl-NL",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": ORG_ID },
    mainEntity: {
      "@type": "Organization",
      "@id": ORG_ID,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: PHONE_E164,
          email: EMAIL,
          availableLanguage: ["nl", "Dutch"],
          areaServed: "NL",
        },
      ],
    },
  });
}
