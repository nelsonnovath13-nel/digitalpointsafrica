import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Brand splash shown on a fresh site load (not on in-app route changes —
 * it lives outside <Routes> so it only mounts once per app boot), then
 * again after a long gap away (REPEAT_AFTER_MS). Purely decorative:
 * aria-hidden, no focusable content, unmounts itself from the DOM once
 * finished, and never blocks navigation beyond its own brief, fixed-
 * position overlay.
 *
 * Colors/fonts are the same ones Header.tsx uses for the wordmark, so this
 * intentionally does not introduce new brand tokens.
 */

const LAST_SEEN_KEY = "dp-intro-last-seen";
const REPEAT_AFTER_MS = 24 * 60 * 60 * 1000; // show again after a day away
const WELCOME_MS = 500;
const BRAND_HOLD_MS = 650;
const EXIT_MS = 380;
const REDUCED_MOTION_MS = 90;

function LogoMark() {
  return (
    <div className="text-center leading-[0.92]">
      <div
        className="font-poppins font-extrabold tracking-[0.02em] text-[#8f97a3] text-[clamp(3.5rem,15vw,4.5rem)] sm:text-[clamp(4.5rem,9vw,6rem)]"
      >
        DIGITAL
      </div>
      <div
        className="font-poppins font-extrabold tracking-[0.02em] text-[#08c9c5] text-[clamp(3.5rem,15vw,4.5rem)] sm:text-[clamp(4.5rem,9vw,6rem)]"
      >
        POINTS
      </div>
    </div>
  );
}

export default function LogoIntro() {
  const reducedMotion = useReducedMotion();
  const [shouldRender] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const lastSeen = Number(window.localStorage.getItem(LAST_SEEN_KEY) ?? 0);
      if (Date.now() - lastSeen < REPEAT_AFTER_MS) return false;
      window.localStorage.setItem(LAST_SEEN_KEY, String(Date.now()));
      return true;
    } catch {
      return true;
    }
  });
  const [visible, setVisible] = useState(shouldRender);
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    if (!shouldRender) return;

    if (reducedMotion) {
      const t = setTimeout(() => setVisible(false), REDUCED_MOTION_MS);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => setShowBrand(true), WELCOME_MS);
    const t2 = setTimeout(() => setVisible(false), WELCOME_MS + BRAND_HOLD_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [shouldRender, reducedMotion]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? REDUCED_MOTION_MS / 1000 : EXIT_MS / 1000, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-[#07090a]"
        >
          {reducedMotion ? (
            <LogoMark />
          ) : (
            <AnimatePresence mode="wait">
              {!showBrand ? (
                <motion.p
                  key="welcome"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="font-poppins text-sm font-medium uppercase tracking-[0.35em] text-white/55 sm:text-base"
                >
                  Welcome to
                </motion.p>
              ) : (
                <motion.div
                  key="brand"
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <LogoMark />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
