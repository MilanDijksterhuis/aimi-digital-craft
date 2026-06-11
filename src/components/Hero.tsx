import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="section-label mb-6"
        >
          Built & hosted by Aidan en Milan
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display italic font-normal text-[clamp(3rem,9vw,6rem)] leading-[0.98] tracking-tight text-foreground"
        >
          We build websites
          <br />
          that <span className="text-primary">work.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-xl mx-auto text-base text-muted-foreground"
        >
          Design, development en hosting onder één dak. Twee makers, scherpe uitvoering en sites die laden voordat je
          koffie koud is.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#work" className="btn-primary">
            Bekijk ons werk
            <ArrowRight className="w-4 h-4 arrow" />
          </a>
          <a href="#contact" className="btn-secondary">
            Neem contact op
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16 flex items-center justify-center gap-3 text-sm text-muted-foreground"
        >
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary border-2 border-background grid place-items-center font-display italic text-primary-foreground text-sm">
              A
            </div>
            <div className="w-8 h-8 rounded-full bg-foreground border-2 border-background grid place-items-center font-display italic text-background text-sm">
              M
            </div>
          </div>
          <span className="text-xs uppercase tracking-[0.12em]">Aidan & Milan · founders</span>
        </motion.div>
      </div>
    </section>
  );
}
