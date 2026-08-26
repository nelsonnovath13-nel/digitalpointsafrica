import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const printingServices = [
  {
    name: "Embroidery",
    badge: "Uniforms & Merchandise",
    image:
      "https://images.pexels.com/photos/37332553/pexels-photo-37332553.jpeg?auto=compress&cs=tinysrgb&w=960",
  },
  {
    name: "Branding",
    badge: "Corporate Identity",
    image:
      "https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg?auto=compress&cs=tinysrgb&w=960",
  },
  {
    name: "Digital Marketing",
    badge: "Online Promotion",
    image:
      "https://images.pexels.com/photos/20209020/pexels-photo-20209020.jpeg?auto=compress&cs=tinysrgb&w=960",
  },
  {
    name: "Promotion",
    badge: "Promotional Items",
    image:
      "https://images.pexels.com/photos/29630126/pexels-photo-29630126.jpeg?auto=compress&cs=tinysrgb&w=960",
  },
  {
    name: "Video production",
    badge: "Brand Storytelling",
    image:
      "https://images.pexels.com/photos/15718298/pexels-photo-15718298.jpeg?auto=compress&cs=tinysrgb&w=960",
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
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        window.scrollBy({ top: event.deltaY, left: 0, behavior: "auto" });
      }
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    return () => slider.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section id="printing-services" className="relative overflow-hidden bg-cream-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={
            prefersReducedMotion
              ? undefined
              : { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }
          }
          className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <motion.span
              variants={
                prefersReducedMotion
                  ? undefined
                  : { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }
              }
              transition={{ duration: 0.5, ease: premiumEase }}
              className="block text-xs font-medium uppercase tracking-[0.25em] text-point-600"
            >
              Printing & Branding
            </motion.span>
            <motion.h2
              variants={
                prefersReducedMotion
                  ? undefined
                  : { hidden: { opacity: 0, y: 22, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }
              }
              transition={{ duration: 0.6, ease: premiumEase }}
              className="mt-3 font-display text-3xl font-semibold text-ink-950 sm:text-4xl"
            >
              Our Printing Services
            </motion.h2>
            <motion.p
              variants={
                prefersReducedMotion
                  ? undefined
                  : { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
              }
              transition={{ duration: 0.55, ease: premiumEase }}
              className="mt-4 text-sm leading-7 text-ink-950/55 sm:text-base"
            >
              From branded materials to promotional merchandise, Digital Points provides printing and branding services designed to meet different business and creative needs.
            </motion.p>
          </div>

          <motion.div
            variants={
              prefersReducedMotion
                ? undefined
                : { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
            }
            transition={{ duration: 0.5, ease: premiumEase }}
            className="flex items-center gap-3"
          >
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
          </motion.div>
        </motion.div>
      </div>

      <div className="relative">
        <a
          href="/printing"
          className="absolute left-1/2 top-1/2 z-20 inline-flex -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full bg-point-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-point-500 focus:ring-offset-2"
        >
          Explore Printing
        </a>

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

          {printingServices.map((service, index) => (
            <motion.article
              key={service.name}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: 0.97 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: premiumEase }}
              className="group relative h-[460px] w-[82vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-ink-950 sm:h-[520px] sm:w-[420px] lg:w-[460px]"
            >
              <img
                src={service.image}
                alt={service.name}
                draggable={false}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-ink-950/10" />

              <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-ink-950/45 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-point-500" />
                  {service.badge}
                </span>

                <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                  {service.name}
                </h3>
              </div>
            </motion.article>
          ))}

          <div aria-hidden="true" className="w-6 shrink-0" />
        </div>
      </div>
    </section>
  );
}
