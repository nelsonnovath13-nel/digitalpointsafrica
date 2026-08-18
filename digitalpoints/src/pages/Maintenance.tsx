import { useState } from "react";
import LeadForm from "../components/forms/LeadForm";

const PLANS = [
  {
    name: "Starter Care",
    price: "Contact us",
    features: ["Monthly content updates", "Uptime monitoring", "Basic security scans", "Email support"],
  },
  {
    name: "Business Care",
    price: "Contact us",
    features: [
      "Bi-weekly content updates",
      "Uptime & performance monitoring",
      "Security monitoring + backups",
      "Priority WhatsApp support",
    ],
    featured: true,
  },
  {
    name: "Enterprise Care",
    price: "Contact us",
    features: [
      "Weekly content updates",
      "Advanced security monitoring",
      "Daily backups",
      "Dedicated technical support",
    ],
  },
];

export default function Maintenance() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-cream-50 pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          Website Maintenance
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">
          Keep your website running at its best
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-950/55">
          Content updates, security monitoring, backups, and technical support — choose the plan that fits your
          business.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 px-6 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-3xl border bg-white p-8 shadow-sm ${
              plan.featured ? "border-point-400" : "border-ink-950/5"
            }`}
          >
            <h3 className="font-display text-xl font-semibold text-ink-950">{plan.name}</h3>
            <p className="mt-1 text-sm text-point-600">{plan.price}</p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm text-ink-950/65">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-point-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedPlan(plan.name)}
              className={`mt-8 rounded-full py-3 text-sm font-semibold transition ${
                plan.featured
                  ? "bg-point-500 text-ink-950 hover:bg-point-400"
                  : "border border-ink-950/15 text-ink-950/85 hover:border-ink-950/30 hover:bg-cream-100"
              }`}
            >
              {selectedPlan === plan.name ? "Selected ↓" : "Request this plan"}
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="mx-auto mt-14 max-w-xl px-6">
          <h3 className="mb-4 text-center font-display text-lg font-semibold text-ink-950">
            Requesting: {selectedPlan}
          </h3>
          <LeadForm
            serviceCategory="website_maintenance"
            sourcePage="/maintenance"
            submitLabel={`Request ${selectedPlan}`}
            noteInMessage={`Plan: ${selectedPlan}`}
          />
        </div>
      )}
    </div>
  );
}
