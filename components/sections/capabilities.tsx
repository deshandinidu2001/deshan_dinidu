"use client";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Braces,
  Cloud,
  Cpu,
  PanelsTopLeft,
  Smartphone,
  Plus,
} from "lucide-react";
import { motion } from "motion/react";
import { siteCopy } from "@/data/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { CapabilitiesPrelude } from "./capabilities-prelude";
const icons = {
  web: PanelsTopLeft,
  mobile: Smartphone,
  backend: Braces,
  ai: Cpu,
  cloud: Cloud,
};
gsap.registerPlugin(ScrollTrigger, useGSAP);
const details = [
  [
    "React and Next.js interfaces",
    "Connected application flows",
    "Responsive, accessible interaction",
  ],
  [
    "React Native and Expo",
    "Interfaces for real devices",
    "Clear states, from loading to offline",
  ],
  [
    "API and data-flow design",
    "Storage and integration boundaries",
    "Errors that the interface can handle",
  ],
  [
    "Context and source-aware interfaces",
    "Useful model interaction patterns",
    "Prototypes with clear limitations",
  ],
  [
    "Application configuration",
    "Cloud service connections",
    "Release notes and setup documentation",
  ],
];
export function Capabilities() {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null),
    [selected, setSelected] = useState<number | null>(null);
  const reduced = useReducedMotion(),
    active = hovered ?? selected;
  useGSAP(
    () => {
      if (reduced) return;
      const cards = Array.from(
        ref.current?.querySelectorAll<HTMLElement>(".service-card") ?? [],
      );
      cards.forEach((card, i) =>
        gsap.fromTo(
          card,
          { opacity: 0, y: 45, clipPath: "inset(12% 0 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.7,
            ease: "power3.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: {
              trigger: card,
              start: `top ${85 - (i % 3) * 4}%`,
              once: true,
            },
          },
        ),
      );
      const mm = gsap.matchMedia();
      mm.add("(min-width:1024px)", () => {
        const intro = ref.current?.querySelector<HTMLElement>(
          ".capabilities-prelude",
        );
        if (intro)
          ScrollTrigger.create({
            trigger: intro,
            start: "top 90px",
            end: "+=220",
            pin: true,
            pinType: "transform",
            pinSpacing: true,
            anticipatePin: 1,
          });
      });
      const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        cancelAnimationFrame(refresh);
        mm.revert();
      };
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <section
      ref={ref}
      id="capabilities"
      className="services-section section-shell"
    >
      <CapabilitiesPrelude />
      <div className="services-body">
        <div className="services-heading">
          <span className="mono">What I can help with</span>
          <p className="script">
            The parts change. The thinking connects them.
          </p>
        </div>
        <div className="service-grid">
          {siteCopy.capabilities.items.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons],
              open = active === i;
            return (
              <article
                className={`service-card service-card-${i}`}
                key={item.title}
                data-active={open}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "touch") setHovered(i);
                }}
                onPointerLeave={() => setHovered(null)}
              >
                <motion.span
                  className="service-card-wash"
                  aria-hidden="true"
                  initial={false}
                  animate={{ scaleY: open ? 1 : 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <div className="service-card-top">
                  <Icon size={30} strokeWidth={1.2} aria-hidden="true" />
                  <span className="mono">0{i + 1}</span>
                </div>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`service-details-${i}`}
                    onClick={() => setSelected(selected === i ? null : i)}
                  >
                    {item.title}
                    <Plus size={17} aria-hidden="true" />
                  </button>
                </h3>
                <p>{item.text}</p>
                <motion.div
                  id={`service-details-${i}`}
                  className="service-details"
                  aria-hidden={!open}
                  initial={false}
                  animate={{ opacity: open ? 1 : 0, y: open ? 0 : 10 }}
                  transition={{
                    duration: reduced ? 0 : 0.25,
                    delay: open && !reduced ? 0.08 : 0,
                  }}
                >
                  <ul>
                    {details[i].map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                </motion.div>
                <span className="service-card-hint mono" aria-hidden="true">
                  Explore this connection ↗
                </span>
              </article>
            );
          })}
        </div>
        <div className="services-process mono">
          {siteCopy.capabilities.process.map((step, i) => (
            <span key={step}>
              <i>0{i + 1}</i>
              {step}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
