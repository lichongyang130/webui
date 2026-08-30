import { useEffect, useRef, useState } from "react";

/** 进入视口才运行(canvas/interval 类演示省性能) */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "120px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

export const rnd = (a: number, b: number) => a + Math.random() * (b - a);
export const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/** 生成 n 个随机定位样式的数组(仅首次渲染计算) */
export function sprinkle(n: number, gen: (i: number) => React.CSSProperties) {
  return Array.from({ length: n }, (_, i) => gen(i));
}
