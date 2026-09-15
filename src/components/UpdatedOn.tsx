import { formatDateNL, pageLastmod } from "@/lib/seo";

/* Zichtbare versheidsregel (GEO-audit 2026-09-06, punt 8.1). Een `dateModified`
 * in het schema is het machinesignaal; deze regel is de menselijke tegenhanger
 * die AI-antwoordmachines óók oppikken als bewijs dat de content actueel is.
 * Leest dezelfde datum als de sitemap en het WebPage-schema, uit PAGE_DATES. */
export function UpdatedOn({
  path,
  className,
  style,
}: {
  path: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const iso = pageLastmod(path);
  return (
    <p
      className={className}
      style={{
        fontSize: "13px",
        color: "#868b94",
        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
        ...style,
      }}
    >
      Bijgewerkt op{" "}
      <time dateTime={iso} style={{ color: "#a4a9b2" }}>
        {formatDateNL(iso)}
      </time>
    </p>
  );
}
