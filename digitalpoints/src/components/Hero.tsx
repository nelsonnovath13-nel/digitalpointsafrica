import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const rotatingWords = [
  "DESIGN",
  "MARKETING",
  "VIDEO",
  "PRINTING",
  "BRANDING",
  "EMBROIDERY",
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

const ROTATE_INTERVAL_MS = 2800;
const FLASH_DURATION_MS = 260;
const HERO_BG_URL = "/hero-bg.jpg";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 22, mass: 0.7 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 22, mass: 0.7 });
  const smogOneX = useTransform(smoothX, [0, 100], [-55, 55]);
  const smogOneY = useTransform(smoothY, [0, 100], [-35, 35]);
  const smogTwoX = useTransform(smoothX, [0, 100], [45, -45]);
  const smogTwoY = useTransform(smoothY, [0, 100], [30, -30]);
  const smogThreeX = useTransform(smoothX, [0, 100], [-28, 28]);
  const smogThreeY = useTransform(smoothY, [0, 100], [24, -24]);

  useEffect(() => {
    let flashTimeout: ReturnType<typeof setTimeout>;

    const id = setInterval(() => {
      setIsFlashing(true);
      flashTimeout = setTimeout(() => {
        setWordIndex((i) => (i + 1) % rotatingWords.length);
        setIsFlashing(false);
      }, FLASH_DURATION_MS);
    }, ROTATE_INTERVAL_MS);

    return () => {
      clearInterval(id);
      clearTimeout(flashTimeout);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  const handlePointerLeave = () => {
    pointerX.set(50);
    pointerY.set(50);
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative h-[520px] min-h-[520px] w-full overflow-hidden bg-ink-950 sm:h-[540px] sm:min-h-[540px] lg:h-[555px] lg:min-h-[555px]"
    >
      <div
        className="absolute inset-0 scale-110 bg-[center_30%] bg-cover bg-no-repeat sm:bg-center"
        style={{
          backgroundImage: `url(${HERO_BG_URL})`,
          filter: "blur(1.5px)",
        }}
      />

      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0, 199, 195, 0.74)" }} />

      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(60% 45% at 50% 45%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -left-[18%] top-[1%] h-[46%] w-[55%] rounded-[48%_52%_58%_42%/54%_44%_56%_46%] blur-[58px]"
          style={{
            x: smogOneX,
            y: smogOneY,
            mixBlendMode: "screen",
            background:
              "radial-gradient(ellipse at 42% 52%, rgba(190,255,250,0.48) 0%, rgba(130,247,240,0.28) 34%, rgba(80,220,218,0.08) 56%, rgba(80,220,218,0) 78%)",
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.62 }
              : { scale: [0.98, 1.1, 0.96, 1.04, 0.98], rotate: [0, 1.8, -1.1, 1, 0], opacity: [0.48, 0.7, 0.54, 0.64, 0.48] }
          }
          transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -right-[19%] top-[15%] h-[43%] w-[52%] rounded-[55%_45%_46%_54%/48%_58%_42%_52%] blur-[62px]"
          style={{
            x: smogTwoX,
            y: smogTwoY,
            mixBlendMode: "multiply",
            background:
              "radial-gradient(ellipse at 58% 46%, rgba(0,72,82,0.34) 0%, rgba(0,91,101,0.22) 36%, rgba(0,103,111,0.08) 58%, rgba(0,103,111,0) 80%)",
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.62 }
              : { scale: [1.02, 0.94, 1.08, 0.98, 1.02], rotate: [0, -1.6, 1.1, -0.8, 0], opacity: [0.48, 0.68, 0.52, 0.62, 0.48] }
          }
          transition={{ duration: 31, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        <motion.div
          className="absolute left-[12%] -bottom-[25%] h-[50%] w-[70%] rounded-[42%_58%_52%_48%/58%_42%_58%_42%] blur-[68px]"
          style={{
            x: smogThreeX,
            y: smogThreeY,
            mixBlendMode: "screen",
            background:
              "radial-gradient(ellipse at 50% 38%, rgba(236,255,254,0.3) 0%, rgba(178,247,244,0.16) 36%, rgba(122,235,232,0.06) 58%, rgba(122,235,232,0) 80%)",
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.42 }
              : { scale: [0.96, 1.08, 0.99, 1.05, 0.96], rotate: [0, 1.1, -0.9, 0.6, 0], opacity: [0.32, 0.48, 0.36, 0.44, 0.32] }
          }
          transition={{ duration: 34, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        <motion.div
          className="absolute left-[31%] top-[30%] h-[42%] w-[39%] rounded-[58%_42%_48%_52%/44%_56%_44%_56%] blur-[72px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(127,250,245,0.22) 0%, rgba(91,235,231,0.11) 38%, rgba(91,235,231,0) 78%)",
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.3 }
              : { x: [0, -18, 14, -8, 0], y: [0, 12, -10, 7, 0], scale: [0.96, 1.1, 0.98, 1.06, 0.96], opacity: [0.22, 0.36, 0.26, 0.32, 0.22] }
          }
          transition={{ duration: 29, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        <motion.div
          className="absolute left-[-8%] top-[48%] h-[22%] w-[42%] rounded-[52%_48%_62%_38%/48%_58%_42%_52%] blur-[48px]"
          style={{
            background:
              "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(214,255,252,0.14) 40%, rgba(214,255,252,0.04) 62%, rgba(214,255,252,0) 100%)",
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.24 }
              : { x: [0, 100, 180, 250], y: [0, -8, 6, 0], scaleX: [0.9, 1.08, 1.18, 0.9], opacity: [0.14, 0.28, 0.2, 0.14] }
          }
          transition={{ duration: 38, repeat: Infinity, repeatType: "mirror", ease: [0.42, 0, 0.58, 1] }}
        />

        <div className="absolute inset-x-0 bottom-[42px] h-[30%] overflow-hidden sm:bottom-[46px]" aria-hidden="true">
          {atmosphericParticles.map((particle, index) => (
            <motion.span
              key={`${particle.left}-${index}`}
              className={`absolute rounded-full bg-white/90 blur-[0.5px] ${index > 7 ? "hidden sm:block" : ""}`}
              style={{
                left: particle.left,
                bottom: particle.bottom,
                width: particle.size,
                height: particle.size,
                boxShadow: "0 0 14px rgba(235,255,254,0.55)",
              }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 0.12 }
                  : { opacity: [0, 0.34, 0.2, 0], x: [0, particle.drift, particle.drift * -0.55, 0], y: [0, -22, -58, -92] }
              }
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(32% 28% at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 72%)",
        }}
      />

      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FLASH_DURATION_MS / 1000, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 z-20 bg-white"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col items-center justify-center px-5 pb-6 pt-14 text-center sm:px-6 sm:pb-8">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.035em] text-black sm:text-[2rem] md:text-[2.35rem] lg:text-[2.8rem] xl:text-[3.1rem]"
        >
          <span className="block whitespace-nowrap">Everything your brand needs</span>
          <span className="block">to succeed through</span>
          <span className="relative block min-h-[1.08em]">
            <AnimatePresence>
              {isFlashing && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1.7 }}
                  exit={{ opacity: 0, scale: 2 }}
                  transition={{ duration: FLASH_DURATION_MS / 1000, ease: "easeOut" }}
                  className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[1.4em] w-[4em] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 25%, rgba(255,255,255,0) 70%)",
                  }}
                />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[wordIndex]}
                initial={{ opacity: 0, y: 12, scale: 0.96, filter: "blur(4px)", color: "#000000" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", color: isFlashing ? "#ffffff" : "#000000" }}
                exit={{ opacity: 0, y: -12, scale: 0.96, filter: "blur(4px)", color: "#ffffff" }}
                transition={{
                  opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  y: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  filter: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  color: { duration: FLASH_DURATION_MS / 1000, ease: "easeOut" },
                }}
                className="relative z-10 inline-block font-extrabold"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-[920px] px-2 font-poppins text-[12px] font-normal leading-[1.45] tracking-[-0.01em] text-black/90 sm:mt-5 sm:text-[14px] md:text-[15px] lg:text-[16px] lg:leading-[1.5]"
        >
          We bring together creativity, technology, and strategy to build brands that connect, engage and grow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex w-full flex-col items-center gap-2.5 sm:mt-8 sm:flex-row sm:justify-center sm:gap-3.5"
        >
          <motion.div whileHover={{ y: -2, boxShadow: "0 14px 34px rgba(5,11,31,0.16)" }} whileTap={{ scale: 0.975 }}>
            <Link
              to="/portfolio"
              className="inline-flex h-[45px] min-w-[205px] items-center justify-center border border-white bg-white px-5 font-poppins text-[13px] font-medium tracking-[-0.01em] text-[#050b1f] shadow-[0_8px_22px_rgba(5,11,31,0.08)] transition-all duration-300 hover:border-[#050b1f] hover:bg-[#050b1f] hover:text-white hover:shadow-[0_10px_28px_rgba(5,11,31,0.16)] active:bg-[#050b1f] active:text-white sm:h-[47px] sm:min-w-[195px] sm:text-[13.5px]"
            >
              View our Portfolio
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2, boxShadow: "0 12px 34px rgba(255,255,255,0.18)" }} whileTap={{ scale: 0.975 }}>
            <Link
              to="/services"
              className="inline-flex h-[45px] min-w-[205px] items-center justify-center border border-white/90 bg-transparent px-5 font-poppins text-[13px] font-medium tracking-[-0.01em] text-white shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300 hover:border-white hover:bg-white/95 hover:text-[#050b1f] hover:shadow-[0_10px_28px_rgba(255,255,255,0.18)] active:bg-white active:text-[#050b1f] sm:h-[47px] sm:min-w-[205px] sm:text-[13.5px]"
            >
              Explore Our Services
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2, boxShadow: "0 12px 34px rgba(255,255,255,0.18)" }} whileTap={{ scale: 0.975 }}>
            <Link
              to="/contact"
              className="inline-flex h-[45px] min-w-[205px] items-center justify-center border border-white/90 bg-transparent px-5 font-poppins text-[13px] font-medium tracking-[-0.01em] text-white shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300 hover:border-white hover:bg-white/95 hover:text-[#050b1f] hover:shadow-[0_10px_28px_rgba(255,255,255,0.18)] active:bg-white active:text-[#050b1f] sm:h-[47px] sm:min-w-[205px] sm:text-[13.5px]"
            >
              Start a Project
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[42px] overflow-hidden border-t border-white/15 bg-[#050b1f]/10 backdrop-blur-[3px] sm:h-[46px]" aria-label="Creative services motion strip">
        <div
          className="absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#00c7c3]/55 to-transparent sm:w-24"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#00c7c3]/55 to-transparent sm:w-24"
          aria-hidden="true"
        />

        <motion.div
          className="flex h-full w-max items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        >
          {[...rotatingWords, ...rotatingWords].map((word, index) => (
            <motion.div
              key={`${word}-${index}`}
              className="flex h-full shrink-0 items-center px-5 sm:px-7"
              animate={{ y: [0, -1.5, 0], opacity: [0.72, 1, 0.72] }}
              transition={{
                duration: 3.8 + (index % 3) * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index % rotatingWords.length) * 0.35,
              }}
            >
              <span className="font-poppins text-[8px] font-semibold uppercase tracking-[0.3em] text-white/90 sm:text-[9px] sm:tracking-[0.34em]">
                {word}
              </span>
              <span className="ml-5 h-[3px] w-[3px] rotate-45 rounded-[1px] bg-white/70 sm:ml-7" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
