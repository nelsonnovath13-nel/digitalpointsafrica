import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminTable from "../components/AdminTable";
import StatusSelect from "../components/StatusSelect";

interface TrainingRequest {
  id: string;
  created_at: string;
  training_type: string;
  is_trainer_booking: boolean;
  topic: string | null;
  number_of_participants: number | null;
  organization_name: string | null;
  status: string;
  leads: { name: string; email: string; phone: string | null } | null;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function TrainingRequests() {
  const [rows, setRows] = useState<TrainingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("training_requests")
      .select(
        "id, created_at, training_type, is_trainer_booking, topic, number_of_participants, organization_name, status, leads(name, email, phone)",
      )
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRows((data as unknown as TrainingRequest[]) ?? []);
        setLoading(false);
      });
  }, []);

  async function updateStatus(id: string, status: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    await supabase.from("training_requests").update({ status }).eq("id", id);
  }

  return (
    <AdminTable
      title="Training Requests"
      loading={loading}
      empty={rows.length === 0}
      columns={["Client", "Type", "Topic", "Participants", "Status", "Received"]}
    >
      {rows.map((r) => (
        <tr key={r.id} className="align-top">
          <td className="px-4 py-3">
            <p className="font-medium text-ink-950">{r.leads?.name}</p>
            <p className="text-xs text-ink-950/40">{r.leads?.email}</p>
          </td>
          <td className="px-4 py-3 text-ink-950/70">
            {r.training_type} {r.is_trainer_booking && <span className="text-point-300">(trainer booking)</span>}
            {r.organization_name && <p className="text-xs text-ink-950/40">{r.organization_name}</p>}
          </td>
          <td className="px-4 py-3 text-ink-950/70">{r.topic ?? "—"}</td>
          <td className="px-4 py-3 text-ink-950/70">{r.number_of_participants ?? "—"}</td>
          <td className="px-4 py-3">
            <StatusSelect value={r.status} options={STATUS_OPTIONS} onChange={(v) => updateStatus(r.id, v)} />
          </td>
          <td className="px-4 py-3 text-xs text-ink-950/50">{new Date(r.created_at).toLocaleDateString()}</td>
        </tr>
      ))}
    </AdminTable>
  );
}
