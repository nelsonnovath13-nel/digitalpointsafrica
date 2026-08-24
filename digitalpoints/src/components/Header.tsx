import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

type NavItem = {
  label: string;
  href: string;
  accent: string;
};

const links: NavItem[] = [
  { label: "HOME", href: "/", accent: "#00c7c3" },
  { label: "ABOUT US", href: "/about", accent: "#2d8cff" },
  { label: "CORE SERVICES", href: "/services", accent: "#8a4dff" },
  { label: "PRINT SERVICES", href: "/printing", accent: "#f59e0b" },
  { label: "PROMOTIONS", href: "#", accent: "#ec4899" },
  { label: "DIGITAL TRAININGS", href: "/training", accent: "#10b981" },
  { label: "CONTACT US", href: "/contact", accent: "#06b6d4" },
];

const coreServiceItems = [
  "Digital Marketing",
  "Video Production",
  "Graphic Design",
  "Social Media Management",
  "Web Designs",
];

const printServiceItems = [
  "Large Format Printing",
  "Vehicle & Item Branding",
  "Embroidery & Apparel Branding",
  "Signage & 3D Branding",
  "Laser Cutting & Engraving",
];

const serviceRoutes: Record<string, string> = {
  "Digital Marketing": "/services",
  "Video Production": "/video-production",
  "Graphic Design": "/services",
  "Social Media Management": "/services",
  "Web Designs": "/services",
  "Large Format Printing": "/printing",
  "Vehicle & Item Branding": "/printing",
  "Embroidery & Apparel Branding": "/printing",
  "Signage & 3D Branding": "/printing",
  "Laser Cutting & Engraving": "/printing",
};

