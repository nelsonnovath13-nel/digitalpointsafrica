import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

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
    <section
      className="relative h-[520px] min-h-[520px] w-full overflow-hidden sm:h-[540px] sm:min-h-[540px] lg:h-[555px] lg:min-h-[555px]"
      style={{
        background: "radial-gradient(70% 55% at 50% 0%, rgba(8,189,184,0.07) 0%, rgba(8,189,184,0.02) 42%, rgba(0,0,0,0) 72%), #050B0B",
      }}
    >

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

        <div className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
          <Link to="/contact" className="inline-flex h-[46px] min-w-[180px] items-center justify-center rounded-full border border-[#08bdb8] bg-[#08bdb8] px-7 font-poppins text-[13px] font-medium tracking-[-0.01em] text-white shadow-[0_0_0_0_rgba(8,189,184,0)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-[#18d1cc] hover:bg-[#10aaa6] hover:shadow-[0_14px_32px_-12px_rgba(8,189,184,0.55)] active:translate-y-0 active:scale-[0.98] sm:h-[48px] sm:min-w-[185px] sm:text-[13.5px]">Get Started</Link>
          <Link to="/portfolio" className="inline-flex h-[46px] min-w-[180px] items-center justify-center rounded-full border border-white/70 bg-white/[0.02] px-7 font-poppins text-[13px] font-medium tracking-[-0.01em] text-white shadow-[0_0_0_0_rgba(255,255,255,0)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-white hover:bg-white/[0.08] hover:shadow-[0_14px_32px_-16px_rgba(255,255,255,0.24)] active:translate-y-0 active:scale-[0.98] sm:h-[48px] sm:min-w-[185px] sm:text-[13.5px]">View Portfolio</Link>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 sm:h-40"
        style={{ background: "linear-gradient(to bottom, rgba(247,243,234,0) 0%, rgba(247,243,234,0.16) 35%, rgba(247,243,234,0.58) 68%, #f7f3ea 100%)" }}
      />
    </section>
  );
}
