"use client";
import { useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Contributions } from "@/lib/contributions";
import { profile } from "@/data/profile";
import { siteCopy } from "@/data/site";
import { useScrollMotion } from "@/hooks/use-scroll-motion";
export function ContributionMap({ data }: { data: Contributions }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useScrollMotion();
  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(".heat-cell", {
        opacity: 0,
        scale: 0.4,
        stagger: { each: 0.002, from: "start" },
        duration: 0.35,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );
  const firstDay = new Date(`${data.from}T12:00:00Z`).getUTCDay();
  const days = [...Array.from({ length: firstDay }, () => null), ...data.days];
  const weekCount = Math.ceil(days.length / 7);
  return (
    <section ref={ref} className="contribution-section section-shell">
      <div className="contribution-panel">
        <div className="contribution-intro">
          <div className="mono small-label">
            <Github size={14} />
            {siteCopy.contributions.label}
          </div>
          <h2>{siteCopy.contributions.title}</h2>
          <p>{siteCopy.contributions.description}</p>
          <a
            className="text-link"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            {siteCopy.contributions.github}
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="activity">
          <div className="activity-heading">
            <div>
              <strong>{data.total}</strong>
              <span className="mono">
                {" "}
                contributions
                <br />
                {data.from.slice(0, 4)}
              </span>
            </div>
            <span className="snapshot-badge mono">
              <i />
              {data.mode === "live"
                ? siteCopy.contributions.live
                : siteCopy.contributions.snapshot}
            </span>
          </div>
          <div
            className="heat-scroll"
            tabIndex={0}
            role="region"
            aria-label="GitHub activity calendar, scroll horizontally for all days"
          >
            <div
              className="heatmap"
              role="img"
              aria-label={`${data.total} GitHub contributions from ${data.from} to ${data.to}`}
              style={{ gridTemplateColumns: `repeat(${weekCount},1fr)` }}
            >
              {days.map((day, i) => (
                <span
                  key={day?.date || i}
                  className={`heat-cell level-${day?.level || 0} ${!day ? "empty-cell" : ""}`}
                  title={
                    day
                      ? `${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`
                      : undefined
                  }
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
          <div className="activity-footer mono">
            <span>
              {data.from} — {data.to}
              <br />
              <small>
                {data.mode === "snapshot"
                  ? `Saved ${data.capturedAt}`
                  : "Cached for up to one hour"}
              </small>
            </span>
            <div className="heat-legend">
              {siteCopy.contributions.less}
              {[0, 1, 2, 3, 4].map((i) => (
                <i key={i} className={`level-${i}`} />
              ))}
              {siteCopy.contributions.more}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
