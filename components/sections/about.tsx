"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Asterisk } from "lucide-react";
import { profile } from "@/data/profile";
import { siteCopy } from "@/data/site";
import { SignalMark, TechMark } from "@/components/ui/icons";
import { useScrollMotion } from "@/hooks/use-scroll-motion";
export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useScrollMotion();
  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".about-word",
        { "--word-opacity": 0.15 },
        {
          "--word-opacity": 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-paragraph",
            start: "top 85%",
            end: "bottom 45%",
            scrub: 1,
          },
        },
      );
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(".education-panel", {
          scale: 0.95,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: ".principles-panel",
            start: "top 75%",
            end: "top 22%",
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );
  return (
    <section ref={ref} id="about" className="about-section section-shell">
      <div className="section-kicker mono">
        <span>{siteCopy.about.label}</span>
        <Asterisk size={21} />
      </div>
      <div className="about-layout">
        <div className="about-aside">
          <h2>{siteCopy.about.title}</h2>
          <div
            className="tech-orbit"
            onPointerMove={(e) => {
              if (reduced) return;
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--orbit-x",
                `${(e.clientX - r.left - r.width / 2) * 0.04}px`,
              );
              e.currentTarget.style.setProperty(
                "--orbit-y",
                `${(e.clientY - r.top - r.height / 2) * 0.04}px`,
              );
            }}
            onPointerLeave={(e) => {
              e.currentTarget.style.setProperty("--orbit-x", "0px");
              e.currentTarget.style.setProperty("--orbit-y", "0px");
            }}
          >
            <div className="orbit-guide" />
            <div className="orbit-guide orbit-guide-small" />
            <SignalMark className="orbit-center" />
            <div className="orbit-ring">
              {[
                { mark: "TS", name: "TypeScript" },
                { mark: "react", name: "React" },
                { mark: "N", name: "Next.js" },
                { mark: "node", name: "Node.js" },
                { mark: "aws", name: "AWS" },
                { mark: "expo", name: "Expo" },
              ].map((tech, i) => (
                <div
                  key={tech.name}
                  className="orbit-position"
                  style={{ transform: `rotate(${i * 60}deg)` }}
                >
                  <span
                    className="orbit-item"
                    style={{ transform: `rotate(${-i * 60}deg)` }}
                    title={tech.name}
                  >
                    <TechMark name={tech.mark} />
                  </span>
                </div>
              ))}
            </div>
            <span className="orbit-caption mono">{siteCopy.about.orbit}</span>
          </div>
          <a
            className="text-link"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            {siteCopy.ui.github}
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="about-main">
          <p className="about-paragraph">
            <span className="sr-only">{profile.about}</span>
            {profile.about.split(" ").map((word, i) => (
              <span
                key={i}
                className="about-word"
                data-word={`${word} `}
                aria-hidden="true"
              >
                {word}{" "}
              </span>
            ))}
          </p>
          <div className="about-panels">
            <article className="about-panel education-panel">
              <span className="mono panel-number">
                {siteCopy.about.foundationLabel}
              </span>
              <h3>{siteCopy.about.education}</h3>
              <div className="education-timeline">
                <span className="timeline-dot" />
                <span className="mono education-stage">
                  {profile.education.stage}
                </span>
                <h4>{profile.education.degree}</h4>
                <p>
                  {profile.education.school}
                  <br />
                  {profile.education.department}
                </p>
                <p className="education-note script">
                  {profile.education.note}
                </p>
              </div>
            </article>
            <article className="about-panel principles-panel">
              <span className="mono panel-number">
                {siteCopy.about.approachLabel}
              </span>
              <h3>{siteCopy.about.principles}</h3>
              <p className="principle-intro">{siteCopy.about.principleNote}</p>
              <ol>
                {siteCopy.about.principlesList.map((principle, i) => (
                  <li key={principle}>
                    <span className="mono">0{i + 1}</span>
                    {principle}
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
