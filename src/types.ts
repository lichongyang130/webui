export interface Section {
  id: number;
  slug: string;
  name: string;
  url: string;
  icon: string;
  color: string;
  description: string;
  sort: number;
  enabled: number;
  category_count?: number;
  item_count?: number;
}
export interface Category {
  id: number;
  section_id: number;
  slug: string;
  name: string;
  description: string;
  sort: number;
  item_count?: number;
}
export interface Item {
  id: number;
  section_id: number;
  category_id: number;
  name: string;
  url: string;
  description: string;
  tags: string;
  tech: string;
  cover_image: string;
  status: string;
  starred: number;
  notes: string;
  created_at: string;
  updated_at: string;
  section_name?: string;
  section_color?: string;
  section_slug?: string;
  category_name?: string;
  alias?: string;
  principle?: string;
  perf_cost?: string;
  deps?: string;
  difficulty?: number;
  popularity?: number;
  inspiration?: string;
  mobile_friendly?: number;
  access_level?: string;
  variant_count?: number;
  migrated_to?: string;
  snippet?: string;
  props?: string;
  pitfalls?: string;
  perf_note?: string;
  a11y_note?: string;
  principle_note?: string;
  exercise?: string;
  video_url?: string;
  faq?: string;
}
export interface Asset {
  id: number;
  path: string;
  title: string;
  screen: string | null;
  linked_item_id: number | null;
  linked_item_name?: string | null;
  created_at: string;
}
export interface Stats {
  sections: number;
  categories: number;
  items: number;
  starred_count: number;
  assets: number;
  perSection: { id: number; slug: string; name: string; color: string; c: number }[];
  recent: Item[];
  starred: { id: number; name: string; section_name: string; section_color: string }[];
}
export const parseTags = (t: string | undefined): string[] => {
  try {
    return JSON.parse(t || "[]");
  } catch {
    return [];
  }
};
