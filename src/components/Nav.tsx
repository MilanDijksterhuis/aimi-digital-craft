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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" aria-label="AIMI home">
          <span
            className="font-medium text-white text-base tracking-tight"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            AIMI<span style={{ color: "#fe2c02" }}>.</span>
          </span>
        </a>

        <nav
          className="hidden md:flex items-center gap-8 text-[13px]"
          style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Inter, sans-serif" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-white transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="/portal" className="btn-secondary !text-[13px] !py-1.5 !px-4">
            Portaal
          </a>
          <a href="#contact" className="btn-primary !text-[13px] !py-1.5 !px-4">
            Contact
          </a>
        </div>
      </div>
    </motion.header>
  );
}
