import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const video = {
  src: "https://videos.pexels.com/video-files/7989439/7989439-hd_1920_1080_25fps.mp4",
  poster:
    "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=1600&auto=format&fit=crop",
};

export default function ScrollVideoReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(sectionRef, { margin: "25% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // One continuous, bidirectional scroll journey: compact → full viewport → quick exit.
  // The exit is deliberately short so the card slides fully away instead of
  // lingering invisible on screen while the section keeps scrolling.
  const scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.58, 0.9, 1],
    [0.62, 1, 1, 0.9, 0.62],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.22, 0.58, 1],
    [36, 0, 0, -110],
  );
  const radius = useTransform(
    scrollYProgress,
    [0, 0.24, 0.58, 0.9, 1],
    [32, 0, 0, 24, 40],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.9, 1],
    [0.9, 1, 1, 0],
  );

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !inView) return;

    void element.play().catch(() => undefined);

    return () => {
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
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              aria-label="Digital Points visual story"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
