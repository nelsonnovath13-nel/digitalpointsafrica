import Hero from "../components/Hero";
import ImageMosaic from "../components/ImageMosaic";
import VideoShowcase from "../components/VideoShowcase";
import Partners from "../components/Partners";
import FinalCTA from "../components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />

      <section
        id="digital-points-way"
        className="relative w-full overflow-hidden bg-[#fdfbf6] bg-dot-grid"
      >
        <div className="mx-auto grid min-h-[620px] w-full max-w-[1600px] grid-cols-1 items-start px-[clamp(24px,3.4vw,56px)] py-[clamp(72px,8vw,120px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(560px,1.08fr)] lg:gap-[clamp(40px,5vw,96px)] lg:px-[clamp(36px,4vw,64px)]">
          <div className="max-w-[760px] text-left">
            <h2 className="font-display text-[clamp(3rem,5.7vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-black">
              The Digital Points Way
            </h2>

            <p className="mt-10 max-w-[760px] text-[clamp(1.05rem,1.45vw,1.5rem)] font-normal leading-[1.55] tracking-[-0.015em] text-graphite">
              <span className="block">
                At Digital Points, we believe that every great business starts with an idea, but an idea needs
              </span>
              <span className="block">
                the right creativity, identity, and strategy to become a successful brand. That is why our work
              </span>
              <span className="block">
                is built around three simple but powerful principles:
              </span>
            </p>
          </div>

          {/* Reserved intentionally for the three Digital Points Way cards. */}
          <div aria-hidden="true" className="hidden min-h-[420px] lg:block" />
        </div>
      </section>

      <ImageMosaic />
      <VideoShowcase />
      <Partners />
      <FinalCTA />
    </>
  );
}
