import Hero from "../components/Hero";
import ImageMosaic from "../components/ImageMosaic";
import Services from "../components/Services";
import VideoShowcase from "../components/VideoShowcase";
import Partners from "../components/Partners";
import FinalCTA from "../components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <ImageMosaic />
      <VideoShowcase />
      <Partners />
      <FinalCTA />
    </>
  );
}
