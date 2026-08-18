import { useEffect, useRef, useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";

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
  is_published: boolean;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const fieldClass =
  "w-full rounded-lg border border-ink-950/10 bg-cream-50 px-4 py-2.5 text-sm text-ink-950 focus:border-point-400/60 focus:outline-none";
const labelClass = "mb-1.5 block text-xs font-medium text-ink-950/50";

export default function CaseStudiesAdmin() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function load() {
    const { data } = await supabase
      .from("case_studies")
      .select("id, title, slug, client_name, challenge, solution, results, client_feedback, cover_image_url, is_published")
      .order("display_order", { ascending: true });
    setStudies(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(s: CaseStudy) {
    setEditing(s);
    setCoverFile(null);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function cancelEdit() {
    setEditing(null);
    setCoverFile(null);
    formRef.current?.reset();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") || "");

    let coverImageUrl: string | null = editing?.cover_image_url ?? null;
    if (coverFile) {
      const path = `${Date.now()}-${coverFile.name}`;
      const { error } = await supabase.storage.from("portfolio-media").upload(path, coverFile);
      if (!error) {
        coverImageUrl = supabase.storage.from("portfolio-media").getPublicUrl(path).data.publicUrl;
      }
    }

    const payload = {
      title,
      client_name: String(form.get("client_name") || ""),
      challenge: String(form.get("challenge") || ""),
      solution: String(form.get("solution") || ""),
      results: String(form.get("results") || ""),
      client_feedback: String(form.get("client_feedback") || ""),
      cover_image_url: coverImageUrl,
    };

    if (editing) {
      await supabase.from("case_studies").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("case_studies").insert({
        ...payload,
        slug: slugify(title) + "-" + Date.now().toString(36),
      });
    }

    setCoverFile(null);
    setEditing(null);
    (e.target as HTMLFormElement).reset();
    setSubmitting(false);
    load();
  }

  async function togglePublish(s: CaseStudy) {
    await supabase.from("case_studies").update({ is_published: !s.is_published }).eq("id", s.id);
    load();
  }

  async function remove(s: CaseStudy) {
    if (!confirm(`Delete "${s.title}"? This cannot be undone.`)) return;
    await supabase.from("case_studies").delete().eq("id", s.id);
    if (editing?.id === s.id) cancelEdit();
    load();
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink-950">Case Studies</h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        key={editing?.id ?? "new"}
        className="mb-8 grid gap-4 rounded-2xl border border-ink-950/5 bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        <div className="sm:col-span-2 flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold text-point-700">
            {editing ? `Editing: ${editing.title}` : "Add New Case Study"}
          </h2>
          {editing && (
            <button type="button" onClick={cancelEdit} className="text-xs text-ink-950/50 hover:text-ink-950">
              Cancel edit
            </button>
          )}
        </div>
        <div>
          <label className={labelClass}>Title</label>
          <input name="title" required defaultValue={editing?.title} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Client name</label>
          <input name="client_name" defaultValue={editing?.client_name ?? ""} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Challenge</label>
          <textarea name="challenge" rows={3} defaultValue={editing?.challenge ?? ""} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Solution</label>
          <textarea name="solution" rows={3} defaultValue={editing?.solution ?? ""} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Results</label>
          <textarea name="results" rows={3} defaultValue={editing?.results ?? ""} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Client feedback</label>
          <textarea
            name="client_feedback"
            rows={3}
            defaultValue={editing?.client_feedback ?? ""}
            className={fieldClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>
            Cover image {editing && "(leave empty to keep current image)"}
          </label>
          {editing?.cover_image_url && !coverFile && (
            <img src={editing.cover_image_url} alt="" className="mb-2 h-24 rounded-lg object-cover" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
            className="text-sm text-ink-950/70"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-point-500 px-6 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-point-400 disabled:opacity-60 sm:col-span-2 sm:w-fit"
        >
          {submitting ? "Saving…" : editing ? "Save Changes" : "Add Case Study"}
        </button>
      </form>

      {loading && <p className="text-sm text-ink-950/40">Loading…</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        {studies.map((s) => (
          <div key={s.id} className="rounded-2xl border border-ink-950/5 bg-white p-5 shadow-sm">
            {s.cover_image_url && (
              <img src={s.cover_image_url} alt={s.title} className="mb-3 h-32 w-full rounded-lg object-cover" />
            )}
            <h3 className="font-display font-semibold text-ink-950">{s.title}</h3>
            <p className="text-xs text-ink-950/40">{s.client_name}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => togglePublish(s)}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                  s.is_published ? "bg-point-50 text-point-700" : "bg-cream-100 text-ink-950/50"
                }`}
              >
                {s.is_published ? "Published" : "Draft"}
              </button>
              <button
                onClick={() => startEdit(s)}
                className="rounded-lg border border-ink-950/10 px-2.5 py-1.5 text-xs text-ink-950/70 hover:text-point-700"
              >
                Edit
              </button>
              <button
                onClick={() => remove(s)}
                className="rounded-lg border border-ink-950/10 px-2.5 py-1.5 text-xs text-ink-950/50 hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
