"use client";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
const paths = {
  idea: [
    "M91 22C58 17 36 42 40 69c2 21 21 32 26 51l44-5c2-21 21-34 24-57 0-23-18-37-43-36Z",
    "M68 127l44-5M70 138l41-5M75 149l31-4",
    "M82 119 76 80l15 15 10-19 4 40",
    "M87 5l-1 10M35 23l10 10M17 62l15 2M143 17l-9 12M155 56l-13 4",
    "M46 165l79-9M46 159l1 12M124 150l2 13",
  ],
  plane: [
    "M23 77 159 28 101 145 82 99 23 77Z",
    "M82 99 159 28 96 87l5 58M23 77l73 10",
    "M91 151c-30-31-72-8-62 11 10 17 49 8 43-11-6-20-45-23-58-2",
  ],
  system: [
    "M29 39 146 32l7 94-117 8-7-95Z",
    "M31 57l118-8M42 46l2 1M51 45l2 1M60 44l2 1",
    "M69 75 54 90l18 13M111 73l17 13-14 17M98 69l-9 39",
    "M52 153l31-2 2-14M103 137l3 12 32-1M50 147l1 13M138 142l1 12",
  ],
};
export function DrawnSketch({
  kind,
  className = "",
  showTrail = true,
}: {
  kind: keyof typeof paths;
  className?: string;
  showTrail?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <svg
      className={`drawn-sketch ${className}`}
      viewBox="0 0 180 180"
      fill="none"
      aria-hidden="true"
    >
      {paths[kind]
        .filter((_, i) => kind !== "plane" || showTrail || i < 2)
        .map((d, i) =>
          reduced ? (
            <path key={i} d={d} />
          ) : (
            <motion.path
              key={i}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1.1,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ),
        )}
    </svg>
  );
}
