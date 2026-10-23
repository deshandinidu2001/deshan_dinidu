"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projects, filters } from "@/data/projects";
import { siteCopy } from "@/data/site";
import { TransitionLink } from "@/components/ui/transition-link";
import { ProjectArt } from "@/components/ui/project-art";
import { Reveal } from "@/components/motion/reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
export function SelectedWork() {
  const [filter, setFilter] = useState<string>("All");
  const reduced = useReducedMotion();
  const shown = projects.filter(
    (p) => filter === "All" || p.categories.some((c) => c === filter),
  );
  return (
    <section id="work" className="work-section section-shell">
      <Reveal>
        <div className="section-kicker mono">
          <span>{siteCopy.work.label}</span>
          <span>
            {String(projects.length).padStart(2, "0")} PROJECTS / OPEN TO
            EXPLORE
          </span>
        </div>
        <div className="section-heading-row">
          <h2 className="display-heading" data-reveal>
            {siteCopy.work.title}
            <br />
            <span className="muted">{siteCopy.work.subtitle}</span>
          </h2>
          <p>{siteCopy.work.description}</p>
        </div>
      </Reveal>
      <div className="work-filters" role="group" aria-label="Filter projects">
        {filters.map((category) => (
          <button
            key={category}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
            className={filter === category ? "active" : ""}
          >
            {category}
            <sup>
              {category === "All"
                ? projects.length
                : projects.filter((p) =>
                    p.categories.some((c) => c === category),
                  ).length}
            </sup>
          </button>
        ))}
      </div>
      <motion.div
        layout={!reduced}
        className={`project-grid ${filter !== "All" ? "is-filtered" : ""}`}
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((project) => (
            <motion.article
              layout={!reduced}
              key={project.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
              className={`project-card project-${project.visual}`}
            >
              <TransitionLink
                href={`/work/${project.slug}`}
                className="project-link"
                data-cursor="view"
              >
                <div className="project-image-wrap" aria-hidden="true">
                  <ProjectArt project={project} />
                  <span className="project-open">
                    <ArrowUpRight size={21} />
                  </span>
                  <span className="project-image-label mono">
                    SYSTEM STUDY{" "}
                    {String(projects.indexOf(project) + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="project-meta">
                  <div>
                    <h3 id={`project-name-${project.slug}`}>{project.name}</h3>
                    <p id={`project-description-${project.slug}`}>
                      {project.subtitle}
                    </p>
                  </div>
                  <span className="project-number mono">
                    /{String(projects.indexOf(project) + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="project-tags mono">
                  {project.stack.slice(0, 4).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                  {project.stack.length > 4 && (
                    <span>+{project.stack.length - 4}</span>
                  )}
                </div>
              </TransitionLink>
            </motion.article>
          ))}
        </AnimatePresence>
        {!shown.length && (
          <div className="work-empty">
            <Plus size={30} />
            <p>{siteCopy.work.empty}</p>
            <Link href="#ai-lab" className="text-link">
              {siteCopy.work.emptyCta}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </motion.div>
      <div className="work-art-note mono">
        <Plus size={12} />
        {siteCopy.work.schematic}
      </div>
    </section>
  );
}
