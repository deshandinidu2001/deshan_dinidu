# Signal → System

## Concept

Deshan Dinidu's portfolio follows a single signal from an idea to a working interface. A fine vertical track, node markers, and a changing network carry that signal through the page. The visual metaphor comes from routing and computation, not a blueprint or a generic AI dashboard.

The opening is an oversized, left-aligned typographic composition with a dimensional signal network on the right. Its deliberate overlap is the signature moment. Work is presented as individual systems with original schematic artwork, not invented product screenshots.

## Tokens

| Token    | Value   | Role                                             |
| -------- | ------- | ------------------------------------------------ |
| Ink      | #0B0D10 | Main dark surface                                |
| Bone     | #EDEAE2 | Text and light-theme surface                     |
| Signal   | #C8FF3D | Active signal, second name line, primary actions |
| Steel    | #87949F | Secondary text and inactive wires                |
| Graphite | #181C20 | Raised surfaces                                  |
| Slate    | #30373D | Rules and quiet grid                             |

In light mode, dark ink supplies text contrast. Lime is paired with ink text or used on dark artwork rather than as pale text on bone.

## Typography

- **Space Grotesk**: tightly spaced, substantial display typography and clean body copy. Huge name typography is the visual anchor.
- **IBM Plex Mono**: navigation, process stages, metadata, and technical annotations.
- **Caveat**: one handwritten margin note and restrained human accents.

Fonts are downloaded and self-hosted. Headings use tight leading; body lines remain under 70 characters. Uppercase labels and sequence numbers follow the explicit client brief.

## Layout and composition

```text
     [mark]         floating navigation                 [talk]
  •  FULL STACK / AI               signal network
  │  DESHAN                     ╱ ───── ○
  │  DINIDU                 ○ ──╲──── ○
  │  short introduction           ╲ ○ ╱
  •  [Explore work]       handwritten margin note
     01 Discover — 02 Prototype — 03 Build — 04 Ship
```

The opening occupies approximately one viewport. The first work preview appears promptly after the context and contribution map. Large work compositions alternate with compressed, quiet information sections. The AI Lab is an immersive break. About becomes a lighter editorial space before the dark contact close.

## Section map

1. Preloader: real loading counter gesture, line draw, short curtain exit; never blocks content if JavaScript fails.
2. Hero: two-line name, signal network, role ticker, process strip, introductory copy.
3. Built with: SpectraLeaf and University of Peradeniya contexts; crosshair technology wall.
4. Contribution map: server-side GitHub GraphQL with one-hour cache; dated public snapshot fallback with visible source.
5. Selected work: asymmetric project grid, counted filters, case-study routes, pinned horizontal process strip.
6. AI Lab: second node scene, scroll-driven camera, exactly two clearly marked TODO explorations.
7. What I do: five capability tiles and process chips.
8. About: scrubbed word paragraph, sticky education and working-principle panels, SVG tech orbit.
9. Notes: two MDX draft routes, explicitly marked TODO.
10. Experiments: separate particle playground with keyboard/pointer interaction and pixel-style heading.
11. Quote: attributed quotation with SVG annotation.
12. Contact: project-brief composer, configurable email and LinkedIn, large closing name and back-to-top.

## Motion language

Motion follows the signal: it travels, gathers into a system, then resolves into an interface. GSAP and one shared Lenis provider own scroll timing. React Three Fiber owns lightweight geometries; both scenes use a scroll-linked camera. Motion owns filter and UI state changes. SplitType supplies a line-mask treatment. Navigation has short text scrambles; cursor states and magnetic actions respond only to deliberate pointer input.

The hero scene pins within its stage, the work process moves horizontally on desktop, and the AI scene unfolds through a pinned viewport. About panels stack, dim, and scale. Route changes use the browser View Transition API when supported, with a short clip-path entrance fallback.

Reduced-motion mode removes smooth scrolling, pinning, scrubbing, marquees, automatic orbiting, and custom cursors. Mobile receives lower geometry counts and shorter scenes. ScrollTriggers and animation frames clean up on unmount.

## Signature interaction

The signal network begins dispersed, follows the visitor's cursor, and organizes as the hero scrolls. The right-hand progress trace and left node rail continue that journey. In the AI Lab, the same visual vocabulary becomes an input → model → interface flow. It is one metaphor carried across two distinct scenes.

## Reference boundary and design critique

The reference is consulted for navigation cadence, scroll pacing, project interaction, and transition types only. No source, layout, colors, assets, illustrations, or copy are reused. The client explicitly requests ink/lime, mono labels, and hairlines; individuality therefore comes from the unusually large offset name, the dimensional node machine, the continuous signal, and original project diagrams. Avoid a generic uniform card grid, extra glowing decoration, and fabricated metrics.

## Content integrity

Project descriptions link to their public repositories. Thin READMEs receive short factual descriptions. No clients, results, metrics, biography, or AI accomplishments are invented. Missing screenshots, email, LinkedIn, working principles, AI projects, and notes remain documented content tasks. The requested third-year education wording is treated as user-supplied and should be reviewed before launch.

## Validation

Run ESLint, TypeScript, and a production build. Review 375, 768, and 1440 pixel widths, keyboard navigation, filters, theme persistence, case-study routing, the contact composer, experiment controls, contribution fallback, and reduced motion. A Lighthouse score is reported only when measured; 90+ is a target, not an assumed result.
