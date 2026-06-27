import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";

function MagneticButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
  };

  const onLeave = () => { x.set(0); y.set(0); };

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = ref.current;
    if (el) {
      el.animate(
        [{ transform: "scale(1)" }, { transform: "scale(0.94)" }, { transform: "scale(1)" }],
        { duration: 220, easing: "ease-out" },
      );
    }
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 110);
  };

  return (
    <motion.a
      ref={ref}
      href="#contact"
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-[0_0_0_0_hsl(var(--primary)/0.4)] hover:shadow-[0_0_28px_8px_hsl(var(--primary)/0.3)] transition-shadow duration-300"
    >
      Neem contact op
      <motion.span
        className="inline-block"
        variants={{ rest: { x: 0 }, hover: { x: 5 } }}
        initial="rest"
        whileHover="hover"
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        <ArrowRight className="w-4 h-4" />
      </motion.span>
    </motion.a>
  );
}

export function Hero() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="section-label mb-6"
        >
          Web agency — Aidan & Milan
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display font-extrabold text-[clamp(3rem,9vw,5.5rem)] leading-[1.0] tracking-[-0.04em] text-foreground"
        >
          Websites die
          <br />
          écht <span className="text-primary">werken.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-lg mx-auto text-base text-muted-foreground"
        >
          Wij ontwerpen, bouwen en hosten websites voor ondernemers die geen genoegen nemen
          met een template. Vaste prijs, geen verrassingen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex items-center justify-center"
        >
          <MagneticButton />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16 flex items-center justify-center gap-3 text-sm text-muted-foreground"
        >
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-primary border-2 border-background grid place-items-center font-display font-bold text-primary-foreground text-xs">
              A
            </div>
            <div className="w-7 h-7 rounded-full bg-surface-elevated border-2 border-background grid place-items-center font-display font-bold text-foreground text-xs">
              M
            </div>
          </div>
          <span className="text-xs text-muted-foreground tracking-wide">Aidan & Milan</span>
        </motion.div>
      </div>
    </section>
  );
}
