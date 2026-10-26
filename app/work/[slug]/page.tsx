import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { projectStudies } from "@/data/project-studies";
import { TransitionLink } from "@/components/ui/transition-link";
import { ProjectGallery } from "@/components/work/project-gallery";
import { ProjectLock } from "@/components/work/project-lock";
import { ProjectAiFeature } from "@/components/work/project-ai-feature";
import { ProjectWebsitePreview } from "@/components/work/project-website-preview";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params,
    project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project" };
  const study = projectStudies[slug];
  if (!project.detailsReady || !study)
    return {
      title: `${project.name} · Coming soon`,
      description: `The ${project.name} case study is being prepared.`,
      robots: { index: false, follow: true },
    };
  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [
        {
          url: encodeURI(study.screenshots[0].src),
          width: study.screenshots[0].width,
          height: study.screenshots[0].height,
          alt: study.screenshots[0].alt,
        },
      ],
    },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const study = projectStudies[slug];
  if (!project.detailsReady || !study)
    return (
      <main id="main" className="project-study project-pending section-shell">
        <TransitionLink className="text-link study-back" href="/#work">
          <ArrowLeft size={16} />
          All work
        </TransitionLink>
        <h1>{project.name}</h1>
        <ProjectLock name={project.name} />
        <TransitionLink href="/#work" className="button button-primary">
          Explore available case studies
          <ArrowUpRight size={17} />
        </TransitionLink>
      </main>
    );
  const available = projects.filter((p) => p.detailsReady),
    next = available[(available.indexOf(project) + 1) % available.length];
  return (
    <main id="main" className="project-study section-shell">
      <TransitionLink className="text-link study-back" href="/#work">
        <ArrowLeft size={16} />
        All work
      </TransitionLink>
      <header className="study-heading">
        <p className="mono study-disciplines">
          {project.categories.join(" / ")}
        </p>
        <h1>{project.name}</h1>
        <p className="study-subtitle">{project.subtitle}</p>
        <dl className="study-facts">
          <div>
            <dt>My role</dt>
            <dd>{study.role}</dd>
          </div>
          <div>
            <dt>Project period</dt>
            <dd>{study.period}</dd>
          </div>
          <div>
            <dt>Current stage</dt>
            <dd>
              <span className="study-status-dot" aria-hidden="true" />
              {study.status}
            </dd>
          </div>
        </dl>
      </header>
      <ProjectGallery
        images={study.screenshots}
        projectName={project.name}
        cover
      />
      <section
        className="study-overview study-section"
        aria-label="Project overview and personal contribution"
      >
        <div>
          <span className="mono study-small-label">The project</span>
          <h2>
            A problem worth
            <br />
            connecting.
          </h2>
          <p>{study.purpose}</p>
          <p className="study-audience">
            <span className="mono">Built for</span>
            {study.audience}
          </p>
        </div>
        <div>
          <span className="mono study-small-label">My contribution</span>
          <h2>
            The work behind
            <br />
            the interface.
          </h2>
          <p>{study.contribution}</p>
          <p className="script study-margin-note">{study.handwritten}</p>
        </div>
      </section>
      {study.aiFeature && <ProjectAiFeature feature={study.aiFeature} />}
      <section
        className="study-section"
        aria-labelledby="study-screens-heading"
      >
        <div className="study-section-heading">
          <h2 id="study-screens-heading">A closer look.</h2>
          <p>
            Actual screens from the project. Select a view or open it at full
            size.
          </p>
        </div>
        <ProjectGallery images={study.screenshots} projectName={project.name} />
      </section>
      {study.websitePreview && study.liveUrl && (
        <section
          className="study-section"
          aria-labelledby="study-website-heading"
        >
          <div className="study-section-heading">
            <h2 id="study-website-heading">The public project website.</h2>
            <p>
              Another part of my software work: making the engineering story
              accessible beyond the dashboard.
            </p>
          </div>
          <ProjectWebsitePreview
            preview={study.websitePreview}
            url={study.liveUrl}
            name={project.name}
          />
        </section>
      )}
      <section
        className="study-section study-flow-section"
        aria-labelledby="study-flow-heading"
      >
        <div className="study-section-heading">
          <h2 id="study-flow-heading">How the pieces connect.</h2>
          <p>Follow an action through the system.</p>
        </div>
        <ol className="study-flow">
          {study.flow.map((step, i) => (
            <li key={step.title}>
              <span className="mono">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {i < study.flow.length - 1 && (
                <ArrowRight
                  className="study-flow-arrow"
                  size={18}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </section>
      <section
        className="study-section"
        aria-labelledby="study-features-heading"
      >
        <div className="study-section-heading">
          <h2 id="study-features-heading">What the platform does.</h2>
        </div>
        <ul className="study-features">
          {study.features.map((feature) => (
            <li key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section
        className="study-section study-challenge"
        aria-labelledby="study-challenge-heading"
      >
        <div>
          <p className="script study-margin-note">
            This is where the learning happened.
          </p>
          <h2 id="study-challenge-heading">The hard part.</h2>
          <p>{study.challenge}</p>
        </div>
        <div>
          <h3>How I approached it</h3>
          <p>{study.solution}</p>
        </div>
      </section>
      <section
        className="study-section study-tools"
        aria-labelledby="study-tools-heading"
      >
        <h2 id="study-tools-heading">Tools behind the work.</h2>
        <dl>
          {study.technologies.map((group) => (
            <div key={group.label}>
              <dt>{group.label}</dt>
              <dd>
                {group.tools.map((tool) => (
                  <span className="mono" key={tool}>
                    {tool}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section
        className="study-section study-outcomes"
        aria-labelledby="study-outcomes-heading"
      >
        <div>
          <h2 id="study-outcomes-heading">Where it stands.</h2>
          <ul>
            {study.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
        <aside>
          <span className="mono study-small-label">{study.status}</span>
          <p>{study.boundary}</p>
          <div className="study-links">
            <a href={project.repository} target="_blank" rel="noreferrer">
              View source code
              <ArrowUpRight size={17} />
            </a>
            {study.liveUrl && (
              <a href={study.liveUrl} target="_blank" rel="noreferrer">
                {study.liveLabel}
                <ArrowUpRight size={17} />
              </a>
            )}
          </div>
        </aside>
      </section>
      <TransitionLink className="study-next" href={`/work/${next.slug}`}>
        <span className="mono">Next case study</span>
        <span className="study-next-title">
          {next.name}
          <ArrowUpRight size={38} />
        </span>
        <span>{next.subtitle}</span>
      </TransitionLink>
      <div className="study-bottom">
        <TransitionLink className="text-link" href="/#work">
          <ArrowLeft size={16} />
          Back to selected work
        </TransitionLink>
        <TransitionLink className="text-link" href="/#contact">
          Have a project in mind?
          <ArrowUpRight size={16} />
        </TransitionLink>
      </div>
    </main>
  );
}
