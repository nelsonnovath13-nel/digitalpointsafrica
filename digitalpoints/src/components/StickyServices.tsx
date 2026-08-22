import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

const services = [
  {
    number: "01",
    name: "Digital Marketing",
    description:
      "Build reach, attract the right audience, and turn digital attention into measurable business growth.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    href: "/services",
  },
  {
    number: "02",
    name: "Video Production",
    description:
      "Tell your story through purposeful video content designed to communicate clearly and leave a lasting impression.",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=1600&auto=format&fit=crop",
    href: "/video-production",
  },
  {
    number: "03",
    name: "Graphic Design",
    description:
      "Create strong visual communication that gives your business a clear, consistent, and memorable identity.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1600&auto=format&fit=crop",
    href: "/services",
  },
  {
    number: "04",
    name: "Social Media Management",
    description:
      "Plan, publish, and manage consistent social content that keeps your brand active, relevant, and connected to its audience.",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1600&auto=format&fit=crop",
    href: "/services",
  },
] as const;

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const entranceY = useTransform(scrollYProgress, [0, 0.7, 1], [96, 20, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55, 0.9], [0, 0.7, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const veilY = useTransform(scrollYProgress, [0.08, 0.82], ["-115%", "115%"]);
  const veilOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.2, 0.65, 0.86],
    [0, 0.92, 0.72, 0],
  );

  return (
    <article
      ref={cardRef}
      className="relative h-screen w-full max-md:h-[100svh] max-md:min-h-[100svh]"
      style={{ zIndex: index + 1 }}
      aria-labelledby={`digital-points-service-${service.number}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#07090a] max-md:relative max-md:h-[100svh]">
        <motion.img
          src={service.image}
          alt=""
          aria-hidden="true"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={reduceMotion ? undefined : { scale: imageScale }}
        />

        <div className="absolute inset-0 bg-[#050b1f]/62" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050b1f]/90 via-[#050b1f]/55 to-[#050b1f]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b1f]/75 via-transparent to-[#050b1f]/25" />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 border-y border-white/15 bg-white/[0.08] backdrop-blur-md"
          style={reduceMotion ? { opacity: 0 } : { y: veilY, opacity: veilOpacity }}
        >
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#08bdb8]/80 to-transparent" />
          <div className="absolute inset-x-[18%] top-0 h-px bg-white/25" />
        </motion.div>

        <motion.div
          className="relative z-10 flex h-full items-end px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-20"
          style={reduceMotion ? undefined : { y: entranceY, opacity: contentOpacity }}
        >
          <div className="w-full max-w-6xl">
            <div className="max-w-4xl">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-[#08bdb8] sm:text-sm">
                {service.number} — {service.name}
              </p>
              <h2
                id={`digital-points-service-${service.number}`}
                className="font-display text-[clamp(3.2rem,8vw,8rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white"
              >
                {service.name}
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                {service.description}
              </p>
              <Link
                to={service.href}
                className="mt-8 inline-flex items-center gap-3 bg-[#201e1f] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#08bdb8] hover:text-[#07090a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08bdb8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090a]"
              >
                Explore {service.name}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-7 right-6 z-30 flex items-center gap-3 sm:right-10">
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 sm:inline">
            Services
          </span>
          <span className="text-sm font-semibold tabular-nums text-white">
            {service.number} <span className="text-white/30">/ 04</span>
          </span>
        </div>
      </div>
    </article>
  );
}

export default function StickyServices() {
  return (
    <section
      id="homepage-services"
      className="relative w-full bg-[#050b1f]"
      aria-label="Digital Points services"
    >
      {services.map((service, index) => (
        <ServiceCard key={service.number} service={service} index={index} />
      ))}
    </section>
  );
}
