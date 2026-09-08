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
  { label: "SERVICES", href: "/services", accent: "#8a4dff" },
  { label: "PROJECTS", href: "/portfolio", accent: "#ec4899" },
  { label: "PRINT", href: "/printing", accent: "#f59e0b" },
  { label: "MARKETING", href: "/services", accent: "#ff7a45" },
  { label: "TRAININGS", href: "/training", accent: "#10b981" },
  { label: "ABOUT", href: "/about", accent: "#2d8cff" },
  { label: "CONTACT", href: "/contact", accent: "#06b6d4" },
];

type MegaCategory = { title: string; route: string; items: string[] };

const servicesMenu: MegaCategory[] = [
  {
    title: "Digital Marketing",
    route: "/services",
    items: ["Social Media", "SEO", "Paid Ads", "Content Marketing", "Email Marketing", "Digital Campaigns", "Analytics & Reporting"],
  },
  {
    title: "Web, App & Systems",
    route: "/services",
    items: ["Website Design & Development", "Mobile App Development", "Web Applications", "Business Management Systems", "Custom Software Solutions", "E-Commerce Solutions", "System Integration & Automation"],
  },
  {
    title: "Video Production",
    route: "/video-production",
    items: ["Corporate & Brand Videos", "Promotional Videos", "Social Media Content", "Event & Conference Coverage", "Product & Service Videos", "Interviews & Testimonials", "Photography & Videography", "Video Editing & Post-Production"],
  },
  {
    title: "Print & Branding",
    route: "/printing",
    items: ["Brand Identity Design", "Logo Design", "Corporate Profiles & Stationery", "Embroidery", "Marketing & Promotional Materials", "Business Cards & Brochures", "Banners, Posters & Signage", "Packaging & Label Design", "Large Format & Digital Printing"],
  },
];

const printMenuItems: MegaCategory[] = [
  {
    title: "Print Services",
    route: "/printing",
    items: ["Digital Printing", "Large Format Printing", "UV & Custom Material Printing", "Packaging & Label Printing", "Apparel & Promotional Printing"],
  },
];

const marketingMenu: MegaCategory[] = [
  { title: "Digital Marketing", route: "/services", items: ["Social Media Marketing", "Social Media Management", "Paid Advertising", "Content Marketing"] },
  { title: "Social Media", route: "/services", items: ["Instagram", "Facebook", "TikTok", "LinkedIn", "Content Marketing"] },
  { title: "Campaign Content", route: "/services", items: ["Promotional Content", "Copywriting", "Creative Campaigns"] },
  { title: "Advertising", route: "/services", items: ["Meta Ads", "Google Ads", "Online Advertising Campaigns"] },
  { title: "Marketing Strategy", route: "/services", items: ["Brand Positioning", "Campaign Strategy", "Audience Strategy", "Growth Strategy"] },
];

const megaMenus: Record<string, MegaCategory[]> = {
  SERVICES: servicesMenu,
  PRINT: printMenuItems,
  MARKETING: marketingMenu,
};

