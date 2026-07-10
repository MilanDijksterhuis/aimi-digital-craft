import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import heroImg from "../assets/hero-forest.jpg";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${heroImg})`,
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
            fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Websites die écht
          <br />
          werken.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-lg text-base leading-relaxed"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          Wij ontwerpen, bouwen en hosten websites met als focus voor kleine ondernemers die net begonnen zijn. Onze focus ligt op lage kosten, hoge kwaliteit en een snelle oplevering. Zo kan jij je focussen op wat echt belangrijk is.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center gap-4 text-base"
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
                className="w-8 h-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm grid place-items-center text-white text-sm font-medium"
              >
                {l}
              </div>
            ))}
          </div>
          <span className="text-sm" style={{ fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
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
      </motion.div>
    </section>
  );
}
