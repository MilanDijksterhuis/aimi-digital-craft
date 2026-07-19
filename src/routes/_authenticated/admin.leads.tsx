import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Target, CalendarClock, ChevronLeft } from "lucide-react";
import { LeadsPanel } from "@/components/LeadsPanel";
import { CallbackAgenda } from "@/components/CallbackAgenda";
import { usePermissions } from "@/hooks/use-permissions";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  head: () => ({
    meta: [{ title: "Leads — AIMI" }, { name: "robots", content: "noindex" }],
  }),
  component: LeadsPage,
});

// Secties binnen de Leads-pagina. Nieuwe features op deze pagina komen als
// extra sectie hierbij, zonder de bestaande weergaven te raken.
const SECTIONS = [
  { key: "leads" as const, label: "Leads", icon: Target },
  { key: "agenda" as const, label: "Terugbel-agenda", icon: CalendarClock },
];
type SectionKey = (typeof SECTIONS)[number]["key"];

function LeadsPage() {
  const perms = usePermissions();
  const [section, setSection] = useState<SectionKey>("leads");

  if (perms.isLoading) return <p className="text-muted-foreground">Laden…</p>;
  if (!perms.can("leads_view")) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6">
        <h2 className="font-display text-xl font-semibold">Geen toegang</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Je account heeft geen toegang tot de Leads-module.
        </p>
      </div>
    );
  }

  return (
    // Breekt uit de smalle max-w-7xl content-kolom, zodat de leadslijst
    // de volle breedte kan gebruiken. Bewust GEEN transform op deze wrapper:
    // een transform-voorouder breekt `position: fixed` van de pop-up.
    <div className="w-screen relative left-1/2 -ml-[50vw]">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 space-y-6">
        <Link
          to="/admin"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Terug naar menu
        </Link>

        <div>
          <h1 className="font-display text-4xl font-bold">Leads</h1>
          <p className="text-muted-foreground">
            Beheer je leads, plan terugbelacties en houd contact bij.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sectiemenu links — uitbreidbaar met toekomstige features. */}
          <nav
            aria-label="Leads secties"
            className="md:w-56 md:shrink-0 md:border-r border-border md:pr-4"
          >
            <ul className="flex md:flex-col gap-0.5 overflow-x-auto no-scrollbar">
              {SECTIONS.map((s) => {
                const Icon = s.icon;
                const active = section === s.key;
                return (
                  <li key={s.key}>
                    <button
                      onClick={() => setSection(s.key)}
                      className="w-full flex items-center gap-2 whitespace-nowrap px-2 py-1.5 text-sm transition-colors"
                      style={{
                        borderLeft: active ? "2px solid var(--primary)" : "2px solid transparent",
                        color: active ? "var(--primary)" : undefined,
                        paddingLeft: "8px",
                      }}
                      onMouseEnter={(e) => {
                        if (!active)
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)";
                      }}
                      onMouseLeave={(e) => {
                        if (!active) (e.currentTarget as HTMLButtonElement).style.color = "";
                      }}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex-1 min-w-0">
            {section === "leads" ? <LeadsPanel /> : <CallbackAgenda />}
          </div>
        </div>
      </div>
    </div>
  );
}
