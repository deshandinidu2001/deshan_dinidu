"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { siteCopy } from "@/data/site";
import { useScrollMotion } from "@/hooks/use-scroll-motion";
export function Quote() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useScrollMotion();
  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".quote-annotation path",
        { strokeDasharray: 900, strokeDashoffset: 900 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        },
      );
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <section ref={ref} className="quote-section section-shell">
      <span className="quote-mark script" aria-hidden="true">
        “
      </span>
      <blockquote>
        <p>
          {siteCopy.quote.text}
          <svg
            className="quote-annotation"
            viewBox="0 0 700 70"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 40C177 9 447 8 681 31M67 51c175-25 395-22 530-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </p>
        <footer>
          <cite>{siteCopy.quote.author}</cite>
          <a
            href={siteCopy.quote.href}
            target="_blank"
            rel="noreferrer"
            className="mono"
          >
            {siteCopy.quote.source}
          </a>
        </footer>
      </blockquote>
    </section>
  );
}
