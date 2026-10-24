"use client";
import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import gsap from "gsap";
import { LIGHT_HOTSPOT } from "./config";
import { useHeroLight } from "./useHeroLight";
export function LightHotspot() {
  const { lit, hasInteracted, ready, inView, reduced, toggle } = useHeroLight();
  const button = useRef<HTMLButtonElement>(null),
    ripple = useRef<HTMLSpanElement>(null);
  const feedback = useRef<gsap.core.Timeline | null>(null);
  useEffect(() => {
    const b = button.current,
      r = ripple.current;
    return () => {
      feedback.current?.kill();
      gsap.killTweensOf([b, r]);
    };
  }, []);
  const click = (event: MouseEvent<HTMLButtonElement>) => {
    if (!ready) return;
    if (!reduced && button.current && ripple.current) {
      const rect = button.current.getBoundingClientRect();
      const fromMouse =
        event.currentTarget === button.current && event.detail > 0;
      gsap.set(ripple.current, {
        left: fromMouse ? event.clientX - rect.left : rect.width / 2,
        top: fromMouse ? event.clientY - rect.top : rect.height / 2,
      });
      gsap.fromTo(
        ripple.current,
        { scale: 0.2, opacity: 0.8 },
        {
          scale: 2.1,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        },
      );
      feedback.current?.kill();
      feedback.current = gsap
        .timeline()
        .to(button.current, { scale: 0.92, duration: 0.08, overwrite: true })
        .to(button.current, {
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1,.5)",
        });
    }
    toggle();
  };
  const label = `Turn the workbench lights ${lit ? "off" : "on"}`;
  return (
    <>
      <button
        ref={button}
        type="button"
        className="hero-light-hotspot"
        style={
          {
            left: `${LIGHT_HOTSPOT.left}%`,
            top: `${LIGHT_HOTSPOT.top}%`,
            width: LIGHT_HOTSPOT.size,
            height: LIGHT_HOTSPOT.size,
          } as CSSProperties
        }
        disabled={!ready}
        aria-pressed={lit}
        aria-label={label}
        onClick={click}
      >
        <span className="hero-hotspot-target" aria-hidden="true" />
        <span
          className="hero-hotspot-pulse"
          data-visible={ready && !lit && !hasInteracted}
          data-paused={!inView}
          aria-hidden="true"
        />
        <span ref={ripple} className="hero-hotspot-ripple" aria-hidden="true" />
        <span className="hero-hotspot-tooltip" aria-hidden="true">
          Lights {lit ? "off" : "on"}
        </span>
      </button>
      <span
        className="hero-hotspot-hint-anchor"
        style={{
          left: `${LIGHT_HOTSPOT.left}%`,
          top: `${LIGHT_HOTSPOT.top}%`,
          width: LIGHT_HOTSPOT.size,
          height: LIGHT_HOTSPOT.size,
        }}
        aria-hidden="true"
      >
        <span
          className="hero-hotspot-hint"
          data-visible={ready && !lit && !hasInteracted}
        >
          <span>CLICK THE MOUSE</span>
          <i />
        </span>
      </span>
      <button
        type="button"
        className="hero-light-chip"
        disabled={!ready}
        aria-pressed={lit}
        aria-label={`Workbench lights: ${lit ? "On" : "Off"}. ${label}`}
        onClick={click}
      >
        <i aria-hidden="true" />
        Lights: {lit ? "On" : "Off"}
      </button>
    </>
  );
}
