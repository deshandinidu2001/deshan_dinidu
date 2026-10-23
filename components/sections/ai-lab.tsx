"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Plus, ArrowDownRight } from "lucide-react";
import { aiProjects } from "@/data/ai-projects";
import { siteCopy } from "@/data/site";
import { useScrollMotion } from "@/hooks/use-scroll-motion";
import { SceneStage } from "@/components/three/scene-stage";
export function AILab() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const reduced = useScrollMotion();
  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".lab-stage",
            start: "top top",
            end: "+=600",
            pin: true,
            scrub: 1,
          },
        });
        tl.to(progress, { current: 1, ease: "none" }, 0)
          .to(".lab-flow-line", { scaleX: 1, ease: "none" }, 0)
          .fromTo(
            ".lab-flow span",
            { opacity: 0.25 },
            { opacity: 1, stagger: 0.2 },
            0,
          );
      });
      mm.add("(max-width: 899px)", () => {
        gsap.to(progress, {
          current: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <section ref={ref} id="ai-lab" className="ai-section">
      <div className="lab-stage section-shell">
        <div className="section-kicker mono">
          <span>{siteCopy.ai.label}</span>
          <span className="status-label">
            <i />
            {siteCopy.ai.status}
          </span>
        </div>
        <div className="lab-content">
          <div className="lab-copy">
            <h2 className="display-heading">{siteCopy.ai.title}</h2>
            <p>{siteCopy.ai.description}</p>
            <span className="script lab-margin">
              {siteCopy.ai.margin}
              <ArrowDownRight />
            </span>
          </div>
          <div className="lab-visual">
            <SceneStage progress={progress} lab />
            <div className="mono lab-figure">{siteCopy.ai.sceneLabel}</div>
          </div>
        </div>
        <div className="lab-flow mono">
          {siteCopy.ai.flow.map((step, i) => (
            <span key={step}>
              <i />0{i + 1} / {step}
            </span>
          ))}
          <div className="lab-flow-line" />
        </div>
      </div>
      <div className="ai-projects section-shell">
        {aiProjects.map((project) => (
          <article key={project.id} className="ai-project">
            <div className="ai-project-top mono">
              <span>{project.category}</span>
              <Plus size={17} />
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="todo-badge mono">{project.status}</div>
            <p className="todo-detail">{project.todo}</p>
          </article>
        ))}
        <p className="lab-note mono">{siteCopy.ai.note}</p>
      </div>
    </section>
  );
}
