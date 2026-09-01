"use client";
// Renders a pill button whose border is a rotating conic gradient.
// Requires this global CSS once: @property --btn-a { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
export default function GradientBorderButton({ children = "Get started" }: { children?: React.ReactNode }) {
  return (
    <>
      <style>{`
        @property --btn-a { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        @keyframes spinA { to { --btn-a: 360deg; } }
        .gb-btn { position: relative; z-index: 0; border-radius: 14px; background: rgba(13,13,30,.92); }
        .gb-btn::before { content:''; position:absolute; inset:-2px; z-index:-1; border-radius:16px;
          background: conic-gradient(from var(--btn-a,0deg), #8b5cf6, #d946ef, #22d3ee, #8b5cf6);
          animation: spinA 3s linear infinite; }
        .gb-btn::after { content:''; position:absolute; inset:0; z-index:-1; border-radius:14px; background: rgba(13,13,30,.95); }
      `}</style>
      <button className="gb-btn px-9 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
        {children} <i className="not-italic">→</i>
      </button>
    </>
  );
}
