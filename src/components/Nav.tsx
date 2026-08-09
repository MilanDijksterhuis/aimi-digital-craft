import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

const services = [
  { label: "Website laten maken", href: "/website-laten-maken", desc: "Professioneel webdesign op maat" },
  { label: "Webshop laten maken", href: "/webshop-laten-maken", desc: "Verkoopklare online winkel" },
  { label: "Onderhoud & hosting", href: "/onderhoud-hosting", desc: "Snel, veilig en up-to-date" },
  { label: "Meer diensten", href: "/meer-diensten", desc: "Hosting, performance en SEO los" },
];

const links = [
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
];

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      className="relative text-[15px] py-1"
      style={{ color: "rgba(255,255,255,0.65)", fontFamily: FONT }}
      whileHover="hover"
      initial="rest"
    >
      <motion.span
        variants={{ rest: { color: "rgba(255,255,255,0.65)", y: 0 }, hover: { color: "rgba(255,255,255,1)", y: -1 } }}
        transition={{ duration: 0.15 }}
        style={{ display: "inline-block" }}
      >
        {label}
      </motion.span>
      <motion.span
        variants={{ rest: { scaleX: 0, originX: 0 }, hover: { scaleX: 1, originX: 0 } }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "#fe2c02", display: "block" }}
      />
    </motion.a>
  );
}

function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(timer.current);
    // korte vertraging zodat je met de muis naar het paneel kunt bewegen
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center gap-1.5 text-[15px] py-1"
        style={{ color: open ? "#ffffff" : "rgba(255,255,255,0.65)", fontFamily: FONT, background: "none", border: "none", cursor: "pointer" }}
      >
        Diensten
        <motion.svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ marginTop: "1px" }}
        >
          <path d="M2.5 4.5 L6 8 L9.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: "16px",
            height: "1px",
            background: "#fe2c02",
            transform: open ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.2s ease-out",
          }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            role="menu"
            className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
            style={{ width: "320px" }}
          >
            <div
              style={{
                background: "rgba(22,23,23,0.96)",
                backdropFilter: "blur(12px)",
                border: "1px solid #2a2b2b",
                borderRadius: "14px",
                padding: "8px",
                boxShadow: "0 20px 50px -12px rgba(0,0,0,0.6)",
              }}
            >
              {services.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  role="menuitem"
                  className="group flex flex-col gap-0.5 rounded-[10px] px-4 py-3 transition-colors"
                  style={{ fontFamily: FONT, textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(254,44,2,0.10)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span className="text-[14.5px] font-medium" style={{ color: "#ffffff" }}>
                    {s.label}
                  </span>
                  <span className="text-[12.5px]" style={{ color: "#a4a9b2" }}>
                    {s.desc}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="/" aria-label="AIMI home">
          <span className="font-medium text-white text-3xl tracking-tight" style={{ fontFamily: FONT }}>
            AIMI<span style={{ color: "#fe2c02" }}>.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <ServicesMenu />
          {links.map((l) => (
            <NavLink key={l.href} label={l.label} href={l.href} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="/portal" className="btn-secondary !text-[15px] !py-1.5 !px-4">
            Portaal
          </a>
          <a href="/contact" className="btn-primary !text-[15px] !py-1.5 !px-4">
            Contact
          </a>
        </div>
      </div>
    </motion.header>
  );
}
