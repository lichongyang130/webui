import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getItems, toCardItem } from "@/lib/db";
import { getLang } from "@/lib/i18n";
import ShowcaseClient from "./ShowcaseClient";

export const dynamic = "force-dynamic";

export default async function ShowcasePage() {
  const lang = await getLang();
  const items = getItems({ sort: "newest" }).slice(0, 16).map(toCardItem);
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <ShowcaseClient items={items} lang={lang} />
      </main>
      <SiteFooter />
    </div>
  );
}
