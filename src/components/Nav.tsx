import { motion } from "motion/react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Over ons", href: "#about" },
  { label: "Tarieven", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-6 h-[60px] flex items-center justify-between">
        <a href="#" className="flex items-center" aria-label="AIMI home">
          <span className="font-display font-bold text-lg tracking-tight text-foreground">
            AIMI<span className="text-primary">.</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-[13px] text-muted-foreground">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-foreground transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="/portal" className="btn-secondary text-[13px] !py-2 !px-4 whitespace-nowrap">
            Portaal
          </a>
          <a href="#contact" className="btn-primary text-[13px] !py-2 !px-4">
            Contact
          </a>
        </div>
      </div>
    </motion.header>
  );
}
