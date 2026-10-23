"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useScrollMotion } from "@/hooks/use-scroll-motion";
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useScrollMotion();
  useGSAP(
    () => {
      if (reduced) return;
      const headings =
        ref.current!.querySelectorAll<HTMLElement>("[data-reveal]");
      const splits: SplitType[] = [];
      headings.forEach((el) => {
        const split = new SplitType(el, {
          types: "lines",
          lineClass: "split-line",
        });
        splits.push(split);
        split.lines?.forEach((line) => {
          const wrap = document.createElement("span");
          wrap.className = "line-mask";
          line.parentNode?.insertBefore(wrap, line);
          wrap.appendChild(line);
        });
        gsap.from(split.lines, {
          yPercent: 105,
          rotation: 2,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
      return () => {
        splits.forEach((s) => s.revert());
      };
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
