"use client";
import Image from "next/image";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { heroImages, heroImageSizes } from "@/data/hero-images";
import { HERO_COPY, LIGHT_HOTSPOT } from "./config";
import { LightHotspot } from "./LightHotspot";
import { useHeroLight } from "./useHeroLight";
type Theme = keyof typeof heroImages;
gsap.registerPlugin(CustomEase);
const lightEase = CustomEase.create("hero-light-wipe", "0.22,1,0.36,1");
const ThemePair = memo(function ThemePair({
  theme,
  active,
  onDecoded,
}: {
  theme: Theme;
  active: boolean;
  onDecoded: (theme: Theme, ready: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [decoded, setDecoded] = useState(false);
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const images = Array.from(ref.current?.querySelectorAll("img") ?? []);
    Promise.all(images.map((image) => image.decode()))
      .then(() => {
        if (!cancelled) {
          setDecoded(true);
          onDecoded(theme, true);
        }
      })
      .catch(() => {
        if (!cancelled) onDecoded(theme, false);
      });
    return () => {
      cancelled = true;
    };
  }, [active, onDecoded, theme]);
  return (
    <div
      ref={ref}
      className={`hero-theme-pair hero-scene-${theme}`}
      data-hero-theme={theme}
      data-active={active}
      data-decoded={decoded}
      aria-hidden={!active}
    >
      <Image
        className="hero-scene-image hero-scene-off"
        src={heroImages[theme].off}
        fill
        sizes={heroImageSizes}
        alt={active ? HERO_COPY.imageAlt : ""}
        priority={active}
        loading={active ? "eager" : "lazy"}
        fetchPriority={active ? "high" : "low"}
      />
      <div className="hero-light-reveal">
        <Image
          className="hero-scene-image hero-scene-on"
          src={heroImages[theme].on}
          fill
          sizes={heroImageSizes}
          alt=""
          aria-hidden="true"
          loading={active ? "eager" : "lazy"}
          fetchPriority={active ? "high" : "low"}
        />
      </div>
    </div>
  );
});
export function HeroScene({ theme }: { theme: Theme | null }) {
  const { lit, restored, reduced, ready, inView, setReady } = useHeroLight();
  const scene = useRef<HTMLDivElement>(null),
    surface = useRef<HTMLDivElement>(null);
  const themeRef = useRef(theme);
  useLayoutEffect(() => {
    themeRef.current = theme;
  }, [theme]);
  const decoded = useCallback(
    (loadedTheme: Theme, isReady: boolean) => {
      if (themeRef.current === loadedTheme) setReady(isReady);
    },
    [setReady],
  );
  useEffect(() => {
    setReady(false);
  }, [theme, setReady]);
  useLayoutEffect(() => {
    const el = scene.current;
    if (!el) return;
    if (reduced || !ready) {
      gsap.set(el, {
        "--light-radius": lit ? "150%" : "0%",
        "--light-opacity": lit ? 1 : 0,
      });
      return;
    }
    gsap.set(el, { "--light-opacity": 1 });
    const tween = gsap.to(el, {
      "--light-radius": lit ? "150%" : "0%",
      duration: lit ? 1 : 0.7,
      ease: lightEase,
      overwrite: true,
    });
    return () => {
      tween.kill();
    };
  }, [lit, reduced, ready]);
  useEffect(() => {
    const el = surface.current,
      root = scene.current?.closest("#hero");
    if (
      !el ||
      !root ||
      !inView ||
      reduced ||
      !matchMedia("(min-width:1024px) and (pointer:fine)").matches
    )
      return;
    const xTo = gsap.quickTo(el, "--scene-x", {
        duration: 0.65,
        ease: "power2.out",
      }),
      yTo = gsap.quickTo(el, "--scene-y", {
        duration: 0.65,
        ease: "power2.out",
      }),
      scrollTo = gsap.quickTo(el, "--scene-scroll", {
        duration: 0.5,
        ease: "power2.out",
      });
    const move = (event: Event) => {
      const e = event as PointerEvent,
        r = root.getBoundingClientRect();
      xTo((-(e.clientX - r.left - r.width / 2) / r.width) * 12);
      yTo((-(e.clientY - r.top - r.height / 2) / r.height) * 8);
    };
    const reset = () => {
      xTo(0);
      yTo(0);
    };
    const scroll = () => {
      const r = root.getBoundingClientRect();
      scrollTo(Math.max(-24, Math.min(0, (r.top / r.height) * 24)));
    };
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", reset);
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", reset);
      window.removeEventListener("scroll", scroll);
      xTo.tween.kill();
      yTo.tween.kill();
      scrollTo.tween.kill();
      gsap.set(el, { "--scene-x": 0, "--scene-y": 0, "--scene-scroll": 0 });
    };
  }, [inView, reduced]);
  return (
    <div
      ref={scene}
      className="hero-workbench-scene hero-background-entry"
      data-lit={lit}
      data-ready={ready}
      aria-busy={!ready}
      style={
        {
          "--light-x": `${LIGHT_HOTSPOT.left}%`,
          "--light-y": `${LIGHT_HOTSPOT.top}%`,
        } as CSSProperties
      }
    >
      <div ref={surface} className="hero-scene-surface">
        <div className="hero-scene-mask">
          {theme &&
            restored &&
            (["dark", "light"] as const).map((pairTheme) => (
              <ThemePair
                key={pairTheme}
                theme={pairTheme}
                active={theme === pairTheme}
                onDecoded={decoded}
              />
            ))}
        </div>
        <LightHotspot />
      </div>
    </div>
  );
}
