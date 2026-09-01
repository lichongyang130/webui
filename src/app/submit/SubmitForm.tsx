"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, TECH_LABELS } from "@/lib/categories";
import type { Lang } from "@/lib/i18n";
import { Icon } from "@/components/icons";
import type { Tech, CategorySlug } from "@/lib/types";
import { useFx } from "@/components/fx/fx-core";

const TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><style>
body{margin:0;background:#070711;color:#eceaf9;font-family:system-ui;min-height:100vh;display:grid;place-items:center}
</style></head>
<body>
  <h1>My awesome animation</h1>
</body>
</html>`;

export default function SubmitForm({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<CategorySlug>("components");
  const [tags, setTags] = useState("");
  const [tech, setTech] = useState<Tech[]>(["html", "css", "javascript"]);
  const [html, setHtml] = useState(TEMPLATE);
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState(true);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  const fx = useFx();

  function toggleTech(t: Tech) {
    setTech((list) => (list.includes(t) ? list.filter((x) => x !== t) : [...list, t]));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!title.trim() || html.length < 40) {
      setErr(zh ? "请填写标题，并提供完整的预览 HTML。" : "Please fill the title and provide a complete preview HTML.");
      setState("error");
      return;
    }
    setState("sending");
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        summary,
        author: author || "Community",
        email,
        category,
        tags: tags.split(",").map((x) => x.trim().toLowerCase()).filter(Boolean).slice(0, 12),
        tech,
        html,
        prompt,
      }),
    });
    if (res.ok) {
      setState("done");
      fx.confetti(220);
      fx.play("success");
    } else {
      const data = await res.json().catch(() => ({}));
      setErr(data.error ?? "Submission failed.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="glass mx-auto max-w-xl rounded-3xl p-10 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-300">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h2 className="mt-5 text-2xl font-extrabold">
          {zh ? "投稿已提交！" : "Submission received!"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          {zh
            ? "你的作品已进入审核队列，管理员通过后将出现在资源库中并拥有自己的预览页。感谢分享 ✦"
            : "Your asset is now in the review queue. Once an admin approves it, it will appear in the vault with its own live preview page. Thanks for sharing ✦"}
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link href="/explore" className="grad-btn">
            {zh ? "继续浏览" : "Browse the vault"}
          </Link>
          <button
            onClick={() => {
              setState("idle");
              setTitle("");
              setSummary("");
              setPrompt("");
              setHtml(TEMPLATE);
            }}
            className="ghost-btn"
          >
            {zh ? "再投一个" : "Submit another"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-6 xl:grid-cols-2">
      {/* left fields */}
      <div className="space-y-5">
        <section className="glass rounded-2xl p-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/40">
            {zh ? "基本信息" : "Basics"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/50">
                {zh ? "标题 *" : "Title *"}
              </label>
              <input
                className="input-dark"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={zh ? "例如：极光渐变按钮" : "e.g. Aurora gradient button"}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/50">
                {zh ? "简介" : "Summary"}
              </label>
              <textarea
                className="input-dark min-h-[70px] resize-y"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder={zh ? "一两句话描述这个资源的效果。" : "One or two sentences describing the asset."}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-white/50">
                  {zh ? "作者 / 昵称" : "Author / handle"}
                </label>
                <input className="input-dark" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="@you" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-white/50">
                  {zh ? "联系邮箱（不公开）" : "Contact email (private)"}
                </label>
                <input type="email" className="input-dark" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@dev.io" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/50">
                {zh ? "资源库" : "Vault"}
              </label>
              <select
                className="input-dark cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value as CategorySlug)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug} className="bg-[#161632]">
                    {zh ? c.nameZh : c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-white/50">
                {zh ? "标签（逗号分隔）" : "Tags (comma separated)"}
              </label>
              <input
                className="input-dark"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="button, glow, hover"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-white/50">
                {zh ? "技术栈" : "Tech stack"}
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(TECH_LABELS).map(([k, v]) => (
                  <button
                    type="button"
                    key={k}
                    onClick={() => toggleTech(k as Tech)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                      tech.includes(k as Tech)
                        ? "border-violet-400/60 bg-violet-500/20 text-violet-200"
                        : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="glass rounded-2xl p-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/40">
            {zh ? "AI Prompt（可选但推荐）" : "AI prompt (optional but recommended)"}
          </h2>
          <textarea
            className="input-dark min-h-[160px] resize-y font-mono !text-[12.5px] leading-relaxed"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={zh ? "详细描述布局、颜色、动画时长、缓动曲线和交互行为……" : "Describe layout, colors, timings, easing and interactions in detail…"}
          />
        </section>
      </div>

      {/* right: html + preview */}
      <div className="space-y-5">
        <section className="glass rounded-2xl p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white/40">
              {zh ? "自包含预览 HTML *" : "Self-contained preview HTML *"}
            </h2>
            <button
              type="button"
              onClick={() => setPreview((p) => !p)}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/70"
            >
              {preview ? (zh ? "隐藏预览" : "Hide preview") : zh ? "测试预览" : "Test preview"}
            </button>
          </div>
          <textarea
            className="input-dark min-h-[300px] resize-y font-mono !text-[12px] leading-relaxed"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            spellCheck={false}
          />
          <p className="mt-2 text-xs text-white/35">
            {zh
              ? "需为完整 HTML 文档（内联 <style>/<script>），将在沙箱 iframe 中运行。"
              : "Must be a full HTML document (inline <style>/<script>); it runs in a sandboxed iframe."}
          </p>
        </section>

        {preview && (
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a18]">
            <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300">{zh ? "实时预览" : "LIVE PREVIEW"}</span>
            </div>
            <iframe srcDoc={html} title="submission preview" sandbox="allow-scripts" className="h-[380px] w-full border-0" />
          </section>
        )}

        {state === "error" && err && (
          <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{err}</p>
        )}

        <button type="submit" disabled={state === "sending"} className="grad-btn w-full !py-3.5 text-base disabled:opacity-60">
          <Icon name="bolt" className="h-4 w-4" />
          {state === "sending" ? (zh ? "提交中…" : "Submitting…") : zh ? "提交投稿" : "Submit for review"}
        </button>
      </div>
    </form>
  );
}
