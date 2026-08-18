import { useState, type FormEvent } from "react";
import { submitLead } from "../lib/leads";
import { CONSULTATION_TYPES, SERVICE_CATEGORIES, inputClass, labelClass, cardClass } from "../lib/constants";

export default function Consultation() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    try {
      await submitLead({
        formType: "consultation",
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        serviceCategory: (form.get("serviceCategory") as never) || "digital_consultation",
        consultationType: String(form.get("consultationType") || "online"),
        preferredDate: String(form.get("preferredDate") || ""),
        preferredTime: String(form.get("preferredTime") || ""),
        message: String(form.get("message") || ""),
        sourcePage: "/consultation",
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          Digital Consultation
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">
          Book a consultation
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-950/55">
          Technology consulting, business consulting, digital strategy, and website/SEO audits — online,
          in-person, or for your whole team.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-4 px-6 sm:grid-cols-3">
        {CONSULTATION_TYPES.map((c) => (
          <div key={c.value} className="rounded-2xl border border-ink-950/5 bg-white p-5 text-center shadow-sm">
            <h3 className="font-display text-sm font-semibold text-ink-950">{c.label}</h3>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-2xl px-6">
        <form onSubmit={handleSubmit} className={`${cardClass} space-y-4`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Full name</label>
              <input name="name" type="text" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input name="email" type="email" required className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Phone / WhatsApp</label>
            <input name="phone" type="text" required className={inputClass} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Consultation type</label>
              <select name="consultationType" className={inputClass} defaultValue="online">
                {CONSULTATION_TYPES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Area of interest</label>
              <select name="serviceCategory" className={inputClass} defaultValue="digital_consultation">
                <option value="digital_consultation">Digital Strategy</option>
                <option value="website_maintenance">Website / SEO Audit</option>
                {SERVICE_CATEGORIES.filter((s) => s.group === "AI Automation").map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Preferred date</label>
              <input name="preferredDate" type="date" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Preferred time</label>
              <input name="preferredTime" type="time" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>What would you like to discuss?</label>
            <textarea name="message" rows={4} className={inputClass} />
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-full bg-point-500 py-3 text-sm font-semibold text-ink-950 transition hover:bg-point-400 disabled:opacity-60"
          >
            {status === "success" ? "Consultation booked ✓" : status === "submitting" ? "Booking…" : "Book Consultation"}
          </button>
          {status === "error" && <p className="text-center text-xs text-red-400">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
