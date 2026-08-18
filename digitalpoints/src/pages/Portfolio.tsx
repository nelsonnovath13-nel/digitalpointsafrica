import { useEffect, useState } from "react";
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

function serviceLabel(category: string): string {
  return SERVICE_CATEGORIES.find((s) => s.value === category)?.label ?? category;
}

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("portfolio_projects")
      .select("id, title, slug, category, summary, cover_image_url")
      .eq("is_published", true)
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        if (!cancelled) {
          setProjects(data ?? []);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="bg-dot-grid min-h-screen bg-cream-50 pb-24 pt-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          Portfolio
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">
          Selected work
        </h1>
      </div>

      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2 px-6">
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
        <p className="mt-16 text-center text-sm text-ink-950/40">Loading projects…</p>
      )}

      {!loading && shown.length === 0 && (
        <p className="mt-16 text-center text-sm text-ink-950/40">
          No projects in this category yet — check back soon.
        </p>
      )}

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}
