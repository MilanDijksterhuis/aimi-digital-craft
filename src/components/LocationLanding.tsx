import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Services } from "@/components/Services";
import { ProcessTimeline } from "@/components/ProcessTimeline";

/* ---------------------------------------------------------------------------
 * Herbruikbare lokale landingspagina ("Website laten maken in {plaats}").
 * Eén component, meerdere plaatsen — elke plaats krijgt een eigen route +
 * eigen canonical, H1 en content zodat Google ze los kan ranken.
 * Design volgt de huisstijl: donkere achtergrond, rood accent, Plus Jakarta Sans.
 * ------------------------------------------------------------------------- */

const RED = "#fe2c02";
const BG = "#1a1a1a";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

export type LocationData = {
  city: string; // "Veendam"
  region: string; // "Groningen"
  nearby: string[]; // omliggende plaatsen voor de tekst
  intro: string;
  related?: { label: string; href: string }[]; // contextuele interne links
};


export function LocationLanding({ data }: { data: LocationData }) {
  const { city, region, nearby, intro, related } = data;

  return (
    <div style={{ background: BG, color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      <Nav />

      <main id="main-content">
      <div className="mx-auto max-w-5xl px-6 pt-32">
        {/* Hero */}
        <section>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: RED,
            }}
          >
            Webdesign in {city} &amp; omstreken
          </div>
          <h1
            style={{
              margin: "14px 0 18px",
              fontSize: "clamp(26px, 4.2vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Website laten maken in {city}
          </h1>
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#b6b6bd", maxWidth: "60ch" }}>
            {intro}
          </p>
          <div style={{ marginTop: "26px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <a
              href="/contact"
              style={{
                padding: "12px 22px",
                background: RED,
                color: "#fff",
                borderRadius: "4px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Vraag een offerte aan
            </a>
            <a
              href="/#pricing"
              style={{
                padding: "12px 22px",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#efeff1",
                borderRadius: "4px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Bekijk tarieven
            </a>
          </div>
        </section>
      </div>

      {/* Wat we doen & Hoe we werken — zelfde componenten als de homepage */}
      <Services />
      <ProcessTimeline />

      <div className="mx-auto max-w-5xl px-6 pb-24">
        {/* Regio-tekst */}
        <section style={{ marginTop: "64px" }}>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 27px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Jouw webdesigner voor {city} en de regio {region}
          </h2>
          <p style={{ marginTop: "18px", fontSize: "14.5px", lineHeight: 1.75, color: "#b6b6bd", maxWidth: "68ch" }}>
            AIMI ontwerpt en bouwt websites en webshops voor ondernemers in {city} en omliggende plaatsen
            als {nearby.join(", ")}. Of je nu een nieuwe onderneming start of je bestaande website wilt
            vernieuwen: wij zorgen voor een snelle, moderne site die goed vindbaar is in Google en die
            past bij je merk. Omdat we alles zelf ontwerpen, bouwen én hosten, heb je één vast
            aanspreekpunt van het eerste gesprek tot en met de lancering.
          </p>
        </section>

        {/* Interne links */}
        {related && related.length > 0 && (
          <section style={{ marginTop: "56px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "14px", color: "#b6b6bd" }}>
              Ook interessant
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {related.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    padding: "9px 16px",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: "9999px",
                    fontSize: "13px",
                    color: "#efeff1",
                    textDecoration: "none",
                  }}
                >
                  {l.label} →
                </a>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section
          style={{
            marginTop: "64px",
            padding: "34px",
            borderRadius: "8px",
            border: "1px solid rgba(254,44,2,0.3)",
            background: "rgba(254,44,2,0.06)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "clamp(19px, 3vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Klaar voor een nieuwe website in {city}?
          </h2>
          <p style={{ margin: "12px auto 20px", fontSize: "14px", color: "#b6b6bd", maxWidth: "52ch" }}>
            Vertel ons kort over je plannen. Je krijgt binnen één werkdag een reactie en een vrijblijvende offerte.
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-block",
              padding: "13px 28px",
              background: RED,
              color: "#fff",
              borderRadius: "4px",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Neem contact op
          </a>
        </section>
      </div>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
