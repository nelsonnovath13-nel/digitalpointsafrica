import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { submitLead } from "../lib/leads";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/quotation", label: "Request a Quotation" },
];
const moreLinks = [
  { to: "/portfolio", label: "Portfolio" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/training", label: "Training Programs" },
  { to: "/consultation", label: "Digital Consultation" },
  { to: "/printing", label: "Printing Services" },
  { to: "/maintenance", label: "Website Maintenance" },
  { to: "/contact", label: "Free Consultation" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/digitalpointstz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.34C15.9 4.24 15 4.17 13.9 4.17c-2.28 0-3.84 1.39-3.84 3.94v2.19H7.5v3h2.56V21h3.44Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.25a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.44 20h-3.37v-6.03c0-1.44-.03-3.29-2-3.29-2.01 0-2.32 1.57-2.32 3.19V20H9.38V8.5h3.24v1.57h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.24 4.04 5.16V20Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M21.6 7.6a2.9 2.9 0 0 0-2.05-2.06C17.8 5 12 5 12 5s-5.8 0-7.55.54A2.9 2.9 0 0 0 2.4 7.6 30.4 30.4 0 0 0 2 12a30.4 30.4 0 0 0 .4 4.4 2.9 2.9 0 0 0 2.05 2.06C6.2 19 12 19 12 19s5.8 0 7.55-.54A2.9 2.9 0 0 0 21.6 16.4 30.4 30.4 0 0 0 22 12a30.4 30.4 0 0 0-.4-4.4ZM10 15V9l5.2 3-5.2 3Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const footerRef = useRef<HTMLElement>(null);
  const riseRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: riseRef, offset: ["start start", "end end"] });

  // The panel starts fully below the viewport and rides up to completely
  // cover it — a deliberate "bring the page up" moment, not an ordinary
  // scroll reveal.
  const panelY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const panelRadius = useTransform(scrollYProgress, [0, 1], [56, 0]);

  useEffect(() => {
    const footer = footerRef.current;
    const behind = footer?.previousElementSibling as HTMLElement | null;
    if (!behind || shouldReduceMotion) return;

    const original = {
      filter: behind.style.filter,
      willChange: behind.style.willChange,
    };

    behind.style.willChange = "filter";

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const clamped = Math.max(0, Math.min(1, progress));
      const dim = clamped * 0.3;
      behind.style.filter = `brightness(${1 - dim})`;
    });

    return () => {
      unsubscribe();
      behind.style.filter = original.filter;
      behind.style.willChange = original.willChange;
    };
  }, [scrollYProgress, shouldReduceMotion]);

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    if (!email) return;

    setStatus("submitting");
    try {
      await submitLead({
        formType: "newsletter",
        name: email.split("@")[0],
        email,
        serviceCategory: "other",
        sourcePage: "footer-newsletter",
      });
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer ref={footerRef} className="relative z-10 isolate">
      <div ref={riseRef} className="relative h-[170vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            className="relative flex h-full flex-col justify-end overflow-hidden shadow-[0_-30px_60px_rgba(0,0,0,0.35)]"
            style={{
              background: "linear-gradient(190deg, #07090a 0%, #0c443d 45%, #07090a 100%)",
              ...(shouldReduceMotion
                ? {}
                : { y: panelY, borderTopLeftRadius: panelRadius, borderTopRightRadius: panelRadius }),
            }}
          >
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-10">
          <div className="grid gap-12 sm:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div>
              <span className="font-display text-lg font-semibold text-white">
                Digital<span className="text-point-400">Points</span>
              </span>
              <p className="mt-3 max-w-xs text-sm text-white/50">
                Media production, digital products and AI automation for
                businesses across Tanzania and Africa.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="mt-6 flex max-w-sm overflow-hidden rounded-full border border-white/15 bg-white/5"
              >
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-point-500 px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-point-400 disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Sign Up →"}
                </button>
              </form>
              {status === "success" && (
                <p className="mt-2 max-w-sm text-xs text-point-300">
                  ✓ Umejiunga! Tumepokea email yako, angalia inbox yako kwa uthibitisho.
                </p>
              )}
              {status === "error" && (
                <p className="mt-2 max-w-sm text-xs text-red-400">
                  Imeshindikana kutuma. Tafadhali jaribu tena.
                </p>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-point-300">
                Quick Links
              </p>
              <ul className="mt-4 space-y-3">
                {quickLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-white/70 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-point-300">
                Explore
              </p>
              <ul className="mt-4 space-y-3">
                {moreLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-white/70 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-point-300">
                Get in Touch
              </p>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                <a href="https://wa.me/255750126654" className="block hover:text-white">
                  +255 750 126 654
                </a>
                <a href="mailto:hello@digitalpoints.co.tz" className="block hover:text-white">
                  hello@digitalpoints.co.tz
                </a>
                <p className="text-white/50">Arusha, Tanzania</p>
              </div>
              <div className="mt-5 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs text-white/70 transition hover:border-point-400/50 hover:text-point-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
            <p>© {new Date().getFullYear()} Digital Points. All rights reserved.</p>
            <p>Website Design · Video Production · AI Automation — Tanzania</p>
          </div>
        </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
