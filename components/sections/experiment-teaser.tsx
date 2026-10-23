import { ArrowUpRight } from "lucide-react";
import { siteCopy } from "@/data/site";
import { TransitionLink } from "@/components/ui/transition-link";
export function ExperimentTeaser() {
  return (
    <section className="experiment-teaser section-shell">
      <div className="experiment-invite">
        <div>
          <span className="mono small-label">{siteCopy.experiments.label}</span>
          <h2>{siteCopy.experiments.title}</h2>
          <p>{siteCopy.experiments.description}</p>
          <TransitionLink href="/experiments" className="button button-outline">
            {siteCopy.experiments.cta}
            <ArrowUpRight size={18} />
          </TransitionLink>
        </div>
        <div className="pixel-field" aria-hidden="true">
          {Array.from({ length: 100 }, (_, i) => (
            <i
              key={i}
              style={{
                opacity: ((i * 37) % 17) / 20 + 0.1,
                transform: `scale(${i % 7 === 0 ? 1.8 : 1})`,
              }}
            />
          ))}
          <span className="pixel-cross">+</span>
          <span className="pixel-caption mono">
            {siteCopy.experiments.input}
            <br />
            {siteCopy.experiments.output}
          </span>
        </div>
      </div>
    </section>
  );
}
