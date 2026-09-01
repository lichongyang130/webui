"use client";

import { FxProvider } from "./fx-core";
import Background from "./Background";
import CursorFx from "./CursorFx";
import BurstCanvas from "./BurstCanvas";
import SmoothScroll from "./SmoothScroll";
import { ScrollProgress, RevealObserver } from "./ScrollFx";
import CommandPalette from "./CommandPalette";
import FxMenu from "./FxMenu";
import BackToTop from "./BackToTop";
import Toasts from "./Toasts";
import EasterEggs from "./EasterEggs";

/**
 * Mounts the entire FX engine. Safe to include on every page;
 * every layer self-gates on settings / pointer capability.
 */
export default function FXLayer({ lang }: { lang: "en" | "zh" }) {
  return (
    <FxProvider>
      <Background />
      <BurstCanvas />
      <CursorFx />
      <SmoothScroll />
      <ScrollProgress />
      <RevealObserver />
      <CommandPalette lang={lang} />
      <FxMenu lang={lang} />
      <BackToTop />
      <Toasts lang={lang} />
      <EasterEggs lang={lang} />
    </FxProvider>
  );
}
