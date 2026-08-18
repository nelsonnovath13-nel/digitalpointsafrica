import { Fragment, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { buildWhatsAppLink } from "../../lib/wa";
import { SERVICE_CATEGORIES } from "../../lib/constants";
import AdminTable from "../components/AdminTable";
import StatusSelect from "../components/StatusSelect";

interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  service_category: string;
  message: string | null;
  source_page: string | null;
  status: string;
  email_sequence_paused: boolean;
}

interface EmailScheduleRow {
  lead_id: string;
  step: string;
  status: string;
}

const STATUS_OPTIONS = [
  { value: "new_lead", label: "New Lead" },
  { value: "contacted", label: "Contacted" },
  { value: "interested", label: "Interested" },
  { value: "quotation_sent", label: "Quotation Sent" },
  { value: "negotiating", label: "Negotiating" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
  { value: "inactive", label: "Inactive" },
];

function serviceLabel(category: string): string {
  return SERVICE_CATEGORIES.find((s) => s.value === category)?.label ?? category;
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [schedules, setSchedules] = useState<Record<string, EmailScheduleRow[]>>({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data: leadRows } = await supabase
      .from("leads")
      .select("id, created_at, name, email, phone, service_category, message, source_page, status, email_sequence_paused")
      .order("created_at", { ascending: false });
    setLeads(leadRows ?? []);

    const { data: scheduleRows } = await supabase
      .from("email_schedule")
      .select("lead_id, step, status");
    const grouped: Record<string, EmailScheduleRow[]> = {};
    for (const row of scheduleRows ?? []) {
      (grouped[row.lead_id] ??= []).push(row);
    }
    setSchedules(grouped);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(lead: Lead, newStatus: string) {
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status: newStatus } : l)));
    await supabase.from("leads").update({ status: newStatus }).eq("id", lead.id);
  }

  async function togglePause(lead: Lead) {
    await supabase.rpc("pause_lead_email_sequence", {
      p_lead_id: lead.id,
      p_pause: !lead.email_sequence_paused,
    });
    load();
  }

  const shown = statusFilter === "all" ? leads : leads.filter((l) => l.status === statusFilter);

  return (
    <AdminTable
      title="Leads"
      loading={loading}
      empty={shown.length === 0}
      columns={["Lead", "Service", "Status", "Email Drip", "Received", ""]}
      headerActions={
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-ink-950/10 bg-cream-50 px-3 py-2 text-xs text-ink-950 focus:border-point-400/60 focus:outline-none"
        >
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      }
    >
      {shown.map((lead) => {
        const steps = schedules[lead.id] ?? [];
        const sentCount = steps.filter((s) => s.status === "sent").length;
        const isExpanded = expanded === lead.id;

        return (
          <Fragment key={lead.id}>
            <tr className="align-top">
              <td className="px-4 py-3">
                <button
                  onClick={() => setExpanded(isExpanded ? null : lead.id)}
                  className="text-left font-medium text-ink-950 hover:text-point-700"
                >
                  {lead.name}
                </button>
                <p className="text-xs text-ink-950/40">{lead.email}</p>
              </td>
              <td className="px-4 py-3 text-ink-950/70">{serviceLabel(lead.service_category)}</td>
              <td className="px-4 py-3">
                <StatusSelect
                  value={lead.status}
                  options={STATUS_OPTIONS}
                  onChange={(v) => updateStatus(lead, v)}
                />
              </td>
              <td className="px-4 py-3 text-xs text-ink-950/50">
                {lead.email_sequence_paused ? "Paused" : `${sentCount}/5 sent`}
              </td>
              <td className="px-4 py-3 text-xs text-ink-950/50">
                {new Date(lead.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <a
                    href={buildWhatsAppLink(
                      lead.phone,
                      `Hi ${lead.name.split(" ")[0]}, thanks for reaching out to Digital Points about ${serviceLabel(lead.service_category)}!`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-point-50 px-2.5 py-1.5 text-xs font-medium text-point-700 hover:bg-point-100"
                  >
                    WhatsApp
                  </a>
                  <button
                    onClick={() => togglePause(lead)}
                    className="rounded-lg border border-ink-950/10 px-2.5 py-1.5 text-xs text-ink-950/50 hover:text-ink-950"
                  >
                    {lead.email_sequence_paused ? "Resume" : "Pause"}
                  </button>
                </div>
              </td>
            </tr>
            {isExpanded && (
              <tr>
                <td colSpan={6} className="bg-cream-50 px-4 py-4 text-sm text-ink-950/70">
                  <p className="mb-2">
                    <strong className="text-ink-950/50">Phone:</strong> {lead.phone ?? "—"} ·{" "}
                    <strong className="text-ink-950/50">Source:</strong> {lead.source_page ?? "—"}
                  </p>
                  <p className="mb-2">
                    <strong className="text-ink-950/50">Message:</strong> {lead.message ?? "—"}
                  </p>
                  <p className="text-xs text-ink-950/40">
                    Drip: {steps.map((s) => `${s.step}:${s.status}`).join(", ") || "no schedule"}
                  </p>
                </td>
              </tr>
            )}
          </Fragment>
        );
      })}
    </AdminTable>
  );
}
