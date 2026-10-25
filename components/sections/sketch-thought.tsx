"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { DrawnSketch } from "@/components/ui/drawn-sketch";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
export function SketchThought() {
  const ref = useRef<HTMLElement>(null),
    reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start .9", "end .4"],
  });
  const draw = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]),
    y = useTransform(scrollYProgress, [0, 1], [22, -18]);
  return (
    <section
      ref={ref}
      className="sketch-thought section-shell"
      aria-label="A thought behind the work"
    >
      <motion.div
        className="sketch-thought-copy"
        style={reduced ? undefined : { y }}
      >
        <p className="script thought-margin">A reminder to myself.</p>
        <h2>
          Good systems begin
          <br />
          with{" "}
          <span className="thought-emphasis">
            good questions.
            <svg
              viewBox="0 0 600 150"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              {reduced ? (
                <path d="M72 27C221 0 504 3 563 52C627 112 379 151 133 127C-11 114-5 46 73 27" />
              ) : (
                <motion.path
                  d="M72 27C221 0 504 3 563 52C627 112 379 151 133 127C-11 114-5 46 73 27"
                  style={{ pathLength: draw }}
                />
              )}
            </svg>
          </span>
        </h2>
        <p className="thought-caption">
          Understand first. Build with intent. Keep learning.
        </p>
      </motion.div>
      <DrawnSketch kind="idea" className="thought-sketch thought-sketch-left" />
      <DrawnSketch
        kind="plane"
        className="thought-sketch thought-sketch-right"
      />
    </section>
  );
}
