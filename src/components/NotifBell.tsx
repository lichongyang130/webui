"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Notif {
  id: string;
  kind: string;
  title: string;
  titleZh?: string;
  body?: string;
  bodyZh?: string;
  href?: string;
  at: string;
  read: boolean;
}

const ICONS: Record<string, string> = { announce: "📣", reply: "💬", favorite: "❤️", system: "✨" };

function rel(at: string, zh: boolean): string {
  const d = Date.now() - new Date(at).getTime();
  const m = Math.floor(d / 60000);
  if (m < 1) return zh ? "刚刚" : "just now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

/** Header notification bell — renders nothing for signed-out visitors. */
export default function NotifBell({ zh }: { zh: boolean }) {
  const [items, setItems] = useState<Notif[] | null>(null);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dead = false;
    const loadIt = async () => {
      try {
        const r = await fetch("/api/me/notifications");
        if (!r.ok) return;
        const j = await r.json();
        if (!dead) {
          setItems(j.items ?? []);
          setUnread(j.unread ?? 0);
        }
      } catch {
        /* signed out or offline */
      }
    };
    loadIt();
    const iv = setInterval(loadIt, 60000);
    const onFocus = () => loadIt();
    window.addEventListener("focus", onFocus);
    return () => {
      dead = true;
      clearInterval(iv);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: PointerEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [open]);

  if (items === null) return null;

  const markAll = async () => {
    setUnread(0);
    setItems((xs) => xs?.map((n) => ({ ...n, read: true })) ?? null);
    try {
      await fetch("/api/me/notifications", { method: "POST" });
    } catch {
      /* optimistic */
    }
  };

  return (
    <div ref={box} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={zh ? "通知" : "Notifications"}
        className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-violet-400/60 hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 px-1 text-[10px] font-bold leading-none text-white shadow-[0_0_10px_rgba(244,63,94,.8)]">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed right-[max(1rem,calc((100vw-76rem)/2))] top-14 z-[300] w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c20]/95 shadow-2xl shadow-black/60 backdrop-blur-xl sm:right-[max(1.25rem,calc((100vw-76rem)/2))]">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
            <b className="text-sm">{zh ? "通知" : "Notifications"}</b>
            {unread > 0 && (
              <button onClick={markAll} className="text-xs text-violet-300 hover:text-violet-200">
                {zh ? "全部已读" : "Mark all read"}
              </button>
            )}
          </div>
          <div className="max-h-[320px] overflow-y-auto">
            {items.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-white/40">
                {zh ? "暂时没有通知" : "You're all caught up"}
              </p>
            )}
            {items.map((n) => {
              const inner = (
                <>
                  <span className="mt-0.5 text-base leading-none">{ICONS[n.kind] ?? "✨"}</span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-sm font-semibold ${n.read ? "text-white/70" : "text-white"}`}
                    >
                      {zh ? (n.titleZh ?? n.title) : n.title}
                    </span>
                    {n.body && (
                      <span className="mt-0.5 line-clamp-2 block text-xs text-white/45">
                        {zh ? (n.bodyZh ?? n.body) : n.body}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 text-[10px] text-white/35">{rel(n.at, zh)}</span>
                  {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,.9)]" />}
                </>
              );
              return n.href ? (
                <Link
                  key={n.id}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 border-b border-white/[0.05] px-4 py-3 transition hover:bg-white/[0.05]"
                >
                  {inner}
                </Link>
              ) : (
                <div key={n.id} className="flex items-start gap-3 border-b border-white/[0.05] px-4 py-3">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
