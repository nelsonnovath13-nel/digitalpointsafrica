import Hero from "../components/Hero";
import ImageMosaic from "../components/ImageMosaic";
import Services from "../components/Services";
import SectionRevealBidirectional from "../components/SectionRevealBidirectional";
import VideoShowcase from "../components/VideoShowcase";
import Partners from "../components/Partners";
import FinalCTA from "../components/FinalCTA";

export default function Home() {
  return (
    <>
      <style>{`
        section[class*="h-[520px]"] h1 > span:nth-child(3) > span:first-child {
          background: linear-gradient(90deg, #111827 0%, #4b5563 48%, #0f172a 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
      <Hero />
      <SectionRevealBidirectional>
        <Services />
      </SectionRevealBidirectional>
      <ImageMosaic />
      <VideoShowcase />
      <Partners />
      <FinalCTA />
    </>
  );
}
