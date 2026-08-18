import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";

type NavItem = {
  label: string;
  to: string;
  end?: boolean;
  anchor?: boolean;
  accent: string;
};

const links: NavItem[] = [
  { to: "/", label: "HOME", end: true, accent: "#00c7c3" },
  { to: "/about", label: "ABOUT US", accent: "#2d8cff" },
  { to: "/video-production", label: "VIDEO PRODUCTION", accent: "#8a4dff" },
  { to: "#embroidery", label: "EMBROIDERY", anchor: true, accent: "#f59e0b" },
  { to: "#promotion", label: "PROMOTION", anchor: true, accent: "#ec4899" },
  { to: "/contact", label: "CONTACTS", accent: "#10b981" },
];

export default function Header() {
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/";
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const scrolled = !isHome || scrolledPastHero;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolledPastHero(window.scrollY > Math.max(window.innerHeight - 120, 200));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (item: NavItem) => {
    if (item.anchor) return isHome && hash === item.to;
    return item.end ? pathname === item.to : pathname.startsWith(item.to);
  };

  const getAnchorHref = (item: NavItem) => (item.anchor ? (isHome ? item.to : `/${item.to}`) : item.to);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
        scrolled ? "border-b border-ink-950/10 bg-cream-50/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1800px] items-center justify-between px-8 lg:px-12">
        <Link to="/" className="group flex shrink-0 items-center" onClick={() => setOpen(false)} aria-label="Digital Points Home">
          <span className={`font-display text-[1.55rem] font-semibold tracking-tight transition-colors duration-300 ${scrolled ? "text-ink-950" : "text-black"}`}>
            Digital<span className="text-point-400">Points</span>
          </span>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Main navigation">
          {links.map((item, index) => {
            const active = isActive(item);
            const isHovered = hovered === item.label;
            const responsiveColor = isHovered || active ? item.accent : "#050b1f";
            const shouldGlow = isHovered || active;

            const commonClass = "group relative whitespace-nowrap px-0.5 py-2 text-[15px] font-medium tracking-[0.01em] transition-colors duration-200";

            const content = (
              <motion.span
                className="relative inline-flex items-center"
                animate={{
                  color: responsiveColor,
                  textShadow: shouldGlow ? `0 0 14px ${item.accent}55` : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={{
                  color: { duration: 0.22, ease: "easeOut" },
                  textShadow: { duration: 0.25, ease: "easeOut" },
                }}
              >
                {item.label}

                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-2 -inset-y-1 -z-10 rounded-full"
                  style={{ background: `radial-gradient(circle, ${item.accent}18 0%, transparent 72%)` }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                />

                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[2px] origin-center rounded-full"
                  style={{ backgroundColor: item.accent, boxShadow: `0 0 9px ${item.accent}70` }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={isHovered && !active ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />

                {active && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full"
                    style={{ backgroundColor: item.accent, boxShadow: `0 0 8px ${item.accent}80` }}
                    initial={{ opacity: 0, scaleX: 0.35 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{
                      opacity: { duration: 0.18 },
                      scaleX: { type: "spring", stiffness: 500, damping: 35 },
                      layout: { type: "spring", stiffness: 500, damping: 35 },
                    }}
                  />
                )}
              </motion.span>
            );

            return (
              <div key={item.label} className="flex items-center">
                {index > 0 && (
                  <span aria-hidden="true" className={`mx-4 select-none text-[17px] font-light leading-none transition-colors duration-200 ${scrolled ? "text-ink-950/35" : "text-black/45"}`}>
                    |
                  </span>
                )}

                {item.anchor ? (
                  <motion.a
                    href={getAnchorHref(item)}
                    className={commonClass}
                    onMouseEnter={() => setHovered(item.label)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setOpen(false)}
                  >
                    {content}
                  </motion.a>
                ) : (
                  <motion.div onMouseEnter={() => setHovered(item.label)} onMouseLeave={() => setHovered(null)}>
                    <NavLink to={item.to} end={item.end} className={commonClass}>
                      {content}
                    </NavLink>
                  </motion.div>
                )}
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className={`flex h-10 w-10 items-center justify-center border lg:hidden ${scrolled ? "border-ink-950/20 text-ink-950" : "border-black/25 text-black"}`}
        >
          <span className="relative block h-3.5 w-5">
            <span className={`absolute left-0 top-0 h-px w-5 bg-current transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-px w-5 bg-current transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-ink-950/10 bg-cream-50 lg:hidden"
          >
            <nav className="flex flex-col px-6 py-4" aria-label="Mobile navigation">
              {links.map((item, index) => {
                const active = isActive(item);
                const mobileIndicator = active ? (
                  <span className="h-1.5 w-8 rounded-full" style={{ backgroundColor: item.accent, boxShadow: `0 0 8px ${item.accent}70` }} />
                ) : null;

                return (
                  <div key={item.label}>
                    {index > 0 && <div className="h-px bg-ink-950/10" />}
                    {item.anchor ? (
                      <a
                        href={getAnchorHref(item)}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between py-4 text-sm font-medium transition-colors"
                        style={{ color: active ? item.accent : "#050b1f" }}
                      >
                        {item.label}
                        {mobileIndicator}
                      </a>
                    ) : (
                      <NavLink
                        to={item.to}
                        end={item.end}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between py-4 text-sm font-medium transition-colors"
                        style={({ isActive: routeActive }) => ({ color: routeActive ? item.accent : "#050b1f" })}
                      >
                        {item.label}
                        {mobileIndicator}
                      </NavLink>
                    )}
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
