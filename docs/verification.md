# Verification

Checked on 23 October 2026 with Node.js 24.19.0, Next.js 16.4.3, and installed Google Chrome on Windows.

## Production and source checks

- `npm run lint`: passes without warnings.
- `npm run typecheck`: passes.
- `npm run build`: passes; homepage, six case studies, two MDX drafts, playground, OG image, sitemap, and robots are generated.
- Client assets do not contain the server-only `GITHUB_TOKEN` environment variable reference.
- Dependency installation reports zero known vulnerabilities at the time of verification.

## Browser checks

Final production run: **19 passed, 2 intentionally skipped**. The two skips are the desktop-only pinned WebGL sequence on tablet and mobile; those sizes still run all six responsive and interaction checks.

Playwright covers **375×812**, **768×1024**, and **1440×1000** viewports. The suite checks responsive overflow, visible content, contribution fallback, filter counts and the empty AI filter, case-study routing, persistent themes, native dialog behavior, brief downloads, MDX draft rendering, browser View Transitions, mobile navigation, playground keyboard/controls, and reduced-motion SVG fallbacks. A desktop-only check also loads both actual WebGL scenes and verifies that the intro leaves the page usable.

Axe audits the homepage in both themes and the open brief dialog with reduced motion enabled. Normal-motion Lighthouse accessibility audits also pass. These tools do not replace a full assistive-technology review.

Screenshots are stored in ignored `.qa/`; Playwright's report and traces are ignored generated artifacts. Screenshots were inspected at all three requested widths. Visual review led to the mobile margin-note spacing fix and darker secondary text on the light About panels.

## Lighthouse

Measured against `npm run start`, using Lighthouse 13.5.0's standard mobile and desktop profiles and default simulated throttling. Runs were sequential, without concurrent browser tests. The mobile audit uses Lighthouse's default emulated mobile viewport; the separate responsive suite includes the requested 375 px width.

| Measure                  | Mobile | Desktop |
| ------------------------ | -----: | ------: |
| Performance              |     90 |      92 |
| Accessibility            |    100 |     100 |
| Best practices           |    100 |     100 |
| SEO                      |    100 |     100 |
| First contentful paint   |  0.9 s |   0.3 s |
| Largest contentful paint |  3.6 s |   0.9 s |
| Total blocking time      |  70 ms |  220 ms |
| Cumulative layout shift  |      0 |       0 |
| Speed index              |  2.0 s |   0.7 s |

Reports: `.qa/lighthouse-mobile.json` and `.qa/lighthouse-desktop.json`. Repeat with `node scripts/audit.mjs` while the production server runs on port 3000. Scores vary by machine, browser, network, and run. The first mobile measurement was 65; deferring mobile WebGL and scroll setup, preloading local fonts, and keeping introductory copy painted improved the final run to 90. Mobile LCP still has room to improve.

## Content and verification boundaries

- GitHub's public fallback was fetched and parsed from actual contribution cells: 92 contributions, 1 January–23 October 2026. There is no generated activity.
- The authenticated GraphQL path is implemented with a five-second timeout, hourly cache/revalidation, and snapshot fallback. A live token was not supplied, so the authenticated response was not exercised against GitHub.
- Project READMEs and public metadata were reviewed. RAN has no assigned discipline until its scope is confirmed; Peraverse is classified as a signage system rather than a full-stack implementation.
- The reference was inspected for section structure and pacing. Its code and assets were not reused.
- Original SVG studies are labelled as conceptual artwork. Actual screenshots, contact details, AI projects, notes, and personal principles remain explicit content tasks.
- No physical phone, Safari, or Firefox test was performed. Headless Chrome cannot prove sustained 60fps or mid-range phone thermals/battery behavior.
- No Vercel credentials or destination project were provided; the workspace is ready to import into Vercel, and no hosted deployment is claimed.
