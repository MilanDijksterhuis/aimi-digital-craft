import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ClipboardList, Paintbrush, Code2, Rocket } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL, OG_IMAGE_URL, breadcrumbJsonLd } from "@/lib/seo";

const URL = `${SITE_URL}/werkwijze`;

const RED = "#fe2c02";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

const steps = [
  {
    icon: ClipboardList,
    title: "Kennismaking & briefing",
    desc: "We beginnen met een vrijblijvend gesprek. Wat doet je bedrijf, wie is je klant en wat moet de site opleveren? Zo weten we precies waar we het voor doen.",
  },
  {
    icon: Paintbrush,
    title: "Ontwerp",
    desc: "Je krijgt een concreet ontwerp te zien voordat er iets gebouwd wordt. Je geeft feedback en we schaven bij tot het klopt, geen verrassingen achteraf.",
  },
  {
    icon: Code2,
    title: "Bouwen & testen",
    desc: "We bouwen je site met moderne techniek, vullen 'm met content en testen op elk scherm en elke browser. Snelheid en vindbaarheid zitten er vanaf de basis in.",
  },
  {
    icon: Rocket,
    title: "Livegang & nazorg",
    desc: "We zetten de site live op onze eigen snelle hosting en blijven bereikbaar. Updates, aanpassingen of vragen? Je praat altijd direct met de mensen die je site gebouwd hebben.",
  },
];

const principles = [
  { title: "Direct contact", desc: "Je werkt rechtstreeks met Aidan of Milan. Geen accountmanagers, geen tussenlagen, geen wachttijden." },
  { title: "Vaste prijzen", desc: "Je weet vooraf wat het kost. Geen uurtje-factuurtje en geen verrassingen op de rekening." },
  { title: "Alles in eigen beheer", desc: "Design, development én hosting doen we zelf. Zo houden we kwaliteit en snelheid volledig in eigen hand." },
  { title: "Snel en betrokken", desc: "Korte lijnen betekenen snelle beslissingen. We denken met je mee, ook na de livegang." },
];

const standards = [
  { title: "Snel & mobiel", desc: "Groene Core Web Vitals en een perfecte weergave op elk apparaat." },
  { title: "Vindbaar in Google", desc: "Een nette technische SEO-basis zit standaard in elk project." },
  { title: "Veilig & up-to-date", desc: "SSL, dagelijkse back-ups en updates op onze eigen Nederlandse servers." },
];

export const Route = createFileRoute("/werkwijze")({
  head: () => ({
    meta: [
      { title: "Onze werkwijze | Zo bouwen wij jouw website | AIMI" },
      {
        name: "description",
        content:
          "Zo werkt AIMI: van kennismaking en ontwerp tot livegang en nazorg. Vaste prijzen, direct contact met de developers en volledig eigenaarschap na oplevering.",
      },
      { property: "og:title", content: "Onze werkwijze | AIMI" },
      { property: "og:description", content: "Van kennismaking tot livegang: zo bouwen wij jouw website. Vaste prijzen, direct contact." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Onze werkwijze | AIMI" },
      { name: "twitter:description", content: "Van kennismaking tot livegang: zo bouwen wij jouw website. Vaste prijzen, direct contact." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [breadcrumbJsonLd([["Home", "/"], ["Werkwijze", "/werkwijze"]])],
  }),
  component: WerkwijzePage,
});

function WerkwijzeVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: "8px",
        overflow: "hidden",
        background: "#000",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {inView && (
        <video
          src="/videos/werkwijze.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      )}
    </div>
  );
}

function WerkwijzePage() {
  return (
    <div style={{ background: "#1a1a1a", color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      <Nav />
      <main id="main-content" className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <a href="/" style={{ fontSize: "13px", color: "#a4a9b2", textDecoration: "none" }}>
          ← Terug naar home
        </a>
        <div style={{ marginTop: "28px", fontSize: "12px", fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: RED }}>
          Onze werkwijze
        </div>
        <h1 style={{ margin: "14px 0 18px", fontSize: "clamp(22px, 3.4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Zo bouwen wij jouw website
        </h1>
        <div style={{ display: "grid", gap: "32px 40px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "start" }}>
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#b6b6bd", maxWidth: "70ch" }}>
            Een goede website laten maken begint bij een goede aanpak. Bij AIMI werk je van begin tot
            eind direct met de twee developers die je site bouwen: Aidan &amp; Milan. Geen
            bureaupolitiek, geen tussenlagen, geen verrassingen, wel een helder webdesign-traject en
            vaste prijzen. Van de eerste kennismaking tot de livegang van je website of webshop, en ook
            daarna blijf je altijd rechtstreeks in contact met de mensen die je project bouwen.
            Hieronder lees je precies hoe ons ontwikkelproces eruitziet en wat je in elke fase kunt
            verwachten.
          </p>
          <WerkwijzeVideo />
        </div>

        {/* Proces */}
        <section style={{ marginTop: "72px" }}>
          <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Van idee naar livegang</h2>
          <div style={{ marginTop: "34px", display: "grid", gap: "40px 32px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "rgba(254,44,2,0.1)",
                      border: "1px solid rgba(254,44,2,0.22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px",
                    }}
                  >
                    <Icon size={18} color={RED} strokeWidth={1.75} />
                  </div>
                  <h3 style={{ fontSize: "15.5px", fontWeight: 600, marginBottom: "8px" }}>{s.title}</h3>
                  <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#9a9aa2" }}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Principes */}
        <section style={{ marginTop: "72px" }}>
          <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Waar we voor staan</h2>
          <div style={{ marginTop: "30px", display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            {principles.map((p) => (
              <div key={p.title} style={{ padding: "24px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>{p.title}</h3>
                <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#9a9aa2" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kwaliteitsstandaard */}
        <section style={{ marginTop: "72px" }}>
          <h2 style={{ fontSize: "clamp(17px, 2.3vw, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Wat elke site standaard meekrijgt</h2>
          <div style={{ marginTop: "26px", display: "grid", gap: "28px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {standards.map((s) => (
              <div key={s.title}>
                <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "7px" }}>{s.title}</h3>
                <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#9a9aa2" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interne links */}
        <section style={{ marginTop: "56px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "14px", color: "#b6b6bd" }}>Ook interessant</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {[
              { label: "Website laten maken", href: "/website-laten-maken" },
              { label: "Webshop laten maken", href: "/webshop-laten-maken" },
              { label: "Over ons", href: "/over-ons" },
            ].map((l) => (
              <a key={l.href} href={l.href} style={{ padding: "9px 16px", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "9999px", fontSize: "13px", color: "#efeff1", textDecoration: "none" }}>
                {l.label} →
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ marginTop: "56px", paddingTop: "40px", borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(19px, 3vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Klaar om te beginnen?</h2>
          <p style={{ margin: "12px auto 20px", fontSize: "14px", color: "#b6b6bd", maxWidth: "52ch" }}>
            Vertel ons kort over je plannen. Je krijgt binnen één werkdag een reactie en een vrijblijvende offerte.
          </p>
          <a href="/contact" style={{ display: "inline-block", padding: "13px 28px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
            Neem contact op
          </a>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
