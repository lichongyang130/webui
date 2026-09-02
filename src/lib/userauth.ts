import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { getUserById } from "./db";
import { User } from "./types";

// ---------------------------------------------------------------------------
// Password hashing (scrypt, no native modules / no bcrypt needed)
// ---------------------------------------------------------------------------

const SCRYPT_OPTS = { N: 16384, r: 8, p: 1 };

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .scryptSync(password, salt, 32, SCRYPT_OPTS)
    .toString("hex");
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, hash] = stored.split(":");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const calc = crypto.scryptSync(password, salt, 32, SCRYPT_OPTS);
  const ref = Buffer.from(hash, "hex");
  return calc.length === ref.length && crypto.timingSafeEqual(calc, ref);
}

// ---------------------------------------------------------------------------
// Signed session cookie (HMAC-SHA256, httpOnly)
// ---------------------------------------------------------------------------

const COOKIE = "mv_user";
const SESSION_DAYS = 30;

function secret(): string {
  return (
    process.env.AUTH_SECRET ||
    "motionvault-dev-secret-change-me-in-production"
  );
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

interface SessionPayload {
  uid: string;
  exp: number;
}

export function createSessionToken(uid: string): string {
  const payload: SessionPayload = {
    uid,
    exp: Date.now() + SESSION_DAYS * 86400000,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function readSessionToken(
  token: string | undefined
): SessionPayload | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expect = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expect);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString()
    ) as SessionPayload;
    if (!payload.uid || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  provider: User["provider"];
  avatar?: string;
}

export function toPublicUser(u: User): PublicUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    provider: u.provider,
    avatar: u.avatar,
  };
}

export async function setUserSession(uid: string) {
  const jar = await cookies();
  jar.set(COOKIE, createSessionToken(uid), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}

export async function clearUserSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getSessionUser(): Promise<PublicUser | null> {
  const jar = await cookies();
  const payload = readSessionToken(jar.get(COOKIE)?.value);
  if (!payload) return null;
  const user = getUserById(payload.uid);
  return user ? toPublicUser(user) : null;
}

// ---------------------------------------------------------------------------
// OAuth provider configuration
// ---------------------------------------------------------------------------

export type OAuthProvider = "google" | "github";

/** "configured" = real OAuth app env vars present, "demo" = simulated sign-in. */
export function providerMode(provider: OAuthProvider): "configured" | "demo" {
  if (provider === "google") {
    return process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? "configured"
      : "demo";
  }
  return process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? "configured"
    : "demo";
}

export function oauthCallbackPath(provider: OAuthProvider): string {
  return `/api/auth/oauth/${provider}/callback`;
}
