import { useEffect, useRef, useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import { SERVICE_CATEGORIES } from "../../lib/constants";

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string | null;
  cover_image_url: string | null;
  is_published: boolean;
  display_order: number;
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

export default function PortfolioAdmin() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState<PortfolioProject | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function load() {
    const { data } = await supabase
      .from("portfolio_projects")
      .select("id, title, slug, category, summary, cover_image_url, is_published, display_order")
      .order("display_order", { ascending: true });
    setProjects(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(p: PortfolioProject) {
    setEditing(p);
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
      category: form.get("category"),
      summary: String(form.get("summary") || ""),
      cover_image_url: coverImageUrl,
    };

    if (editing) {
      await supabase.from("portfolio_projects").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("portfolio_projects").insert({
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

  async function togglePublish(p: PortfolioProject) {
    await supabase.from("portfolio_projects").update({ is_published: !p.is_published }).eq("id", p.id);
    load();
  }

  async function remove(p: PortfolioProject) {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    await supabase.from("portfolio_projects").delete().eq("id", p.id);
    if (editing?.id === p.id) cancelEdit();
    load();
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink-950">Portfolio Projects</h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        key={editing?.id ?? "new"}
        className="mb-8 grid gap-4 rounded-2xl border border-ink-950/5 bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        <div className="sm:col-span-2 flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold text-point-700">
            {editing ? `Editing: ${editing.title}` : "Add New Project"}
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
          <label className={labelClass}>Category</label>
          <select name="category" defaultValue={editing?.category} className={fieldClass}>
            {SERVICE_CATEGORIES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Summary</label>
          <textarea name="summary" rows={2} defaultValue={editing?.summary ?? ""} className={fieldClass} />
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
          {submitting ? "Saving…" : editing ? "Save Changes" : "Add Project"}
        </button>
      </form>

      {loading && <p className="text-sm text-ink-950/40">Loading…</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.id} className="rounded-2xl border border-ink-950/5 bg-white p-5 shadow-sm">
            {p.cover_image_url && (
              <img src={p.cover_image_url} alt={p.title} className="mb-3 h-32 w-full rounded-lg object-cover" />
            )}
            <h3 className="font-display font-semibold text-ink-950">{p.title}</h3>
            <p className="text-xs text-ink-950/40">
              {SERVICE_CATEGORIES.find((s) => s.value === p.category)?.label ?? p.category}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => togglePublish(p)}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                  p.is_published ? "bg-point-50 text-point-700" : "bg-cream-100 text-ink-950/50"
                }`}
              >
                {p.is_published ? "Published" : "Draft"}
              </button>
              <button
                onClick={() => startEdit(p)}
                className="rounded-lg border border-ink-950/10 px-2.5 py-1.5 text-xs text-ink-950/70 hover:text-point-700"
              >
                Edit
              </button>
              <button
                onClick={() => remove(p)}
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
