"use client";

import { useEffect, useState } from "react";
import { Item } from "@/lib/types";
import { Icon } from "@/components/icons";
import type { Lang } from "@/lib/i18n";
import { useFx } from "@/components/fx/fx-core";

const LABELS: Record<string, { en: string; zh: string }> = {
  livePreview: { en: "Live Preview", zh: "实时预览" },
  sourceCode: { en: "Source Code", zh: "源代码" },
  reactTsx: { en: "React (TSX)", zh: "React 组件" },
  aiPrompt: { en: "AI Prompt", zh: "AI Prompt" },
  copyHtml: { en: "Copy HTML", zh: "复制 HTML" },
  copyPrompt: { en: "Copy prompt", zh: "复制 Prompt" },
  copyTsx: { en: "Copy TSX", zh: "复制 TSX" },
  downloadTsx: { en: "Download .tsx", zh: "下载 .tsx" },
  copied: { en: "Copied!", zh: "已复制！" },
  light: { en: "Light", zh: "浅色" },
  dark: { en: "Dark", zh: "深色" },
  promptTip: {
    en: "Paste this prompt into Cursor, Claude Code, Codex, v0 or any AI coding tool to reproduce the asset 1:1. Works with domestic large models too.",
    zh: "把这条 Prompt 粘贴到 Cursor、Claude Code、Codex、v0 或任何 AI 编程工具，即可 1:1 还原该效果，国产大模型同样适用。",
  },
  reactNote: {
    en: "React + Tailwind + TypeScript component — drop it into any Next.js / Vite project.",
    zh: "React + Tailwind + TypeScript 组件 —— 可直接放入 Next.js / Vite 项目。",
  },
};

export function themedHtml(html: string, mode: "dark" | "light") {
  if (mode === "dark") return html;
  const inject =
    "<script>(function(){var ss=document.createElement('style');" +
    "ss.textContent=':root{--bg:#f4f4fb!important;--panel:rgba(15,15,40,.04)!important;--line:rgba(15,15,40,.12)!important;--txt:#17152b!important;--dim:#5a567d!important;--v1:#7c3aed!important;--v2:#c026d3!important;--c1:#0891b2!important}body{background:#f4f4fb!important;}';" +
    "document.head.appendChild(ss);})();</script>";
  return html.replace("</body>", inject + "</body>");
}

