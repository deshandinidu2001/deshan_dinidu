import { readFileSync, writeFileSync } from "node:fs";
const html = readFileSync(".qa/contributions.html", "utf8");
const cells = [
  ...html.matchAll(
    /<td[^>]*data-date="([^"]+)"[^>]*id="([^"]+)"[^>]*data-level="(\d+)"[^>]*>/g,
  ),
];
const days = cells
  .map(([, date, id, level]) => {
    const tooltip =
      html.match(new RegExp(`for="${id}"[^>]*>([^<]*)</tool-tip>`))?.[1] ?? "";
    const count = Number(tooltip.match(/^(\d+) contributions?/)?.[1] ?? 0);
    return { date, count, level: Number(level) };
  })
  .filter((d) => d.date <= "2026-10-23")
  .sort((a, b) => a.date.localeCompare(b.date));
if (!days.length) throw new Error("No contribution cells parsed");
const snapshot = {
  capturedAt: "2026-10-23",
  from: days[0].date,
  to: days.at(-1).date,
  total: days.reduce((n, d) => n + d.count, 0),
  source:
    "https://github.com/users/deshandinidu2001/contributions?from=2025-10-24&to=2026-10-23",
  days,
};
writeFileSync(
  "data/contribution-snapshot.ts",
  `// Real public GitHub HTML snapshot. Refresh using scripts/parse-snapshot.mjs.\nexport const contributionSnapshot = ${JSON.stringify(snapshot, null, 2)} as const;\n`,
);
console.log(
  `Saved ${days.length} actual days, ${snapshot.total} contributions.`,
);
