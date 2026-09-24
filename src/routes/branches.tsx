import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL, OG_IMAGE_URL, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

const RED = "#fe2c02";
const BG = "#1a1a1a";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const URL = `${SITE_URL}/branches`;

type Branche = { label: string; href: string; desc: string };
type BrancheGroup = { id: string; label: string; intro: string; items: Branche[] };

export const brancheGroups: BrancheGroup[] = [
  {
    id: "wellness-beauty",
    label: "Wellness & beauty",
    intro: "Boekingen, portfolio en behandelmenu voorop.",
    items: [
      { label: "Website laten maken voor je kapsalon", href: "/website-laten-maken-kapsalon", desc: "Online afspraken, prijslijst, team en foto's van je werk" },
      { label: "Website laten maken voor je nagelstudio", href: "/website-laten-maken-nagelstudio", desc: "Portfolio van nailart, snel laden, online boeken" },
      { label: "Website laten maken voor je schoonheidssalon", href: "/website-laten-maken-schoonheidssalon", desc: "Behandelmenu, intake, cadeaubonnen" },
      { label: "Website laten maken voor je pedicurepraktijk", href: "/website-laten-maken-pedicure", desc: "Vertrouwenwekkend, leesbaar, eenvoudig afspraken maken" },
    ],
  },
  {
    id: "bouw-klussen",
    label: "Bouw & klussen",
    intro: "Offertes, projectfoto's en werkgebied duidelijk in beeld.",
    items: [
      { label: "Website laten maken voor je hoveniersbedrijf", href: "/website-laten-maken-hovenier", desc: "Voor- en na-foto's, offerteaanvraag, werkgebied" },
      { label: "Website laten maken voor je klusbedrijf", href: "/website-laten-maken-klusbedrijf", desc: "Offerte met foto-upload, mobiel-first" },
      { label: "Website laten maken voor je schildersbedrijf", href: "/website-laten-maken-schilder", desc: "Projectfoto's, offerteaanvraag, seizoensplanning" },
      { label: "Website laten maken voor je loodgietersbedrijf", href: "/website-laten-maken-loodgieter", desc: "Telefoonnummer voorop, spoedgevallen, snel op mobiel" },
    ],
  },
  {
    id: "mobiliteit",
    label: "Mobiliteit",
    intro: "Voorraad, pakketten en inschrijvingen die converteren.",
    items: [
      { label: "Website laten maken voor je autobedrijf", href: "/website-laten-maken-autobedrijf", desc: "Actuele occasionvoorraad, aparte ingang voor de werkplaats" },
      { label: "Website laten maken voor je autorijschool", href: "/website-laten-maken-autorijschool", desc: "Heldere pakketprijzen, leerlingervaringen, online inschrijven" },
    ],
  },
  {
    id: "zakelijke-dienstverlening",
    label: "Zakelijke dienstverlening",
    intro: "Vertrouwen opbouwen en de juiste doelgroep aanspreken.",
    items: [
      { label: "Website laten maken voor je makelaarskantoor", href: "/website-laten-maken-makelaar", desc: "Verkopers overtuigen, verkochte woningen als bewijs" },
      { label: "Website laten maken voor je administratiekantoor", href: "/website-laten-maken-boekhouder", desc: "Opgesplitst per type ondernemer, overstap uitgelegd" },
    ],
  },
  {
    id: "horeca-retail",
    label: "Horeca & retail",
    intro: "Openingstijden, kaart en bestellen vooraan.",
    items: [
      { label: "Website laten maken voor je restaurant", href: "/website-laten-maken-restaurant", desc: "Openingstijden en kaart vooraan, snel reserveren" },
      { label: "Website laten maken voor je cateringbedrijf", href: "/website-laten-maken-cateringbedrijf", desc: "Formules, richtprijzen en bruikbare offerteaanvragen" },
      { label: "Website laten maken voor je bloemenwinkel", href: "/website-laten-maken-bloemist", desc: "Bestellen en bezorgen, rouwwerk apart, grip op piekdagen" },
    ],
  },
];

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Website laten maken per branche | AIMI" },
      {
        name: "description",
        content: "AIMI bouwt websites die aansluiten op hoe jouw vakgebied werkt. Bekijk per branche, van kapsalon tot klusbedrijf, wat een website écht moet kunnen.",
      },
      { property: "og:title", content: "Website laten maken per branche | AIMI" },
      { property: "og:description", content: "Websites op maat voor kappers, hoveniers, klussenbedrijven en meer vakgebieden." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website laten maken per branche | AIMI" },
      { name: "twitter:description", content: "Websites op maat voor kappers, hoveniers, klussenbedrijven en meer vakgebieden." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      // P2-9: de hub is een lijst van branchepagina's, geen losse Service.
      // ItemList weerspiegelt de zichtbare navigatiestructuur.
      itemListJsonLd({
        name: "Website laten maken per branche",
        items: brancheGroups.flatMap((g) =>
          g.items.map((b) => ({ name: b.label, url: `${SITE_URL}${b.href}` })),
        ),
      }),
      breadcrumbJsonLd([["Home", "/"], ["Branches", "/branches"]]),
    ],
  }),
  component: () => {
    // Uitklapbare branchecategorieën i.p.v. alles in één keer tonen, zodat een
    // bezoeker zelf kiest welk vakgebied hij wil zien. Zelfde accordeon-taal
    // (motion height/opacity, Plus-icoon dat 45° roteert) als de FAQ-accordeon
    // op de homepage (zie FAQ.tsx), voor consistentie in het design.
    function BranchAccordion() {
      // P2-9: alle groepen standaard open, zodat alle branchelinks meteen
      // zichtbaar zijn i.p.v. verstopt achter een dichtgeklapte accordeon.
      const [openIds, setOpenIds] = useState<Set<string>>(
        new Set(brancheGroups.map((g) => g.id)),
      );

      const toggle = (id: string) => {
        setOpenIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });
      };

      return (
        <div style={{ marginTop: "56px", display: "grid", gap: "10px" }}>
          {brancheGroups.map((group) => {
            const isOpen = openIds.has(group.id);
            const panelId = `${group.id}-panel`;
            return (
              <section
                key={group.id}
                id={group.id}
                style={{
                  scrollMarginTop: "100px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <h2 style={{ margin: 0 }}>
                  <button
                    type="button"
                    onClick={() => toggle(group.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      padding: "20px 22px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      color: "#efeff1",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        flexWrap: "wrap",
                        gap: "12px",
                        borderLeft: `2px solid ${RED}`,
                        paddingLeft: "14px",
                      }}
                    >
                      <span style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                        {group.label}
                      </span>
                      <span style={{ fontSize: "13px", color: "#868b94", fontWeight: 400 }}>{group.intro}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: "inline-flex", color: isOpen ? RED : "#a4a9b2", flexShrink: 0 }}
                    >
                      <Plus className="w-5 h-5" strokeWidth={1.5} />
                    </motion.span>
                  </button>
                </h2>
                <motion.div
                  id={panelId}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <ul
                    style={{
                      margin: 0,
                      padding: "0 22px 22px",
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                      gap: "10px",
                      listStyle: "none",
                    }}
                  >
                    {group.items.map((b) => (
                      <li key={b.href}>
                        <a
                          href={b.href}
                          style={{
                            display: "block",
                            padding: "16px 18px",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "6px",
                            color: "#efeff1",
                            textDecoration: "none",
                          }}
                        >
                          <div style={{ fontSize: "14px", fontWeight: 600 }}>{b.label}</div>
                          <div style={{ marginTop: "4px", fontSize: "12.5px", color: "#a4a9b2" }}>{b.desc}</div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </section>
            );
          })}
        </div>
      );
    }

    return (
      <div style={{ background: BG, color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
        <Nav />
        <main id="main-content">
          <div className="mx-auto max-w-5xl px-6 pt-32">
            <section>
              <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: RED }}>
                Webdesign per branche
              </div>
              <h1 style={{ margin: "14px 0 18px", fontSize: "clamp(24px, 3.6vw, 36px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Een website die past bij je vak
              </h1>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#b6b6bd", maxWidth: "62ch" }}>
                Elk vakgebied heeft andere eisen aan een website: een kapsalon leeft van online boeken, een
                loodgieter van een telefoonnummer dat meteen opvalt. AIMI bouwt en host websites die
                functioneel aansluiten op hoe jouw bedrijf werkt. Klap hieronder je branche open, of ga naar
                onze{" "}
                <a href="/webdesign" style={{ color: RED }}>
                  webdesign-hubpagina
                </a>
                .
              </p>
              <div style={{ marginTop: "26px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <a href="/contact" style={{ padding: "12px 22px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                  Vraag een offerte aan
                </a>
              </div>
            </section>

            <BranchAccordion />
            <div style={{ paddingBottom: "96px" }} />
          </div>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    );
  },
});
