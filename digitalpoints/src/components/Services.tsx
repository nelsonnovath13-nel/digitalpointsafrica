import { motion } from "framer-motion";

const brandTeal = "#08bdb8";

function ImpactMark() {
  return (
    <motion.svg
      viewBox="0 0 400 460"
      initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 h-full w-full"
      aria-label="Create, Brand, Grow — Impact"
    >
      <path
        d="M88.5,206.6 L210.3,132.6 Q330,60 330,200 L330,260 Q330,400 210.3,327.4 L88.5,253.4 Q50,230 88.5,206.6 Z"
        fill={brandTeal}
      />
      <text
        x="195"
        y="242"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="'Mona Sans', sans-serif"
        fontWeight={800}
        fontSize="40"
        letterSpacing="-1"
      >
        IMPACT
      </text>
      <text
        x="168"
        y="118"
        textAnchor="middle"
        fill={brandTeal}
        fontFamily="'Mona Sans', sans-serif"
        fontWeight={800}
        fontSize="26"
        letterSpacing="1"
        transform="rotate(-31.3 168 118)"
      >
        CREATE
      </text>
      <text
        x="168"
        y="358"
        textAnchor="middle"
        fill={brandTeal}
        fontFamily="'Mona Sans', sans-serif"
        fontWeight={800}
        fontSize="26"
        letterSpacing="1"
        transform="rotate(31.3 168 358)"
      >
        BRAND
      </text>
      <text
        x="372"
        y="230"
        textAnchor="middle"
        fill={brandTeal}
        fontFamily="'Mona Sans', sans-serif"
        fontWeight={800}
        fontSize="26"
        letterSpacing="1"
        transform="rotate(90 372 230)"
      >
        GROW
      </text>
    </motion.svg>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      aria-label="The Digital Points Way"
      className="relative isolate overflow-hidden bg-[#f7f3ea] px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pb-14 lg:pt-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[38%] opacity-75" style={{ backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.15) 1.15px, transparent 1.3px)", backgroundSize: "18px 18px", maskImage: "linear-gradient(90deg, black, transparent)", WebkitMaskImage: "linear-gradient(90deg, black, transparent)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[30%] opacity-50" style={{ backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.11) 1px, transparent 1.2px)", backgroundSize: "20px 20px", maskImage: "linear-gradient(90deg, transparent, black)", WebkitMaskImage: "linear-gradient(90deg, transparent, black)" }} />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] lg:items-center lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#08bdb8]">
              <span className="block">The Digital Points Way</span>
            </h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.12 }} style={{ transformOrigin: "left" }} className="mt-5 h-[2px] w-full bg-[#08bdb8]" />
            <p className="mt-5 max-w-[720px] font-display text-[clamp(0.92rem,1.08vw,1.15rem)] leading-[1.42] tracking-[-0.018em] text-[#171919]">
              At Digital Points, we believe that every great business starts with an idea, but an idea needs the right creativity, identity, and strategy to become a successful brand. That is why our work is built around three simple but powerful principles:
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-8 h-[280px] w-full max-w-[420px] lg:mt-0 lg:h-[340px]"
          >
            <ImpactMark />
            <motion.div aria-hidden="true" className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ backgroundColor: brandTeal, opacity: 0.06 }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
