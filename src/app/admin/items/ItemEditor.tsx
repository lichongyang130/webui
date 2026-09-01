"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { CATEGORIES, TECH_LABELS } from "@/lib/categories";
import type { Item, Tech } from "@/lib/types";

interface EditorItem {
  id?: string;
  slug: string;
  category: Item["category"];
  title: string;
  summary: string;
  author: string;
  tags: string[];
  tech: Tech[];
  stars: number;
  views: number;
  copies: number;
  featured: boolean;
  published: boolean;
  html: string;
  prompt: string;
  sourceUrl: string;
}

const EMPTY: EditorItem = {
  slug: "",
  category: "components",
  title: "",
  summary: "",
  author: "MotionVault",
  tags: [],
  tech: ["html", "css", "javascript"],
  stars: 0,
  views: 0,
  copies: 0,
  featured: false,
  published: true,
  html: "",
  prompt: "",
  sourceUrl: "",
};

export default function ItemEditor({ existing }: { existing?: Item }) {
  const router = useRouter();
  const [item, setItem] = useState<EditorItem>(
    existing
      ? {
          id: existing.id,
          slug: existing.slug,
          category: existing.category,
          title: existing.title,
          summary: existing.summary,
          author: existing.author,
          tags: existing.tags,
          tech: existing.tech,
          stars: existing.stars,
          views: existing.views,
          copies: existing.copies,
          featured: existing.featured,
          published: existing.published,
          html: existing.html,
          prompt: existing.prompt,
          sourceUrl: existing.sourceUrl ?? "",
        }
      : EMPTY
  );
  const [tagInput, setTagInput] = useState(existing?.tags.join(", ") ?? "");
  const [showPreview, setShowPreview] = useState(!!existing);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const set = <K extends keyof EditorItem>(k: K, v: EditorItem[K]) =>
    setItem((it) => ({ ...it, [k]: v }));

  function toggleTech(t: Tech) {
    set(
      "tech",
      item.tech.includes(t) ? item.tech.filter((x) => x !== t) : [...item.tech, t]
    );
  }

  async function save() {
    setErr("");
    if (!item.title.trim()) return setErr("Title is required.");
    if (!item.html.trim()) return setErr("HTML / preview code is required.");
    setSaving(true);
    const payload = {
      ...item,
      tags: tagInput
        .split(",")
        .map((t) => t.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim())
        .filter(Boolean),
      sourceUrl: item.sourceUrl || undefined,
    };
    const res = await fetch(
      existing ? `/api/admin/items/${existing.id}` : "/api/admin/items",
      {
        method: existing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return setErr(data.error ?? "Save failed.");
    }
    const data = await res.json();
    router.push(`/admin/items?highlight=${data.item.id}`);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/items" className="text-xs text-white/40 hover:text-white">
            ← All items
          </Link>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight">
            {existing ? "Edit item" : "Add new item"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview((s) => !s)}
            className="ghost-btn !py-2.5"
          >
            <Icon name="eye" className="h-4 w-4" /> {showPreview ? "Hide preview" : "Test preview"}
          </button>
          <button onClick={save} disabled={saving} className="grad-btn disabled:opacity-60">
            <Icon name="check" className="h-4 w-4" /> {saving ? "Saving…" : existing ? "Save changes" : "Create item"}
          </button>
        </div>
      </div>

      {err && (
        <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {err}
        </p>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        {/* LEFT: form */}
        <div className="space-y-5">
          <section className="glass rounded-2xl p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/40">Basics</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-white/50">Title *</label>
                <input
                  className="input-dark"
                  value={item.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. Aurora SaaS Landing with Drifting Blobs"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-white/50">Summary</label>
                <textarea
                  className="input-dark min-h-[70px] resize-y"
                  value={item.summary}
                  onChange={(e) => set("summary", e.target.value)}
                  placeholder="One or two sentences describing what this asset does."
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-white/50">Category</label>
                  <select
                    className="input-dark cursor-pointer"
                    value={item.category}
                    onChange={(e) => set("category", e.target.value as Item["category"])}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug} className="bg-[#161632]">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-white/50">Author / source</label>
                  <input
                    className="input-dark"
                    value={item.author}
                    onChange={(e) => set("author", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-white/50">
                  Tags <span className="text-white/30">(comma separated)</span>
                </label>
                <input
                  className="input-dark"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="saas, hero, gradient, landing"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-white/50">Source URL (optional)</label>
                <input
                  className="input-dark"
                  value={item.sourceUrl}
                  onChange={(e) => set("sourceUrl", e.target.value)}
                  placeholder="https://reactbits.dev"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold text-white/50">Tech stack</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(TECH_LABELS).map(([k, v]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => toggleTech(k as Tech)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                        item.tech.includes(k as Tech)
                          ? "border-violet-400/60 bg-violet-500/20 text-violet-200"
                          : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {(["stars", "views", "copies"] as const).map((f) => (
                  <div key={f}>
                    <label className="mb-1.5 block text-xs font-semibold capitalize text-white/50">{f}</label>
                    <input
                      type="number"
                      className="input-dark"
                      value={item[f]}
                      onChange={(e) => set(f, Number(e.target.value))}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-5 pt-1">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={item.published}
                    onChange={(e) => set("published", e.target.checked)}
                    className="h-4 w-4 accent-fuchsia-500"
                  />
                  Published (visible on public site)
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={item.featured}
                    onChange={(e) => set("featured", e.target.checked)}
                    className="h-4 w-4 accent-amber-400"
                  />
                  Featured on homepage
                </label>
              </div>
            </div>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/40">
              AI Prompt <span className="normal-case text-white/30">— what users paste into their AI coding tool</span>
            </h2>
            <textarea
              className="input-dark min-h-[220px] resize-y font-mono !text-[12.5px] leading-relaxed"
              value={item.prompt}
              onChange={(e) => set("prompt", e.target.value)}
              placeholder="Describe the asset in rich detail: layout, colors, animations, easing curves, interaction behavior, tech constraints…"
            />
            <p className="mt-2 text-xs text-white/35">
              Tip: name exact colors, timings, easing curves and interactions — the more detail, the closer the 1:1 reproduction.
            </p>
          </section>
        </div>

        {/* RIGHT: code + preview */}
        <div className="space-y-5">
          <section className="glass rounded-2xl p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/40">
              Live-preview HTML * <span className="normal-case text-white/30">— self-contained document</span>
            </h2>
            <textarea
              className="input-dark min-h-[320px] resize-y font-mono !text-[12px] leading-relaxed"
              value={item.html}
              onChange={(e) => set("html", e.target.value)}
              placeholder="<!DOCTYPE html><html>…paste a complete, self-contained HTML document with inline CSS/JS…"
            />
            <p className="mt-2 text-xs text-white/35">
              Must be a full HTML document (inline <code className="text-white/55">&lt;style&gt;</code> and{" "}
              <code className="text-white/55">&lt;script&gt;</code>) — it runs sandboxed in the live preview.
            </p>
          </section>

          {showPreview && (
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a18]">
              <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> LIVE PREVIEW
                </span>
                <span className="text-[11px] text-white/35">sandboxed iframe</span>
              </div>
              <iframe
                srcDoc={item.html || "<body style='background:#070711'></body>"}
                title="admin preview"
                sandbox="allow-scripts"
                className="h-[420px] w-full border-0"
              />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
