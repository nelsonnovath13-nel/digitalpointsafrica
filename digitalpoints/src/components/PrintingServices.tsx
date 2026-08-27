import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const printingServices = [
  {
    name: "Digital Printing",
    description: "Business cards, flyers, brochures, posters, invitations, certificates, etc.",
    image:
      "https://images.pexels.com/photos/37332553/pexels-photo-37332553.jpeg?auto=compress&cs=tinysrgb&w=960",
  },
  {
    name: "Large Format Printing",
    description: "Banners, billboards, roll-ups, large posters, vehicle graphics, etc.",
    image:
      "https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg?auto=compress&cs=tinysrgb&w=960",
  },
  {
    name: "UV & Custom Material Printing",
    description: "Wood, acrylic, glass, metal, cups, bottles, promotional items, etc.",
    image:
      "https://images.pexels.com/photos/20209020/pexels-photo-20209020.jpeg?auto=compress&cs=tinysrgb&w=960",
  },
  {
    name: "Packaging & Label Printing",
    description: "Product labels, stickers, boxes, packaging materials, etc.",
    image:
      "https://images.pexels.com/photos/29630126/pexels-photo-29630126.jpeg?auto=compress&cs=tinysrgb&w=960",
  },
  {
    name: "Apparel & Promotional Printing",
    description: "T-shirts, uniforms, caps, bags, mugs, and branded promotional products.",
    image:
      "https://images.pexels.com/photos/15718298/pexels-photo-15718298.jpeg?auto=compress&cs=tinysrgb&w=960",
  },
] as const;

function PrintingCard({
  service,
  index,
  prefersReducedMotion,
}: {
  service: (typeof printingServices)[number];
  index: number;
  prefersReducedMotion: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => setFlipped((value) => !value);
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFlip();
    }
  };

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: 0.97 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: premiumEase }}
      className="relative h-[460px] w-[82vw] shrink-0 snap-start sm:h-[520px] sm:w-[420px] lg:w-[460px]"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={toggleFlip}
        onKeyDown={handleKeyDown}
        aria-pressed={flipped}
        aria-label={`${service.name} — ${flipped ? "showing description, activate to view image" : "activate to view description"}`}
        className="relative block h-full w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-point-500 focus-visible:ring-offset-2"
        style={{ perspective: "1600px" }}
      >
        <div
          className="relative h-full w-full rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-transform duration-700 ease-out"
          style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <div
            className="group absolute inset-0 overflow-hidden rounded-3xl bg-ink-950"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              src={service.image}
              alt=""
              aria-hidden="true"
              draggable={false}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-ink-950/5" />

            <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-ink-950/45 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-point-500" />
                {service.name}
              </span>
            </div>

            <a
              href="/printing"
              draggable={false}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
              aria-label={`Explore ${service.name}`}
            >
              <span className="pointer-events-none flex h-28 w-28 scale-90 items-center justify-center rounded-full bg-point-600 text-center font-poppins text-[13px] font-semibold leading-tight text-white opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out group-hover:scale-100 group-hover:pointer-events-auto group-hover:opacity-100">
                Explore Printing
              </span>
            </a>
          </div>

          <div
            className="absolute inset-0 flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-ink-950 p-6 sm:p-7"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-point-500">
                <span className="h-1.5 w-1.5 rounded-full bg-point-500" />
                {service.name}
              </span>
              <p className="mt-5 text-base leading-7 text-white/85">{service.description}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 text-[11px] font-medium text-white/60">
              ↺ Tap to go back
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function PrintingServices() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const scrollCards = (direction: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction * Math.min(slider.clientWidth * 0.78, 460),
      behavior: "smooth",
    });
  };

  const hasDraggedRef = useRef(false);
  const DRAG_THRESHOLD = 6;

  const handleMouseMove = (event: MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const delta = event.clientX - dragStartX.current;

    if (!hasDraggedRef.current) {
      if (Math.abs(delta) < DRAG_THRESHOLD) return;
      hasDraggedRef.current = true;
      setIsDragging(true);
    }

    slider.scrollLeft = dragStartScroll.current - delta;
  };

  const suppressNextClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    window.removeEventListener("click", suppressNextClick, true);
  };

  const handleMouseUp = () => {
    if (hasDraggedRef.current) {
      window.addEventListener("click", suppressNextClick, true);
    }
    hasDraggedRef.current = false;
    setIsDragging(false);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    dragStartX.current = event.clientX;
    dragStartScroll.current = sliderRef.current.scrollLeft;
    hasDraggedRef.current = false;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // A horizontally-scrollable element with no vertical overflow will, by
    // default, consume vertical wheel input as horizontal scroll — which
    // makes the page feel stuck when the cursor happens to be over the
    // cards. Forward vertical-dominant wheel gestures back to the page.
    // Rapid wheel events are batched into a single rAF-scheduled scroll so
    // they don't pile up (each one forcing its own synchronous layout),
    // which is what reads as a stuck/delayed scroll.
    let pendingDeltaY = 0;
    let rafId: number | null = null;

    const flushScroll = () => {
      rafId = null;
      window.scrollBy({ top: pendingDeltaY, left: 0, behavior: "auto" });
      pendingDeltaY = 0;
    };

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        pendingDeltaY += event.deltaY;
        if (rafId === null) rafId = window.requestAnimationFrame(flushScroll);
      }
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });

    // Touch: the slider only accepts native vertical panning (touch-action
    // below), so a vertical swipe always scrolls the page — it can never get
    // locked into the horizontal card track. Horizontal swipes are handled
    // manually here since the browser won't pan them natively.
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartScrollLeft = 0;
    let touchAxis: "horizontal" | "vertical" | null = null;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartScrollLeft = slider.scrollLeft;
      touchAxis = null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      const dx = touch.clientX - touchStartX;

      if (touchAxis === null) {
        const dy = touch.clientY - touchStartY;
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        touchAxis = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
      }

      if (touchAxis === "horizontal") {
        event.preventDefault();
        slider.scrollLeft = touchStartScrollLeft - dx;
      }
    };

    slider.addEventListener("touchstart", handleTouchStart, { passive: true });
    slider.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      slider.removeEventListener("wheel", handleWheel);
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
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
              Printing & Branding Services
            </motion.span>
            <motion.p
              variants={
                prefersReducedMotion
                  ? undefined
                  : { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
              }
              transition={{ duration: 0.55, ease: premiumEase }}
              className="mt-3 text-sm leading-7 text-ink-950/55 sm:text-base"
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

      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        style={{ touchAction: "pan-y" }}
        className={`flex snap-x snap-proximity gap-5 overflow-x-auto px-6 pb-3 [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        <div aria-hidden="true" className="w-[max(0px,calc((100vw-1280px)/2))] shrink-0" />

        {printingServices.map((service, index) => (
          <PrintingCard
            key={service.name}
            service={service}
            index={index}
            prefersReducedMotion={!!prefersReducedMotion}
          />
        ))}

        <div aria-hidden="true" className="w-6 shrink-0" />
      </div>
    </section>
  );
}
