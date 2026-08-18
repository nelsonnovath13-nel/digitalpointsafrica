import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const brandTeal = "#08bdb8";

const services = [
  {
    title: "Digital Marketing",
    description:
      "We help businesses reach the right audience through social media, content, paid campaigns, and practical digital strategies designed to increase visibility, engagement, and enquiries.",
    tags: ["Social Media", "Content Marketing", "Paid Campaigns", "Digital Strategy"],
    visual: "MARKETING",
  },
  {
    title: "Video Production",
    description:
      "We create engaging video content that helps businesses tell their story, showcase their work, explain their products, and connect with customers across digital platforms.",
    tags: ["Corporate Video", "Social Content", "Event Coverage", "Video Editing"],
    visual: "MEDIA",
  },
  {
    title: "Printing",
    description:
      "We turn your designs into professional printed materials that keep your business visible, consistent, and credible wherever your customers meet your brand offline.",
    tags: ["Business Cards", "Flyers", "Posters", "Large Format"],
    visual: "PRINT",
  },
  {
    title: "Promotional Items",
    description:
      "We help businesses stay memorable with useful branded items made for campaigns, events, teams, customers, and everyday brand visibility.",
    tags: ["Branded Gifts", "Corporate Items", "Campaign Materials", "Custom Orders"],
    visual: "PROMOTE",
  },
  {
    title: "Branding Services",
    description:
      "We build visual identities that make businesses easier to recognise, trust, and remember, from the first impression to everyday brand communication.",
    tags: ["Logo Design", "Brand Identity", "Brand Guidelines", "Creative Direction"],
    visual: "BRAND",
  },
  {
    title: "Embroidery",
    description:
      "We add a professional branded finish to clothing and fabric products with clean, durable embroidery made for teams, businesses, schools, and organisations.",
    tags: ["Workwear", "Uniforms", "Caps", "Custom Embroidery"],
    visual: "EMBROIDERY",
  },
] as const;

type Service = (typeof services)[number];

