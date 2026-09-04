import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-router-dom";
import HeroImageColumns, { HeroImageStripMobile } from "./HeroImageColumns";

const rotatingWords = [
  "Designs",
  "Websites",
  "Videos",
  "Branding",
  "Marketing",
  "Printing",
];

const TYPE_SPEED_MS = 95;
const DELETE_SPEED_MS = 58;
const WORD_HOLD_MS = 1250;
const BETWEEN_WORDS_MS = 320;

type Particle = {
  id: number;
  xPct: number;
  yPct: number;
  size: number;
  depth: number;
  duration: number;
  delay: number;
  opacity: number;
};

const PARTICLES: Particle[] = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  xPct: (i * 37 + 9) % 100,
  yPct: (i * 53 + 17) % 100,
  size: 2 + (i % 4),
  depth: 0.012 + (i % 4) * 0.008,
  duration: 7 + (i % 5) * 1.6,
  delay: (i % 6) * 0.7,
  opacity: 0.14 + ((i * 13) % 26) / 100,
}));

const GRAIN_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

type Ripple = { id: number; x: number; y: number };

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const frameRef = useRef<number | null>(null);

  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedWord(rotatingWords[wordIndex]);
      return;
    }

    const target = rotatingWords[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedWord.length < target.length) {
      timeout = setTimeout(() => setTypedWord(target.slice(0, typedWord.length + 1)), TYPE_SPEED_MS);
    } else if (!isDeleting && typedWord.length === target.length) {
      timeout = setTimeout(() => setIsDeleting(true), WORD_HOLD_MS);
    } else if (isDeleting && typedWord.length > 0) {
      timeout = setTimeout(() => setTypedWord(target.slice(0, typedWord.length - 1)), DELETE_SPEED_MS);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % rotatingWords.length);
      }, BETWEEN_WORDS_MS);
    }

    return () => clearTimeout(timeout);
  }, [isDeleting, shouldReduceMotion, typedWord, wordIndex]);

  useEffect(() => {
    if (!shouldReduceMotion) return;
    const id = setInterval(() => setWordIndex((index) => (index + 1) % rotatingWords.length), 2800);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  useEffect(() => {
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)");
    const small = window.matchMedia("(max-width: 640px)");
    const updateCoarse = () => setIsCoarsePointer(coarse.matches);
    const updateSmall = () => setIsSmallScreen(small.matches);
    updateCoarse();
    updateSmall();
    coarse.addEventListener("change", updateCoarse);
    small.addEventListener("change", updateSmall);
    return () => {
      coarse.removeEventListener("change", updateCoarse);
      small.removeEventListener("change", updateSmall);
    };
  }, []);

  const enableCursorFx = !shouldReduceMotion && !isCoarsePointer;
  const particles = isSmallScreen ? PARTICLES.slice(0, 8) : PARTICLES;

  useEffect(() => {
    if (!enableCursorFx) return;
    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      pointerRef.current.targetX = event.clientX - rect.left;
      pointerRef.current.targetY = event.clientY - rect.top;
      pointerRef.current.active = true;
    };
    const handleLeave = () => {
      pointerRef.current.active = false;
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);

    const tick = () => {
      const pointer = pointerRef.current;
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;

      const spotlight = spotlightRef.current;
      if (spotlight) {
        spotlight.style.opacity = pointer.active ? "1" : "0";
        spotlight.style.transform = `translate3d(${pointer.x - spotlight.offsetWidth / 2}px, ${pointer.y - spotlight.offsetHeight / 2}px, 0)`;
      }

      const rect = section.getBoundingClientRect();
      const offsetX = pointer.active ? pointer.x - rect.width / 2 : 0;
      const offsetY = pointer.active ? pointer.y - rect.height / 2 : 0;

      particleRefs.current.forEach((el, i) => {
        const depth = particles[i]?.depth ?? 0;
        if (!el) return;
        el.style.transform = `translate3d(${offsetX * depth}px, ${offsetY * depth}px, 0)`;
      });

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [enableCursorFx, particles]);

  const handleHeroClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const id = rippleId.current++;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setRipples((prev) => [...prev, { id, x, y }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 650);
  };

  return (
    <section
      ref={sectionRef}
      onClick={handleHeroClick}
      className="relative h-[640px] min-h-[640px] w-full overflow-hidden sm:h-[660px] sm:min-h-[660px] lg:h-[640px] lg:min-h-[640px]"
      style={{
        background: "linear-gradient(120deg, #071211 0%, #0a2420 35%, #124a41 65%, #1a5c50 100%)",
      }}
    >
      {/* Background depth orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className={`absolute -left-[10%] top-[-15%] h-[260px] w-[260px] rounded-full bg-[#14b8a6]/25 blur-[90px] sm:h-[420px] sm:w-[420px] sm:blur-[110px] lg:h-[520px] lg:w-[520px] ${
            shouldReduceMotion ? "" : "animate-[hero-orb-drift-1_22s_ease-in-out_infinite]"
          }`}
        />
        <div
          className={`absolute -right-[8%] bottom-[-20%] h-[240px] w-[240px] rounded-full bg-[#0d9488]/20 blur-[80px] sm:h-[380px] sm:w-[380px] sm:blur-[100px] lg:h-[480px] lg:w-[480px] ${
            shouldReduceMotion ? "" : "animate-[hero-orb-drift-2_26s_ease-in-out_infinite]"
          }`}
        />
      </div>

      {/* Subtle grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_URL}")`, backgroundSize: "140px 140px" }}
      />

      {/* Ambient breathing glow — visible on every device, not cursor-dependent */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-[38%] z-[1] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#14b8a6]/20 blur-[70px] sm:h-[360px] sm:w-[360px] sm:blur-[95px] ${
          shouldReduceMotion ? "" : "animate-[hero-ambient-breathe_6s_ease-in-out_infinite]"
        }`}
      />

      {/* Flowing gradient ribbon — a Stripe-style diagonal color sweep in brand teal/emerald with a warm accent */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-[35%] -top-[40%] z-[1] h-[160%] w-[85%] rotate-[16deg] opacity-90 blur-2xl sm:-right-[20%] sm:w-[65%] ${
          shouldReduceMotion ? "" : "animate-[hero-ribbon-flow_9s_ease-in-out_infinite]"
        }`}
        style={{
          background:
            "linear-gradient(120deg, transparent 0%, rgba(94,234,212,0.75) 20%, rgba(20,184,166,0.85) 34%, rgba(255,122,69,0.5) 48%, rgba(13,148,136,0.8) 62%, transparent 82%)",
          backgroundSize: "340% 340%",
        }}
      />

      {/* Mouse-follow spotlight */}
      {enableCursorFx && (
        <div
          ref={spotlightRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-[2] h-[420px] w-[420px] rounded-full opacity-0 will-change-transform lg:h-[520px] lg:w-[520px]"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.18) 0%, rgba(20,184,166,0.06) 42%, transparent 70%)",
            filter: "blur(6px)",
            transition: "opacity 300ms ease",
          }}
        />
      )}

      {/* Interactive particles — float on every device, parallax offset only where cursor fx are enabled */}
      {!shouldReduceMotion && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
          {particles.map((particle, index) => (
            <div
              key={particle.id}
              ref={(el) => {
                particleRefs.current[index] = el;
              }}
              className="absolute will-change-transform"
              style={{ left: `${particle.xPct}%`, top: `${particle.yPct}%` }}
            >
              <div
                className="animate-[hero-particle-float_ease-in-out_infinite] rounded-full bg-white"
                style={{
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.opacity,
                  animationDuration: `${particle.duration}s`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Click ripple */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[4] overflow-hidden">
        <AnimatePresence>
          {!shouldReduceMotion &&
            ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                initial={{ opacity: 0.4, scale: 0 }}
                animate={{ opacity: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  background: "radial-gradient(circle, rgba(20,184,166,0.5) 0%, rgba(20,184,166,0) 72%)",
                }}
              />
            ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col items-center justify-center px-5 pb-6 pt-14 text-center sm:px-6 sm:pb-8 lg:items-stretch lg:overflow-hidden lg:px-10 lg:pb-0 lg:pt-10 lg:text-left xl:px-16">
        <div className="flex flex-col items-center lg:relative lg:z-10 lg:ml-8 lg:max-w-[540px] lg:items-start xl:ml-14 xl:max-w-[600px]">
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[1.55rem] font-normal leading-[1.08] tracking-[-0.035em] text-white sm:text-[2rem] md:text-[2.35rem] lg:text-[2.8rem] xl:text-[3.1rem]">
          <span className="block whitespace-nowrap">We make your brand</span>
          <span className="block whitespace-nowrap">stand out through</span>
          <span className="relative block min-h-[1.08em] text-white" aria-live="polite" aria-label={rotatingWords[wordIndex]}>
            <span className="inline-flex min-w-[9ch] items-baseline justify-center font-extrabold" style={{ fontSize: "0.85em" }}>
              {typedWord}
              <span aria-hidden="true" className="ml-[3px] inline-block h-[0.88em] w-[2px] translate-y-[0.04em] bg-white/90 animate-pulse align-baseline" />
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.45, delay: shouldReduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-[980px] px-2 font-poppins text-[12px] font-normal leading-[1.45] tracking-[-0.01em] text-white/80 sm:mt-5 sm:text-[14px] md:text-[15px] lg:max-w-none lg:px-0 lg:text-[16px] lg:leading-[1.5]">
          <span className="block md:whitespace-nowrap lg:whitespace-normal">We bring together creativity, technology and strategy to build brands that connect, engage, and grow.</span>
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.5, delay: shouldReduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
          <Link to="/portfolio" className="group relative inline-flex h-[46px] min-w-[180px] items-center justify-center overflow-hidden rounded-full border border-[#08bdb8] bg-[#08bdb8] px-7 font-poppins text-[13px] font-medium tracking-[-0.01em] text-white shadow-[0_0_0_0_rgba(8,189,184,0)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-[#18d1cc] hover:bg-[#10aaa6] hover:shadow-[0_14px_32px_-12px_rgba(8,189,184,0.55)] active:translate-y-0 active:scale-[0.98] sm:h-[48px] sm:min-w-[185px] sm:text-[13.5px]">
            {!shouldReduceMotion && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-white/25 animate-[hero-cta-shimmer_3.6s_ease-in-out_infinite]"
              />
            )}
            <span className="relative">Explore Portfolio</span>
          </Link>
          <Link to="/contact" className="inline-flex h-[46px] min-w-[180px] items-center justify-center rounded-full border border-white/70 bg-white/[0.02] px-7 font-poppins text-[13px] font-medium tracking-[-0.01em] text-white shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-white hover:bg-white/[0.08] hover:shadow-[0_14px_32px_-16px_rgba(255,255,255,0.24)] active:translate-y-0 active:scale-[0.98] sm:h-[48px] sm:min-w-[185px] sm:text-[13.5px]">Work With Us</Link>
        </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.5, delay: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 w-full lg:hidden"
        >
          <HeroImageStripMobile />
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.6, delay: shouldReduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-y-0 left-[6%] right-4 z-0 hidden min-h-0 overflow-hidden lg:block xl:right-8"
        >
          <HeroImageColumns />
        </motion.div>

        {/* Scrim so the headline stays dominant over the images peeking through behind it */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, #071211 0%, #071211 14%, rgba(7,18,17,0.88) 30%, rgba(7,18,17,0.58) 46%, rgba(7,18,17,0.24) 60%, rgba(7,18,17,0.02) 74%, transparent 86%)",
          }}
        />
      </div>

      <style>{`
        @keyframes hero-orb-drift-1 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(24px, 18px, 0); }
        }
        @keyframes hero-orb-drift-2 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-20px, -16px, 0); }
        }
        @keyframes hero-particle-float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -10px, 0); }
        }
        @keyframes hero-ambient-breathe {
          0%, 100% { opacity: 0.55; transform: translate3d(-50%, -50%, 0) scale(1); }
          50% { opacity: 1; transform: translate3d(-50%, -50%, 0) scale(1.08); }
        }
        @keyframes hero-cta-shimmer {
          0% { transform: translate3d(-160%, 0, 0) skewX(-12deg); }
          55%, 100% { transform: translate3d(320%, 0, 0) skewX(-12deg); }
        }
        @keyframes hero-ribbon-flow {
          0% { background-position: 0% 10%; }
          25% { background-position: 60% 70%; }
          50% { background-position: 100% 90%; }
          75% { background-position: 40% 30%; }
          100% { background-position: 0% 10%; }
        }
      `}</style>
    </section>
  );
}
