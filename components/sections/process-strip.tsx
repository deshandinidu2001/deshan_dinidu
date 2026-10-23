"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { siteCopy } from "@/data/site";
import { useScrollMotion } from "@/hooks/use-scroll-motion";
export function ProcessStrip() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useScrollMotion();
  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const track =
          ref.current!.querySelector<HTMLElement>(".process-track")!;
        gsap.to(track, {
          x: () => -(track.scrollWidth - ref.current!.clientWidth + 160),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 22%",
            end: "+=1000",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <section
      ref={ref}
      className="process-section"
      aria-label="From signal to system"
    >
      <div className="process-section-label mono">
        {siteCopy.strip.label}
        <ArrowRight size={18} />
      </div>
      <div
        className="process-track"
        tabIndex={0}
        role="region"
        aria-label="Process stages, scroll horizontally to explore"
        data-cursor="drag"
      >
        {siteCopy.strip.stages.map((stage, i) => (
          <div key={stage.title} className="process-stage">
            <span className="mono">{stage.code}</span>
            <h3>
              {stage.title}
              <span className="stage-symbol" aria-hidden="true">
                {["↳", "⌘", "⤳", "↗"][i]}
              </span>
            </h3>
            <p>{stage.text}</p>
            <div className="stage-line">
              <i />
              <span />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
