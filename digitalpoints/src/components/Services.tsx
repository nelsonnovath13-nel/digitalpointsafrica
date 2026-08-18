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
    desktopPosition: "left-[0%] top-[30%]",
    mobilePosition: "left-[2%] top-[8%]",
    rotate: 9,
    hoverRotate: 5,
    scrollX: [0, 8, -3],
    scrollY: [14, -2, 10],
    scrollRotate: [11, 5, 9],
  },
  {
    label: "BRAND",
    desktopPosition: "right-[0%] top-[0%]",
    mobilePosition: "right-[2%] top-[0%]",
    rotate: -10,
    hoverRotate: -6,
    scrollX: [0, -10, 4],
    scrollY: [10, -5, 8],
    scrollRotate: [-13, -7, -10],
  },
  {
    label: "PROMOTE",
    desktopPosition: "left-[38%] bottom-[0%]",
    mobilePosition: "left-[25%] bottom-[4%]",
    rotate: 8,
    hoverRotate: 4,
    scrollX: [0, 7, -5],
    scrollY: [12, -4, 7],
    scrollRotate: [10, 4, 8],
  },
];

function FloatingCard({ card, index }: { card: (typeof cards)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 0.45, 1], card.scrollX);
  const y = useTransform(scrollYProgress, [0, 0.45, 1], card.scrollY);
  const rotate = useTransform(scrollYProgress, [0, 0.45, 1], card.scrollRotate);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 45, scale: 0.86, rotate: card.rotate * 1.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: card.rotate }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.75,
        delay: 0.12 + index * 0.14,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ x, y, rotate }}
      whileHover={{
        scale: 1.045,
        rotate: card.hoverRotate,
        y: -6,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      className={`absolute flex h-[98px] w-[138px] items-start justify-start bg-[#211f1f] p-3.5 text-white shadow-[0_18px_35px_rgba(0,0,0,0.12)] sm:h-[118px] sm:w-[160px] sm:p-5 lg:h-[125px] lg:w-[170px] lg:p-5 ${card.mobilePosition} ${card.desktopPosition}`}
      style={{
        x,
        y,
        rotate,
        transformOrigin: "center",
      }}
    >
      <span className="font-display text-[0.72rem] font-normal tracking-[-0.035em] sm:text-[0.9rem] lg:text-[0.95rem]">
        {card.label}
      </span>

      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
        style={{ backgroundColor: brandTeal }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, delay: 0.35 + index * 0.12 }}
      />

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-white/0"
        whileHover={{ backgroundColor: "rgba(255,255,255,0.055)" }}
        transition={{ duration: 0.25 }}
      />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-[#f7f3ea] px-6 pb-7 pt-[58px] sm:px-8 sm:pb-8 sm:pt-[70px] lg:px-12 lg:pb-8 lg:pt-[72px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[34%] opacity-80"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.16) 1.2px, transparent 1.35px)",
          backgroundSize: "18px 18px",
          maskImage: "linear-gradient(90deg, black 0%, rgba(0,0,0,0.75) 45%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, black 0%, rgba(0,0,0,0.75) 45%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[32%] opacity-55"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.12) 1.05px, transparent 1.25px)",
          backgroundSize: "20px 20px",
          maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.45) 35%, black 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.45) 35%, black 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-7 lg:min-h-[315px] lg:grid-cols-[55%_45%] lg:items-center lg:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <h2 className="font-display text-[clamp(2.25rem,3.8vw,4.15rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#08bdb8]">
              <span className="block">From Creative Ideas to</span>
              <span className="block">Measurable Impact</span>
            </h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="mt-5 h-[2px] w-full max-w-[700px] bg-[#08bdb8]"
            />

            <p className="mt-5 max-w-[700px] font-display text-[clamp(0.92rem,1.05vw,1.15rem)] leading-[1.35] tracking-[-0.018em] text-[#171919]">
              Digital Points is a creative and digital solutions company helping
              businesses create compelling content, build strong brands, and
              promote them through design, marketing, media, and technology.
            </p>

            <motion.a
              href="/portfolio"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-6 inline-flex items-center justify-center bg-[#08bdb8] px-5 py-2.5 font-display text-[0.95rem] font-medium text-black transition-colors duration-300 hover:bg-[#211f1f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08bdb8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f3ea]"
            >
              View all our works
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto h-[300px] w-full max-w-[620px] lg:h-[275px] lg:mt-0"
          >
            {cards.map((card, index) => (
              <FloatingCard key={card.label} card={card} index={index} />
            ))}

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-[45%] top-[38%] h-24 w-24 rounded-full blur-3xl"
              style={{ backgroundColor: brandTeal, opacity: 0.05 }}
              animate={{ x: [0, 10, 0], y: [0, -7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-3 lg:mt-6 lg:grid-cols-6 lg:gap-3">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.055 }}
              whileHover={{ y: -2 }}
              className="group relative flex h-[44px] items-center justify-center overflow-hidden bg-[#08bdb8] px-2 text-center font-poppins text-[0.72rem] font-medium tracking-[-0.01em] text-black transition-colors duration-300 hover:bg-[#211f1f] hover:text-white sm:text-[0.76rem] lg:h-[46px] lg:text-[0.78rem]"
            >
              <span className="relative z-10">{service}</span>
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1/2 -translate-x-full skew-x-[-18deg]"
                style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
                whileHover={{ x: "250%" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
