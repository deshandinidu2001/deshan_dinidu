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
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width:1024px) and (min-height:740px)",
          flowing: "(max-width:1023px), (max-height:739px)",
        },
        (context) => {
          const root = ref.current!,
            stage = root.querySelector<HTMLElement>(".services-stage")!,
            intro = root.querySelector<HTMLElement>(".capabilities-prelude")!,
            body = root.querySelector<HTMLElement>(".services-body")!;
          if (context.conditions?.desktop) {
            root.dataset.pinned = "true";
            body.inert = true;
            gsap.set(body, { autoAlpha: 0 });
            gsap.set(cards, { autoAlpha: 0, y: 55, scale: 0.96 });
            const timeline = gsap.timeline({
              defaults: { ease: "power2.inOut" },
              scrollTrigger: {
                id: "services-story",
                trigger: stage,
                start: "top top",
                end: () => `+=${window.innerHeight * 2.2}`,
                pin: true,
                pinType: "transform",
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
              onUpdate: function () {
                const showingCards = this.time() > 0.8;
                intro.inert = showingCards;
                body.inert = !showingCards;
              },
            });
            timeline
              .to({}, { duration: 0.45 })
              .to(intro, { autoAlpha: 0, y: -65, scale: 0.97, duration: 0.65 })
              .to(body, { autoAlpha: 1, duration: 0.25 }, 0.9)
              .fromTo(
                ".services-heading",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4 },
                0.95,
              )
              .to(
                cards,
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.5,
                  stagger: 0.25,
                  ease: "power3.out",
                },
                1.1,
              )
              .fromTo(
                ".services-process",
                { opacity: 0 },
                { opacity: 1, duration: 0.3 },
                2.5,
              )
              .to({}, { duration: 0.5 });
            return () => {
              delete root.dataset.pinned;
              body.inert = false;
              intro.inert = false;
            };
          }
          cards.forEach((card, i) => {
            gsap.fromTo(
              card,
              { autoAlpha: 0, y: 35 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                delay: (i % 2) * 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 88%", once: true },
              },
            );
          });
        },
      );
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
      <div className="services-stage">
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
      </div>
    </section>
  );
}
