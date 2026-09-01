"use client";

import { useEffect } from "react";
import { useFx } from "./fx-core";

/**
 * Smooth wheel scrolling with lerp easing (Lenis-style). Idea #76.
 * Disabled on touch devices, reduced motion, pinch-zoom, form fields
 * and inner scrollable containers.
 */
export default function SmoothScroll() {
  const { settings, fxEnabled } = useFx();

  useEffect(() => {
    if (!fxEnabled || !settings.smooth) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if ((window.visualViewport?.scale ?? 1) > 1.05) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;
    let active = false;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      current += (target - current) * 0.11;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        active = false;
        cancelAnimationFrame(raf);
        raf = 0;
      }
      window.scrollTo(0, current);
    };
    const kick = () => {
      if (!active) {
        active = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch zoom
      const t = e.target as HTMLElement;
      if (t.closest("[data-nosmooth], iframe")) return;
      let el: HTMLElement | null = t;
      while (el && el !== document.body) {
        const oy = getComputedStyle(el).overflowY;
        if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 4) return;
        el = el.parentElement;
      }
      const ae = document.activeElement;
      if (ae && /INPUT|TEXTAREA|SELECT/.test(ae.tagName)) return;

      e.preventDefault();
      const mul = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // if a CSS smooth scroll or anchor is driving, resync
      target = Math.max(0, Math.min(max, target + e.deltaY * mul));
      kick();
    };

    const onScroll = () => {
      // resync when scrolling without wheel (keyboard / scrollbar / anchor)
      if (!active) {
        target = window.scrollY;
        current = window.scrollY;
      }
    };

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")?.slice(1);
      if (!id || id === "") return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        target = el.getBoundingClientRect().top + window.scrollY - 72;
        current = window.scrollY;
        kick();
        history.replaceState(null, "", `#${id}`);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onAnchor);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onAnchor);
      cancelAnimationFrame(raf);
    };
  }, [fxEnabled, settings.smooth]);

  return null;
}
