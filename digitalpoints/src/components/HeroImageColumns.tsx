// Reuses the same, already-verified image set that appears elsewhere on the
// site (StickyServices, WeddingWork, PrintingServices) so every thumbnail
// here is known to load and to represent real Digital Points work.
type Tile = { type: "image"; src: string } | { type: "brand" };

const columns: { items: Tile[]; direction: "up" | "down"; duration: number }[] = [
  {
    direction: "up",
    duration: 32,
    items: [
      { type: "image", src: "https://images.unsplash.com/photo-1529519195486-16945f0fb37f?q=80&w=700&auto=format&fit=crop" }, // Client experience
      { type: "image", src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=700&auto=format&fit=crop" }, // Wedding — golden hour
      { type: "brand" },
      { type: "image", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=700&auto=format&fit=crop" }, // Digital Marketing
    ],
  },
  {
    direction: "down",
    duration: 38,
    items: [
      { type: "image", src: "https://images.unsplash.com/photo-1606495186270-395860907235?q=80&w=700&auto=format&fit=crop" }, // Team collaboration
      { type: "image", src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=700&auto=format&fit=crop" }, // Wedding — reception
      { type: "image", src: "https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg?auto=compress&cs=tinysrgb&w=700" }, // Large Format Printing
      { type: "brand" },
    ],
  },
  {
    direction: "up",
    duration: 34,
    items: [
      { type: "brand" },
      { type: "image", src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=700&auto=format&fit=crop" }, // Web Design
      { type: "image", src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=700&auto=format&fit=crop" }, // Wedding — first look
      { type: "image", src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=700&auto=format&fit=crop" }, // Social Media Management
    ],
  },
];

const aspects = ["4/5", "1/1", "4/5", "3/4"];

function BrandTile() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#dff5f3] to-[#b7e8e4] p-6">
      <img src="/logo/dp-logo-colored.png" alt="" className="h-auto w-[70%] object-contain" />
    </div>
  );
}

export default function HeroImageColumns() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative grid h-full grid-cols-3 gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
    >
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="relative h-full overflow-hidden">
          <div
            className={`flex flex-col gap-4 ${column.direction === "up" ? "hero-col-up" : "hero-col-down"}`}
            style={{ animationDuration: `${column.duration}s` }}
          >
            {[...column.items, ...column.items].map((tile, i) => (
              <div
                key={i}
                className="w-full shrink-0 overflow-hidden rounded-2xl bg-white/5"
                style={{ aspectRatio: aspects[i % aspects.length] }}
              >
                {tile.type === "brand" ? (
                  <BrandTile />
                ) : (
                  <img
                    src={tile.src}
                    alt=""
                    loading={colIndex === 0 && i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover"
                    style={{ filter: "brightness(1.18) saturate(1.12)" }}
                  />
                )}
              </div>
            ))}
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
        @media (prefers-reduced-motion: reduce) {
          .hero-col-up, .hero-col-down {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
