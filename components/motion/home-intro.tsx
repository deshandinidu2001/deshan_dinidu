"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "@/data/profile";
import { setIntroPhase } from "./use-intro";
export function HomeIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    const root = document.documentElement;
    if (root.dataset.intro !== "loading") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroPhase("done");
      return;
    }
    let cancelled = false,
      tween: gsap.core.Tween | undefined;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (duration: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, duration));
      });
    const blocked = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".site-header,#main,#contact,.page-progress,.skip-link",
      ),
    ).map((el) => ({ el, inert: el.inert }));
    blocked.forEach(({ el }) => {
      el.inert = true;
    });
    const release = () =>
      blocked.forEach(({ el, inert }) => {
        el.inert = inert;
      });
    const scene = document.querySelector<HTMLElement>(".hero-workbench-scene");
    let observer: MutationObserver | undefined;
    const imagesReady = new Promise<void>((resolve) => {
      if (!scene || scene.dataset.ready === "true") {
        resolve();
        return;
      }
      observer = new MutationObserver(() => {
        if (scene.dataset.ready === "true") {
          observer?.disconnect();
          resolve();
        }
      });
      observer.observe(scene, {
        attributes: true,
        attributeFilter: ["data-ready"],
      });
    });
    const start = performance.now();
    void (async () => {
      await Promise.all([
        Promise.race([imagesReady, wait(1800)]),
        Promise.race([document.fonts.ready, wait(1200)]),
      ]);
      await wait(Math.max(0, 850 - (performance.now() - start)));
      if (cancelled) return;
      observer?.disconnect();
      tween = gsap.to(ref.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => {
          release();
          setIntroPhase("hero");
        },
      });
    })();
    return () => {
      mounted.current = false;
      cancelled = true;
      timers.forEach(clearTimeout);
      observer?.disconnect();
      tween?.kill();
      release();
      requestAnimationFrame(() => {
        if (!mounted.current && root.dataset.intro === "loading")
          setIntroPhase("done");
      });
    };
  }, []);
  return (
    <div
      ref={ref}
      className="site-intro"
      role="status"
      aria-label="Loading Deshan Dinidu’s portfolio"
    >
      <Image src="/images/Profile.jpg" alt="" width={96} height={96} priority />
      <p>{profile.name}</p>
      <span className="mono">Computer Engineer</span>
      <div className="intro-pixels" aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => (
          <i key={i} style={{ animationDelay: `${i * 0.07}s` }} />
        ))}
      </div>
    </div>
  );
}
