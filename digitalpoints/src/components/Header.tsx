import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const serviceLinks = [
  { to: "/services", label: "All Services" },
  { to: "/training", label: "Training Programs" },
  { to: "/consultation", label: "Digital Consultation" },
  { to: "/printing", label: "Printing Services" },
  { to: "/maintenance", label: "Website Maintenance" },
];

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/video-production", label: "Video Production" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Only the homepage has a dark full-bleed Hero under the header — everywhere
  // else the page starts on the cream background immediately, so the header
  // should always render in its solid/dark-text state on those routes.
  const scrolled = !isHome || scrolledPastHero;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolledPastHero(window.scrollY > Math.max(window.innerHeight - 120, 200));
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

  const navTextClass = scrolled ? "text-ink-950/70 hover:text-ink-950" : "text-white/80 hover:text-white";
  const navActiveClass = scrolled ? "text-point-700" : "text-point-200";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${
        scrolled ? "border-b border-ink-950/5 bg-cream-50/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span
            className={`font-display text-lg font-semibold tracking-tight transition-colors ${
              scrolled ? "text-ink-950" : "text-white"
            }`}
          >
            Digital<span className="text-point-400">Points</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `sweep-underline text-sm font-medium transition ${isActive ? navActiveClass : navTextClass}`
              }
            >
              Services
            </NavLink>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3"
                >
                  <div className="rounded-2xl border border-ink-950/5 bg-white p-2 shadow-xl">
                    {serviceLinks.map((l) => (
                      <Link
                        key={l.to}
                        to={l.to}
                        className="flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm text-ink-950/75 transition hover:bg-cream-100 hover:text-point-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-point-400" />
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `sweep-underline text-sm font-medium transition ${isActive ? navActiveClass : navTextClass}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/255714214247"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-point-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-point-400 sm:inline-flex"
          >
            Chat on WhatsApp
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
              scrolled ? "border-ink-950/15 text-ink-950" : "border-white/15 text-white"
            }`}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-4 bg-current transition ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 bottom-0 h-[1.5px] w-4 bg-current transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-ink-950/10 bg-cream-50 lg:hidden"
          >
            <nav className="flex flex-col px-6 py-4">
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="flex items-center justify-between border-b border-ink-950/5 py-3 text-sm font-medium text-ink-950/80"
              >
                Services
                <span className={`transition ${mobileServicesOpen ? "rotate-180" : ""}`}>⌄</span>
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pl-4"
                  >
                    {serviceLinks.map((l) => (
                      <Link
                        key={l.to}
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className="block border-b border-ink-950/5 py-3 text-sm text-ink-950/70"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className="border-b border-ink-950/5 py-3 text-sm font-medium text-ink-950/80 last:border-none"
                >
                  {l.label}
                </NavLink>
              ))}
              <a
                href="https://wa.me/255714214247"
                target="_blank"
                rel="noreferrer"
                className="mt-4 rounded-full bg-point-500 px-5 py-3 text-center text-sm font-semibold text-ink-950"
              >
                Chat on WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
