import "server-only";
import fs from "node:fs";
import path from "node:path";
import { DB, Item, Settings, AdminEvent, ItemStatus } from "./types";
import { SEED_ITEMS, DEFAULT_SETTINGS } from "./seed";
import { REACT_SOURCES } from "./seed/react";

// Lightweight JSON-file store (server-only). The data-access API mirrors what a
// SQL/ORM layer would expose, so swapping in Postgres/SQLite later is trivial.
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "vault.json");

declare global {
  // eslint-disable-next-line no-var
  var __vaultDB: DB | undefined;
}

function todayKey(offsetDays = 0): string {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return d.toISOString().slice(0, 10);
}

function freshDB(): DB {
  return {
    items: structuredClone(SEED_ITEMS),
    settings: structuredClone(DEFAULT_SETTINGS),
    events: [
      {
        id: "ev-seed",
        type: "create",
        message: `Vault initialized with ${SEED_ITEMS.length} curated items`,
        at: new Date().toISOString(),
      },
    ],
    dailyStats: {},
  };
}

/** Fill the last N days of stats with plausible seed numbers for nice charts. */
function seedDailyStats(): Record<string, { views: number; copies: number }> {
  const stats: Record<string, { views: number; copies: number }> = {};
  for (let i = 20; i >= 0; i--) {
    const key = todayKey(-i);
    const wave = Math.sin((20 - i) / 3) * 0.5 + 0.5;
    stats[key] = {
      views: Math.round(420 + wave * 380 + Math.random() * 260),
      copies: Math.round(90 + wave * 110 + Math.random() * 70),
    };
  }
  return stats;
}

function migrate(db: DB) {
  let changed = false;
  if (!db.dailyStats || Object.keys(db.dailyStats).length === 0) {
    db.dailyStats = seedDailyStats();
    changed = true;
  }
  if (!db.events) db.events = [];
  for (const item of db.items) {
    if (item.status === undefined) {
      item.status = "curated";
      changed = true;
    }
    // Fix historical duplicate slug: the w17 avatar-stack component shared the
    // slug of the el-avatars element, which shadowed one of them at /item/[slug].
    if (item.id === "w17-av" && item.slug === "overlapping-avatar-stack") {
      item.slug = "overlapping-avatar-stack-chip";
      changed = true;
    }
    // Backfill React sources for items shipped with one.
    if (!item.react && REACT_SOURCES[item.slug]) {
      item.react = REACT_SOURCES[item.slug];
      const tech = item.tech as string[];
      if (!tech.includes("react")) {
        tech.push("react");
        tech.push("tailwind");
      }
      changed = true;
    }
  }
  return changed;
}

function load(): DB {
  if (globalThis.__vaultDB) return globalThis.__vaultDB;
  let db: DB | null = null;
  try {
    if (fs.existsSync(DB_FILE)) {
      db = JSON.parse(fs.readFileSync(DB_FILE, "utf8")) as DB;
    }
  } catch (err) {
    console.error("[vault] failed to read db, reseeding:", err);
    db = null;
  }
  if (db) {
    let changed = migrate(db);
    // Migration: merge in any seed items added in a newer code release.
    const existingIds = new Set(db.items.map((i) => i.id));
    const missing = SEED_ITEMS.filter((i) => !existingIds.has(i.id));
    if (missing.length) {
      db.items.push(...missing);
      changed = true;
    }
    if (changed) save(db);
  } else {
    db = freshDB();
    migrate(db);
    save(db);
  }
  globalThis.__vaultDB = db;
  return db;
}

function save(db: DB = load()) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error("[vault] failed to write db:", err);
  }
}

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function logEvent(type: AdminEvent["type"], message: string) {
  const db = load();
  db.events.unshift({ id: uid("ev"), type, message, at: new Date().toISOString() });
  db.events = db.events.slice(0, 100);
  save(db);
}

function bumpStat(kind: "views" | "copies") {
  const db = load();
  const key = todayKey();
  if (!db.dailyStats[key]) db.dailyStats[key] = { views: 0, copies: 0 };
  db.dailyStats[key][kind] += 1;
}

// ------------------------------------------------------------- public reads
export interface ItemQuery {
  category?: string;
  q?: string;
  tag?: string;
  tech?: string;
  sort?: "popular" | "newest" | "copies" | "az";
  featured?: boolean;
}

export function getItems(query: ItemQuery = {}): Item[] {
  let items = load().items.filter(
    (i) => i.published && i.status !== "pending"
  );
  if (query.category) items = items.filter((i) => i.category === query.category);
  if (query.featured) items = items.filter((i) => i.featured);
  if (query.tag) items = items.filter((i) => i.tags.includes(query.tag!));
  if (query.tech) items = items.filter((i) => i.tech.includes(query.tech as Item["tech"][number]));
  if (query.q) {
    const q = query.q.toLowerCase();
    items = items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q) ||
        i.tags.some((t) => t.includes(q)) ||
        i.author.toLowerCase().includes(q)
    );
  }
  const sorters: Record<string, (a: Item, b: Item) => number> = {
    popular: (a, b) => b.views - a.views,
    newest: (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    copies: (a, b) => b.copies - a.copies,
    az: (a, b) => a.title.localeCompare(b.title),
  };
  return [...items].sort(sorters[query.sort ?? "popular"]);
}

