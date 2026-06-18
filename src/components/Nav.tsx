import { motion } from "motion/react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Werk", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2" aria-label="AIMI home">
          <span className="text-xl font-semibold tracking-tight text-foreground">AIMI.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-[13px] text-muted-foreground">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative hover:text-foreground transition-colors after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="/portal" className="btn-secondary text-[13px] !py-2 !px-4 whitespace-nowrap">
            Klantenportaal
          </a>
          <a href="#contact" className="btn-primary text-[13px] !py-2 !px-4">
            Let's talk
          </a>
        </div>
      </div>
    </motion.header>
  );
}
