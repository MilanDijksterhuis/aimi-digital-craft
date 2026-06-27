import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="py-10" style={{ background: "#161717", borderTop: "1px solid #2a2b2b" }}>
      <div
        className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-between gap-4 text-xs"
        style={{ color: "#8a8f98", fontFamily: "Inter, sans-serif" }}
      >
        <span className="text-white font-medium">
          AIMI<span style={{ color: "#fe2c02" }}>.</span>
        </span>
        <span>© {new Date().getFullYear()} AIMI — Alle rechten voorbehouden</span>
        <div className="flex gap-4">
          <Link to="/privacybeleid" className="hover:text-white transition-colors">
            Privacybeleid
          </Link>
          <Link to="/algemene-voorwaarden" className="hover:text-white transition-colors">
            Algemene Voorwaarden voor AIMI
          </Link>
        </div>
      </div>
    </footer>
  );
}
