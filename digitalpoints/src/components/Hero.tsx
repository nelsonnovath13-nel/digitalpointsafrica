import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const rotatingWords = [
  "Designs",
  "Marketing",
  "Video",
  "Printing",
  "Branding",
  "Embroidery",
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

  return (
    <section className="relative h-[520px] min-h-[520px] w-full overflow-hidden bg-ink-950 sm:h-[540px] sm:min-h-[540px] lg:h-[555px] lg:min-h-[555px]">
      <div className="absolute inset-0" style={{ backgroundColor: "#050B0B" }} />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(65% 58% at 50% 46%, rgba(20,184,166,0.10) 0%, rgba(20,184,166,0.035) 45%, rgba(0,0,0,0) 100%)" }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col items-center justify-center px-5 pb-6 pt-14 text-center sm:px-6 sm:pb-8">
        <h1 className="font-display text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[2rem] md:text-[2.35rem] lg:text-[2.8rem] xl:text-[3.1rem]">
          <span className="block whitespace-nowrap">We make your brand</span>
          <span className="block whitespace-nowrap">stand out through</span>
          <span className="relative block min-h-[1.08em] text-white" aria-live="polite" aria-label={rotatingWords[wordIndex]}>
            <span className="inline-flex min-w-[9ch] items-baseline justify-center font-extrabold">
              {typedWord}
              <span aria-hidden="true" className="ml-[3px] inline-block h-[0.88em] w-[2px] translate-y-[0.04em] bg-white/90 animate-pulse align-baseline" />
            </span>
          </span>
        </h1>

        <p className="mt-4 max-w-[980px] px-2 font-poppins text-[12px] font-normal leading-[1.45] tracking-[-0.01em] text-white/80 sm:mt-5 sm:text-[14px] md:text-[15px] lg:text-[16px] lg:leading-[1.5]">
          <span className="block md:whitespace-nowrap">We bring together creativity, technology and strategy to build brands that connect, engage, and grow.</span>
        </p>

        <div className="mt-6 flex w-full flex-col items-center gap-2.5 sm:mt-8 sm:flex-row sm:justify-center sm:gap-3.5">
          <div>
            <Link to="/portfolio" className="inline-flex h-[45px] min-w-[205px] items-center justify-center border border-white bg-white px-5 font-poppins text-[13px] font-medium tracking-[-0.01em] text-[#050b1f] shadow-[0_8px_22px_rgba(5,11,31,0.08)] transition-colors duration-300 hover:border-[#050b1f] hover:bg-[#050b1f] hover:text-white active:bg-[#050b1f] active:text-white sm:h-[47px] sm:min-w-[195px] sm:text-[13.5px]">View our Portfolio</Link>
          </div>
          <div>
            <Link to="/services" className="inline-flex h-[45px] min-w-[205px] items-center justify-center border border-white/90 bg-transparent px-5 font-poppins text-[13px] font-medium tracking-[-0.01em] text-white transition-colors duration-300 hover:border-white hover:bg-white/95 hover:text-[#050b1f] active:bg-white active:text-[#050b1f] sm:h-[47px] sm:min-w-[205px] sm:text-[13.5px]">Explore Our Services</Link>
          </div>
          <div>
            <Link to="/contact" className="inline-flex h-[45px] min-w-[205px] items-center justify-center border border-white/90 bg-transparent px-5 font-poppins text-[13px] font-medium tracking-[-0.01em] text-white transition-colors duration-300 hover:border-white hover:bg-white/95 hover:text-[#050b1f] active:bg-white active:text-[#050b1f] sm:h-[47px] sm:min-w-[205px] sm:text-[13.5px]">Start a Project</Link>
          </div>
        </div>
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
