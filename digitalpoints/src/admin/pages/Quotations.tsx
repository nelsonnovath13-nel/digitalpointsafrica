import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { SERVICE_CATEGORIES } from "../../lib/constants";
import AdminTable from "../components/AdminTable";
import StatusSelect from "../components/StatusSelect";

interface QuotationRequest {
  id: string;
  created_at: string;
  service_category: string;
  budget_range: string;
  timeline: string;
  requirements: string | null;
  status: string;
  leads: { name: string; email: string; phone: string | null } | null;
}

const STATUS_OPTIONS = [
  { value: "pending_review", label: "Pending Review" },
  { value: "quote_prepared", label: "Quote Prepared" },
  { value: "quote_sent", label: "Quote Sent" },
  { value: "accepted", label: "Accepted" },
  { value: "declined", label: "Declined" },
  { value: "expired", label: "Expired" },
];

function serviceLabel(category: string): string {
  return SERVICE_CATEGORIES.find((s) => s.value === category)?.label ?? category;
}

export default function Quotations() {
  const [rows, setRows] = useState<QuotationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("quotation_requests")
      .select("id, created_at, service_category, budget_range, timeline, requirements, status, leads(name, email, phone)")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRows((data as unknown as QuotationRequest[]) ?? []);
        setLoading(false);
      });
  }, []);

  async function updateStatus(id: string, status: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    await supabase.from("quotation_requests").update({ status }).eq("id", id);
  }

  return (
    <AdminTable
      title="Quotation Requests"
      loading={loading}
      empty={rows.length === 0}
      columns={["Client", "Service", "Budget", "Timeline", "Status", "Received"]}
    >
      {rows.map((r) => (
        <tr key={r.id} className="align-top">
          <td className="px-4 py-3">
            <p className="font-medium text-ink-950">{r.leads?.name}</p>
            <p className="text-xs text-ink-950/40">{r.leads?.email}</p>
          </td>
          <td className="px-4 py-3 text-ink-950/70">{serviceLabel(r.service_category)}</td>
          <td className="px-4 py-3 text-ink-950/70">{r.budget_range.replace(/_/g, " ")}</td>
          <td className="px-4 py-3 text-ink-950/70">{r.timeline.replace(/_/g, " ")}</td>
          <td className="px-4 py-3">
            <StatusSelect value={r.status} options={STATUS_OPTIONS} onChange={(v) => updateStatus(r.id, v)} />
          </td>
          <td className="px-4 py-3 text-xs text-ink-950/50">{new Date(r.created_at).toLocaleDateString()}</td>
        </tr>
      ))}
    </AdminTable>
  );
}
