import { Item, Settings } from "../types";
import { TEMPLATE_ITEMS } from "./templates";
import { COMPONENT_ITEMS } from "./components";
import { ELEMENT_ITEMS } from "./elements";
import { ANIMATION_ITEMS } from "./animations";
import { EXTRA_TEMPLATE_ITEMS } from "./extra-templates";
import { EXTRA_COMPONENT_ITEMS } from "./extra-components";
import { EXTRA_ELEMENT_ITEMS } from "./extra-elements";
import { EXTRA_ANIMATION_ITEMS } from "./extra-animations";
import { WAVE4_ITEMS } from "./wave4";
import { WAVE5_ITEMS } from "./wave5";
import { WAVE6_ITEMS } from "./wave6";
import { WAVE7_ITEMS } from "./wave7";
import { WAVE8_ITEMS } from "./wave8";
import { WAVE9_ITEMS } from "./wave9";
import { withReactSources } from "./react";

const RAW_ITEMS: Item[] = [
  ...TEMPLATE_ITEMS,
  ...EXTRA_TEMPLATE_ITEMS,
  ...COMPONENT_ITEMS,
  ...EXTRA_COMPONENT_ITEMS,
  ...ELEMENT_ITEMS,
  ...EXTRA_ELEMENT_ITEMS,
  ...ANIMATION_ITEMS,
  ...EXTRA_ANIMATION_ITEMS,
  ...WAVE4_ITEMS,
  ...WAVE5_ITEMS,
  ...WAVE6_ITEMS,
  ...WAVE7_ITEMS,
  ...WAVE8_ITEMS,
  ...WAVE9_ITEMS,
];

export const SEED_ITEMS: Item[] = withReactSources(RAW_ITEMS);

export const DEFAULT_SETTINGS: Settings = {
  siteName: "MotionVault",
  tagline: "The treasure vault for animated web design",
  heroTitle: "Every animated website you'll ever need — plus the AI prompt to build it",
  heroSubtitle:
    "MotionVault fuses the best of Motion Sites, React Bits, Uiverse, Anime.js and Aceternity UI into one vault: full site templates, advanced components, UI micro-elements and animation snippets — each with a live preview, full source code, and a copy-paste AI prompt.",
  adminUser: "admin",
  adminPass: "motion123",
  navLinks: [
    { label: "Templates", url: "/templates" },
    { label: "Components", url: "/components" },
    { label: "UI Elements", url: "/elements" },
    { label: "Animations", url: "/animations" },
  ],
};
