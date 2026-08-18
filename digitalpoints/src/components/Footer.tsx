import { useState, type FormEvent } from "react";
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
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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
    <footer className="relative bg-cream-50">
      {/* Angled top edge — the triangle wedge fill matches the gradient below it
         so it reads as a single continuous shape once the page above is cream. */}
      <div
        className="h-16 w-full sm:h-24"
        style={{
          background: "#0c443d",
          clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        }}
      />
      <div
        className="relative"
        style={{
          background: "linear-gradient(160deg, #0c443d 0%, #07090a 65%)",
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
                <a href="https://wa.me/255714214247" className="block hover:text-white">
                  +255 714 214 247
                </a>
                <a href="mailto:hello@digitalpoints.co.tz" className="block hover:text-white">
                  hello@digitalpoints.co.tz
                </a>
                <p className="text-white/50">Moshi, Kilimanjaro, Tanzania</p>
              </div>
              <div className="mt-5 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs text-white/70 transition hover:border-point-400/50 hover:text-point-300"
                  >
                    {s.label[0]}
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
      </div>
    </footer>
  );
}
