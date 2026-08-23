import { useEffect, useRef } from "react";

const DESKTOP_MEDIA = "(min-width: 768px)";
// 650vh → 400vh is a 38.5% reduction in desktop scroll distance.
const OPTIMIZED_DESKTOP_SCROLL_HEIGHT = "400vh";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Keeps the existing service transition untouched while:
 * - shortening only the desktop scroll travel into/through the service journey
 * - showing an independent, scroll-linked progress indicator
 */
export default function ServicesProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const section = document.getElementById("homepage-services");
    const bar = barRef.current;
    const fill = fillRef.current;
    if (!section || !bar || !fill) return;

    const media = window.matchMedia(DESKTOP_MEDIA);

    const applyScrollHeight = () => {
      if (media.matches) {
        section.style.height = OPTIMIZED_DESKTOP_SCROLL_HEIGHT;
      } else {
        section.style.removeProperty("height");
      }
    };

    const update = () => {
      frameRef.current = null;
      const rect = section.getBoundingClientRect();
      const active = rect.top < window.innerHeight && rect.bottom > 0;
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / travel, 0, 1);

      bar.style.opacity = active ? "1" : "0";
      bar.style.pointerEvents = "none";
      fill.style.transform = `scaleX(${progress})`;
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    const onChange = () => {
      // Run after React's responsive update so the optimized height remains applied.
      window.requestAnimationFrame(() => {
        applyScrollHeight();
        requestUpdate();
      });
    };

    applyScrollHeight();
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    media.addEventListener("change", onChange);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", onChange);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      section.style.removeProperty("height");
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] h-[3px] bg-transparent opacity-0 transition-opacity duration-200"
      style={{ willChange: "opacity" }}
    >
      <div
        ref={fillRef}
        className="h-full w-full origin-left bg-[#20cbab]"
        style={{ transform: "scaleX(0)", willChange: "transform" }}
      />
    </div>
  );
}
