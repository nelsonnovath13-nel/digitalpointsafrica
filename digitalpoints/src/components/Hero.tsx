import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <section className="relative h-[520px] min-h-[520px] w-full overflow-hidden bg-ink-950 sm:h-[540px] sm:min-h-[540px] lg:h-[555px] lg:min-h-[555px]">
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
          className="font-display text-[1.72rem] font-semibold leading-[1.07] tracking-[-0.035em] text-black sm:text-[2.3rem] md:text-[2.8rem] lg:text-[3.35rem] xl:text-[3.65rem]"
        >
          <span className="block whitespace-nowrap">Everything your brand needs</span>
          <span className="block">to succeed through</span>
          <span className="relative block min-h-[1.07em]">
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

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex w-full flex-col items-center gap-2.5 sm:mt-8 sm:flex-row sm:justify-center sm:gap-3.5"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.975 }}>
            <Link
              to="/portfolio"
              className="inline-flex h-[45px] min-w-[205px] items-center justify-center border border-white bg-white px-5 font-poppins text-[13px] font-medium tracking-[-0.01em] text-[#050b1f] shadow-[0_8px_22px_rgba(5,11,31,0.08)] transition-all duration-300 hover:border-[#050b1f] hover:bg-[#050b1f] hover:text-white hover:shadow-[0_10px_28px_rgba(5,11,31,0.16)] active:bg-[#050b1f] active:text-white sm:h-[47px] sm:min-w-[195px] sm:text-[13.5px]"
            >
              View our Portfolio
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.975 }}>
            <Link
              to="/services"
              className="inline-flex h-[45px] min-w-[205px] items-center justify-center border border-white/90 bg-transparent px-5 font-poppins text-[13px] font-medium tracking-[-0.01em] text-white shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300 hover:border-white hover:bg-white/95 hover:text-[#050b1f] hover:shadow-[0_10px_28px_rgba(255,255,255,0.18)] active:bg-white active:text-[#050b1f] sm:h-[47px] sm:min-w-[205px] sm:text-[13.5px]"
            >
              Explore Our Services
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.975 }}>
            <Link
              to="/contact"
              className="inline-flex h-[45px] min-w-[205px] items-center justify-center border border-white/90 bg-transparent px-5 font-poppins text-[13px] font-medium tracking-[-0.01em] text-white shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-300 hover:border-white hover:bg-white/95 hover:text-[#050b1f] hover:shadow-[0_10px_28px_rgba(255,255,255,0.18)] active:bg-white active:text-[#050b1f] sm:h-[47px] sm:min-w-[185px] sm:text-[13.5px]"
            >
              Start a Project
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
