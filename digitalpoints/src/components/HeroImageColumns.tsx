// Reuses the same, already-verified image set that appears elsewhere on the
// site (StickyServices, WeddingWork, PrintingServices) so every thumbnail
// here is known to load and to represent real Digital Points work.
type Tile = { type: "image"; src: string; label: string } | { type: "brand" };

const columns: { items: Tile[]; direction: "up" | "down"; duration: number }[] = [
  {
    direction: "up",
    duration: 30,
    items: [
      { type: "image", src: "https://images.unsplash.com/photo-1529519195486-16945f0fb37f?q=80&w=600&auto=format&fit=crop", label: "Client Experience" },
      { type: "image", src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=600&auto=format&fit=crop", label: "Wedding Coverage" },
      { type: "brand" },
      { type: "image", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop", label: "Digital Marketing" },
    ],
  },
  {
    direction: "down",
    duration: 36,
    items: [
      { type: "image", src: "https://images.unsplash.com/photo-1606495186270-395860907235?q=80&w=600&auto=format&fit=crop", label: "Team Collaboration" },
      { type: "image", src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop", label: "Wedding Coverage" },
      { type: "brand" },
      { type: "image", src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=600&auto=format&fit=crop", label: "Web Design" },
    ],
  },
];

const aspects = ["1/1", "4/5", "5/4", "1/1"];

const mobileStripItems: Tile[] = [
  { type: "image", src: "https://images.unsplash.com/photo-1529519195486-16945f0fb37f?q=80&w=400&auto=format&fit=crop", label: "Client Experience" },
  { type: "image", src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=400&auto=format&fit=crop", label: "Wedding Coverage" },
  { type: "brand" },
  { type: "image", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", label: "Digital Marketing" },
  { type: "image", src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=400&auto=format&fit=crop", label: "Web Design" },
  { type: "image", src: "https://images.unsplash.com/photo-1606495186270-395860907235?q=80&w=400&auto=format&fit=crop", label: "Team Collaboration" },
];

function BrandTile() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#dff5f3] to-[#b7e8e4] p-6">
      <img src="/logo/dp-logo-colored.png" alt="Digital Points" className="h-auto w-[70%] object-contain" />
    </div>
  );
}

// Mobile gets its own, distinct treatment: a single horizontal auto-scrolling
// strip instead of tall vertical columns, since there isn't enough spare
// height on a phone screen for the desktop layout to work.
export function HeroImageStripMobile() {
  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className="hero-strip-track flex w-max gap-3 px-5">
        {[...mobileStripItems, ...mobileStripItems].map((tile, i) =>
          tile.type === "brand" ? (
            <div key={i} className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white/5">
              <BrandTile />
            </div>
          ) : (
            <button
              key={i}
              type="button"
              aria-label={tile.label}
              className="hero-tile relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white/5 text-left"
            >
              <img
                src={tile.src}
                alt={tile.label}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover"
                style={{ filter: "brightness(1.18) saturate(1.12)" }}
              />
              <span
                aria-hidden="true"
                className="hero-tile-scrim pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent"
              />
              <span
                aria-hidden="true"
                className="hero-tile-label pointer-events-none absolute inset-x-0 bottom-0 px-2 py-1.5 font-poppins text-[9px] font-semibold uppercase leading-tight tracking-[0.04em] text-white"
              >
                {tile.label}
              </span>
            </button>
          ),
        )}
      </div>

      <style>{`
        @keyframes hero-strip-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .hero-strip-track {
          animation: hero-strip-scroll 24s linear infinite;
        }
        .hero-tile-scrim {
          opacity: 0;
          transition: opacity 0.25s ease-out;
        }
        .hero-tile-label {
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease-out;
        }
        @keyframes hero-tile-shake {
          0%, 100% { transform: rotate(0deg) scale(1); }
          20% { transform: rotate(-2.5deg) scale(1.03); }
          40% { transform: rotate(2deg) scale(1.03); }
          60% { transform: rotate(-1.5deg) scale(1.02); }
          80% { transform: rotate(1deg) scale(1.01); }
        }
        .hero-tile:active,
        .hero-tile:focus-visible {
          animation: hero-tile-shake 0.45s ease-in-out;
        }
        .hero-tile:active .hero-tile-scrim,
        .hero-tile:focus-visible .hero-tile-scrim {
          opacity: 1;
        }
        .hero-tile:active .hero-tile-label,
        .hero-tile:focus-visible .hero-tile-label {
          transform: translateY(0);
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-strip-track, .hero-tile:active, .hero-tile:focus-visible {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function HeroImageColumns() {
  return (
    <div
      className="relative ml-auto mr-0 grid h-full max-w-[510px] grid-cols-2 gap-3.5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
    >
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="pointer-events-none relative h-full overflow-hidden">
          <div
            className={`flex flex-col gap-3 ${column.direction === "up" ? "hero-col-up" : "hero-col-down"}`}
            style={{ animationDuration: `${column.duration}s` }}
          >
            {[...column.items, ...column.items].map((tile, i) =>
              tile.type === "brand" ? (
                <div
                  key={i}
                  className="w-full shrink-0 overflow-hidden rounded-2xl bg-white/5"
                  style={{ aspectRatio: aspects[i % aspects.length] }}
                >
                  <BrandTile />
                </div>
              ) : (
                <button
                  key={i}
                  type="button"
                  aria-label={tile.label}
                  className="hero-tile pointer-events-auto relative w-full shrink-0 overflow-hidden rounded-2xl bg-white/5 text-left"
                  style={{ aspectRatio: aspects[i % aspects.length] }}
                >
                  <img
                    src={tile.src}
                    alt={tile.label}
                    loading={colIndex === 0 && i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover"
                    style={{ filter: "brightness(1.18) saturate(1.12)" }}
                  />
                  <span
                    aria-hidden="true"
                    className="hero-tile-scrim pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent"
                  />
                  <span
                    aria-hidden="true"
                    className="hero-tile-label pointer-events-none absolute inset-x-0 bottom-0 px-3 py-2.5 font-poppins text-[12px] font-semibold uppercase tracking-[0.06em] text-white"
                  >
                    {tile.label}
                  </span>
                </button>
              ),
            )}
          </div>
        </div>
      ))}

      <style>{`
        @keyframes hero-col-up {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(0, -50%, 0); }
        }
        @keyframes hero-col-down {
          from { transform: translate3d(0, -50%, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        .hero-col-up {
          animation-name: hero-col-up;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .hero-col-down {
          animation-name: hero-col-down;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes hero-tile-shake {
          0%, 100% { transform: rotate(0deg) scale(1); }
          20% { transform: rotate(-2.5deg) scale(1.03); }
          40% { transform: rotate(2deg) scale(1.03); }
          60% { transform: rotate(-1.5deg) scale(1.02); }
          80% { transform: rotate(1deg) scale(1.01); }
        }
        .hero-tile-scrim {
          opacity: 0;
          transition: opacity 0.25s ease-out;
        }
        .hero-tile-label {
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease-out;
        }
        .hero-tile:active,
        .hero-tile:focus-visible {
          animation: hero-tile-shake 0.45s ease-in-out;
        }
        .hero-tile:active .hero-tile-scrim,
        .hero-tile:focus-visible .hero-tile-scrim {
          opacity: 1;
        }
        .hero-tile:active .hero-tile-label,
        .hero-tile:focus-visible .hero-tile-label {
          transform: translateY(0);
          opacity: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-col-up, .hero-col-down, .hero-tile:active, .hero-tile:focus-visible {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
