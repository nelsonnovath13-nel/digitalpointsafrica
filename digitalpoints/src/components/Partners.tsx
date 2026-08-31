import { motion, useReducedMotion } from "framer-motion";

const partners = [
  { name: "Diakonia", src: "/images/trustees/diakonia.webp" },
  { name: "ECSA Health Community", src: "/images/trustees/ecsa-health-community.webp" },
  { name: "Double A Transfer & Getaway", src: "/images/trustees/double-a-transfer-getaway.webp" },
  { name: "UNICEF", src: "/images/trustees/unicef.webp" },
  { name: "ECOWAS", src: "/images/trustees/ecowas.webp" },
  { name: "USAID", src: "/images/trustees/usaid.webp" },
  { name: "Hypermed Health Care", src: "/images/trustees/hypermed-health-care.webp" },
  { name: "YWAM", src: "/images/trustees/ywam.webp" },
  { name: "World's Children", src: "/images/trustees/worlds-children.webp" },
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
                className="trust-marquee-logo group flex h-36 w-64 shrink-0 items-center justify-center overflow-hidden border-r border-point-600/15 px-6 sm:h-44 sm:w-80 sm:px-9"
                title={partner.name}
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

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
