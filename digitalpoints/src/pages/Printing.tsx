import { useState, type FormEvent } from "react";
import { submitLead } from "../lib/leads";
import { uploadQuotationFiles } from "../lib/uploads";
import FileDropzone from "../components/forms/FileDropzone";
import { inputClass, labelClass, cardClass } from "../lib/constants";

const PRODUCTS = [
  { title: "Business Cards", desc: "Premium matte, gloss, or textured finishes." },
  { title: "Flyers", desc: "Full-color flyers for promotions and events." },
  { title: "Posters", desc: "Large-format posters for indoor or outdoor use." },
  { title: "Banners", desc: "Durable vinyl banners in any size." },
  { title: "Brochures", desc: "Tri-fold and bi-fold brochures that tell your story." },
];

export default function Printing() {
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
        serviceCategory: "printing_services",
        requirements: `Product: ${form.get("product")}\n${form.get("requirements") || ""}`,
        sourcePage: "/printing",
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
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          Printing Services
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">
          Print solutions for your business
        </h1>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-5">
        {PRODUCTS.map((p) => (
          <div key={p.title} className="rounded-2xl border border-ink-950/5 bg-white p-5 shadow-sm">
            <h3 className="font-display text-sm font-semibold text-ink-950">{p.title}</h3>
            <p className="mt-1.5 text-xs text-ink-950/55">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-2xl px-6">
        <form onSubmit={handleSubmit} className={`${cardClass} space-y-4`}>
          <h3 className="font-display text-lg font-semibold text-ink-950">Request a quote</h3>
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Phone / WhatsApp</label>
              <input name="phone" type="text" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Product</label>
              <select name="product" className={inputClass} defaultValue={PRODUCTS[0].title}>
                {PRODUCTS.map((p) => (
                  <option key={p.title} value={p.title}>
                    {p.title}
                  </option>
                ))}
                <option value="Custom">Custom Printing Inquiry</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Details (quantity, size, deadline)</label>
            <textarea name="requirements" rows={3} required className={inputClass} />
          </div>
          <FileDropzone files={files} onChange={setFiles} label="Attach design files (optional)" />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-full bg-point-500 py-3 text-sm font-semibold text-ink-950 transition hover:bg-point-400 disabled:opacity-60"
          >
            {status === "success" ? "Request sent ✓" : status === "submitting" ? "Sending…" : "Request Quote"}
          </button>
          {status === "error" && <p className="text-center text-xs text-red-400">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
