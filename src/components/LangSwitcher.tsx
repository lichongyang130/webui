"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LangSwitcher({ lang }: { lang: "en" | "zh" }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function setLang(next: "en" | "zh") {
    if (next === lang) return;
    start(async () => {
      await fetch("/api/lang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang: next }),
      });
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1 text-xs font-bold">
      {(["en", "zh"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          disabled={pending}
          className={`rounded-lg px-2.5 py-1 transition ${
            lang === l ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white" : "text-white/45 hover:text-white"
          }`}
        >
          {l === "en" ? "EN" : "中文"}
        </button>
      ))}
    </div>
  );
}
