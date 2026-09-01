// Pure CSS liquid orb: apply this component's <style> once, then drop <div className="liq-orb" />.
export default function LiquidOrb() {
  return (
    <>
      <style>{`
        .liq-orb { width: 90px; height: 90px; position: relative; filter: contrast(18); }
        .liq-orb::before, .liq-orb::after { content: ''; position: absolute; inset: 0; border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #d946ef); animation: morph 3.2s ease-in-out infinite; }
        .liq-orb::after { background: linear-gradient(135deg, #22d3ee, #8b5cf6); animation-delay: -1.6s; mix-blend-mode: screen; }
        @keyframes morph {
          0%,100% { border-radius: 50% 50% 50% 50%; transform: translate(0,0) scale(1); }
          25% { border-radius: 60% 40% 55% 45%; transform: translate(14px,-8px) scale(1.08); }
          50% { border-radius: 40% 60% 45% 55%; transform: translate(-10px,10px) scale(.92); }
          75% { border-radius: 55% 45% 60% 40%; transform: translate(-14px,-6px) scale(1.05); } }
      `}</style>
      <div className="liq-orb" />
    </>
  );
}
