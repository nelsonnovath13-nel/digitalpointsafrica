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
type Highlight = { title: "CREATE" | "BRAND" | "GROW"; description: string; icon: string };
const highlights: Highlight[] = [
  { title: "CREATE", description: "We turn ideas into creative digital solutions, compelling visuals, engaging videos, and designs that capture attention.", icon: "/icons/create.svg" },
  { title: "BRAND", description: "We transform ideas into strong, professional, and memorable brands through branding, graphic design, marketing, and printing.", icon: "/icons/brand.svg" },
  { title: "GROW", description: "We help brands connect with their audience, increase their visibility, and create opportunities for sustainable business growth.", icon: "/icons/grow.svg" },
];

function HighlightIcon({ src }: { src: string }) {
  return <img src={src} alt="" aria-hidden="true" className="h-[68px] w-[68px] object-contain sm:h-[72px] sm:w-[72px]" />;
}

function MobileHighlightCard({ highlight, index }: { highlight: Highlight; index: number }) {
  const color = index === 0 ? "#3DA9FC" : index === 1 ? "#F45CA0" : "#F5B942";

  return (
    <article
      className="dp-mobile-snap sticky top-0 flex h-[100dvh] min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-[#141414] px-6 py-16 text-[#F4EFE6] sm:px-8"
      style={{ scrollSnapStop: "always" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 78% 18%, ${color}2e, transparent 48%)` }} />
      <div className="relative z-10 mx-auto flex w-full max-w-[430px] flex-col">
        <motion.h3
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.65, once: false }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          className="text-[clamp(46px,14vw,68px)] font-bold leading-[0.92] tracking-[-0.035em]"
        >
          {highlight.title}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.55, once: false }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto my-10 flex h-[126px] w-[126px] items-center justify-center sm:my-12 sm:h-[136px] sm:w-[136px]"
        >
          <div className="absolute inset-0 rounded-full border border-white/20">
            <span className="absolute left-1/2 top-[-3.5px] h-[7px] w-[7px] -translate-x-1/2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 16px 4px ${color}` }} />
          </div>
          <HighlightIcon src={highlight.icon} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5, once: false }}
          transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p style={{ fontFamily: '"Inter", sans-serif' }} className="mx-auto max-w-[350px] text-[15px] leading-[1.55] text-white/80">
            {highlight.description}
          </p>
          <div className="mx-auto mt-5 h-[3px] w-full max-w-[350px] overflow-hidden rounded-full bg-white/[0.12]">
            <span className="block h-full w-full" style={{ backgroundColor: color }} />
          </div>
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
      {/* Mobile: one normal document-flow track. Each card is sticky, so the page itself keeps scrolling — no nested scroller and no blank spacer. */}
      <div className="block h-[300dvh] min-[900px]:hidden">
        {highlights.map((highlight, index) => (
          <MobileHighlightCard key={highlight.title} highlight={highlight} index={index} />
        ))}
      </div>

      {/* Desktop/tablet: compact centered fan. Width and offsets are viewport-based so smaller laptops do not crop the outer cards. */}
      <motion.div
        initial={{ y: 38, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto hidden h-[470px] w-full max-w-[1180px] items-center justify-center min-[900px]:flex"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {highlights.map((highlight, index) => {
          const color = index === 0 ? "#3DA9FC" : index === 1 ? "#F45CA0" : "#F5B942";
          const hovered = hoveredIndex === index;
          const restingX = index === 0 ? "-13vw" : index === 1 ? "0vw" : "13vw";
          const restingY = index === 1 ? 0 : 12;
          const restingRotate = index === 0 ? -4 : index === 1 ? 0 : 4;
          const fanX = index === 0 ? "-14vw" : index === 1 ? "0vw" : "14vw";

          return (
            <motion.article
              key={highlight.title}
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{
                x: hovered ? fanX : restingX,
                y: hovered ? -8 : restingY,
                rotate: hovered ? 0 : restingRotate,
                opacity: 1,
                scale: hovered ? 1.01 : 1,
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredIndex(index)}
              className="absolute left-1/2 top-1/2 flex h-[380px] w-[clamp(250px,25vw,330px)] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col justify-between overflow-hidden rounded-[18px] bg-[#141414] p-[28px_25px] text-[#F4EFE6] shadow-[0_28px_65px_-25px_rgba(0,0,0,0.55)] lg:h-[400px] lg:rounded-[20px] lg:p-[30px]"
              style={{ zIndex: hovered ? 20 : 3 - index }}
            >
              <h3 style={{ fontFamily: '"Space Grotesk", sans-serif' }} className="text-[34px] font-bold leading-none tracking-[-0.01em] lg:text-[36px]">
                {highlight.title}
              </h3>
              <div className="relative mx-auto flex h-[118px] w-[118px] items-center justify-center rounded-full border border-white/20 lg:h-[126px] lg:w-[126px]">
                <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 14px 4px ${color}` }} />
                <HighlightIcon src={highlight.icon} />
              </div>
              <div>
                <p style={{ fontFamily: '"Inter", sans-serif' }} className="text-[13.5px] leading-[1.5] text-white/80 lg:text-[14px]">
                  {highlight.description}
                </p>
                <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.14]">
                  <span className="block h-full w-full" style={{ backgroundColor: color }} />
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
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
  const showcaseRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: showcaseRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 65, damping: 28, mass: 0.65 });
  const ambientX = useTransform(smoothProgress, [0, 1], ["0%", "-9%"]);
  const ambientScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.06, 1]);
  const ambientOpacity = useTransform(smoothProgress, [0, 0.08, 0.92, 1], [0.72, 1, 1, 0.72]);

  return (
    <>
      <style>{`@media (max-width: 899px) { html { scroll-snap-type: y mandatory; } .dp-mobile-snap { scroll-snap-align: start; } #services-showcase { scroll-snap-align: start; } }`}</style>
      <section id="services-intro" aria-label="Services introduction" className="relative isolate min-h-0 overflow-visible bg-[#f7f3ea] px-5 pb-0 pt-16 sm:px-8 sm:pt-20 lg:min-h-0 lg:px-12 lg:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[38%] opacity-75" style={{ backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.15) 1.15px, transparent 1.3px)", backgroundSize: "18px 18px", maskImage: "linear-gradient(90deg, black, transparent)", WebkitMaskImage: "linear-gradient(90deg, black, transparent)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[30%] opacity-50" style={{ backgroundImage: "radial-gradient(circle, rgba(50,55,55,0.11) 1px, transparent 1.2px)", backgroundSize: "20px 20px", maskImage: "linear-gradient(90deg, transparent, black)", WebkitMaskImage: "linear-gradient(90deg, transparent, black)" }} />
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="flex w-full flex-col items-center text-center">
            <h2 className="max-w-[820px] font-display text-[clamp(2rem,3.8vw,3.8rem)] font-semibold leading-[1.03] tracking-[-0.055em] text-[#22D3C7]">The Digital Points Way</h2>
            <p className="mt-7 max-w-[980px] font-display text-[clamp(0.9rem,1.25vw,1.18rem)] font-normal leading-[1.55] tracking-[-0.012em] text-[#171919] sm:mt-8">
              <span className="hidden sm:inline">At Digital Points, we believe that every great business starts with an idea, but an idea needs<br className="hidden lg:block" /> the right creativity, identity, and strategy to become a successful brand. That is why our work<br className="hidden lg:block" /> is built around three simple but powerful principles:</span>
              <span className="sm:hidden">At Digital Points, we believe that every great business starts with an idea, but an idea needs the right creativity, identity, and strategy to become a successful brand. That is why our work is built around three simple but powerful principles:</span>
            </p>
            <div className="mt-8 [perspective:900px] sm:mt-10"><motion.a href="/portfolio" aria-label="View all our works" whileHover={{ rotateX: 180 }} whileTap={{ rotateX: 180, scale: 0.98 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} style={{ transformStyle: "preserve-3d" }} className="group relative block h-[60px] w-[225px] cursor-pointer rounded-[2px] font-display text-[0.92rem] font-semibold [transform-style:preserve-3d] sm:h-[64px] sm:w-[240px] sm:text-[0.95rem]"><span className="absolute inset-0 flex items-center justify-center bg-[#211f1f] text-white shadow-[0_16px_34px_rgba(0,0,0,0.14)] [backface-visibility:hidden]">View all our works <span aria-hidden="true" className="ml-2 text-base">↗</span></span><span className="absolute inset-0 flex items-center justify-center bg-[#22D3C7] text-black shadow-[0_16px_34px_rgba(34,211,199,0.22)] [backface-visibility:hidden] [transform:rotateX(180deg)]">Explore our work <span aria-hidden="true" className="ml-2 text-base">↗</span></span></motion.a></div>
          </motion.div>
          <HighlightCards />
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
