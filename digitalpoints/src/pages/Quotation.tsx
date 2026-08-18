import { useState, type FormEvent } from "react";
import { submitLead } from "../lib/leads";
import { uploadQuotationFiles } from "../lib/uploads";
import FileDropzone from "../components/forms/FileDropzone";
import {
  SERVICE_CATEGORIES,
  BUDGET_RANGES,
  PROJECT_TIMELINES,
  inputClass,
  labelClass,
  cardClass,
} from "../lib/constants";

export default function Quotation() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    try {
      const { quotationRequestId } = await submitLead({
        formType: "quotation",
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        serviceCategory: form.get("serviceCategory") as never,
        budgetRange: String(form.get("budgetRange") || "not_sure"),
        timeline: String(form.get("timeline") || "flexible"),
        requirements: String(form.get("requirements") || ""),
        sourcePage: "/quotation",
      });

      if (quotationRequestId && files.length > 0) {
        await uploadQuotationFiles(quotationRequestId, files);
      }

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
          Get a Quotation
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">
          Tell us about your project
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-950/55">
          Share the details below and we'll prepare a clear, itemized quotation for your project.
        </p>
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
          <div>
            <label className={labelClass}>Service category</label>
            <select name="serviceCategory" required className={inputClass} defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              {SERVICE_CATEGORIES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Budget range</label>
              <select name="budgetRange" className={inputClass} defaultValue="not_sure">
                {BUDGET_RANGES.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Timeline</label>
              <select name="timeline" className={inputClass} defaultValue="flexible">
                {PROJECT_TIMELINES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Project requirements</label>
            <textarea name="requirements" rows={4} required className={inputClass} />
          </div>
          <FileDropzone files={files} onChange={setFiles} />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-full bg-point-500 py-3 text-sm font-semibold text-ink-950 transition hover:bg-point-400 disabled:opacity-60"
          >
            {status === "success"
              ? "Quotation request sent ✓"
              : status === "submitting"
                ? "Sending…"
                : "Request Quotation"}
          </button>
          {status === "error" && <p className="text-center text-xs text-red-400">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
