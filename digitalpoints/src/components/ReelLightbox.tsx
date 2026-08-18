import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Reel = {
  id: string;
  title: string;
  client: string;
  src: string;
  poster: string;
};

export default function ReelLightbox({
  reels,
  index,
  onClose,
  onNavigate,
}: {
  reels: Reel[];
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const current = reels[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % reels.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + reels.length) % reels.length);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, reels.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950/95 p-4 backdrop-blur-md sm:p-8"
        onClick={onClose}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-lg text-white backdrop-blur transition hover:bg-white/20 sm:right-8 sm:top-8"
        >
          ✕
        </button>

        {reels.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((index - 1 + reels.length) % reels.length);
              }}
              aria-label="Previous reel"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur transition hover:bg-white/20 sm:left-6"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((index + 1) % reels.length);
              }}
              aria-label="Next reel"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur transition hover:bg-white/20 sm:right-6"
            >
              ›
            </button>
          </>
        )}

        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl"
        >
          <video
            key={current.src}
            src={current.src}
            poster={current.poster}
            controls
            autoPlay
            playsInline
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            className="max-h-[70svh] w-full rounded-2xl bg-black object-contain shadow-2xl"
          />
          <div className="mt-4 flex items-center justify-between gap-4 px-1">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/50">{current.client}</p>
              <h3 className="font-display text-lg font-semibold text-white sm:text-xl">{current.title}</h3>
            </div>
            {reels.length > 1 && (
              <p className="whitespace-nowrap text-xs text-white/40">
                {index + 1} / {reels.length}
              </p>
            )}
          </div>
        </motion.div>

        {reels.length > 1 && (
          <div
            className="mt-6 flex max-w-full gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {reels.map((r, i) => (
              <button
                key={r.id}
                onClick={() => onNavigate(i)}
                className={`relative h-14 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  i === index ? "border-point-400" : "border-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={r.poster} alt={r.title} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
