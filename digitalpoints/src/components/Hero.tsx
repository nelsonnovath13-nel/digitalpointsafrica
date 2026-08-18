import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden rounded-b-[2.5rem] bg-ink-950 sm:rounded-b-[4rem]">
      {/* Gradient base */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 18% 8%, #0d564b 0%, #07090a 55%), linear-gradient(150deg, #0a8873 0%, #07090a 62%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950/90" />

      {/* Content — the wrapper itself never intercepts the pointer; only real
         controls (links/buttons) opt back in with pointer-events-auto, so
         the geometry field underneath still receives every mouse/touch event. */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-auto mb-6 inline-flex items-center gap-2 rounded-full border border-point-400/30 bg-point-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-point-200"
        >
          Digital Points · Tanzania → Africa
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          We build the systems
          <br />
          your growth runs on
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-6 max-w-xl text-balance text-base text-white/60 sm:text-lg"
        >
          Media production, digital products and AI automation for businesses
          across Tanzania and Africa — engineered to turn attention into
          customers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="pointer-events-auto mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="https://wa.me/255714214247"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-point-500 px-7 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-point-400"
          >
            Chat on WhatsApp
            <span className="transition group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white/85 transition hover:border-white/30 hover:bg-white/5"
          >
            View Our Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
