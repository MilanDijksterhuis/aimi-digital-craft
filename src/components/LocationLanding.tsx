import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";

/* ---------------------------------------------------------------------------
 * Herbruikbare lokale landingspagina ("Website laten maken in {plaats}").
 * Eén component, meerdere plaatsen — elke plaats krijgt een eigen route +
 * eigen canonical, H1, content en FAQ zodat Google ze los kan ranken.
 * Design volgt de huisstijl: donkere achtergrond, rood accent, Plus Jakarta Sans.
 * ------------------------------------------------------------------------- */

const RED = "#fe2c02";
const BG = "#15151b";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

export type LocationFaq = { q: string; a: string };

export type LocationData = {
  city: string; // "Veendam"
  region: string; // "Groningen"
  nearby: string[]; // omliggende plaatsen voor de tekst
  intro: string;
  faqs: LocationFaq[];
  related?: { label: string; href: string }[]; // contextuele interne links
};

const SERVICES = [
  {
    title: "Website laten maken",
    desc: "Een snelle, professionele website op maat — ontworpen om bezoekers in klanten om te zetten.",
  },
  {
    title: "Webshop laten maken",
    desc: "Een verkoopklare webshop met betaalmethodes, voorraad en een beheeromgeving die werkt.",
  },
  {
    title: "SEO & vindbaarheid",
    desc: "Technische en content-SEO zodat je bovenaan Google komt op de zoekwoorden die klanten opleveren.",
  },
  {
    title: "Hosting & onderhoud",
    desc: "Snelle Nederlandse hosting, back-ups, updates en beveiliging — jij hebt er geen omkijken naar.",
  },
];

const REASONS = [
  {
    title: "Lokaal & bereikbaar",
    desc: "Korte lijnen, persoonlijk contact en iemand die je écht spreekt in plaats van een ticketsysteem.",
  },
  {
    title: "Snel & vindbaar",
    desc: "Sites die in het groen scoren op Core Web Vitals en gebouwd zijn om te ranken in Google.",
  },
  {
    title: "Vaste prijs, geen verrassingen",
    desc: "Heldere pakketten vanaf € 1.250. Je weet vooraf wat je krijgt en wat het kost.",
  },
];

export function LocationLanding({ data }: { data: LocationData }) {
  const { city, region, nearby, intro, faqs, related } = data;

  return (
    <div style={{ background: BG, color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      <Nav />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
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
              margin: "18px 0 22px",
              fontSize: "clamp(34px, 6vw, 62px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
            }}
          >
            Website laten maken in {city}
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#b6b6bd", maxWidth: "60ch" }}>
            {intro}
          </p>
          <div style={{ marginTop: "34px", display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <a
              href="/#contact"
              style={{
                padding: "14px 26px",
                background: RED,
                color: "#fff",
                borderRadius: "4px",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              Vraag een offerte aan
            </a>
            <a
              href="/#pricing"
              style={{
                padding: "14px 26px",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#efeff1",
                borderRadius: "4px",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              Bekijk tarieven
            </a>
          </div>
        </section>

        {/* Diensten */}
        <section style={{ marginTop: "88px" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Wat wij bouwen voor ondernemers in {city}
          </h2>
          <div
            style={{
              marginTop: "34px",
              display: "grid",
              gap: "18px",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {SERVICES.map((s) => (
              <div
                key={s.title}
                style={{
                  padding: "26px",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(9,9,11,0.4)",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>{s.title}</h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#9a9aa2" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Waarom AIMI */}
        <section style={{ marginTop: "88px" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Waarom bedrijven uit {city} voor AIMI kiezen
          </h2>
          <div
            style={{
              marginTop: "34px",
              display: "grid",
              gap: "18px",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {REASONS.map((r) => (
              <div key={r.title}>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    background: RED,
                    transform: "rotate(45deg)",
                    marginBottom: "16px",
                  }}
                />
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>{r.title}</h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#9a9aa2" }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Regio-tekst */}
        <section style={{ marginTop: "88px" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Jouw webdesigner voor {city} en de regio {region}
          </h2>
          <p style={{ marginTop: "24px", fontSize: "16px", lineHeight: 1.8, color: "#b6b6bd", maxWidth: "68ch" }}>
            AIMI ontwerpt en bouwt websites en webshops voor ondernemers in {city} en omliggende plaatsen
            als {nearby.join(", ")}. Of je nu een nieuwe onderneming start of je bestaande website wilt
            vernieuwen: wij zorgen voor een snelle, moderne site die goed vindbaar is in Google en die
            past bij je merk. Omdat we alles zelf ontwerpen, bouwen én hosten, heb je één vast
            aanspreekpunt van het eerste gesprek tot en met de lancering.
          </p>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: "88px" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Veelgestelde vragen — website laten maken in {city}
          </h2>
          <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {faqs.map((f) => (
              <details
                key={f.q}
                style={{
                  padding: "20px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontSize: "16.5px",
                    fontWeight: 600,
                    listStyle: "none",
                  }}
                >
                  {f.q}
                </summary>
                <p style={{ marginTop: "12px", fontSize: "14.5px", lineHeight: 1.7, color: "#9a9aa2" }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Interne links */}
        {related && related.length > 0 && (
          <section style={{ marginTop: "72px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "18px", color: "#b6b6bd" }}>
              Ook interessant
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {related.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    padding: "10px 18px",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: "9999px",
                    fontSize: "14px",
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
            marginTop: "88px",
            padding: "44px",
            borderRadius: "8px",
            border: "1px solid rgba(254,44,2,0.3)",
            background: "rgba(254,44,2,0.06)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Klaar voor een nieuwe website in {city}?
          </h2>
          <p style={{ margin: "16px auto 26px", fontSize: "15.5px", color: "#b6b6bd", maxWidth: "52ch" }}>
            Vertel ons kort over je plannen. Je krijgt binnen één werkdag een reactie en een vrijblijvende offerte.
          </p>
          <a
            href="/#contact"
            style={{
              display: "inline-block",
              padding: "15px 32px",
              background: RED,
              color: "#fff",
              borderRadius: "4px",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            Neem contact op
          </a>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
