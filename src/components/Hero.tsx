import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/60 text-xs font-mono text-muted-foreground mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Built & hosted by Aidan + Milan
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display font-bold text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-tight text-gradient"
        >
          We build websites<br />that <em className="not-italic text-primary">work.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 max-w-xl mx-auto text-lg text-muted-foreground"
        >
          Design, development en hosting onder één dak. Twee makers, scherpe
          uitvoering en sites die laden voordat je koffie koud is.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-primary transition-all"
          >
            Bekijk ons werk
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-surface/60 hover:bg-surface-elevated transition-colors font-medium"
          >
            Neem contact op
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-16 flex items-center justify-center gap-4 text-sm text-muted-foreground"
        >
          <div className="flex -space-x-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background grid place-items-center font-display font-bold text-primary-foreground text-sm">
              A
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-background grid place-items-center font-display font-bold text-primary-foreground text-sm">
              M
            </div>
          </div>
          <span className="font-mono text-xs">Aidan & Milan · founders</span>
        </motion.div>
      </div>
    </section>
  );
}
