import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

export default function CurtainRevealReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0.12, 0.44, 0.7], ["0%", "-38%", "-110%"]);
  const rightX = useTransform(scrollYProgress, [0.12, 0.44, 0.7], ["0%", "38%", "110%"]);
  const curtainOpacity = useTransform(scrollYProgress, [0.68, 0.78], [1, 0]);
  const reviewsOpacity = useTransform(scrollYProgress, [0.48, 0.66, 0.78], [0, 0.9, 1]);
  const reviewsY = useTransform(scrollYProgress, [0.48, 0.66], [24, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[210vh] overflow-clip bg-cream-50 sm:h-[190vh]"
      aria-label="Customer reviews"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ opacity: reviewsOpacity, y: reviewsY }}
          className="pointer-events-auto absolute inset-0 z-0 flex items-center justify-center px-4 sm:px-6"
        >
          <div className="w-full max-w-5xl overflow-hidden py-10 sm:py-12">
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

        <motion.div
          style={reducedMotion ? undefined : { x: leftX, opacity: curtainOpacity }}
          className="absolute left-0 top-1/2 z-10 h-[52vh] w-1/2 -translate-y-1/2 overflow-hidden rounded-r-3xl will-change-transform sm:h-[74vh]"
        >
          {/* Unsplash - free license, badilisha na picha halisi ya mteja ukipenda baadaye */}
          <img
            src="https://images.unsplash.com/photo-1529519195486-16945f0fb37f?fm=jpg&q=80&w=1200&auto=format&fit=crop"
            alt="Customer service experience"
            loading="lazy"
            className="h-full w-full object-cover object-[center_42%] sm:object-center"
          />
          <div className="absolute inset-0 bg-ink-950/10" />
        </motion.div>

        <motion.div
          style={reducedMotion ? undefined : { x: rightX, opacity: curtainOpacity }}
          className="absolute right-0 top-1/2 z-10 h-[52vh] w-1/2 -translate-y-1/2 overflow-hidden rounded-l-3xl will-change-transform sm:h-[74vh]"
        >
          {/* Unsplash - free license, badilisha na picha halisi ya mteja ukipenda baadaye */}
          <img
            src="https://images.unsplash.com/photo-1606495186270-395860907235?fm=jpg&q=80&w=1200&auto=format&fit=crop"
            alt="Customer team experience"
            loading="lazy"
            className="h-full w-full object-cover object-[center_38%] sm:object-center"
          />
          <div className="absolute inset-0 bg-ink-950/10" />
        </motion.div>
      </div>
    </section>
  );
}
