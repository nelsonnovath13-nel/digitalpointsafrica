import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
    }
    // On success, useAdminAuth's onAuthStateChange listener re-renders AdminApp automatically.
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-3xl border border-ink-950/5 bg-white p-8 shadow-lg"
      >
        <div className="mb-2 text-center">
          <span className="font-display text-lg font-semibold text-ink-950">
            Digital<span className="text-point-400">Points</span>
          </span>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ink-950/40">Admin Dashboard</p>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-950/50">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-ink-950/10 bg-cream-50 px-4 py-2.5 text-sm text-ink-950 focus:border-point-400/60 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-950/50">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-lg border border-ink-950/10 bg-cream-50 px-4 py-2.5 text-sm text-ink-950 focus:border-point-400/60 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-point-500 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-point-400 disabled:opacity-60"
        >
          {status === "submitting" ? "Signing in…" : "Sign In"}
        </button>
        {status === "error" && <p className="text-center text-xs text-red-400">{errorMessage}</p>}
      </form>
    </div>
  );
}
