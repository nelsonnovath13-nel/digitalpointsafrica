import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Wedding gallery content lives here as a plain array — add a new photo or
 * video by adding one more object below, no other code changes needed.
 */
type WeddingMediaItem =
  | { type: "image"; src: string; caption?: string }
  | { type: "video"; src: string; poster: string; caption?: string };

const weddingMedia: WeddingMediaItem[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",
    caption: "First look",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1400&auto=format&fit=crop",
    caption: "The ceremony",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1400&auto=format&fit=crop",
    caption: "Rings",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1400&auto=format&fit=crop",
    caption: "Golden hour",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1400&auto=format&fit=crop",
    caption: "The reception",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1400&auto=format&fit=crop",
    caption: "Celebration",
  },
];

function MediaTile({ item, onOpen }: { item: WeddingMediaItem; onOpen: () => void }) {
  const thumbnail = item.type === "image" ? item.src : item.poster;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative mb-4 block w-full overflow-hidden rounded-2xl bg-ink-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-point-500"
    >
      <img
        src={thumbnail}
        alt={item.caption ?? "Wedding photography by Digital Points"}
        loading="lazy"
        decoding="async"
        className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {item.type === "video" && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-ink-950 shadow-lg transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor">
              <path d="M8 5v14l11-7Z" />
            </svg>
          </span>
        </span>
      )}

      {item.caption && (
        <span className="pointer-events-none absolute bottom-3 left-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {item.caption}
        </span>
      )}
    </button>
  );
}

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: WeddingMediaItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-md sm:p-8"
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

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous"
        className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur transition hover:bg-white/20 sm:left-6"
      >
        ‹
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next"
        className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur transition hover:bg-white/20 sm:right-6"
      >
        ›
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85svh] w-full max-w-4xl"
      >
        {item.type === "image" ? (
          <img
            src={item.src}
            alt={item.caption ?? ""}
            className="max-h-[80svh] w-full rounded-2xl object-contain"
          />
        ) : (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="max-h-[80svh] w-full rounded-2xl bg-black object-contain"
          />
        )}
        {item.caption && (
          <p className="mt-4 text-center text-sm text-white/70">{item.caption}</p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function WeddingWork() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-cream-50 pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          Wedding Coverage
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">
          Timeless Memories
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-950/60">
          A look at the love stories we&apos;ve had the honor of capturing — from cinematic
          documentaries and photography to live streaming and aerial coverage.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-6xl columns-1 gap-4 px-6 sm:columns-2 lg:columns-3">
        {weddingMedia.map((item, index) => (
          <MediaTile key={index} item={item} onOpen={() => setActiveIndex(index)} />
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            item={weddingMedia[activeIndex]}
            onClose={() => setActiveIndex(null)}
            onPrev={() =>
              setActiveIndex((i) => (i === null ? null : (i - 1 + weddingMedia.length) % weddingMedia.length))
            }
            onNext={() => setActiveIndex((i) => (i === null ? null : (i + 1) % weddingMedia.length))}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
