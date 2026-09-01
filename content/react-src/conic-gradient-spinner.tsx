// Single-element conic-gradient ring spinner.
export default function ConicSpinner() {
  return (
    <div
      className="h-[76px] w-[76px] animate-spin rounded-full [animation-duration:.9s] [filter:drop-shadow(0_0_10px_rgba(139,92,246,.6))]"
      style={{
        background: "conic-gradient(from 0deg, transparent 0%, #8b5cf6 55%, #d946ef 80%, #22d3ee 100%)",
        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 7px))",
        mask: "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 7px))",
      }}
    />
  );
}
