import { Link } from "@tanstack/react-router";

/* ---------------------------------------------------------------------------
 * A-29 / S-8: elke publieke pagina had al BreadcrumbList-markup in de head,
 * maar nergens een zichtbaar broodkruimelpad. Google's richtlijn is dat markup
 * de zichtbare content weerspiegelt — en het levert meteen een extra laag
 * interne links op naar de hubs (/webdesign, /branches).
 *
 * De trail heeft exact dezelfde vorm als `breadcrumbJsonLd`, zodat je op een
 * pagina één constante kunt delen tussen head() en de UI.
 * ------------------------------------------------------------------------- */

export type Crumb = [label: string, path: string];

export function Breadcrumbs({ trail, className }: { trail: Crumb[]; className?: string }) {
  if (trail.length < 2) return null;

  return (
    <nav aria-label="Kruimelpad" className={className} style={{ fontSize: "13px", lineHeight: 1.6 }}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {trail.map(([label, path], i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={path} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {isLast ? (
                // Laatste kruimel is de huidige pagina: geen link.
                <span aria-current="page" style={{ color: "#a4a9b2" }}>
                  {label}
                </span>
              ) : (
                <Link to={path} style={{ color: "#868b94", textDecoration: "none" }}>
                  {label}
                </Link>
              )}
              {!isLast && (
                <span aria-hidden="true" style={{ color: "#5a5e66" }}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
