import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL, OG_IMAGE_URL, ORG_ID, PRICE_VALID_UNTIL, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/tarieven`;

const RED = "#fe2c02";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

type Tier = {
  name: string;
  price: string;
  amount?: number;
  desc: string;
  forWho: string;
  features: string[];
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Starter",
    price: "€ 499",
    amount: 499,
    desc: "Een professionele één-pagina site, eenmalig.",
    forWho: "Voor ZZP'ers en starters die vooral gevonden en gebeld willen worden.",
    features: [
      "1-pagina site met alle secties",
      "Mobile-first design",
      "Domeinnaam het eerste jaar",
      "Technische SEO-basis",
      "Contactformulier",
      "Oplevering binnen twee weken",
    ],
  },
  {
    name: "Pro",
    price: "€ 749",
    amount: 749,
    desc: "Meerdere pagina's, eigen ontwerp en CMS, eenmalig.",
    forWho: "Voor bedrijven met meerdere diensten of vestigingen die zelf tekst willen aanpassen.",
    features: [
      "Tot 6 pagina's",
      "Volledig eigen ontwerp",
      "CMS om zelf teksten te wijzigen",
      "Domein + uptime-monitoring",
      "Performance-optimalisatie",
      "Alles uit Starter",
    ],
    featured: true,
  },
  {
    name: "Custom",
    price: "Op maat",
    desc: "Webshops, web-applicaties en grotere builds.",
    forWho: "Voor projecten met een eigen backend, koppelingen of een webshop.",
    features: [
      "Onbeperkte scope",
      "Backend & integraties",
      "Webshop of applicatie",
      "Persoonlijke begeleiding",
      "Vaste prijs na een gesprek",
    ],
  },
];

const recurring = [
  {
    name: "Hosting & onderhoud",
    price: "€ 30 / maand",
    desc: "Nederlandse hosting op onze eigen VPS, SSL, dagelijkse back-ups, updates en 24/7 monitoring. Geen setup-kosten als we een bestaande site overnemen.",
    href: "/onderhoud-hosting",
    linkLabel: "Onderhoud & hosting",
  },
  {
    name: "Losse diensten",
    price: "op aanvraag",
    desc: "Heb je al een website en wil je alleen performance-optimalisatie of hulp met vindbaarheid? Dat kan los, zonder dat wij je site hoeven te bouwen.",
    href: "/meer-diensten",
    linkLabel: "Meer diensten",
  },
];

const included = [
  "Een ontwerp dat je vooraf ziet en goedkeurt",
  "Responsive op telefoon, tablet en desktop",
  "Technische SEO: titels, descriptions, sitemap, schema",
  "SSL-certificaat en een veilige server",
  "Je bent na oplevering volledig eigenaar van je site",
  "Direct contact met de developer die 'm gebouwd heeft",
];

const notIncluded = [
  "Teksten schrijven voor je hele site (kan wel, in overleg)",
  "Professionele fotografie",
  "Betaalde advertenties of Google Ads-beheer",
  "Beloften over posities in Google — die verkopen we niet",
];

const faqs = [
  {
    q: "Wat kost een website laten maken?",
    a: "Bij AIMI begint een professionele één-pagina website bij € 499 eenmalig. Een meerpagina-site met eigen ontwerp en CMS kost € 749. Webshops en maatwerkprojecten krijgen een vaste prijs na een kennismakingsgesprek. Daarnaast betaal je € 30 per maand voor hosting en onderhoud.",
  },
  {
    q: "Zijn dit vaste prijzen of een indicatie?",
    a: "Dit zijn vaste prijzen. Je weet vooraf wat je betaalt en we werken niet met uurtje-factuurtje. Alleen bij maatwerk bepalen we de prijs na het gesprek, maar ook dan ligt het bedrag daarna vast.",
  },
  {
    q: "Zitten er verborgen kosten bij?",
    a: "Nee. De eenmalige prijs dekt het ontwerp en de bouw. De maandelijkse € 30 dekt hosting, SSL, back-ups, updates en monitoring. Je domeinnaam zit het eerste jaar bij de prijs in.",
  },
  {
    q: "Wat kost hosting en onderhoud per maand?",
    a: "€ 30 per maand. Daarvoor draait je site op onze eigen Nederlandse VPS, met SSL, dagelijkse back-ups, security-updates en 24/7 uptime-monitoring. Nemen we een bestaande site over, dan betaal je geen setup-kosten.",
  },
  {
    q: "Moet ik alles vooraf betalen?",
    a: "Nee. We werken standaard met een aanbetaling bij de start en de rest bij oplevering, zodat het risico voor beide kanten beperkt blijft.",
  },
  {
    q: "Wat kost een webshop laten maken?",
    a: "Een webshop valt onder maatwerk, omdat de prijs afhangt van het aantal producten, de betaalmethodes en eventuele koppelingen met je voorraad of boekhouding. Na een kort gesprek krijg je een vaste prijs.",
  },
  {
    q: "Wat als ik later een pagina wil toevoegen?",
    a: "Dat kan altijd. Kleine aanpassingen doen we in overleg; grotere uitbreidingen krijgen vooraf een prijs, zodat je nooit voor een verrassing komt te staan.",
  },
];

export const Route = createFileRoute("/tarieven")({
  head: () => ({
    meta: [
      { title: "Wat kost een website laten maken? | Tarieven vanaf € 499 — AIMI" },
      {
        name: "description",
        content:
          "Vaste prijzen voor een website laten maken: vanaf € 499 eenmalig en € 30 per maand voor hosting en onderhoud. Geen uurtje-factuurtje, geen verborgen kosten.",
      },
      { property: "og:title", content: "Tarieven — wat kost een website laten maken? | AIMI" },
      {
        property: "og:description",
        content: "Website vanaf € 499 eenmalig, hosting en onderhoud € 30 per maand. Vaste prijzen, vooraf duidelijk.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Tarieven — wat kost een website laten maken? | AIMI" },
      {
        name: "twitter:description",
        content: "Website vanaf € 499 eenmalig, hosting en onderhoud € 30 per maand. Vaste prijzen, vooraf duidelijk.",
      },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      breadcrumbJsonLd([["Home", "/"], ["Tarieven", "/tarieven"]]),
      {
        type: "application/ld+json" as const,
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          "@id": `${URL}#offercatalog`,
          name: "Tarieven website laten maken",
          url: URL,
          provider: { "@id": ORG_ID },
          itemListElement: [
            ...tiers
              .filter((t) => t.amount)
              .map((t) => ({
                "@type": "Offer",
                name: `Website laten maken — ${t.name}`,
                description: t.desc,
                price: String(t.amount),
                priceCurrency: "EUR",
                priceValidUntil: PRICE_VALID_UNTIL,
                url: URL,
                availability: "https://schema.org/InStock",
              })),
            {
              "@type": "Offer",
              name: "Hosting & onderhoud",
              description:
                "Nederlandse hosting, SSL, dagelijkse back-ups, updates en 24/7 monitoring.",
              price: "30",
              priceCurrency: "EUR",
              priceValidUntil: PRICE_VALID_UNTIL,
              url: `${SITE_URL}/onderhoud-hosting`,
              availability: "https://schema.org/InStock",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "30",
                priceCurrency: "EUR",
                billingIncrement: 1,
                unitCode: "MON",
              },
            },
          ],
        }),
      },
      faqJsonLd(faqs),
    ],
  }),
  component: TarievenPage,
});

