"use client";

import { useEffect, useState } from "react";
import { useFx } from "./fx-core";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function EasterEggs({ lang }: { lang: "en" | "zh" }) {
  const { fxEnabled, confetti, burst, toast } = useFx();
  const [cheat, setCheat] = useState(false);
  const zh = lang === "zh";

  // --- visit counter + milestone fireworks (#485 #488 #500)
  useEffect(() => {
    const n = Number(localStorage.getItem("mv_visits") ?? "0") + 1;
    localStorage.setItem("mv_visits", String(n));
    if (n % 100 === 0) {
      setTimeout(() => confetti(300), 1200);
      toast(zh ? `第 ${n} 次访问 —— 送你一场烟花！✦` : `Visit #${n} — fireworks for you! ✦`);
    }
    // late-night greeting (#479)
    const h = new Date().getHours();
    if (h >= 0 && h < 5 && !sessionStorage.getItem("mv_night")) {
      sessionStorage.setItem("mv_night", "1");
      setTimeout(() => toast(zh ? "夜深了，注意头发 🌙" : "Late night — take care of your hair 🌙", { tone: "warn" }), 2500);
    }
    // fav milestones
    const favs = (() => {
      try {
        return JSON.parse(localStorage.getItem("mv_favs") ?? "[]").length;
      } catch {
        return 0;
      }
    })();
    if (favs === 10) toast(zh ? "🏅 收藏达人：已收藏 10 个资源！" : "🏅 Curator badge: 10 favorites!");
    if (favs === 50) toast(zh ? "👑 收藏家：已收藏 50 个！" : "👑 Collector: 50 favorites!");
  }, [zh, toast, confetti]);

  // --- Konami party mode (#476)
  useEffect(() => {
    if (!fxEnabled) return;
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "?" ) || (e.shiftKey && e.key === "/")) {
        setCheat(true);
        return;
      }
      seq = [...seq, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-KONAMI.length);
      if (seq.join(",") === KONAMI.join(",")) {
        document.documentElement.classList.add("fx-party");
        confetti(260);
        toast(zh ? "🎉 派对模式开启！" : "🎉 Party mode ON!");
        setTimeout(() => document.documentElement.classList.remove("fx-party"), 12000);
        seq = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fxEnabled, confetti, toast, zh]);

  // --- global copy streak (#478 #488)
  useEffect(() => {
    const onCopy = () => {
      const n = Number(localStorage.getItem("mv_copies") ?? "0") + 1;
      localStorage.setItem("mv_copies", String(n));
      if (n === 5) toast(zh ? "⚡ 今日效率达人：已复制 5 个 Prompt！" : "⚡ Power user: 5 prompts copied!");
      if (n % 100 === 0) {
        confetti(260);
        toast(zh ? `🔥 ${n} 次复制！全库感谢你` : `🔥 ${n} copies! The vault thanks you`);
      }
    };
    window.addEventListener("copy", onCopy);
    return () => window.removeEventListener("copy", onCopy);
  }, [toast, confetti, zh]);

  // --- idle robot (#489)
  useEffect(() => {
    if (!fxEnabled) return;
    let timer: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        toast(zh ? "🤖 还在吗？有 54+ 个资源在等你" : "🤖 Still there? 54+ assets await", { tone: "warn" });
      }, 45000);
    };
    ["pointermove", "keydown", "wheel", "touchstart"].forEach((ev) => window.addEventListener(ev, reset, { passive: true }));
    reset();
    return () => {
      clearTimeout(timer);
      ["pointermove", "keydown", "wheel", "touchstart"].forEach((ev) => window.removeEventListener(ev, reset));
    };
  }, [fxEnabled, toast, zh]);

  // --- logo multi-click (#480), dblclick burst (#124), fireworks event
  useEffect(() => {
    const clicks: number[] = [];
    const onClick = (e: MouseEvent) => {
      const logo = (e.target as HTMLElement)?.closest?.('[data-egg="logo"]');
      if (logo) {
        const now = Date.now();
        clicks.push(now);
        const recent = clicks.filter((t) => now - t < 3000);
        clicks.length = 0;
        clicks.push(...recent);
        if (recent.length >= 10) {
          confetti(160);
          toast(zh ? "✦ Logo 被你点爆了！" : "✦ You exploded the logo!");
          clicks.length = 0;
        }
      }
    };
    const onDbl = (e: MouseEvent) => {
      if (fxEnabled && !(e.target as HTMLElement).closest?.("a,button,input,iframe")) {
        burst(e.clientX, e.clientY, { kind: "firework", count: 30 });
      }
    };
    const onFw = () => {
      for (let i = 0; i < 5; i++)
        setTimeout(() => {
          burst(window.innerWidth * (0.15 + Math.random() * 0.7), window.innerHeight * (0.2 + Math.random() * 0.4), { kind: "firework", count: 80, gravity: 0.12, speed: 8 });
        }, i * 350);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("dblclick", onDbl);
    window.addEventListener("mv-fx-fireworks", onFw as EventListener);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("dblclick", onDbl);
      window.removeEventListener("mv-fx-fireworks", onFw as EventListener);
    };
  }, [fxEnabled, confetti, burst, toast, zh]);

  // --- title bar nudge (#486)
  useEffect(() => {
    const orig = document.title;
    const onVis = () => {
      document.title = document.hidden ? (zh ? "✦ 别走！还有 54+ 个资源" : "✦ Don't go! 54+ assets remain") : orig;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [zh]);

  // --- shake for random asset (#499)
  useEffect(() => {
    let lastX = 0,
      lastY = 0,
      lastZ = 0,
      swings = 0;
    const onMotion = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const d = Math.abs((a.x ?? 0) - lastX) + Math.abs((a.y ?? 0) - lastY) + Math.abs((a.z ?? 0) - lastZ);
      lastX = a.x ?? 0;
      lastY = a.y ?? 0;
      lastZ = a.z ?? 0;
      if (d > 25) {
        swings++;
        if (swings > 4) {
          swings = 0;
          window.location.href = "/explore?random=1";
        }
      } else swings = Math.max(0, swings - 1);
    };
    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, []);

  if (!cheat) return null;
  return (
    <div className="fixed inset-0 z-[9900] grid place-items-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setCheat(false)} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0d0d1e] p-6">
        <h3 className="mb-3 text-lg font-bold">{zh ? "快捷键速查" : "Keyboard shortcuts"}</h3>
        <ul className="space-y-2 text-sm text-white/70">
          {[
            ["⌘/Ctrl + K", zh ? "打开命令面板" : "Open command palette"],
            ["?", zh ? "打开此速查表" : "Open this cheat sheet"],
            ["↑ ↑ ↓ ↓ ← → ← → B A", zh ? "派对模式" : "Party mode"],
            [zh ? "双击空白处" : "Double-click", zh ? "放一朵烟花" : "Launch a firework"],
            [zh ? "连点 Logo 10 下" : "Click logo ×10", zh ? "爆彩花" : "Confetti burst"],
            ["Esc", zh ? "关闭弹窗" : "Close dialogs"],
          ].map(([k, v]) => (
            <li key={k} className="flex items-center justify-between gap-3">
              <span>{v}</span>
              <kbd className="rounded border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-xs">{k}</kbd>
            </li>
          ))}
        </ul>
        <button onClick={() => setCheat(false)} className="grad-btn mt-5 w-full !py-2 text-xs">
          {zh ? "开始冲浪" : "Let's surf"}
        </button>
      </div>
    </div>
  );
}
