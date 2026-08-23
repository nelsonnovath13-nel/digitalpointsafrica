import { motion } from "framer-motion";
import { trustees } from "../data/trustees";

const stats = [
  { value: "25+", label: "Clients" },
  { value: "7+", label: "Projects Delivered" },
  { value: "3", label: "Years in Business" },
  { value: "10+", label: "Combined Years of Experience" },
];

export default function Partners() {
  return (
    <section className="bg-dot-grid relative overflow-hidden bg-cream-50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          Trusted By
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
          Organizations that grew with us
        </h2>
      </div>

      <div className="trustees-marquee mt-12" aria-label="Organizations that trust Digital Points Africa">
        <div className="trustees-track">
          {[0, 1].map((set) => (
            <div className="trustees-group" key={set} aria-hidden={set === 1}>
              {trustees.map((trustee) => (
                <div className="trustee-logo" key={`${set}-${trustee.name}`}>
                  <img src={trustee.src} alt={set === 0 ? trustee.name : ""} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-8 border-t border-ink-950/10 px-6 pt-12 sm:grid-cols-4">
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
    </section>
  );
}
