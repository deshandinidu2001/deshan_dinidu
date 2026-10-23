import Image from "next/image";
import type { Project } from "@/data/projects";
export function ProjectArt({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <div
      className={`project-art art-${project.visual}`}
      style={{ viewTransitionName: `project-${project.slug}` }}
    >
      <Image
        src={`/projects/${project.visual}.svg`}
        alt={`${project.name}: original conceptual system diagram, not a product screenshot`}
        fill
        sizes="(max-width: 700px) 100vw, (max-width: 1200px) 60vw, 850px"
        priority={priority}
      />
      <div className="art-shine" />
    </div>
  );
}