function CopyButton({
  text,
  label,
  className = "",
  trackSlug,
  lang = "en",
}: {
  text: string;
  label?: string;
  className?: string;
  trackSlug?: string;
  lang?: Lang;
}) {
  const [copied, setCopied] = useState(false);
  const fx = useFx();
  return (
    <button
      onClick={async (ev) => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        }
        if (trackSlug)
          fetch(`/api/copy?slug=${encodeURIComponent(trackSlug)}`, { method: "POST" }).catch(() => {});
        setCopied(true);
        fx.play("copy");
        const r = ev.currentTarget.getBoundingClientRect();
        fx.burst(r.left + r.width / 2, r.top + r.height / 2, { kind: "spark", count: 10, size: 2.4 });
        fx.toast(lang === "zh" ? "已复制，去 AI 工具粘贴 ✦" : "Copied — paste it into your AI tool ✦");
        setTimeout(() => setCopied(false), 1800);
      }}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
        copied
          ? "border border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
          : "border border-white/10 bg-white/[0.05] text-white/85 hover:border-violet-400/60 hover:text-white " +
            className
      }`}
    >
      <Icon name={copied ? "check" : "copy"} className="h-4 w-4" />
      {copied ? LABELS.copied[lang] : label}
    </button>
  );
}

export default function DetailClient({
  item,
  lang = "en",
}: {
  item: Item;
  lang?: Lang;
}) {
  const [tab, setTab] = useState<"preview" | "source" | "react" | "prompt">("preview");
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [fullscreen, setFullscreen] = useState(false);
  const fx = useFx();
  const L = (k: string) => LABELS[k]?.[lang] ?? k;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const tabs = [
    { k: "preview" as const, l: L("livePreview"), icon: "eye" },
    { k: "source" as const, l: L("sourceCode"), icon: "layers" },
    ...(item.react
      ? [{ k: "react" as const, l: L("reactTsx"), icon: "blocks" }]
      : []),
    { k: "prompt" as const, l: L("aiPrompt"), icon: "sparkles" },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-1 border-b border-white/[0.07] px-3 py-2">
        {tabs.map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold transition ${
              tab === t.k
                ? "bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 text-white"
                : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon name={t.icon} className="h-4 w-4" />
            {t.l}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          {tab === "preview" && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] p-1">
                {(["dark", "light"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition ${
                      mode === m ? "bg-white/15 text-white" : "text-white/45 hover:text-white"
                    }`}
                  >
                    {L(m)}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  fx.play("open");
                  setFullscreen(true);
                }}
                title={lang === "zh" ? "全屏预览" : "Fullscreen preview"}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-cyan-400/50 hover:text-cyan-300"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              </button>
            </div>
          )}
          {tab === "source" && <CopyButton text={item.html} label={L("copyHtml")} trackSlug={item.slug} lang={lang} />}
          {tab === "react" && item.react && (
            <>
              <CopyButton text={item.react} label={L("copyTsx")} trackSlug={item.slug} lang={lang} />
              <a
                href={`/r/${item.slug}/component.tsx`}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
              >
                <Icon name="external" className="h-4 w-4" /> {L("downloadTsx")}
              </a>
            </>
          )}
          {tab === "prompt" && (
            <CopyButton
              text={item.prompt}
              label={L("copyPrompt")}
              trackSlug={item.slug}
              lang={lang}
              className="!border-fuchsia-400/40 !bg-fuchsia-500/10 !text-fuchsia-200"
            />
          )}
        </div>
      </div>

      {/* Panels */}
      {tab === "preview" && (
        <div className="relative h-[560px] bg-[#070711]">
          <iframe
            srcDoc={themedHtml(item.html, mode)}
            title={item.title}
            sandbox="allow-scripts"
            className="h-full w-full border-0"
          />
        </div>
      )}

      {tab === "source" && (
        <div className="max-h-[560px] overflow-auto bg-[#080814] p-5">
          <pre className="codeblock whitespace-pre-wrap text-white/75">{item.html}</pre>
        </div>
      )}

      {tab === "react" && item.react && (
        <div className="max-h-[560px] overflow-auto bg-gradient-to-br from-cyan-950/40 to-violet-950/30 p-6">
          <div className="mb-4 flex items-start gap-3 rounded-2xl border border-cyan-400/25 bg-cyan-500/[0.08] p-4">
            <Icon name="blocks" className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
            <p className="text-[13px] leading-relaxed text-cyan-100/80">{L("reactNote")}</p>
          </div>
          <pre className="codeblock whitespace-pre-wrap text-[12.5px] leading-relaxed text-white/85">
            {item.react}
          </pre>
        </div>
      )}

      {tab === "prompt" && (
        <div className="max-h-[560px] overflow-auto bg-gradient-to-br from-violet-950/40 to-fuchsia-950/20 p-6">
          <div className="mb-4 flex items-start gap-3 rounded-2xl border border-fuchsia-400/25 bg-fuchsia-500/[0.08] p-4">
            <Icon name="bolt" className="mt-0.5 h-5 w-5 shrink-0 text-fuchsia-300" />
            <p className="text-[13px] leading-relaxed text-fuchsia-100/80">{L("promptTip")}</p>
          </div>
          <pre className="codeblock whitespace-pre-wrap text-[13px] leading-relaxed text-white/85">
            {item.prompt}
          </pre>
        </div>
      )}

      {/* Fullscreen lightbox — idea #165/#123 */}
      {fullscreen && (
        <div className="fixed inset-0 z-[9600] flex flex-col bg-[#05050f]/95 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <span className="flex items-center gap-2 text-sm font-bold">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              {item.title}
            </span>
            <div className="flex items-center gap-2">
              {(["dark", "light"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                    mode === m ? "border-fuchsia-400/50 bg-fuchsia-500/15 text-fuchsia-200" : "border-white/10 text-white/50 hover:text-white"
                  }`}
                >
                  {L(m)}
                </button>
              ))}
              <button
                onClick={() => setFullscreen(false)}
                className="ml-2 grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-white/70 transition hover:border-rose-400/50 hover:text-rose-300"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative flex-1">
            <iframe
              srcDoc={themedHtml(item.html, mode)}
              title={item.title}
              sandbox="allow-scripts"
              className="h-full w-full border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function DetailActions({ item, lang = "en" }: { item: Item; lang?: Lang }) {
  const L = (k: string) => LABELS[k]?.[lang] ?? k;
  const [tracked, setTracked] = useState(false);
  return (
    <>
      <CopyButton
        text={item.prompt}
        label={lang === "zh" ? "复制 AI Prompt" : "Copy AI prompt"}
        trackSlug={item.slug}
        className="!border-fuchsia-400/40 !bg-gradient-to-r !from-violet-600 !to-fuchsia-600 !text-white !px-5 !py-3 !text-base shadow-[0_10px_36px_-12px_rgba(217,70,239,0.8)]"
      />
      {item.react && (
        <a
          href={`/r/${item.slug}/component.tsx`}
          className="ghost-btn !px-5 !py-3 !text-base !border-cyan-400/40 !text-cyan-200"
        >
          <Icon name="blocks" className="h-4 w-4" /> {L("downloadTsx")}
        </a>
      )}
      <CopyButton text={item.html} label={lang === "zh" ? "复制 HTML 源码" : "Copy source HTML"} trackSlug={item.slug} className="!px-5 !py-3 !text-base" />
      {item.sourceUrl && (
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => setTracked(true)}
          className="ghost-btn !px-5 !py-3 !text-base"
        >
          <Icon name="external" className="h-4 w-4" /> {tracked ? (lang === "zh" ? "打开中…" : "Opening…") : lang === "zh" ? "灵感来源" : "Original site"}
        </a>
      )}
    </>
  );
}
