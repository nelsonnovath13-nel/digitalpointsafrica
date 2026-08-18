import { motion } from "framer-motion";

const services = [
  "Digital Marketing",
  "Video Production",
  "Printing",
  "Promotional Items",
  "Branding Services",
  "Embroidery",
];

const serviceColors = [
  "#00c7c3",
  "#2d8cff",
  "#8a4dff",
  "#f59e0b",
  "#ec4899",
  "#10b981",
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-[#f7f3ea] px-6 py-20 sm:py-24 lg:py-28"
    >
      {/* Soft dotted/triangular-inspired edge texture. It stays deliberately
          subtle so the content remains the visual focus. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[52%] opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(30,35,35,0.12) 1.2px, transparent 1.3px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 0% 50%, black 0%, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.16) 70%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 0% 50%, black 0%, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.16) 70%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[34%] opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(30,35,35,0.10) 1px, transparent 1.1px)",
          backgroundSize: "20px 20px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 100% 50%, black 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 100% 50%, black 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#08bdb8] sm:text-5xl lg:text-[4.25rem]">
              From Creative Ideas to
              <br />
              Measurable Impact
            </h2>

            <div className="mt-8 h-[2px] w-full max-w-4xl bg-[#08bdb8]" />

            <p className="mt-8 max-w-3xl font-display text-xl leading-[1.42] text-[#171919] sm:text-2xl lg:text-[1.8rem]">
              Digital Points is a creative and digital solutions company helping
              businesses create compelling content, build strong brands, and
              promote them through design, marketing, media, and technology.
            </p>

            <a
              href="/portfolio"
              className="mt-10 inline-flex items-center justify-center bg-[#08bdb8] px-8 py-4 font-display text-xl font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00aaa6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08bdb8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f3ea]"
            >
              View all our works
            </a>
          </motion.div>

          {/* CREATE / BRAND / PROMOTE visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto h-[360px] w-full max-w-[520px] sm:h-[430px]"
          >
            <div className="absolute left-[12%] top-[14%] h-[58%] w-[40%] rotate-[9deg] bg-[#211f1f] p-7 text-white shadow-[0_24px_50px_rgba(0,0,0,0.08)] sm:p-9">
              <span className="font-display text-2xl font-normal sm:text-3xl">CREATE</span>
            </div>

            <div className="absolute right-[8%] top-[2%] h-[56%] w-[38%] -rotate-[10deg] bg-[#211f1f] p-7 text-white shadow-[0_24px_50px_rgba(0,0,0,0.08)] sm:p-9">
              <span className="font-display text-2xl font-normal sm:text-3xl">BRAND</span>
            </div>

            <div className="absolute right-[16%] bottom-[2%] h-[55%] w-[39%] rotate-[9deg] bg-[#211f1f] p-7 text-white shadow-[0_24px_50px_rgba(0,0,0,0.08)] sm:p-9">
              <span className="font-display text-2xl font-normal sm:text-3xl">PROMOTE</span>
            </div>
          </motion.div>
        </div>

        {/* Client-specified service strip */}
        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6 lg:gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group relative flex min-h-[54px] items-center justify-center overflow-hidden px-4 py-3 text-center font-display text-base font-medium text-black transition-transform duration-300 hover:-translate-y-1 sm:text-lg"
              style={{ backgroundColor: serviceColors[index] }}
            >
              <span className="relative z-10">{service}</span>
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-x-0"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