function ServiceCard({ service, index, progress }: { service: Service; index: number; progress: ReturnType<typeof useSpring> }) {
  const start = index / services.length;
  const center = (index + 0.5) / services.length;
  const end = (index + 1) / services.length;

  // On scroll down a card enters from the right, settles in the centre,
  // then leaves through the left. Scrolling upward reverses the same motion.
  const x = useTransform(progress, [start, center, end], ["112%", "0%", "-112%"]);
  const opacity = useTransform(progress, [start, start + 0.035, end - 0.035, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, center, end], [0.96, 1, 0.96]);
  const rotate = useTransform(progress, [start, center, end], [2.5, 0, -2.5]);

  return (
    <motion.article
      aria-label={service.title}
      style={{ x, opacity, scale, rotate, zIndex: services.length - index }}
      className="absolute inset-0 overflow-hidden rounded-[26px] bg-[#08bdb8] shadow-[0_30px_90px_rgba(0,0,0,0.16)] sm:rounded-[32px] lg:rounded-[38px]"
    >
      <div className="relative flex h-full flex-col p-6 sm:p-9 lg:p-12 xl:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-black/[0.035] sm:h-96 sm:w-96" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full border-[35px] border-white/[0.16] sm:h-96 sm:w-96" />

        <div className="relative z-10 flex items-center justify-between gap-5">
          <div className="flex items-center gap-3 text-[#145b59] sm:gap-4">
            <span className="h-px w-10 bg-[#145b59]/70 sm:w-16" />
            <span className="font-poppins text-[10px] font-medium uppercase tracking-[0.28em] sm:text-xs sm:tracking-[0.32em]">
              Our Services
            </span>
          </div>
          <span className="hidden font-poppins text-[10px] font-medium uppercase tracking-[0.28em] text-black/30 sm:block">
            {service.visual}
          </span>
        </div>

        <div className="relative z-10 mt-7 max-w-5xl sm:mt-10 lg:mt-12">
          <h3 className="font-display text-[clamp(2.5rem,7vw,6.7rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-black">
            {service.title}
          </h3>
          <p className="mt-5 max-w-4xl font-display text-[clamp(1rem,1.75vw,1.48rem)] leading-[1.42] tracking-[-0.02em] text-[#101818] sm:mt-7">
            {service.description}
          </p>
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap gap-2 sm:mt-8">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="border border-black/10 bg-black/[0.045] px-3 py-2 font-poppins text-[10px] font-medium text-black sm:px-3.5 sm:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="relative z-10 mt-auto grid grid-cols-2 items-end gap-5 pt-7 sm:grid-cols-[1fr_auto] sm:pt-10">
          <div className="hidden max-w-md sm:block">
            <div className="h-px w-full bg-black/15" />
            <p className="mt-3 font-poppins text-[10px] uppercase tracking-[0.18em] text-black/40">
              Creative solutions built around your business
            </p>
          </div>
          <span className="inline-flex w-fit bg-[#211f1f] px-5 py-3 font-poppins text-xs font-semibold text-white sm:px-6 sm:py-3.5 sm:text-sm">
            Learn More
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const introRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(services.length - 1, Math.floor(latest * services.length));
    setActive(next);
  });

  return (
    <>
      {/* Existing creative introduction — intentionally preserved. */}
      <section
        ref={introRef}
        id="services-intro"
        aria-label="Services introduction"
        className="relative isolate overflow-hidden bg-[#f7f3ea] px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pb-14 lg:pt-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[38%] opacity-75"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.15) 1.15px, transparent 1.3px)",
            backgroundSize: "18px 18px",
            maskImage: "linear-gradient(90deg, black, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, black, transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[30%] opacity-50"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.11) 1px, transparent 1.2px)",
            backgroundSize: "20px 20px",
            maskImage: "linear-gradient(90deg, transparent, black)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black)",
          }}
        />

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
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.12 }}
                style={{ transformOrigin: "left" }}
                className="mt-5 h-[2px] w-full bg-[#08bdb8]"
              />
              <p className="mt-5 max-w-[720px] font-display text-[clamp(0.92rem,1.08vw,1.15rem)] leading-[1.42] tracking-[-0.018em] text-[#171919]">
                Digital Points is a creative and digital solutions company helping businesses create compelling content, build strong brands, and promote them through design, marketing, media, and technology.
              </p>
              <motion.a
                href="/portfolio"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 inline-flex bg-[#08bdb8] px-5 py-2.5 font-display text-[0.95rem] font-medium text-black hover:bg-[#211f1f] hover:text-white sm:px-6 sm:py-3"
              >
                View all our works
              </motion.a>
            </motion.div>

            <div className="relative mx-auto mt-8 h-[230px] w-full max-w-[520px] lg:mt-0 lg:h-[275px]">
              <motion.div
                initial={{ opacity: 0, y: 35, scale: 0.88, rotate: 13 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 9 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-[1%] top-[30%] z-10 flex h-[96px] w-[136px] items-start justify-start bg-[#211f1f] p-3.5 text-white shadow-[0_18px_35px_rgba(0,0,0,0.14)] sm:h-[108px] sm:w-[150px] lg:h-[125px] lg:w-[170px] lg:p-5"
              >
                <span className="font-display text-[0.72rem] tracking-[-0.035em] sm:text-[0.88rem] lg:text-[0.95rem]">CREATE</span>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-[#08bdb8]" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 35, scale: 0.88, rotate: -15 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: -10 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: 0.23, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-[4%] top-0 z-10 flex h-[86px] w-[124px] items-start justify-start bg-[#211f1f] p-3.5 text-white shadow-[0_18px_35px_rgba(0,0,0,0.14)] sm:h-[98px] sm:w-[138px] lg:h-[112px] lg:w-[150px] lg:p-5"
              >
                <span className="font-display text-[0.72rem] tracking-[-0.035em] sm:text-[0.88rem] lg:text-[0.95rem]">BRAND</span>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-[#08bdb8]" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 35, scale: 0.88, rotate: 12 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 8 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-[27%] z-10 flex h-[96px] w-[136px] items-start justify-start bg-[#211f1f] p-3.5 text-white shadow-[0_18px_35px_rgba(0,0,0,0.14)] sm:h-[108px] sm:w-[150px] lg:left-[38%] lg:h-[125px] lg:w-[170px] lg:p-5"
              >
                <span className="font-display text-[0.72rem] tracking-[-0.035em] sm:text-[0.88rem] lg:text-[0.95rem]">PROMOTE</span>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-[#08bdb8]" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pinned service showcase: the page stays here until all six cards are explored. */}
      <section
        ref={showcaseRef}
        id="services-showcase"
        aria-label="Our Services"
        className="relative bg-[#f7f3ea]"
        style={{ height: `${services.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden px-4 py-4 sm:px-7 sm:py-6 lg:px-10 lg:py-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.13) 1.1px, transparent 1.3px)",
              backgroundSize: "18px 18px",
              maskImage: "linear-gradient(90deg, black, transparent 45%, black)",
              WebkitMaskImage: "linear-gradient(90deg, black, transparent 45%, black)",
            }}
          />

          <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col">
            <div className="shrink-0 px-1 pt-2 sm:px-2 sm:pt-3">
              <p className="font-poppins text-[10px] font-medium uppercase tracking-[0.34em] text-[#08bdb8] sm:text-xs sm:tracking-[0.38em]">
                What We Do
              </p>
              <h2 className="mt-1.5 font-display text-[clamp(2.3rem,5vw,4.8rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-black sm:mt-2">
                Our Services
              </h2>
            </div>

            <div className="relative mt-4 min-h-0 flex-1 sm:mt-5 lg:mt-6">
              <div className="relative h-full w-full overflow-hidden rounded-[26px] sm:rounded-[32px] lg:rounded-[38px]">
                {services.map((service, index) => (
                  <ServiceCard key={service.title} service={service} index={index} progress={smoothProgress} />
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-5 px-1 pt-3 sm:px-2 sm:pt-4">
              <p className="font-poppins text-[9px] font-medium uppercase tracking-[0.18em] text-black/35 sm:text-[10px] sm:tracking-[0.22em]">
                Scroll to explore
              </p>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {services.map((service, index) => (
                  <motion.span
                    key={service.title}
                    animate={{ width: index === active ? 26 : 7, opacity: index === active ? 1 : 0.22 }}
                    transition={{ duration: 0.25 }}
                    className="block h-1.5 rounded-full bg-[#08bdb8]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
