"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawnSketch } from "@/components/ui/drawn-sketch";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SketchThought({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null),
    reduced = useReducedMotion();
  useGSAP(
    () => {
      if (reduced) return;
      const root = ref.current!,
        stage = root.querySelector<HTMLElement>(".sketch-thought")!,
        rocket = root.querySelector<HTMLElement>(".thought-rocket")!,
        route = root.querySelector<SVGPathElement>(".thought-flight-path")!,
        about = root.querySelector<HTMLElement>(".profile-section")!,
        portrait = root.querySelector<HTMLElement>(".profile-portrait")!;
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width:1024px) and (min-height:740px)",
          flowing: "(max-width:1023px), (max-height:739px)",
        },
        (context) => {
          const desktop = Boolean(context.conditions?.desktop);
          root.dataset.flight = desktop ? "pinned" : "flowing";
          const flight = { progress: 0 };
          const length = route.getTotalLength();
          const placeRocket = () => {
            const distance = flight.progress * length,
              point = route.getPointAtLength(distance),
              ahead = route.getPointAtLength(Math.min(length, distance + 1)),
              behind = route.getPointAtLength(Math.max(0, distance - 1)),
              width = stage.clientWidth,
              height = stage.clientHeight,
              angle =
                (Math.atan2(
                  ((ahead.y - behind.y) * height) / 700,
                  ((ahead.x - behind.x) * width) / 1000,
                ) *
                  180) /
                  Math.PI +
                22;
            gsap.set(rocket, {
              x: (point.x * width) / 1000,
              y: (point.y * height) / 700,
              rotation: angle,
              scale: 1 + flight.progress * (desktop ? 1.7 : 0.5),
              xPercent: -50,
              yPercent: -50,
            });
          route.style.strokeDashoffset = String((1 - flight.progress) * length);
          };
        gsap.set(route, { strokeDasharray: length, strokeDashoffset: length });
          placeRocket();
          const timeline = gsap.timeline({
            scrollTrigger: {
              id: "thought-flight",
              trigger: stage,
              start: desktop ? "top top" : "top 25%",
              end: desktop
                ? () => `+=${window.innerHeight * 1.25}`
                : "bottom 20%",
              pin: desktop,
              pinType: "transform",
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: placeRocket,
            },
          });
          timeline
            .to({}, { duration: 0.2 })
            .to(flight, {
              progress: 1,
              duration: 1.8,
              ease: "none",
              onUpdate: placeRocket,
            })
            .to(
              ".sketch-thought-copy",
              { opacity: 0, y: -35, duration: 0.8 },
              0.65,
            )
            .to(".thought-sketch-left", { opacity: 0, duration: 0.6 }, 0.65)
            .fromTo(
              ".thought-flight-note",
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.4 },
              1.2,
            );

          // Keep the profile in normal flow so direct #about links still work.
          gsap.fromTo(
            portrait,
            {
              opacity: 0,
              y: 75,
              scale: 0.94,
              clipPath: "inset(10% 6% 0 6% round 22px)",
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              clipPath: "inset(0% 0% 0 0% round 22px)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: about,
                start: "top 85%",
                end: "top 18%",
                scrub: 0.5,
              },
            },
          );
          gsap.fromTo(
            root.querySelectorAll(".profile-story > *"),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: about,
                start: "top 73%",
                end: "top 10%",
                scrub: 0.5,
              },
            },
          );
          gsap.to([rocket, route, root.querySelector(".thought-flight-note")], {
            opacity: 0,
            scrollTrigger: {
              trigger: about,
              start: "top 96%",
              end: "top 66%",
              scrub: true,
            },
          });
          return () => {
            delete root.dataset.flight;
          };
        },
      );
      gsap.fromTo(
        ".thought-emphasis path",
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.1,
          scrollTrigger: { trigger: stage, start: "top 65%", once: true },
        },
      );
      const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        cancelAnimationFrame(refresh);
        mm.revert();
      };
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <div className="thought-journey" ref={ref}>
      <section
        className="sketch-thought section-shell"
        aria-label="A thought behind the work"
      >
        <div className="sketch-thought-copy">
          <p className="script thought-margin">A reminder to myself.</p>
          <h2>
            Good systems begin
            <br />
            with{" "}
            <span className="thought-emphasis">
              good questions.
              <svg
                viewBox="0 0 600 150"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path
                  pathLength="1"
                  d="M72 27C221 0 504 3 563 52C627 112 379 151 133 127C-11 114-5 46 73 27"
                />
              </svg>
            </span>
          </h2>
          <p className="thought-caption">
            Understand first. Build with intent. Keep learning.
          </p>
        </div>
        <DrawnSketch
          kind="idea"
          className="thought-sketch thought-sketch-left"
        />
        <svg
          className="thought-flight-route"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            className="thought-flight-path"
            d="M880 440C970 260 720 110 500 180S90 340 250 545C285 595 345 610 370 640"
          />
        </svg>
        <div className="thought-rocket" aria-hidden="true">
          <DrawnSketch kind="plane" showTrail={false} />
        </div>
        <p className="thought-flight-note script">
          Follow the curiosity.<span className="mono">A little about me ↓</span>
        </p>
      </section>
      {children}
    </div>
  );
}
