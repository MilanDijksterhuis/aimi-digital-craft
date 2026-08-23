import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL, OG_IMAGE_URL, breadcrumbJsonLd } from "@/lib/seo";
import { checkWebsite } from "@/lib/website-checker.functions";
import { submitContactForm } from "@/lib/contact.functions";
import type { WebsiteCheckReport, CheckResult } from "@/lib/website-checker.server";

const PAGE_URL = `${SITE_URL}/website-checker`;
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-mono)";

// ============================================================
// Palette — achtergrond gelijk aan de rest van de site (#1a1a1a, zie
// /faq en /werkwijze), rest van de tokens specifiek voor deze pagina.
// ============================================================
const BG = "#1a1a1a";
const FG = "#f2f1ef";
const FG_SECONDARY = "#a9a7a4";
const FG_TERTIARY = "#6f6d6a";
const HAIRLINE = "rgba(255,255,255,.08)";
const HAIRLINE_STRONG = "rgba(255,255,255,.12)";
const RED = "#ff3b21";

export const Route = createFileRoute("/website-checker")({
  head: () => ({
    meta: [
      { title: "Gratis Website Check | Score jouw site in 10 seconden — AIMI" },
      {
        name: "description",
        content:
          "Check gratis en direct hoe jouw website scoort op techniek, SEO, snelheid en mobielvriendelijkheid. Geen account nodig, resultaat binnen enkele seconden.",
      },
      { property: "og:title", content: "Gratis Website Check — AIMI" },
      { property: "og:description", content: "Score jouw website op techniek, SEO, snelheid en mobiel. Gratis en direct." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gratis Website Check — AIMI" },
      { name: "twitter:description", content: "Score jouw website op techniek, SEO, snelheid en mobiel. Gratis en direct." },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [breadcrumbJsonLd([["Home", "/"], ["Website Checker", "/website-checker"]])],
  }),
  component: WebsiteCheckerPage,
});

function isLikelyValidUrl(value: string): boolean {
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const u = new URL(candidate);
    return /\./.test(u.hostname) && u.hostname.length > 3;
  } catch {
    return false;
  }
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/** Telt met een simpele ease-out (rAF, geen library-afhankelijkheid) van 0
 * naar `target` — herstart bij elke wijziging van `resetKey` zodat een
 * nieuwe scan het cijfer opnieuw laat oplopen i.p.v. te springen. */
function useCountUp(target: number, resetKey: unknown, reduced: boolean, durationMs = 900): number {
  const [value, setValue] = useState(reduced ? target : 0);
  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, resetKey, reduced, durationMs]);
  return value;
}

// ============================================================
// Voorbeeld-data — getoond zolang er nog geen echte scan is uitgevoerd.
// Nooit als echt resultaat opgeslagen of teruggegeven door de server.
// ============================================================
const EXAMPLE = {
  domain: "voorbeeldbedrijf.nl",
  score: 74,
  categorieen: { Technisch: 92, SEO: 58, Performance: 81, Mobile: 88 },
  findings: ["SEO: meerdere aandachtspunten gevonden.", "Techniek: 1 aandachtspunt gevonden."],
  attentionGroups: new Set(["Vindbaarheid"]),
};

const HERO_CATEGORIES: { key: "Technisch" | "SEO" | "Performance" | "Mobile"; label: string }[] = [
  { key: "Technisch", label: "Techniek" },
  { key: "SEO", label: "SEO" },
  { key: "Performance", label: "Snelheid" },
  { key: "Mobile", label: "Mobiel" },
];

function scoreVerdict(score: number): string {
  if (score >= 80) return "sterke basis";
  if (score >= 50) return "ruimte voor winst";
  return "veel te verbeteren";
}

function buildCheckMap(report: WebsiteCheckReport | null): Map<string, CheckResult> | null {
  if (!report) return null;
  const map = new Map<string, CheckResult>();
  for (const cat of report.categorieen) for (const c of cat.checks) map.set(c.id, c);
  return map;
}

/** Toont bewust géén exacte bevindingen (geen specifieke check-namen of
 * teksten) — alleen een globaal aantal aandachtspunten per categorie, zodat
 * bezoekers ongeveer weten waar het schort maar voor het volledige beeld
 * contact moeten opnemen. */
