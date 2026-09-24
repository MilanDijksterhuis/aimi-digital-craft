import { brancheGroups } from "@/routes/branches";

/* ---------------------------------------------------------------------------
 * SEO-audit 2026-09 (P1-5): de branchepagina's kregen geen enkele contextuele
 * inlink vanaf de homepage of /website-laten-maken. Dit blok linkt ze allemaal,
 * bewust als editorial tekstlinks per groep — geen genummerde kopjes en geen
 * grid van bordered cards (zie de design-regels in CLAUDE.md).
 * ------------------------------------------------------------------------- */

const RED = "#fe2c02";

/** Korte branchenaam voor de tekstlink: "Website laten maken voor je kapsalon"
 * → "Kapsalon". Houdt de link kort en scanbaar. */
function shortLabel(label: string): string {
  const term = label.replace(/^Website laten maken voor je\s+/i, "");
  return term.charAt(0).toUpperCase() + term.slice(1);
}

export function BranchLinks({ heading = "Ook voor jouw vak" }: { heading?: string }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
        {heading}
      </h2>
      <p style={{ marginTop: "12px", fontSize: "16px", lineHeight: 1.7, color: "#b6b6bd", maxWidth: "64ch" }}>
        Elk vakgebied vraagt iets anders van een website. We schreven per branche uit wat er echt toe doet
        — kies de jouwe, of bekijk{" "}
        <a href="/branches" style={{ color: RED, textDecoration: "none" }}>
          alle branches
        </a>
        .
      </p>

      <div
        style={{
          marginTop: "28px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "26px 32px",
        }}
      >
        {brancheGroups.map((group) => (
          <div key={group.id}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                paddingLeft: "10px",
                borderLeft: `2px solid ${RED}`,
                marginBottom: "10px",
              }}
            >
              {group.label}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "7px" }}>
              {group.items.map((b) => (
                <li key={b.href}>
                  <a
                    href={b.href}
                    style={{ fontSize: "15px", color: "#d7d7dc", textDecoration: "none" }}
                  >
                    {shortLabel(b.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
