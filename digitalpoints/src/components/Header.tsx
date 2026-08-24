import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

type NavItem = {
  label: string;
  href: string;
  accent: string;
};

const links: NavItem[] = [
  { label: "HOME", href: "#", accent: "#00c7c3" },
  { label: "ABOUT US", href: "#", accent: "#2d8cff" },
  { label: "CORE SERVICES", href: "#", accent: "#8a4dff" },
  { label: "PRINT SERVICES", href: "#", accent: "#f59e0b" },
  { label: "PROMOTIONS", href: "#", accent: "#ec4899" },
  { label: "DIGITAL TRAININGS", href: "#", accent: "#10b981" },
  { label: "CONTACT US", href: "#", accent: "#06b6d4" },
];

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

export default function Header() {
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

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
        <Link to="/" className="group flex shrink-0 items-center" onClick={() => setOpen(false)} aria-label="Digital Points Home"><DigitalPointsLogo /></Link>
        <nav className="hidden items-center rounded-[22px] px-5 py-1.5 lg:flex" aria-label="Main navigation">
          {links.map((item) => {
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
            return <motion.a key={item.label} href={item.href} className={commonClass} onMouseEnter={() => setHovered(item.label)} onMouseLeave={() => setHovered(null)} onClick={() => setOpen(false)}>{content}</motion.a>;
          })}
        </nav>
        <div className="flex items-center gap-3">
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/15 text-white backdrop-blur-md lg:hidden"><span className="relative block h-3.5 w-5"><span className={`absolute left-0 top-0 h-px w-5 bg-current transition ${open ? "translate-y-[6px] rotate-45" : ""}`} /><span className={`absolute bottom-0 left-0 h-px w-5 bg-current transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} /></span></button>
        </div>
      </div>
      <AnimatePresence>{open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden border-t border-black/10 bg-cream-50/90 backdrop-blur-xl lg:hidden"><nav className="flex flex-col px-6 py-4" aria-label="Mobile navigation">{links.map((item, index) => { const active = isActive(item); const mobileIndicator = active ? <span className="h-1.5 w-8 rounded-full" style={{ backgroundColor: item.accent, boxShadow: `0 0 8px ${item.accent}70` }} /> : null; return <div key={item.label}>{index > 0 && <div className="h-px bg-ink-950/10" />}{<a href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-4 font-poppins text-sm font-medium" style={{ color: active ? item.accent : "#050b1f" }}>{item.label}{mobileIndicator}</a>}</div>; })}</nav></motion.div>}</AnimatePresence>
    </header>
  );
}
