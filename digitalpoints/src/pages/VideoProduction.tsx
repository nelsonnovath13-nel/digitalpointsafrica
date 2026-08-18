import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ReelLightbox, { type Reel } from "../components/ReelLightbox";

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

const sideTiles = [
  { pos: "left-[2%] top-[8%] h-40 w-32 sm:h-56 sm:w-44", tone: "linear-gradient(160deg,#0b6d5e,#0c1113)" },
  { pos: "left-[16%] top-[2%] h-32 w-40 sm:h-44 sm:w-56", tone: "linear-gradient(160deg,#0eab8f,#07090a)" },
  { pos: "right-[16%] top-[4%] h-36 w-36 sm:h-52 sm:w-52", tone: "linear-gradient(160deg,#4fdfc2,#0a1210)" },
  { pos: "right-[2%] top-[10%] h-40 w-32 sm:h-56 sm:w-44", tone: "linear-gradient(160deg,#0a8873,#07090a)" },
  { pos: "left-[8%] bottom-[6%] h-36 w-44 sm:h-48 sm:w-60", tone: "linear-gradient(160deg,#0d564b,#0c1113)" },
  { pos: "right-[8%] bottom-[6%] h-36 w-44 sm:h-48 sm:w-60", tone: "linear-gradient(160deg,#20cbab,#07090a)" },
];

function ScrollVideoHero({ onOpen }: { onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const centerScale = useTransform(scrollYProgress, [0, 0.55], [1, 7.5]);
  const centerRadius = useTransform(scrollYProgress, [0, 0.55], [24, 0]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const sideY = useTransform(scrollYProgress, [0, 0.35], [0, 60]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);

  return (
    <div ref={ref} className="relative h-[220vh] bg-ink-950">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 0%, #0d564b 0%, #07090a 60%)" }}
        />

        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute inset-x-0 top-[8%] z-10 mx-auto max-w-xl px-6 text-center"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-400">
            Video Production
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-5xl">
            Every frame, engineered to sell
          </h1>
          <p className="mt-4 text-sm text-white/50 sm:text-base">
            Keep scrolling — one film opens up from the middle of our reel.
          </p>
        </motion.div>

        {sideTiles.map((t, i) => (
          <motion.div
            key={i}
            style={{ opacity: sideOpacity, y: sideY, background: t.tone }}
            className={`absolute ${t.pos} rounded-2xl border border-white/10`}
          />
        ))}

        {/* Center tile — grows to fill the screen as the user scrolls */}
        <motion.div
          onClick={onOpen}
          style={{ scale: centerScale, borderRadius: centerRadius }}
          className="absolute left-1/2 top-1/2 h-40 w-56 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden border border-white/10 sm:h-56 sm:w-80"
        >
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            src={reels[0].src}
            poster={reels[0].poster}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-lg text-white backdrop-blur">
              ▶
            </span>
          </div>

          <motion.div
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent p-8 sm:p-14"
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-300">
              Featured Reel
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-4xl">
              {reels[0].title}
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/60">{reels[0].client} — click to watch.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const capabilities = [
  { title: "Brand & Promo Films", desc: "Short-form films built for WhatsApp and Instagram sharing." },
  { title: "Event & Tour Coverage", desc: "Safari, climb and event documentation, cut fast for social." },
  { title: "Product Photography", desc: "Clean, consistent shots for menus, catalogues and listings." },
  { title: "Aerial & Drone", desc: "Landscape and property footage for tourism and real estate." },
];

export default function VideoProduction() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <ScrollVideoHero onOpen={() => setLightboxIndex(0)} />

      <section className="bg-cream-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
            What's Included
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
            Built for how your audience actually watches
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-ink-950/5 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-ink-950">{c.title}</h3>
                <p className="mt-2 text-sm text-ink-950/55">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
              Recent Reels
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
              Watch the full cuts
            </h2>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {reels.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-video overflow-hidden rounded-2xl border border-ink-950/5 shadow-sm"
                >
                  <img
                    src={r.poster}
                    alt={r.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
                  <span className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition group-hover:scale-110 group-hover:bg-white/25">
                    ▶
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                    <p className="text-xs uppercase tracking-wide text-white/60">{r.client}</p>
                    <h3 className="font-display text-base font-semibold text-white">{r.title}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col items-start gap-4 rounded-3xl border border-point-400/30 bg-point-50 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold text-ink-950">
                Have a shoot in mind?
              </h3>
              <p className="mt-1 text-sm text-ink-950/55">
                Send us the brief on WhatsApp — we'll quote within the day.
              </p>
            </div>
            <a
              href="https://wa.me/255714214247"
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap rounded-full bg-point-500 px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-point-400"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <ReelLightbox
          reels={reels}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
