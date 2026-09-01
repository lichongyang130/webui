"use client";

import { useEffect, useRef } from "react";
import { useFx, ACCENTS } from "./fx-core";

/** WebGL aurora curtain (fbm noise shader) — idea #19 / #1. */
function Aurora() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { settings, fxEnabled } = useFx();

  useEffect(() => {
    if (!fxEnabled) return;
    const canvas = ref.current;
    if (!canvas) return;
    const gl = (canvas.getContext("webgl", { alpha: true, antialias: false }) ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const vert = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
    const frag = `
      precision mediump float;
      uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse;
      uniform vec3 u_c1; uniform vec3 u_c2; uniform vec3 u_c3;
      vec3 hash3(vec2 p){ vec3 q = vec3(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)),dot(p,vec2(419.2,371.9))); return fract(sin(q)*43758.5453)*2.-1.; }
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
        return mix(mix(dot(hash3(i+vec2(0.,0.)),f-vec2(0.,0.)), dot(hash3(i+vec2(1.,0.)),f-vec2(1.,0.)),u.x),
                   mix(dot(hash3(i+vec2(0.,1.)),f-vec2(0.,1.)), dot(hash3(i+vec2(1.,1.)),f-vec2(1.,1.)),u.x), u.y);
      }
      float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.03; a*=.5; } return v; }
      void main(){
        vec2 uv = (gl_FragCoord.xy - .5*u_res)/u_res.y;
        float t = u_time*.045;
        vec2 m = (u_mouse - .5*u_res)/u_res.y;
        vec2 q = vec2(fbm(uv*1.5 + vec2(t,-t*.7) + m*.35), fbm(uv*1.5 + vec2(-t*.6,t*.8) - m*.25));
        vec2 r = vec2(fbm(uv*1.5 + q*1.8 + vec2(1.7,9.2) + t*.5), fbm(uv*1.5 + q*1.8 + vec2(8.3,2.8) - t*.4));
        float f = fbm(uv*1.5 + r*1.6);
        vec3 col = mix(u_c1, u_c2, clamp(f*f*2.4,0.,1.));
        col = mix(col, u_c3, clamp(q.x*q.y*1.7,0.,1.)*.7);
        col *= .10 + .55*f*f;
        float vig = smoothstep(1.35, .35, length(uv));
        col *= vig;
        gl_FragColor = vec4(col, .85);
      }`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = {
      time: gl.getUniformLocation(prog, "u_time"),
      res: gl.getUniformLocation(prog, "u_res"),
      mouse: gl.getUniformLocation(prog, "u_mouse"),
      c1: gl.getUniformLocation(prog, "u_c1"),
      c2: gl.getUniformLocation(prog, "u_c2"),
      c3: gl.getUniformLocation(prog, "u_c3"),
    };

    const acc = ACCENTS.find((a) => a.id === settings.accent) ?? ACCENTS[0];
    const rgb = (s: string) => {
      const [r, g, b] = s.split(",").map(Number);
      return [r / 255, g / 255, b / 255];
    };
    gl.uniform3fv(u.c1, rgb(acc.c1));
    gl.uniform3fv(u.c2, rgb(acc.c2));
    gl.uniform3fv(u.c3, rgb(acc.c3));

    let w = 0,
      h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX * (window.devicePixelRatio || 1);
      mouse.ty = (window.innerHeight - e.clientY) * (window.devicePixelRatio || 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const t0 = performance.now();
    const loop = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform1f(u.time, (performance.now() - t0) / 1000);
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform2f(u.mouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [fxEnabled, settings.accent]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

/** Drifting twinkling stars + occasional shooting star — ideas #34 / #70. */
function Stars() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { fxEnabled } = useFx();
  useEffect(() => {
    if (!fxEnabled) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let stars: { x: number; y: number; z: number; tw: number }[] = [];
    let shoots: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: Math.min(160, window.innerWidth / 8) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.85,
        z: 0.3 + Math.random() * 0.7,
        tw: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.tw += 0.02 * s.z;
        s.y += s.z * 0.05;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
        const a = 0.25 + 0.55 * Math.abs(Math.sin(s.tw)) * s.z;
        ctx.fillStyle = `rgba(220,225,255,${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.z * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
      if (Math.random() < 0.004 && shoots.length < 2) {
        const x = Math.random() * canvas.width * 0.7;
        shoots.push({ x, y: Math.random() * canvas.height * 0.3, vx: 7 + Math.random() * 5, vy: 3 + Math.random() * 2, life: 1 });
      }
      shoots = shoots.filter((s) => s.life > 0);
      for (const s of shoots) {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.012;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 9, s.y - s.vy * 9);
        grad.addColorStop(0, `rgba(190,220,255,${0.9 * s.life})`);
        grad.addColorStop(1, "rgba(190,220,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 9, s.y - s.vy * 9);
        ctx.stroke();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [fxEnabled]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

export default function Background() {
  const { settings, fxEnabled } = useFx();
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fxEnabled || !settings.spotlight) return;
    const el = spotRef.current;
    if (!el) return;
    let x = window.innerWidth / 2,
      y = 120,
      tx = x,
      ty = y,
      raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [fxEnabled, settings.spotlight]);

  const bg = settings.bg;
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* base */}
      <div className="absolute inset-0 bg-[#070711]" />
      {bg === "aurora" && <Aurora />}
      {bg === "stars" && <Stars />}
      {bg === "grid" && <div className="absolute inset-0 bg-grid opacity-70" />}
      {bg === "dots" && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(var(--c1),0.25) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      )}
      {/* ambient glow blobs always */}
      <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-violet-600/15 blur-[140px]" />
      <div className="absolute -right-32 top-1/3 h-[440px] w-[440px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
      {/* mouse spotlight — idea #16/#109 */}
      {settings.spotlight && (
        <div
          ref={spotRef}
          className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, rgba(var(--c3),0.9), transparent 65%)" }}
        />
      )}
    </div>
  );
}
