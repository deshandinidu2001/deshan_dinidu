import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { siteCopy } from "@/data/site";
import { ProjectArt } from "@/components/ui/project-art";
import { TransitionLink } from "@/components/ui/transition-link";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return { title: p?.name || "Project", description: p?.description };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <main id="main" className="case-page section-shell">
      <TransitionLink className="text-link" href="/#work">
        <ArrowLeft size={16} />
        {siteCopy.work.back}
      </TransitionLink>
      <div className="case-heading">
        <span className="mono small-label">
          SELECTED WORK /{" "}
          {String(projects.indexOf(project) + 1).padStart(2, "0")}
        </span>
        <h1>{project.name}</h1>
        <p>{project.subtitle}</p>
      </div>
      <div className="case-art">
        <ProjectArt project={project} priority />
      </div>
      <p className="case-art-caption mono">{siteCopy.work.schematic}</p>
      <div className="case-details">
        <aside>
          <span className="mono small-label">{siteCopy.work.stack}</span>
          <div className="project-tags mono">
            {project.stack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <a
            href={project.repository}
            className="button button-primary"
            target="_blank"
            rel="noreferrer"
          >
            {siteCopy.work.repository}
            <ArrowUpRight size={16} />
          </a>
        </aside>
        <div>
          <section>
            <h2>{siteCopy.work.context}</h2>
            <p>{project.context}</p>
            <p>{project.description}</p>
          </section>
          <section>
            <h2>{siteCopy.work.scope}</h2>
            <ul>
              {project.scope.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
          <section className="case-boundaries">
            <h2>{siteCopy.work.boundaries}</h2>
            <p>{project.note}</p>
            <small>{project.source}</small>
          </section>
        </div>
      </div>
      <TransitionLink className="next-project" href={`/work/${next.slug}`}>
        <span className="mono">{siteCopy.work.next}</span>
        <h2>{next.name}</h2>
        <ArrowUpRight size={40} />
      </TransitionLink>
    </main>
  );
}
