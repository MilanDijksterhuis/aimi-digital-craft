import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import heroW640 from "../assets/hero-forest-640.webp";
import heroW960 from "../assets/hero-forest-960.webp";
import heroW1280 from "../assets/hero-forest-1280.webp";
import heroW1920 from "../assets/hero-forest-1920.webp";

/* A-07: de hero is de LCP. Stond eerst als één 594 KB CSS-background met een
   high-priority preload — een telefoon op 4G haalde dus met voorrang exact
   hetzelfde bestand binnen als een 4K-desktop. Nu een echte <img> met srcset,
   zodat mobiel ~22 KB laadt in plaats van 594 KB. Een CSS-background kan geen
   srcset dragen, vandaar de omzetting. */
const WEBP_SRCSET = `${heroW640} 640w, ${heroW960} 960w, ${heroW1280} 1280w, ${heroW1920} 1920w`;
const SIZES = "100vw";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Geen handmatige <link rel="preload">: React 19 hoist voor een <img> met
          fetchPriority="high" zelf al een preload met dezelfde imageSrcSet naar
          de head. Een eigen link erbij levert alleen een dubbele tag op.
          Bewust ook géén AVIF-<source>: de preload kan server-side niet weten
          welk formaat de browser kiest, dus AVIF erbij geeft AVIF-capabele
          browsers een tweede LCP-request. De winst was hier 0-12%. */}
      <img
        src={heroW1280}
        srcSet={WEBP_SRCSET}
        sizes={SIZES}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1255}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "center 30%" }}
      />

      {/* Dark gradient overlay — top for nav legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Content — floats over photo */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-20">
        {/* SEO-audit 2026-09-15 (TECH-1): entrance via CSS (.anim-fade-up) i.p.v.
            framer-motion, zodat de H1 niet op opacity:0 wacht tot JS hydrateert. */}
        <h1
          className="text-white max-w-3xl anim-fade-up"
          style={{
            fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
            fontSize: "clamp(1.9rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Websites die écht
          <br />
          werken.
        </h1>

        {/* Performance-audit 2026-09-02: dit is de gemeten LCP-element
            (p.mt-8), niet de hero-afbeelding. Een motion-gedreven
            opacity:0 -> 1 hield hem 7+ seconden onzichtbaar totdat JS
            hydrateerde. Nu een gewone <p> die al zichtbaar staat in de
            SSR-HTML — geen JS-gated vertraging meer op het LCP-element. */}
        <p
          className="mt-8 max-w-xl text-base leading-relaxed"
          style={{ color: "rgba(255,255,255,0.78)" }}
        >
          <strong style={{ color: "#fff", fontWeight: 600 }}>AIMI Development</strong> is een
          webdesignbureau in Veendam (Groningen) dat websites en webshops bouwt voor ondernemers in
          Noord-Nederland — vanaf € 499 eenmalig plus € 30 per maand voor hosting en onderhoud. Wij
          ontwerpen, bouwen en hosten zelf, met focus op lage kosten, hoge kwaliteit en snelle
          oplevering.
        </p>

        <div
          className="mt-10 flex items-center gap-4 text-base anim-fade-up"
          style={{ animationDelay: "0.28s" }}
        >
          <a href="#contact" className="btn-primary group">
            Neem contact op
            <ArrowRight className="w-4 h-4 arrow" />
          </a>
          {/* A-03: de homepage claimt de kernterm niet meer zelf, maar geeft
              /website-laten-maken een sterke keyword-ankertekst vanaf de
              belangrijkste pagina van de site. */}
          <a href="/website-laten-maken" className="btn-secondary">
            Website laten maken
          </a>
        </div>

        <a
          href="/website-checker"
          className="mt-6 text-sm underline underline-offset-4 anim-fade-up"
          style={{
            color: "rgba(255,255,255,0.85)",
            fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
            animationDelay: "0.38s",
          }}
        >
          Gratis website check! →
        </a>

        {/* Founders */}
        <div
          className="mt-14 flex items-center gap-3 anim-fade-up"
          style={{ color: "rgba(255,255,255,0.5)", animationDelay: "0.45s" }}
        >
          <div className="flex -space-x-2">
            {["A", "M"].map((l) => (
              <div
                key={l}
                className="w-8 h-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm grid place-items-center text-white text-sm font-medium"
              >
                {l}
              </div>
            ))}
          </div>
          <span
            className="text-sm"
            style={{ fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
          >
            Aidan & Milan
          </span>
        </div>
      </div>

      {/* Scroll indicator — entrance in CSS; de oneindige loops hieronder blijven
          framer-motion (decoratief, geen LCP-impact). */}
      <div
        className="relative flex justify-center pb-10 anim-fade-up"
        style={{ animationDelay: "0.8s" }}
      >
        <motion.div
          className="flex flex-col items-center gap-1.5"
          style={{ color: "rgba(255,255,255,0.35)" }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            scroll
          </motion.span>
          <div className="relative w-px h-8 overflow-hidden bg-white/20">
            <motion.div
              className="absolute left-0 top-0 w-px h-3 bg-white/80"
              animate={{ y: [-12, 32] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
