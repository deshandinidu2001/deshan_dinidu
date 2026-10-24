"use client";
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { CLICK_SOUND } from "./config";

type HeroLightState = {
  lit: boolean;
  restored: boolean;
  hasInteracted: boolean;
  ready: boolean;
  inView: boolean;
  reduced: boolean;
  setReady: (ready: boolean) => void;
  setInView: (visible: boolean) => void;
  toggle: () => void;
};
const HeroLightContext = createContext<HeroLightState | null>(null);
function playClick() {
  if (!CLICK_SOUND) return;
  try {
    const audio = new AudioContext(),
      osc = audio.createOscillator(),
      gain = audio.createGain();
    osc.frequency.setValueAtTime(900, audio.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audio.currentTime + 0.035);
    gain.gain.setValueAtTime(0.2, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime + 0.04);
    osc.onended = () => {
      void audio.close();
    };
  } catch {}
}
export function HeroLightProvider({ children }: { children: ReactNode }) {
  const [lit, setLit] = useState(false);
  const [restored, setRestored] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const reduced = useReducedMotion();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = sessionStorage.getItem("hero-lit") === "true";
        setLit(saved);
        setHasInteracted(
          saved || sessionStorage.getItem("hero-light-interacted") === "true",
        );
      } catch {}
      setRestored(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const toggle = useCallback(() => {
    if (!ready) return;
    const next = !lit;
    setLit(next);
    setHasInteracted(true);
    try {
      sessionStorage.setItem("hero-lit", String(next));
      sessionStorage.setItem("hero-light-interacted", "true");
    } catch {}
    if (!reduced) playClick();
  }, [lit, ready, reduced]);
  const value = useMemo(
    () => ({
      lit,
      restored,
      hasInteracted,
      ready,
      inView,
      reduced,
      setReady,
      setInView,
      toggle,
    }),
    [lit, restored, hasInteracted, ready, inView, reduced, toggle],
  );
  return createElement(HeroLightContext.Provider, { value }, children);
}
export function useHeroLight() {
  const context = useContext(HeroLightContext);
  if (!context)
    throw new Error("useHeroLight must be used inside HeroLightProvider");
  return context;
}
