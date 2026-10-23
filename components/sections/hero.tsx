"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { profile } from "@/data/profile";
import { siteCopy } from "@/data/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Magnetic } from "@/components/ui/magnetic";
import { SceneStage } from "@/components/three/scene-stage";
import { Crosshair } from "@/components/ui/icons";
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (reduced) return;
      // Never hide already painted content when hydration arrives on a slow connection.
      if (performance.now() < 850) {
        gsap.from(".hero-char", {
          yPercent: 110,
          rotation: 8,
          stagger: 0.045,
          duration: 1.1,
          delay: 0.8,
          ease: "power4.out",
        });
        if (window.innerWidth >= 768)
          gsap.from(".hero-intro, .hero-actions, .hero-eyebrow", {
            opacity: 0,
            y: 15,
            duration: 0.75,
            stagger: 0.1,
            delay: 1.2,
          });
      }
      gsap.fromTo(
        ".sketch-arrow path",
        { strokeDasharray: 220, strokeDashoffset: 220 },
        { strokeDashoffset: 0, duration: 1.1, delay: 1.6 },
      );
      gsap.to(progress, {
        current: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(".hero-scene-wrap", {
          y: 70,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=160",
            pin: ".hero-scene-wrap",
            pinSpacing: false,
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <section ref={ref} id="hero" className="hero section-shell">
      <div className="hero-topline mono">
        <span>{siteCopy.hero.index}</span>
        <span className="location">
          <i />
          {profile.location} <span className="utc">/ UTC +5:30</span>
        </span>
      </div>
      <div className="hero-main">
        <div className="hero-copy">
          <div className="hero-eyebrow mono">
            <span className="tiny-cross">+</span>
            {siteCopy.hero.eyebrow}
          </div>
          <h1 aria-label={profile.name}>
            {[profile.firstName, profile.lastName].map((name, i) => (
              <span
                key={name}
                className={`name-line ${i ? "accent-name" : ""}`}
                aria-hidden="true"
              >
                {name
                  .toUpperCase()
                  .split("")
                  .map((char, j) => (
                    <span className="char-mask" key={j}>
                      <span className="hero-char">{char}</span>
                    </span>
                  ))}
                {i === 1 && <span className="name-period">.</span>}
              </span>
            ))}
          </h1>
          <div className="role-ticker mono">
            <span className="sr-only">{siteCopy.hero.roles.join(", ")}</span>
            <span className="signal-dot" />
            <div className="ticker-window">
              <div className="ticker-track" aria-hidden="true">
                {[...siteCopy.hero.roles, ...siteCopy.hero.roles].map(
                  (role, i) => (
                    <span key={i}>
                      {role}
                      <span className="ticker-slash">/</span>
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
          <p className="hero-intro">{profile.introduction}</p>
          <div className="hero-actions">
            <Magnetic>
              <Link href="#work" className="button button-primary">
                {siteCopy.hero.cta}
                <ArrowDownRight size={19} />
              </Link>
            </Magnetic>
            <Link href="#about" className="text-link">
              {siteCopy.hero.secondary}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
        <div className="hero-scene-wrap">
          <div className="network-coordinate coord-a mono">
            x 0.256
            <br />y 0.894
            <br />z 0.128
          </div>
          <SceneStage progress={progress} />
          <Crosshair className="scene-cross cross-a" />
          <Crosshair className="scene-cross cross-b" />
          <div className="scene-label mono">
            <span className="signal-dot" />
            {siteCopy.hero.sceneLabel}
          </div>
          <div className="scene-hint mono">{siteCopy.hero.sceneNote}</div>
        </div>
        <div className="hero-note script">
          {profile.tagline}
          <svg
            viewBox="0 0 130 90"
            className="sketch-arrow"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 8c71-11 107 19 88 56M75 49l20 20 18-19"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="process-list mono">
          {siteCopy.hero.process.map((step, i) => (
            <div key={step}>
              <span>0{i + 1}</span>
              {step}
              {i < 3 && <span className="process-connector" />}
            </div>
          ))}
        </div>
        <a href="#built-with" className="scroll-prompt mono">
          {siteCopy.hero.scroll}
          <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}
