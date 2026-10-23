"use client";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MotionConfig } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
gsap.registerPlugin(ScrollTrigger, useGSAP);
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      anchors: { offset: -100 },
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduced]);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
