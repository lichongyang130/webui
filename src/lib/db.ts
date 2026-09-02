import "server-only";
import fs from "node:fs";
import path from "node:path";
import { DB, Item, Settings, AdminEvent, ItemStatus, User, AuthProvider } from "./types";
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
    users: [],
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
  if (!db.users) {
    db.users = [];
    changed = true;
  }
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
/** Strip heavy blobs (html/prompt/react) from items used in card listings —
 *  previews come from /r/<slug>/preview.html and prompts from /api/prompt (#48). */
export function toCardItem(i: Item): Item {
  return { ...i, html: "", prompt: "", react: i.react ? "tsx" : undefined };
}

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

export function getPopularTags(limit = 12): { tag: string; count: number }[] {  const counts = new Map<string, number>();
  load()
    .items.filter((i) => i.published && i.status !== "pending")
    .forEach((i) => i.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/** Tag counts scoped to a category (used by category browse pages). */
export function getTagCounts(category?: string, limit = 14): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  load()
    .items.filter(
      (i) =>
        i.published &&
        i.status !== "pending" &&
        (!category || i.category === category)
    )
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
  /** auth user id when a signed-in member uploads */
  ownerId?: string;
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
    ownerId: input.ownerId,
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

// ------------------------------------------------------------- user accounts
const normEmail = (e: string) => e.trim().toLowerCase();

export function getUserById(id: string): User | undefined {
  return load().users.find((u) => u.id === id);
}

export function findUserByEmail(email: string): User | undefined {
  const e = normEmail(email);
  return load().users.find((u) => u.email === e);
}

export function findUserByProvider(
  provider: AuthProvider,
  providerId: string
): User | undefined {
  return load().users.find(
    (u) => u.provider === provider && u.providerId === providerId
  );
}

export function createLocalUser(
  name: string,
  email: string,
  passwordHash: string
): User {
  const db = load();
  const user: User = {
    id: uid("u"),
    name: name.trim(),
    email: normEmail(email),
    passwordHash,
    provider: "local",
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };
  db.users.push(user);
  save(db);
  return user;
}

/** Find-or-create an OAuth account; refreshes name/avatar/lastLogin each time. */
export function upsertOAuthUser(
  provider: AuthProvider,
  providerId: string,
  profile: { name: string; email: string; avatar?: string }
): User {
  const db = load();
  let user = db.users.find(
    (u) => u.provider === provider && u.providerId === providerId
  );
  const now = new Date().toISOString();
  if (user) {
    user.name = profile.name || user.name;
    user.avatar = profile.avatar ?? user.avatar;
    user.lastLoginAt = now;
  } else {
    user = {
      id: uid("u"),
      name: profile.name,
      email: normEmail(profile.email || `${provider}.${providerId}@oauth.local`),
      provider,
      providerId,
      avatar: profile.avatar,
      createdAt: now,
      lastLoginAt: now,
    };
    db.users.push(user);
  }
  save(db);
  return user;
}

export function touchUserLogin(id: string) {
  const db = load();
  const u = db.users.find((x) => x.id === id);
  if (u) {
    u.lastLoginAt = new Date().toISOString();
    save(db);
  }
}

export function countUsers(): number {
  return load().users.length;
}

export function getFavorites(uid: string): string[] {
  return load().users.find((u) => u.id === uid)?.favorites ?? [];
}

/** Merge client-provided slugs into the member's server-side favorites. */
export function syncFavorites(uid: string, slugs: string[]): string[] {
  const db = load();
  const u = db.users.find((x) => x.id === uid);
  if (!u) return [];
  const merged = [...new Set([...(u.favorites ?? []), ...slugs])];
  u.favorites = merged;
  save(db);
  return merged;
}

/** Toggle one favorite; returns the new list + whether it is now on. */
export function toggleFavorite(uid: string, slug: string): { favs: string[]; on: boolean } {
  const db = load();
  const u = db.users.find((x) => x.id === uid);
  if (!u) return { favs: [], on: false };
  const cur = new Set(u.favorites ?? []);
  const on = !cur.has(slug);
  if (on) cur.add(slug);
  else cur.delete(slug);
  u.favorites = [...cur];
  save(db);
  return { favs: u.favorites, on };
}

export function updateUserName(id: string, name: string): User | undefined {
  const db = load();
  const u = db.users.find((x) => x.id === id);
  if (!u) return undefined;
  u.name = name.trim();
  save(db);
  return u;
}

/** Sets a new scrypt hash; only for local (email+password) accounts. */
export function setUserPassword(id: string, passwordHash: string): boolean {
  const db = load();
  const u = db.users.find((x) => x.id === id && x.provider === "local");
  if (!u) return false;
  u.passwordHash = passwordHash;
  save(db);
  return true;
}

// ------------------------------------------------------------- member uploads
export function getItemsByOwner(ownerId: string): Item[] {
  return structuredClone(
    load()
      .items.filter((i) => i.ownerId === ownerId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  );
}

/** Members may delete their own submission while it is still pending review. */
export function deleteOwnedItem(ownerId: string, id: string): boolean {
  const db = load();
  const idx = db.items.findIndex((i) => i.id === id && i.ownerId === ownerId);
  if (idx === -1) return false;
  if (db.items[idx].status !== "pending") return false;
  const [removed] = db.items.splice(idx, 1);
  save(db);
  logEvent("delete", `Member removed pending submission "${removed.title}"`);
  return true;
}
