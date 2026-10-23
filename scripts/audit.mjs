import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync(".qa", { recursive: true });
const chrome = await launch({
  chromeFlags: ["--headless=new", "--no-first-run", "--disable-extensions"],
});
try {
  const modes = process.argv.slice(2);
  for (const mode of modes.length ? modes : ["mobile", "desktop"]) {
    const result = await lighthouse(
      "http://localhost:3000",
      {
        port: chrome.port,
        logLevel: "error",
        output: "json",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      },
      mode === "desktop" ? desktopConfig : undefined,
    );
    writeFileSync(`.qa/lighthouse-${mode}.json`, result.report);
    const { lhr } = result;
    console.log(
      JSON.stringify(
        {
          mode,
          scores: Object.fromEntries(
            Object.entries(lhr.categories).map(([key, value]) => [
              key,
              Math.round(value.score * 100),
            ]),
          ),
          metrics: Object.fromEntries(
            [
              "first-contentful-paint",
              "largest-contentful-paint",
              "total-blocking-time",
              "cumulative-layout-shift",
              "speed-index",
            ].map((key) => [key, lhr.audits[key].displayValue]),
          ),
          concerns: Object.values(lhr.audits)
            .filter(
              (a) =>
                a.score !== null &&
                a.score < 0.9 &&
                a.details?.type !== "debugdata",
            )
            .map((a) => ({ id: a.id, title: a.title, value: a.displayValue }))
            .slice(0, 15),
        },
        null,
        2,
      ),
    );
  }
} finally {
  await chrome.kill();
}
