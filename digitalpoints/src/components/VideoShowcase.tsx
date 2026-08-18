import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReelLightbox, { type Reel } from "./ReelLightbox";

const reels: Reel[] = [
  {
    id: "aerial-1",
    title: "Aerial Drone Reel",
    client: "Field & community coverage — Kilimanjaro region",
    src: "/media/reels/aerial-drone-1.mp4",
    poster: "/media/reels/aerial-drone-1-poster.jpg",
  },
  {
    id: "documentary",
    title: "Documentary Interview Reel",
    client: "Field documentary production",
    src: "/media/reels/documentary-interview.mp4",
    poster: "/media/reels/documentary-interview-poster.jpg",
  },
  {
    id: "aerial-2",
    title: "Event & Community Aerial Coverage",
    client: "Government & NGO events — Tanzania",
    src: "/media/reels/aerial-drone-2.mp4",
    poster: "/media/reels/aerial-drone-2-poster.jpg",
  },
];

export default function VideoShowcase() {
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (lightboxIndex !== null) return;
    timer.current = setInterval(() => {
      setActive((i) => (i + 1) % reels.length);
    }, 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [lightboxIndex]);

  const current = reels[active];

  return (
    <section id="work" className="relative bg-cream-50 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
            Featured Work
          </span>
          <h2 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
            One reel, every story
          </h2>
          <p className="max-w-md text-sm text-ink-950/50">
            Click a reel to watch it full-screen.
          </p>
        </div>

        <motion.div
          onClick={() => setLightboxIndex(active)}
          className="group relative h-[420px] w-full cursor-pointer overflow-hidden rounded-3xl border border-ink-950/5 shadow-xl sm:h-[520px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <video
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                src={current.src}
                poster={current.poster}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" />

              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-lg text-white backdrop-blur transition group-hover:scale-110 group-hover:bg-white/25">
                    ▶
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/60">{current.client}</p>
                    <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                      {current.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 right-8 z-10 flex gap-2">
            {reels.map((r, i) => (
              <button
                key={r.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-8 bg-white" : "w-3 bg-white/30"
                }`}
                aria-label={`Show ${r.title}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {lightboxIndex !== null && (
        <ReelLightbox
          reels={reels}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
