import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink-950 px-6 py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 100% at 50% 100%, rgba(14,171,143,0.25), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-semibold text-white sm:text-5xl"
        >
          Ready to grow faster?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-white/60"
        >
          Tell us about your business — we'll reply on WhatsApp within the day
          with a clear next step.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 grid gap-4 sm:grid-cols-3"
        >
          <a
            href="https://wa.me/255750126654"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-point-500 px-6 py-4 text-sm font-semibold text-ink-950 transition hover:bg-point-400"
          >
            Chat on WhatsApp
          </a>
          <a
            href="/contact"
            className="rounded-2xl border border-white/15 px-6 py-4 text-sm font-medium text-white/85 transition hover:border-white/30 hover:bg-white/5"
          >
            Request Consultation
          </a>
          <a
            href="/contact"
            className="rounded-2xl border border-white/15 px-6 py-4 text-sm font-medium text-white/85 transition hover:border-white/30 hover:bg-white/5"
          >
            Request Quotation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
