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
        routeSvg = root.querySelector<SVGSVGElement>(".thought-flight-route")!,
        route = root.querySelector<SVGPathElement>(".thought-flight-path")!,
        about = root.querySelector<HTMLElement>(".profile-section")!,
        portrait = root.querySelector<HTMLElement>(".profile-portrait")!,
        landing = root.querySelector<HTMLElement>(".profile-rocket-landing")!;
      root.dataset.flight = "flowing";
      const flight = { progress: 0 };
      let length = 1;
      const localCenter = (element: HTMLElement) => {
        let x = element.offsetWidth / 2,
          y = element.offsetHeight / 2;
        let current: HTMLElement | null = element;
        while (current && current !== root) {
          x += current.offsetLeft;
          y += current.offsetTop;
          current = current.offsetParent as HTMLElement | null;
        }
        return { x, y };
      };
      const placeRocket = () => {
        const distance = flight.progress * length,
          point = route.getPointAtLength(distance),
          ahead = route.getPointAtLength(Math.min(length, distance + 1)),
          behind = route.getPointAtLength(Math.max(0, distance - 1)),
          angle =
            (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) /
              Math.PI +
            40,
          settle = gsap.utils.clamp(0, 1, (flight.progress - 0.8) / 0.2);
        gsap.set(rocket, {
          x: point.x,
          y: point.y,
          rotation: angle * (1 - settle) - 10 * settle,
          scale:
            1 +
            Math.sin(flight.progress * Math.PI) * 0.65 +
            flight.progress * 0.15,
          xPercent: -50,
          yPercent: -50,
        });
        route.style.strokeDashoffset = String((1 - flight.progress) * length);
      };
      const measureRoute = () => {
        const width = root.clientWidth,
          height = root.clientHeight,
          thoughtHeight = stage.offsetHeight,
          end = localCenter(landing),
          startX = Math.min(
            width - 80,
            width / 2 + (width > 1000 ? 430 : width * 0.3),
          ),
          startY = thoughtHeight * 0.59,
          left = Math.max(width * 0.06, width > 1000 ? 140 : 95);
        routeSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        route.setAttribute(
          "d",
          `M${startX} ${startY} C${startX + width * 0.04} ${startY + 110}, ${width * 0.75} ${thoughtHeight * 0.95}, ${width * 0.52} ${thoughtHeight * 0.92} S${left} ${thoughtHeight * 0.96}, ${left} ${thoughtHeight + 80} C${left} ${end.y - 90}, ${end.x - 80} ${end.y}, ${end.x} ${end.y}`,
        );
        length = route.getTotalLength();
        route.style.strokeDasharray = String(length);
        placeRocket();
      };
      measureRoute();
      gsap
        .timeline({
          scrollTrigger: {
            id: "thought-flight",
            trigger: stage,
            start: "top 12%",
            endTrigger: landing,
            end: "center 75%",
            scrub: 0.45,
            invalidateOnRefresh: true,
            onRefresh: measureRoute,
          },
        })
        .to(
          flight,
          { progress: 1, duration: 1, ease: "none", onUpdate: placeRocket },
          0,
        )
        .to(
          ".sketch-thought-copy",
          { opacity: 0.12, y: -25, duration: 0.6 },
          0.15,
        )
        .to(".thought-sketch-left", { opacity: 0, duration: 0.5 }, 0.15)
        .to(route, { opacity: 0.15, duration: 0.2 }, 0.8);
      // The profile enters during the flight. Nothing is held in an empty pin.
      gsap.fromTo(
        portrait,
        { opacity: 0.15, y: 35, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: about,
            start: "top 100%",
            end: "top 35%",
            scrub: 0.4,
          },
        },
      );
      gsap.fromTo(
        root.querySelectorAll(".profile-story > *"),
        { opacity: 0.15, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: about,
            start: "top 98%",
            end: "top 22%",
            scrub: 0.4,
          },
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
        delete root.dataset.flight;
        rocket.style.removeProperty("transform");
        route.style.removeProperty("stroke-dasharray");
        route.style.removeProperty("stroke-dashoffset");
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
      </section>
      {children}
      <svg className="thought-flight-route" fill="none" aria-hidden="true">
        <path className="thought-flight-path" />
      </svg>
      <div className="thought-rocket" aria-hidden="true">
        <DrawnSketch kind="plane" showTrail={false} />
      </div>
    </div>
  );
}
