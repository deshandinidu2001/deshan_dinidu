"use client";
import { useEffect, useId, useRef } from "react";
export function FerrofluidFallback({
  active = false,
  paused = false,
}: {
  active?: boolean;
  paused?: boolean;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current,
      section = svg?.closest(".ferro-break");
    if (
      !svg ||
      !section ||
      !active ||
      paused ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const peaks = Array.from(svg.querySelectorAll<SVGGElement>(".ferro-peak"));
    let frame = 0,
      last = 0,
      visible = false,
      time = 0,
      strength = 0,
      px = 0,
      py = 0;
    const pointer = { x: 0, y: 0, inside: false },
      pulse = { x: 0, y: 0, start: -10000 };
    const locate = (event: Event) => {
      const e = event as PointerEvent,
        r = svg.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 1200;
      pointer.y = ((e.clientY - r.top) / r.height) * 720;
      pointer.inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
    };
    const leave = () => {
      pointer.inside = false;
    };
    const click = (event: Event) => {
      if ((event.target as Element).closest("button,a")) return;
      locate(event);
      pulse.x = pointer.x;
      pulse.y = pointer.y;
      pulse.start = performance.now();
    };
    const draw = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (now - last >= 1000 / 30) {
        const dt = last ? Math.min((now - last) / 1000, 0.08) : 1 / 30;
        last = now;
        time += dt;
        strength += (Number(pointer.inside) - strength) * 0.1;
        px += (pointer.x - px) * 0.1;
        py += (pointer.y - py) * 0.1;
        peaks.forEach((peak, i) => {
          const row = Math.floor(i / 11),
            col = i % 11,
            x = 235 + col * 91 + (row % 2) * 42,
            y = 150 + row * 69,
            distance = Math.hypot(x - px, y - py),
            age = (now - pulse.start) / 1000,
            radius = Math.hypot(x - pulse.x, y - pulse.y);
          const wave =
            0.75 +
            0.22 * Math.sin(col * 0.65 - row * 0.75 + time * 1.1) +
            0.16 * Math.cos(col * 0.4 + row * 0.9 - time * 0.65);
          const magnet =
            strength * Math.exp((-distance * distance) / 22000) * 1.1;
          const ripple =
            age < 2
              ? Math.sin(radius * 0.025 - age * 6) *
                Math.exp(-Math.pow(radius - age * 330, 2) / 18000) *
                Math.exp(-age) *
                0.45
              : 0;
          const height = Math.max(0.25, wave + magnet + ripple);
          peak.setAttribute(
            "transform",
            `translate(0 ${17 * (1 - height)}) scale(1 ${height.toFixed(4)})`,
          );
        });
        svg.dataset.motion = "running";
      }
      frame = requestAnimationFrame(draw);
    };
    const wake = () => {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        last = 0;
        wake();
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        svg.dataset.motion = "offscreen";
      }
    });
    observer.observe(svg);
    section.addEventListener("pointermove", locate);
    section.addEventListener("pointerleave", leave);
    section.addEventListener("pointerdown", click);
    document.addEventListener("visibilitychange", wake);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      section.removeEventListener("pointermove", locate);
      section.removeEventListener("pointerleave", leave);
      section.removeEventListener("pointerdown", click);
      document.removeEventListener("visibilitychange", wake);
      svg.dataset.motion = "paused";
    };
  }, [active, paused]);
  return (
    <svg
      ref={ref}
      className="ferro-fallback"
      viewBox="0 0 1200 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2=".25">
          <stop stopColor="#07100a" />
          <stop offset=".28" stopColor="#364334" />
          <stop offset=".44" stopColor="#9daa8e" />
          <stop offset=".51" stopColor="#141c13" />
          <stop offset=".85" stopColor="#030805" />
        </linearGradient>
        <radialGradient id={`${id}-floor`}>
          <stop stopColor="#263020" />
          <stop offset="1" stopColor="#0b0f0d" />
        </radialGradient>
      </defs>
      <rect width="1200" height="720" fill="#0b0f0d" />
      <ellipse cx="760" cy="470" rx="620" ry="320" fill={`url(#${id}-floor)`} />
      {Array.from({ length: 88 }, (_, i) => {
        const row = Math.floor(i / 11),
          col = i % 11,
          scale = 0.5 + row * 0.075,
          x = 235 + col * 91 + (row % 2) * 42,
          y = 150 + row * 69;
        return (
          <g
            key={i}
            transform={`translate(${x} ${y}) scale(${scale})`}
            opacity={0.45 + row * 0.065}
          >
            <ellipse cy="17" rx="45" ry="15" fill="#050a07" />
            <g className="ferro-peak">
              <path
                d="M-42 16C-20 8-11-11 0-66 8-19 20 8 42 16 25 36-25 36-42 16Z"
                fill={`url(#${id}-metal)`}
                stroke="#778c5b"
                strokeWidth=".45"
              />
              <path
                d="M-25 15C-10 6-7-9 0-48"
                fill="none"
                stroke="#c6ff3d"
                strokeWidth=".7"
                opacity=".4"
              />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
