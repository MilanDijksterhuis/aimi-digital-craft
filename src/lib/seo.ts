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
