import { useRef, useState } from "react";

const printingServices = [
  {
    name: "Embroidery",
    badge: "Uniforms & Merchandise",
    description: "Kudarizi logo/design ya mteja kwenye T-shirts, caps, uniforms, na bags kwa ubora wa hali ya juu",
    image:
      "https://images.pexels.com/photos/37332553/pexels-photo-37332553.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    name: "Branding",
    badge: "Corporate Identity",
    description: "Kuchapisha vifaa vya utambulisho wa kampuni — business cards, letterheads, banners, na packaging",
    image:
      "https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    name: "Digital Marketing",
    badge: "Online Promotion",
    description: "Kuunga mkono branding na print kwa content ya kidijitali na social media graphics zinazoendana na branded materials",
    image:
      "https://images.pexels.com/photos/20209020/pexels-photo-20209020.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    name: "Promotion",
    badge: "Promotional Items",
    description: "Kuweka branding kwenye mugs, T-shirts, na promotional giveaways kwa matukio na kampeni za wateja",
    image:
      "https://images.pexels.com/photos/29630126/pexels-photo-29630126.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    name: "Video production",
    badge: "Brand Storytelling",
    description: "Kutengeneza video za kampuni na matangazo zinazoongeza thamani ya branding waliyoichapisha",
    image:
      "https://images.pexels.com/photos/15718298/pexels-photo-15718298.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export default function PrintingServices() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const scrollCards = (direction: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction * Math.min(slider.clientWidth * 0.78, 460),
      behavior: "smooth",
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !sliderRef.current) return;
    dragStartX.current = event.clientX;
    dragStartScroll.current = sliderRef.current.scrollLeft;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || event.pointerType !== "mouse" || !sliderRef.current) return;
    sliderRef.current.scrollLeft = dragStartScroll.current - (event.clientX - dragStartX.current);
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <section id="printing-services" className="relative overflow-hidden bg-cream-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
              Printing & Branding
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
              Our Printing Services
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-950/55 sm:text-base">
              From branded materials to promotional merchandise, Digital Points provides printing and branding services designed to meet different business and creative needs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollCards(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-950 text-lg text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-point-500 focus:ring-offset-2"
              aria-label="Previous printing service"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollCards(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-950 text-lg text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-point-500 focus:ring-offset-2"
              aria-label="Next printing service"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={sliderRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={stopDragging}
        className={`flex snap-x snap-proximity gap-5 overflow-x-auto px-6 pb-3 [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        <div aria-hidden="true" className="w-[max(0px,calc((100vw-1280px)/2))] shrink-0" />

        {printingServices.map((service) => (
          <article
            key={service.name}
            className="group relative h-[460px] w-[82vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-ink-950 sm:h-[520px] sm:w-[420px] lg:w-[460px]"
          >
            <img
              src={service.image}
              alt={service.name}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-ink-950/10" />

            <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-ink-950/45 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-point-500" />
                {service.badge}
              </span>

              <div>
                <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                  {service.name}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
                  {service.description}
                </p>
              </div>
            </div>
          </article>
        ))}

        <div aria-hidden="true" className="w-6 shrink-0" />
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl justify-center px-6">
        <a
          href="/printing"
          className="inline-flex items-center justify-center rounded-full bg-point-600 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-point-500 focus:ring-offset-2"
        >
          Explore Printing
        </a>
      </div>
    </section>
  );
}
