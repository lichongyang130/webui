"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

interface Comment {
  id: string;
  name: string;
  body: string;
  rating: number;
  at: string;
}

export default function Comments({ slug, lang = "en" }: { slug: string; lang?: Lang }) {
  const zh = lang === "zh";
  const [list, setList] = useState<Comment[]>([]);
  const [avg, setAvg] = useState(0);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    try {
      const res = await fetch(`/api/comments/${slug}`, { cache: "no-store" });
      const data = await res.json();
      setList(data.comments ?? []);
      setAvg(data.avg ?? 0);
      setCount(data.count ?? 0);
    } catch {
      /* ignore */
    }
  }
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!name.trim() || body.trim().length < 2) {
      setErr(zh ? "请填写昵称和评论内容" : "Please add a name and a comment");
      return;
    }
    setBusy(true);
    const res = await fetch(`/api/comments/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, body, rating }),
    });
    setBusy(false);
    if (res.ok) {
      setName("");
      setBody("");
      setRating(5);
      load();
    } else {
      const data = await res.json().catch(() => ({}));
      setErr(data.error ?? "Failed");
    }
  }

  return (
    <section className="mt-14 border-t border-white/[0.07] pt-10">
      <h2 className="flex items-center gap-3 text-xl font-extrabold tracking-tight">
        {zh ? "评论与评分" : "Comments & ratings"}
        {count > 0 && (
          <span className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs font-bold text-amber-300">
            ★ {avg.toFixed(1)} <span className="text-white/40">({count})</span>
          </span>
        )}
      </h2>

      {/* form */}
      <form onSubmit={submit} className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/60">{zh ? "你的评分" : "Your rating"}:</span>
          <div className="flex" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onMouseEnter={() => setHover(n)}
                onClick={() => setRating(n)}
                className={`text-2xl leading-none transition ${
                  (hover || rating) >= n ? "text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,.6)]" : "text-white/15"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={zh ? "昵称" : "Your name"}
            className="input-dark"
            maxLength={40}
          />
          <input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={zh ? "说说你的还原效果或用法…" : "Did the prompt work for you? Share your result…"}
            className="input-dark"
            maxLength={600}
          />
        </div>
        <div className="flex items-center gap-3">
          <button disabled={busy} className="grad-btn !py-2 text-xs disabled:opacity-50">
            {busy ? (zh ? "发布中…" : "Posting…") : zh ? "发布评论" : "Post comment"}
          </button>
          {err && <span className="text-xs text-rose-300">{err}</span>}
        </div>
      </form>

      {/* list */}
      <div className="mt-6 space-y-3">
        {list.length === 0 && (
          <p className="text-sm text-white/35">
            {zh ? "还没有评论 —— 用这个 Prompt 做完后回来晒个分吧。" : "No comments yet — be the first to rate this asset."}
          </p>
        )}
        {list.map((c) => (
          <div key={c.id} className="fx-reveal fx-revealed rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-black text-white">
                  {c.name.slice(0, 1).toUpperCase()}
                </span>
                <b className="text-sm">{c.name}</b>
                <span className="text-xs text-amber-300">{"★".repeat(c.rating)}</span>
              </div>
              <span className="text-[11px] text-white/30">{new Date(c.at).toLocaleDateString()}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
