import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getLang, t } from "@/lib/i18n";
import SubmitForm from "./SubmitForm";

export default async function SubmitPage() {
  const lang = await getLang();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container-v py-12">
        <header className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            {lang === "zh" ? "社区投稿" : "Community"}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
            <span className="grad-text">{t(lang, "submitTitle")}</span>
          </h1>
          <p className="mt-3 text-white/55">{t(lang, "submitDesc")}</p>
        </header>
        <SubmitForm lang={lang} />
      </main>
      <SiteFooter />
    </div>
  );
}
