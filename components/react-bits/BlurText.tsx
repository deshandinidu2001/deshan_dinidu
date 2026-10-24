"use client";
// Adapted from React Bits BlurText by David Haz. See LICENSE.react-bits.md.
// Retains the word blur/translate reveal with semantic inline output and
// an explicit final state for reduced motion. Source is pinned in README.md.
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
export default function BlurText({
  text,
  className = "",
  delay = 65,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;
  const words = text.split(/\s+/);
  return (
    <span className={`bits-blur-text ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          style={{ display: "inline-block" }}
          initial={{ filter: "blur(8px)", opacity: 0, y: 18 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{
            duration: 0.65,
            delay: (i * delay) / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </span>
  );
}
