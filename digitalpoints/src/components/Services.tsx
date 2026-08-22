import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";

const services = [
  { title: "Digital Marketing", description: "We help businesses reach the right audience through social media, content, paid campaigns, and practical digital strategies designed to increase visibility, engagement, and enquiries.", tags: ["Social Media", "Content Marketing", "Paid Campaigns", "Digital Strategy"], visual: "MARKETING", image: "https://images.squarespace-cdn.com/content/v1/561646c6e4b0f890085faa02/1771484737308-OEDQ33ZIDCUD3NOF49P1/Social%2BMedia%2BManager%2Bwerden.png?format=1000w", imageAlt: "Creative marketing team planning a digital campaign" },
  { title: "Video Production", description: "We create engaging video content that helps businesses tell their story, showcase their work, explain their products, and connect with customers across digital platforms.", tags: ["Corporate Video", "Social Content", "Event Coverage", "Video Editing"], visual: "MEDIA", image: "https://images.pexels.com/photos/3649407/pexels-photo-3649407.jpeg", imageAlt: "Professional video camera filming an event" },
  { title: "Printing", description: "We turn your designs into professional printed materials that keep your business visible, consistent, and credible wherever your customers meet your brand offline.", tags: ["Business Cards", "Flyers", "Posters", "Large Format"], visual: "PRINT", image: "https://glcreaciones.com/cdn/shop/collections/imprenta_en_punta_cana_gl.jpg?v=1671078629", imageAlt: "Professional commercial printing press producing printed materials" },
  { title: "Promotional Items", description: "We help businesses stay memorable with useful branded items made for campaigns, events, teams, customers, and everyday brand visibility.", tags: ["Branded Gifts", "Corporate Items", "Campaign Materials", "Custom Orders"], visual: "PROMOTE", image: "https://merchloop.com/cdn/shop/articles/merchloop-company-swags_a2fafa07-a4c6-40d4-9e54-45d6c03d7a07.png?v=1766171136", imageAlt: "Premium branded corporate promotional products" },
  { title: "Branding Services", description: "We build visual identities that make businesses easier to recognise, trust, and remember, from the first impression to everyday brand communication.", tags: ["Logo Design", "Brand Identity", "Brand Guidelines", "Creative Direction"], visual: "BRAND", image: "https://static.wixstatic.com/media/96069e_6ed441267bc441c58d55e89ed31223ed~mv2.png/v1/fill/w_980,h_653,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/0J0A9022-Edit_heic.png", imageAlt: "Brand identity moodboard and creative direction workspace" },
  { title: "Embroidery", description: "We add a professional branded finish to clothing and fabric products with clean, durable embroidery made for teams, businesses, schools, and organisations.", tags: ["Workwear", "Uniforms", "Caps", "Custom Embroidery"], visual: "EMBROIDERY", image: "https://evergreenug.com/wp-content/uploads/2021/08/Embroidery-service-at-Evergreen-uniforms-and-textiles-uganda-768x512.png", imageAlt: "Commercial embroidery machine stitching a branded garment" },
] as const;

type Service = (typeof services)[number];
type Highlight = { title: "CREATE" | "BRAND" | "GROW"; description: string };
const highlights: Highlight[] = [
  { title: "CREATE", description: "We turn ideas into clear, creative content that gives your brand something worth noticing." },
  { title: "BRAND", description: "We shape memorable identities that make your business easier to recognise, trust, and remember." },
  { title: "GROW", description: "We turn attention into momentum through smarter marketing, stronger reach, and measurable results." },
];

