import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
};

export default function SectionReveal({ children }: SectionRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.72, 1], [34, 10, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.72, 1], [0.985, 0.995, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [0.7, 0.92, 1]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.62, 1], ["5px", "1px", "0px"]);
  const veilY = useTransform(scrollYProgress, [0, 0.58, 1], [0, -48, -118]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.82, 0.28, 0]);
  const veilScale = useTransform(scrollYProgress, [0, 0.58, 1], [1.08, 1, 0.92]);
  const glowY = useTransform(scrollYProgress, [0, 1], [28, -35]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.42, 0.18, 0]);

  const motionStyle = shouldReduceMotion
    ? undefined
    : {
        y: contentY,
        scale: contentScale,
        opacity: contentOpacity,
        filter: contentBlur,
      };

  return (
    <div ref={sectionRef} className="relative isolate overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-10%] top-[-12px] z-30 h-[150px] rounded-[0_0_50%_50%]"
        style={shouldReduceMotion ? { opacity: 0 } : { y: veilY, opacity: veilOpacity, scale: veilScale }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(65%_100%_at_50%_0%,rgba(0,199,195,0.34)_0%,rgba(0,199,195,0.12)_38%,rgba(247,243,234,0)_76%)]" />
        <div className="absolute inset-x-[12%] top-0 h-[2px] bg-gradient-to-r from-transparent via-[#08bdb8]/50 to-transparent" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-28px] z-20 h-[170px] w-[58%] -translate-x-1/2 rounded-full bg-[#08bdb8]/10 blur-[55px]"
        style={shouldReduceMotion ? { opacity: 0 } : { y: glowY, opacity: glowOpacity }}
      />

      <motion.div style={motionStyle}>
        {children}
      </motion.div>
    </div>
  );
}
