"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

type AnyRecord = Record<string, string | number | boolean | null | undefined>;

export function Dashboard({ leads, events }: { leads: AnyRecord[]; events: AnyRecord[] }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="px-5 py-8 md:px-10">
      <header className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-aureate">American Dream</p>
          <h1 className="font-display text-5xl md:text-7xl">Opportunity Dashboard</h1>
        </div>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white/70 transition hover:border-aureate/50 hover:text-aureate">
          <LogOut size={16} />
          Sign out
        </button>
      </header>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Stat label="Leads" value={leads.length} />
        <Stat label="Event briefs" value={events.length} />
        <Stat label="Conversion paths" value={3} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Leasing & Sponsorship Leads" rows={leads} empty="No leads yet." />
        <Panel title="Event Bookings" rows={events} empty="No event briefs yet." />
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass rounded-[0.5rem] p-6">
      <div className="gold-text font-display text-5xl">{value}</div>
      <p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/45">{label}</p>
    </div>
  );
}

function Panel({ title, rows, empty }: { title: string; rows: AnyRecord[]; empty: string }) {
  return (
    <section className="glass rounded-[0.5rem] p-5">
      <h2 className="mb-5 font-display text-3xl">{title}</h2>
      <div className="grid gap-3">
        {rows.length === 0 && <p className="rounded-[0.5rem] border border-white/10 p-4 text-white/48">{empty}</p>}
        {rows.map((row, index) => (
          <article key={`${row.email}-${index}`} className="rounded-[0.5rem] border border-white/10 bg-black/25 p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-semibold text-aureate">{row.company}</h3>
              <span className="text-xs uppercase tracking-[0.18em] text-white/38">{String(row.createdAt || "")}</span>
            </div>
            <p className="text-sm text-white/75">{row.name} · {row.email}</p>
            <p className="mt-3 text-sm leading-6 text-white/55">{String(row.message || row.notes || "")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
