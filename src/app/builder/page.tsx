import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getLang } from "@/lib/i18n";
import PromptBuilder from "./PromptBuilder";

export const dynamic = "force-dynamic";

export default async function BuilderPage() {
  const lang = await getLang();
  const zh = lang === "zh";
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container-v py-14">
        <header className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
            {zh ? "AI Prompt 工坊" : "AI prompt workshop"}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
            <span className="grad-text">{zh ? "选几个选项，生成你的专属 Prompt" : "Pick, click, get a battle-tested prompt"}</span>
          </h1>
          <p className="mt-3 text-white/55">
            {zh
              ? "选择组件类型、配色和风格，工坊会即时拼出一段结构化 Prompt，复制后粘贴给任何 AI 编程工具即可 1:1 还原。"
              : "Choose component type, palette and vibe — the workshop assembles a structured prompt you can paste into any AI coding tool for a 1:1 result."}
          </p>
        </header>
        <PromptBuilder lang={lang} />
      </main>
      <SiteFooter />
    </div>
  );
}
