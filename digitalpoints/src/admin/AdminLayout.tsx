import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../lib/supabase";

const navItems = [
  { to: "/admin/leads", label: "Leads" },
  { to: "/admin/quotations", label: "Quotations" },
  { to: "/admin/training", label: "Training Requests" },
  { to: "/admin/consultations", label: "Consultations" },
  { to: "/admin/portfolio", label: "Portfolio" },
  { to: "/admin/case-studies", label: "Case Studies" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ink-950">
      <aside className="w-60 shrink-0 border-r border-white/10 p-6">
        <span className="font-display text-lg font-semibold text-white">
          Digital<span className="text-point-400">Points</span>
        </span>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">Admin</p>

        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-point-500/15 text-point-200" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => supabase.auth.signOut()}
          className="mt-10 w-full rounded-lg border border-white/10 px-3 py-2 text-left text-sm text-white/50 transition hover:border-white/25 hover:text-white"
        >
          Sign Out
        </button>
      </aside>

      <main className="min-w-0 flex-1 bg-cream-50 p-8 text-ink-950">{children}</main>
    </div>
  );
}
