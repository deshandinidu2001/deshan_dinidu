"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
export function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onPointerMove={(e) => {
        if (
          e.pointerType !== "mouse" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const r = e.currentTarget.getBoundingClientRect();
        gsap.to(ref.current, {
          x: (e.clientX - r.left - r.width / 2) * 0.13,
          y: (e.clientY - r.top - r.height / 2) * 0.18,
          duration: 0.35,
        });
      }}
      onPointerLeave={() => {
        gsap.to(ref.current, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1,.5)",
        });
      }}
    >
      {children}
    </span>
  );
}
