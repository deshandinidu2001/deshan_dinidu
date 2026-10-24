"use client";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { TechMark } from "@/components/ui/icons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import BlurText from "@/components/react-bits/BlurText";
const groups = [
  {
    name: "Interfaces",
    tools: [
      ["TypeScript", "TS"],
      ["JavaScript", "JS"],
      ["React", "react"],
      ["Next.js", "N"],
      ["Tailwind CSS", "tw"],
      ["Vite", "V"],
    ],
  },
  {
    name: "Mobile",
    tools: [
      ["React Native", "react"],
      ["Expo", "expo"],
    ],
  },
  {
    name: "Systems",
    tools: [
      ["Node.js", "node"],
      ["Express", "ex"],
      [".NET", ".net"],
      ["AWS", "aws"],
      ["DynamoDB", "db"],
      ["Supabase", "S"],
      ["Git", "git"],
    ],
  },
  {
    name: "Interaction",
    tools: [
      ["GSAP", "G"],
      ["Motion", "M"],
      ["Three.js", "3D"],
      ["Zustand", "Z"],
    ],
  },
];

function mixTools(items: string[][], tick: number) {
  if (!tick) return items;
  const result = items.slice();
  let seed = tick * 7919;
  for (let i = result.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function BuiltWith() {
  const [active, setActive] = useState("All tools"),
    [tick, setTick] = useState(0),
    [paused, setPaused] = useState(false),
    [hover, setHover] = useState(false),
    [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null),
    reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reduced || paused || hover || !visible) return;
    const timer = setInterval(() => {
      if (!document.hidden) setTick((value) => value + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, [reduced, paused, hover, visible]);
  const tools = useMemo(
    () =>
      mixTools(
        groups
          .filter((g) => active === "All tools" || g.name === active)
          .flatMap((g) => g.tools),
        tick,
      ),
    [active, tick],
  );
  return (
    <section
      ref={ref}
      id="built-with"
      className="toolkit-section section-shell"
    >
      <div className="toolkit-intro">
        <span className="mono">The working toolkit</span>
        <h2>
          <BlurText text="Different tools. Connected thinking." />
        </h2>
        <p>
          From a first interface to the services behind it. These are the tools
          I build and experiment with.
        </p>
        <p className="script toolkit-note">Always room to learn one more.</p>
        <div className="toolkit-context">
          <a
            href="https://github.com/cepdnaclk/e21-3yp-SPECTRA-LEAF"
            target="_blank"
            rel="noreferrer"
          >
            Building with SpectraLeaf <ArrowUpRight size={14} />
          </a>
          <span>Computer Engineering · Peradeniya</span>
        </div>
      </div>
      <div
        className="toolkit-board"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onFocusCapture={() => setHover(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setHover(false);
        }}
      >
        <div className="toolkit-board-top">
          <div
            className="toolkit-filters"
            role="group"
            aria-label="Filter tools"
          >
            {["All tools", ...groups.map((g) => g.name)].map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={active === name}
                onClick={() => {
                  setActive(name);
                  setTick(0);
                }}
              >
                {name}
              </button>
            ))}
          </div>
          {!reduced && (
            <button
              type="button"
              className="toolkit-pause"
              aria-label={paused ? "Resume tool shuffle" : "Pause tool shuffle"}
              onClick={() => setPaused(!paused)}
            >
              {paused ? <Play size={13} /> : <Pause size={13} />}
            </button>
          )}
        </div>
        <div className="toolkit-tools" data-shuffle={tick}>
          {tools.map(([name, mark], i) => (
            <motion.div
              layout={!reduced}
              key={name}
              className="toolkit-tool"
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              style={
                { "--tool-angle": (i % 2 ? 3 : -3) + "deg" } as CSSProperties
              }
            >
              <div className="toolkit-tool-face">
                <TechMark name={mark} />
                <span>{name}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="toolkit-shuffle-note mono">
          {reduced
            ? "A toolkit that keeps growing."
            : "Different connections, every time. Hover to hold the arrangement."}
        </p>
      </div>
    </section>
  );
}
