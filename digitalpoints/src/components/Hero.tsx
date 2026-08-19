import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const rotatingWords = [
  "DESIGN",
  "MARKETING",
  "VIDEO",
  "PRINTING",
  "BRANDING",
  "EMBROIDERY",
];

const ROTATE_INTERVAL_MS = 2800;
const FLASH_DURATION_MS = 260;
const HERO_BG_URL = "/hero-bg.jpg";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

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
          className="absolute -left-[14%] top-[7%] h-[38%] w-[46%] rounded-full bg-[#8ff8f2]/20 blur-[55px]"
          style={{ x: smogOneX, y: smogOneY }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.42, 0.62, 0.42] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-[12%] top-[28%] h-[34%] w-[42%] rounded-full bg-[#006f73]/18 blur-[60px]"
          style={{ x: smogTwoX, y: smogTwoY }}
          animate={{ scale: [1.04, 0.96, 1.04], opacity: [0.32, 0.52, 0.32] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[24%] -bottom-[18%] h-[42%] w-[54%] rounded-full bg-white/10 blur-[70px]"
          style={{ x: smogThreeX, y: smogThreeY }}
          animate={{ scale: [0.96, 1.05, 0.96], opacity: [0.24, 0.4, 0.24] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00aaa8]/12 blur-[75px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.34, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
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
              className="inline-flex h-[45px] min-w-[205px] items-center justify-center border border-white/90 bg-transparent px-5 font-poppins text-[13px] font-medium tracking-[-0.01em] text-white shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300 hover:border-white hover:bg-white/95 hover:text-[#050b1f] hover:shadow-[0_10px_28px_rgba(255,255,255,0.18)] active:bg-white active:text-[#050b1f] sm:h-[47px] sm:min-w-[185px] sm:text-[13.5px]"
            >
              Start a Project
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[38px] overflow-hidden border-t border-white/15 bg-[#050b1f]/10 backdrop-blur-[2px] sm:h-[42px]" aria-label="Creative services motion strip">
        <motion.div
          className="flex h-full w-max items-center gap-7 px-4 sm:gap-10 sm:px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...rotatingWords, ...rotatingWords].map((word, index) => (
            <div key={`${word}-${index}`} className="flex shrink-0 items-center gap-7 whitespace-nowrap sm:gap-10">
              <span className="font-poppins text-[9px] font-medium uppercase tracking-[0.22em] text-white/85 sm:text-[10px]">{word}</span>
              <span className="h-1 w-1 rounded-full bg-white/65" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
