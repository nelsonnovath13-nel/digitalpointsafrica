import LeadForm from "../components/forms/LeadForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-cream-50 pb-24 pt-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          Contact
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">
          Let's talk about your project
        </h1>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-8 px-6 lg:grid-cols-2">
        <LeadForm serviceCategory="other" sourcePage="/contact" />

        <div className="space-y-6">
          <div className="rounded-3xl border border-ink-950/5 bg-white p-8 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-ink-950">Reach us directly</h2>
            <div className="mt-4 space-y-3 text-sm text-ink-950/70">
              <a href="https://wa.me/255714214247" className="block hover:text-point-700">
                WhatsApp — +255 714 214 247
              </a>
              <a href="mailto:hello@digitalpoints.co.tz" className="block hover:text-point-700">
                hello@digitalpoints.co.tz
              </a>
              <p className="text-ink-950/50">Moshi, Kilimanjaro, Tanzania</p>
            </div>
          </div>
          <div className="h-64 overflow-hidden rounded-3xl border border-ink-950/5 shadow-sm">
            <iframe
              title="Digital Points location"
              className="h-full w-full grayscale"
              src="https://www.google.com/maps?q=Moshi,Tanzania&output=embed"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
