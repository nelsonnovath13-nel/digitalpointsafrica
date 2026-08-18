import { useState, type FormEvent } from "react";
import { submitLead } from "../lib/leads";
import { TRAINING_TYPES, inputClass, labelClass, cardClass } from "../lib/constants";

const PROGRAMS = [
  "Photography Training",
  "Videography Training",
  "Social Media Training",
  "Website Management Training",
  "AI Tools Training",
  "Corporate Digital Skills Training",
];

function TrainingForm({ isTrainerBooking }: { isTrainerBooking: boolean }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    try {
      await submitLead({
        formType: "training",
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        serviceCategory: "training",
        trainingType: String(form.get("trainingType") || "individual"),
        isTrainerBooking,
        topic: String(form.get("topic") || ""),
        numberOfParticipants: form.get("numberOfParticipants")
          ? Number(form.get("numberOfParticipants"))
          : undefined,
        organizationName: String(form.get("organizationName") || ""),
        message: String(form.get("message") || ""),
        sourcePage: "/training",
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${cardClass} space-y-4`}>
      <h3 className="font-display text-lg font-semibold text-ink-950">
        {isTrainerBooking ? "Book a Trainer" : "Training Registration"}
      </h3>
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
          <label className={labelClass}>Training type</label>
          <select name="trainingType" className={inputClass} defaultValue="individual">
            {TRAINING_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Organization name (if applicable)</label>
        <input name="organizationName" type="text" className={inputClass} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Topic / Program</label>
          <select name="topic" className={inputClass} defaultValue={PROGRAMS[0]}>
            {PROGRAMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Number of participants</label>
          <input name="numberOfParticipants" type="number" min={1} defaultValue={1} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Additional details</label>
        <textarea name="message" rows={3} className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-point-500 py-3 text-sm font-semibold text-ink-950 transition hover:bg-point-400 disabled:opacity-60"
      >
        {status === "success" ? "Request sent ✓" : status === "submitting" ? "Sending…" : "Submit Request"}
      </button>
      {status === "error" && <p className="text-center text-xs text-red-400">{errorMessage}</p>}
    </form>
  );
}

export default function Training() {
  return (
    <div className="min-h-screen bg-cream-50 pb-24 pt-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          Training Programs
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">
          Practical digital skills training
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-ink-950/55">
          For individuals, schools, corporate teams, and organizations across Tanzania — hands-on training in
          photography, videography, social media, websites, and AI tools.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 px-6 sm:grid-cols-2">
        {[
          { title: "Individual", desc: "One-on-one or small group coaching tailored to your goals." },
          { title: "School", desc: "Curriculum-aligned digital skills sessions for students." },
          { title: "Corporate", desc: "Upskill your team in tools that move your business forward." },
          { title: "Organization", desc: "Custom programs for NGOs, associations, and institutions." },
        ].map((t) => (
          <div key={t.title} className="rounded-2xl border border-ink-950/5 bg-white p-6 shadow-sm">
            <h3 className="font-display font-semibold text-ink-950">{t.title} Training</h3>
            <p className="mt-1.5 text-sm text-ink-950/55">{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-8 px-6 lg:grid-cols-2">
        <TrainingForm isTrainerBooking={false} />
        <TrainingForm isTrainerBooking={true} />
      </div>
    </div>
  );
}
