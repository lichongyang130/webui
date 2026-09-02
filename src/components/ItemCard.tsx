import Link from "next/link";
import { Item } from "@/lib/types";
import { CATEGORY_MAP, TECH_LABELS } from "@/lib/categories";
import { Icon } from "./icons";
import FavButton from "./FavButton";
import TiltCard from "./fx/TiltCard";
import QuickCopy from "./fx/QuickCopy";
import SmartPreview from "./fx/SmartPreview";
import type { Lang } from "@/lib/i18n";

function fmt(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
}

export default function ItemCard({ item, lang = "en" }: { item: Item; lang?: Lang }) {
  const cat = CATEGORY_MAP[item.category];
  return (
    <TiltCard className="group fx-border-glow relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-[border-color,box-shadow] duration-300 hover:border-fuchsia-400/40 hover:shadow-[0_28px_70px_-28px_rgba(139,92,246,0.55)]">
      <Link href={`/item/${item.slug}`} className="flex h-full flex-col">
        {/* Live thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.07] bg-[#0a0a18]">
          <SmartPreview src={`/r/${item.slug}/preview.html`} title={item.title} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070711] via-transparent to-transparent" />
          {item.featured && (
            <span className="fx-float absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg">
              <Icon name="star" className="h-3 w-3" /> {lang === "zh" ? "精选" : "Featured"}
            </span>
          )}
          <span
            className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${cat.accent} px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/95`}
          >
            <Icon name={cat.icon} className="h-3 w-3" /> {lang === "zh" ? cat.nameZh : cat.name}
          </span>
          {item.react && (
            <span className="absolute bottom-3 right-3 rounded-md border border-cyan-400/40 bg-cyan-950/70 px-2 py-0.5 text-[10px] font-bold text-cyan-300 backdrop-blur">
              ⚛ TSX
            </span>
          )}
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 opacity-0 backdrop-blur transition group-hover:opacity-100">
            <Icon name="eye" className="h-3.5 w-3.5" /> {lang === "zh" ? "实时预览" : "Live preview"}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-1 text-[15px] font-bold leading-snug transition group-hover:text-fuchsia-200">
            {item.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-white/50">{item.summary}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tech.slice(0, 3).map((tech) => (
              <span key={tech} className="chip !px-2 !py-0.5 text-[10.5px]">
                {TECH_LABELS[tech] ?? tech}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3 text-[11.5px] text-white/40">
            <span className="flex items-center gap-1.5">
              <Icon name="star" className="h-3.5 w-3.5 text-amber-300" />
              {fmt(item.stars)}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="eye" className="h-3.5 w-3.5" />
              {fmt(item.views)}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="copy" className="h-3.5 w-3.5" />
              {fmt(item.copies)}
            </span>
            <span className="flex items-center gap-1 font-semibold text-violet-300 opacity-0 transition group-hover:opacity-100">
              {lang === "zh" ? "打开" : "Open"} <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
      {/* hover action cluster */}
      <div className="absolute bottom-3 right-3 z-20 flex translate-y-2 items-center gap-1.5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <QuickCopy slug={item.slug} lang={lang} />
        <FavButton slug={item.slug} lang={lang} className="!h-8 !w-8 backdrop-blur" />
      </div>
    </TiltCard>
  );
}
