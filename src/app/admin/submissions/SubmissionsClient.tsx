"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";
import SlideConfirm from "@/components/fx/SlideConfirm";

interface Row {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  categoryName: string;
  author: string;
  email: string;
  submittedAt: string;
  tags: string[];
  html: string;
}

export default function SubmissionsClient({ initial }: { initial: Row[] }) {
  const router = useRouter();
  const [rows, setRows] = useState(rowsWithFlag(initial));
  const [preview, setPreview] = useState<Row | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  function rowsWithFlag(r: Row[]) {
    return r.map((x) => ({ ...x, _done: false }));
  }

  async function approve(id: string) {
    setBusy(id);
    const res = await fetch(`/api/admin/submissions/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: "{}" });
    if (res.ok) {
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, _done: true } : r)));
      router.refresh();
    }
    setBusy(null);
  }

  const [confirmReject, setConfirmReject] = useState<string | null>(null);

  async function reject(id: string) {
    setBusy(id);
    const res = await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, _done: true } : r)));
      router.refresh();
    }
    setBusy(null);
    setConfirmReject(null);
  }

  const visible = rows.filter((r) => !r._done);

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {visible.map((r) => (
          <div key={r.id} className="glass rounded-2xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip">{r.categoryName}</span>
                  <span className="text-xs text-white/35">
                    by <b className="text-white/60">{r.author}</b>
                    {r.email && <> · {r.email}</>}
                  </span>
                  <span className="text-xs text-white/30">
                    {new Date(r.submittedAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <h3 className="mt-2 text-base font-bold">{r.title}</h3>
                <p className="mt-1 line-clamp-2 max-w-2xl text-sm text-white/50">{r.summary}</p>
                {r.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {r.tags.map((tag) => (
                      <span key={tag} className="chip !px-2 !py-0.5 text-[10px]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => setPreview(preview?.id === r.id ? null : r)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-white/70 transition hover:border-cyan-400/40 hover:text-white"
                >
                  <Icon name="eye" className="h-3.5 w-3.5" /> {preview?.id === r.id ? "Hide" : "Preview"}
                </button>
                <button
                  disabled={busy === r.id}
                  onClick={() => approve(r.id)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-3.5 py-2 text-xs font-bold text-white transition hover:brightness-110"
                >
                  <Icon name="check" className="h-3.5 w-3.5" /> Approve
                </button>
                <button
                  disabled={busy === r.id}
                  onClick={() => setConfirmReject(confirmReject === r.id ? null : r.id)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3.5 py-2 text-xs font-bold text-rose-300 transition hover:bg-rose-500/20"
                >
                  <Icon name="trash" className="h-3.5 w-3.5" /> Reject
                </button>
              </div>
            </div>
            {confirmReject === r.id && (
              <div className="mt-3 flex items-center gap-3">
                <SlideConfirm
                  label="Slide to reject & delete"
                  doneLabel="Rejected"
                  onConfirm={() => reject(r.id)}
                  className="max-w-xs"
                />
                <button onClick={() => setConfirmReject(null)} className="text-xs text-white/40 underline">
                  cancel
                </button>
              </div>
            )}
            {preview?.id === r.id && (
              <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a18]">
                <iframe srcDoc={r.html} title={r.title} sandbox="allow-scripts" className="h-[360px] w-full border-0" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
