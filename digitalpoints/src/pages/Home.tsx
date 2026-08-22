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
        <div className="mx-auto w-full max-w-[1600px] px-[clamp(28px,5vw,80px)] py-[clamp(72px,9vw,140px)]">
          <div className="max-w-[980px] text-left">
            <h2 className="font-display text-[clamp(3rem,6.2vw,6.8rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-black">
              The Digital Points Way
            </h2>

            <p className="mt-10 max-w-[920px] text-[clamp(1.05rem,1.65vw,1.65rem)] font-normal leading-[1.55] tracking-[-0.015em] text-graphite">
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
        </div>
      </section>

      <ImageMosaic />
      <VideoShowcase />
      <Partners />
      <FinalCTA />
    </>
  );
}
