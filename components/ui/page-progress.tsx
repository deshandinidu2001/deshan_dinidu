"use client";
import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
export function PageProgress() {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      ref.current?.style.setProperty(
        "--page-progress",
        String(max > 0 ? scrollY / max : 0),
      );
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <a
      ref={ref}
      className="page-progress"
      href="#"
      aria-label="Back to top; ring shows page progress"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
      }}
    >
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle className="progress-track" cx="20" cy="20" r="17" />
        <circle
          className="progress-value"
          cx="20"
          cy="20"
          r="17"
          pathLength="1"
        />
      </svg>
      <ArrowUp size={14} aria-hidden="true" />
    </a>
  );
}
