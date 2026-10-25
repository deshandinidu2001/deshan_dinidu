"use client";
import { useSyncExternalStore } from "react";
export type IntroPhase = "loading" | "hero" | "done";
function readPhase(): IntroPhase {
  const phase = document.documentElement.dataset.intro;
  return phase === "loading" || phase === "hero" ? phase : "done";
}
function subscribe(callback: () => void) {
  window.addEventListener("site-intro", callback);
  return () => window.removeEventListener("site-intro", callback);
}
export function setIntroPhase(phase: IntroPhase) {
  document.documentElement.dataset.intro = phase;
  window.dispatchEvent(new Event("site-intro"));
}
export function useIntroPhase() {
  return useSyncExternalStore(subscribe, readPhase, () => "loading");
}
