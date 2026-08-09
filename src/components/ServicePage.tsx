import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";

/* ---------------------------------------------------------------------------
 * Herbruikbare dienst-/contentpagina in de AIMI-huisstijl (donker + rood).
 * Elke pagina levert unieke content aan via props — geen thin content en geen
 * duplicate content. Bevat H1, dienst-uitleg, proces, prijsindicatie, FAQ,
 * interne links en een CTA richting /contact.
 * ------------------------------------------------------------------------- */

const RED = "#fe2c02";
const BG = "#0f0e0d";
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

export type ServiceFaq = { q: string; a: string };
export type InternalLink = { label: string; href: string };

export type ServicePageData = {
  kicker: string;
  h1: string;
  intro: string;
  offerings: { title: string; desc: string }[];
  steps: { title: string; desc: string }[];
  priceLabel: string;
  priceNote: string;
  faqs?: ServiceFaq[];
  related: InternalLink[];
  ctaTitle: string;
  ctaText: string;
};

export function ServicePage({ data }: { data: ServicePageData }) {
  const { kicker, h1, intro, offerings, steps, priceLabel, priceNote, faqs, related, ctaTitle, ctaText } = data;

  return (
    <div style={{ background: BG, color: "#efeff1", minHeight: "100dvh", fontFamily: FONT }}>
      <Nav />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Hero */}
        <section>
          <a href="/" style={{ fontSize: "13px", color: "#a4a9b2", textDecoration: "none" }}>
            ← Terug naar home
          </a>
          <div
            style={{
              marginTop: "28px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: RED,
            }}
          >
            {kicker}
          </div>
          <h1
            style={{
              margin: "18px 0 22px",
              fontSize: "clamp(34px, 6vw, 60px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.03,
            }}
          >
            {h1}
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#b6b6bd", maxWidth: "62ch" }}>{intro}</p>
          <div style={{ marginTop: "34px", display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <a
              href="/contact"
              style={{ padding: "14px 26px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
            >
              Vraag een offerte aan
            </a>
            <a
              href="/#pricing"
              style={{ padding: "14px 26px", border: "1px solid rgba(255,255,255,0.18)", color: "#efeff1", borderRadius: "4px", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
            >
              Bekijk tarieven
            </a>
          </div>
        </section>

        {/* Wat je krijgt */}
        <section style={{ marginTop: "88px" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Wat je krijgt</h2>
          <div
            style={{
              marginTop: "34px",
              display: "grid",
              gap: "18px",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {offerings.map((o) => (
              <div
                key={o.title}
                style={{ padding: "26px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>{o.title}</h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#9a9aa2" }}>{o.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Proces */}
        <section style={{ marginTop: "88px" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Zo werkt het</h2>
          <div style={{ marginTop: "34px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {steps.map((s, i) => (
              <div
                key={s.title}
                style={{ display: "flex", gap: "20px", padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div style={{ fontSize: "22px", fontWeight: 700, color: RED, minWidth: "40px" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "6px" }}>{s.title}</h3>
                  <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#9a9aa2" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prijs */}
        <section
          style={{
            marginTop: "88px",
            padding: "40px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.02)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div>
            <div style={{ fontSize: "13px", color: "#9a9aa2", marginBottom: "8px" }}>Prijsindicatie</div>
            <div style={{ fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em" }}>{priceLabel}</div>
            <p style={{ marginTop: "10px", fontSize: "14px", color: "#9a9aa2", maxWidth: "46ch" }}>{priceNote}</p>
          </div>
          <a
            href="/contact"
            style={{ padding: "15px 30px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "15px", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Offerte aanvragen
          </a>
        </section>

        {/* FAQ */}
        {faqs && faqs.length > 0 && (
          <section style={{ marginTop: "88px" }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Veelgestelde vragen</h2>
            <div style={{ marginTop: "30px" }}>
              {faqs.map((f) => (
                <details key={f.q} style={{ padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <summary style={{ cursor: "pointer", fontSize: "16.5px", fontWeight: 600, listStyle: "none" }}>{f.q}</summary>
                  <p style={{ marginTop: "12px", fontSize: "14.5px", lineHeight: 1.7, color: "#9a9aa2" }}>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Interne links */}
        {related.length > 0 && (
          <section style={{ marginTop: "72px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "18px", color: "#b6b6bd" }}>Ook interessant</h2>
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
            marginTop: "80px",
            padding: "44px",
            borderRadius: "8px",
            border: "1px solid rgba(254,44,2,0.3)",
            background: "rgba(254,44,2,0.06)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 700, letterSpacing: "-0.02em" }}>{ctaTitle}</h2>
          <p style={{ margin: "16px auto 26px", fontSize: "15.5px", color: "#b6b6bd", maxWidth: "52ch" }}>{ctaText}</p>
          <a
            href="/contact"
            style={{ display: "inline-block", padding: "15px 32px", background: RED, color: "#fff", borderRadius: "4px", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
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
