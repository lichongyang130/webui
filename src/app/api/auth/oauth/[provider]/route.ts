import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { upsertOAuthUser } from "@/lib/db";
import {
  OAuthProvider,
  oauthCallbackPath,
  providerMode,
  setUserSession,
} from "@/lib/userauth";

const STATE_COOKIE = "mv_oauth_state";

/**
 * GET /api/auth/oauth/<provider> — kicks off the OAuth flow.
 * When client id/secret env vars are missing (local dev, preview sandboxes),
 * falls back to a clearly-labelled demo social account so the UX stays testable.
 */
export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ provider: string }> }
) {
  const { provider } = await ctx.params;
  if (provider !== "google" && provider !== "github") {
    return NextResponse.json({ error: "Unknown provider" }, { status: 404 });
  }
  const origin = req.nextUrl.origin;
  const demoName =
    provider === "google" ? "Google Demo User" : "GitHub Demo User";

  if (providerMode(provider) === "demo") {
    const user = upsertOAuthUser(provider, `demo-${provider}`, {
      name: demoName,
      email: `demo+${provider}@motionvault.dev`,
    });
    await setUserSession(user.id);
    return NextResponse.redirect(
      `${origin}/?welcome=${provider}&demo=1`
    );
  }

  const state = crypto.randomBytes(16).toString("hex");
  const redirectUri = `${origin}${oauthCallbackPath(provider)}`;

  let url: string;
  if (provider === "google") {
    const q = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      state,
      access_type: "online",
      prompt: "select_account",
    });
    url = `https://accounts.google.com/o/oauth2/v2/auth?${q}`;
  } else {
    const q = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID!,
      redirect_uri: redirectUri,
      scope: "read:user user:email",
      state,
    });
    url = `https://github.com/login/oauth/authorize?${q}`;
  }

  const res = NextResponse.redirect(url);
  res.cookies.set(STATE_COOKIE, `${provider}:${state}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600,
  });
  return res;
}

export type { OAuthProvider };
