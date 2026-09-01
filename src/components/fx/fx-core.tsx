"use client";

/**
 * MotionVault FX engine — shared core.
 * Settings persistence, tiny event bus, sound synth (Web Audio), helpers.
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Accent = "violet" | "cyber" | "sunset" | "forest" | "gold";
export type BgStyle = "aurora" | "grid" | "dots" | "stars" | "matrix" | "minimal";
export type Theme = "dark" | "light";

export interface FxSettings {
  cursor: boolean;
  spotlight: boolean;
  particles: boolean;
  smooth: boolean;
  sound: boolean;
  reduced: boolean; // force reduced motion
  accent: Accent;
  bg: BgStyle;
  neon: number; // 0..1 glow intensity
  theme: Theme;
}

const DEFAULTS: FxSettings = {
  cursor: true,
  spotlight: true,
  particles: true,
  smooth: true,
  sound: false,
  reduced: false,
  accent: "violet",
  bg: "aurora",
  neon: 0.85,
  theme: "dark",
};

const KEY = "mv_fx";
const SETTINGS_EVENT = "mv-fx-settings";

function load(): FxSettings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULTS;
}

export function saveSettings(s: FxSettings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(SETTINGS_EVENT));
}

export const ACCENTS: { id: Accent; label: string; labelZh: string; c1: string; c2: string; c3: string }[] = [
  { id: "violet", label: "Nebula Violet", labelZh: "星云紫", c1: "139,92,246", c2: "217,70,239", c3: "34,211,238" },
  { id: "cyber", label: "Cyber Cyan", labelZh: "赛博青", c1: "6,182,212", c2: "139,92,246", c3: "45,212,191" },
  { id: "sunset", label: "Sunset Ember", labelZh: "暖阳橙", c1: "249,115,22", c2: "236,72,153", c3: "250,204,21" },
  { id: "forest", label: "Forest Pulse", labelZh: "森林绿", c1: "16,185,129", c2: "132,204,22", c3: "34,211,238" },
  { id: "gold", label: "Lux Gold", labelZh: "奢华金", c1: "212,175,55", c2: "245,158,11", c3: "251,191,36" },
];

interface FxCtx {
  settings: FxSettings;
  set: (patch: Partial<FxSettings>) => void;
  reduced: boolean; // effective reduced motion (user pref OR forced)
  fxEnabled: boolean; // master kill switch (very small screens / touch)
  play: (name: FxSound) => void;
  burst: (x: number, y: number, opts?: Partial<BurstOpts>) => void;
  ripple: (x: number, y: number, el?: Element) => void;
  confetti: (count?: number) => void;
  toast: (msg: string, opts?: ToastOpts) => void;
}

type FxSound = "hover" | "click" | "copy" | "success" | "error" | "open" | "fav" | "whoosh";
export interface BurstOpts {
  kind: "spark" | "firework" | "heart" | "ring" | "confetti";
  count: number;
  colors: string[];
  speed: number;
  gravity: number;
  size: number;
}
interface ToastOpts {
  zh?: string;
  tone?: "ok" | "warn" | "err";
  icon?: string;
}

const noop = () => {};
/** SSR-safe fallback (children are RSC-rendered outside the provider). */
const DEFAULT_CTX: FxCtx = {
  settings: DEFAULTS,
  set: noop,
  reduced: false,
  fxEnabled: false,
  play: noop,
  burst: noop,
  ripple: noop,
  confetti: noop,
  toast: noop,
};

const Ctx = createContext<FxCtx>(DEFAULT_CTX);

export function useFx(): FxCtx {
  return useContext(Ctx) ?? DEFAULT_CTX;
}

/** Standalone hook for components that just need the settings. */
export function useFxSettings(): { settings: FxSettings; set: (p: Partial<FxSettings>) => void; reduced: boolean } {
  try {
    const fx = useFx();
    return { settings: fx.settings, set: fx.set, reduced: fx.reduced };
  } catch {
    // fallback for rare out-of-tree renders
    return {
      settings: DEFAULTS,
      set: () => {},
      reduced: false,
    };
  }
}

/* ------------------------------------------------------------------ sound */

let actx: AudioContext | null = null;
let soundOn = false;

export function setSoundOn(on: boolean) {
  soundOn = on;
  if (on && !actx && typeof window !== "undefined") {
    try {
      actx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      actx = null;
    }
  }
  if (on && actx?.state === "suspended") void actx.resume();
}

