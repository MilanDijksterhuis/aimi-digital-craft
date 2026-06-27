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
        [{ transform: "scale(1)" }, { transform: "scale(0.96)" }, { transform: "scale(1)" }],
        { duration: 200, easing: "ease-out" },
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
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group inline-flex items-center gap-3 px-7 py-3.5 rounded bg-primary text-primary-foreground font-semibold text-sm hover:opacity-80 transition-opacity duration-200"
    >
      Neem contact op
      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
    </motion.a>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-end">

          {/* Left — main content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display font-extrabold leading-[1.0] tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(2.8rem, 6.5vw, 5rem)" }}
            >
              Websites die
              <br />
              écht <em className="not-italic text-primary">werken.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed"
            >
              Wij ontwerpen, bouwen en hosten websites voor ondernemers die geen genoegen nemen
              met een template. Vaste prijs, geen verrassingen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <MagneticButton />
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary border-2 border-background grid place-items-center font-display font-bold text-primary-foreground text-xs">
                    A
                  </div>
                  <div className="w-8 h-8 rounded-full bg-foreground/10 border-2 border-background grid place-items-center font-display font-bold text-foreground text-xs">
                    M
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">Aidan & Milan</span>
              </div>
            </motion.div>
          </div>

          {/* Right — vertical stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex flex-col gap-8 pb-2 text-right"
          >
            {[
              ["12+", "projecten"],
              ["< 2w", "doorlooptijd"],
              ["€499", "vanaf"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="font-display font-bold text-3xl text-foreground">{num}</div>
                <div className="text-xs text-muted-foreground mt-0.5 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