function DigitalPointsLogo() {
  return (
    <svg viewBox="0 0 520 118" role="img" aria-labelledby="digital-points-logo-title" className="block h-auto w-[190px] sm:w-[205px]">
      <title id="digital-points-logo-title">Digital Points</title>
      <defs>
        <linearGradient id="dp-logo-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#64e5e1" />
          <stop offset="48%" stopColor="#22d0cc" />
          <stop offset="100%" stopColor="#00aaa8" />
        </linearGradient>
      </defs>
      <g fill="url(#dp-logo-gradient)">
        <rect x="0" y="0" width="34" height="92" rx="2" /><rect x="0" y="0" width="86" height="28" rx="2" />
        <rect x="52" y="28" width="34" height="28" rx="2" /><rect x="0" y="64" width="52" height="28" rx="2" />
        <rect x="86" y="0" width="34" height="92" rx="2" /><rect x="52" y="64" width="34" height="28" rx="2" />
      </g>
      <text x="146" y="49" fill="#3a3a3a" fontFamily="Poppins, Arial, sans-serif" fontSize="43" fontWeight="800" letterSpacing="1.5">DIGITAL</text>
      <text x="176" y="100" fill="#08c9c5" fontFamily="Poppins, Arial, sans-serif" fontSize="43" fontWeight="800" letterSpacing="1.5">POINTS</text>
    </svg>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "Digital Marketing") return <svg viewBox="0 0 24 24" className="h-5 w-5" {...common}><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg>;
  if (name === "Video Production") return <svg viewBox="0 0 24 24" className="h-5 w-5" {...common}><rect x="3" y="6" width="12" height="12" rx="2" /><path d="m15 10 5-3v10l-5-3" /></svg>;
  if (name === "Graphic Design") return <svg viewBox="0 0 24 24" className="h-5 w-5" {...common}><path d="m4 16 8-8 4 4-8 8H4v-4Z" /><path d="m14 6 1.5-1.5a2 2 0 0 1 3 3L17 9" /></svg>;
  if (name === "Social Media Management") return <svg viewBox="0 0 24 24" className="h-5 w-5" {...common}><circle cx="6" cy="12" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="m8 11 8-4M8 13l8 4" /></svg>;
  if (name === "Large Format Printing") return <svg viewBox="0 0 24 24" className="h-5 w-5" {...common}><rect x="5" y="4" width="14" height="16" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>;
  if (name === "Vehicle & Item Branding") return <svg viewBox="0 0 24 24" className="h-5 w-5" {...common}><path d="M3 14h18l-2-6H7l-4 6Z" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>;
  if (name === "Embroidery & Apparel Branding") return <svg viewBox="0 0 24 24" className="h-5 w-5" {...common}><path d="M7 5 4 8l4 3v8h8v-8l4-3-3-3-5 3-5-3Z" /></svg>;
  if (name === "Signage & 3D Branding") return <svg viewBox="0 0 24 24" className="h-5 w-5" {...common}><path d="M5 4h14v12H5z" /><path d="M8 20h8M12 16v4" /></svg>;
  if (name === "Laser Cutting & Engraving") return <svg viewBox="0 0 24 24" className="h-5 w-5" {...common}><path d="M12 3v18M5 7l14 10M19 7 5 17" /><circle cx="12" cy="12" r="3" /></svg>;
  return <svg viewBox="0 0 24 24" className="h-5 w-5" {...common}><path d="M4 5h16v11H4z" /><path d="M8 20h8M12 16v4" /></svg>;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <path d="M3.5 6 8 10.5 12.5 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

export default function Header() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const closeMobileMenu = () => {
    setOpen(false);
    setExpandedMobileSection(null);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      frame = null;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const isActive = (item: NavItem) => item.label === "HOME" && isHome && !hash;

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <div className={`flex h-[60px] w-full items-center justify-between gap-5 px-6 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 sm:px-8 lg:px-5 xl:px-6 ${scrolled ? "border-b border-white/10 bg-[#050b1f]/82 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md" : "border-b border-transparent bg-transparent shadow-none"}`}>
        <Link to="/" className="group flex shrink-0 items-center" onClick={closeMobileMenu} aria-label="Digital Points Home"><DigitalPointsLogo /></Link>
        <AnimatePresence>
          {(activeDesktopMenu === "CORE SERVICES" || activeDesktopMenu === "PRINT SERVICES") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none fixed inset-0 z-[70] bg-[#050b0b]/55 backdrop-blur-xl"
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
        <nav className="relative z-[80] hidden items-center rounded-[22px] px-5 py-1.5 lg:flex" aria-label="Main navigation">
          {links.filter((item) => item.label !== "CONTACT US").map((item) => {
            const active = isActive(item); const isHovered = hovered === item.label;
            const responsiveColor = isHovered || active ? item.accent : scrolled ? "#ffffff" : "#ffffff";
            const shouldGlow = isHovered || active;
            const commonClass = "group relative whitespace-nowrap px-2.5 py-1.5 font-poppins text-[15px] font-medium tracking-[0.01em] transition-colors duration-200";
            const content = <motion.span className="relative inline-flex items-center" animate={{ color: responsiveColor, textShadow: shouldGlow ? `0 0 14px ${item.accent}55` : "0 0 0 rgba(0,0,0,0)" }} transition={{ color: { duration: 0.22, ease: "easeOut" }, textShadow: { duration: 0.25, ease: "easeOut" } }}>
              {item.label}
              <motion.span aria-hidden="true" className="pointer-events-none absolute -inset-x-2 -inset-y-1 -z-10 rounded-full" style={{ background: `radial-gradient(circle, ${item.accent}18 0%, transparent 72%)` }} initial={{ opacity: 0, scale: 0.85 }} animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }} transition={{ duration: 0.22, ease: "easeOut" }} />
              <motion.span aria-hidden="true" className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[2px] origin-center rounded-full" style={{ backgroundColor: item.accent, boxShadow: `0 0 9px ${item.accent}70` }} initial={{ opacity: 0, scaleX: 0 }} animate={isHovered && !active ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }} transition={{ duration: 0.2, ease: "easeOut" }} />
              {active && <motion.span layoutId="active-nav-indicator" aria-hidden="true" className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full" style={{ backgroundColor: item.accent, boxShadow: `0 0 8px ${item.accent}80` }} initial={{ opacity: 0, scaleX: 0.35 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ opacity: { duration: 0.18 }, scaleX: { type: "spring", stiffness: 500, damping: 35 }, layout: { type: "spring", stiffness: 500, damping: 35 } }} />}
            </motion.span>;
            if (item.label === "CORE SERVICES" || item.label === "PRINT SERVICES") {
              const serviceItems = item.label === "CORE SERVICES" ? coreServiceItems : printServiceItems;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => { setHovered(item.label); setActiveDesktopMenu(item.label); }}
                  onMouseLeave={() => { setHovered(null); setActiveDesktopMenu(null); }}
                >
                  <button type="button" className={commonClass} aria-haspopup="true" aria-expanded={activeDesktopMenu === item.label} onClick={() => navigate(item.href)}>
                    {content}
                  </button>
                  <AnimatePresence>
                    {activeDesktopMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.985 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-[calc(100%+20px)] z-[80] w-[390px] -translate-x-1/2 rounded-[22px] border border-white/90 bg-[#faf9f6] p-3 shadow-[0_28px_80px_rgba(0,0,0,0.32)]"
                      >
                        <div className="grid gap-1">
                          {serviceItems.map((service) => (
                            <Link
                              key={service}
                              to={serviceRoutes[service]}
                              className="group flex items-center gap-4 rounded-[14px] px-4 py-3.5 text-[#252b32] transition-all duration-200 hover:bg-[#00aaa8]/8"
                              onClick={() => setActiveDesktopMenu(null)}
                            >
                              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00aaa8]/8 text-[#009a98] transition-colors group-hover:bg-[#00aaa8]/14">
                                <ServiceIcon name={service} />
                              </span>
                              <span className="font-poppins text-[15px] font-medium">{service}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            if (item.href === "#") return <motion.a key={item.label} href={item.href} className={commonClass} onMouseEnter={() => setHovered(item.label)} onMouseLeave={() => setHovered(null)}>{content}</motion.a>;
            return <Link key={item.label} to={item.href} className={commonClass} onMouseEnter={() => setHovered(item.label)} onMouseLeave={() => setHovered(null)} onClick={closeMobileMenu}>{content}</Link>;
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            onClick={closeMobileMenu}
            className="hidden rounded-full border border-white/25 bg-white px-4 py-2 font-poppins text-[13px] font-semibold tracking-[0.08em] text-[#050b0b] transition-colors duration-200 hover:bg-white/90 lg:inline-flex"
          >
            CONTACT US
          </Link>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/15 text-white backdrop-blur-md lg:hidden"><span className="relative block h-3.5 w-5"><span className={`absolute left-0 top-0 h-px w-5 bg-current transition ${open ? "translate-y-[6px] rotate-45" : ""}`} /><span className={`absolute bottom-0 left-0 h-px w-5 bg-current transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} /></span></button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 top-[60px] z-[70] bg-[#050b0b]/55 px-4 py-5 backdrop-blur-xl lg:hidden"
            onClick={closeMobileMenu}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.985 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-h-[calc(100vh-100px)] w-full max-w-[670px] overflow-y-auto rounded-[28px] bg-[#faf9f6] px-6 pb-7 pt-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-2 flex justify-end">
                <button type="button" onClick={closeMobileMenu} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-full text-[#111827] transition-colors hover:bg-black/5">
                  <span className="relative block h-5 w-5"><span className="absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 rotate-45 bg-current" /><span className="absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 -rotate-45 bg-current" /></span>
                </button>
              </div>

              <nav aria-label="Mobile navigation" className="border-t border-[#111827]/10">
                {links.filter((item) => item.label !== "CONTACT US").map((item) => {
                  const hasChildren = item.label === "CORE SERVICES" || item.label === "PRINT SERVICES";
                  const children = item.label === "CORE SERVICES" ? coreServiceItems : item.label === "PRINT SERVICES" ? printServiceItems : [];
                  const expanded = expandedMobileSection === item.label;
                  const active = isActive(item);

                  if (!hasChildren) {
                    return (
                      <div key={item.label} className="border-b border-[#111827]/10">
                        item.href === "#" ? (
                          <a href="#" onClick={closeMobileMenu} className="flex min-h-[70px] items-center py-4 font-poppins text-[18px] font-semibold tracking-[0.01em] text-[#111827]" style={{ color: active ? item.accent : undefined }}>
                            {item.label}
                          </a>
                        ) : (
                          <Link to={item.href} onClick={closeMobileMenu} className="flex min-h-[70px] items-center py-4 font-poppins text-[18px] font-semibold tracking-[0.01em] text-[#111827]" style={{ color: active ? item.accent : undefined }}>
                            {item.label}
                          </Link>
                        )
                      </div>
                    );
                  }

                  return (
                    <div key={item.label} className="border-b border-[#111827]/10">
                      <button
                        type="button"
                        onClick={() => setExpandedMobileSection((current) => current === item.label ? null : item.label)}
                        aria-expanded={expanded}
                        className="flex min-h-[70px] w-full items-center justify-between py-4 text-left font-poppins text-[18px] font-semibold tracking-[0.01em] text-[#111827]"
                      >
                        {item.label}
                        <Chevron open={expanded} />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.24, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1 pb-5">
                              {children.map((child) => (
                                <Link key={child} to={serviceRoutes[child]} onClick={closeMobileMenu} className="block rounded-xl px-4 py-2.5 font-poppins text-[15px] font-medium text-[#374151] transition-colors hover:bg-[#00aaa8]/8 hover:text-[#008f8d]">
                                  {child}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <Link to="/contact" onClick={closeMobileMenu} className="mt-7 flex min-h-[58px] w-full items-center justify-center rounded-full bg-[#00aaa8] px-6 font-poppins text-[17px] font-semibold text-white shadow-[0_12px_28px_rgba(0,170,168,0.22)] transition-colors duration-200 hover:bg-[#009694]">
                CONTACT US
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
