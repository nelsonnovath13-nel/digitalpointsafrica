import { motion } from "framer-motion";

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
  { label: "CREATE", position: "left-[5%] top-[29%]", rotate: 9, hoverRotate: 5 },
  { label: "BRAND", position: "right-[7%] top-[4%]", rotate: -10, hoverRotate: -6 },
  { label: "PROMOTE", position: "right-[14%] bottom-[4%]", rotate: 9, hoverRotate: 5 },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-[#f7f3ea] px-6 py-6 sm:px-8 sm:py-7 lg:px-12 lg:py-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[34%] opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(50,55,55,0.16) 1.2px, transparent 1.35px)",
          backgroundSize: "18px 18px",
          maskImage:
            "linear-gradient(90deg, black 0%, rgba(0,0,0,0.75) 45%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, black 0%, rgba(0,0,0,0.75) 45%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[27%] opacity-55"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(50,55,55,0.12) 1.05px, transparent 1.25px)",
          backgroundSize: "20px 20px",
          maskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.45) 35%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.45) 35%, black 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[60%] lg:shrink-0"
          >
            <h2 className="font-display text-[clamp(2.25rem,4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#08bdb8]">
              <span className="block whitespace-nowrap">From Creative Ideas to</span>
              <span className="block whitespace-nowrap">Measurable Impact</span>
            </h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="mt-5 h-[2px] w-full max-w-[650px] bg-[#08bdb8]"
            />

            <p className="mt-5 max-w-[650px] font-display text-[clamp(0.92rem,1.15vw,1.2rem)] leading-[1.32] tracking-[-0.018em] text-[#171919]">
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
            className="relative mt-8 h-[215px] w-full lg:mt-0 lg:w-[40%] lg:shrink-0"
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 18, rotate: card.rotate }}
                whileInView={{ opacity: 1, y: 0, rotate: card.rotate }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.65,
                  delay: 0.18 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -5,
                  rotate: card.hoverRotate,
                  scale: 1.035,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                }}
                className={`absolute flex h-[78px] w-[92px] items-start justify-start bg-[#211f1f] p-3 text-white shadow-[0_16px_30px_rgba(0,0,0,0.06)] sm:h-[88px] sm:w-[105px] sm:p-3 lg:h-[94px] lg:w-[120px] lg:p-3.5 ${card.position}`}
                style={{ transformOrigin: "center" }}
              >
                <span className="font-display text-[0.72rem] font-normal tracking-[-0.035em] sm:text-[0.78rem] lg:text-[0.8rem]">
                  {card.label}
                </span>

                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
                  style={{ backgroundColor: brandTeal }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-[42%] top-[38%] h-24 w-24 rounded-full blur-3xl"
              style={{ backgroundColor: brandTeal, opacity: 0.05 }}
              animate={{ x: [0, 10, 0], y: [0, -7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-2.5">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.055 }}
              whileHover={{ y: -2 }}
              className="group relative flex h-[38px] items-center justify-center overflow-hidden bg-[#08bdb8] px-2 text-center font-poppins text-[0.7rem] font-medium tracking-[-0.01em] text-black transition-colors duration-300 hover:bg-[#211f1f] hover:text-white sm:text-[0.74rem]"
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
