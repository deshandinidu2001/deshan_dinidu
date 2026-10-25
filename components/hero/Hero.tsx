"use client";
import "./hero.css";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { JetBrains_Mono } from "next/font/google";
import { HeroScene } from "./HeroScene";
import { HeroLightProvider, useHeroLight } from "./useHeroLight";
import { HeroText, HeroNote } from "./HeroText";
import { CodeCard } from "./cards/CodeCard";
import { FileTreeCard } from "./cards/FileTreeCard";
import { AiCard } from "./cards/AiCard";
import { useHeroEntrance } from "./useHeroEntrance";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-hero-mono",
});
function readTheme(): "dark" | "light" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}
function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  window.addEventListener("theme-change", callback);
  return () => {
    observer.disconnect();
    window.removeEventListener("theme-change", callback);
  };
}

function HeroContent() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => null);
  const { inView, setInView } = useHeroLight();
  const ref = useRef<HTMLElement>(null);
  useHeroEntrance(ref);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [setInView]);
  return (
    <section
      ref={ref}
      id="hero"
      className={`hero hero-workbench ${mono.variable}`}
      data-hero-visible={inView}
    >
      <div className="hero-stage">
        <HeroText />
        <div className="hero-scene">
          <div className="hero-background-anchor">
            <HeroScene theme={theme} />
          </div>
          <HeroNote />
          <div className="hero-cards-anchor">
            <CodeCard />
            <FileTreeCard />
            <AiCard />
          </div>
        </div>
      </div>
    </section>
  );
}
export function Hero() {
  return (
    <HeroLightProvider>
      <HeroContent />
    </HeroLightProvider>
  );
}
