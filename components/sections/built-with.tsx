"use client";
import { useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { TechMark } from "@/components/ui/icons";
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
export function BuiltWith() {
  const [active, setActive] = useState("All tools");
  const [hasFiltered, setHasFiltered] = useState(false);
  const tools = groups
    .filter((g) => active === "All tools" || g.name === active)
    .flatMap((g) => g.tools);
  return (
    <section id="built-with" className="toolkit-section section-shell">
      <div className="toolkit-intro">
        <span className="mono">The working toolkit</span>
        <h2>
          Different tools.
          <br />
          One connected
          <br />
          way of thinking.
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
      <div className="toolkit-board">
        <div className="toolkit-filters" role="group" aria-label="Filter tools">
          {["All tools", ...groups.map((g) => g.name)].map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={active === name}
              onClick={() => {
                setActive(name);
                setHasFiltered(true);
              }}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="toolkit-tools" key={active} data-filtered={hasFiltered}>
          {tools.map(([name, mark], i) => (
            <div
              key={name}
              className="toolkit-tool"
              style={
                { "--tool-angle": `${i % 2 ? 3 : -3}deg` } as CSSProperties
              }
            >
              <TechMark name={mark} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
