import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type Package = {
  title: string;
  image: string;
  description: string;
  features: string[];
};

const packages: Package[] = [
  {
    title: "Social Media Marketing",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=900&auto=format&fit=crop",
    description:
      "Consistent, on-brand content and community management across the platforms your customers actually use.",
    features: ["Content calendars & scheduling", "Community management", "Platform-native creative", "Monthly performance review"],
  },
  {
    title: "SEO",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=900&auto=format&fit=crop",
    description:
      "Get found by the people already searching for what you offer — technical fixes, content, and authority building.",
    features: ["Technical SEO audit", "On-page optimization", "Keyword & content strategy", "Local search visibility"],
  },
  {
    title: "Paid Ads",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=900&auto=format&fit=crop",
    description:
      "Meta and Google campaigns built around a clear cost-per-result target, not just impressions.",
    features: ["Campaign strategy & setup", "Audience targeting", "Ad creative & copy", "Budget & bid management"],
  },
  {
    title: "Content Marketing",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=900&auto=format&fit=crop",
    description:
      "Articles, graphics, and video that build trust with your audience long before they're ready to buy.",
    features: ["Content strategy", "Copywriting", "Visual content design", "Distribution planning"],
  },
  {
    title: "Email Marketing",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=900&auto=format&fit=crop",
    description:
      "Automated sequences and campaigns that keep your business top of mind without manual follow-up.",
    features: ["Welcome & nurture sequences", "Campaign design & copy", "List segmentation", "Open & click reporting"],
  },
  {
    title: "Digital Campaigns",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
    description:
      "Multi-channel campaigns for launches, promotions, and seasonal pushes — planned and run end to end.",
    features: ["Campaign concept & planning", "Cross-platform execution", "Landing pages", "Post-campaign reporting"],
  },
  {
    title: "Analytics & Reporting",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    description:
      "Clear, honest reporting on what's working and what isn't — so every shilling of spend is accountable.",
    features: ["Dashboard setup", "Monthly performance reports", "Conversion tracking", "Strategy adjustments"],
  },
];

const trustPoints = [
  { title: "One dedicated strategist", body: "A single point of contact who knows your account — not a rotating queue of freelancers." },
  { title: "Transparent reporting", body: "You see exactly what was done and what it produced, every month, in plain language." },
  { title: "Platforms we run daily", body: "Meta, Google, TikTok, LinkedIn, and email — run by people who work inside them every day." },
];

const process = [
  { step: "01", title: "Audit & Strategy", body: "We review what you have today and build a plan tied to a real business goal, not vanity metrics." },
  { step: "02", title: "Build & Launch", body: "Accounts, creative, and campaigns are set up properly and launched on an agreed timeline." },
  { step: "03", title: "Optimize", body: "We monitor performance weekly and adjust targeting, budget, and creative based on real data." },
  { step: "04", title: "Report & Scale", body: "You get a clear monthly report, and we scale what's working into a bigger part of the budget." },
];

export default function DigitalMarketing() {
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
            Digital Marketing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            Marketing built to grow your business, not just your following
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl font-poppins text-[15px] leading-relaxed text-white/70"
          >
            Strategy, content, and paid media run by one accountable team —
            planned around a real commercial goal and reported on in plain language.
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

      <section className="bg-white px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          {trustPoints.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-ink-950/5 bg-cream-50 p-6"
            >
              <h3 className="font-display text-base font-semibold text-ink-950">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-950/60">{t.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-dot-grid px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-point-600">Our packages</span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-950 sm:text-3xl">Digital marketing services</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-950/55">
              Pick a single service or combine several into one campaign — every package is scoped to your business, not sold off a shelf.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="flex flex-col overflow-hidden rounded-3xl border border-ink-950/5 bg-white shadow-sm"
              >
                <div className="h-44 w-full overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-ink-950">{pkg.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-950/60">{pkg.description}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[13px] text-ink-950/70">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-point-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/quotation"
                    className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-point-700 hover:text-point-800"
                  >
                    Request a Quote <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-point-600">How we work</span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-950 sm:text-3xl">From audit to accountable growth</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
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

      <section
        className="relative overflow-hidden px-6 py-20 text-center sm:py-24"
        style={{ background: "linear-gradient(120deg, #071211 0%, #0a2420 35%, #124a41 65%, #1a5c50 100%)" }}
      >
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Ready to grow with marketing that's accountable?</h2>
          <p className="mx-auto mt-4 max-w-md font-poppins text-[14px] leading-relaxed text-white/70">
            Tell us about your business and we'll come back with a clear plan and price — no obligation.
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
