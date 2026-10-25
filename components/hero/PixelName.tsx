"use client";
import { useId } from "react";
import { profile } from "@/data/profile";
import { useIntroPhase } from "@/components/motion/use-intro";
export const NAME_PIXEL_ROWS = 6;
const columns = 28;
export function PixelName() {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const revealing = useIntroPhase() === "hero";
  const names = [profile.firstName, profile.lastName];
  return (
    <h1 aria-label={profile.name}>
      <svg className="hero-pixel-defs" width="0" height="0" aria-hidden="true">
        <defs>
          {names.map((name, line) => (
            <clipPath
              key={name}
              id={`${id}-name-${line}`}
              clipPathUnits="objectBoundingBox"
              data-pixel-mask={line}
            >
              {Array.from({ length: columns * NAME_PIXEL_ROWS }, (_, i) => (
                <rect
                  className="hero-name-pixel"
                  key={i}
                  x={(i % columns) / columns}
                  y={Math.floor(i / columns) / NAME_PIXEL_ROWS}
                  width={1 / columns + 0.001}
                  height={1 / NAME_PIXEL_ROWS + 0.002}
                />
              ))}
            </clipPath>
          ))}
        </defs>
      </svg>
      {names.map((name, i) => (
        <span
          className={`hero-name-line ${i ? "hero-accent-name" : ""}`}
          aria-hidden="true"
          key={name}
          style={{ clipPath: revealing ? `url(#${id}-name-${i})` : "none" }}
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
  );
}