function HighlightIcon({ title }: { title: Highlight["title"] }) {
  if (title === "CREATE") return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
      <path d="M18 34h84M28 27l-10 7 10 7M92 27l10 7-10 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M57 43 39 77c-2 4 1 8 5 8h14l8-31-9-11Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M57 85h8v8h-8z" fill="currentColor" />
      <path d="M20 43c3 15 10 24 19 30M100 43c-3 15-10 24-19 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
  if (title === "BRAND") return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
      <path d="m30 35 30-17 37 37-17 30a12 12 0 0 1-17 3L27 61a12 12 0 0 1 3-26Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m47 32 10 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="51" cy="34" r="5" fill="currentColor" />
    </svg>
  );
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
      <path d="M18 87h12V73h12v14h12V63h12v24h12V51h12v36h12" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 49c20 1 35-7 48-20 9-9 18-10 31-15" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="m91 14 10 0 0 10" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CursorSnow({ active, x, y }: { active: boolean; x: number; y: number }) {
  return (
    <motion.div aria-hidden="true" initial={false} animate={{ opacity: active ? 1 : 0, x, y, scale: active ? 1 : 0.55 }} transition={{ type: "spring", stiffness: 280, damping: 24, mass: 0.35 }} className="pointer-events-none fixed left-0 top-0 z-[100] block h-8 w-8 -translate-x-1/2 -translate-y-1/2 sm:h-10 sm:w-10 md:h-12 md:w-12">
      <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00B7FF] shadow-[0_0_28px_10px_rgba(0,183,255,0.38)] sm:h-7 sm:w-7 md:h-8 md:w-8" />
    </motion.div>
  );
}