function TarievenPage() {
  return (
    <div style={{ background: "#0f1010", minHeight: "100vh", fontFamily: FONT }}>
      <Nav />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-6">
            <nav aria-label="Kruimelpad" className="mb-6 text-[13px]" style={{ color: "#868b94" }}>
              <Link to="/" style={{ color: "#868b94", textDecoration: "none" }}>
                Home
              </Link>
              <span className="mx-2">/</span>
              <span style={{ color: "#a4a9b2" }}>Tarieven</span>
            </nav>

            <div className="text-[13px] font-medium mb-4" style={{ color: RED }}>
              Tarieven
            </div>
            <h1
              className="text-white max-w-3xl"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              Wat kost een website laten maken?
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed" style={{ color: "#a4a9b2" }}>
              Een professionele website begint bij AIMI op <strong style={{ color: "#ffffff" }}>€ 499 eenmalig</strong>,
              plus <strong style={{ color: "#ffffff" }}>€ 30 per maand</strong> voor hosting en onderhoud. Dat zijn
              vaste prijzen: je weet vooraf precies wat je betaalt, we werken niet met uurtje-factuurtje en er komt
              achteraf niets bij.
            </p>
          </div>
        </section>

        {/* Eenmalige pakketten */}
        <section className="py-12" style={{ background: "#161717" }}>
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-white mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Eenmalige prijs voor het bouwen
            </h2>
            <p className="text-[15px] mb-12 max-w-2xl" style={{ color: "#a4a9b2" }}>
              Je betaalt één keer voor het ontwerp en de bouw. Daarna ben je eigenaar van je site.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tiers.map((t) => (
                <div
                  key={t.name}
                  className="relative flex flex-col p-8"
                  style={{
                    background: t.featured ? "#1e1f1f" : "transparent",
                    border: `1px solid ${t.featured ? "rgba(255,255,255,0.12)" : "#2a2b2b"}`,
                    borderRadius: "16px",
                  }}
                >
                  {t.featured && (
                    <span
                      className="absolute -top-3 left-6 px-3 py-1 text-[12px] font-medium"
                      style={{ background: RED, color: "#ffffff", borderRadius: "9999px", letterSpacing: "0.02em" }}
                    >
                      Meest gekozen
                    </span>
                  )}

                  <h3 className="text-white" style={{ fontSize: "15px", fontWeight: 500 }}>
                    {t.name}
                  </h3>
                  <div
                    className="text-white mt-2 mb-3"
                    style={{ fontSize: "2.2rem", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1 }}
                  >
                    {t.price}
                  </div>
                  <p className="text-[15px] mb-2" style={{ color: "#ffffff" }}>
                    {t.desc}
                  </p>
                  <p className="text-[14px] mb-8" style={{ color: "#a4a9b2" }}>
                    {t.forWho}
                  </p>

                  <ul className="space-y-3 flex-1 mb-8">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[14.5px]" style={{ color: "#a4a9b2" }}>
                        <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#49de80" }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center text-[15px] font-medium transition-opacity duration-150 hover:opacity-75"
                    style={{
                      background: t.featured ? "#ffffff" : "transparent",
                      color: t.featured ? "#0f0e0d" : "#ffffff",
                      border: t.featured ? "none" : "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "9999px",
                      padding: "11px 20px",
                      textDecoration: "none",
                    }}
                  >
                    {t.amount ? "Vraag een offerte aan" : "Plan een gesprek"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Maandelijks */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-white mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Maandelijkse kosten
            </h2>
            <p className="text-[15px] mb-10 max-w-2xl" style={{ color: "#a4a9b2" }}>
              Een website moet ergens draaien en bijgehouden worden. Dat is het enige dat doorloopt.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recurring.map((r) => (
                <div
                  key={r.name}
                  className="flex flex-col p-8"
                  style={{ border: "1px solid #2a2b2b", borderRadius: "16px" }}
                >
                  <h3 className="text-white" style={{ fontSize: "15px", fontWeight: 500 }}>
                    {r.name}
                  </h3>
                  <div
                    className="text-white mt-2 mb-4"
                    style={{ fontSize: "1.8rem", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1 }}
                  >
                    {r.price}
                  </div>
                  <p className="text-[15px] leading-relaxed flex-1 mb-6" style={{ color: "#a4a9b2" }}>
                    {r.desc}
                  </p>
                  <Link
                    to={r.href}
                    className="group inline-flex items-center gap-2 text-[15px] font-medium text-white transition-opacity duration-150 hover:opacity-75"
                    style={{ textDecoration: "none" }}
                  >
                    {r.linkLabel}
                    <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wat zit er wel/niet bij */}
        <section className="py-16" style={{ background: "#161717" }}>
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-white mb-6" style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Wat zit er altijd bij
              </h2>
              <ul className="space-y-3">
                {included.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px]" style={{ color: "#a4a9b2" }}>
                    <Check className="w-4 h-4 mt-1 shrink-0" style={{ color: "#49de80" }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-white mb-6" style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Wat er niet bij zit
              </h2>
              <ul className="space-y-3">
                {notIncluded.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px]" style={{ color: "#a4a9b2" }}>
                    <span className="mt-1 shrink-0" style={{ color: "#868b94" }}>
                      —
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] leading-relaxed" style={{ color: "#868b94" }}>
                We zijn hier liever eerlijk over dan dat je er later achter komt. Wat we niet doen, is beloften
                verkopen over posities in Google.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-white mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Veelgestelde vragen over prijzen
            </h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q} className="pb-6" style={{ borderBottom: "1px solid #2a2b2b" }}>
                  <h3 className="text-white mb-2" style={{ fontSize: "16px", fontWeight: 500 }}>
                    {f.q}
                  </h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: "#a4a9b2" }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[15px]" style={{ color: "#a4a9b2" }}>
              Andere vragen? Bekijk de{" "}
              <Link to="/faq" style={{ color: "#ffffff" }}>
                volledige veelgestelde vragen
              </Link>{" "}
              of lees{" "}
              <Link to="/werkwijze" style={{ color: "#ffffff" }}>
                hoe we werken
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ background: "#161717" }}>
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Benieuwd wat jouw site kost?
            </h2>
            <p className="text-[16px] mb-8" style={{ color: "#a4a9b2" }}>
              Vertel kort wat je nodig hebt. Je krijgt binnen één werkdag een concreet antwoord met een vaste prijs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                Vraag een offerte aan
              </Link>
              <Link to="/website-laten-maken" className="btn-secondary">
                Website laten maken
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
