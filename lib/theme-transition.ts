"use client";
import { flushSync } from "react-dom";
let changing = false;

export async function toggleThemeFromButton(button: HTMLButtonElement) {
  if (changing) return;
  const root = document.documentElement;
  const theme = root.dataset.theme === "dark" ? "light" : "dark";
  const apply = () => {
    root.dataset.theme = theme;
    try {
      localStorage.setItem("signal-theme", theme);
    } catch {}
    window.dispatchEvent(new Event("theme-change"));
  };
  if (
    !document.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    apply();
    return;
  }
  changing = true;
  const box = button.getBoundingClientRect(),
    x = box.left + box.width / 2,
    y = box.top + box.height / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
  root.dataset.themeTransition = "true";
  const transition = document.startViewTransition(async () => {
    flushSync(apply);
    // Snapshot the complete incoming image so the circular reveal never exposes
    // an empty image box while a newly selected theme asset is decoding.
    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>(
        `[data-hero-theme="${theme}"] img`,
      ),
    );
    await Promise.all(images.map((image) => image.decode().catch(() => {})));
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
  });
  try {
    await transition.ready;
    const animations = [
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 580,
          easing: "cubic-bezier(.22,1,.36,1)",
          pseudoElement: "::view-transition-new(root)",
        },
      ).finished,
    ];
    if (document.querySelector(".hero-scene-mask")) {
      animations.push(
        root.animate(
          { opacity: [1, 0] },
          {
            duration: 400,
            easing: "ease",
            pseudoElement: "::view-transition-old(hero-workbench)",
          },
        ).finished,
        root.animate(
          { opacity: [0, 1] },
          {
            duration: 400,
            easing: "ease",
            pseudoElement: "::view-transition-new(hero-workbench)",
          },
        ).finished,
      );
    }
    await Promise.all(animations);
    await transition.finished;
  } catch {
    transition.skipTransition();
  } finally {
    delete root.dataset.themeTransition;
    changing = false;
  }
}
