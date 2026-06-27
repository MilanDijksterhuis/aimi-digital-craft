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
            className="font-medium text-white text-3xl tracking-tight"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            AIMI<span style={{ color: "#fe2c02" }}>.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              className="relative text-[15px] py-1"
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Inter, sans-serif" }}
              whileHover="hover"
              initial="rest"
            >
              <motion.span
                variants={{
                  rest: { color: "rgba(255,255,255,0.65)", y: 0 },
                  hover: { color: "rgba(255,255,255,1)", y: -1 },
                }}
                transition={{ duration: 0.15 }}
                style={{ display: "inline-block" }}
              >
                {l.label}
              </motion.span>
              {/* Underline */}
              <motion.span
                variants={{
                  rest: { scaleX: 0, originX: 0 },
                  hover: { scaleX: 1, originX: 0 },
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: "#fe2c02",
                  display: "block",
                }}
              />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="/portal" className="btn-secondary !text-[15px] !py-1.5 !px-4">
            Portaal
          </a>
          <a href="#contact" className="btn-primary !text-[15px] !py-1.5 !px-4">
            Contact
          </a>
        </div>
      </div>
    </motion.header>
  );
}
