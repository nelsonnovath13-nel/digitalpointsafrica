import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const videos = [
  {
    number: "01",
    title: "Make the story move.",
    src: "https://videos.pexels.com/video-files/7989439/7989439-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "Give your ideas a voice.",
    src: "https://videos.pexels.com/video-files/1350205/1350205-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "03",
    title: "Turn attention into momentum.",
    src: "https://videos.pexels.com/video-files/853988/853988-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  },
] as const;

function VideoStage({ video }: { video: (typeof videos)[number] }) {
  const stageRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nearViewport = useInView(stageRef, { margin: "50% 0px" });
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.24, 0.48, 0.72, 1],
    [0.46, 0.78, 1, 0.82, 0.46],
  );
  const radius = useTransform(
    scrollYProgress,
    [0, 0.32, 0.52, 0.72, 1],
    [32, 22, 0, 18, 32],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.76, 0.96, 1],
    [0.82, 1, 1, 0.86, 0],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.55, 0.82, 1],
    [0.28, 0.08, 0, 0.16, 0.58],
  );

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !nearViewport) return;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (reducedMotion) {
        void videoElement.play().catch(() => undefined);
        return;
      }

      if (progress > 0.08 && progress < 0.88) {
        void videoElement.play().catch(() => undefined);
      } else {
        videoElement.pause();
      }
    });

    return () => {
      unsubscribe();
      videoElement.pause();
    };
  }, [nearViewport, reducedMotion, scrollYProgress]);

  return (
    <section
      ref={stageRef}
      className="relative h-[300vh] w-full bg-[#07090a]"
      aria-label={`Video reveal ${video.number}`}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-8">
        <motion.div
          style={{
            scale: reducedMotion ? 1 : scale,
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

          {nearViewport && (
            <video
              ref={videoRef}
              src={video.src}
              poster={video.poster}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              aria-label={video.title}
            />
          )}

          <motion.div
            style={{ opacity: reducedMotion ? 0.08 : overlayOpacity }}
            className="pointer-events-none absolute inset-0 bg-[#07090a]"
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-8 bg-gradient-to-t from-[#07090a]/80 via-[#07090a]/10 to-transparent px-6 pb-8 pt-24 text-white sm:px-10 sm:pb-10 lg:px-14 lg:pb-14">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#20cbab]">
                {video.number} — Digital Points
              </p>
              <h2 className="font-display text-3xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                {video.title}
              </h2>
            </div>
            <span className="hidden shrink-0 text-xs uppercase tracking-[0.2em] text-white/55 sm:block">
              Scroll to reveal
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ScrollVideoReveal() {
  return (
    <section
      id="scroll-video-reveal"
      className="relative w-full bg-[#07090a]"
      aria-label="Digital Points visual stories"
    >
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-px w-full bg-[#20cbab]/20" />
      {videos.map((video) => (
        <VideoStage key={video.number} video={video} />
      ))}
    </section>
  );
}
