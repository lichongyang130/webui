import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getItems, toCardItem } from "@/lib/db";
import { getLang, t } from "@/lib/i18n";
import FavoritesClient from "./FavoritesClient";

export default async function FavoritesPage() {
  const lang = await getLang();
  // Send only public, lightweight fields to the client (html/prompt stripped,
  // previews stream from /r/<slug>/preview.html — #48).
  const items = getItems().map(toCardItem);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container-v py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="grad-text">{t(lang, "favoritesTitle")}</span>
          </h1>
          <p className="mt-3 max-w-2xl text-white/55">{t(lang, "favoritesDesc")}</p>
        </header>
        <FavoritesClient items={items as never} lang={lang} />
      </main>
      <SiteFooter />
    </div>
  );
}
