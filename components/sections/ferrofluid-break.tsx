"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import BlurText from "@/components/react-bits/BlurText";
const Ferrofluid = dynamic(() => import("@/components/react-bits/Ferrofluid"), {
  ssr: false,
});
export function FerrofluidBreak() {
  const ref = useRef<HTMLElement>(null),
    [near, setNear] = useState(false),
    [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      id="curiosity"
      className="ferro-break"
      aria-label="An interactive pause before we connect"
    >
      <div className="ferro-art" aria-hidden="true">
        {near && (
          <Ferrofluid
            key={reduced ? "still" : "moving"}
            colors={["#c6ff3d", "#e5ebd4", "#658736"]}
            color="#0b0f0d"
            lightMode={false}
            transparent={false}
            speed={0.32}
            scale={1.5}
            spikeHeight={0.8}
            turbulence={0.6}
            brightness={0.8}
            dpr={0.8}
            intro={false}
            paused={paused || reduced}
            mouseInteraction={!reduced && !paused}
            clickPulse={!reduced && !paused}
          />
        )}
      </div>
      <div className="ferro-caption">
        <span className="mono">A little room for curiosity</span>
        <h2>
          <BlurText text="Keep exploring." />
        </h2>
        <p className="script">Good ideas rarely arrive in a straight line.</p>
        <a href="#contact">
          Let’s make the next one <ArrowDownRight size={19} />
        </a>
      </div>
      <div className="ferro-controls">
        <span className="mono">
          {reduced
            ? "A still moment."
            : "Move across the surface. Click to make a ripple."}
        </span>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={
              paused ? "Resume fluid animation" : "Pause fluid animation"
            }
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        )}
      </div>
    </section>
  );
}
