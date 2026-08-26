import Hero from "../components/Hero";
import Services from "../components/Services";
import SectionRevealBidirectional from "../components/SectionRevealBidirectional";
import StickyServices from "../components/StickyServices";
import ServicesProgressBar from "../components/ServicesProgressBar";
import ScrollVideoReveal from "../components/ScrollVideoReveal";
import PrintingServices from "../components/PrintingServices";
import CurtainRevealReviews from "../components/CurtainRevealReviews";
import Partners from "../components/Partners";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Hero />
        <SectionRevealBidirectional>
          <Services />
        </SectionRevealBidirectional>
      </div>
      <StickyServices />
      <ServicesProgressBar />
      <ScrollVideoReveal />
      <PrintingServices />
      <CurtainRevealReviews />
      <Partners />
    </>
  );
}
