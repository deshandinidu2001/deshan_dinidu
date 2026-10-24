"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { projects, filters } from "@/data/projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { TransitionLink } from "@/components/ui/transition-link";
import BlurText from "@/components/react-bits/BlurText";
export function SelectedWork() {
  const [filter, setFilter] = useState<string>("All"),
    [open, setOpen] = useState<string | null>("spectraleaf");
  const reduced = useReducedMotion();
  const shown = projects.filter(
    (p) => filter === "All" || p.categories.some((c) => c === filter),
  );
  return (
    <section id="work" className="work-index section-shell">
      <div className="work-index-heading">
        <div>
          <span className="mono">Selected work</span>
          <h2>
            <BlurText text="Built to connect." />
          </h2>
          <p>
            Interfaces, data, and the systems in between. A closer look at the
            problems I’m working on.
          </p>
        </div>
        <p className="script">A few ideas that became something.</p>
      </div>
      <div
        className="work-index-filters"
        role="group"
        aria-label="Filter projects"
      >
        {filters.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
            <span>
              {category === "All"
                ? projects.length
                : projects.filter((p) =>
                    p.categories.some((c) => c === category),
                  ).length}
            </span>
          </button>
        ))}
      </div>
      <div className="work-index-list">
        {shown.map((project) => (
          <article
            key={project.slug}
            className="work-index-item"
            data-open={open === project.slug}
          >
            <h3>
              <button
                type="button"
                className="work-index-toggle"
                aria-expanded={open === project.slug}
                aria-controls={`work-detail-${project.slug}`}
                onClick={() =>
                  setOpen(open === project.slug ? null : project.slug)
                }
              >
                <span className="mono work-index-number">
                  {String(projects.indexOf(project) + 1).padStart(2, "0")}
                </span>
                <span className="work-index-name">{project.name}</span>
                <span className="work-index-category mono">
                  {project.categories.join(" / ") || "In development"}
                </span>
                <Plus
                  className="work-index-plus"
                  strokeWidth={1.3}
                  size={25}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open === project.slug && (
                <motion.div
                  id={`work-detail-${project.slug}`}
                  className="work-index-detail"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="work-index-detail-inner">
                    <div>
                      <p>{project.description}</p>
                      <div className="work-index-stack mono">
                        {project.stack.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="work-index-actions">
                      <TransitionLink href={`/work/${project.slug}`}>
                        Explore the project <ArrowUpRight size={17} />
                      </TransitionLink>
                      <a
                        href={project.repository}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source code <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        ))}
      </div>
      {!shown.length && (
        <div className="work-index-empty">
          <p>AI explorations are taking shape in the lab.</p>
          <Link href="#ai-lab">
            Take a look inside <ArrowUpRight size={17} />
          </Link>
        </div>
      )}
    </section>
  );
}