function HighlightCards({ introRef }: { introRef: React.RefObject<HTMLElement | null> }) {
  const [order, setOrder] = useState([0, 1, 2]);
  const [isCycling, setIsCycling] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  const stackRef = useRef<HTMLDivElement>(null);
  const cycleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handlePointerMove = (event: globalThis.PointerEvent) => {
      const bounds = introRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      if (inside) setCursor({ x: event.clientX, y: event.clientY, active: true });
      else setCursor((current) => ({ ...current, active: false }));
    };
    const handlePointerLeave = () => setCursor((current) => ({ ...current, active: false }));
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [introRef]);

  useEffect(() => {
    return () => {
      if (cycleTimerRef.current !== null) window.clearTimeout(cycleTimerRef.current);
    };
  }, []);

  const handleStackPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const stack = stackRef.current;
    if (!stack) return;
    const bounds = stack.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: Math.max(-0.5, Math.min(0.5, y)) * -7, y: Math.max(-0.5, Math.min(0.5, x)) * 9 });
  };

  const handleStackPointerLeave = () => setTilt({ x: 0, y: 0 });

  const cycleCards = () => {
    if (isCycling) return;
    setIsCycling(true);
    cycleTimerRef.current = window.setTimeout(() => {
      setOrder((current) => [current[1], current[2], current[0]]);
      setIsCycling(false);
    }, 430);
  };

  const getCardPosition = (cardIndex: number) => order.indexOf(cardIndex);

  const cardStyle = (cardIndex: number) => {
    const position = getCardPosition(cardIndex);
    const isFront = position === 0;
    const isBack = position === 2;
    const leaving = isFront && isCycling;
    const transforms = [
      "translate3d(0, 0, 0) rotate(-5deg) scale(1)",
      "translate3d(30px, -16px, 0) rotate(4deg) scale(0.975)",
      "translate3d(62px, -54px, 0) rotate(11deg) scale(0.95)",
    ];
    return {
      zIndex: leaving ? 40 : 30 - position * 10,
      transform: leaving ? "translate3d(48px, -112px, 0) rotate(18deg) scale(0.92)" : transforms[position],
      opacity: leaving ? 0 : isBack ? 0.98 : 1,
    };
  };

  return (
    <div className="relative mx-auto mt-10 w-full max-w-[1120px] sm:mt-12 lg:mt-0 lg:max-w-none lg:self-stretch">
      <CursorSnow active={cursor.active} x={cursor.x} y={cursor.y} />

      <style>{`
        @keyframes dp-card-stack-float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -8px, 0); }
        }
        @keyframes dp-card-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dp-card-stack-float { animation: none !important; }
          .dp-card-stack-card,
          .dp-card-stack-progress { transition: none !important; animation: none !important; }
        }
      `}</style>

      <div className="relative hidden h-[360px] w-full items-center justify-center md:flex lg:h-[390px]">
        <div className="dp-card-stack-float relative flex h-full w-full items-center justify-center" style={{ animation: "dp-card-stack-float 5.8s ease-in-out infinite" }}>
          <div
            ref={stackRef}
            onPointerMove={handleStackPointerMove}
            onPointerLeave={handleStackPointerLeave}
            className="relative h-[260px] w-[390px] [perspective:1000px]"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 180ms ease-out",
            }}
          >
            {highlights.map((highlight, cardIndex) => {
              const position = getCardPosition(cardIndex);
              const isFront = position === 0;
              const colors = ["#2D8CFF", "#F05AA6", "#C89B3C"];
              return (
                <article
                  key={highlight.title}
                  aria-label={highlight.title}
                  onClick={isFront ? cycleCards : undefined}
                  onKeyDown={isFront ? (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); cycleCards(); } } : undefined}
                  role={isFront ? "button" : undefined}
                  tabIndex={isFront ? 0 : -1}
                  className={`dp-card-stack-card absolute left-1/2 top-1/2 flex h-[195px] w-[312px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#211f1f_0%,#080808_100%)] p-7 text-white shadow-[0_30px_70px_rgba(0,0,0,0.26)] select-none ${isFront ? "cursor-pointer pointer-events-auto" : "pointer-events-none"}`}
                  style={{
                    ...cardStyle(cardIndex),
                    transformOrigin: "center center",
                    transition: "transform 430ms cubic-bezier(0.22,1,0.36,1), opacity 300ms ease, box-shadow 300ms ease",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="dp-card-icon flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/[0.09] text-white/90 ring-1 ring-white/[0.08] backdrop-blur-sm [&>svg]:h-[21px] [&>svg]:w-[21px]">
                        <HighlightIcon title={highlight.title} />
                      </span>
                      <h3 className="font-display text-[1.8rem] font-semibold leading-none tracking-[-0.055em]">{highlight.title}</h3>
                    </div>
                    <span className="font-poppins pt-1 text-[9px] uppercase tracking-[0.28em] text-white/35">0{cardIndex + 1} / POINT</span>
                  </div>

                  <div className="flex flex-1 items-end">
                    <p className="max-w-[280px] font-display text-[0.94rem] leading-[1.4] tracking-[-0.012em] text-white/78">{highlight.description}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-white/45">
                    <span className="font-poppins text-[10px] uppercase tracking-[0.25em]">Explore</span>
                    <span aria-hidden="true" className="text-sm">↗</span>
                  </div>

                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[4px]" style={{ backgroundColor: colors[cardIndex] }}>
                    <span className="dp-card-stack-progress block h-full w-0" style={{ backgroundColor: colors[cardIndex], animation: `dp-card-progress 900ms cubic-bezier(0.22,1,0.36,1) ${cardIndex * 120}ms forwards` }} />
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
        {highlights.map((highlight, index) => (
          <article key={highlight.title} className="relative flex h-[410px] min-w-[calc(100vw-40px)] snap-center flex-col overflow-hidden rounded-[6px] bg-[#211f1f] p-8 text-white shadow-[0_24px_60px_rgba(0,0,0,0.16)]">
            <div className="flex items-start justify-between"><h3 className="font-display text-[2rem] font-semibold tracking-[-0.055em]">{highlight.title}</h3><span className="font-poppins text-[9px] uppercase tracking-[0.3em] text-white/35">0{index + 1}</span></div>
            <div className="flex flex-1 items-center justify-center text-white"><HighlightIcon title={highlight.title} /></div>
            <p className="font-display text-[1rem] leading-[1.4] tracking-[-0.012em] text-white/90">{highlight.description}</p>
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-[#00B7FF]" />
          </article>
        ))}
      </div>
      <p className="mt-2 text-center font-poppins text-[9px] uppercase tracking-[0.28em] text-black/35 md:hidden">Swipe to explore</p>
    </div>
  );
}

function ServiceCard({ service, index, progress }: { service: Service; index: number; progress: ReturnType<typeof useSpring> }) {
  const segment = 1 / services.length;
  const start = index === 0 ? 0 : (index - 1) * segment + segment * 0.62;
  const center = index * segment;
  const end = index === services.length - 1 ? 1 : index * segment + segment * 0.62;
  const cardX = useTransform(progress, [start, center, end], [index === 0 ? "0%" : "112%", "0%", index === services.length - 1 ? "0%" : "-112%"]);
  const opacity = useTransform(progress, [start, start + segment * 0.08, end - segment * 0.08, end], [index === 0 ? 1 : 0, 1, 1, index === services.length - 1 ? 1 : 0]);
  const scale = useTransform(progress, [start, center, end], [0.965, 1, 0.965]);
  const rotate = useTransform(progress, [start, center, end], [index === 0 ? 0 : 2, 0, index === services.length - 1 ? 0 : -2]);

  return (
    <motion.article aria-label={service.title} style={{ x: cardX, opacity, scale, rotate, zIndex: services.length - index }} className="absolute inset-x-0 top-[2vh] bottom-[2vh] overflow-hidden rounded-[24px] bg-[#08bdb8] shadow-[0_30px_90px_rgba(0,0,0,0.16)] sm:top-[2.5vh] sm:bottom-[2.5vh] sm:rounded-[32px] lg:top-[1.5vh] lg:bottom-[1.5vh] lg:rounded-[38px]">
      <div className="relative grid h-full grid-rows-[auto_minmax(0,1fr)] sm:grid-rows-[minmax(0,1fr)_39%] lg:grid-cols-[57%_43%] lg:grid-rows-1">
        <div className="relative z-20 flex min-h-0 flex-col p-5 pb-6 sm:p-8 lg:p-10 xl:p-12">
          <div className="pointer-events-none absolute -left-28 -top-24 h-72 w-72 rounded-full border-[40px] border-white/[0.14] sm:h-96 sm:w-96" />
          <div className="pointer-events-none absolute -right-28 bottom-[-8rem] h-80 w-80 rounded-full border-[38px] border-black/[0.035] sm:h-96 sm:w-96 lg:hidden" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[34%] overflow-hidden lg:block"><div className="absolute inset-0 bg-gradient-to-t from-[#08bdb8] via-[#08bdb8]/70 to-transparent" /><div className="absolute -bottom-24 left-[8%] h-52 w-[52%] rounded-full bg-white/[0.09] blur-3xl" /><div className="absolute -bottom-20 right-[2%] h-48 w-[48%] rounded-full bg-[#0a9f9b]/20 blur-3xl" /><div className="absolute bottom-[-6rem] left-[38%] h-44 w-[40%] rounded-full bg-white/[0.07] blur-2xl" /></div>
          <div className="relative z-20 flex items-center justify-between gap-5"><div className="flex items-center gap-3 text-[#145b59] sm:gap-4"><span className="h-px w-10 bg-[#145b59]/70 sm:w-16" /><span className="font-poppins text-[9px] font-medium uppercase tracking-[0.28em] sm:text-xs sm:tracking-[0.32em]">Our Services</span></div></div>
          <div className="relative z-20 mt-5 max-w-4xl sm:mt-7 lg:mt-8 xl:mt-10"><h3 className="font-display text-[clamp(2.25rem,5.4vw,5.4rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-black">{service.title}</h3><p className="mt-4 max-w-3xl font-display text-[clamp(0.9rem,1.35vw,1.3rem)] leading-[1.4] tracking-[-0.02em] text-[#101818] sm:mt-5 lg:max-w-2xl">{service.description}</p></div>
          <div className="relative z-20 mt-4 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2 lg:max-w-2xl">{service.tags.map((tag) => <span key={tag} className="border border-black/10 bg-black/[0.045] px-2.5 py-1.5 font-poppins text-[9px] font-medium text-black sm:px-3.5 sm:py-2 sm:text-xs">{tag}</span>)}</div>
          <div className="relative z-30 mt-5 flex items-center justify-end gap-5 sm:mt-7 lg:mt-auto lg:pt-8"><motion.a href={`/contact?service=${encodeURIComponent(service.title)}`} aria-label={`Learn more about ${service.title}`} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="group inline-flex min-h-[46px] w-fit shrink-0 items-center gap-3 whitespace-nowrap bg-[#211f1f] px-5 py-3 font-poppins text-xs font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-colors hover:bg-black sm:min-h-[50px] sm:px-6 sm:py-3.5 sm:text-sm lg:min-h-[54px] lg:px-7 lg:py-4 lg:text-base"><span>Learn More</span><span aria-hidden="true" className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1">↗</span></motion.a></div>
        </div>
        <div className="relative z-10 min-h-0 overflow-hidden lg:h-full"><motion.img src={service.image} alt={service.imageAlt} loading={index === 0 ? "eager" : "lazy"} className="h-full w-full object-cover object-center" initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} /><div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-[#08bdb8]/35" /><div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#08bdb8]/45 to-transparent lg:hidden" /><div className="absolute right-5 top-5 hidden font-poppins text-[10px] font-medium uppercase tracking-[0.28em] text-white/75 lg:block">{service.visual}</div><div className="absolute bottom-5 right-5 hidden h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/10 backdrop-blur-sm lg:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#08bdb8]" /></div></div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const introRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: showcaseRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 65, damping: 28, mass: 0.65 });
  const ambientX = useTransform(smoothProgress, [0, 1], ["0%", "-9%"]);
  const ambientScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.06, 1]);
  const ambientOpacity = useTransform(smoothProgress, [0, 0.08, 0.92, 1], [0.72, 1, 1, 0.72]);

  return (
    <>
      <section ref={introRef} id="services-intro" aria-label="Services introduction" className="relative isolate min-h-[690px] overflow-hidden bg-[#f7f3ea] px-5 pb-12 pt-16 sm:min-h-[700px] sm:px-8 sm:pb-16 sm:pt-20 lg:min-h-[700px] lg:px-12 lg:pb-16 lg:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[38%] opacity-75" style={{ backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.15) 1.15px, transparent 1.3px)", backgroundSize: "18px 18px", maskImage: "linear-gradient(90deg, black, transparent)", WebkitMaskImage: "linear-gradient(90deg, black, transparent)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[30%] opacity-50" style={{ backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.11) 1px, transparent 1.2px)", backgroundSize: "20px 20px", maskImage: "linear-gradient(90deg, transparent, black)", WebkitMaskImage: "linear-gradient(90deg, transparent, black)" }} />
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.82fr)] lg:items-center lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="flex w-full flex-col items-center text-center lg:items-start lg:text-left">
              <h2 className="max-w-[820px] font-display text-[clamp(2rem,3.8vw,3.8rem)] font-semibold leading-[1.03] tracking-[-0.055em] text-[#08bdb8]">The Digital Points Way</h2>
              <p className="mt-8 max-w-[980px] font-display text-[clamp(0.9rem,1.25vw,1.18rem)] font-normal leading-[1.55] tracking-[-0.012em] text-[#171919] sm:mt-10 lg:max-w-[720px]">
                <span className="hidden sm:inline">At Digital Points, we believe that every great business starts with an idea, but an idea needs<br className="hidden lg:block" /> the right creativity, identity, and strategy to become a successful brand. That is why our work<br className="hidden lg:block" /> is built around three simple but powerful principles:</span>
                <span className="sm:hidden">At Digital Points, we believe that every great business starts with an idea, but an idea needs the right creativity, identity, and strategy to become a successful brand. That is why our work is built around three simple but powerful principles:</span>
              </p>
              <div className="mt-12 [perspective:900px] sm:mt-14"><motion.a href="/portfolio" aria-label="View all our works" whileHover={{ rotateX: 180 }} whileTap={{ rotateX: 180, scale: 0.98 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} style={{ transformStyle: "preserve-3d" }} className="group relative block h-[64px] w-[235px] cursor-pointer rounded-[2px] font-display text-[0.95rem] font-semibold [transform-style:preserve-3d] sm:h-[70px] sm:w-[255px] sm:text-base"><span className="absolute inset-0 flex items-center justify-center bg-[#211f1f] text-white shadow-[0_18px_40px_rgba(0,0,0,0.14)] [backface-visibility:hidden]">View all our works <span aria-hidden="true" className="ml-2 text-base">↗</span></span><span className="absolute inset-0 flex items-center justify-center bg-[#08bdb8] text-black shadow-[0_18px_40px_rgba(8,189,184,0.22)] [backface-visibility:hidden] [transform:rotateX(180deg)]">Explore our work <span aria-hidden="true" className="ml-2 text-base">↗</span></span></motion.a></div>
            </motion.div>
            <HighlightCards introRef={introRef} />
          </div>
        </div>
      </section>

      <section ref={showcaseRef} id="services-showcase" aria-label="Our Services" className="relative bg-[#f7f3ea]" style={{ height: `${services.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden px-4 py-3 sm:px-7 sm:py-5 lg:px-10 lg:py-4">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.13) 1.1px, transparent 1.3px)", backgroundSize: "18px 18px", maskImage: "linear-gradient(90deg, black, transparent 45%, black)", WebkitMaskImage: "linear-gradient(90deg, black, transparent 45%, black)" }} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden"><motion.div style={{ x: ambientX, scale: ambientScale, opacity: ambientOpacity }} className="absolute -left-[12%] top-[16%] whitespace-nowrap font-display text-[34vw] font-semibold leading-none tracking-[-0.1em] text-black/[0.035] sm:text-[27vw] lg:text-[23vw]">DP</motion.div><div className="absolute right-[7%] top-[23%] h-[44vh] w-px bg-[#08bdb8]/20" /><div className="absolute right-[7%] top-[23%] h-2 w-2 -translate-x-1/2 rounded-full bg-[#08bdb8] shadow-[0_0_0_7px_rgba(8,189,184,0.08)]" /><div className="absolute bottom-[12%] left-[7%] h-px w-[46%] bg-black/10" /><motion.div style={{ scaleX: ambientScale }} className="absolute bottom-[12%] left-[7%] h-px w-[16%] origin-left bg-[#08bdb8]" /><span className="absolute bottom-[8%] right-[7%] font-poppins text-[9px] font-medium uppercase tracking-[0.38em] text-black/20">DIGITAL POINTS / CREATIVE STUDIO</span></div>
          <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col"><div className="shrink-0 px-1 pt-1 sm:px-2 sm:pt-2"><p className="font-poppins text-[9px] font-medium uppercase tracking-[0.34em] text-[#08bdb8] sm:text-xs sm:tracking-[0.38em]">What We Do</p><h2 className="mt-1.5 whitespace-nowrap font-display text-[clamp(3.25rem,10vw,8rem)] font-semibold leading-[0.78] tracking-[-0.075em] text-black sm:mt-2">Our Services</h2></div><div className="relative mt-2 min-h-0 flex-1 sm:mt-3 lg:mt-2"><div className="relative h-full w-full overflow-hidden rounded-[24px] sm:rounded-[32px] lg:rounded-[38px]">{services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} progress={smoothProgress} />)}</div></div></div>
        </div>
      </section>
    </>
  );
}
