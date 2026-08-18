import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import CaseStudies from "./pages/CaseStudies";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VideoProduction from "./pages/VideoProduction";
import Training from "./pages/Training";
import Consultation from "./pages/Consultation";
import Printing from "./pages/Printing";
import Maintenance from "./pages/Maintenance";
import Quotation from "./pages/Quotation";
import AdminApp from "./admin/AdminApp";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppShell() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="bg-cream-50">
      {!isAdmin && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/training" element={<Training />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/printing" element={<Printing />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/video-production" element={<VideoProduction />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell />
    </BrowserRouter>
  );
}
