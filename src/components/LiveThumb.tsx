import { ReactNode } from "react";
import { demoByName } from "../demos";

/**
 * 列表卡片缩略:优先渲染真实运行演示,无实现时回退封面图/占位。
 */
export default function LiveThumb({
  name,
  cover,
  fallback,
}: {
  name: string;
  cover?: string | null;
  fallback?: ReactNode;
}) {
  const d = demoByName(name);
  if (d)
    return (
      <div className="relative aspect-video w-full overflow-hidden">
        <d.comp />
        <span className="absolute right-1.5 top-1.5 flex items-center gap-1 rounded-full bg-[#05060acc] px-1.5 py-0.5 text-[8px] font-bold text-emerald-400 backdrop-blur">
          <i className="h-1 w-1 rounded-full bg-emerald-400" /> LIVE
        </span>
      </div>
    );
  if (cover) return <img src={cover} alt={name} loading="lazy" className="aspect-video w-full object-cover opacity-85 transition duration-500 hover:scale-105 hover:opacity-100" />;
  return <>{fallback ?? <div className="grid-bg aspect-video w-full" />}</>;
}
