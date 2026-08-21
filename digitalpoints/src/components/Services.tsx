import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

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
  { title: "CREATE", description: "We turn ideas into creative digital solutions, compelling visuals, engaging videos, and designs that capture attention." },
  { title: "BRAND", description: "We transform ideas into strong, professional, and memorable brands through branding, graphic design, marketing, and printing." },
  { title: "GROW", description: "We help brands connect with their audience, increase their visibility, and create opportunities for sustainable business growth." },
];

function HighlightIcon({ title }: { title: Highlight["title"] }) {
  if (title === "CREATE") return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="h-[64px] w-[64px] object-contain sm:h-24 sm:w-24 lg:h-28 lg:w-28">
      <path d="M18 34h84M28 27l-10 7 10 7M92 27l10 7-10 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M57 43 39 77c-2 4 1 8 5 8h14l8-31-9-11Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M57 85h8v8h-8z" fill="currentColor" />
      <path d="M20 43c3 15 10 24 19 30M100 43c-3 15-10 24-19 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
  if (title === "BRAND") return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="h-[64px] w-[64px] object-contain sm:h-24 sm:w-24 lg:h-28 lg:w-28">
      <path d="m30 35 30-17 37 37-17 30a12 12 0 0 1-17 3L27 61a12 12 0 0 1 3-26Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m47 32 10 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="51" cy="34" r="5" fill="currentColor" />
    </svg>
  );
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="h-[64px] w-[64px] object-contain sm:h-24 sm:w-24 lg:h-28 lg:w-28">
      <path d="M18 87h12V73h12v14h12V63h12v24h12V51h12v36h12" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 49c20 1 35-7 48-20 9-9 18-10 31-15" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="m91 14 10 0 0 10" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MobileHighlightCard({ highlight, index }: { highlight: Highlight; index: number }) {
  const color = index === 0 ? "#3DA9FC" : index === 1 ? "#F45CA0" : "#F5B942";
  return (
    <article className="sticky top-0 z-10 flex h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#141414] px-6 py-20 text-[#F4EFE6] sm:px-8" style={{ zIndex: index + 1 }}>
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 78% 18%, ${color}2e, transparent 48%)` }} />
      <div className="relative z-10 mx-auto flex w-full max-w-[430px] flex-col">
        <motion.h3 initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.65, once: true }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} style={{ fontFamily: '"Space Grotesk", sans-serif' }} className="text-[clamp(46px,14vw,68px)] font-bold leading-[0.92] tracking-[-0.035em]">{highlight.title}</motion.h3>
        <motion.div initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: 0.55, once: true }} transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto my-10 flex h-[126px] w-[126px] items-center justify-center sm:my-12 sm:h-[136px] sm:w-[136px]">
          <div className="absolute inset-0 rounded-full border border-white/20"><span className="absolute left-1/2 top-[-3.5px] h-[7px] w-[7px] -translate-x-1/2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 16px 4px ${color}` }} /></div>
          <HighlightIcon title={highlight.title} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.5, once: true }} transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }} className="text-center">
          <p style={{ fontFamily: '"Inter", sans-serif' }} className="mx-auto max-w-[350px] text-[15px] leading-[1.55] text-white/80">{highlight.description}</p>
          <div className="mx-auto mt-5 h-[3px] w-full max-w-[350px] overflow-hidden rounded-full bg-white/[0.12]"><span className="block h-full w-full" style={{ backgroundColor: color }} /></div>
        </motion.div>
      </div>
      <span className="absolute bottom-7 right-7 h-[9px] w-[9px] rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 18px 6px ${color}99` }} />
    </article>
  );
}

function HighlightCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="relative mx-auto w-full">
      <div className="relative min-[900px]:hidden" style={{ height: `${highlights.length * 100}svh` }}>
        {highlights.map((highlight, index) => <MobileHighlightCard key={highlight.title} highlight={highlight} index={index} />)}
      </div>
      <div className="relative hidden h-[390px] min-[900px]:block" onMouseLeave={() => setHoveredIndex(null)}>
        <div className="absolute right-[clamp(-240px,-10vw,-140px)] top-1/2 h-[330px] w-[min(52vw,650px)] -translate-y-1/2">
          {highlights.map((highlight, index) => {
            const color = index === 0 ? "#3DA9FC" : index === 1 ? "#F45CA0" : "#F5B942";
            const hovered = hoveredIndex === index;
            const x = index === 0 ? "0%" : index === 1 ? "24%" : "48%";
            const y = index === 0 ? "19%" : index === 1 ? "7%" : "19%";
            const rotate = index === 0 ? -5 : index === 1 ? 0 : 5;
            return (
              <motion.button key={highlight.title} type="button" onMouseEnter={() => setHoveredIndex(index)} animate={{ x, y: hovered ? "-2%" : y, rotate: hovered ? 0 : rotate, scale: hovered ? 1.045 : 1 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }} className="absolute left-0 top-0 flex h-[150px] w-[clamp(205px,17vw,245px)] items-center gap-4 overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#141414] px-5 text-left text-[#F4EFE6] shadow-[0_24px_55px_-18px_rgba(0,0,0,0.5)]" style={{ zIndex: hovered ? 30 : 10 + index }}>
                <span className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle at 78% 18%, ${color}28, transparent 58%)` }} />
                <span className="pointer-events-none absolute bottom-0 left-5 right-5 h-[3px] rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 14px ${color}66` }} />
                <span className="relative flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border border-white/15"><span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 14px 4px ${color}` }} /><HighlightIcon title={highlight.title} /></span>
                <span className="relative min-w-0 flex-1"><span style={{ fontFamily: '"Space Grotesk", sans-serif' }} className="block text-[21px] font-bold leading-none tracking-[-0.025em]">{highlight.title}</span><span className="mt-2 block font-poppins text-[9px] uppercase tracking-[0.22em] text-white/45">0{index + 1} / POINT</span><span className="mt-3 block font-poppins text-[11px] text-white/45">Explore</span></span>
                <span className="relative self-start pt-1 text-lg text-white/45 transition-transform duration-300" style={{ transform: hovered ? "translate(2px,-2px)" : "none" }}>↗</span>
              </motion.button>
            );
          })}
        </div>
      </div>
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
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[34%] overflow-hidden lg:block"><div className="absolute inset-0 bg-gradient-to-t from-[#08bdb8] via-[#08bdb8]/70 to-transparent" /><div className="absolute -bottom-24 left-[8%] h-52 w-[52%] rounded-full bg-white/[0.09]" /><div className="absolute -bottom-20 right-[2%] h-48 w-[48%] rounded-full bg-[#0a9f9b]/20" /><div className="absolute bottom-[-6rem] left-[38%] h-44 w-[40%] rounded-full bg-white/[0.07]" /></div>
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
  const showcaseRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: showcaseRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 65, damping: 28, mass: 0.65 });
  const ambientX = useTransform(smoothProgress, [0, 1], ["0%", "-9%"]);
  const ambientScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.06, 1]);
  const ambientOpacity = useTransform(smoothProgress, [0, 0.08, 0.92, 1], [0.72, 1, 1, 0.72]);

  return (
    <>
      <section id="services-intro" aria-label="Services introduction" className="relative isolate overflow-visible bg-[#f7f3ea] px-5 pb-0 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[38%] opacity-75" style={{ backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.15) 1.15px, transparent 1.3px)", backgroundSize: "18px 18px", maskImage: "linear-gradient(90deg, black, transparent)", WebkitMaskImage: "linear-gradient(90deg, black, transparent)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[30%] opacity-50" style={{ backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.11) 1px, transparent 1.2px)", backgroundSize: "20px 20px", maskImage: "linear-gradient(90deg, transparent, black)", WebkitMaskImage: "linear-gradient(90deg, transparent, black)" }} />
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.78fr)] lg:gap-12 xl:gap-16">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="max-w-[720px] text-center lg:text-left">
              <h2 className="max-w-[720px] font-display text-[clamp(2.25rem,4.6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#22D3C7]">The Digital Points Way</h2>
              <p className="mt-6 max-w-[680px] font-display text-[clamp(0.92rem,1.25vw,1.18rem)] font-normal leading-[1.55] tracking-[-0.012em] text-[#171919] lg:mt-7">At Digital Points, we believe that every great business starts with an idea, but an idea needs the right creativity, identity, and strategy to become a successful brand. That is why our work is built around three simple but powerful principles:</p>
              <div className="mt-7 flex justify-center lg:mt-8 lg:justify-start"><motion.a href="/portfolio" aria-label="View all our works" whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.25 }} className="inline-flex h-[58px] w-[220px] items-center justify-center bg-[#211f1f] font-display text-[0.92rem] font-semibold text-white shadow-[0_16px_34px_rgba(0,0,0,0.14)] transition-colors hover:bg-black sm:h-[62px] sm:w-[235px] sm:text-[0.95rem]">View all our works <span aria-hidden="true" className="ml-2 text-base">↗</span></motion.a></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}><HighlightCards /></motion.div>
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
