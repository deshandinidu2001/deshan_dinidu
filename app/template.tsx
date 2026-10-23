"use client";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { clipPath: "inset(0 0 5% 0)", opacity: 0.6 }}
      animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
