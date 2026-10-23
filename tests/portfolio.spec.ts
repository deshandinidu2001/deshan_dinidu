import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("signal-intro", "1"));
});

test("page composition, real activity, and responsive layouts", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (e) => {
    if (e.type() === "error") errors.push(e.text());
  });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Deshan Dinidu", exact: true }),
  ).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".hero-char").first()).toHaveCSS(
    "transform",
    /^(none|matrix\(1, 0, 0, 1, 0, 0\))$/,
    { timeout: 15000 },
  );
  await page.screenshot({ path: `.qa/${info.project.name}-hero.png` });
  await expect(page.locator(".snapshot-badge")).toContainText(
    "Public snapshot",
  );
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
  await page
    .locator("#work")
    .evaluate((el) => el.scrollIntoView({ block: "start" }));
  await expect(page.locator(".project-card")).toHaveCount(6);
  await expect(page.locator("#work .split-line").last()).toHaveCSS(
    "transform",
    /^(none|matrix\(1, 0, 0, 1, 0, 0\))$/,
  );
  await page.screenshot({ path: `.qa/${info.project.name}-work.png` });
  await page.locator("#ai-lab").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `.qa/${info.project.name}-lab.png` });
  await page.locator("#about").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `.qa/${info.project.name}-about.png` });
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `.qa/${info.project.name}-contact.png` });
  expect(errors).toEqual([]);
});

test("filters and project case-study navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#work");
  await page.getByRole("button", { name: "Mobile", exact: false }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page.getByRole("button", { name: /^AI\s*0/ }).click();
  await expect(page.locator(".project-card")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Visit the AI Lab" }),
  ).toBeVisible();
  await page.getByRole("button", { name: /^Systems/ }).click();
  await expect(page.locator(".project-card")).toHaveCount(5);
  await page.locator('a[href="/work/gaming-cafe"]').click();
  await expect(page).toHaveURL(/work\/gaming-cafe/);
  await expect(
    page.getByRole("heading", { name: "Gaming Café", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".case-boundaries")).toContainText("memory");
  await page.getByRole("link", { name: "All work" }).click();
  await expect(page).toHaveURL(/#work/);
});

test("theme persists, brief dialog works, and drafts render as MDX", async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const themeButton = page
    .getByRole("button", { name: "Toggle color theme" })
    .first();
  await themeButton.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await themeButton.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await themeButton.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.screenshot({ path: `.qa/${info.project.name}-light.png` });
  await page.getByRole("button", { name: "Write a project brief" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Your name").fill("Portfolio visitor");
  await dialog.getByLabel("What are you building?").fill("A connected product");
  await dialog
    .getByLabel("What should it do?")
    .fill("Connect a web interface to a useful backend service.");
  const download = page.waitForEvent("download");
  await dialog.getByRole("button", { name: "Download brief" }).click();
  expect((await download).suggestedFilename()).toBe("project-brief.txt");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page.goto("/notes/following-the-data");
  await expect(
    page.getByRole("heading", { name: "TODO: Write this field note" }),
  ).toBeVisible();
});

test("WCAG AA accessibility in both themes and the brief dialog", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Toggle color theme" })
    .first()
    .click();
  const light = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(light.violations).toEqual([]);
  await page
    .getByRole("button", { name: "Toggle color theme" })
    .first()
    .click();
  const dark = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dark.violations).toEqual([]);
  await page.getByRole("button", { name: "Write a project brief" }).click();
  const dialog = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dialog.violations).toEqual([]);
});

test("animated project transition and navigation remain usable", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#work");
  await page.locator('a[href="/work/spectraleaf"]').click();
  await expect(page).toHaveURL(/work\/spectraleaf/);
  await expect(
    page.getByRole("heading", { name: "SpectraLeaf", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".case-art img")).toBeVisible();
  await page.screenshot({ path: `.qa/${info.project.name}-case.png` });
  if (info.project.name === "mobile") {
    await page
      .getByRole("button", { name: "Open navigation", exact: true })
      .click();
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Notes" })
      .click();
    await expect(page).toHaveURL(/#notes/);
    await expect(
      page.getByRole("button", { name: "Open navigation", exact: true }),
    ).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("playground controls and reduced-motion fallbacks", async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".scene-stage canvas")).toHaveCount(0);
  await expect(page.locator(".network-fallback").first()).toBeVisible();
  await page.goto("/experiments");
  await expect(
    page.getByRole("heading", { name: "Signal / Play" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Repel", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Repel", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Resume", exact: true }),
  ).toBeVisible();
  const canvas = page.locator("canvas");
  await canvas.focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Space");
  await expect(
    page.getByRole("button", { name: "Pause", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset field" }).click();
  await page.getByRole("slider").fill("175");
  await expect(page.locator("output")).toHaveText("175");
  await page.screenshot({ path: `.qa/${info.project.name}-playground.png` });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBe(false);
});

test("intro completes and both WebGL scenes render", async ({ page }, info) => {
  test.skip(
    info.project.name !== "desktop",
    "The pinned scene sequence is a desktop composition.",
  );
  await page.addInitScript(() => sessionStorage.removeItem("signal-intro"));
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".scene-hero canvas")).toBeVisible();
  await expect(page.locator(".preloader")).toBeHidden({ timeout: 10000 });
  await page
    .locator("#ai-lab")
    .evaluate((el) => el.scrollIntoView({ block: "start" }));
  await expect(page.locator(".scene-lab canvas")).toBeVisible({
    timeout: 15000,
  });
  await expect(page.locator(".scene-lab > .network-fallback")).toHaveCSS(
    "opacity",
    "0",
  );
  await page.screenshot({ path: ".qa/desktop-lab-live.png" });
  expect(errors).toEqual([]);
});
