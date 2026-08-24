import { motion, useReducedMotion } from "framer-motion";

const partners = [
  { name: "Diakonia", x: "0%", y: "0%" },
  { name: "ECSA Health Community", x: "50%", y: "0%" },
  { name: "Double A Transfer & Gateway", x: "100%", y: "0%" },
  { name: "UNICEF", x: "0%", y: "50%" },
  { name: "ECOWAS", x: "50%", y: "50%" },
  { name: "USAID", x: "100%", y: "50%" },
  { name: "Hypermed Health Care", x: "0%", y: "100%" },
  { name: "YWAM", x: "50%", y: "100%" },
  { name: "World's Children", x: "100%", y: "100%" },
];

const stats = [
  { value: "25+", label: "Clients" },
  { value: "7+", label: "Projects Delivered" },
  { value: "3", label: "Years in Business" },
  { value: "10+", label: "Combined Years of Experience" },
];

const premiumEase = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.56, delay: index * 0.08, ease: premiumEase },
  }),
  hover: {
    y: -3,
    borderColor: "rgba(14, 171, 143, 0.38)",
    boxShadow: "0 10px 24px rgba(7, 9, 10, 0.09)",
    transition: { duration: 0.25, ease: premiumEase },
  },
};

export default function Partners() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-dot-grid relative bg-cream-50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          Trusted By
        </span>
        <motion.h2
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4, ease: premiumEase }}
          className="mt-3 font-display text-3xl font-semibold text-ink-950 sm:text-4xl"
        >
          Organizations that grew with us
        </motion.h2>

        <div className="trust-grid-reveal mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              variants={cardVariants}
              custom={i}
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView={prefersReducedMotion ? undefined : "visible"}
              whileHover={prefersReducedMotion ? undefined : "hover"}
              viewport={{ once: true, amount: 0.25 }}
              className="group flex h-24 items-center justify-center rounded-xl border border-ink-950/5 bg-white p-3 shadow-sm"
              title={partner.name}
            >
              <span className="sr-only">{partner.name}</span>
              <motion.div
                aria-hidden="true"
                className="h-full w-full bg-no-repeat transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                style={{
                  backgroundImage: "url('/trustees-sprite.webp')",
                  backgroundSize: "300% 300%",
                  backgroundPosition: `${partner.x} ${partner.y}`,
                }}
              />
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
