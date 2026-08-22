import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useRouterState } from "@tanstack/react-router";

const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const MotionLink = motion.create(Link);

const services = [
  { label: "Website laten maken", href: "/website-laten-maken", desc: "Professioneel webdesign op maat" },
  { label: "Webshop laten maken", href: "/webshop-laten-maken", desc: "Verkoopklare online winkel" },
  { label: "Website laten vernieuwen", href: "/website-laten-vernieuwen", desc: "Bestaande site opknappen of opnieuw bouwen" },
  { label: "Onderhoud & hosting", href: "/onderhoud-hosting", desc: "Snel, veilig en up-to-date" },
  { label: "SEO", href: "/seo", desc: "Technisch, snelheid en lokaal vindbaar" },
  { label: "Meer diensten", href: "/meer-diensten", desc: "Performance-optimalisatie los af te nemen" },
  { label: "Webdesign per regio", href: "/webdesign", desc: "Website laten maken in jouw plaats" },
  { label: "Webdesign per branche", href: "/branches", desc: "Website laten maken voor jouw vakgebied" },
];

const links = [
  { label: "Tarieven", href: "/tarieven" },
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Over ons", href: "/over-ons" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <MotionLink
      to={href}
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
    </MotionLink>
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

      <div
        role="menu"
        className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
        style={{
          width: "320px",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transform: open ? "translate(-50%, 0)" : "translate(-50%, 8px)",
          transition: "opacity 0.18s ease-out, transform 0.18s ease-out",
        }}
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
            <Link
              key={s.href}
              to={s.href}
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/** A-01: mobiele navigatie. Onder md was het complete Diensten-menu, Werkwijze,
    Over ons en FAQ onbereikbaar — op de mobile-first index het zwaarste punt. */
function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // sluit bij navigatie
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // scroll-lock zolang het paneel open is
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape sluit
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Menu sluiten" : "Menu openen"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="grid place-items-center"
        style={{
          width: "44px",
          height: "44px",
          marginRight: "-10px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#ffffff",
        }}
      >
        <span style={{ display: "grid", gap: "5px", width: "20px" }}>
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "block", height: "1.5px", background: "currentColor", borderRadius: "2px" }}
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            style={{ display: "block", height: "1.5px", background: "currentColor", borderRadius: "2px" }}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "block", height: "1.5px", background: "currentColor", borderRadius: "2px" }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed left-0 right-0"
            style={{
              top: "64px",
              bottom: 0,
              background: "rgba(15,16,16,0.98)",
              backdropFilter: "blur(12px)",
              borderTop: "1px solid #2a2b2b",
              overflowY: "auto",
              fontFamily: FONT,
            }}
          >
            <nav aria-label="Hoofdmenu" className="px-6 py-6">
              <div className="text-[12px] uppercase tracking-widest mb-3" style={{ color: "#868b94" }}>
                Diensten
              </div>
              <ul className="space-y-1 mb-8">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link
                      to={s.href}
                      className="block rounded-[10px] px-3 py-3"
                      style={{ textDecoration: "none", background: "rgba(255,255,255,0.03)" }}
                    >
                      <span className="block text-[16px] font-medium" style={{ color: "#ffffff" }}>
                        {s.label}
                      </span>
                      <span className="block text-[13.5px] mt-0.5" style={{ color: "#a4a9b2" }}>
                        {s.desc}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="text-[12px] uppercase tracking-widest mb-3" style={{ color: "#868b94" }}>
                AIMI
              </div>
              <ul className="space-y-1 mb-8">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="block px-3 py-3 text-[16px]"
                      style={{ color: "rgba(255,255,255,0.82)", textDecoration: "none" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 pb-10">
                <Link to="/contact" className="btn-primary" style={{ justifyContent: "center" }}>
                  Neem contact op
                </Link>
                <Link to="/portal" rel="nofollow" className="btn-secondary" style={{ justifyContent: "center" }}>
                  Klantenportaal
                </Link>
              </div>
            </nav>
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
        <Link to="/" aria-label="AIMI home">
          <span className="font-medium text-white text-2xl tracking-tight" style={{ fontFamily: FONT }}>
            AIMI<span style={{ color: "#fe2c02" }}>.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <ServicesMenu />
          {links.map((l) => (
            <NavLink key={l.href} label={l.label} href={l.href} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Wrapper, geen `hidden` op de Link zelf: .btn-secondary zet een eigen
              `display` en wint dan van Tailwind's `hidden`.
              A-43: /portal staat op robots-Disallow — niet als crawlbaar linkdoel aanbieden. */}
          <span className="hidden md:block">
            <Link to="/portal" rel="nofollow" className="btn-secondary !text-[15px] !py-1.5 !px-4">
              Portaal
            </Link>
          </span>
          <Link to="/contact" className="btn-primary !text-[15px] !py-1.5 !px-4">
            Contact
          </Link>
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
