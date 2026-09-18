import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { SERVICE_CATEGORIES } from "../lib/constants";

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string | null;
  cover_image_url: string | null;
}

const CATEGORY_FILTERS = [
  { value: "All", label: "All" },
  { value: "website_design", label: "Websites" },
  { value: "business_systems", label: "Systems" },
  { value: "branding_design", label: "Branding" },
  { value: "photography", label: "Photography" },
  { value: "videography", label: "Videography" },
  { value: "live_streaming", label: "Streaming" },
];

const FALLBACK_TONE = "linear-gradient(160deg,#0eab8f,#07090a)";

const PLACEHOLDER_PROJECTS: PortfolioProject[] = [
  {
    id: "placeholder-website_design",
    title: "Corporate Website Redesign",
    slug: "placeholder-website-design",
    category: "website_design",
    summary: "A modern, fast website built to turn visitors into customers.",
    cover_image_url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "placeholder-business_systems",
    title: "Business Management System",
    slug: "placeholder-business-systems",
    category: "business_systems",
    summary: "A custom system built to run day-to-day operations in one place.",
    cover_image_url: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "placeholder-branding_design",
    title: "Brand Identity Refresh",
    slug: "placeholder-branding-design",
    category: "branding_design",
    summary: "A complete visual identity — logo, colors, and brand guidelines.",
    cover_image_url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "placeholder-photography",
    title: "Product & Event Photography",
    slug: "placeholder-photography",
    category: "photography",
    summary: "Clean, professional photography for products and live events.",
    cover_image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "placeholder-videography",
    title: "Brand Story Video",
    slug: "placeholder-videography",
    category: "videography",
    summary: "A short brand film built to communicate who you are, clearly.",
    cover_image_url: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "placeholder-live_streaming",
    title: "Conference Live Stream",
    slug: "placeholder-live-streaming",
    category: "live_streaming",
    summary: "Multi-camera live streaming for a corporate conference.",
    cover_image_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=900&auto=format&fit=crop",
  },
];

function serviceLabel(category: string): string {
  return SERVICE_CATEGORIES.find((s) => s.value === category)?.label ?? category;
}

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-ink-950/5 bg-white shadow-sm">
      <div className="h-44 animate-pulse bg-ink-950/[0.06]" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="h-4 w-20 animate-pulse rounded-full bg-ink-950/[0.06]" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-ink-950/[0.08]" />
        <div className="h-4 w-full animate-pulse rounded bg-ink-950/[0.06]" />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { data, error } = await supabase
          .from("portfolio_projects")
          .select("id, title, slug, category, summary, cover_image_url")
          .eq("is_published", true)
          .order("display_order", { ascending: true });
        if (cancelled) return;
        if (error) {
          setLoadError(true);
        } else {
          setProjects(data ?? []);
        }
      } catch {
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const realShown = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const placeholderShown =
    filter === "All" ? PLACEHOLDER_PROJECTS : PLACEHOLDER_PROJECTS.filter((p) => p.category === filter);
  const usingPlaceholders = !loading && !loadError && realShown.length === 0;
  const shown = usingPlaceholders ? placeholderShown : realShown;
  const activeLabel = CATEGORY_FILTERS.find((c) => c.value === filter)?.label ?? filter;

  return (
    <div className="min-h-screen bg-cream-50">
      <section
        className="relative overflow-hidden px-6 pb-16 pt-36 text-center sm:pb-20 sm:pt-40"
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
            Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            Real work, across every service we offer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl font-poppins text-[15px] leading-relaxed text-white/70"
          >
            A look at branding, websites, systems, and media production
            delivered for businesses across Tanzania and Africa.
          </motion.p>
        </div>
      </section>

      <div className="bg-dot-grid px-6 pb-24 pt-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORY_FILTERS.map((c) => (
              <button
                key={c.value}
                onClick={() => setFilter(c.value)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  filter === c.value
                    ? "border-point-600 bg-point-600 text-white"
                    : "border-ink-950/10 bg-white text-ink-950/60 hover:border-point-400/50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!loading && loadError && (
            <div className="mx-auto mt-16 max-w-md text-center">
              <p className="text-sm text-ink-950/50">
                We couldn't load the portfolio right now. Please refresh the page, or reach out and we'll show you examples directly.
              </p>
              <a
                href="https://wa.me/255750126654"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-point-500 px-6 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-point-400"
              >
                Chat on WhatsApp
              </a>
            </div>
          )}

          {!loading && !loadError && shown.length === 0 && (
            <div className="mx-auto mt-16 max-w-md text-center">
              <p className="text-sm text-ink-950/50">
                {filter === "All"
                  ? "Our published portfolio is being updated — check back soon."
                  : `No ${activeLabel.toLowerCase()} work published yet — check back soon, or ask us directly for examples.`}
              </p>
              <Link
                to="/quotation"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-point-500 px-6 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-point-400"
              >
                Request a Quote
              </Link>
            </div>
          )}

          {!loading && !loadError && shown.length > 0 && (
            <>
              {usingPlaceholders && (
                <p className="mx-auto mt-10 max-w-lg text-center text-xs text-ink-950/40">
                  Sample projects shown below while we publish our full portfolio.
                </p>
              )}
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-ink-950/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="relative h-44 overflow-hidden"
                    style={
                      p.cover_image_url
                        ? { backgroundImage: `url(${p.cover_image_url})`, backgroundSize: "cover", backgroundPosition: "center" }
                        : { background: FALLBACK_TONE }
                    }
                  >
                    <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-point-400 to-accent-500 transition-transform duration-300 group-hover:scale-x-100" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.14),transparent_55%)]" />
                    {usingPlaceholders && (
                      <span className="absolute right-3 top-3 z-10 rounded-full bg-ink-950/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                        Sample
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <span className="inline-block w-fit rounded-full bg-point-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-point-700">
                      {serviceLabel(p.category)}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold text-ink-950">{p.title}</h3>
                    {p.summary && (
                      <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-ink-950/55">{p.summary}</p>
                    )}
                    <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-ink-950/15 px-4 py-2 text-xs font-semibold text-ink-950 transition group-hover:bg-ink-950 group-hover:text-white">
                      View Project →
                    </span>
                  </div>
                </motion.div>
              ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
