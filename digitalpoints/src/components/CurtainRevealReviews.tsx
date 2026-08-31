import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const reviews = [
  {
    quote:
      "The quality and attention to detail made the whole process feel simple and professional from start to finish.",
    name: "Sample Customer",
    role: "Sample Review",
  },
  {
    quote:
      "Our branded materials looked consistent and polished. We were happy with both the communication and the final result.",
    name: "Sample Customer",
    role: "Sample Review",
  },
  {
    quote:
      "A smooth experience, thoughtful service, and work that gave our brand a stronger presence.",
    name: "Sample Customer",
    role: "Sample Review",
  },
];

const featuredService = {
  title: "Professional Wedding Coverage",
  subtitle: "Timeless Memories.",
  description:
    "We provide professional wedding coverage that captures every beautiful moment of your special day. From cinematic documentaries and photography to live streaming and aerial coverage, we combine creativity and modern technology to preserve your love story beautifully.",
};

export default function CurtainRevealReviews() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: curtainRef,
    offset: ["start end", "end start"],
  });

  // The card finishes appearing well before the curtain panels are gone, so
  // there's a long, generous stretch where the card is fully complete while
  // the side photos are still visibly there (not yet fully slid away).
  const leftX = useTransform(scrollYProgress, [0.12, 0.78], ["0%", "-115%"]);
  const rightX = useTransform(scrollYProgress, [0.12, 0.78], ["0%", "115%"]);
  const curtainOpacity = useTransform(scrollYProgress, [0.82, 0.94], [1, 0]);
  const featureOpacity = useTransform(scrollYProgress, [0.16, 0.34], [0, 1]);
  const featureScale = useTransform(scrollYProgress, [0.16, 0.34], [0.92, 1]);

  return (
    <section className="relative bg-cream-50" aria-label="Customer reviews">
      {/* Curtain reveal: opening the wedding photos uncovers exactly one featured card. */}
      <div ref={curtainRef} className="relative h-[150vh] overflow-clip">
        <div className="sticky top-0 flex h-[100svh] min-h-[420px] items-center justify-center overflow-hidden px-4 sm:px-6">
          <motion.article
            style={reducedMotion ? undefined : { opacity: featureOpacity, scale: featureScale }}
            className="group relative z-0 w-[min(90vw,480px)] overflow-hidden rounded-3xl bg-ink-950 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.28)] sm:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 100% at 100% 0%, rgba(8,189,184,0.35) 0%, transparent 55%)",
              }}
            />
            <span className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-point-500">
              <span className="h-1.5 w-1.5 rounded-full bg-point-500" />
              Featured Service
            </span>
            <h3 className="relative mt-6 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {featuredService.title}
            </h3>
            <p className="relative mt-2 font-display text-xl font-medium text-point-500">
              {featuredService.subtitle}
            </p>
            <p className="relative mt-5 text-base leading-7 text-white/75">
              {featuredService.description}
            </p>

            <div className="relative mt-7 inline-block">
              <Link
                to="/wedding-work"
                className="relative inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-point-500 px-5 py-3 text-sm font-semibold text-ink-950 shadow-[0_10px_30px_rgba(8,189,184,0.35)] transition-[clip-path,background-color] duration-[900ms] ease-out hover:bg-point-400 [clip-path:inset(0_0%_0_0)] sm:[clip-path:inset(0_100%_0_0)] sm:group-hover:[clip-path:inset(0_0%_0_0)]"
              >
                View Our Wedding Work
                <span aria-hidden="true">→</span>
              </Link>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 left-0 hidden -rotate-[18deg] text-xl opacity-0 transition-all duration-[900ms] ease-out sm:block sm:group-hover:left-[calc(100%-14px)] sm:group-hover:opacity-100"
              >
                ✏️
              </span>
            </div>
          </motion.article>

          <motion.div
            style={reducedMotion ? undefined : { x: leftX, opacity: curtainOpacity }}
            className="absolute inset-y-0 left-0 z-10 w-1/2 overflow-hidden rounded-r-3xl will-change-transform"
          >
            {/* Unsplash - free license, badilisha na picha halisi ya mteja ukipenda baadaye */}
            <img
              src="https://images.unsplash.com/photo-1529519195486-16945f0fb37f?fm=jpg&q=80&w=1200&auto=format&fit=crop"
              alt="Customer service experience"
              loading="lazy"
              className="block h-full w-full object-cover object-[center_42%] sm:object-center"
            />
            <div className="absolute inset-0 bg-ink-950/10" />
          </motion.div>

          <motion.div
            style={reducedMotion ? undefined : { x: rightX, opacity: curtainOpacity }}
            className="absolute inset-y-0 right-0 z-10 w-1/2 overflow-hidden rounded-l-3xl will-change-transform"
          >
            {/* Unsplash - free license, badilisha na picha halisi ya mteja ukipenda baadaye */}
            <img
              src="https://images.unsplash.com/photo-1606495186270-395860907235?fm=jpg&q=80&w=1200&auto=format&fit=crop"
              alt="Customer team experience"
              loading="lazy"
              className="block h-full w-full object-cover object-[center_38%] sm:object-center"
            />
            <div className="absolute inset-0 bg-ink-950/10" />
          </motion.div>
        </div>
      </div>

      {/* Reviews: independent, normal document flow — not pinned to the curtain's scroll stage. */}
      <motion.div
        initial={reducedMotion ? undefined : { opacity: 0, y: 32 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto w-full max-w-5xl overflow-hidden">
          <div className="mb-8 text-center">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
              Customer Reviews
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-950 sm:text-5xl">
              What people say about working with us
            </h2>
          </div>

          <motion.div
            animate={reducedMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
            transition={
              reducedMotion
                ? undefined
                : { duration: 28, ease: "linear", repeat: Infinity }
            }
            className="flex w-max gap-5"
          >
            {[...reviews, ...reviews].map((review, index) => (
              <article
                key={`${review.quote}-${index}`}
                className="w-[min(82vw,430px)] shrink-0 rounded-3xl border border-ink-950/8 bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-8"
              >
                <div className="text-point-600" aria-hidden="true">
                  ★★★★★
                </div>
                <blockquote className="mt-5 font-display text-xl leading-relaxed text-ink-950 sm:text-2xl">
                  “{review.quote}”
                </blockquote>
                <div className="mt-7">
                  <p className="font-medium text-ink-950">{review.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink-950/45">
                    {review.role}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
