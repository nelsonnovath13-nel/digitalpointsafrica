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
] as const;

const SERVICE_COUNT = services.length;
const DESKTOP_MEDIA = "(min-width: 768px)";
const DESKTOP_LERP = 0.08;
const DESKTOP_SCROLL_HEIGHT_VH = 650;
const MOBILE_CARD_SCROLL_HEIGHT_VH = 160;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeOutExpo(value: number) {
  return value >= 1 ? 1 : 1 - Math.pow(2, -10 * value);
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
  const trackRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const entranceTimerRef = useRef<number | null>(null);
  const lastProgressRef = useRef(-1);
  const desktopTargetRef = useRef(0);
  const desktopCurrentRef = useRef(0);
  const [desktop, setDesktop] = useState(false);
  const [entranceSeen, setEntranceSeen] = useState(false);
  const [entranceVisible, setEntranceVisible] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_MEDIA);
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const target = entranceRef.current;
    if (!target || entranceSeen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntranceSeen(true);
        setEntranceVisible(true);
        entranceTimerRef.current = window.setTimeout(
          () => setEntranceVisible(false),
          1350,
        );
        observer.disconnect();
      },
      { threshold: 0.18 },
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      if (entranceTimerRef.current !== null) {
        window.clearTimeout(entranceTimerRef.current);
      }
    };
  }, [entranceSeen]);

  useEffect(() => {
    if (desktop) return;

    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>("[data-mobile-service-index]"),
    );
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(
            entry.target.getAttribute("data-mobile-service-index"),
          );
          if (Number.isFinite(index)) setMobileActiveIndex(index);
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [desktop]);

  useEffect(() => {
    if (!desktop) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const setTargetFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      desktopTargetRef.current = clamp(-rect.top / travel, 0, 1);
    };

    const render = () => {
      const target = desktopTargetRef.current;
      const current = desktopCurrentRef.current;
      const next = reducedMotion
        ? target
        : current + (target - current) * DESKTOP_LERP;
      const settled = Math.abs(target - next) < 0.0001;
      desktopCurrentRef.current = settled ? target : next;

      const progress = desktopCurrentRef.current;
      const travelProgress = progress * (SERVICE_COUNT - 1);
      const basePosition = travelProgress * 100;
      track.style.transform = `translate3d(${-basePosition}vw, 0, 0)`;

      track
        .querySelectorAll<HTMLElement>("[data-service-image]")
        .forEach((image) => {
          const index = Number(image.dataset.serviceImage);
          const distance = Math.abs(travelProgress - index);
          const settle = 1 - clamp(distance, 0, 1);
          const scale = 1.045 - settle * 0.045;
          image.style.transform = `scale(${scale})`;
        });

      track
        .querySelectorAll<HTMLElement>(".service-curtain")
        .forEach((curtain) => {
          const index = Number(curtain.dataset.serviceIndex);
          const localProgress = travelProgress - index;
          const reveal = easeOutExpo(
            clamp((localProgress + 0.04) / 0.96, 0, 1),
          );
          curtain.style.setProperty(
            "--curtain-cover",
            `${(1 - reveal) * 100}%`,
          );
        });

      if (Math.abs(progress - lastProgressRef.current) >= 0.0005) {
        lastProgressRef.current = progress;
      }

      frameRef.current = window.requestAnimationFrame(render);
    };

    setTargetFromScroll();
    desktopCurrentRef.current = reducedMotion
      ? desktopTargetRef.current
      : desktopCurrentRef.current;

    const onScroll = () => {
      setTargetFromScroll();
    };

    const onResize = () => {
      setTargetFromScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    frameRef.current = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastProgressRef.current = -1;
    };
  }, [desktop, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="homepage-services"
      className="relative w-full bg-[#07090a]"
      style={
        desktop
          ? { height: `${DESKTOP_SCROLL_HEIGHT_VH}vh` }
          : undefined
      }
      aria-label="Digital Points services"
    >
      <div
        ref={entranceRef}
        className="pointer-events-none absolute inset-x-0 top-0 z-40 h-screen"
        aria-hidden="true"
      >
        <div
          className={`absolute left-6 top-1/2 -translate-y-1/2 sm:left-10 lg:left-16 ${
            entranceVisible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-200`}
        >
          <div
            className={`overflow-hidden text-xs font-semibold uppercase tracking-[0.28em] text-[#20cbab] transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              entranceSeen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <span className="inline-block transition-[font-weight,letter-spacing] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
              Our
            </span>{" "}
            <span className="inline-block transition-[font-weight,letter-spacing] delay-100 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
              Services
            </span>
          </div>
          <div
            className={`mt-4 h-px w-32 bg-[#20cbab] transition-transform duration-[900ms] delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              entranceSeen ? "origin-left scale-x-100" : "origin-left scale-x-0"
            }`}
          />
        </div>
      </div>

      {desktop ? (
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#07090a]">
          <div
            ref={trackRef}
            className="flex h-full w-[400vw] will-change-transform"
          >
            {services.map((service, index) => (
              <article
                key={service.number}
                className="relative h-screen w-screen shrink-0 overflow-hidden"
                aria-labelledby={`digital-points-service-${service.number}`}
              >
                <img
                  src={service.image}
                  alt=""
                  aria-hidden="true"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  data-service-image={index}
                  className="absolute inset-0 h-full w-full object-cover will-change-transform"
                />

                <div className="absolute inset-0 bg-[#07090a]/55" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07090a]/90 via-[#07090a]/55 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090a]/80 via-transparent to-[#07090a]/20" />

                {index > 0 && !reducedMotion && (
                  <div
                    aria-hidden="true"
                    data-service-index={index}
                    className="service-curtain absolute inset-0 z-20 bg-[#0eab8f]"
                    style={{ clipPath: "inset(0 var(--curtain-cover, 0%) 0 0)" }}
                  />
                )}

                <div className="relative z-10 flex h-full items-end px-7 pb-20 sm:px-12 sm:pb-24 lg:px-16 lg:pb-20">
                  <div className="w-full max-w-6xl">
                    <div className="max-w-4xl">
                      <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-[#20cbab] sm:text-sm">
                        {service.number} — {service.name}
                      </p>
                      <h2
                        id={`digital-points-service-${service.number}`}
                        className="font-display text-[clamp(3.2rem,8vw,8rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-white"
                      >
                        {service.name}
                      </h2>
                      <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                        {service.description}
                      </p>
                      <Link
                        to={service.href}
                        className="mt-8 inline-flex items-center gap-3 bg-[#201e1f] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#20cbab] hover:text-[#07090a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20cbab] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090a]"
                      >
                        Explore {service.name}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-7 right-6 z-30 flex items-center gap-3 sm:right-10">
                  <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 sm:inline">
                    Services
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-white">
                    {service.number} <span className="text-white/30">/ 04</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full">
          {services.map((service, index) => (
            <div
              key={service.number}
              className="relative h-[160vh] w-full"
            >
              <article
                className="sticky top-0 flex h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#07090a]"
                data-mobile-service-index={index}
                aria-labelledby={`mobile-digital-points-service-${service.number}`}
              >
                <img
                  src={service.image}
                  alt=""
                  aria-hidden="true"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#07090a]/58" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090a]/90 via-[#07090a]/45 to-transparent" />

                {index > 0 && !reducedMotion && index > mobileActiveIndex && (
                  <div aria-hidden="true" className="absolute inset-0 z-20 bg-[#0eab8f]" />
                )}

                <div className="relative z-10 flex h-full w-full items-end px-6 pb-16 sm:px-10 sm:pb-20">
                  <div className="w-full max-w-2xl">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#20cbab]">
                      {service.number} — {service.name}
                    </p>
                    <h2
                      id={`mobile-digital-points-service-${service.number}`}
                      className="font-display text-[clamp(2.8rem,13vw,5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white"
                    >
                      {service.name}
                    </h2>
                    <p className="mt-6 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                      {service.description}
                    </p>
                    <Link
                      to={service.href}
                      className="mt-7 inline-flex items-center gap-3 bg-[#201e1f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#20cbab] hover:text-[#07090a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20cbab] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090a]"
                    >
                      Explore {service.name}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </div>

                <div className="absolute bottom-6 right-5 z-30 text-sm font-semibold tabular-nums text-white sm:right-8">
                  {service.number} <span className="text-white/30">/ 04</span>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
