"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
const sections = [
  "hero",
  "built-with",
  "work",
  "ai-lab",
  "capabilities",
  "about",
  "notes",
  "contact",
];
export function SignalRail() {
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();
  useEffect(() => {
    if (path !== "/") return;
    const el = ref.current!;
    const nodes = el.querySelectorAll<HTMLAnchorElement>("a");
    const targets = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        String(max ? window.scrollY / max : 0),
      );
      let active = "hero";
      targets.forEach((el) => {
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.45)
          active = el.id;
      });
      nodes.forEach((node) => {
        const current = node.hash === `#${active}`;
        node.classList.toggle("active", current);
        if (current) node.setAttribute("aria-current", "location");
        else node.removeAttribute("aria-current");
      });
      frame = 0;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, [path]);
  if (path !== "/") return null;
  return (
    <>
      <nav ref={ref} className="signal-rail" aria-label="Section navigation">
        {sections.map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={`${String(i + 1).padStart(2, "0")} / ${id.replaceAll("-", " ")}`}
            className={i === 0 ? "active" : ""}
          >
            <span />
            <small>{String(i + 1).padStart(2, "0")}</small>
          </a>
        ))}
      </nav>
      <div className="scroll-progress" aria-hidden="true">
        <span />
      </div>
    </>
  );
}
