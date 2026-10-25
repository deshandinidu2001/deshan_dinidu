"use client";
import { useEffect, useRef } from "react";

type Glyph = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  seed: number;
  char: string;
};

// Canvas fallback for the React Bits text-mask adaptation. It uses the same
// glyph grid and palette, with spring return instead of requiring WebGL.
export function AsciiNameFallback({
  active,
  paused,
  reduced,
  text,
}: {
  active: boolean;
  paused: boolean;
  reduced: boolean;
  text: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const settings = useRef({ active, paused, reduced });
  const wakeRef = useRef<() => void>(() => {});
  useEffect(() => {
    settings.current = { active, paused, reduced };
    wakeRef.current();
  }, [active, paused, reduced]);
  useEffect(() => {
    const canvas = ref.current!,
      ctx = canvas.getContext("2d");
    if (!ctx) return;
    const mask = document.createElement("canvas"),
      maskCtx = mask.getContext("2d", { willReadFrequently: true });
    if (!maskCtx) return;
    let width = 1,
      height = 1,
      step = 10,
      glyphs: Glyph[] = [],
      frame = 0,
      visible = false,
      disposed = false,
      last = 0,
      clock = 0,
      tick = 0;
    const pointer = { x: -1000, y: -1000, inside: false };
    const paint = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `400 ${step + 1}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const interactive =
        settings.current.active &&
        !settings.current.paused &&
        !settings.current.reduced;
      for (const g of glyphs) {
        if (interactive) {
          const dx = g.x - pointer.x,
            dy = g.y - pointer.y,
            distance = Math.hypot(dx, dy),
            radius = Math.min(110, width * 0.2),
            force = pointer.inside ? Math.max(0, 1 - distance / radius) : 0;
          g.vx += (dx / Math.max(1, distance)) * force * 2.8;
          g.vy += (dy / Math.max(1, distance)) * force * 2.8;
          g.vx = (g.vx + (g.homeX - g.x) * 0.025) * 0.84;
          g.vy = (g.vy + (g.homeY - g.y) * 0.025) * 0.84;
          g.x += g.vx;
          g.y += g.vy;
          g.opacity += ((force > 0.12 ? 0 : 1) - g.opacity) * 0.14;
        }
        const blend =
            (Math.sin(
              (g.homeX / width) * 2.8 + (g.homeY / height) * 1.8 - clock * 0.25,
            ) +
              1) /
            2,
          r = Math.round(152 + blend * 85),
          green = Math.round(195 + blend * 39),
          b = Math.round(36 + blend * 175);
        ctx.fillStyle = `rgba(${r},${green},${b},${(g.opacity * (0.65 + g.seed * 0.35)).toFixed(3)})`;
        ctx.fillText(g.char, g.x, g.y);
      }
      canvas.dataset.frame = String(++tick);
    };
    const animate = (now: number) => {
      frame = 0;
      const s = settings.current;
      if (disposed || !visible || document.hidden || !s.active) return;
      if (s.paused || s.reduced) {
        canvas.dataset.motion = "paused";
        return;
      }
      if (now - last >= 30) {
        clock += Math.min(0.05, (now - (last || now - 33)) / 1000);
        last = now;
        paint();
      }
      canvas.dataset.motion = "running";
      frame = requestAnimationFrame(animate);
    };
    const wake = () => {
      if (settings.current.reduced) {
        glyphs.forEach((g) => {
          g.x = g.homeX;
          g.y = g.homeY;
          g.opacity = 1;
          g.vx = g.vy = 0;
        });
        paint();
      }
      if (!frame && !disposed && visible && !document.hidden)
        frame = requestAnimationFrame(animate);
    };
    wakeRef.current = wake;
    const resize = () => {
      width = Math.max(1, canvas.clientWidth);
      height = Math.max(1, canvas.clientHeight);
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mask.width = Math.round(width);
      mask.height = Math.round(height);
      const lines = text.split("\n"),
        family =
          getComputedStyle(canvas).getPropertyValue("--font-space").trim() ||
          "Arial";
      let size = Math.min(height / (lines.length * 1.6), width * 0.21);
      maskCtx.font = `700 ${size}px ${family}`;
      size *= Math.min(
        1,
        (width * 0.86) /
          Math.max(1, ...lines.map((l) => maskCtx.measureText(l).width)),
      );
      maskCtx.font = `700 ${size}px ${family}`;
      maskCtx.textAlign = "center";
      maskCtx.textBaseline = "middle";
      maskCtx.fillStyle = "white";
      lines.forEach((line, i) =>
        maskCtx.fillText(
          line,
          width / 2,
          height / 2 + (i - (lines.length - 1) / 2) * size * 1.18,
        ),
      );
      const pixels = maskCtx.getImageData(0, 0, mask.width, mask.height).data;
      step = width < 600 ? 6 : 9;
      const chars = "+xX0S8#@";
      glyphs = [];
      for (let y = step / 2; y < height; y += step)
        for (let x = step / 2; x < width; x += step * 0.7) {
          if (
            pixels[(Math.floor(y) * mask.width + Math.floor(x)) * 4 + 3] < 100
          )
            continue;
          const seed = (Math.sin(x * 12.98 + y * 78.23) * 43758.54) % 1;
          glyphs.push({
            homeX: x,
            homeY: y,
            x,
            y,
            vx: 0,
            vy: 0,
            opacity: 1,
            seed: Math.abs(seed),
            char: chars[Math.floor(Math.abs(seed) * chars.length)],
          });
        }
      canvas.dataset.glyphs = String(glyphs.length);
      paint();
      wake();
    };
    const locate = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.inside =
        pointer.x >= 0 &&
        pointer.x <= width &&
        pointer.y >= 0 &&
        pointer.y <= height;
    };
    const move = (event: PointerEvent) => {
      if (
        !settings.current.active ||
        settings.current.paused ||
        settings.current.reduced
      )
        return;
      locate(event);
      wake();
    };
    const burst = (event: PointerEvent) => {
      if (
        !settings.current.active ||
        settings.current.paused ||
        settings.current.reduced
      )
        return;
      locate(event);
      if (
        !pointer.inside ||
        !settings.current.active ||
        settings.current.paused ||
        settings.current.reduced
      )
        return;
      glyphs.forEach((g) => {
        const dx = g.x - pointer.x,
          dy = g.y - pointer.y,
          d = Math.max(1, Math.hypot(dx, dy));
        g.vx += (dx / d) * (8 + g.seed * 12);
        g.vy += (dy / d) * (8 + g.seed * 12);
        g.opacity = 0.15;
      });
      wake();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
        canvas.dataset.motion = "offscreen";
      }
    });
    intersection.observe(canvas);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", burst, { passive: true });
    document.addEventListener("visibilitychange", wake);
    document.fonts.ready.then(() => {
      if (!disposed) resize();
    });
    resize();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      wakeRef.current = () => {};
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", burst);
      document.removeEventListener("visibilitychange", wake);
    };
  }, [text]);
  return (
    <canvas ref={ref} className="ascii-name-fallback" aria-hidden="true" />
  );
}
