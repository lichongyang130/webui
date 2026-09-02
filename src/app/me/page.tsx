import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MemberCenter from "./MemberCenter";
import { getItemsByOwner } from "@/lib/db";
import { getLang } from "@/lib/i18n";
import { getSessionUser } from "@/lib/userauth";

export const metadata: Metadata = {
  title: "会员中心 · MotionVault",
  description: "Manage your profile, upload animated assets and share them.",
};

export default async function MemberPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/me");

  const lang = await getLang();
  const items = getItemsByOwner(user.id).map((i) => ({
    id: i.id,
    slug: i.slug,
    title: i.title,
    category: i.category,
    status: i.status ?? "curated",
    published: i.published,
    views: i.views,
    copies: i.copies,
    stars: i.stars,
    createdAt: i.createdAt,
    html: i.html,
  }));

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container-v py-10">
        <MemberCenter user={user} items={items} zh={lang === "zh"} />
      </main>
      <SiteFooter />
    </div>
  );
}
