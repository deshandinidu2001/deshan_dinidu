"use client";
import { useState } from "react";
import { ArrowDownRight } from "lucide-react";
import BlurText from "@/components/react-bits/BlurText";
const steps = [
  {
    title: "Find the real problem",
    text: "Start with the people, the context, and what needs to work. A useful question comes before a stack decision.",
    output: "A clear problem and its constraints",
  },
  {
    title: "Map the moving parts",
    text: "Sketch the journey from the interface to the data. Make the relationships visible before making them complicated.",
    output: "A flow, a small prototype, and a plan",
  },
  {
    title: "Build one complete flow",
    text: "Connect the frontend, API, and storage around a working slice. Learn from something you can actually use.",
    output: "An end-to-end feature you can try",
  },
  {
    title: "Test, refine, repeat",
    text: "Check the edge cases, try it on a real device, and improve the details. Document what works and what comes next.",
    output: "Working software and an honest handover",
  },
];
export function ProcessStrip() {
  const [active, setActive] = useState(0);
  return (
    <section id="process" className="build-process section-shell">
      <div className="build-process-heading">
        <span className="mono">How I approach a build</span>
        <h2>
          <BlurText text="Make the next step useful." />
        </h2>
        <p className="script">
          Start small. Connect it properly. Keep improving.
        </p>
      </div>
      <ol className="build-steps">
        {steps.map((step, i) => (
          <li key={step.title}>
            <button
              type="button"
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <span className="mono">0{i + 1}</span>
              <span className="build-step-title">{step.title}</span>
              <ArrowDownRight size={22} strokeWidth={1.3} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>
      <div className="build-step-description" aria-live="polite">
        <p>{steps[active].text}</p>
        <span className="mono">
          <i aria-hidden="true" />
          {steps[active].output}
        </span>
      </div>
    </section>
  );
}
