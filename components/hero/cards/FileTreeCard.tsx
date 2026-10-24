import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";
import { HeroCard } from "../HeroCard";
export function FileTreeCard() {
  return (
    <HeroCard id="files" title="Project structure" interactive>
      <div className="hero-file-root">
        <ChevronDown />
        <FolderOpen />
        <span>src/</span>
      </div>
      <nav aria-label="Project structure">
        <ul className="hero-file-tree">
          {[
            { name: "work", href: "#work" },
            { name: "ai-lab", href: "#ai-lab" },
            { name: "about", href: "#about" },
            { name: "toolkit", href: "#built-with" },
            { name: "contact", href: "#contact" },
          ].map(({ name, href }) => (
            <li key={name}>
              <a href={href} aria-label={`Explore ${name.replace("-", " ")}`}>
                <ChevronRight />
                <Folder />
                <span>{name}/</span>
                <span className="hero-file-go" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </HeroCard>
  );
}
