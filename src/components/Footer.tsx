import { Link } from "@tanstack/react-router";

const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

const columns: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Diensten",
    links: [
      { label: "Website laten maken", to: "/website-laten-maken" },
      { label: "Webshop laten maken", to: "/webshop-laten-maken" },
      { label: "Onderhoud & hosting", to: "/onderhoud-hosting" },
      { label: "Meer diensten", to: "/meer-diensten" },
    ],
  },
  {
    heading: "Regio",
    links: [
      { label: "Website laten maken Veendam", to: "/website-laten-maken-veendam" },
      { label: "Website laten maken Hoogeveen", to: "/website-laten-maken-hoogeveen" },
    ],
  },
  {
    heading: "AIMI",
    links: [
      { label: "Over ons", to: "/over-ons" },
      { label: "Werkwijze", to: "/werkwijze" },
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

export function Footer() {
  return (
    <footer style={{ background: "#161717", borderTop: "1px solid #2a2b2b", fontFamily: FONT }}>
      <div className="mx-auto max-w-7xl px-6 py-14">
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

        <div
          className="mt-12 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs"
          style={{ borderTop: "1px solid #2a2b2b", color: "#868b94" }}
        >
          <span className="text-white font-medium">
            AIMI<span style={{ color: "#fe2c02" }}>.</span>
          </span>
          <span>Webdevelopment uit Veendam &amp; Hoogeveen — voor heel Nederland</span>
          <span>© {new Date().getFullYear()} AIMI — Alle rechten voorbehouden</span>
        </div>
      </div>
    </footer>
  );
}
