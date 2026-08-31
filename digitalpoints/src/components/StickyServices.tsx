import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    name: "Digital Marketing",
    description:
      "Build reach, attract the right audience, and turn digital attention into measurable business growth.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    href: "/services",
  },
  {
    number: "02",
    name: "Video Production",
    description:
      "Tell your story through purposeful video content designed to communicate clearly and leave a lasting impression.",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=1600&auto=format&fit=crop",
    href: "/video-production",
  },
  {
    number: "03",
    name: "Graphic Design",
    description:
      "Create strong visual communication that gives your business a clear, consistent, and memorable identity.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1600&auto=format&fit=crop",
    href: "/services",
  },
  {
    number: "04",
    name: "Social Media Management",
    description:
      "Plan, publish, and manage consistent social content that keeps your brand active, relevant, and connected to its audience.",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1600&auto=format&fit=crop",
    href: "/services",
  },
  {
    number: "05",
    name: "Web Design",
    description:
      "Design and build fast, modern websites that represent your brand well and turn visitors into customers.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1600&auto=format&fit=crop",
    href: "/services",
  },
] as const;

const SERVICE_COUNT = services.length;
const SCROLL_HEIGHT_VH = 460;
const ENTRANCE_PORTION = 0.09;
const WIPE_PORTION = 0.88;
const CONTENT_SETTLE_PORTION = 0.92;
const LERP = 0.12;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default function StickyServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const entrancePortionRef = useRef(ENTRANCE_PORTION);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const images = Array.from(section.querySelectorAll<HTMLElement>("[data-service-image]"));
    let isVisible = true;

    const setTargetFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const travel = Math.max(section.offsetHeight - viewportH, 1);
      // Let the rise start while the section is still approaching from
      // below (not yet pinned), finishing exactly as it locks into place —
      // so it's never pinned while still showing an unrisen, empty card.
      const preRoll = viewportH * 0.85;
      const totalSpan = preRoll + travel;
      entrancePortionRef.current = preRoll / totalSpan;
      targetProgressRef.current = clamp((preRoll - rect.top) / totalSpan, 0, 1);
    };

    const setImageReveal = (transitionProgress: number) => {
      images.forEach((image) => {
        const index = Number(image.dataset.serviceImage);
        if (index === 0) return;
        const reveal = clamp(
          (transitionProgress - (index - 1)) / WIPE_PORTION,
          0,
          1,
        );
        image.style.clipPath = `inset(0 ${100 - reveal * 100}% 0 0)`;
      });
    };

    const render = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const next = reducedMotion ? target : current + (target - current) * LERP;
      currentProgressRef.current = Math.abs(target - next) < 0.0001 ? target : next;

      const progress = currentProgressRef.current;
      const entrancePortion = entrancePortionRef.current;
      const entranceRaw = clamp(progress / entrancePortion, 0, 1);
      const entrance = reducedMotion ? entranceRaw : easeOutCubic(entranceRaw);
      const scale = 0.92 + entrance * 0.08;
      const translateY = (1 - entrance) * 24;
      const radius = Math.max(0, 40 * (1 - entrance));
      const opacity = reducedMotion ? 1 : 0.4 + entrance * 0.6;

      stage.style.transform = `translate3d(0, ${translateY}vh, 0) scale(${scale})`;
      stage.style.borderRadius = `${radius}px`;
      stage.style.opacity = `${opacity}`;

      const transitionProgress = clamp(
        ((progress - entrancePortion) / (1 - entrancePortion)) * (SERVICE_COUNT - 1),
        0,
        SERVICE_COUNT - 1,
      );

      setImageReveal(transitionProgress);

      const transitionBase = Math.floor(transitionProgress);
      const localProgress = transitionProgress - transitionBase;

      // The image is revealed during the sweep, but the service copy waits until
      // the wipe has completely exited. The final small interval lets the
      // new copy appear cleanly before the next scroll-driven transition starts.
      let completedIndex = transitionBase;
      if (transitionBase < SERVICE_COUNT - 1 && localProgress >= CONTENT_SETTLE_PORTION) {
        completedIndex = transitionBase + 1;
      }
      if (transitionProgress >= SERVICE_COUNT - 1) completedIndex = SERVICE_COUNT - 1;
      if (reducedMotion) completedIndex = Math.round(transitionProgress);

      if (completedIndex !== activeIndexRef.current) {
        activeIndexRef.current = completedIndex;
        setActiveIndex(completedIndex);
      }

      frameRef.current = isVisible ? window.requestAnimationFrame(render) : null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && frameRef.current === null) {
          frameRef.current = window.requestAnimationFrame(render);
        }
      },
      { rootMargin: "40% 0px" },
    );
    observer.observe(section);

    setTargetFromScroll();
    window.addEventListener("scroll", setTargetFromScroll, { passive: true });
    window.addEventListener("resize", setTargetFromScroll);
    frameRef.current = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", setTargetFromScroll);
      window.removeEventListener("resize", setTargetFromScroll);
      observer.disconnect();
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [reducedMotion]);

  const service = services[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="homepage-services"
      className="relative w-full bg-[#07090a]"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
      aria-label="Digital Points services"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#07090a]">
        <div
          ref={stageRef}
          className="relative h-full w-full overflow-hidden bg-[#07090a] shadow-[0_30px_80px_rgba(0,0,0,0.35)] will-change-transform"
          style={{ transformOrigin: "center center" }}
        >
          {services.map((item, index) => (
            <img
              key={item.number}
              src={item.image}
              alt=""
              aria-hidden="true"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              data-service-image={index}
              className="absolute inset-0 h-full w-full object-cover will-change-[clip-path,transform]"
              style={{
                zIndex: index,
                clipPath: index === 0 ? "inset(0)" : "inset(0 100% 0 0)",
                filter: "brightness(1.32)",
              }}
            />
          ))}

          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(7,9,10,0.88) 0%, rgba(7,9,10,0.68) 28%, rgba(7,9,10,0.32) 48%, rgba(7,9,10,0.08) 66%, transparent 82%)",
            }}
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#07090a]/70 via-transparent to-transparent" />

          <div className="relative z-20 flex h-full items-end px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-20">
            <div className="w-full max-w-6xl">
              <div className="max-w-4xl">
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-[#20cbab] sm:text-sm">
                  {service.number} — {service.name}
                </p>
                <div key={`content-${service.number}`} className="animate-[service-content-in_620ms_cubic-bezier(0.22,1,0.36,1)]">
                  <h2
                    id={`digital-points-service-${service.number}`}
                    className="font-display text-[clamp(3.1rem,8vw,8rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white"
                  >
                    {service.name}
                  </h2>
                  <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                    {service.description}
                  </p>
                  <Link
                    to={service.href}
                    className="mt-8 inline-flex items-center gap-3 rounded-lg border-[1.5px] border-white/40 bg-white/[0.08] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#14b8a6] hover:bg-[#14b8a6] hover:text-white hover:shadow-[0_6px_16px_rgba(20,184,166,0.35)] focus-visible:-translate-y-0.5 focus-visible:border-[#14b8a6] focus-visible:bg-[#14b8a6] focus-visible:text-white focus-visible:shadow-[0_6px_16px_rgba(20,184,166,0.35)] focus-visible:outline-none"
                  >
                    Explore {service.name}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-7 right-6 z-40 flex items-center gap-3 sm:right-10">
            <span className="text-sm font-semibold tabular-nums text-white">
              {service.number} <span className="text-white/30">/ {String(SERVICE_COUNT).padStart(2, "0")}</span>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes service-content-in {
          from { opacity: 0; transform: translateY(18px) scale(0.985); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          #homepage-services * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}
