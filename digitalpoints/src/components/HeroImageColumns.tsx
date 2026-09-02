// Reuses the same, already-verified image set that appears elsewhere on the
// site (StickyServices, WeddingWork, PrintingServices) so every thumbnail
// here is known to load and to represent real Digital Points work.
const columns: { images: string[]; direction: "up" | "down"; duration: number }[] = [
  {
    direction: "up",
    duration: 34,
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop", // Graphic Design
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop", // Digital Marketing
      "https://images.pexels.com/photos/37332553/pexels-photo-37332553.jpeg?auto=compress&cs=tinysrgb&w=600", // Digital Printing
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop", // Wedding — first look
    ],
  },
  {
    direction: "down",
    duration: 40,
    images: [
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=600&auto=format&fit=crop", // Video Production
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop", // Wedding — rings
      "https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg?auto=compress&cs=tinysrgb&w=600", // Large Format Printing
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=600&auto=format&fit=crop", // Web Design
    ],
  },
  {
    direction: "up",
    duration: 30,
    images: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop", // Social Media Management
      "https://images.unsplash.com/photo-1529519195486-16945f0fb37f?q=80&w=600&auto=format&fit=crop", // Client experience
      "https://images.pexels.com/photos/20209020/pexels-photo-20209020.jpeg?auto=compress&cs=tinysrgb&w=600", // UV & Custom Material Printing
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=600&auto=format&fit=crop", // Wedding — golden hour
    ],
  },
  {
    direction: "down",
    duration: 36,
    images: [
      "https://images.pexels.com/photos/15718298/pexels-photo-15718298.jpeg?auto=compress&cs=tinysrgb&w=600", // Apparel & Promotional
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop", // Wedding — reception
      "https://images.unsplash.com/photo-1606495186270-395860907235?q=80&w=600&auto=format&fit=crop", // Team collaboration
      "https://images.pexels.com/photos/29630126/pexels-photo-29630126.jpeg?auto=compress&cs=tinysrgb&w=600", // Packaging & Label Printing
    ],
  },
];

export default function HeroImageColumns() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative grid h-full grid-cols-4 gap-3 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
    >
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="relative h-full overflow-hidden">
          <div
            className={`flex flex-col gap-3 ${column.direction === "up" ? "hero-col-up" : "hero-col-down"}`}
            style={{ animationDuration: `${column.duration}s` }}
          >
            {[...column.images, ...column.images].map((src, i) => (
              <div
                key={i}
                className="w-full shrink-0 overflow-hidden rounded-2xl bg-white/5"
                style={{ aspectRatio: i % 3 === 0 ? "3/4" : "1/1" }}
              >
                <img
                  src={src}
                  alt=""
                  loading={colIndex < 2 && i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
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
