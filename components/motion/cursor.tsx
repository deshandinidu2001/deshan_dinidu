"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { siteCopy } from "@/data/site";
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer:fine)").matches) return;
    const el = ref.current!;
    let x = -100,
      y = -100,
      cx = -100,
      cy = -100,
      frame = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
      const target =
        e.target instanceof Element
          ? e.target.closest("[data-cursor],a,button")
          : null;
      const mode =
        target?.getAttribute("data-cursor") || (target ? "link" : "default");
      el.dataset.mode = mode;
      el.textContent =
        mode === "view"
          ? siteCopy.ui.cursorView
          : mode === "drag"
            ? siteCopy.ui.cursorDrag
            : mode === "link"
              ? siteCopy.ui.cursorLink
              : "";
    };
    const leave = () => {
      el.style.opacity = "0";
    };
    const tick = () => {
      cx += (x - cx) * 0.24;
      cy += (y - cy) * 0.24;
      el.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [reduced]);
  return <div ref={ref} className="custom-cursor" aria-hidden="true" />;
}
