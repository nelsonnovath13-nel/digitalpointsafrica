import Hero from "../components/Hero";
import ImageMosaic from "../components/ImageMosaic";
import Services from "../components/Services";
import SectionReveal from "../components/SectionReveal";
import VideoShowcase from "../components/VideoShowcase";
import Partners from "../components/Partners";
import FinalCTA from "../components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionReveal>
        <Services />
      </SectionReveal>
      <ImageMosaic />
      <VideoShowcase />
      <Partners />
      <FinalCTA />
    </>
  );
}
