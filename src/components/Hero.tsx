import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/hero-forest.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
      }}
    >
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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white max-w-3xl"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Websites die écht
          <br />
          <em style={{ fontStyle: "italic" }}>werken.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-md text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          Wij ontwerpen, bouwen en hosten websites voor ondernemers die geen
          genoegen nemen met een template. Vaste prijs, geen verrassingen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center gap-4"
        >
          <a href="#contact" className="btn-primary group">
            Neem contact op
            <ArrowRight className="w-4 h-4 arrow" />
          </a>
          <a href="#services" className="btn-secondary">
            Bekijk services
          </a>
        </motion.div>

        {/* Founders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-14 flex items-center gap-3"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <div className="flex -space-x-2">
            {["A", "M"].map((l) => (
              <div
                key={l}
                className="w-7 h-7 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm grid place-items-center text-white text-xs font-medium"
              >
                {l}
              </div>
            ))}
          </div>
          <span className="text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            Aidan & Milan
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative flex justify-center pb-10"
      >
        <div className="flex flex-col items-center gap-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
          <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
            scroll
          </span>
          <div className="w-px h-8 bg-white/20" />
        </div>
      </motion.div>
    </section>
  );
}
