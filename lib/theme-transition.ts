"use client";
import { flushSync } from "react-dom";
let active: ViewTransition | null = null;
let generation = 0;
let desiredTheme: "dark" | "light" | null = null;

export async function toggleThemeFromButton(button: HTMLButtonElement) {
  const root = document.documentElement;
  const current = active ? desiredTheme : root.dataset.theme;
  const theme = current === "dark" ? "light" : "dark";
  desiredTheme = theme;
  const request = ++generation;
  active?.skipTransition();
  const apply = () => {
    if (request !== generation) return;
    root.dataset.theme = theme;
    try {
      localStorage.setItem("signal-theme", theme);
    } catch {}
    window.dispatchEvent(new Event("theme-change"));
  };
  const finish = () => {
    if (request === generation) {
      delete root.dataset.themeTransition;
      active = null;
      desiredTheme = null;
    }
  };
  if (
    !document.startViewTransition ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    apply();
    finish();
    return;
  }
  const box = button.getBoundingClientRect(),
    x = box.left + box.width / 2,
    y = box.top + box.height / 2;
  const radius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );
  // Native view transitions temporarily hit-test the document snapshot rather
  // than its buttons. Forward a repeat click at this control so it never feels
  // locked while the circular reveal is playing.
  const repeatClick = (event: MouseEvent) => {
    if (request !== generation || event.target !== root) return;
    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    )
      return;
    event.stopImmediatePropagation();
    void toggleThemeFromButton(button);
  };
  window.addEventListener("click", repeatClick, true);
  root.dataset.themeTransition = "true";
  try {
    const transition = document.startViewTransition(async () => {
      if (request !== generation) return;
      flushSync(apply);
      const images = Array.from(
        document.querySelectorAll<HTMLImageElement>(
          `[data-hero-theme="${theme}"] img`,
        ),
      );
      images.forEach((image) => {
        image.loading = "eager";
      });
      // A slow or failed image must never leave the theme control locked.
      await Promise.race([
        Promise.allSettled(images.map((image) => image.decode())),
        new Promise((resolve) => setTimeout(resolve, 1200)),
      ]);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    active = transition;
    await transition.ready;
    if (request !== generation) {
      transition.skipTransition();
      return;
    }
    await root.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 550,
        easing: "cubic-bezier(.22,1,.36,1)",
        pseudoElement: "::view-transition-new(root)",
      },
    ).finished;
    await transition.finished;
  } catch {
    if (request === generation) {
      active?.skipTransition();
      apply();
    }
  } finally {
    window.removeEventListener("click", repeatClick, true);
    finish();
  }
}