function getFindings(report: WebsiteCheckReport | null): string[] {
  if (!report) return EXAMPLE.findings;
  const withIssues = report.categorieen
    .map((c) => ({ label: HERO_CATEGORIES.find((h) => h.key === c.naam)?.label ?? c.naam, count: c.checks.filter((chk) => chk.status !== "pass").length }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);
  if (withIssues.length === 0) return ["Geen directe aandachtspunten gevonden — knap gedaan."];
  return withIssues.slice(0, 2).map((c) => `${c.label}: ${c.count === 1 ? "1 aandachtspunt gevonden." : "meerdere aandachtspunten gevonden."}`);
}

function WebsiteCheckerPage() {
  const [url, setUrl] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<WebsiteCheckReport | null>(null);
  const [resultVersion, setResultVersion] = useState(0);
  const reduced = usePrefersReducedMotion();

  const valid = isLikelyValidUrl(url);
  const checkMap = useMemo(() => buildCheckMap(report), [report]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid || loading) return;

    setLoading(true);
    setError(null);
    try {
      const result = await checkWebsite({ data: { url } });
      setReport(result);
      setResultVersion((v) => v + 1);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("RATE_LIMITED")) {
        const seconds = parseInt(message.split(":")[1] ?? "0", 10);
        const minutes = Math.ceil(seconds / 60);
        setError(`Je hebt het maximum van 5 checks per uur bereikt. Probeer het over ongeveer ${minutes} minuut/minuten opnieuw.`);
      } else {
        setError("De check kon niet worden uitgevoerd. Controleer de URL en probeer het opnieuw.");
      }
    } finally {
      setLoading(false);
    }
  }

  const contentKey = loading ? "loading" : report ? `report-${resultVersion}` : "example";

  return (
    <div className="min-h-screen" style={{ background: BG, color: FG }}>
      <Nav />
      <main id="main-content">
        <section className="pt-32 pb-16 px-6 lg:px-10">
          <div className="mx-auto" style={{ maxWidth: 1080 }}>
            <div className="lg:grid lg:gap-12" style={{ gridTemplateColumns: "1fr 380px" }}>
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span style={{ width: 20, height: 1, background: RED, display: "inline-block" }} />
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 10,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: RED,
                      }}
                    >
                      Gratis website check
                    </span>
                  </div>

                  <h1
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)",
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.05,
                      color: FG,
                    }}
                  >
                    Hoe scoort
                    <br />
                    jouw website?
                  </h1>

                  <p className="mt-4" style={{ fontSize: 15, color: FG_SECONDARY, maxWidth: 400, lineHeight: 1.55 }}>
                    Vul je URL in en krijg direct een écht uitgevoerde scan op techniek, SEO,
                    snelheid en mobielvriendelijkheid.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-7 flex flex-col sm:flex-row gap-2.5">
                    <label htmlFor="website-url" className="sr-only">
                      Website URL
                    </label>
                    <input
                      id="website-url"
                      type="text"
                      inputMode="url"
                      autoComplete="url"
                      placeholder="jouwwebsite.nl"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onBlur={() => setTouched(true)}
                      className="flex-1 outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b21] focus-visible:ring-offset-0"
                      style={{
                        height: 46,
                        borderRadius: 9999,
                        padding: "0 18px",
                        background: "transparent",
                        border: `1px solid ${touched && !valid && url ? "#ef4444" : "rgba(255,255,255,.16)"}`,
                        color: FG,
                        fontFamily: MONO,
                        fontSize: 13,
                      }}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b21] focus-visible:ring-offset-0"
                      style={{
                        height: 46,
                        borderRadius: 9999,
                        padding: "0 26px",
                        background: RED,
                        color: "#ffffff",
                        fontFamily: FONT,
                        fontWeight: 600,
                        fontSize: 13,
                        border: "none",
                        cursor: loading ? "default" : "pointer",
                        opacity: loading ? 0.75 : 1,
                        transition: "background-color 150ms ease-out",
                      }}
                    >
                      {loading ? "Scan bezig…" : "Check mijn website"}
                    </button>
                  </form>

                  {touched && !valid && url && (
                    <p className="mt-2.5 text-xs" style={{ color: "#ef4444" }}>
                      Vul een geldige website-URL in, bijvoorbeeld jouwwebsite.nl
                    </p>
                  )}
                  {error && (
                    <p className="mt-2.5 text-xs" style={{ color: "#ef4444" }}>
                      {error}
                    </p>
                  )}
                  {!error && (!touched || valid || !url) && (
                    <p className="mt-3" style={{ fontSize: 11.5, color: FG_TERTIARY }}>
                      Geen account, geen installatie. Resultaat binnen enkele seconden.
                    </p>
                  )}
                </motion.div>

                <motion.div
                  className="mt-10 lg:mt-0"
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  aria-live="polite"
                >
                  <ReportCard
                    key={contentKey}
                    mode={loading ? "loading" : report ? "real" : "example"}
                    report={report}
                    url={url}
                    checkMap={checkMap}
                    reduced={reduced}
                  />
                </motion.div>
              </div>
          </div>
        </section>

        <ChecksSection checkMap={checkMap} reduced={reduced} />

        <ClosingBlock url={url} />

        <Footer />
      </main>
      <CookieBanner />
    </div>
  );
}

