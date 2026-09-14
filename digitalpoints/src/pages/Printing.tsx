import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { submitLead } from "../lib/leads";
import { uploadQuotationFiles } from "../lib/uploads";
import FileDropzone from "../components/forms/FileDropzone";
import { inputClass, labelClass, cardClass } from "../lib/constants";

const premiumEase = [0.22, 1, 0.36, 1] as const;

type Card = { title: string; image: string; description: string };

const brandingItems: Card[] = [
  {
    title: "Logo Design",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=900&auto=format&fit=crop",
    description: "A distinct mark built to work everywhere — from a favicon to a billboard.",
  },
  {
    title: "Brand Identity Design",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=900&auto=format&fit=crop",
    description: "Color, type, and visual rules that keep your brand consistent across every touchpoint.",
  },
  {
    title: "Corporate Profiles & Stationery",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=900&auto=format&fit=crop",
    description: "Company profiles, letterheads, and stationery that read as established and credible.",
  },
  {
    title: "Business Cards & Brochures",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=900&auto=format&fit=crop",
    description: "The physical handshake of your brand — designed and printed to premium finish.",
  },
  {
    title: "Marketing & Promotional Materials",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=900&auto=format&fit=crop",
    description: "Flyers, posters, and campaign materials designed to get picked up and read.",
  },
  {
    title: "Embroidery",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=900&auto=format&fit=crop",
    description: "Branded uniforms and apparel with clean, durable embroidered logos.",
  },
];

const productionItems: Card[] = [
  {
    title: "Digital Printing",
    image: "https://images.pexels.com/photos/37332553/pexels-photo-37332553.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "Business cards, flyers, brochures, posters, invitations, and certificates.",
  },
  {
    title: "Large Format Printing",
    image: "https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "Banners, billboards, roll-ups, large posters, and vehicle graphics.",
  },
  {
    title: "UV & Custom Material Printing",
    image: "https://images.pexels.com/photos/20209020/pexels-photo-20209020.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "Wood, acrylic, glass, metal, cups, bottles, and promotional items.",
  },
  {
    title: "Packaging & Label Printing",
    image: "https://images.pexels.com/photos/29630126/pexels-photo-29630126.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "Product labels, stickers, boxes, and packaging materials.",
  },
  {
    title: "Apparel & Promotional Printing",
    image: "https://images.pexels.com/photos/15718298/pexels-photo-15718298.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "T-shirts, uniforms, caps, bags, mugs, and branded promotional products.",
  },
];

const process = [
  { step: "01", title: "Brief & Concept", body: "We learn your brand and the brief, then sketch directions before touching final design." },
  { step: "02", title: "Design & Proof", body: "You review a proof and request changes before anything goes to print or production." },
  { step: "03", title: "Print & Produce", body: "Approved designs are produced on the right materials and finish for the job." },
  { step: "04", title: "Deliver & Support", body: "Delivered on schedule, with source files kept on hand for future reprints." },
];

const PRODUCT_OPTIONS = [
  "Logo Design",
  "Brand Identity Design",
  "Corporate Profiles & Stationery",
  "Business Cards & Brochures",
  "Marketing & Promotional Materials",
  "Embroidery",
  "Digital Printing",
  "Large Format Printing",
  "UV & Custom Material Printing",
  "Packaging & Label Printing",
  "Apparel & Promotional Printing",
  "Custom / Other",
];

function CardGrid({ items }: { items: Card[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: premiumEase }}
          whileHover={{ y: -8 }}
          className="group flex flex-col overflow-hidden rounded-3xl border border-ink-950/5 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
        >
          <div className="h-44 w-full overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-base font-semibold text-ink-950">{item.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-950/60">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Printing() {
  const shouldReduceMotion = useReducedMotion();
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
    <div className="min-h-screen bg-cream-50">
      <section
        className="relative overflow-hidden px-6 pb-20 pt-36 text-center sm:pb-24 sm:pt-40"
        style={{ background: "linear-gradient(120deg, #071211 0%, #0a2420 35%, #124a41 65%, #1a5c50 100%)" }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -left-[10%] top-[-15%] h-[320px] w-[320px] rounded-full bg-[#14b8a6]/20 blur-[110px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-[8%] bottom-[-20%] h-[280px] w-[280px] rounded-full bg-[#0d9488]/20 blur-[100px]" />
        <div className="relative mx-auto max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-point-300"
          >
            Print & Branding
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative mt-4 inline-block font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            A brand worth remembering, printed to match
            {!shouldReduceMotion && (
              <motion.svg
                viewBox="0 0 340 18"
                aria-hidden="true"
                className="absolute -bottom-3 left-1/2 h-4 w-[85%] -translate-x-1/2 text-point-300 sm:w-[70%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                <motion.path
                  d="M4 12 C 60 2, 120 16, 170 8 S 280 2, 336 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 0.9, ease: premiumEase }}
                />
              </motion.svg>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mx-auto mt-7 max-w-xl font-poppins text-[15px] leading-relaxed text-white/70"
          >
            From the logo on your website to the banner outside your shop —
            one team designs your brand and produces it to a premium finish.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#quote"
              className="inline-flex h-[48px] min-w-[190px] items-center justify-center rounded-full bg-[#08bdb8] px-7 font-poppins text-[13.5px] font-semibold text-white transition hover:bg-[#10aaa6]"
            >
              Request a Quote
            </a>
            <a
              href="https://wa.me/255750126654"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[48px] min-w-[190px] items-center justify-center rounded-full border border-white/70 bg-white/[0.02] px-7 font-poppins text-[13.5px] font-semibold text-white transition hover:bg-white/[0.08]"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      <section className="bg-dot-grid px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-point-600">Branding & Identity</span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-950 sm:text-3xl">Designed to be instantly recognizable</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-950/55">
              A brand people remember starts with consistent design — here's what we cover.
            </p>
          </div>
          <div className="mt-14">
            <CardGrid items={brandingItems} />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-point-600">Printing & Production</span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-950 sm:text-3xl">Produced to a finish that matches the design</h2>
          </div>
          <div className="mt-14">
            <CardGrid items={productionItems} />
          </div>
        </div>
      </section>

      <section className="bg-dot-grid px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-point-600">How we work</span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-950 sm:text-3xl">From brief to finished print</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-2xl border border-ink-950/5 bg-white p-6"
              >
                <span className="font-display text-2xl font-semibold text-point-300">{s.step}</span>
                <h3 className="mt-3 font-display text-base font-semibold text-ink-950">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-950/60">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="scroll-mt-24 bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto max-w-xl text-center">
            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-point-600">Get started</span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-950 sm:text-3xl">Request a quote</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-950/55">
              Tell us what you need and we'll come back with a clear price and timeline.
            </p>
          </div>
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className={`${cardClass} mt-10 space-y-4`}
          >
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
                <label className={labelClass}>Product / Service</label>
                <select name="product" className={inputClass} defaultValue={PRODUCT_OPTIONS[0]}>
                  {PRODUCT_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
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
          </motion.form>
        </div>
      </section>
    </div>
  );
}
