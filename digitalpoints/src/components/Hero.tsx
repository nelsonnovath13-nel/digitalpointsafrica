import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const rotatingWords = [
  "Designs",
  "Marketing",
  "Video",
  "Printing",
  "Branding",
  "Embroidery",
];

const atmosphericParticles = [
  { left: "5%", bottom: "4%", size: "3px", delay: 0, duration: 11, drift: -10 },
  { left: "13%", bottom: "2%", size: "2px", delay: 2.2, duration: 13, drift: 12 },
  { left: "22%", bottom: "8%", size: "3px", delay: 4.5, duration: 12, drift: -8 },
  { left: "31%", bottom: "1%", size: "2px", delay: 1.4, duration: 14, drift: 14 },
  { left: "40%", bottom: "6%", size: "3px", delay: 3.8, duration: 11.5, drift: -12 },
  { left: "50%", bottom: "3%", size: "2px", delay: 5.2, duration: 13.5, drift: 10 },
  { left: "59%", bottom: "7%", size: "3px", delay: 2.8, duration: 12.5, drift: -9 },
  { left: "68%", bottom: "2%", size: "2px", delay: 4.1, duration: 14.5, drift: 11 },
  { left: "77%", bottom: "6%", size: "3px", delay: 6, duration: 12.8, drift: -10 },
  { left: "87%", bottom: "3%", size: "2px", delay: 1.8, duration: 13.8, drift: 9 },
  { left: "95%", bottom: "7%", size: "3px", delay: 5.4, duration: 12.2, drift: -7 },
];

