import { profile, technologies } from "@/data/profile";
import { siteCopy } from "@/data/site";
import { TechMark, Crosshair } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";
export function BuiltWith() {
  return (
    <section id="built-with" className="built-section section-shell">
      <Reveal>
        <div className="section-kicker mono">
          <span>{siteCopy.built.label}</span>
          <Crosshair />
        </div>
        <div className="built-heading">
          <h2 data-reveal>{siteCopy.built.title}</h2>
          <div className="contexts">
            <a
              href="https://github.com/cepdnaclk/e21-3yp-SPECTRA-LEAF"
              target="_blank"
              rel="noreferrer"
              className="team-context"
            >
              <span className="leaf-mark" aria-hidden="true" />
              Spectra<span>Leaf</span>
            </a>
            <a
              href="https://www.ce.pdn.ac.lk"
              target="_blank"
              rel="noreferrer"
              className="university-context"
            >
              <span className="university-seal" aria-hidden="true">
                P
              </span>
              <span>
                {profile.education.school}
                <small>{profile.education.department}</small>
              </span>
            </a>
          </div>
        </div>
        <div className="tools-label mono">{siteCopy.built.tools}</div>
        <div className="tech-wall">
          {technologies.map((tech) => (
            <div key={tech.name} className="tech-cell">
              <TechMark name={tech.mark} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
