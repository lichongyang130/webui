import { ReactNode } from "react";
import { demoByName } from "../demos";

/**
 * 列表卡片缩略:
 * - 默认显示产品效果图(无封面时用服务端生成的 SVG 效果图,保证每条都有图)
 * - 悬停切换到真实运行的组件演示(有实现时),右上角 LIVE 角标
 */
export default function LiveThumb({
  id,
  name,
  cover,
  fallback,
}: {
  id?: number;
  name: string;
  cover?: string | null;
  fallback?: ReactNode;
}) {
  const d = demoByName(name);
  const img = cover || (id ? `/api/public/cover/${id}.svg` : null);
  return (
    <div className="group relative aspect-video w-full overflow-hidden">
      {img ? (
        <img src={img} alt={name} loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ${d ? "group-hover:scale-105 group-hover:opacity-0" : ""}`} />
      ) : (
        fallback ?? <div className="grid-bg absolute inset-0" />
      )}
      {d && (
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <d.comp />
        </div>
      )}
      {d && (
        <span className="absolute right-1.5 top-1.5 flex items-center gap-1 rounded-full bg-[#05060acc] px-1.5 py-0.5 text-[8px] font-bold text-emerald-400 backdrop-blur">
          <i className="h-1 w-1 rounded-full bg-emerald-400" /> LIVE
        </span>
      )}
    </div>
  );
}
