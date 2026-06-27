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
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="section-label mb-6"
        >
          Gebouwd en gehost door Aidan en Milan
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
