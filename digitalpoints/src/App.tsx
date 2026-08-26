import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FloatingChatWidget, GetInTouchTab } from "./components/FloatingSupport";
import Home from "./pages/Home";

const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const VideoProduction = lazy(() => import("./pages/VideoProduction"));
const Training = lazy(() => import("./pages/Training"));
const Consultation = lazy(() => import("./pages/Consultation"));
const Printing = lazy(() => import("./pages/Printing"));
const Maintenance = lazy(() => import("./pages/Maintenance"));
const Quotation = lazy(() => import("./pages/Quotation"));
const AdminApp = lazy(() => import("./admin/AdminApp"));

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
      <Suspense fallback={null}>
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
      </Suspense>
      {!isAdmin && <Footer />}
      {!isAdmin && <GetInTouchTab />}
      {!isAdmin && <FloatingChatWidget />}
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
