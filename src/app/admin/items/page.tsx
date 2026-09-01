import Link from "next/link";
import { Icon } from "@/components/icons";
import { CATEGORY_MAP } from "@/lib/categories";
import { getAllItemsAdmin } from "@/lib/db";
import ItemsTable from "./ItemsTable";

export default function AdminItemsPage() {
  const items = getAllItemsAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">All Items</h1>
          <p className="mt-1 text-sm text-white/45">
            {items.length} assets in the vault — edit, publish or delete them here.
          </p>
        </div>
        <Link href="/admin/items/new" className="grad-btn">
          <Icon name="plus" className="h-4 w-4" /> Add new item
        </Link>
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        <ItemsTable
          initial={items.map((i) => ({
            id: i.id,
            slug: i.slug,
            title: i.title,
            category: i.category,
            categoryName: CATEGORY_MAP[i.category]?.name ?? i.category,
            author: i.author,
            views: i.views,
            copies: i.copies,
            featured: i.featured,
            published: i.published,
            updatedAt: i.updatedAt,
          }))}
        />
      </div>
    </div>
  );
}