function tone(freq: number, dur: number, type: OscillatorType, gain = 0.05, when = 0, slideTo?: number) {
  if (!soundOn || !actx) return;
  const t0 = actx.currentTime + when;
  const osc = actx.createOscillator();
  const g = actx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(actx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

export function playSfx(name: FxSound) {
  if (!soundOn) return;
  try {
    switch (name) {
      case "hover":
        tone(620, 0.07, "sine", 0.015);
        break;
      case "click":
        tone(440, 0.09, "triangle", 0.04, 0, 300);
        break;
      case "open":
        tone(300, 0.12, "sine", 0.035, 0, 620);
        break;
      case "copy":
        tone(660, 0.08, "sine", 0.045);
        tone(880, 0.12, "sine", 0.045, 0.07);
        break;
      case "success":
        tone(523, 0.1, "triangle", 0.05);
        tone(659, 0.1, "triangle", 0.05, 0.09);
        tone(784, 0.18, "triangle", 0.05, 0.18);
        break;
      case "error":
        tone(220, 0.25, "sawtooth", 0.04, 0, 110);
        break;
      case "fav":
        tone(740, 0.08, "sine", 0.04);
        tone(988, 0.14, "sine", 0.04, 0.06);
        break;
      case "whoosh":
        tone(180, 0.22, "sine", 0.03, 0, 720);
        break;
    }
  } catch {
    /* audio not available */
  }
}

/* ------------------------------------------------------------ event bus */

type Handler = (x: number, y: number, opts?: Partial<BurstOpts>) => void;
let burstHandlers: Handler[] = [];
type RippleHandler = (x: number, y: number, el?: Element) => void;
let rippleHandlers: RippleHandler[] = [];
let confettiHandlers: ((count: number) => void)[] = [];
let toastHandlers: ((msg: string, opts?: ToastOpts) => void)[] = [];

export function onBurst(h: Handler) {
  burstHandlers.push(h);
  return () => {
    burstHandlers = burstHandlers.filter((x) => x !== h);
  };
}
export function onRipple(h: RippleHandler) {
  rippleHandlers.push(h);
  return () => {
    rippleHandlers = rippleHandlers.filter((x) => x !== h);
  };
}
export function onConfetti(h: (count: number) => void) {
  confettiHandlers.push(h);
  return () => {
    confettiHandlers = confettiHandlers.filter((x) => x !== h);
  };
}
export function onToast(h: (msg: string, opts?: ToastOpts) => void) {
  toastHandlers.push(h);
  return () => {
    toastHandlers = toastHandlers.filter((x) => x !== h);
  };
}

export function emitBurst(x: number, y: number, opts?: Partial<BurstOpts>) {
  burstHandlers.forEach((h) => h(x, y, opts));
}
export function emitRipple(x: number, y: number, el?: Element) {
  rippleHandlers.forEach((h) => h(x, y, el));
}
export function emitConfetti(count = 140) {
  confettiHandlers.forEach((h) => h(count));
}
export function emitToast(msg: string, opts?: ToastOpts) {
  toastHandlers.forEach((h) => h(msg, opts));
}

/* ------------------------------------------------------------ provider */

export function FxProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<FxSettings>(DEFAULTS);
  const [mounted, setMounted] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);

  useEffect(() => {
    setSettings(load());
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touch = window.matchMedia("(pointer: coarse)");
    setSystemReduced(mq.matches || touch.matches);
    const onMq = () => setSystemReduced(mq.matches || window.matchMedia("(pointer: coarse)").matches);
    mq.addEventListener("change", onMq);
    const onStore = () => setSettings(load());
    window.addEventListener(SETTINGS_EVENT, onStore);
    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener(SETTINGS_EVENT, onStore);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setSoundOn(settings.sound);
    // accent variables
    const acc = ACCENTS.find((a) => a.id === settings.accent) ?? ACCENTS[0];
    const root = document.documentElement;
    root.style.setProperty("--c1", acc.c1);
    root.style.setProperty("--c2", acc.c2);
    root.style.setProperty("--c3", acc.c3);
    root.style.setProperty("--neon", String(settings.neon));
    root.dataset.bg = settings.bg;
    root.dataset.accent = settings.accent;
    root.dataset.theme = settings.theme;
  }, [settings, mounted]);

  const reduced = settings.reduced || systemReduced;
  const fxEnabled = mounted && !reduced && typeof window !== "undefined";

  const set = useCallback((patch: Partial<FxSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveSettings(next);
      return next;
    });
  }, []);

  const play = useCallback((name: FxSound) => playSfx(name), []);
  const burst = useCallback((x: number, y: number, opts?: Partial<BurstOpts>) => emitBurst(x, y, opts), []);
  const ripple = useCallback((x: number, y: number, el?: Element) => emitRipple(x, y, el), []);
  const confetti = useCallback((count = 140) => emitConfetti(count), []);
  const toast = useCallback((msg: string, opts?: ToastOpts) => emitToast(msg, opts), []);

  return <Ctx.Provider value={{ settings, set, reduced, fxEnabled, play, burst, ripple, confetti, toast }}>{children}</Ctx.Provider>;
}

export function useCountUp(target: number, duration = 1400, start = mounted0()) {
  const [val, setVal] = useState(start ? 0 : target);
  useEffect(() => {
    if (!start) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}
function mounted0() {
  return true;
}
