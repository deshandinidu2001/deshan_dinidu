"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SignalMark } from "@/components/ui/icons";
import { siteCopy } from "@/data/site";
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      sessionStorage.getItem("signal-intro") ||
      performance.now() > 850
    ) {
      el.style.display = "none";
      return;
    }
    el.style.display = "flex";
    const state = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("signal-intro", "1");
        el.style.display = "none";
      },
    });
    tl.to(state, {
      value: 100,
      duration: 0.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current)
          count.current.textContent = String(Math.round(state.value)).padStart(
            3,
            "0",
          );
      },
    })
      .fromTo(
        el.querySelector(".preloader-line"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
        0,
      )
      .to(
        el,
        { clipPath: "inset(0 0 100% 0)", duration: 0.4, ease: "power3.inOut" },
        0.65,
      );
    return () => {
      tl.kill();
    };
  }, []);
  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <SignalMark />
      <p>{siteCopy.ui.loading}</p>
      <div className="preloader-count">
        <span ref={count}>000</span>
        <span>/ 100</span>
      </div>
      <div className="preloader-line" />
    </div>
  );
}
