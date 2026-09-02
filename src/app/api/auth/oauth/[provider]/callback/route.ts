import { NextRequest, NextResponse } from "next/server";
import { upsertOAuthUser } from "@/lib/db";
import {
  OAuthProvider,
  oauthCallbackPath,
  setUserSession,
} from "@/lib/userauth";

const STATE_COOKIE = "mv_oauth_state";

interface OAuthProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

async function exchangeGoogle(
  code: string,
  origin: string
): Promise<OAuthProfile> {
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${origin}${oauthCallbackPath("google")}`,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenRes.ok) throw new Error(`google token: ${tokenRes.status}`);
  const token = (await tokenRes.json()) as { access_token?: string };
  if (!token.access_token) throw new Error("google token: no access_token");

  const me = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });
  if (!me.ok) throw new Error(`google userinfo: ${me.status}`);
  const p = (await me.json()) as {
    sub: string;
    name?: string;
    email?: string;
    picture?: string;
  };
  return {
    id: p.sub,
    name: p.name || p.email?.split("@")[0] || "Google User",
    email: p.email || `google.${p.sub}@oauth.local`,
    avatar: p.picture,
  };
}

async function exchangeGitHub(
  code: string,
  origin: string
): Promise<OAuthProfile> {
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      redirect_uri: `${origin}${oauthCallbackPath("github")}`,
    }),
  });
  if (!tokenRes.ok) throw new Error(`github token: ${tokenRes.status}`);
  const token = (await tokenRes.json()) as { access_token?: string };
  if (!token.access_token) throw new Error("github token: no access_token");

  const headers = {
    Authorization: `Bearer ${token.access_token}`,
    "User-Agent": "motionvault",
    Accept: "application/vnd.github+json",
  };
  const me = await fetch("https://api.github.com/user", { headers });
  if (!me.ok) throw new Error(`github user: ${me.status}`);
  const p = (await me.json()) as {
    id: number;
    login: string;
    name?: string | null;
    email?: string | null;
    avatar_url?: string;
  };

  let email = p.email || "";
  if (!email) {
    const emails = await fetch("https://api.github.com/user/emails", {
      headers,
    });
    if (emails.ok) {
      const list = (await emails.json()) as {
        email: string;
        primary: boolean;
        verified: boolean;
      }[];
      email =
        list.find((e) => e.primary && e.verified)?.email ||
        list[0]?.email ||
        "";
    }
  }

  return {
    id: String(p.id),
    name: p.name || p.login,
    email: email || `github.${p.id}@oauth.local`,
    avatar: p.avatar_url,
  };
}

/** GET /api/auth/oauth/<provider>/callback — finishes the OAuth flow. */
export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ provider: string }> }
) {
  const { provider } = await ctx.params;
  const origin = req.nextUrl.origin;
  if (provider !== "google" && provider !== "github") {
    return NextResponse.json({ error: "Unknown provider" }, { status: 404 });
  }

  const fail = (reason: string) => {
    const res = NextResponse.redirect(
      `${origin}/login?error=oauth_${provider}_${reason}`
    );
    res.cookies.delete(STATE_COOKIE);
    return res;
  };

  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const expect = req.cookies.get(STATE_COOKIE)?.value;
  if (!code) return fail("nocode");
  if (!state || !expect || expect !== `${provider}:${state}`) {
    return fail("state");
  }

  try {
    const profile =
      provider === "google"
        ? await exchangeGoogle(code, origin)
        : await exchangeGitHub(code, origin);

    const user = upsertOAuthUser(provider as OAuthProvider, profile.id, {
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar,
    });
    await setUserSession(user.id);
    const res = NextResponse.redirect(`${origin}/?welcome=${provider}`);
    res.cookies.delete(STATE_COOKIE);
    return res;
  } catch (err) {
    console.error(`[oauth:${provider}]`, err);
    return fail("exchange");
  }
}
