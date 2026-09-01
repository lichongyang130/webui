// Five dots bouncing in a wave. Pure CSS.
export default function BounceDots() {
  return (
    <>
      <style>{`
        .bdots i { width: 14px; height: 14px; border-radius: 50%;
          background: linear-gradient(135deg, #22d3ee, #8b5cf6); animation: bd 1.3s ease-in-out infinite; }
        .bdots i:nth-child(2){ animation-delay:.15s }.bdots i:nth-child(3){ animation-delay:.3s }
        .bdots i:nth-child(4){ animation-delay:.45s }.bdots i:nth-child(5){ animation-delay:.6s }
        @keyframes bd { 0%,60%,100% { transform: translateY(0) scale(.7); opacity:.5 }
          30% { transform: translateY(-20px) scale(1); opacity:1; box-shadow: 0 8px 20px -4px rgba(139,92,246,.8) } }
      `}</style>
      <div className="bdots flex h-[50px] items-center gap-2.5">
        {[0,1,2,3,4].map((i) => <i key={i} />)}
      </div>
    </>
  );
}
