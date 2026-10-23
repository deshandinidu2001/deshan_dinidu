"use client";
let pending: (() => void) | null = null;
let timeout: ReturnType<typeof setTimeout> | undefined;
export function finishRouteTransition() {
  if (timeout) clearTimeout(timeout);
  pending?.();
  pending = null;
}
export function beginRouteTransition(navigate: () => void) {
  finishRouteTransition();
  const transition = document.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        pending = resolve;
        timeout = setTimeout(finishRouteTransition, 2400);
        navigate();
      }),
  );
  transition.ready.catch(() => {});
}
