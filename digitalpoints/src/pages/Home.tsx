import Hero from "../components/Hero";
import ImageMosaic from "../components/ImageMosaic";
import Services from "../components/Services";
import SectionRevealBidirectional from "../components/SectionRevealBidirectional";
import StickyServices from "../components/StickyServices";
import VideoShowcase from "../components/VideoShowcase";
import Partners from "../components/Partners";
import FinalCTA from "../components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionRevealBidirectional>
        <Services />
      </SectionRevealBidirectional>
      <StickyServices />
      <ImageMosaic />
      <VideoShowcase />
      <Partners />
      <FinalCTA />
    </>
  );
}
