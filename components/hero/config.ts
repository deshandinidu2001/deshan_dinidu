export type CardPosition = {
  left: number;
  top: number;
  width: number;
  rotate: number;
  tilt?: number;
  turn?: number;
};
// Percentages of the image itself, so the mouse stays aligned at every size.
export const LIGHT_HOTSPOT = { left: 70.8, top: 56, size: 56 };
export const CLICK_SOUND = false;
type CardConfig = CardPosition & {
  tablet?: Partial<CardPosition>;
  mobile?: Partial<CardPosition>;
};
// Positions and angles are percentages/degrees of the scene, not the viewport.
export const CARD_POSITIONS = {
  code: {
    left: 28,
    top: 2,
    width: 21,
    rotate: -5,
    tilt: 6,
    turn: 10,
    tablet: { left: 40, top: 0, width: 29 },
    mobile: { left: 4, top: 0, width: 56, rotate: -4 },
  },
  files: {
    left: 46,
    top: 65,
    width: 17,
    rotate: -7,
    tilt: 5,
    turn: -12,
    tablet: { left: 43, top: 65, width: 21 },
    mobile: { left: 5, top: 65, width: 42, rotate: -5 },
  },
  ai: {
    left: 81,
    top: 1,
    width: 18,
    rotate: 6,
    tilt: 5,
    turn: -12,
    tablet: { left: 80, top: 0, width: 20 },
    mobile: { left: 54, top: 65, width: 42, rotate: 5 },
  },
} satisfies Record<string, CardConfig>;
export type CardId = keyof typeof CARD_POSITIONS;
export const HERO_COPY = {
  label: "+ FULL STACK DEVELOPER / AI DEVELOPER",
  degree: [
    "Computer Engineering Undergraduate",
    "University of Peradeniya, Sri Lanka",
  ],
  skills: ["MOBILE", "AI", "FRONTEND", "BACKEND"],
  process: ["DISCOVER", "PROTOTYPE", "BUILD", "SHIP"],
  imageAlt:
    "Isometric sketch of a developer workbench with three monitors and electronics",
};
