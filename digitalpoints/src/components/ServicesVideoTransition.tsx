import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function ServicesVideoTransition() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const curtainY = useTransform(
    scrollYProgress,
    [0, 0.38, 0.68, 1],
    ["100%", "0%", "-8%", "-18%"],
  );
  const curtainOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.58, 0.9, 1],
    [0, 0.9, 0.72, 0.22, 0],
  );
  const depthOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    [0.45, 0.16, 0.08, 0],
  );
  const depthY = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    ["10%", "0%", "-6%"],
  );

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="relative h-[18vh] min-h-[110px] w-full overflow-hidden bg-[#07090a]"
    >
      <motion.div
        style={{
          y: reducedMotion ? "0%" : curtainY,
          opacity: reducedMotion ? 0 : curtainOpacity,
        }}
        className="absolute inset-0 origin-bottom bg-[#07090a] will-change-transform"
      />

      <motion.div
        style={{
          y: reducedMotion ? "0%" : depthY,
          opacity: reducedMotion ? 0 : depthOpacity,
        }}
        className="absolute inset-x-0 bottom-0 h-[140%] bg-[#0b1513] will-change-transform"
      />

      <motion.div
        style={{
          opacity: reducedMotion ? 0 : depthOpacity,
          scaleX: reducedMotion ? 1 : 0.72,
        }}
        className="absolute bottom-0 left-1/2 h-px w-[min(72vw,720px)] -translate-x-1/2 origin-center bg-[#20cbab]/35 will-change-transform"
      />
    </section>
  );
}
