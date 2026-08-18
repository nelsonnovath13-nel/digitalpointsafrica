import { motion } from "framer-motion";

const partners = ["UNICEF", "ELCTD", "Kilimanjaro Union", "Moshi Chamber", "Serengeti Boma", "Twiga Ventures", "Arusha NGO Forum", "Kibo Ventures"];

const stats = [
  { value: "25+", label: "Clients" },
  { value: "7+", label: "Projects Delivered" },
  { value: "3", label: "Years in Business" },
  { value: "10+", label: "Combined Years of Experience" },
];

export default function Partners() {
  return (
    <section className="bg-dot-grid relative bg-cream-50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          Trusted By
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
          Organizations that grew with us
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {partners.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex h-20 items-center justify-center rounded-xl border border-ink-950/5 bg-white px-4 text-center text-sm font-medium text-ink-950/40 shadow-sm grayscale transition hover:text-point-700 hover:grayscale-0"
            >
              {p}
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-ink-950/10 pt-12 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <p className="font-display text-4xl font-semibold text-point-600 sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-ink-950/50">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
