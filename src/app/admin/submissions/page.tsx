import Link from "next/link";
import { Icon } from "@/components/icons";
import { CATEGORY_MAP } from "@/lib/categories";
import { getPendingItems } from "@/lib/db";
import SubmissionsClient from "./SubmissionsClient";

export default function SubmissionsPage() {
  const pending = getPendingItems();

  const rows = pending.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    category: p.category,
    categoryName: CATEGORY_MAP[p.category]?.name ?? p.category,
    author: p.author,
    email: p.submittedBy ?? "",
    submittedAt: p.submittedAt ?? p.createdAt,
    hasReact: false,
    tags: p.tags,
    html: p.html,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Community submissions</h1>
        <p className="mt-1 text-sm text-white/45">
          {pending.length} item{pending.length === 1 ? "" : "s"} awaiting review. Approve to publish into the vault.
        </p>
      </div>

      {pending.length === 0 ? (
        <div className="glass rounded-2xl py-16 text-center">
          <Icon name="check" className="mx-auto h-10 w-10 text-emerald-400/60" />
          <p className="mt-4 text-lg font-semibold">Queue is empty</p>
          <p className="mt-1 text-sm text-white/45">New community submissions will appear here for review.</p>
          <Link href="/submit" target="_blank" className="ghost-btn mt-6">
            <Icon name="external" className="h-4 w-4" /> Open submission form
          </Link>
        </div>
      ) : (
        <SubmissionsClient initial={rows} />
      )}
    </div>
  );
}
