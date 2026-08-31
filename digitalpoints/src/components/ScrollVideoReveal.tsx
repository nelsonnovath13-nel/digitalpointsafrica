import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const video = {
  src: "/media/video/video-production.mp4",
  poster: "/media/video/video-production-poster.jpg",
};

export default function ScrollVideoReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(sectionRef, { margin: "25% 0px" });

  // Tracks the card's whole visible lifetime (from the moment it starts
  // entering from below to the moment it's fully scrolled past), not just
  // the pinned window — so it finishes entering well before it locks into
  // place instead of sitting dark/unformed through the entire approach.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.42, 0.75, 1],
    [0.62, 1, 1, 0.62],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.42, 0.75, 1],
    [36, 0, 0, -110],
  );
  const radius = useTransform(
    scrollYProgress,
    [0, 0.45, 0.75, 1],
    [32, 0, 0, 40],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.75, 1],
    [0.9, 1, 1, 0],
  );

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !inView) return;

    void element.play().catch(() => undefined);

    // Occasionally the initial load stalls (no data ever arrives even
    // though the request fired) rather than erroring out cleanly. If
    // nothing has loaded after a few seconds, force a fresh load/play.
    const stallTimer = window.setTimeout(() => {
      if (element.readyState === 0) {
        element.load();
        void element.play().catch(() => undefined);
      }
    }, 4000);

    return () => {
      window.clearTimeout(stallTimer);
      element.pause();
    };
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="scroll-video-reveal"
      className="relative h-[190vh] w-full bg-[#07090a]"
      aria-label="Digital Points video reveal"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-8">
        <motion.div
          style={{
            scale: reducedMotion ? 1 : scale,
            y: reducedMotion ? 0 : y,
            borderRadius: reducedMotion ? 0 : radius,
            opacity: reducedMotion ? 1 : opacity,
          }}
          className="relative h-full w-full max-w-[1600px] overflow-hidden bg-[#151716] shadow-[0_28px_90px_rgba(0,0,0,0.38)] will-change-transform"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${video.poster})` }}
            aria-hidden="true"
          />

          {inView && (
            <video
              ref={videoRef}
              src={video.src}
              poster={video.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
              aria-label="Digital Points visual story"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
