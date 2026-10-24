"use client";
import type { CSSProperties, ReactNode } from "react";
import { CARD_POSITIONS, type CardId, type CardPosition } from "./config";

export function HeroCard({
  id,
  title,
  children,
  interactive = false,
}: {
  id: CardId;
  title: string;
  children: ReactNode;
  interactive?: boolean;
}) {
  const position = CARD_POSITIONS[id];
  const tablet = {
    ...position,
    ...("tablet" in position ? position.tablet : {}),
  };
  const mobile = {
    ...position,
    ...("mobile" in position ? position.mobile : {}),
  };
  const variables = (p: CardPosition, suffix = "") => ({
    [`--card-left${suffix}`]: `${p.left}%`,
    [`--card-top${suffix}`]: `${p.top}%`,
    [`--card-width${suffix}`]: `${p.width}%`,
    [`--card-rotate${suffix}`]: `${p.rotate}deg`,
    [`--card-tilt${suffix}`]: `${p.tilt ?? 0}deg`,
    [`--card-turn${suffix}`]: `${p.turn ?? 0}deg`,
  });
  const style = {
    ...variables(position),
    ...variables(tablet, "-tablet"),
    ...variables(mobile, "-mobile"),
    "--card-delay": `${Object.keys(CARD_POSITIONS).indexOf(id) * 0.1}s`,
  } as CSSProperties;
  return (
    <div
      className={`hero-card-anchor hero-card-${id}`}
      style={style}
      aria-hidden={interactive ? undefined : true}
    >
      <div className="hero-card-reveal">
        <div className="hero-card-float">
          <div className="hero-card-shell">
            <div className="hero-card-header">
              <span className="hero-window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>{title}</span>
            </div>
            <div className="hero-card-content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
