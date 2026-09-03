import { PHONE_DISPLAY, PHONE_E164, ACTIVE_SINCE_YEAR } from "@/lib/seo";

/* SEO-audit 2026-09-02 (sxo.md SXO-1): stad- en branchepagina's misten elk
 * checkbaar vertrouwenssignaal (jaartal, werkgebied, contact) terwijl
 * rankende concurrenten dat vooraan zetten. Eén herbruikbare strip i.p.v.
 * los tekstwerk per pagina — geen jaartal/aantal verzinnen, alleen tonen wat
 * we ook echt weten. */
export function TrustStrip({ areaLabel }: { areaLabel: string }) {
  return (
    <div
      style={{
        marginTop: "22px",
        display: "flex",
        flexWrap: "wrap",
        gap: "10px 22px",
        fontSize: "13px",
        color: "#9a9aa2",
      }}
    >
      <span>Actief sinds {ACTIVE_SINCE_YEAR}</span>
      <span aria-hidden="true">·</span>
      <span>Werkgebied: {areaLabel}</span>
      <span aria-hidden="true">·</span>
      <a href={`tel:${PHONE_E164}`} style={{ color: "#9a9aa2" }}>
        {PHONE_DISPLAY}
      </a>
    </div>
  );
}
