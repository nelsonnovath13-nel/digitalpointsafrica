import { motion } from "framer-motion";

const tiles = [
  {
    label: "Event & Conference Coverage",
    photo: "/media/gallery/event-conference.jpg",
    span: "sm:col-span-3 sm:row-span-2",
    aspect: "aspect-[4/5] sm:aspect-auto",
  },
  {
    label: "Portrait Photography",
    photo: "/media/gallery/portrait-unicef.jpg",
    span: "sm:col-span-2",
    aspect: "aspect-[4/3]",
  },
  {
    label: "Aerial & Drone Filming",
    photo: "/media/gallery/aerial-community.jpg",
    span: "sm:col-span-2",
    aspect: "aspect-[4/3]",
  },
  {
    label: "Documentary & NGO Campaigns",
    photo: "/media/gallery/school-outreach.jpg",
    span: "sm:col-span-3",
    aspect: "aspect-[16/9]",
  },
  {
    label: "Government & Public Events",
    photo: "/media/gallery/public-event-signage.jpg",
    span: "sm:col-span-2",
    aspect: "aspect-[4/3]",
  },
];

export default function ImageMosaic() {
  return (
    <section className="relative z-10 -mt-8 bg-cream-50 px-6 pb-24 pt-2 sm:-mt-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
            Our Work
          </span>
          <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
            Real footage, real clients
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 sm:auto-rows-[160px]">
          {tiles.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative ${t.aspect} ${t.span} overflow-hidden rounded-3xl border border-ink-950/5 shadow-lg`}
            >
              <img
                src={t.photo}
                alt={t.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent transition-opacity duration-300 group-hover:from-ink-950/90" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.12),transparent_55%)]" />
              <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-point-400 to-accent-500 transition-transform duration-300 group-hover:scale-x-100" />

              <div className="absolute inset-x-0 bottom-0 flex items-end p-5 sm:p-6">
                <p className="text-sm font-semibold text-white sm:text-base">{t.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
