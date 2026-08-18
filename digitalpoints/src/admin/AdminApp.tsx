import { Routes, Route, Navigate } from "react-router-dom";
import { useAdminAuth } from "./useAdminAuth";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import Leads from "./pages/Leads";
import Quotations from "./pages/Quotations";
import TrainingRequests from "./pages/TrainingRequests";
import Consultations from "./pages/Consultations";
import PortfolioAdmin from "./pages/PortfolioAdmin";
import CaseStudiesAdmin from "./pages/CaseStudiesAdmin";

export default function AdminApp() {
  const { session, isAdmin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-50 text-sm text-ink-950/50">
        Loading…
      </div>
    );
  }

  if (!session || !isAdmin) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="leads" replace />} />
        <Route path="leads" element={<Leads />} />
        <Route path="quotations" element={<Quotations />} />
        <Route path="training" element={<TrainingRequests />} />
        <Route path="consultations" element={<Consultations />} />
        <Route path="portfolio" element={<PortfolioAdmin />} />
        <Route path="case-studies" element={<CaseStudiesAdmin />} />
      </Routes>
    </AdminLayout>
  );
}
