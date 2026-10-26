"use client";
import { motion } from "motion/react";
import { LockKeyhole } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ProjectLock({
  name,
  compact = false,
}: {
  name: string;
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`project-lock${compact ? " project-lock-compact" : ""}`}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.35 }}
    >
      <motion.div
        className="project-lock-mark"
        aria-hidden="true"
        initial={false}
        animate={
          reduced ? {} : { rotate: [0, -8, 6, -3, 0], scale: [0.9, 1.03, 1] }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <LockKeyhole size={compact ? 25 : 42} strokeWidth={1.4} />
      </motion.div>
      <div>
        <p className="mono project-lock-status">Case study coming soon</p>
        <p className="project-lock-message">
          The story behind {name} is still being put together.
        </p>
        <p className="project-lock-description">
          The project details will be added here when the write-up is ready.
        </p>
        {!compact && (
          <p className="script">Good work deserves a proper story.</p>
        )}
      </div>
    </motion.div>
  );
}
