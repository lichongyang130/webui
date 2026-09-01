import "server-only";
import { cookies } from "next/headers";
import { verifyLogin, logLogin } from "./db";

const COOKIE = "mv_session";
// Demo-grade token. In production replace with a signed JWT/session table.
export function createToken(user: string) {
  return Buffer.from(`${user}:${Date.now()}`).toString("base64url");
}

export async function login(user: string, pass: string): Promise<boolean> {
  if (!verifyLogin(user, pass)) return false;
  const jar = await cookies();
  jar.set(COOKIE, createToken(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  logLogin();
  return true;
}

export async function logout() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  return !!jar.get(COOKIE)?.value;
}
