import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-cream-50 pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          About Digital Points
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">
          Built in Tanzania, for African businesses
        </h1>
        <p className="mt-5 text-ink-950/60">
          We started Digital Points to close the gap between how ambitious
          African businesses actually are, and how they show up online. Every
          project we take on is judged by one question: does this help our
          client win more customers.
        </p>
      </div>

      <div className="mx-auto mt-20 grid max-w-5xl gap-6 px-6 sm:grid-cols-2">
        {[
          { title: "Mission", body: "Give every serious business in Tanzania a digital presence that matches the quality of what they actually offer." },
          { title: "Vision", body: "To be the studio African businesses call first when they're ready to grow past word-of-mouth." },
        ].map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-3xl border border-ink-950/5 bg-white p-8 shadow-sm"
          >
            <h2 className="font-display text-xl font-semibold text-point-700">{b.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-950/60">{b.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-6">
        <h2 className="font-display text-2xl font-semibold text-ink-950">
          Registrations & Certificates
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {["Registered Business — Tanzania", "BRELA Certified", "Google Partner (In Progress)"].map(
            (c) => (
              <div
                key={c}
                className="rounded-xl border border-ink-950/5 bg-white p-5 text-sm text-ink-950/60 shadow-sm"
              >
                {c}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
