import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const production = {
  number: "02",
  title: "Give your ideas a voice.",
  src: "https://videos.pexels.com/video-files/1350205/1350205-hd_1920_1080_30fps.mp4",
  poster:
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1600&auto=format&fit=crop",
} as const;

export default function ScrollVideoReveal() {
  const stageRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nearViewport = useInView(stageRef, { margin: "50% 0px" });
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // One continuous scroll journey: compact entry, full-screen reveal, then exit.
  const scale = useTransform(
    scrollYProgress,
    [0, 0.32, 0.62, 1],
    [0.58, 1, 1, 0.62],
  );
  const radius = useTransform(
    scrollYProgress,
    [0, 0.32, 0.68, 1],
    [32, 0, 0, 32],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.32, 0.7, 1],
    [18, 0, 0, -26],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.82, 1],
    [0.9, 1, 1, 0.58],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.32, 0.7, 1],
    [0.3, 0, 0.08, 0.5],
  );

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (nearViewport) {
      void videoElement.play().catch(() => undefined);
    } else {
      videoElement.pause();
    }
  }, [nearViewport]);

  return (
    <section
      ref={stageRef}
      id="scroll-video-reveal"
      className="relative h-[300vh] w-full bg-[#07090a]"
      aria-label="Digital Points visual story"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{
            scale: reducedMotion ? 1 : scale,
            y: reducedMotion ? 0 : y,
            borderRadius: reducedMotion ? 0 : radius,
            opacity: reducedMotion ? 1 : opacity,
          }}
          className="relative h-full w-full overflow-hidden bg-[#151716] shadow-[0_28px_90px_rgba(0,0,0,0.38)] will-change-transform"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${production.poster})` }}
            aria-hidden="true"
          />

          <video
            ref={videoRef}
            src={production.src}
            poster={production.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            aria-label={production.title}
          />

          <motion.div
            style={{ opacity: reducedMotion ? 0.08 : overlayOpacity }}
            className="pointer-events-none absolute inset-0 bg-[#07090a]"
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-8 bg-gradient-to-t from-[#07090a]/80 via-[#07090a]/10 to-transparent px-6 pb-8 pt-24 text-white sm:px-10 sm:pb-10 lg:px-14 lg:pb-14">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#20cbab]">
                {production.number} — Digital Points
              </p>
              <h2 className="font-display text-3xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                {production.title}
              </h2>
            </div>
            <div className="hidden shrink-0 text-right sm:block">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                Digital Points
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/75">
                Production {production.number}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
