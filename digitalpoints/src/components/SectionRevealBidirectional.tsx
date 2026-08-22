import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type SectionRevealBidirectionalProps = {
  children: ReactNode;
};

export default function SectionRevealBidirectional({ children }: SectionRevealBidirectionalProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });

  const contentY = useTransform(scrollYProgress, [0, 0.72, 1], [34, 10, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.72, 1], [0.985, 0.995, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [0.7, 0.92, 1]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.62, 1], ["5px", "1px", "0px"]);
  const veilY = useTransform(scrollYProgress, [0, 0.58, 1], [0, -48, -118]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.82, 0.28, 0]);
  const veilScale = useTransform(scrollYProgress, [0, 0.58, 1], [1.08, 1, 0.92]);
  const glowY = useTransform(scrollYProgress, [0, 1], [28, -35]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.42, 0.18, 0]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const root = sectionRef.current;
    if (!root) return;

    const headings = Array.from(root.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6"));
    const heading = headings.find((element) =>
      element.textContent?.replace(/\s+/g, " ").trim().toLowerCase().includes("the digital points way"),
    );

    if (!heading) return;

    const originalTransform = heading.style.transform;
    const originalColor = heading.style.color;
    const originalOpacity = heading.style.opacity;
    const originalWillChange = heading.style.willChange;
    const originalTransformOrigin = heading.style.transformOrigin;

    heading.style.willChange = "transform, color, opacity";
    heading.style.transformOrigin = "left center";

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const clamped = Math.max(0, Math.min(1, progress));
      const rise = 34 * (1 - clamped);
      const scale = 0.965 + clamped * 0.035;
      const opacity = 0.72 + clamped * 0.28;
      const r = Math.round(8 * (1 - clamped) + 20 * clamped);
      const g = Math.round(189 * (1 - clamped) + 20 * clamped);
      const b = Math.round(184 * (1 - clamped) + 20 * clamped);

      heading.style.transform = `translate3d(0, ${rise}px, 0) scale(${scale})`;
      heading.style.opacity = String(opacity);
      heading.style.color = `rgb(${r}, ${g}, ${b})`;
    });

    return () => {
      unsubscribe();
      heading.style.transform = originalTransform;
      heading.style.color = originalColor;
      heading.style.opacity = originalOpacity;
      heading.style.willChange = originalWillChange;
      heading.style.transformOrigin = originalTransformOrigin;
    };
  }, [scrollYProgress, shouldReduceMotion]);

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

      <motion.div
        style={shouldReduceMotion ? undefined : { y: contentY, scale: contentScale, opacity: contentOpacity, filter: contentBlur }}
      >
        {children}
      </motion.div>
    </div>
  );
}
