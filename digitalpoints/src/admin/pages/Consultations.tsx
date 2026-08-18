import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminTable from "../components/AdminTable";
import StatusSelect from "../components/StatusSelect";

interface ConsultationBooking {
  id: string;
  created_at: string;
  consultation_type: string;
  preferred_date: string;
  preferred_time: string | null;
  status: string;
  leads: { name: string; email: string; phone: string | null } | null;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "no_show", label: "No Show" },
  { value: "cancelled", label: "Cancelled" },
];

export default function Consultations() {
  const [rows, setRows] = useState<ConsultationBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("consultation_bookings")
      .select("id, created_at, consultation_type, preferred_date, preferred_time, status, leads(name, email, phone)")
      .order("preferred_date", { ascending: true })
      .then(({ data }) => {
        setRows((data as unknown as ConsultationBooking[]) ?? []);
        setLoading(false);
      });
  }, []);

  async function updateStatus(id: string, status: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    await supabase.from("consultation_bookings").update({ status }).eq("id", id);
  }

  return (
    <AdminTable
      title="Consultation Bookings"
      loading={loading}
      empty={rows.length === 0}
      columns={["Client", "Type", "Preferred Date", "Time", "Status", "Requested"]}
    >
      {rows.map((r) => (
        <tr key={r.id} className="align-top">
          <td className="px-4 py-3">
            <p className="font-medium text-ink-950">{r.leads?.name}</p>
            <p className="text-xs text-ink-950/40">{r.leads?.email}</p>
          </td>
          <td className="px-4 py-3 text-ink-950/70 capitalize">{r.consultation_type}</td>
          <td className="px-4 py-3 text-ink-950/70">{r.preferred_date}</td>
          <td className="px-4 py-3 text-ink-950/70">{r.preferred_time ?? "—"}</td>
          <td className="px-4 py-3">
            <StatusSelect value={r.status} options={STATUS_OPTIONS} onChange={(v) => updateStatus(r.id, v)} />
          </td>
          <td className="px-4 py-3 text-xs text-ink-950/50">{new Date(r.created_at).toLocaleDateString()}</td>
        </tr>
      ))}
    </AdminTable>
  );
}
