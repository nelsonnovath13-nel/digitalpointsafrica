import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type Pillar = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
};

const pillars: Pillar[] = [
  {
    id: "digital-marketing",
    eyebrow: "01",
    title: "Digital Marketing",
    description:
      "Marketing systems built around one goal — turning attention into paying customers, not just followers. We plan the strategy, run the platforms, and report on what actually moved the needle.",
    items: ["Social Media", "SEO", "Paid Ads", "Content Marketing", "Email Marketing", "Digital Campaigns", "Analytics & Reporting"],
    ctaLabel: "Request a Marketing Quote",
    ctaHref: "/quotation",
  },
  {
    id: "web-app-systems",
    eyebrow: "02",
    title: "Web, App & Systems",
    description:
      "Websites, apps, and internal systems built to actually run your business — fast for your customers, and simple for your team to manage long after we hand it over.",
    items: ["Website Design & Development", "Mobile App Development", "Web Applications", "Business Management Systems", "Custom Software Solutions", "E-Commerce Solutions", "System Integration & Automation"],
    ctaLabel: "Request a Web Quote",
    ctaHref: "/quotation",
  },
  {
    id: "video-production",
    eyebrow: "03",
    title: "Video Production",
    description:
      "Video that looks like it belongs on a bigger budget. From concept and shooting to editing and delivery, we produce content built to hold attention and represent your brand properly.",
    items: ["Corporate & Brand Videos", "Promotional Videos", "Social Media Content", "Event & Conference Coverage", "Product & Service Videos", "Interviews & Testimonials", "Photography & Videography", "Video Editing & Post-Production"],
    ctaLabel: "View Video Production",
    ctaHref: "/video-production",
  },
  {
    id: "print-branding",
    eyebrow: "04",
    title: "Print & Branding",
    description:
      "One consistent brand, everywhere it shows up — the logo on your website, the banner outside your shop, the profile you hand to a client, and the shirt your team wears.",
    items: ["Brand Identity Design", "Logo Design", "Corporate Profiles & Stationery", "Embroidery", "Marketing & Promotional Materials", "Business Cards & Brochures", "Banners, Posters & Signage", "Packaging & Label Design", "Large Format & Digital Printing"],
    ctaLabel: "View Printing Services",
    ctaHref: "/printing",
  },
];

const processSteps = [
  { step: "01", title: "Discover", body: "We start by understanding your business, your customers, and what \"success\" actually looks like for this project." },
  { step: "02", title: "Plan", body: "A clear scope, timeline, and price before any work begins — no surprises halfway through." },
  { step: "03", title: "Create", body: "Our team designs, builds, shoots, or prints — with check-ins along the way, not just a reveal at the end." },
  { step: "04", title: "Launch & Support", body: "We hand over a finished product and stay reachable after launch, not just until the invoice is paid." },
];

const otherServices = [
  { title: "Training Programs", body: "Hands-on training in photography, videography, social media, and AI tools for teams who want in-house capability.", href: "/training" },
  { title: "Digital Consultation", body: "An outside, technical opinion on your website, SEO, or digital strategy before you commit budget to it.", href: "/consultation" },
  { title: "Website Maintenance", body: "Ongoing updates, security monitoring, backups, and support so your site keeps working after launch.", href: "/maintenance" },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-cream-50">
      <section
        className="relative overflow-hidden px-6 pb-20 pt-36 text-center sm:pb-24 sm:pt-40"
        style={{ background: "linear-gradient(120deg, #071211 0%, #0a2420 35%, #124a41 65%, #1a5c50 100%)" }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -left-[10%] top-[-15%] h-[320px] w-[320px] rounded-full bg-[#14b8a6]/20 blur-[110px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-[8%] bottom-[-20%] h-[280px] w-[280px] rounded-full bg-[#0d9488]/20 blur-[100px]" />
        <div className="relative mx-auto max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-point-300"
          >
            Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            Everything your brand needs, under one roof
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl font-poppins text-[15px] leading-relaxed text-white/70"
          >
            Marketing, websites and apps, video, and print — built by one team that
            already understands your brand, so nothing gets lost between agencies.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              to="/quotation"
              className="inline-flex h-[48px] min-w-[190px] items-center justify-center rounded-full bg-[#08bdb8] px-7 font-poppins text-[13.5px] font-semibold text-white transition hover:bg-[#10aaa6]"
            >
              Request a Quote
            </Link>
            <a
              href="https://wa.me/255750126654"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[48px] min-w-[190px] items-center justify-center rounded-full border border-white/70 bg-white/[0.02] px-7 font-poppins text-[13.5px] font-semibold text-white transition hover:bg-white/[0.08]"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      <section className="bg-dot-grid px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-point-600">What we do</span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-950 sm:text-3xl">Four disciplines, one accountable team</h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                id={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="scroll-mt-24 rounded-3xl border border-ink-950/5 bg-white p-8 shadow-sm sm:p-9"
              >
                <span className="font-display text-sm font-semibold text-point-300">{pillar.eyebrow}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink-950 sm:text-2xl">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-950/60">{pillar.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {pillar.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-point-500/15 bg-point-50 px-3 py-1.5 text-[12.5px] font-medium text-point-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <Link
                  to={pillar.ctaHref}
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-ink-950/15 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-ink-950 hover:text-white"
                >
                  {pillar.ctaLabel} <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-point-600">How we work</span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-950 sm:text-3xl">A clear process, from first call to launch</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-2xl border border-ink-950/5 bg-cream-50 p-6"
              >
                <span className="font-display text-2xl font-semibold text-point-300">{s.step}</span>
                <h3 className="mt-3 font-display text-base font-semibold text-ink-950">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-950/60">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dot-grid px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-point-600">Beyond production</span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-950 sm:text-3xl">Support for teams who want to go further</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {otherServices.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-ink-950/5 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-base font-semibold text-ink-950">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-950/60">{s.body}</p>
                <Link to={s.href} className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-point-700 hover:text-point-800">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden px-6 py-20 text-center sm:py-24"
        style={{ background: "linear-gradient(120deg, #071211 0%, #0a2420 35%, #124a41 65%, #1a5c50 100%)" }}
      >
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Ready to see what this looks like for your business?</h2>
          <p className="mx-auto mt-4 max-w-md font-poppins text-[14px] leading-relaxed text-white/70">
            Tell us what you need and we'll come back with a clear scope and price — no obligation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/quotation"
              className="inline-flex h-[48px] min-w-[190px] items-center justify-center rounded-full bg-[#08bdb8] px-7 font-poppins text-[13.5px] font-semibold text-white transition hover:bg-[#10aaa6]"
            >
              Request a Quote
            </Link>
            <a
              href="https://wa.me/255750126654"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[48px] min-w-[190px] items-center justify-center rounded-full border border-white/70 bg-white/[0.02] px-7 font-poppins text-[13.5px] font-semibold text-white transition hover:bg-white/[0.08]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
