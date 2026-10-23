"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { NetworkFallback } from "./network-fallback";
const Scene = dynamic(() => import("./signal-scene"), { ssr: false });
class SceneBoundary extends Component<
  { children: ReactNode; lab: boolean },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <NetworkFallback lab={this.props.lab} />
    ) : (
      this.props.children
    );
  }
}
export function SceneStage({
  progress,
  lab = false,
}: {
  progress: React.RefObject<number>;
  lab?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const [mobile, setMobile] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current!;
    const isMobile = window.innerWidth < 768;
    let allowed = !isMobile;
    let visible = false;
    const unlock = () => {
      allowed = true;
      if (visible) setReady(true);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("scroll", unlock);
    };
    if (isMobile) {
      window.addEventListener("pointerdown", unlock, { passive: true });
      window.addEventListener("scroll", unlock, { passive: true });
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) {
          if (allowed) setReady(true);
          setMobile(isMobile);
        }
      },
      { rootMargin: "150px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("scroll", unlock);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`scene-stage ${lab ? "scene-lab" : "scene-hero"}`}
      aria-hidden="true"
    >
      <NetworkFallback lab={lab} />
      {ready && !reduced && (
        <SceneBoundary lab={lab}>
          <Scene
            progress={progress}
            lab={lab}
            mobile={mobile}
            active={active}
          />
        </SceneBoundary>
      )}
    </div>
  );
}
