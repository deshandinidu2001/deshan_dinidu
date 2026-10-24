import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { siteCopy } from "@/data/site";
import { HERO_COPY } from "./config";
export function HeroText() {
  return (
    <div className="hero-text-anchor">
      <div className="hero-text-scroll">
        <div className="hero-text">
          <p className="hero-eyebrow">{HERO_COPY.label}</p>
          <h1 aria-label={profile.name}>
            {[profile.firstName, profile.lastName].map((name, i) => (
              <span
                className={`hero-name-line ${i ? "hero-accent-name" : ""}`}
                aria-hidden="true"
                key={name}
              >
                {name
                  .toUpperCase()
                  .split("")
                  .map((letter, j) => (
                    <span className="hero-letter" key={j}>
                      {letter}
                    </span>
                  ))}
                {i === 1 && <span className="hero-period">.</span>}
              </span>
            ))}
          </h1>
          <div
            className="hero-degree"
            role="group"
            aria-label={HERO_COPY.degree.join(". ")}
          >
            <span className="hero-degree-rule" aria-hidden="true" />
            {HERO_COPY.degree.map((line) => (
              <p className="hero-degree-line" key={line} aria-hidden="true">
                {line}
              </p>
            ))}
          </div>
          <ul className="hero-skills" aria-label="Development skills">
            {HERO_COPY.skills.map((skill, i) => (
              <li key={skill}>
                {i > 0 && <span aria-hidden="true">/</span>}
                {skill}
              </li>
            ))}
          </ul>
          <ol className="hero-process" aria-label="Project process">
            {HERO_COPY.process.map((step, i) => (
              <li key={step}>
                <span>0{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="hero-actions">
            <Link className="hero-primary" href="#work">
              {siteCopy.hero.cta}
              <ArrowDownRight size={18} aria-hidden="true" />
            </Link>
            <Link className="hero-secondary" href="#about">
              {siteCopy.hero.secondary}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroNote() {
  return (
    <div className="hero-handwritten">
      <span>{profile.tagline}</span>
      <svg
        className="hero-note-arrow"
        viewBox="0 0 125 85"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 74C17 17 58 8 105 22M89 7l19 17-24 7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