function DigitalPointsLogo() {
  return (
    <img
      src="/logo/dp-logo-white.png"
      alt="Digital Points"
      className="block h-11 w-auto sm:h-12"
    />
  );
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
      <div className={`flex h-[60px] w-full items-center gap-5 px-6 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 sm:px-8 lg:gap-10 lg:px-5 xl:gap-14 xl:px-6 ${scrolled ? "border-b border-white/10 bg-[#050b1f]/82 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md" : "border-b border-transparent bg-transparent shadow-none"}`}>
        <Link to="/" className="group flex shrink-0 items-center" onClick={closeMobileMenu} aria-label="Digital Points Home"><DigitalPointsLogo /></Link>
        <AnimatePresence>
          {activeDesktopMenu !== null && megaMenus[activeDesktopMenu] && (
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
          {links.filter((item) => item.label !== "CONTACT").map((item) => {
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
            if (megaMenus[item.label]) {
              const categories = megaMenus[item.label];
              const isSingleColumn = categories.length === 1;
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
                      <div className="fixed left-1/2 top-[80px] z-[80] -translate-x-1/2">
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.985 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className={`rounded-[22px] border border-white/90 bg-[#faf9f6] shadow-[0_28px_80px_rgba(0,0,0,0.32)] ${
                          isSingleColumn ? "w-[360px] p-3" : "w-[min(92vw,880px)] p-6"
                        }`}
                      >
                        <div
                          className={
                            isSingleColumn
                              ? "grid gap-1"
                              : `grid grid-cols-2 gap-x-8 gap-y-6 ${categories.length >= 5 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`
                          }
                        >
                          {categories.map((category) =>
                            isSingleColumn ? (
                              category.items.map((service) => (
                                <Link
                                  key={service}
                                  to={category.route}
                                  className="group flex items-center gap-3 rounded-[14px] px-4 py-3.5 text-[#252b32] transition-all duration-200 hover:bg-[#00aaa8]/8"
                                  onClick={() => setActiveDesktopMenu(null)}
                                >
                                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00aaa8]" />
                                  <span className="font-poppins text-[15px] font-medium">{service}</span>
                                </Link>
                              ))
                            ) : (
                              <div key={category.title}>
                                <Link
                                  to={category.route}
                                  onClick={() => setActiveDesktopMenu(null)}
                                  className="mb-2.5 block font-poppins text-[13px] font-semibold uppercase tracking-[0.06em] text-[#00918f]"
                                >
                                  {category.title}
                                </Link>
                                <ul className="space-y-1.5">
                                  {category.items.map((service) => (
                                    <li key={service}>
                                      <Link
                                        to={category.route}
                                        onClick={() => setActiveDesktopMenu(null)}
                                        className="block rounded-lg px-1.5 py-1 font-poppins text-[13.5px] font-medium leading-snug text-[#3a4249] transition-colors duration-150 hover:bg-[#00aaa8]/8 hover:text-[#00595a]"
                                      >
                                        {service}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ),
                          )}
                        </div>
                      </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            if (item.href === "#") return <motion.a key={item.label} href={item.href} className={commonClass} onMouseEnter={() => setHovered(item.label)} onMouseLeave={() => setHovered(null)}>{content}</motion.a>;
            return <Link key={item.label} to={item.href} className={commonClass} onMouseEnter={() => setHovered(item.label)} onMouseLeave={() => setHovered(null)} onClick={closeMobileMenu}>{content}</Link>;
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3">
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
                {links.filter((item) => item.label !== "CONTACT").map((item) => {
                  const categories = megaMenus[item.label];
                  const hasChildren = Boolean(categories);
                  const expanded = expandedMobileSection === item.label;
                  const active = isActive(item);

                  if (!hasChildren) {
                    return (
                      <div key={item.label} className="border-b border-[#111827]/10">
                        {item.href === "#" ? (
                          <a href="#" onClick={closeMobileMenu} className="flex min-h-[70px] items-center py-4 font-poppins text-[18px] font-semibold tracking-[0.01em] text-[#111827]" style={{ color: active ? item.accent : undefined }}>
                            {item.label}
                          </a>
                        ) : (
                          <Link to={item.href} onClick={closeMobileMenu} className="flex min-h-[70px] items-center py-4 font-poppins text-[18px] font-semibold tracking-[0.01em] text-[#111827]" style={{ color: active ? item.accent : undefined }}>
                            {item.label}
                          </Link>
                        )}
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
                            <div className="space-y-4 pb-5">
                              {categories!.map((category) => (
                                <div key={category.title}>
                                  {categories!.length > 1 && (
                                    <Link
                                      to={category.route}
                                      onClick={closeMobileMenu}
                                      className="mb-1 block px-4 font-poppins text-[12px] font-semibold uppercase tracking-[0.06em] text-[#00918f]"
                                    >
                                      {category.title}
                                    </Link>
                                  )}
                                  <div className="space-y-1">
                                    {category.items.map((child) => (
                                      <Link key={child} to={category.route} onClick={closeMobileMenu} className="block rounded-xl px-4 py-2.5 font-poppins text-[15px] font-medium text-[#374151] transition-colors hover:bg-[#00aaa8]/8 hover:text-[#008f8d]">
                                        {child}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
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
