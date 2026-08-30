import { ReactNode } from "react";
import { Star, X } from "lucide-react";

export function Modal({
  open,
  title,
  onClose,
  children,
  wide,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`card w-full ${wide ? "max-w-2xl" : "max-w-md"} max-h-[85vh] overflow-y-auto p-5`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-100">{title}</h3>
          <button className="btn !p-1.5" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-3">
      <span className="label">{label}</span>
      {children}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, [string, string]> = {
    published: ["#34d39955", "#6ee7b7"],
    pending: ["#f59e0b55", "#fcd34d"],
  };
  const [bg, fg] = map[status] || ["#64748b55", "#cbd5e1"];
  return (
    <span className="badge" style={{ borderColor: bg, color: fg, background: bg + "22" }}>
      {status === "published" ? "已发布" : "待整理"}
    </span>
  );
}

export function StarBtn({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      className="btn !p-1.5"
      title={on ? "取消收藏" : "收藏"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Star size={15} className={on ? "fill-amber-400 text-amber-400" : "text-slate-500"} />
    </button>
  );
}

export function Pager({
  page,
  pageSize,
  total,
  onChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onChange: (p: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
      <span>
        共 {total} 条 · 第 {page}/{pages} 页
      </span>
      <div className="flex gap-2">
        <button className="btn !py-1" disabled={page <= 1} onClick={() => onChange(page - 1)}>
          上一页
        </button>
        <button className="btn !py-1" disabled={page >= pages} onClick={() => onChange(page + 1)}>
          下一页
        </button>
      </div>
    </div>
  );
}

export function Empty({ text }: { text: string }) {
  return (
    <div className="card grid-bg flex h-40 items-center justify-center text-sm text-slate-500">
      {text}
    </div>
  );
}
