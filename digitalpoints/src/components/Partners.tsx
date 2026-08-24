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

export default function Partners() {
  const prefersReducedMotion = useReducedMotion();
  const marqueePartners = [...partners, ...partners];

  return (
    <section className="bg-dot-grid relative overflow-hidden bg-cream-50 py-24 sm:py-28">
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
      </div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.56, ease: premiumEase }}
        className="trust-marquee-frame mt-12 border-y border-point-600/25 bg-white/35"
      >
        <div className="trust-marquee-mask">
          <div
            className="trust-marquee-track"
            aria-label="Organizations trusted by Digital Points"
          >
            {marqueePartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="trust-marquee-logo group flex h-28 w-56 shrink-0 items-center justify-center overflow-hidden border-r border-point-600/15 px-5 sm:h-32 sm:w-64 sm:px-7"
                title={partner.name}
              >
                <span className="sr-only">{partner.name}</span>
                <div
                  aria-hidden="true"
                  className="h-full w-full bg-no-repeat transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                  style={{
                    backgroundImage: "url('/trustees-sprite.webp')",
                    backgroundSize: "420% 420%",
                    backgroundPosition: `${partner.x} ${partner.y}`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="mx-auto max-w-6xl px-6">
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

      <style>{`
        .trust-marquee-frame {
          position: relative;
        }

        .trust-marquee-mask {
          overflow: hidden;
          width: 100%;
        }

        .trust-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: trust-marquee-scroll 30s linear infinite;
        }

        .trust-marquee-frame:hover .trust-marquee-track {
          animation-play-state: paused;
        }

        @keyframes trust-marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @media (max-width: 640px) {
          .trust-marquee-track {
            animation-duration: 24s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trust-marquee-track {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
