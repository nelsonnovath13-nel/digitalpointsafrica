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
const brandOrange = "#ff7a45";

const cards = [
  { label: "CREATE", position: "left-[7%] top-[17%]", rotate: -10, hoverRotate: -6 },
  { label: "BRAND", position: "right-[7%] top-[2%]", rotate: 10, hoverRotate: 6 },
  { label: "PROMOTE", position: "right-[15%] top-[50%]", rotate: 10, hoverRotate: 6 },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-[#f7f3ea] px-6 py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[48%] opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(30,35,35,0.12) 1.1px, transparent 1.2px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(ellipse 72% 68% at 0% 50%, black 0%, rgba(0,0,0,0.58) 42%, rgba(0,0,0,0.12) 70%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 68% at 0% 50%, black 0%, rgba(0,0,0,0.58) 42%, rgba(0,0,0,0.12) 70%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[28%] opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(30,35,35,0.10) 1px, transparent 1.1px)",
          backgroundSize: "20px 20px",
          maskImage:
            "radial-gradient(ellipse 75% 60% at 100% 50%, black 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 60% at 100% 50%, black 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 xl:grid-cols-[1.18fr_0.82fr] xl:gap-10 2xl:gap-14">
          {/* The client reference has exactly two headline lines. */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <h2 className="font-display text-[clamp(2.2rem,4.3vw,4.65rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#08bdb8]">
              <span className="block whitespace-nowrap">From Creative Ideas to</span>
              <span className="block whitespace-nowrap">Measurable Impact</span>
            </h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="mt-7 h-[2px] w-full max-w-[720px] bg-[#08bdb8]"
            />

            <p className="mt-7 max-w-[700px] font-display text-lg leading-[1.45] text-[#171919] sm:text-xl lg:text-[1.45rem]">
              Digital Points is a creative and digital solutions company helping
              businesses create compelling content, build strong brands, and
              promote them through design, marketing, media, and technology.
            </p>

            <motion.a
              href="/portfolio"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-9 inline-flex items-center justify-center bg-[#08bdb8] px-8 py-4 font-display text-lg font-medium text-black transition-colors duration-300 hover:bg-[#06aaa6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08bdb8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f3ea]"
            >
              View all our works
            </motion.a>
          </motion.div>

          {/* Three cards follow the client's CREATE / BRAND / PROMOTE layout. */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto h-[420px] w-full max-w-[470px] sm:h-[520px]"
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 22, rotate: card.rotate }}
                whileInView={{ opacity: 1, y: 0, rotate: card.rotate }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.65,
                  delay: 0.18 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -8,
                  rotate: card.hoverRotate,
                  scale: 1.025,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                }}
                className={`absolute flex h-[210px] w-[175px] items-start justify-start bg-[#211f1f] p-6 text-white shadow-[0_22px_45px_rgba(0,0,0,0.07)] sm:h-[275px] sm:w-[225px] sm:p-8 ${card.position}`}
                style={{ transformOrigin: "center" }}
              >
                <span className="font-display text-[1.55rem] font-normal tracking-[-0.025em] sm:text-[2rem]">
                  {card.label}
                </span>

                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left"
                  style={{ backgroundColor: brandTeal }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-[38%] top-[35%] h-24 w-24 rounded-full blur-3xl"
              style={{ backgroundColor: brandOrange, opacity: 0.08 }}
              animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* One strong brand colour, as in the client's reference. */}
        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:mt-16 xl:grid-cols-6 xl:gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.055 }}
              whileHover={{ y: -4 }}
              className="group relative flex min-h-[54px] items-center justify-center overflow-hidden bg-[#08bdb8] px-4 py-3 text-center font-display text-base font-medium text-black transition-colors duration-300 hover:bg-[#211f1f] hover:text-white sm:text-lg"
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
