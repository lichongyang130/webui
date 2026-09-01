"use client";

import { useMemo, useState } from "react";
import { useFx } from "@/components/fx/fx-core";

const KINDS = [
  { id: "button", en: "Button / CTA", zh: "按钮" },
  { id: "card", en: "Card / panel", zh: "卡片" },
  { id: "nav", en: "Navigation / menu", zh: "导航菜单" },
  { id: "hero", en: "Hero / landing section", zh: "首页 Hero" },
  { id: "form", en: "Form / input", zh: "表单" },
  { id: "loader", en: "Loader / progress", zh: "加载进度" },
  { id: "background", en: "Background effect", zh: "背景特效" },
  { id: "text", en: "Text / typography", zh: "文字排版" },
];

const PALETTES = [
  { id: "violet", label: "Violet + Fuchsia + Cyan", colors: "violet #8b5cf6, fuchsia #d946ef, cyan #22d3ee" },
  { id: "cyber", label: "Cyber cyan + teal", colors: "cyan #06b6d4, violet #8b5cf6, teal #2dd4bf" },
  { id: "sunset", label: "Ember orange + pink", colors: "orange #f97316, pink #ec4899, amber #facc15" },
  { id: "gold", label: "Lux black + gold", colors: "near-black #0b0b14, gold #d4af37, amber #fbbf24" },
  { id: "neon", label: "Cyberpunk magenta + cyan", colors: "magenta #e879f9, cyan #22d3ee on #05060f" },
];

export default function PromptBuilder({ lang }: { lang: "en" | "zh" }) {
  const zh = lang === "zh";
  const fx = useFx();
  const [kind, setKind] = useState("button");
  const [palette, setPalette] = useState(PALETTES[0]);
  const [vibe, setVibe] = useState("sci-fi / futuristic, glassmorphism with neon glow");
  const [motion, setMotion] = useState(true);
  const [react, setReact] = useState(false);
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    const k = KINDS.find((x) => x.id === kind)!;
    return [
      react
        ? `Create a polished React + TypeScript + Tailwind component for: ${k.en.toLowerCase()} (${vibe}).`
        : `Create a single-file, self-contained HTML/CSS/JS component for: ${k.en.toLowerCase()} (${vibe}).`,
      `Palette: ${palette.colors}, on a deep near-black background.`,
      motion
        ? "Include smooth motion: hover states with lift + glow, spring/overshoot easing (cubic-bezier(.22,1,.36,1)), entrance animations, and subtle micro-interactions."
        : "Keep motion minimal: simple fades only, no autoplaying animation.",
      react
        ? "Use functional component, hooks, inline Tailwind classes, no extra dependencies. Code must be production-quality with sensible accessibility (aria labels, focus states)."
        : "All styles and scripts inline, zero external dependencies, works offline in a sandboxed iframe. Semantic markup with accessible focus/hover states.",
      "Typography: Inter for UI, JetBrains Mono for any code/labels. Generous spacing, rounded-xl/2xl corners, thin 1px translucent borders, backdrop-blur glass surfaces.",
      react ? "Export as default component." : "Output the complete runnable HTML document.",
    ].join("\n");
  }, [kind, palette, vibe, motion, react]);

  async function copy(e: React.MouseEvent) {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = prompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    fx.play("copy");
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    fx.burst(r.left + r.width / 2, r.top + r.height / 2, { kind: "spark", count: 12, size: 2.4 });
    fx.toast(zh ? "Prompt 已生成并复制 ✦ 粘贴给 AI 即可" : "Prompt built & copied ✦ paste it into your AI");
    setTimeout(() => setCopied(false), 1800);
  }

  function download() {
    const blob = new Blob([prompt], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "motionvault-prompt.txt";
    a.click();
    URL.revokeObjectURL(a.href);
    fx.play("success");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      {/* controls */}
      <div className="glass space-y-6 rounded-3xl p-7">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
            {zh ? "组件类型" : "Component type"}
          </label>
          <div className="flex flex-wrap gap-2">
            {KINDS.map((k) => (
              <button
                key={k.id}
                onClick={() => setKind(k.id)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                  kind === k.id
                    ? "border-fuchsia-400/60 bg-fuchsia-500/15 text-fuchsia-200"
                    : "border-white/10 text-white/55 hover:border-white/30 hover:text-white"
                }`}
              >
                {zh ? k.zh : k.en}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
            {zh ? "配色" : "Palette"}
          </label>
          <div className="flex flex-wrap gap-2">
            {PALETTES.map((p) => (
              <button
                key={p.id}
                onClick={() => setPalette(p)}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                  palette.id === p.id ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-200" : "border-white/10 text-white/55 hover:border-white/30"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
            {zh ? "风格关键词" : "Vibe / keywords"}
          </label>
          <input
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            className="input-dark"
            placeholder="sci-fi, glass, neon…"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm">
            <input type="checkbox" checked={motion} onChange={(e) => setMotion(e.target.checked)} className="accent-fuchsia-500" />
            {zh ? "丰富动效" : "Rich motion"}
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm">
            <input type="checkbox" checked={react} onChange={(e) => setReact(e.target.checked)} className="accent-cyan-400" />
            {zh ? "React + TS 输出" : "React + TS output"}
          </label>
        </div>
      </div>

      {/* output */}
      <div className="fx-border-glow relative overflow-hidden rounded-3xl border border-white/10 bg-[#080814]">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
          <span className="flex items-center gap-2 font-mono text-xs text-white/45">
            <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-400" />
            {zh ? "生成的 Prompt" : "Generated prompt"}
          </span>
          <div className="flex gap-2">
            <button onClick={download} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/70 transition hover:border-cyan-400/50 hover:text-cyan-200">
              ↓ {zh ? "下载" : "Download"}
            </button>
            <button
              onClick={copy}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                copied ? "bg-emerald-500/20 text-emerald-300" : "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
              }`}
            >
              {copied ? "✓ Copied" : zh ? "复制 Prompt" : "Copy prompt"}
            </button>
          </div>
        </div>
        <pre className="codeblock max-h-[520px] overflow-auto whitespace-pre-wrap p-6 text-[13px] leading-relaxed text-white/85">
          {prompt}
        </pre>
        <div className="border-t border-white/[0.07] px-5 py-3 text-[11px] text-white/35">
          {zh
            ? "提示：粘贴到 Cursor / Claude Code / Codex / v0，生成后可再投稿回本库。"
            : "Tip: paste into Cursor / Claude Code / Codex / v0 — then submit the result back to the vault."}
        </div>
      </div>
    </div>
  );
}
