import type { ServiceCategory } from "./leads";

export const SERVICE_CATEGORIES: { value: ServiceCategory; label: string; group: string }[] = [
  { value: "media_production", label: "Media Production", group: "Media Production" },
  { value: "photography", label: "Photography", group: "Media Production" },
  { value: "videography", label: "Videography", group: "Media Production" },
  { value: "live_streaming", label: "Live Streaming", group: "Media Production" },
  { value: "website_design", label: "Website Design", group: "Digital Solutions" },
  { value: "web_applications", label: "Web Applications", group: "Digital Solutions" },
  { value: "business_systems", label: "Business Systems", group: "Digital Solutions" },
  { value: "ecommerce", label: "E-commerce", group: "Digital Solutions" },
  { value: "ai_automation", label: "AI Automation", group: "AI Automation" },
  { value: "whatsapp_bots", label: "WhatsApp Bots", group: "AI Automation" },
  { value: "customer_support_automation", label: "Customer Support Automation", group: "AI Automation" },
  { value: "lead_generation_systems", label: "Lead Generation Systems", group: "AI Automation" },
  { value: "branding_design", label: "Branding & Design", group: "Branding & Design" },
  { value: "printing_services", label: "Printing Services", group: "Printing Services" },
  { value: "training", label: "Training Programs", group: "Training Programs" },
  { value: "digital_consultation", label: "Digital Consultation", group: "Digital Consultation" },
  { value: "website_maintenance", label: "Website Maintenance", group: "Website Maintenance" },
  { value: "other", label: "Other / Not Sure", group: "Other" },
];

export const BUDGET_RANGES = [
  { value: "under_500k_tzs", label: "Under 500,000 TZS" },
  { value: "500k_1m_tzs", label: "500,000 – 1,000,000 TZS" },
  { value: "1m_3m_tzs", label: "1,000,000 – 3,000,000 TZS" },
  { value: "3m_10m_tzs", label: "3,000,000 – 10,000,000 TZS" },
  { value: "over_10m_tzs", label: "Over 10,000,000 TZS" },
  { value: "not_sure", label: "Not sure yet" },
];

export const PROJECT_TIMELINES = [
  { value: "asap", label: "As soon as possible" },
  { value: "within_1_month", label: "Within 1 month" },
  { value: "1_3_months", label: "1–3 months" },
  { value: "3_6_months", label: "3–6 months" },
  { value: "flexible", label: "Flexible" },
];

export const TRAINING_TYPES = [
  { value: "individual", label: "Individual" },
  { value: "school", label: "School" },
  { value: "corporate", label: "Corporate" },
  { value: "organization", label: "Organization" },
];

export const CONSULTATION_TYPES = [
  { value: "online", label: "Online Consultation" },
  { value: "physical", label: "Physical Consultation" },
  { value: "corporate", label: "Corporate Consultation" },
];

export const inputClass =
  "w-full rounded-lg border border-ink-950/10 bg-cream-50 px-4 py-2.5 text-sm text-ink-950 placeholder:text-ink-950/30 focus:border-point-400/60 focus:outline-none";
export const labelClass = "mb-1.5 block text-xs font-medium text-ink-950/50";
export const cardClass = "rounded-3xl border border-ink-950/5 bg-white p-8 shadow-sm";
