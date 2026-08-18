import type { ReactNode } from "react";

interface AdminTableProps {
  title: string;
  loading: boolean;
  empty: boolean;
  emptyLabel?: string;
  headerActions?: ReactNode;
  columns: string[];
  children: ReactNode;
}

export default function AdminTable({
  title,
  loading,
  empty,
  emptyLabel = "No records yet.",
  headerActions,
  columns,
  children,
}: AdminTableProps) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink-950">{title}</h1>
        {headerActions}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-ink-950/5 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink-950/10 bg-cream-50 text-xs uppercase tracking-wide text-ink-950/40">
              {columns.map((c) => (
                <th key={c} className="px-4 py-3 font-medium">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-950/5">{children}</tbody>
        </table>

        {loading && <p className="p-6 text-center text-sm text-ink-950/40">Loading…</p>}
        {!loading && empty && <p className="p-6 text-center text-sm text-ink-950/40">{emptyLabel}</p>}
      </div>
    </div>
  );
}
