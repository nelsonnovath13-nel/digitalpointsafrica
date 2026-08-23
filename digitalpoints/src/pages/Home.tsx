import Hero from "../components/Hero";
import Services from "../components/Services";
import SectionRevealBidirectional from "../components/SectionRevealBidirectional";
import StickyServices from "../components/StickyServices";
import ScrollVideoReveal from "../components/ScrollVideoReveal";
import PrintingServices from "../components/PrintingServices";
import CurtainRevealReviews from "../components/CurtainRevealReviews";
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
      <ScrollVideoReveal />
      <PrintingServices />
      <CurtainRevealReviews />
      <Partners />
      <FinalCTA />
    </>
  );
}
