import { Link } from "@tanstack/react-router";
import { PHONE_DISPLAY, PHONE_E164, ACTIVE_SINCE_YEAR, ADDRESS, KVK, VAT_ID } from "@/lib/seo";

const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

const columns: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Diensten",
    links: [
      { label: "Website laten maken", to: "/website-laten-maken" },
      { label: "Website laten vernieuwen", to: "/website-laten-vernieuwen" },
      { label: "Webshop laten maken", to: "/webshop-laten-maken" },
      { label: "SEO", to: "/seo" },
      { label: "Onderhoud & hosting", to: "/onderhoud-hosting" },
      { label: "Tarieven", to: "/tarieven" },
      { label: "Meer diensten", to: "/meer-diensten" },
      { label: "Webdesign per branche", to: "/branches" },
    ],
  },
  {
    heading: "Regio",
    links: [
      { label: "Webdesign per regio", to: "/webdesign" },
      { label: "Website laten maken Veendam", to: "/website-laten-maken-veendam" },
      { label: "Website laten maken Hoogeveen", to: "/website-laten-maken-hoogeveen" },
      { label: "Website laten maken Groningen", to: "/website-laten-maken-groningen" },
    ],
  },
  {
    heading: "AIMI",
    links: [
      { label: "Over ons", to: "/over-ons" },
      { label: "Werkwijze", to: "/werkwijze" },
      { label: "WordPress of maatwerk", to: "/wordpress-of-maatwerk" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Juridisch",
    links: [
      { label: "Privacybeleid", to: "/privacybeleid" },
      { label: "Algemene voorwaarden", to: "/algemene-voorwaarden" },
    ],
  },
];

/* A-30: de footer linkte 2 van de 15 plaatsen en 0 van de 8 branches, waardoor
   de hele long tail op één hublink + related-chips leunde. Deze twee rijen geven
   elke landingspagina een interne link vanaf álle 36 publieke pagina's. */
const cities: { label: string; to: string }[] = [
  ["Veendam", "veendam"],
  ["Hoogeveen", "hoogeveen"],
  ["Groningen", "groningen"],
  ["Assen", "assen"],
  ["Hoogezand", "hoogezand"],
  ["Stadskanaal", "stadskanaal"],
  ["Emmen", "emmen"],
  ["Winschoten", "winschoten"],
  ["Roden", "roden"],
  ["Coevorden", "coevorden"],
  ["Meppel", "meppel"],
  ["Leeuwarden", "leeuwarden"],
  ["Drachten", "drachten"],
  ["Heerenveen", "heerenveen"],
  ["Sneek", "sneek"],
].map(([label, slug]) => ({ label, to: `/website-laten-maken-${slug}` }));

const branches: { label: string; to: string }[] = [
  ["Kapsalon", "kapsalon"],
  ["Nagelstudio", "nagelstudio"],
  ["Schoonheidssalon", "schoonheidssalon"],
  ["Pedicure", "pedicure"],
  ["Hoveniersbedrijf", "hovenier"],
  ["Klusbedrijf", "klusbedrijf"],
  ["Schildersbedrijf", "schilder"],
  ["Loodgietersbedrijf", "loodgieter"],
  ["Autobedrijf", "autobedrijf"],
  ["Autorijschool", "autorijschool"],
  ["Makelaarskantoor", "makelaar"],
  ["Administratiekantoor", "boekhouder"],
  ["Restaurant", "restaurant"],
  ["Cateringbedrijf", "cateringbedrijf"],
  ["Bloemenwinkel", "bloemist"],
].map(([label, slug]) => ({ label, to: `/website-laten-maken-${slug}` }));

function LinkRow({ heading, items }: { heading: string; items: { label: string; to: string }[] }) {
  return (
    <nav aria-label={heading}>
      <div className="text-white text-sm font-medium mb-3">{heading}</div>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {items.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="text-xs transition-colors hover:text-white"
              style={{ color: "#a4a9b2" }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const hasAddress = Boolean(ADDRESS.streetAddress && ADDRESS.postalCode);
  return (
    <footer style={{ background: "#161717", borderTop: "1px solid #2a2b2b", fontFamily: FONT }}>
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* NAP-blok (SEO-audit 2026-09-02: local.md #1, content.md CQ-1) —
            telefoonnummer stond nergens zichtbaar op de site, alleen als
            e-mailadres. Nu op elke pagina bereikbaar via de footer. */}
        <div
          className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs"
          style={{ color: "#a4a9b2" }}
        >
          <a
            href={`tel:${PHONE_E164}`}
            className="transition-colors hover:text-white"
            style={{ color: "#a4a9b2" }}
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href="mailto:sales@aimi-development.nl"
            className="transition-colors hover:text-white"
            style={{ color: "#a4a9b2" }}
          >
            sales@aimi-development.nl
          </a>
          <span>Veendam — actief sinds {ACTIVE_SINCE_YEAR}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <div className="text-white text-sm font-medium mb-4">{col.heading}</div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-xs transition-colors hover:text-white"
                      style={{ color: "#a4a9b2" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-8 grid gap-8" style={{ borderTop: "1px solid #2a2b2b" }}>
          <LinkRow heading="Website laten maken in" items={cities} />
          <LinkRow heading="Website laten maken voor je" items={branches} />
        </div>

        {/* Bedrijfsgegevens — SEO-audit 2026-09-04 (content.md CQ-1, local.md
            LOC-1/LOC-2). KvK en BTW-ID zijn wettelijk verplicht op een
            Nederlandse bedrijfswebsite, en adres + registratienummer zijn de
            goedkoopste vertrouwenssignalen die er zijn. Elk onderdeel rendert
            alleen als het in seo.ts is ingevuld, zodat er nooit een half of
            leeg adres op de site komt te staan. */}
        {(hasAddress || KVK || VAT_ID) && (
          <div
            className="mt-12 pt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs"
            style={{ borderTop: "1px solid #2a2b2b", color: "#868b94" }}
          >
            {hasAddress && (
              <address className="not-italic">
                AIMI — {ADDRESS.streetAddress}, {ADDRESS.postalCode} {ADDRESS.addressLocality}
              </address>
            )}
            {KVK && <span>KvK {KVK}</span>}
            {VAT_ID && <span>BTW {VAT_ID}</span>}
          </div>
        )}

        <div
          className="mt-12 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs"
          style={{ borderTop: "1px solid #2a2b2b", color: "#868b94" }}
        >
          <span className="text-white font-medium">
            AIMI<span style={{ color: "#fe2c02" }}>.</span>
          </span>
          <span>Webdesign uit Noord-Nederland — voor heel Nederland</span>
          <span>© {new Date().getFullYear()} AIMI — Alle rechten voorbehouden</span>
        </div>
      </div>
    </footer>
  );
}