const TYPE_SPEED_MS = 95;
const DELETE_SPEED_MS = 58;
const WORD_HOLD_MS = 1250;
const BETWEEN_WORDS_MS = 320;

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // One pointer state drives every atmospheric layer. Each animated layer
  // uses animation only for scale/opacity, so pointer transforms never conflict.
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const smoothX = useSpring(pointerX, { stiffness: 95, damping: 20, mass: 0.55 });
  const smoothY = useSpring(pointerY, { stiffness: 95, damping: 20, mass: 0.55 });

  const smogOneX = useTransform(smoothX, [0, 100], [-130, 130]);
  const smogOneY = useTransform(smoothY, [0, 100], [-72, 72]);
  const smogOneRotate = useTransform(smoothX, [0, 100], [-5, 5]);
  const smogTwoX = useTransform(smoothX, [0, 100], [110, -110]);
  const smogTwoY = useTransform(smoothY, [0, 100], [62, -62]);
  const smogTwoRotate = useTransform(smoothX, [0, 100], [4, -4]);
  const liquidX = useTransform(smoothX, [0, 100], [-95, 95]);
  const liquidY = useTransform(smoothY, [0, 100], [38, -38]);
  const liquidRotate = useTransform(smoothX, [0, 100], [3, -3]);
  const geometryX = useTransform(smoothX, [0, 100], [-90, 90]);
  const geometryY = useTransform(smoothY, [0, 100], [-45, 45]);
  const geometryRotate = useTransform(smoothX, [0, 100], [-4, 4]);
  const glowX = useTransform(smoothX, [0, 100], [-120, 120]);
  const glowY = useTransform(smoothY, [0, 100], [-90, 90]);

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

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const nextY = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
    pointerX.set(nextX);
    pointerY.set(nextY);
  };

  const handlePointerLeave = () => {
    pointerX.set(50);
    pointerY.set(50);
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative h-[520px] min-h-[520px] w-full touch-pan-y overflow-hidden bg-ink-950 sm:h-[540px] sm:min-h-[540px] lg:h-[555px] lg:min-h-[555px]"
    >
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0, 199, 195, 0.74)" }} />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(65% 58% at 50% 46%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.06) 45%, rgba(0,94,105,0.1) 100%)" }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -left-[20%] top-0 h-[58%] w-[66%] rounded-[48%_52%_58%_42%/54%_44%_56%_46%] blur-[54px]"
          style={{ x: smogOneX, y: smogOneY, rotate: smogOneRotate, mixBlendMode: "screen", background: "radial-gradient(ellipse at 42% 52%, rgba(255,255,255,0.7) 0%, rgba(210,255,252,0.52) 30%, rgba(125,242,237,0.3) 52%, rgba(70,210,210,0.08) 72%, rgba(70,210,210,0) 86%)" }}
          animate={shouldReduceMotion ? { scale: 1, opacity: 0.88 } : { scale: [0.96, 1.08, 0.98, 1.05, 0.96], opacity: [0.74, 0.92, 0.78, 0.88, 0.74] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -right-[21%] top-[9%] h-[55%] w-[64%] rounded-[55%_45%_46%_54%/48%_58%_42%_52%] blur-[58px]"
          style={{ x: smogTwoX, y: smogTwoY, rotate: smogTwoRotate, mixBlendMode: "multiply", background: "radial-gradient(ellipse at 58% 46%, rgba(0,45,62,0.48) 0%, rgba(0,72,84,0.36) 32%, rgba(0,98,106,0.2) 56%, rgba(0,110,115,0.05) 75%, rgba(0,110,115,0) 88%)" }}
          animate={shouldReduceMotion ? { scale: 1, opacity: 0.78 } : { scale: [1.02, 0.94, 1.08, 0.96, 1.02], opacity: [0.66, 0.82, 0.7, 0.8, 0.66] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -left-[14%] top-[28%] h-[40%] w-[78%] rounded-[52%_48%_46%_54%/58%_42%_58%_42%] blur-[40px]"
          style={{ x: liquidX, y: liquidY, rotate: liquidRotate, mixBlendMode: "screen", background: "linear-gradient(112deg, rgba(255,255,255,0) 5%, rgba(238,255,254,0.18) 28%, rgba(255,255,255,0.36) 49%, rgba(161,251,247,0.2) 67%, rgba(161,251,247,0) 94%)" }}
          animate={shouldReduceMotion ? { scaleX: 1, scaleY: 1, opacity: 0.28 } : { scaleX: [0.9, 1.08, 0.96, 1.12, 0.9], scaleY: [1, 0.92, 1.06, 0.96, 1], opacity: [0.2, 0.4, 0.26, 0.36, 0.2] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        <motion.svg
          className="absolute inset-[-12%] h-[124%] w-[124%]"
          viewBox="0 0 1200 700"
          fill="none"
          style={{
            x: geometryX,
            y: geometryY,
            rotate: geometryRotate,
            maskImage: "linear-gradient(90deg, black 0%, black 24%, rgba(0,0,0,0.92) 31%, rgba(0,0,0,0.18) 44%, rgba(0,0,0,0.12) 56%, rgba(0,0,0,0.92) 69%, black 76%, black 100%)",
            WebkitMaskImage: "linear-gradient(90deg, black 0%, black 24%, rgba(0,0,0,0.92) 31%, rgba(0,0,0,0.18) 44%, rgba(0,0,0,0.12) 56%, rgba(0,0,0,0.92) 69%, black 76%, black 100%)",
          }}
        >
          <motion.path d="M-60 230 C 130 60, 285 390, 480 225 S 850 70, 1260 250" stroke="rgba(255,255,255,0.42)" strokeWidth="1.65" strokeLinecap="round" animate={shouldReduceMotion ? { opacity: 0.36 } : { opacity: [0.28, 0.48, 0.34, 0.46, 0.28] }} transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
          <motion.path d="M-80 330 C 140 160, 300 500, 535 305 S 880 135, 1290 350" stroke="rgba(255,255,255,0.34)" strokeWidth="1.35" strokeLinecap="round" animate={shouldReduceMotion ? { opacity: 0.28 } : { opacity: [0.2, 0.38, 0.24, 0.36, 0.2] }} transition={{ duration: 19, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
          <motion.path d="M-70 455 C 170 275, 335 570, 575 390 S 915 245, 1270 465" stroke="rgba(220,255,253,0.32)" strokeWidth="1.15" strokeLinecap="round" animate={shouldReduceMotion ? { opacity: 0.22 } : { opacity: [0.16, 0.32, 0.2, 0.3, 0.16] }} transition={{ duration: 23, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
          <motion.path d="M100 90 C 300 230, 410 50, 620 175 S 930 330, 1190 130" stroke="rgba(255,255,255,0.26)" strokeWidth="1.05" strokeLinecap="round" animate={shouldReduceMotion ? { opacity: 0.18 } : { opacity: [0.12, 0.25, 0.14, 0.23, 0.12] }} transition={{ duration: 27, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
          <motion.circle cx="180" cy="175" r="115" stroke="rgba(255,255,255,0.2)" strokeWidth="1" animate={shouldReduceMotion ? { opacity: 0.13 } : { opacity: [0.09, 0.2, 0.11, 0.18, 0.09], scale: [0.98, 1.04, 0.99, 1.03, 0.98] }} transition={{ duration: 21, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
          <motion.circle cx="1020" cy="505" r="150" stroke="rgba(220,255,253,0.18)" strokeWidth="1" animate={shouldReduceMotion ? { opacity: 0.12 } : { opacity: [0.08, 0.18, 0.1, 0.16, 0.08], scale: [1, 0.96, 1.03, 0.98, 1] }} transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
        </motion.svg>

        <motion.div
          className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[34px]"
          style={{ x: glowX, y: glowY, background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0) 72%)" }}
          animate={shouldReduceMotion ? { opacity: 0.18, scale: 1 } : { opacity: [0.1, 0.18, 0.12, 0.2, 0.1], scale: [0.94, 1.08, 0.98, 1.04, 0.94] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        <div className="absolute inset-x-0 bottom-[42px] h-[30%] overflow-hidden sm:bottom-[46px]" aria-hidden="true">
          {atmosphericParticles.map((particle, index) => (
            <motion.span
              key={`${particle.left}-${index}`}
              className={`absolute rounded-full bg-white/90 blur-[0.5px] ${index > 7 ? "hidden sm:block" : ""}`}
              style={{ left: particle.left, bottom: particle.bottom, width: particle.size, height: particle.size, boxShadow: "0 0 14px rgba(235,255,254,0.55)" }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={shouldReduceMotion ? { opacity: 0.12 } : { opacity: [0, 0.34, 0.2, 0], x: [0, particle.drift, particle.drift * -0.55, 0], y: [0, -22, -58, -92] }}
              transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: "radial-gradient(34% 30% at 50% 45%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 72%)" }} />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col items-center justify-center px-5 pb-6 pt-14 text-center sm:px-6 sm:pb-8">
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.035em] text-black sm:text-[2rem] md:text-[2.35rem] lg:text-[2.8rem] xl:text-[3.1rem]">
          <span className="block whitespace-nowrap">We make your brand</span>
          <span className="block whitespace-nowrap">stand out through</span>
          <span className="relative block min-h-[1.08em] text-white" aria-live="polite" aria-label={rotatingWords[wordIndex]}>
            <span className="inline-flex min-w-[9ch] items-baseline justify-center font-extrabold">
              {typedWord}
              <span aria-hidden="true" className="ml-[3px] inline-block h-[0.88em] w-[2px] translate-y-[0.04em] bg-white/90 animate-pulse align-baseline" />
            </span>
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }} className="mt-4 max-w-[980px] px-2 font-poppins text-[12px] font-normal leading-[1.45] tracking-[-0.01em] text-black/90 sm:mt-5 sm:text-[14px] md:text-[15px] lg:text-[16px] lg:leading-[1.5]">
          <span className="block md:whitespace-nowrap">We bring together creativity, technology and strategy to build brands that connect, engage, and grow.</span>
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="mt-6 flex w-full flex-col items-center gap-2.5 sm:mt-8 sm:flex-row sm:justify-center sm:gap-3.5">
          <motion.div whileHover={{ y: -2, boxShadow: "0 14px 34px rgba(5,11,31,0.16)" }} whileTap={{ scale: 0.975 }}>
            <Link to="/portfolio" className="inline-flex h-[45px] min-w-[205px] items-center justify-center border border-white bg-white px-5 font-poppins text-[13px] font-medium tracking-[-0.01em] text-[#050b1f] shadow-[0_8px_22px_rgba(5,11,31,0.08)] transition-all duration-300 hover:border-[#050b1f] hover:bg-[#050b1f] hover:text-white hover:shadow-[0_10px_28px_rgba(5,11,31,0.16)] active:bg-[#050b1f] active:text-white sm:h-[47px] sm:min-w-[195px] sm:text-[13.5px]">View our Portfolio</Link>
          </motion.div>
          <motion.div whileHover={{ y: -2, boxShadow: "0 12px 34px rgba(255,255,255,0.18)" }} whileTap={{ scale: 0.975 }}>
            <Link to="/services" className="inline-flex h-[45px] min-w-[205px] items-center justify-center border border-white/90 bg-transparent px-5 font-poppins text-[13px] font-medium tracking-[-0.01em] text-white shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300 hover:border-white hover:bg-white/95 hover:text-[#050b1f] hover:shadow-[0_10px_28px_rgba(255,255,255,0.18)] active:bg-white active:text-[#050b1f] sm:h-[47px] sm:min-w-[205px] sm:text-[13.5px]">Explore Our Services</Link>
          </motion.div>
          <motion.div whileHover={{ y: -2, boxShadow: "0 12px 34px rgba(255,255,255,0.18)" }} whileTap={{ scale: 0.975 }}>
            <Link to="/contact" className="inline-flex h-[45px] min-w-[205px] items-center justify-center border border-white/90 bg-transparent px-5 font-poppins text-[13px] font-medium tracking-[-0.01em] text-white shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300 hover:border-white hover:bg-white/95 hover:text-[#050b1f] hover:shadow-[0_10px_28px_rgba(255,255,255,0.18)] active:bg-[#050b1f] active:text-white sm:h-[47px] sm:min-w-[205px] sm:text-[13.5px]">Start a Project</Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[42px] overflow-hidden border-t border-white/15 bg-[#050b1f]/10 backdrop-blur-[3px] sm:h-[46px]" aria-label="Creative services motion strip">
        <div className="absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#00c7c3]/55 to-transparent sm:w-24" aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#00c7c3]/55 to-transparent sm:w-24" aria-hidden="true" />
        <motion.div className="flex h-full w-max items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }}>
          {[...rotatingWords, ...rotatingWords].map((word, index) => (
            <motion.div key={`${word}-${index}`} className="flex h-full shrink-0 items-center px-5 sm:px-7" animate={{ y: [0, -1.5, 0], opacity: [0.72, 1, 0.72] }} transition={{ duration: 3.8 + (index % 3) * 0.6, repeat: Infinity, ease: "easeInOut", delay: (index % rotatingWords.length) * 0.35 }}>
              <span className="font-poppins text-[8px] font-semibold uppercase tracking-[0.3em] text-white/90 sm:text-[9px] sm:tracking-[0.34em]">{word}</span>
              <span className="ml-5 h-[3px] w-[3px] rotate-45 rounded-[1px] bg-white/70 sm:ml-7" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}