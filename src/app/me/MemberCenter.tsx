"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CATEGORY_MAP } from "@/lib/categories";
import type { PublicUser } from "@/lib/userauth";

export interface MemberItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: "curated" | "pending" | "approved";
  published: boolean;
  views: number;
  copies: number;
  stars: number;
  createdAt: string;
  html: string;
}

const CATS = ["templates", "components", "elements", "animations"] as const;
const TECHS = ["html", "css", "javascript", "react", "tailwind", "gsap", "animejs", "framer"] as const;

const PROVIDER_LABEL = { local: "Email", google: "Google", github: "GitHub" } as const;

export default function MemberCenter({
  user,
  items,
  zh,
}: {
  user: PublicUser;
  items: MemberItem[];
  zh: boolean;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"upload" | "uploads">("upload");
  const [preview, setPreview] = useState<MemberItem | null>(null);
  const [notice, setNotice] = useState("");

  const stats = useMemo(
    () => ({
      uploads: items.length,
      pending: items.filter((i) => i.status === "pending").length,
      published: items.filter((i) => i.published).length,
      copies: items.reduce((s, i) => s + i.copies, 0),
    }),
    [items]
  );

  function flash(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(""), 2600);
  }

  async function removeItem(it: MemberItem) {
    if (!confirm(zh ? `确定删除「${it.title}」？` : `Delete "${it.title}"?`)) return;
    const res = await fetch(`/api/me/items/${it.id}`, { method: "DELETE" });
    if (res.ok) {
      flash(zh ? "已删除" : "Deleted");
      router.refresh();
    } else {
      flash(zh ? "删除失败（仅审核中的内容可删除）" : "Delete failed (only pending items)");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      {/* ── profile card ─────────────────────────────────────────── */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-4">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={user.name}
                className="h-14 w-14 rounded-2xl border border-white/10 object-cover"
              />
            ) : (
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl font-extrabold text-white">
                {user.name.slice(0, 1).toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <div className="truncate text-lg font-extrabold">{user.name}</div>
              <div className="truncate text-xs text-white/40">{user.email}</div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="chip !px-2 !py-0.5 !text-[10px]">
                  {PROVIDER_LABEL[user.provider]}
                </span>
                <span className="chip !px-2 !py-0.5 !text-[10px] text-emerald-300/80">
                  {zh ? "正式会员" : "Member"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            {[
              [stats.uploads, zh ? "上传" : "Uploads"],
              [stats.pending, zh ? "审核中" : "Pending"],
              [stats.published, zh ? "已发布" : "Live"],
            ].map(([n, l], i) => (
              <div key={i} className="rounded-xl border border-white/[0.07] bg-white/[0.03] py-3">
                <div className="text-lg font-extrabold tabular-nums">{n as number}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                  {l as string}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-[11.5px] leading-relaxed text-white/40">
            {zh
              ? "上传的内容经审核通过后会在全站公开展示，并可在详情页一键分享。"
              : "Uploads go live after review, then you can share them from their detail page."}
          </div>

          <p className="mt-4 text-center text-[10.5px] text-white/25">
            {zh ? "注册于" : "Joined"} {new Date(user.createdAt).toLocaleDateString(zh ? "zh-CN" : "en-US")}
          </p>
        </div>
      </aside>

      {/* ── main column ──────────────────────────────────────────── */}
      <section className="min-w-0">
        {/* tabs */}
        <div className="mb-5 flex items-center gap-2">
          {(
            [
              ["upload", zh ? "⬆ 上传内容" : "⬆ Upload"],
              ["uploads", `${zh ? "📦 我的上传" : "📦 My uploads"} (${items.length})`],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                tab === key
                  ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-[0_8px_24px_-8px_rgba(217,70,239,0.7)]"
                  : "border border-white/10 bg-white/[0.04] text-white/55 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
          {notice && (
            <span className="ml-auto rounded-lg bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-300">
              {notice}
            </span>
          )}
        </div>

        {tab === "upload" ? (
          <UploadForm
            zh={zh}
            onDone={() => {
              flash(zh ? "已提交，等待审核" : "Submitted for review");
              setTab("uploads");
              router.refresh();
            }}
          />
        ) : (
          <UploadList items={items} zh={zh} onDelete={removeItem} onPreview={setPreview} onFlash={flash} />
        )}
      </section>

      {/* ── preview modal ────────────────────────────────────────── */}
      {preview && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setPreview(null)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b1a] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
              <span className="truncate text-sm font-bold">{preview.title}</span>
              <button
                onClick={() => setPreview(null)}
                className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-white/60 transition hover:text-white"
              >
                ✕ {zh ? "关闭" : "Close"}
              </button>
            </div>
            <iframe
              srcDoc={preview.html}
              title="preview"
              sandbox="allow-scripts"
              className="h-[60vh] w-full border-0 bg-[#070711]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════ upload form ═══════════════════════════ */

function UploadForm({ zh, onDone }: { zh: boolean; onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<(typeof CATS)[number]>("components");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [tech, setTech] = useState<string[]>(["html", "css"]);
  const [prompt, setPrompt] = useState("");
  const [html, setHtml] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const inputCls = "input-dark !py-2.5";
  const labelCls = "mb-1.5 block text-xs font-bold text-white/55";

  async function submit() {
    setError("");
    if (title.trim().length < 3) return setError(zh ? "标题至少 3 个字符" : "Title needs 3+ characters");
    if (html.trim().length < 40) return setError(zh ? "请粘贴完整的预览 HTML" : "Paste a full preview HTML");
    setBusy(true);
    try {
      const res = await fetch("/api/me/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          summary,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          tech,
          prompt,
          html,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || (zh ? "上传失败" : "Upload failed"));
        setBusy(false);
        return;
      }
      setTitle("");
      setSummary("");
      setTags("");
      setPrompt("");
      setHtml("");
      setBusy(false);
      onDone();
    } catch {
      setError(zh ? "网络错误" : "Network error");
      setBusy(false);
    }
  }

  return (
    <div className="glass rounded-2xl p-6 sm:p-7">
      <h2 className="text-base font-extrabold">
        {zh ? "上传你的动效资源" : "Upload your animated asset"}
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-white/40">
        {zh
          ? "粘贴一个自包含的 HTML 文件（内联 <style>/<script>），右侧即刻预览；提交后进入审核队列，通过即在全站公开。"
          : "Paste a self-contained HTML file (inline <style>/<script>) — preview it live on the right. Submissions enter the review queue and go public once approved."}
      </p>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* left: meta */}
        <div className="grid content-start gap-4">
          <div>
            <label className={labelCls}>{zh ? "标题 *" : "Title *"}</label>
            <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder={zh ? "如：霓虹脉冲按钮" : "e.g. Neon pulse button"} maxLength={120} />
          </div>
          <div>
            <label className={labelCls}>{zh ? "分类 *" : "Category *"}</label>
            <div className="grid grid-cols-2 gap-2">
              {CATS.map((c) => (
                <button key={c} type="button" onClick={() => setCategory(c)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition ${
                    category === c
                      ? "border-fuchsia-400/60 bg-fuchsia-500/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/50 hover:text-white"
                  }`}>
                  {zh ? CATEGORY_MAP[c].nameZh : CATEGORY_MAP[c].name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>{zh ? "一句话介绍" : "One-line summary"}</label>
            <input className={inputCls} value={summary} onChange={(e) => setSummary(e.target.value)}
              placeholder={zh ? "它做什么？适合用在哪里？" : "What it does, where it fits"} maxLength={200} />
          </div>
          <div>
            <label className={labelCls}>{zh ? "标签（逗号分隔）" : "Tags (comma-separated)"}</label>
            <input className={inputCls} value={tags} onChange={(e) => setTags(e.target.value)}
              placeholder="button, neon, glow" />
          </div>
          <div>
            <label className={labelCls}>{zh ? "技术栈" : "Tech"}</label>
            <div className="flex flex-wrap gap-1.5">
              {TECHS.map((t) => (
                <button key={t} type="button"
                  onClick={() => setTech((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))}
                  className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition ${
                    tech.includes(t)
                      ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                      : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white"
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* right: html + preview */}
        <div className="grid content-start gap-4">
          <div>
            <label className={labelCls}>{zh ? "预览 HTML *（自包含）" : "Preview HTML * (self-contained)"}</label>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              spellCheck={false}
              placeholder="<!DOCTYPE html><html>…"
              className="input-dark h-44 resize-y font-mono !text-[11.5px] leading-relaxed"
            />
          </div>
          <div>
            <label className={labelCls}>{zh ? "AI 复现提示词（可选）" : "AI prompt (optional)"}</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              spellCheck={false}
              placeholder={zh ? "让别人用一句话复刻它…" : "Let others reproduce it with one prompt…"}
              className="input-dark h-20 resize-y !text-[12px]"
            />
          </div>
        </div>
      </div>

      {/* live test preview */}
      <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
        <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.03] px-4 py-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/40">
            {zh ? "实时预览" : "Live preview"}
          </span>
          <span className="text-[10.5px] text-white/25">sandboxed iframe</span>
        </div>
        <iframe
          srcDoc={html || "<body style='background:#070711;margin:0'></body>"}
          title="live preview"
          sandbox="allow-scripts"
          className="h-56 w-full border-0 bg-[#070711]"
        />
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-400/25 bg-rose-500/10 px-3.5 py-2.5 text-[13px] text-rose-300">
          <span aria-hidden>⚠</span>
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={submit}
        disabled={busy}
        className="grad-btn mt-5 w-full !py-3 font-bold disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? (zh ? "上传中…" : "Uploading…") : zh ? "提交审核" : "Submit for review"}
      </button>
    </div>
  );
}

/* ═══════════════════════════ uploads list ═══════════════════════════ */

function UploadList({
  items,
  zh,
  onDelete,
  onPreview,
  onFlash,
}: {
  items: MemberItem[];
  zh: boolean;
  onDelete: (it: MemberItem) => void;
  onPreview: (it: MemberItem) => void;
  onFlash: (msg: string) => void;
}) {
  const [shareFor, setShareFor] = useState<string | null>(null);

  function shareUrl(slug: string) {
    return `${window.location.origin}/item/${slug}`;
  }

  async function copy(text: string, ok: string) {
    try {
      await navigator.clipboard.writeText(text);
      onFlash(ok);
    } catch {
      onFlash(zh ? "复制失败" : "Copy failed");
    }
  }

  if (!items.length) {
    return (
      <div className="glass grid place-items-center gap-3 rounded-2xl px-6 py-16 text-center">
        <span className="text-4xl">🗂</span>
        <p className="text-sm text-white/45">
          {zh ? "还没有上传过内容" : "Nothing uploaded yet"}
        </p>
        <p className="max-w-sm text-xs leading-relaxed text-white/30">
          {zh
            ? "切到「上传内容」提交你的第一个作品，审核通过后会出现在这里并可一键分享。"
            : "Switch to Upload to submit your first asset — approved work shows up here, ready to share."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((it) => {
        const cat = CATEGORY_MAP[it.category];
        const live = it.published && it.status !== "pending";
        const url = typeof window !== "undefined" ? shareUrl(it.slug) : "";
        return (
          <div key={it.id} className="glass relative rounded-2xl p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`rounded-md px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider ${
                  live
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-amber-500/15 text-amber-300"
                }`}
              >
                {live ? (zh ? "已发布" : "Live") : zh ? "审核中" : "In review"}
              </span>
              <span className="chip !py-0.5 !text-[10px]">{zh ? cat?.nameZh : cat?.name}</span>
              <h3 className="min-w-0 flex-1 truncate text-sm font-bold">{it.title}</h3>
              <span className="text-[10.5px] tabular-nums text-white/30">
                {new Date(it.createdAt).toLocaleDateString(zh ? "zh-CN" : "en-US")}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[11px] tabular-nums text-white/35">
                👁 {it.views} · ⚡ {it.copies} · ⭐ {it.stars}
              </span>
              <span className="mx-1 h-3 w-px bg-white/10" />

              <button className="ghost-btn !rounded-lg !px-2.5 !py-1.5 !text-[11px]" onClick={() => onPreview(it)}>
                👁 {zh ? "预览" : "Preview"}
              </button>
              <Link
                href={`/item/${it.slug}`}
                className="ghost-btn !rounded-lg !px-2.5 !py-1.5 !text-[11px]"
              >
                ↗ {zh ? "详情页" : "Detail"}
              </Link>

              {/* share */}
              <div className="relative">
                <button
                  className="ghost-btn !rounded-lg !px-2.5 !py-1.5 !text-[11px] !text-cyan-200"
                  onClick={() => setShareFor(shareFor === it.id ? null : it.id)}
                >
                  📤 {zh ? "分享" : "Share"}
                </button>
                {shareFor === it.id && (
                  <div className="absolute right-0 top-full z-40 mt-1.5 w-56 rounded-xl border border-white/10 bg-[#0d0d20] p-1.5 shadow-2xl">
                    <button
                      className="block w-full rounded-lg px-3 py-2 text-left text-xs text-white/75 transition hover:bg-white/5 hover:text-white"
                      onClick={() => {
                        copy(url, zh ? "链接已复制" : "Link copied");
                        setShareFor(null);
                      }}
                    >
                      🔗 {zh ? "复制链接" : "Copy link"}
                    </button>
                    <a
                      className="block rounded-lg px-3 py-2 text-xs text-white/75 transition hover:bg-white/5 hover:text-white"
                      target="_blank"
                      rel="noreferrer"
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `${it.title} — check out this animated asset on MotionVault`
                      )}&url=${encodeURIComponent(url)}`}
                    >
                      𝕏 {zh ? "分享到 X / Twitter" : "Share on X / Twitter"}
                    </a>
                    <button
                      className="block w-full rounded-lg px-3 py-2 text-left text-xs text-white/75 transition hover:bg-white/5 hover:text-white"
                      onClick={() => {
                        copy(`[${it.title}](${url})`, zh ? "Markdown 已复制" : "Markdown copied");
                        setShareFor(null);
                      }}
                    >
                      Ⓜ {zh ? "复制 Markdown" : "Copy Markdown"}
                    </button>
                  </div>
                )}
              </div>

              {!live && (
                <button
                  className="ml-auto rounded-lg border border-rose-400/20 px-2.5 py-1.5 text-[11px] font-bold text-rose-300/80 transition hover:bg-rose-500/10 hover:text-rose-200"
                  onClick={() => onDelete(it)}
                >
                  🗑 {zh ? "删除" : "Delete"}
                </button>
              )}
              {live && (
                <span className="ml-auto text-[10.5px] text-white/25">
                  {zh ? "已公开展示" : "publicly listed"}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
