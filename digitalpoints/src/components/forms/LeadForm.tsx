import { useState, type FormEvent } from "react";
import { submitLead, type ServiceCategory } from "../../lib/leads";
import { inputClass, labelClass, cardClass } from "../../lib/constants";

interface LeadFormProps {
  serviceCategory: ServiceCategory;
  sourcePage: string;
  submitLabel?: string;
  successMessage?: string;
  showMessageField?: boolean;
  noteInMessage?: string;
}

export default function LeadForm({
  serviceCategory,
  sourcePage,
  submitLabel = "Send Request",
  successMessage = "Sent — we'll reach out shortly ✓",
  showMessageField = true,
  noteInMessage,
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const businessName = String(form.get("businessName") || "").trim();
    const rawMessage = String(form.get("message") || "");
    const parts = [
      noteInMessage,
      businessName ? `Business: ${businessName}` : null,
      rawMessage,
    ].filter(Boolean);
    const message = parts.join("\n");

    try {
      await submitLead({
        formType: "contact",
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        message,
        serviceCategory,
        sourcePage,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${cardClass}`}>
      {[
        { name: "name", label: "Full name" },
        { name: "businessName", label: "Business name" },
        { name: "phone", label: "Phone / WhatsApp" },
        { name: "email", label: "Email" },
      ].map(({ name, label }) => (
        <div key={name}>
          <label className={labelClass}>{label}</label>
          <input
            type={name === "email" ? "email" : "text"}
            name={name}
            required={name !== "businessName"}
            className={inputClass}
          />
        </div>
      ))}
      {showMessageField && (
        <div>
          <label className={labelClass}>What do you need?</label>
          <textarea name="message" rows={4} required className={inputClass} />
        </div>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-point-500 py-3 text-sm font-semibold text-ink-950 transition hover:bg-point-400 disabled:opacity-60"
      >
        {status === "success"
          ? successMessage
          : status === "submitting"
            ? "Sending…"
            : submitLabel}
      </button>
      {status === "error" && (
        <p className="text-center text-xs text-red-400">{errorMessage}</p>
      )}
    </form>
  );
}
