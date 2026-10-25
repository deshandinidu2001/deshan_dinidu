"use client";
import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { setIntroPhase, useIntroPhase } from "@/components/motion/use-intro";
import { NAME_PIXEL_ROWS } from "./PixelName";
function mixed<T>(items: T[]) {
  const result = items.slice();
  let seed = 7183;
  for (let i = result.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function useHeroEntrance(ref: RefObject<HTMLElement | null>) {
  const phase = useIntroPhase();
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || phase !== "hero") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroPhase("done");
      return;
    }
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setIntroPhase("done"),
      });
      tl.from(".hero-eyebrow", { opacity: 0, y: 8, duration: 0.4 }, 0);
      el.querySelectorAll<SVGClipPathElement>("[data-pixel-mask]").forEach(
        (mask, i) => {
          const pixels = mixed(Array.from(mask.querySelectorAll("rect")));
          gsap.set(pixels, { attr: { height: 0 } });
          tl.set(
            pixels,
            { attr: { height: 1 / NAME_PIXEL_ROWS + 0.002 }, stagger: 0.0035 },
            0.22 + i * 0.35,
          );
        },
      );
      tl.from(
        ".hero-background-anchor",
        { opacity: 0, y: 18, scale: 0.98, duration: 0.8 },
        0.45,
      )
        .from(".hero-degree", { opacity: 0, y: 8, duration: 0.4 }, 0.95)
        .from(
          ".hero-skills li",
          { opacity: 0, y: 7, duration: 0.35, stagger: 0.06 },
          1.1,
        )
        .from(".hero-process", { opacity: 0, y: 7, duration: 0.35 }, 1.25)
        .from(
          ".hero-card-shell",
          { opacity: 0, y: 14, scale: 0.96, duration: 0.55, stagger: 0.1 },
          1.05,
        )
        .from(
          ".hero-actions a",
          { opacity: 0, y: 10, scale: 0.96, duration: 0.4, stagger: 0.08 },
          1.4,
        )
        .from(".hero-handwritten", { opacity: 0, y: 8, duration: 0.5 }, 1.65);
      const arrow = el.querySelector<SVGPathElement>(".hero-note-arrow path");
      if (arrow) {
        const length = arrow.getTotalLength();
        tl.fromTo(
          arrow,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.55 },
          1.65,
        );
      }
    }, el);
    return () => context.revert();
  }, [phase, ref]);
}