// ============================================================
// Rapportkaart (hero, rechts) — voorbeeld vóór de eerste scan, skeleton
// tijdens het scannen, echte data erna.
// ============================================================
function ReportCard({
  mode,
  report,
  url,
  checkMap,
  reduced,
}: {
  mode: "loading" | "example" | "real";
  report: WebsiteCheckReport | null;
  url: string;
  checkMap: Map<string, CheckResult> | null;
  reduced: boolean;
}) {
  const score = mode === "real" && report ? report.score : EXAMPLE.score;
  const countedScore = useCountUp(score, mode, reduced);
  const domainLabel =
    mode === "real" && report ? report.finalUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : mode === "loading" ? url || "…" : EXAMPLE.domain;
  const findings = getFindings(mode === "real" ? report : null);

  return (
    <div
      style={{
        border: `1px solid ${HAIRLINE_STRONG}`,
        background: "linear-gradient(180deg, rgba(255,255,255,.05) 0%, rgba(255,255,255,.02) 100%)",
        padding: 20,
        borderRadius: 4,
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: FG_TERTIARY, textTransform: "uppercase" }}>
          {mode === "loading" ? "Scan bezig" : mode === "real" ? "Rapport" : "Voorbeeldrapport"}
        </span>
        <span style={{ fontFamily: MONO, fontSize: 10, color: FG_SECONDARY }}>{domainLabel}</span>
      </div>

      {mode === "loading" ? (
        <SkeletonBody />
      ) : (
        <>
          <div className="flex items-baseline gap-2.5 mb-5">
            <span style={{ fontFamily: FONT, fontSize: 42, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, color: FG }}>
              {countedScore}
            </span>
            <span style={{ fontSize: 11.5, color: FG_TERTIARY, lineHeight: 1.4 }}>
              van 100
              <br />
              {scoreVerdict(score)}
            </span>
          </div>

          <div className="space-y-3">
            {HERO_CATEGORIES.map((cat, i) => {
              const value =
                mode === "real" && report ? report.categorieen.find((c) => c.naam === cat.key)?.score ?? 0 : EXAMPLE.categorieen[cat.key];
              return <CategoryBar key={cat.key} label={cat.label} value={value} delay={0.2 + i * 0.15} reduced={reduced} />;
            })}
          </div>

          <div className="mt-5 pt-4 space-y-2" style={{ borderTop: `1px solid ${HAIRLINE}` }}>
            {findings.map((f) => (
              <div key={f} className="flex items-start gap-2">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: RED, marginTop: 5, flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, color: FG_SECONDARY, lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CategoryBar({ label, value, delay, reduced }: { label: string; value: number; delay: number; reduced: boolean }) {
  const attention = value < 70;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span style={{ fontSize: 12.5, color: FG }}>{label}</span>
        <span style={{ fontFamily: MONO, fontSize: 11, color: FG_TERTIARY }}>{value}</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,.08)" }}>
        <motion.div
          style={{ height: "100%", background: attention ? RED : FG, transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: value / 100 }}
          transition={reduced ? { duration: 0 } : { duration: 1, delay, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </div>
    </div>
  );
}

function SkeletonBody() {
  return (
    <div>
      <div className="mb-5" style={{ height: 42, width: 90, background: "rgba(255,255,255,.06)" }} />
      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          >
            <div className="mb-1" style={{ height: 12, width: "40%", background: "rgba(255,255,255,.08)" }} />
            <div style={{ height: 3, background: "rgba(255,255,255,.06)" }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// "Een echte scan, geen gok" — groepen met mono-chips
// ============================================================
const GROUPS: { title: string; question: string; chips: { id: string; label: string }[] }[] = [
  {
    title: "Technische basis",
    question: "Werkt je site zoals hij hoort te werken?",
    chips: [
      { id: "bereikbaarheid", label: "Bereikbaarheid" },
      { id: "https", label: "HTTPS/SSL" },
      { id: "http-redirect", label: "HTTP → HTTPS" },
      { id: "favicon", label: "Favicon" },
      { id: "robots-txt", label: "robots.txt" },
      { id: "sitemap-xml", label: "sitemap.xml" },
    ],
  },
  {
    title: "Vindbaarheid",
    question: "Snapt Google waar je pagina over gaat?",
    chips: [
      { id: "title", label: "Title tag" },
      { id: "meta-description", label: "Meta description" },
      { id: "h1", label: "Koppenstructuur" },
      { id: "alt-teksten", label: "Alt-teksten" },
      { id: "structured-data", label: "Structured data" },
      { id: "open-graph", label: "Open Graph" },
    ],
  },
  {
    title: "Snelheid en mobiel",
    question: "Blijft een bezoeker wachten of afhaken?",
    chips: [
      { id: "response-tijd", label: "Responstijd" },
      { id: "viewport", label: "Viewport" },
    ],
  },
];

/** Bewust op groepsniveau, niet per chip: we willen aangeven dát er ergens
 * in bijv. "Vindbaarheid" iets niet klopt, zonder te verklappen welke van
 * de zes chips het precies is — dat detail is voor na het contactmoment. */
function groupNeedsAttention(group: { title: string; chips: { id: string }[] }, checkMap: Map<string, CheckResult> | null): boolean {
  if (!checkMap) return EXAMPLE.attentionGroups.has(group.title);
  return group.chips.some((chip) => {
    const c = checkMap.get(chip.id);
    return !!c && c.status !== "pass";
  });
}

function ChecksSection({ checkMap, reduced }: { checkMap: Map<string, CheckResult> | null; reduced: boolean }) {
  return (
    <section className="py-16 px-6 lg:px-10" style={{ borderTop: `1px solid ${HAIRLINE}` }}>
      <div className="mx-auto" style={{ maxWidth: 1080 }}>
        <div className="lg:grid lg:gap-12" style={{ gridTemplateColumns: "1fr 560px" }}>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span style={{ width: 32, height: 1, background: RED, display: "inline-block", marginBottom: 18 }} />
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: FG,
              }}
            >
              Een echte scan,
              <br />
              geen gok
            </h2>
            <p className="mt-4" style={{ fontSize: 14, color: FG_SECONDARY, maxWidth: 340, lineHeight: 1.6 }}>
              We halen je website live op en analyseren de broncode — precies zoals een bezoeker
              of Google dat ook doet. Niks gesimuleerd, niks gegokt.
            </p>
            <p className="mt-7" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: FG_TERTIARY, textTransform: "uppercase" }}>
              Veertien controles
            </p>
          </motion.div>

          <div className="mt-10 lg:mt-0">
            {GROUPS.map((group, i) => {
              const attention = groupNeedsAttention(group, checkMap);
              return (
                <motion.div
                  key={group.title}
                  className="lg:grid lg:gap-6"
                  style={{
                    gridTemplateColumns: "1fr 1fr",
                    padding: "18px 0",
                    borderTop: `1px solid ${HAIRLINE}`,
                    borderBottom: i === GROUPS.length - 1 ? `1px solid ${HAIRLINE}` : undefined,
                  }}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {attention && <span style={{ width: 5, height: 5, borderRadius: "50%", background: RED, flexShrink: 0 }} />}
                      <h3 style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: FG }}>{group.title}</h3>
                    </div>
                    <p style={{ fontSize: 12.5, color: "#7d7b78" }}>{group.question}</p>
                  </div>
                  <div className="mt-3 lg:mt-0 flex flex-wrap gap-1.5 content-start">
                    {group.chips.map((chip) => (
                      <span
                        key={chip.id}
                        className="transition-colors duration-150"
                        style={{
                          fontFamily: MONO,
                          fontSize: 10.5,
                          padding: "4px 8px",
                          borderRadius: 3,
                          border: "1px solid rgba(255,255,255,.14)",
                          color: FG_SECONDARY,
                        }}
                      >
                        {chip.label}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Slotblok — pill-link naar contact + het bestaande inline formulier
// (op uitdrukkelijk verzoek naast elkaar gehouden, i.p.v. alleen de pill).
// ============================================================
function ClosingBlock({ url }: { url: string }) {
  return (
    <section className="px-6 lg:px-10" style={{ borderTop: `1px solid ${HAIRLINE}` }}>
      <div className="mx-auto" style={{ maxWidth: 1080 }}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6" style={{ padding: "36px 0" }}>
          <p style={{ fontFamily: FONT, fontSize: 19, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.35, color: FG, maxWidth: 540 }}>
            Geen tijd of zin om het zelf op te lossen? Wij bouwen en onderhouden websites die wél
            goed scoren.
          </p>
          <a
            href="/contact"
            className="transition-colors duration-150"
            style={{
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: 44,
              padding: "0 22px",
              borderRadius: 9999,
              border: `1px solid ${RED}`,
              color: RED,
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            Neem contact op
          </a>
        </div>
      </div>

      <div className="mx-auto pb-16" style={{ maxWidth: 1080 }}>
        <CtaContactForm url={url} />
      </div>
    </section>
  );
}

function CtaContactForm({ url }: { url: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    url ? `Ik zag mijn website-check resultaat voor ${url} en wil graag weten hoe jullie dit kunnen verbeteren.` : "",
  );
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setFormError(null);
    try {
      await submitContactForm({ data: { name, email, message } });
      setSent(true);
    } catch {
      setFormError("Versturen is niet gelukt. Probeer het opnieuw of mail naar sales@aimi-development.nl.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="max-w-md" style={{ borderTop: `1px solid ${HAIRLINE}`, paddingTop: 28 }}>
      <h2 style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: FG, marginBottom: 4 }}>Of stuur meteen een bericht</h2>
      <p style={{ fontSize: 12.5, color: FG_SECONDARY, marginBottom: 18 }}>We nemen binnen één werkdag contact op.</p>

      {sent ? (
        <p style={{ color: "#22c55e", fontSize: 13 }}>Bedankt! We nemen zo snel mogelijk contact met je op.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <input
            type="text"
            required
            placeholder="Naam"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full outline-none"
            style={{ height: 40, borderRadius: 3, padding: "0 14px", background: "transparent", border: `1px solid ${HAIRLINE_STRONG}`, color: FG, fontFamily: FONT, fontSize: 13 }}
          />
          <input
            type="email"
            required
            placeholder="E-mailadres"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full outline-none"
            style={{ height: 40, borderRadius: 3, padding: "0 14px", background: "transparent", border: `1px solid ${HAIRLINE_STRONG}`, color: FG, fontFamily: FONT, fontSize: 13 }}
          />
          <textarea
            required
            rows={3}
            placeholder="Opmerking"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full outline-none resize-none"
            style={{ borderRadius: 3, padding: "10px 14px", background: "transparent", border: `1px solid ${HAIRLINE_STRONG}`, color: FG, fontFamily: FONT, fontSize: 13 }}
          />
          {formError && <p style={{ color: "#ef4444", fontSize: 13 }}>{formError}</p>}
          <button
            type="submit"
            disabled={sending}
            style={{
              height: 40,
              padding: "0 20px",
              borderRadius: 9999,
              background: RED,
              color: "#ffffff",
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: 13,
              border: "none",
              cursor: sending ? "default" : "pointer",
              opacity: sending ? 0.75 : 1,
            }}
          >
            {sending ? "Versturen…" : "Verstuur bericht"}
          </button>
          <p style={{ color: FG_TERTIARY, fontSize: 11 }}>
            We bewaren je bericht om contact met je op te nemen. Zie ons privacybeleid voor meer info.
          </p>
        </form>
      )}
    </div>
  );
}
