"use client";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "./use-reduced-motion";
let hasIntent = false;
const subscribe = (callback: () => void) => {
  const activate = () => {
    hasIntent = true;
    callback();
  };
  window.addEventListener("pointerdown", activate, {
    passive: true,
    once: true,
  });
  window.addEventListener("scroll", activate, { passive: true, once: true });
  return () => {
    window.removeEventListener("pointerdown", activate);
    window.removeEventListener("scroll", activate);
  };
};
// Small screens keep their server-rendered content still until the first interaction.
export function useScrollMotion() {
  const ready = useSyncExternalStore(
    subscribe,
    () => window.innerWidth >= 768 || hasIntent,
    () => false,
  );
  return useReducedMotion() || !ready;
}
