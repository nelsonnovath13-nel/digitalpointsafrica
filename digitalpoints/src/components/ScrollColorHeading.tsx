import { useEffect, useRef, useState } from "react";

type ScrollColorHeadingProps = {
  text: string;
  className?: string;
};

const ACCENT = "#0eab8f";

export default function ScrollColorHeading({ text, className = "" }: ScrollColorHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      frameRef.current = null;

      const element = headingRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // The transition starts as the section rises into view and completes
      // after a short, controlled scroll distance. This keeps the effect
      // tied to the Hero -> Digital Points Way transition rather than the
      // whole page scroll.
      const start = viewportHeight * 0.9;
      const end = viewportHeight * 0.34;
      const raw = (start - rect.top) / (start - end);
      const next = Math.min(1, Math.max(0, raw));

      setProgress((current) => (Math.abs(current - next) > 0.01 ? next : current));
    };

    const requestUpdate = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateProgress);
      }
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const characters = Array.from(text);
  const total = characters.length;

  return (
    <h2 ref={headingRef} className={className} aria-label={text}>
      {characters.map((character, index) => {
        const threshold = total <= 1 ? 0 : index / (total - 1);
        const revealed = progress >= threshold;

        return (
          <span
            key={`${character}-${index}`}
            aria-hidden="true"
            style={{
              color: revealed ? ACCENT : "#000000",
              transition: "color 420ms cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: revealed ? `${Math.min(index * 16, 260)}ms` : "0ms",
            }}
          >
            {character === " " ? "\u00A0" : character}
          </span>
        );
      })}
    </h2>
  );
}