export function getAllItemsAdmin(): Item[] {
  return [...load().items].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

export function getPendingItems(): Item[] {
  return load()
    .items.filter((i) => i.status === "pending")
    .sort((a, b) => +new Date(b.submittedAt ?? b.createdAt) - +new Date(a.submittedAt ?? a.createdAt));
}

export function getItemBySlug(slug: string): Item | undefined {
  return load().items.find((i) => i.slug === slug && i.published && i.status !== "pending");
}

export function getItemById(id: string): Item | undefined {
  return load().items.find((i) => i.id === id);
}

export function getRelated(slug: string, category: string, limit = 3): Item[] {
  return getItems({ category })
    .filter((i) => i.slug !== slug)
    .slice(0, limit);
}

export function incrementViews(slug: string) {
  const db = load();
  const item = db.items.find((i) => i.slug === slug);
  if (item) {
    item.views += 1;
    bumpStat("views");
    save(db);
  }
}

export function incrementCopies(slug: string) {
  const db = load();
  const item = db.items.find((i) => i.slug === slug);
  if (item) {
    item.copies += 1;
    bumpStat("copies");
    save(db);
  }
}

export function getStats() {
  const items = load().items;
  const pub = items.filter((i) => i.published && i.status !== "pending");
  const byCategory = (c: string) => pub.filter((i) => i.category === c).length;
  return {
    total: pub.length,
    templates: byCategory("templates"),
    components: byCategory("components"),
    elements: byCategory("elements"),
    animations: byCategory("animations"),
    views: pub.reduce((s, i) => s + i.views, 0),
    copies: pub.reduce((s, i) => s + i.copies, 0),
    stars: pub.reduce((s, i) => s + i.stars, 0),
    drafts: items.filter((i) => !i.published).length,
    pending: items.filter((i) => i.status === "pending").length,
  };
}

export function getDailyStats(days = 21): { date: string; views: number; copies: number }[] {
  const stats = load().dailyStats ?? {};
  const out: { date: string; views: number; copies: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const key = todayKey(-i);
    const s = stats[key] ?? { views: 0, copies: 0 };
    out.push({ date: key, views: s.views, copies: s.copies });
  }
  return out;
}

export function getPopularTags(limit = 12): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  load()
    .items.filter((i) => i.published && i.status !== "pending")
    .forEach((i) => i.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

// ------------------------------------------------------------- settings
export function getSettings(): Settings {
  return structuredClone(load().settings);
}

export function updateSettings(patch: Partial<Settings>): Settings {
  const db = load();
  Object.assign(db.settings, patch);
  save(db);
  logEvent("settings", "Site settings updated");
  return structuredClone(db.settings);
}

export function verifyLogin(user: string, pass: string): boolean {
  const s = load().settings;
  return user === s.adminUser && pass === s.adminPass;
}

// ------------------------------------------------------------- admin CRUD
export type ItemInput = Omit<Item, "id" | "createdAt" | "updatedAt" | "views" | "stars" | "copies"> &
  Partial<Pick<Item, "views" | "stars" | "copies">>;

function uniqueSlug(base: string): string {
  const db = load();
  let slug = base;
  let n = 2;
  while (db.items.some((i) => i.slug === slug)) slug = `${base}-${n++}`;
  return slug;
}

export function createItem(input: ItemInput): Item {
  const db = load();
  const now = new Date().toISOString();
  const item: Item = {
    ...input,
    status: input.status ?? "curated",
    slug: uniqueSlug(input.slug),
    id: uid("itm"),
    views: input.views ?? 0,
    stars: input.stars ?? 0,
    copies: input.copies ?? 0,
    createdAt: now,
    updatedAt: now,
  };
  db.items.unshift(item);
  save(db);
  logEvent("create", `Added ${item.category} item "${item.title}"`);
  return item;
}

export interface SubmissionInput {
  title: string;
  category: Item["category"];
  summary: string;
  author: string;
  submitterEmail: string;
  tags: string[];
  tech: Item["tech"];
  html: string;
  prompt: string;
}

export function createSubmission(input: SubmissionInput): Item {
  const db = load();
  const now = new Date().toISOString();
  const base =
    input.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "community-submission";
  const item: Item = {
    id: uid("sub"),
    slug: uniqueSlug(base),
    category: input.category,
    title: input.title,
    summary: input.summary,
    author: input.author || "Community",
    tags: input.tags,
    tech: input.tech,
    stars: 0,
    views: 0,
    copies: 0,
    featured: false,
    published: false,
    html: input.html,
    prompt: input.prompt,
    status: "pending",
    submittedBy: input.submitterEmail,
    submittedAt: now,
    createdAt: now,
    updatedAt: now,
  };
  db.items.unshift(item);
  save(db);
  logEvent("create", `New community submission "${item.title}" awaiting review`);
  return item;
}

export function updateItem(id: string, patch: Partial<Item>): Item | undefined {
  const db = load();
  const item = db.items.find((i) => i.id === id);
  if (!item) return undefined;
  Object.assign(item, patch, { updatedAt: new Date().toISOString() });
  save(db);
  logEvent("update", `Updated "${item.title}"`);
  return item;
}

export function approveItem(id: string): Item | undefined {
  const item = updateItem(id, { status: "approved" as ItemStatus, published: true, featured: false });
  if (item) logEvent("approve", `Approved community submission "${item.title}"`);
  return item;
}

export function rejectItem(id: string): boolean {
  const db = load();
  const idx = db.items.findIndex((i) => i.id === id);
  if (idx === -1) return false;
  const [removed] = db.items.splice(idx, 1);
  save(db);
  logEvent("delete", `Rejected submission "${removed.title}"`);
  return true;
}

export function deleteItem(id: string): boolean {
  const db = load();
  const idx = db.items.findIndex((i) => i.id === id);
  if (idx === -1) return false;
  const [removed] = db.items.splice(idx, 1);
  save(db);
  logEvent("delete", `Deleted "${removed.title}"`);
  return true;
}

export function getEvents(): AdminEvent[] {
  return structuredClone(load().events).slice(0, 30);
}

export function logLogin() {
  logEvent("login", "Admin signed in");
}
