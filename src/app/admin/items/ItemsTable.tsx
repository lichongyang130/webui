"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";

interface Row {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  author: string;
  views: number;
  copies: number;
  featured: boolean;
  published: boolean;
  updatedAt: string;
}

export default function ItemsTable({ initial }: { initial: Row[] }) {
  const router = useRouter();
  const [rows, setRows] = useState(rowsWithDelete(initial));
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  function rowsWithDelete(r: Row[]) {
    return r.map((x) => ({ ...x, _deleted: false }));
  }

  const filtered = rows
    .filter((r) => !r._deleted)
    .filter((r) => (cat ? r.category === cat : true))
    .filter((r) =>
      q ? r.title.toLowerCase().includes(q.toLowerCase()) || r.author.toLowerCase().includes(q.toLowerCase()) : true
    );

  async function toggle(id: string, field: "published" | "featured", value: boolean) {
    setBusy(id);
    await fetch(`/api/admin/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    setBusy(null);
    router.refresh();
  }

  async function doDelete(id: string) {
    setBusy(id);
    const res = await fetch(`/api/admin/items/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, _deleted: true } : r)));
      router.refresh();
    }
    setConfirmId(null);
    setBusy(null);
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.07] p-4">
        <div className="relative min-w-[220px] flex-1">
          <Icon name="search" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search items…"
            className="input-dark !pl-10"
          />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="input-dark w-auto cursor-pointer">
          <option value="" className="bg-[#161632]">All categories</option>
          <option value="templates" className="bg-[#161632]">Site Templates</option>
          <option value="components" className="bg-[#161632]">Components</option>
          <option value="elements" className="bg-[#161632]">UI Elements</option>
          <option value="animations" className="bg-[#161632]">Animations</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.07] text-left text-[11px] uppercase tracking-wider text-white/35">
              <th className="px-4 py-3 font-semibold">Item</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 text-center font-semibold">Stats</th>
              <th className="px-4 py-3 text-center font-semibold">Featured</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {filtered.map((r) => (
              <tr key={r.id} className="group transition hover:bg-white/[0.03]">
                <td className="px-4 py-3.5">
                  <Link href={`/admin/items/${r.id}`} className="font-semibold text-white/90 hover:text-fuchsia-300">
                    {r.title}
                  </Link>
                  <div className="mt-0.5 text-xs text-white/35">by {r.author} · /{r.slug}</div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="chip">{r.categoryName}</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-center gap-3 text-xs text-white/45">
                    <span className="flex items-center gap-1" title="views">
                      <Icon name="eye" className="h-3.5 w-3.5" />
                      {r.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1" title="copies">
                      <Icon name="copy" className="h-3.5 w-3.5" />
                      {r.copies.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <button
                    disabled={busy === r.id}
                    onClick={() => toggle(r.id, "featured", !r.featured)}
                    title="Toggle featured"
                    className={`inline-grid h-7 w-7 place-items-center rounded-lg transition ${
                      r.featured ? "bg-amber-400/20 text-amber-300" : "text-white/25 hover:bg-white/5 hover:text-white/60"
                    }`}
                  >
                    <Icon name="star" className="h-4 w-4" />
                  </button>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <button
                    disabled={busy === r.id}
                    onClick={() => toggle(r.id, "published", !r.published)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition ${
                      r.published
                        ? "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                        : "bg-amber-400/15 text-amber-300 hover:bg-amber-400/25"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${r.published ? "bg-emerald-400" : "bg-amber-400"}`} />
                    {r.published ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/item/${r.slug}`}
                      target="_blank"
                      title="View live"
                      className="grid h-8 w-8 place-items-center rounded-lg text-white/40 transition hover:bg-white/5 hover:text-cyan-300"
                    >
                      <Icon name="external" className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/items/${r.id}`}
                      title="Edit"
                      className="grid h-8 w-8 place-items-center rounded-lg text-white/40 transition hover:bg-white/5 hover:text-violet-300"
                    >
                      <Icon name="edit" className="h-4 w-4" />
                    </Link>
                    {confirmId === r.id ? (
                      <>
                        <button
                          onClick={() => doDelete(r.id)}
                          className="rounded-lg bg-rose-500/20 px-2.5 py-1.5 text-[11px] font-bold text-rose-300 transition hover:bg-rose-500/30"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          className="rounded-lg bg-white/5 px-2.5 py-1.5 text-[11px] font-bold text-white/60"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setConfirmId(r.id)}
                        title="Delete"
                        className="grid h-8 w-8 place-items-center rounded-lg text-white/40 transition hover:bg-rose-500/10 hover:text-rose-300"
                      >
                        <Icon name="trash" className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-14 text-center text-sm text-white/40">
                  No items match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
