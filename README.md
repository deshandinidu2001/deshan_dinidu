# Deshan Dinidu — Signal → System

A portfolio for a full stack developer and AI developer. A signal travels from a cursor-responsive network, through project systems and engineering examples, to the next project brief.

Built for **Next.js App Router, TypeScript, Tailwind CSS, and Vercel**. The design and original SVG illustrations are specific to this portfolio. [Design brief](docs/design-brief.md).

## Run

Requires Node.js 20.9 or newer (Node.js 24 recommended).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. On Windows PowerShell with script execution restricted, use `npm.cmd` in place of `npm`. If HTTPS depends on the Windows certificate store, set `$env:NODE_OPTIONS='--use-system-ca'` before installing or building.

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

## What's here

- A short counter/curtain intro, per-character hero, two lazy-loaded React Three Fiber scenes, and SVG fallback art.
- One Lenis/GSAP provider, scrubbed cameras, pinned desktop scenes, a horizontal process strip, SplitType line masks, and word highlighting.
- Contextual cursor, magnetic actions, scrambled navigation, role ticker, drawn SVG annotations, a progress line, and section nodes.
- Dark and light themes saved in local storage, responsive navigation, sticky About panels, and a technology orbit.
- Six selected projects with counted filters and case-study routes. Browser View Transitions share the project illustration between grid and detail where supported.
- An interactive engineering approach section with examples from SpectraLeaf, RAN Technology, and Smartloan BLMS, plus two MDX-rendered note drafts.
- A separate canvas playground with attract/repel modes, pause/reset, a connection-radius control, and keyboard input.
- A native accessible project-brief dialog. Visitors can copy or download a brief. No form data is sent to a server.
- Metadata, generated Open Graph image, sitemap, robots, favicon, and Person JSON-LD.

## Source map

```text
app/                     Routes, layout, tokens/CSS, metadata
  work/[slug]/           Six generated case-study pages
  notes/[slug]/          Two MDX draft pages (noindex)
  experiments/           Particle playground
components/
  sections/              Homepage compositions
  three/                 Dynamic R3F scene, stage, SVG fallback
  motion/                Shared scroll timing, reveals, route completion
  ui/                    Navigation, links, icons, project artwork
  experiments/           Canvas field and pixel lettering
data/
  profile.ts             Identity, education, email/LinkedIn placeholders
  projects.ts            Project facts, scope, source notes, limitations
  site.ts                Site copy and interface labels
  ai-projects.ts         Exactly two planned sample entries
  notes.ts               Draft metadata and MDX source strings
hooks/                   Reduced-motion preference
lib/                     Route transitions and shared utilities
public/projects/         Six original SVG system studies
scripts/                 Artwork generator and audit tools
tests/                   Responsive browser and interaction checks
docs/                    Design and verification notes
```

## Content still needed from Deshan

- [ ] Public email and LinkedIn URL in `data/profile.ts`. The email action stays disabled until supplied. The brief composer remains useful through copy and download.
- [ ] Two real AI projects: use case, model/provider, code, data approach, demo, limitations, and evaluation evidence. Replace the labelled samples in `data/ai-projects.ts`.
- [ ] Real screenshots for the six projects, with permission and useful alt text. Current visuals are original conceptual system studies, explicitly labelled as **not screenshots**.
- [ ] Personal role and contribution notes for each project, especially the SpectraLeaf team project.
- [ ] Scope and status for RAN Technology and Smartloan BLMS. These have thin public documentation, so the portfolio deliberately avoids unsupported features or results.
- [ ] Four personal “How I work” principles in `data/site.ts`. Current prompts are clearly TODO text.
- [ ] Two written notes in `data/notes.ts`. The drafts use MDX syntax and are excluded from indexing and the sitemap.
- [ ] Review the requested **third-year** education status before launch.
- [ ] Approve or replace the Feynman quotation. Attribution is linked to Caltech's Engineering & Science archive.
- [ ] Set the final public origin using `NEXT_PUBLIC_SITE_URL`.

## Performance and accessibility

All fonts are self-hosted and preloaded through `next/font/local`. SVG studies are small source assets, rendered through `next/image`. R3F is imported dynamically near the viewport; offscreen scenes stop rendering. Mobile starts with the SVG network, then loads 3D and heavier scroll setup after the first interaction. It uses fewer nodes, DPR 1, native touch scrolling, and no desktop pins. Desktop DPR can step down when the scene detects low performance. The short intro is skipped if hydration arrives late, so it never hides an already painted page. There are no remote fonts, stock images, textures, or postprocessing passes.

Reduced-motion mode replaces WebGL with static SVG, disables Lenis, pinning, scrubbed reveals, marquees, orbit motion, cursor effects, and animated route transitions. The playground remains interactive without automatic particle motion. GSAP contexts and match-media instances revert on unmount; RAFs, listeners, observers, and Lenis clean up.

Use `npm run test:e2e` with the dev or production server already running at port 3000. Tests use installed Google Chrome and cover 375×812, 768×1024, and 1440×1000 viewports. Screenshots are written to ignored `.qa/`; the HTML report is in ignored `playwright-report/`.

Measured production Lighthouse scores on this machine: **mobile performance 90; desktop performance 92; accessibility, best practices, and SEO 100 in both modes**. These are local lab measurements, not a 60fps guarantee or a physical mid-range phone test. See [verification notes](docs/verification.md) for measured results and limits. To repeat the audits with the production server running, use `node scripts/audit.mjs` (or add `mobile` / `desktop`).

## Deploy to Vercel

1. Push this directory to a Git repository and import it into Vercel.
2. Keep the detected **Next.js** preset, `npm run build`, and default output directory.
3. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin.
4. Deploy, then verify the canonical origin, OG image, mobile layout, and engineering example links.

The app has no database requirement or GitHub token requirement. Deployment credentials and a destination project are not included in this workspace.

## Content sources

Reviewed on 23 October 2026. Repository descriptions make no claim of production readiness, client relationships, or measured results.

- [SpectraLeaf](https://github.com/cepdnaclk/e21-3yp-SPECTRA-LEAF): README, project team, and web/mobile/backend technology manifests.
- [Gaming Café](https://github.com/deshandinidu2001/game-cafe-new): README architecture, TCP protocol, reconnect service, and in-memory timer boundary.
- [Skill ERP](https://github.com/deshandinidu2001/skill-erp): working demo, role pipeline, construction workflows, and documented production limitations.
- [Peraverse Kiosk](https://github.com/deshandinidu2001/Peraverse_Kiosk-main/tree/main/Peraverse_Kiosk-main): nested README describing React/Vite event signage.
- [RAN Technology](https://github.com/deshandinidu2001/RAN-Technology-) and [Smartloan BLMS](https://github.com/deshandinidu2001/Smartloan_BLMS): repository metadata and directory structure; fuller copy awaits source material.
- [Feynman attribution](https://calteches.library.caltech.edu/684/1/ES65.2.2002.pdf): Caltech Engineering & Science, 2002.

The reference at praveenkavindu.com informed only section pacing and interaction categories. No reference code, copy, illustration, or assets are included.
