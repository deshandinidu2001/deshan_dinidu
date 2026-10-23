"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { siteCopy } from "@/data/site";
type Particle = { x: number; y: number; vx: number; vy: number };
export function ParticlePlayground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState(0);
  const [radius, setRadius] = useState(125);
  const [seed, setSeed] = useState(0);
  const reduced = useReducedMotion();
  const pointer = useRef({ x: -1000, y: -1000 });
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0,
      width = 0,
      height = 0,
      particles: Particle[] = [],
      last = 0,
      visible = true;
    let randomSeed = seed + 42;
    const random = () => {
      randomSeed = (randomSeed * 16807) % 2147483647;
      return (randomSeed - 1) / 2147483646;
    };
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      width = r.width;
      height = r.height;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: width < 600 ? 55 : 100 }, () => ({
        x: random() * width,
        y: random() * height,
        vx: (random() - 0.5) * 0.5,
        vy: (random() - 0.5) * 0.5,
      }));
      draw(0);
    };
    const draw = (dt: number) => {
      ctx.fillStyle = "#0b0d10";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = "#87949f0c";
      ctx.lineWidth = 1;
      for (let x = 20; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 20; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      particles.forEach((p, i) => {
        if (dt && !paused && !reduced) {
          const dx = pointer.current.x - p.x,
            dy = pointer.current.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180 && dist > 1) {
            p.x += (dx / dist) * (mode === 0 ? 0.35 : -0.7) * dt;
            p.y += (dy / dist) * (mode === 0 ? 0.35 : -0.7) * dt;
          }
          p.x = (p.x + p.vx * dt + width) % width;
          p.y = (p.y + p.vy * dt + height) % height;
        }
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dist = Math.hypot(p.x - b.x, p.y - b.y);
          if (dist < radius) {
            ctx.strokeStyle = `rgba(139,164,126,${(1 - dist / radius) * 0.4})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = i % 7 === 0 ? "#c8ff3d" : "#87949f";
        ctx.fillRect(p.x, p.y, i % 7 === 0 ? 3 : 2, i % 7 === 0 ? 3 : 2);
        const distance = Math.hypot(
          pointer.current.x - p.x,
          pointer.current.y - p.y,
        );
        if (distance < 150) {
          ctx.strokeStyle = `rgba(200,255,61,${(1 - distance / 150) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(pointer.current.x, pointer.current.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      });
      const { x, y } = pointer.current;
      ctx.strokeStyle = "#c8ff3d";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - 8, y);
      ctx.lineTo(x + 8, y);
      ctx.moveTo(x, y - 8);
      ctx.lineTo(x, y + 8);
      ctx.stroke();
    };
    const loop = (time: number) => {
      if (visible) {
        draw(Math.min((time - last) / 16.67, 2));
      }
      last = time;
      frame = requestAnimationFrame(loop);
    };
    const visibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", visibility);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [paused, mode, radius, seed, reduced]);
  return (
    <>
      <div className="playground-frame">
        <canvas
          ref={ref}
          className="particle-canvas"
          aria-label="Interactive particle field. Use arrow keys to move the signal and Space to pause."
          tabIndex={0}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top };
          }}
          onPointerLeave={() => {
            pointer.current = { x: -1000, y: -1000 };
          }}
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
              setPaused((p) => !p);
            }
            if (e.key.startsWith("Arrow")) {
              e.preventDefault();
              const r = e.currentTarget.getBoundingClientRect();
              const p = pointer.current;
              if (p.x < 0 || p.y < 0) {
                p.x = r.width / 2;
                p.y = r.height / 2;
              }
              if (e.key === "ArrowRight") p.x = Math.min(r.width, p.x + 20);
              if (e.key === "ArrowLeft") p.x = Math.max(0, p.x - 20);
              if (e.key === "ArrowDown") p.y = Math.min(r.height, p.y + 20);
              if (e.key === "ArrowUp") p.y = Math.max(0, p.y - 20);
            }
          }}
        />
        <div className="playground-overlay mono">
          <span>
            <i className="signal-dot" />
            {siteCopy.experiments.fieldLabel}
          </span>
          <span>
            {reduced
              ? siteCopy.experiments.reduced
              : paused
                ? siteCopy.experiments.paused
                : siteCopy.experiments.pointer}
          </span>
        </div>
      </div>
      <div className="playground-controls">
        <div className="mode-controls">
          {siteCopy.experiments.modes.map((label, i) => (
            <button
              key={label}
              onClick={() => setMode(i)}
              className={mode === i ? "active" : ""}
              aria-pressed={mode === i}
            >
              {label}
            </button>
          ))}
        </div>
        <button onClick={() => setPaused(!paused)} aria-pressed={paused}>
          {paused ? <Play size={12} /> : <Pause size={12} />}
          {paused ? siteCopy.experiments.resume : siteCopy.experiments.pause}
        </button>
        <button onClick={() => setSeed((s) => s + 1)}>
          <RotateCcw size={12} />
          {siteCopy.experiments.reset}
        </button>
        <label className="range-control">
          {siteCopy.experiments.force}
          <input
            type="range"
            min="60"
            max="200"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
          <output>{radius}</output>
        </label>
      </div>
      <p className="playground-keyboard mono">
        {siteCopy.experiments.keyboard}
      </p>
    </>
  );
}
