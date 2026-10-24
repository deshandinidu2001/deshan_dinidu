"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Play, RotateCcw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import BlurText from "@/components/react-bits/BlurText";
const studies = [
  {
    name: "Grounded answers",
    prompt:
      "How does SpectraLeaf connect its web, mobile, and backend systems?",
    context: ["Project notes", "System boundaries", "Source references"],
    answer:
      "Web and mobile interfaces present fermentation data. A Node.js and Express backend connects application requests to DynamoDB.",
    source: "SpectraLeaf · portfolio project notes",
    href: "/work/spectraleaf",
  },
  {
    name: "System reasoning",
    prompt: "Where should Skill ERP read project financial results from?",
    context: ["Accounting flow", "Journal records", "Reporting rules"],
    answer:
      "Use posted journal entries and journal lines. Raw operational records do not represent the final accounting result.",
    source: "Skill ERP · documented demo scope",
    href: "/work/skill-erp",
  },
  {
    name: "Useful interfaces",
    prompt: "What should an interface show when an answer is uncertain?",
    context: ["User intent", "Available evidence", "Recovery options"],
    answer:
      "Show the evidence, describe the uncertainty, and give the user a useful next action. A confident layout should never hide a weak answer.",
    source: "Interface study · proposed design approach",
    href: "#about",
  },
];
export function AILab() {
  const [active, setActive] = useState(0),
    [phase, setPhase] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null),
    reduced = useReducedMotion();
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );
  const choose = (index: number) => {
    if (timer.current) clearInterval(timer.current);
    setActive(index);
    setPhase(0);
  };
  const run = () => {
    if (timer.current) clearInterval(timer.current);
    if (reduced) {
      setPhase(4);
      return;
    }
    setPhase(1);
    let next = 1;
    timer.current = setInterval(() => {
      next++;
      setPhase(next);
      if (next >= 4 && timer.current) clearInterval(timer.current);
    }, 480);
  };
  const study = studies[active];
  return (
    <section id="ai-lab" className="lab-notebook section-shell">
      <div className="lab-notebook-intro">
        <span className="mono">The AI workbench</span>
        <h2>
          <BlurText text="A model is only the beginning." />
        </h2>
        <p>
          I’m exploring what makes AI useful in a product: context, clear
          interfaces, and answers people can inspect.
        </p>
        <p className="script">The interface matters as much as the answer.</p>
        <div
          className="lab-study-tabs"
          role="group"
          aria-label="Choose an AI interface study"
        >
          {studies.map((s, i) => (
            <button
              type="button"
              key={s.name}
              aria-pressed={active === i}
              onClick={() => choose(i)}
            >
              <span className="mono">0{i + 1}</span>
              {s.name}
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
      </div>
      <div className="lab-console">
        <div className="lab-console-top mono">
          <span>
            <i />
            Interface study / {String(active + 1).padStart(2, "0")}
          </span>
          <span>Local preview</span>
        </div>
        <div className="lab-console-body">
          <span className="mono lab-console-label">The question</span>
          <p className="lab-prompt">{study.prompt}</p>
          <div className="lab-demo-steps">
            {["Read the input", "Gather context", "Show the evidence"].map(
              (text, i) => (
                <span
                  key={text}
                  data-done={phase > i + 1}
                  data-active={phase === i + 1}
                >
                  {phase > i + 1 ? <Check size={12} /> : <i />}
                  {text}
                </span>
              ),
            )}
          </div>
          <div className="lab-context">
            {study.context.map((text) => (
              <span key={text}>{text}</span>
            ))}
          </div>
          <div className="lab-answer" aria-live="polite">
            <AnimatePresence mode="wait">
              {phase === 4 ? (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.4 }}
                >
                  <span className="mono">
                    <Sparkles size={13} />
                    Example response
                  </span>
                  <p>{study.answer}</p>
                  <a href={study.href}>
                    {study.source}
                    <ArrowUpRight size={14} />
                  </a>
                </motion.div>
              ) : (
                <p className="lab-answer-empty">
                  {phase
                    ? "Following the flow…"
                    : "Play the walkthrough to see how the question, context, and answer fit together."}
                </p>
              )}
            </AnimatePresence>
          </div>
          <button
            className="lab-run"
            type="button"
            onClick={run}
            disabled={phase > 0 && phase < 4}
          >
            {phase === 4 ? <RotateCcw size={15} /> : <Play size={15} />}{" "}
            {phase === 4
              ? "Replay the walkthrough"
              : phase
                ? "Running the preview…"
                : "Run interface demo"}
          </button>
          <p className="lab-disclosure mono">
            Scripted examples to explore the interface. No AI model is
            connected.
          </p>
        </div>
      </div>
    </section>
  );
}
