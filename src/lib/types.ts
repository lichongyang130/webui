export type CategorySlug = "templates" | "components" | "elements" | "animations";

export interface Category {
  slug: CategorySlug;
  name: string;
  nameZh: string;
  tagline: string;
  taglineZh: string;
  description: string;
  descriptionZh: string;
  icon: string;
  accent: string; // tailwind gradient classes
}

export type Tech = "html" | "css" | "javascript" | "react" | "tailwind" | "gsap" | "animejs" | "framer";

export type ItemStatus = "curated" | "pending" | "approved";

export interface Item {
  id: string;
  slug: string;
  category: CategorySlug;
  title: string;
  summary: string;
  author: string;
  tags: string[];
  tech: Tech[];
  stars: number;
  views: number;
  copies: number;
  featured: boolean;
  published: boolean;
  html: string; // self-contained HTML for live preview
  prompt: string; // AI prompt to reproduce it
  /** React + Tailwind + TypeScript component source (downloadable) */
  react?: string;
  /** curated = official, pending = community submission awaiting review, approved = accepted */
  status?: ItemStatus;
  submittedBy?: string;
  submittedAt?: string;
  sourceUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  siteName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  adminUser: string;
  adminPass: string;
  navLinks: { label: string; url: string }[];
}

export interface DailyStat {
  date: string;
  views: number;
  copies: number;
}

export interface DB {
  items: Item[];
  settings: Settings;
  events: AdminEvent[];
  dailyStats: Record<string, { views: number; copies: number }>;
}

export interface AdminEvent {
  id: string;
  type: "create" | "update" | "delete" | "login" | "settings" | "approve";
  message: string;
  at: string;
}
