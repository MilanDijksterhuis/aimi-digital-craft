/* Kleine helpers voor JSON-LD structured data, gedeeld door alle publieke
 * pagina's. Houdt de route-heads schoon en consistent. */

export const SITE_URL = "https://aimi-development.nl";
export const LOGO_URL = "https://aimi-development.nl/aimi-logo.png";
export const OG_IMAGE_URL = "https://aimi-development.nl/og-image.png";
/** Canonieke entiteit-id: elk Organization/LocalBusiness-schema op de site
 * verwijst hiernaar, zodat Google één bedrijf ziet in plaats van meerdere
 * losse entiteiten per pagina. */
export const ORG_ID = `${SITE_URL}/#organization`;
/** Eigen entiteit-id per vestigingspagina, los van ORG_ID, zodat stadspagina's
 * geen tegenstrijdig adres/geo claimen op de gedeelde organisatie-entiteit. */
export const localBusinessId = (path: string) => `${SITE_URL}${path}#localbusiness`;

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
}): LdScript {
  const area = opts.areaServed === undefined ? DEFAULT_AREA_SERVED : opts.areaServed;
  return ld({
    "@context": "https://schema.org",
    "@type": "Service",
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

/** HowTo-schema voor een stappenplan/proces op een dienstenpagina. */
export function howToJsonLd(opts: { name: string; description: string; steps: { title: string; desc: string }[] }): LdScript {
  return ld({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.desc,
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
