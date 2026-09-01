// Skeleton placeholders with a looping shine sweep.
export default function SkeletonCards() {
  return (
    <>
      <style>{`
        .skel::after { content:''; position:absolute; inset:0;
          background: linear-gradient(100deg, transparent 20%, rgba(255,255,255,.12) 50%, transparent 80%);
          animation: shim 1.4s infinite; transform: translateX(-100%); }
        @keyframes shim { to { transform: translateX(100%); } }
      `}</style>
      <div className="grid w-full max-w-[560px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
        {[0, 1].map((c) => (
          <div key={c} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="skel relative mb-3.5 h-11 w-11 overflow-hidden rounded-full bg-white/[0.06]" />
            <div className="skel relative my-2.5 h-3 rounded-lg bg-white/[0.06]" style={{ width: "60%" }} />
            <div className="skel relative my-2.5 h-3 rounded-lg bg-white/[0.06]" style={{ width: "90%" }} />
            <div className="skel relative my-2.5 h-3 rounded-lg bg-white/[0.06]" style={{ width: "75%" }} />
          </div>
        ))}
      </div>
    </>
  );
}
