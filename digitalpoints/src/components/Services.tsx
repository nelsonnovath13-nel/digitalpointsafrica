import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const services = [
  {
    title: "Media Production",
    desc: "Video, photography and content that makes people stop scrolling.",
    icon: "◆",
  },
  {
    title: "Digital Solutions",
    desc: "Websites, web apps and business systems built to convert.",
    icon: "◈",
  },
  {
    title: "AI Automation",
    desc: "WhatsApp bots and workflows that respond while you're offline.",
    icon: "◎",
  },
  {
    title: "Branding & Marketing",
    desc: "Identity, social media and Google presence people trust.",
    icon: "◇",
  },
];

function ServiceCard({ title, desc, icon, index }: (typeof services)[number] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative rounded-3xl border border-ink-950/5 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div
        className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-point-50 text-xl text-point-600"
        style={{ transform: "translateZ(30px)" }}
      >
        {icon}
      </div>
      <h3
        className="font-display text-xl font-semibold text-ink-950"
        style={{ transform: "translateZ(20px)" }}
      >
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-950/60" style={{ transform: "translateZ(20px)" }}>
        {desc}
      </p>
      <span className="mt-6 inline-block text-sm font-medium text-point-600 opacity-0 transition group-hover:opacity-100">
        Explore →
      </span>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="bg-dot-grid relative bg-cream-50 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-lg">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
            What We Do
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
            Four disciplines, one growth engine
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
