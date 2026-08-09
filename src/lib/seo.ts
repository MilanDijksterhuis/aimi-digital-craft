/* Kleine helpers voor JSON-LD structured data, gedeeld door alle publieke
 * pagina's. Houdt de route-heads schoon en consistent. */

export const SITE_URL = "https://aimi-development.nl";
export const LOGO_URL =
  "https://aimi-development.nl/__l5e/assets-v1/f039dfe4-daef-4864-b2b2-1abd084c3bda/aimi-logo.png";

type LdScript = { type: "application/ld+json"; children: string };

const ld = (obj: unknown): LdScript => ({
  type: "application/ld+json",
  children: JSON.stringify(obj),
});

/** Service-schema voor een dienstenpagina. */
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}): LdScript {
  return ld({
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: opts.url,
    provider: {
      "@type": "Organization",
      name: "AIMI",
      url: SITE_URL,
      logo: LOGO_URL,
      email: "sales@aimi-development.nl",
    },
    areaServed: [
      { "@type": "City", name: "Veendam" },
      { "@type": "City", name: "Hoogeveen" },
      { "@type": "AdministrativeArea", name: "Groningen" },
      { "@type": "AdministrativeArea", name: "Drenthe" },
      { "@type": "Country", name: "Nederland" },
    ],
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
