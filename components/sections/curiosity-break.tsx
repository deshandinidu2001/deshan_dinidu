"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import BlurText from "@/components/react-bits/BlurText";
import { AsciiNameFallback } from "@/components/ui/ascii-name-fallback";

const GradientASCII = dynamic(
  () => import("@/components/react-bits/GradientASCII"),
  { ssr: false },
);
const name = "DESHAN\nDINIDU";

export function CuriosityBreak() {
  const ref = useRef<HTMLElement>(null),
    [near, setNear] = useState(false),
    [paused, setPaused] = useState(false);
  const [status, setStatus] = useState<"idle" | "ready" | "unavailable">(
    "idle",
  );
  const reduced = useReducedMotion();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" },
    );
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      id="curiosity"
      className="curiosity-break"
      aria-label="A little room for curiosity"
    >
      <div
        className="curiosity-art"
        data-renderer={status}
        role="img"
        aria-label="DESHAN DINIDU in gradient ASCII lettering"
      >
        <AsciiNameFallback
          text={name}
          active={near && status !== "ready"}
          paused={paused}
          reduced={reduced}
        />
        {near && status !== "unavailable" && (
          <GradientASCII
            key={reduced ? "still" : "moving"}
            onStatusChange={setStatus}
            text={name}
            colors={["#79a629", "#c6ff3d", "#edeae0"]}
            cellSize={12}
            density={1}
            glyphOpacity={1}
            gradientOpacity={0}
            glow={0}
            grain={0}
            depthOfField={0}
            flicker={0.08}
            speed={0.35}
            flow={0.2}
            intro={false}
            paused={paused || reduced}
            mouseInteraction={!paused && !reduced}
            scrambleRadius={0.16}
            clickEffect="burst"
            dpr={1}
          />
        )}
      </div>
      <div className="curiosity-caption">
        <span className="mono">A little room for curiosity</span>
        <h2>
          <BlurText text="Keep exploring." />
        </h2>
        <p className="script">Good ideas rarely arrive in a straight line.</p>
        <a href="#contact">
          Let’s make the next one <ArrowDownRight size={19} />
        </a>
      </div>
      <div className="curiosity-controls">
        <span className="mono">
          {reduced
            ? "Every character finds its place."
            : "Move over the letters. Watch them find their way back."}
        </span>
        {!reduced && near && (
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={
              paused ? "Resume ASCII animation" : "Pause ASCII animation"
            }
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        )}
      </div>
    </section>
  );
}
