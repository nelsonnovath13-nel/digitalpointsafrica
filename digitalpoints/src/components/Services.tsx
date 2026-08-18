import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const services = [
  "Digital Marketing",
  "Video Production",
  "Printing",
  "Promotional Items",
  "Branding Services",
  "Embroidery",
];

const brandTeal = "#08bdb8";

const cards = [
  {
    label: "CREATE",
    desktop: "left-[2%] top-[30%] lg:left-[0%] lg:top-[30%]",
    mobile: "left-[1%] top-[18%]",
    rotate: 9,
    hoverRotate: 5,
    x: [0, 8, -3],
    y: [14, -2, 10],
    r: [11, 5, 9],
    size: "h-[96px] w-[136px] sm:h-[108px] sm:w-[150px] lg:h-[125px] lg:w-[170px]",
  },
  {
    label: "BRAND",
    desktop: "right-[4%] top-[0%] lg:right-[4%] lg:top-[0%]",
    mobile: "right-[1%] top-[0%]",
    rotate: -10,
    hoverRotate: -6,
    x: [0, -10, 4],
    y: [10, -5, 8],
    r: [-13, -7, -10],
    size: "h-[86px] w-[124px] sm:h-[98px] sm:w-[138px] lg:h-[112px] lg:w-[150px]",
  },
  {
    label: "PROMOTE",
    desktop: "left-[38%] bottom-[0%] lg:left-[38%] lg:bottom-[0%]",
    mobile: "left-[27%] bottom-[0%]",
    rotate: 8,
    hoverRotate: 4,
    x: [0, 7, -5],
    y: [12, -4, 7],
    r: [10, 4, 8],
    size: "h-[96px] w-[136px] sm:h-[108px] sm:w-[150px] lg:h-[125px] lg:w-[170px]",
  },
];

function FloatingCard({ card, index }: { card: (typeof cards)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 0.45, 1], card.x);
  const y = useTransform(scrollYProgress, [0, 0.45, 1], card.y);
  const rotate = useTransform(scrollYProgress, [0, 0.45, 1], card.r);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35, scale: 0.88, rotate: card.rotate * 1.5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: card.rotate }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      style={{ x, y, rotate, transformOrigin: "center" }}
      whileHover={{ scale: 1.045, rotate: card.hoverRotate, y: -7 }}
      className={`absolute ${card.mobile} ${card.desktop} ${card.size} z-10 flex items-start justify-start bg-[#211f1f] p-3.5 text-white shadow-[0_18px_35px_rgba(0,0,0,0.14)] lg:p-5`}
    >
      <span className="font-display text-[0.72rem] font-normal tracking-[-0.035em] sm:text-[0.88rem] lg:text-[0.95rem]">
        {card.label}
      </span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
        style={{ backgroundColor: brandTeal }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.35 + index * 0.12 }}
      />
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Our Services"
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
            <h2 className="font-display text-[clamp(2.15rem,5.7vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#08bdb8]">
              <span className="block">From Creative Ideas to</span>
              <span className="block">Measurable Impact</span>
            </h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.12 }} style={{ transformOrigin: "left" }} className="mt-5 h-[2px] w-full bg-[#08bdb8]" />
            <p className="mt-5 max-w-[720px] font-display text-[clamp(0.92rem,1.08vw,1.15rem)] leading-[1.42] tracking-[-0.018em] text-[#171919]">
              Digital Points is a creative and digital solutions company helping businesses create compelling content, build strong brands, and promote them through design, marketing, media, and technology.
            </p>
            <motion.a href="/portfolio" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="mt-6 inline-flex bg-[#08bdb8] px-5 py-2.5 font-display text-[0.95rem] font-medium text-black hover:bg-[#211f1f] hover:text-white sm:px-6 sm:py-3">
              View all our works
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-8 h-[230px] w-full max-w-[520px] lg:mt-0 lg:h-[275px]"
          >
            {cards.map((card, index) => <FloatingCard key={card.label} card={card} index={index} />)}
            <motion.div aria-hidden="true" className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ backgroundColor: brandTeal, opacity: 0.06 }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:mt-8 lg:grid-cols-6 lg:gap-3">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -3 }}
              className="relative flex min-h-[46px] items-center justify-center overflow-hidden bg-[#08bdb8] px-2 py-2 text-center font-poppins text-[0.7rem] font-medium leading-tight text-black transition-colors duration-300 hover:bg-[#211f1f] hover:text-white sm:text-[0.76rem] lg:h-[46px] lg:text-[0.78rem]"
            >
              {service}
              <span aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-white/30 transition-transform duration-500 hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
