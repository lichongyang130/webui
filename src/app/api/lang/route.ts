import { NextRequest, NextResponse } from "next/server";
import { LANG_COOKIE } from "@/lib/i18n";

export async function POST(req: NextRequest) {
  const { lang } = await req.json().catch(() => ({ lang: "en" }));
  const value = lang === "zh" ? "zh" : "en";
  const res = NextResponse.json({ ok: true, lang: value });
  res.cookies.set(LANG_COOKIE, value, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
