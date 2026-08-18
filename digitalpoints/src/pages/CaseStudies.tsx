import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { buildWhatsAppLink } from "../lib/wa";
import ReelLightbox, { type Reel } from "../components/ReelLightbox";

const reels: Reel[] = [
  {
    id: "aerial-1",
    title: "Aerial Drone Reel",
    client: "Field & community coverage — Kilimanjaro region",
    src: "/media/reels/aerial-drone-1.mp4",
    poster: "/media/reels/aerial-drone-1-poster.jpg",
  },
  {
    id: "documentary",
    title: "Documentary Interview Reel",
    client: "Field documentary production",
    src: "/media/reels/documentary-interview.mp4",
    poster: "/media/reels/documentary-interview-poster.jpg",
  },
  {
    id: "aerial-2",
    title: "Event & Community Aerial Coverage",
    client: "Government & NGO events — Tanzania",
    src: "/media/reels/aerial-drone-2.mp4",
    poster: "/media/reels/aerial-drone-2-poster.jpg",
  },
];

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  challenge: string | null;
  solution: string | null;
  results: string | null;
  client_feedback: string | null;
  cover_image_url: string | null;
}

export default function CaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("case_studies")
      .select("id, title, slug, client_name, challenge, solution, results, client_feedback, cover_image_url")
      .eq("is_published", true)
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        if (!cancelled) {
          setStudies(data ?? []);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream-50 pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          Case Studies
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">
          Real results for real businesses
        </h1>
      </div>

      <div className="mx-auto mt-14 max-w-4xl px-6">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.25em] text-point-600">
          Watch our work
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {reels.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-video overflow-hidden rounded-2xl border border-ink-950/5 shadow-sm"
            >
              <img
                src={r.poster}
                alt={r.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
              <span className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition group-hover:scale-110 group-hover:bg-white/25">
                ▶
              </span>
              <h3 className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-semibold text-white">
                {r.title}
              </h3>
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="mt-16 text-center text-sm text-ink-950/40">Loading case studies…</p>}
      {!loading && studies.length === 0 && (
        <p className="mt-16 text-center text-sm text-ink-950/40">
          Case studies coming soon — check back shortly.
        </p>
      )}

      <div className="mx-auto mt-14 max-w-4xl space-y-8 px-6">
        {studies.map((s) => (
          <article key={s.id} className="rounded-3xl border border-ink-950/5 bg-white p-8 shadow-sm">
            {s.cover_image_url && (
              <img
                src={s.cover_image_url}
                alt={s.title}
                className="mb-6 h-48 w-full rounded-2xl object-cover"
              />
            )}
            <span className="text-xs uppercase tracking-wide text-point-600">
              {s.client_name ?? "Client Story"}
            </span>
            <h2 className="mt-1 font-display text-2xl font-semibold text-ink-950">{s.title}</h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {[
                { label: "Challenge", text: s.challenge },
                { label: "Solution", text: s.solution },
                { label: "Results", text: s.results },
              ].map(
                (block) =>
                  block.text && (
                    <div key={block.label}>
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-point-600">
                        {block.label}
                      </h3>
                      <p className="mt-1.5 text-sm text-ink-950/65">{block.text}</p>
                    </div>
                  ),
              )}
            </div>

            {s.client_feedback && (
              <blockquote className="mt-6 border-l-2 border-point-400 pl-4 text-sm italic text-ink-950/70">
                “{s.client_feedback}”
              </blockquote>
            )}

            <div className="mt-6">
              <a
                href={buildWhatsAppLink(null, `Hi Digital Points, I saw your case study "${s.title}" and I'd like to discuss a similar project.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full bg-point-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-point-400"
              >
                Discuss a similar project
              </a>
            </div>
          </article>
        ))}
      </div>

      {lightboxIndex !== null && (
        <ReelLightbox
          reels={reels}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
