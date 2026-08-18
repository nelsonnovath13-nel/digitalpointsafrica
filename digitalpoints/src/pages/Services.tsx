import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const groups = [
  {
    category: "Media Production",
    icon: "◆",
    items: ["Photography", "Videography", "Live Streaming"],
    href: "/quotation",
    cta: "Request a Quote",
  },
  {
    category: "Digital Solutions",
    icon: "◈",
    items: ["Website Design", "Web Applications", "Business Systems", "E-commerce"],
    href: "/quotation",
    cta: "Request a Quote",
  },
  {
    category: "AI Automation",
    icon: "◎",
    items: ["WhatsApp Bots", "Customer Support Automation", "Lead Generation Systems"],
    href: "/quotation",
    cta: "Request a Quote",
  },
  {
    category: "Branding & Design",
    icon: "◇",
    items: ["Logo Design", "Poster Design", "Brochure Design", "Company Profiles", "Social Media Design"],
    href: "/quotation",
    cta: "Request a Quote",
  },
  {
    category: "Printing Services",
    icon: "▣",
    items: ["Business Cards", "Flyers", "Posters", "Banners", "Brochures"],
    href: "/printing",
    cta: "View Printing Services",
  },
  {
    category: "Training Programs",
    icon: "▲",
    items: ["Photography Training", "Videography Training", "Social Media Training", "AI Tools Training"],
    href: "/training",
    cta: "Explore Training",
  },
  {
    category: "Digital Consultation",
    icon: "◐",
    items: ["Technology Consulting", "Business Consulting", "Digital Strategy", "Website & SEO Audits"],
    href: "/consultation",
    cta: "Book a Consultation",
  },
  {
    category: "Website Maintenance",
    icon: "◉",
    items: ["Content Updates", "Security Monitoring", "Backups", "Technical Support"],
    href: "/maintenance",
    cta: "View Maintenance Plans",
  },
];

export default function Services() {
  return (
    <div className="bg-dot-grid min-h-screen bg-cream-50 pb-24 pt-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          Services
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">
          Everything your business needs to grow online
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-950/55">
          From a single video to a full digital system — pick what you need, or let us design the mix.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-6 px-6 sm:grid-cols-2">
        {groups.map((g, i) => (
          <motion.div
            key={g.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="flex flex-col rounded-3xl border border-ink-950/5 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-point-50 text-xl text-point-600">
              {g.icon}
            </div>
            <h2 className="font-display text-xl font-semibold text-ink-950">{g.category}</h2>
            <ul className="mt-5 flex-1 space-y-3">
              {g.items.map((it) => (
                <li key={it} className="flex items-center gap-3 text-sm text-ink-950/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-point-400" />
                  {it}
                </li>
              ))}
            </ul>
            <Link
              to={g.href}
              className="mt-6 inline-flex w-fit items-center justify-center rounded-full border border-ink-950/15 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-ink-950 hover:text-white"
            >
              {g.cta} →
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-3xl px-6 text-center">
        <a
          href="https://wa.me/255714214247"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-point-500 px-8 py-4 text-sm font-semibold text-ink-950 transition hover:bg-point-400"
        >
          Chat with us on WhatsApp
        </a>
      </div>
    </div>
  );
}
