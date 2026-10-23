import {
  Braces,
  Cloud,
  Cpu,
  PanelsTopLeft,
  Smartphone,
  Plus,
} from "lucide-react";
import { siteCopy } from "@/data/site";
import { Reveal } from "@/components/motion/reveal";
const icons = {
  web: PanelsTopLeft,
  mobile: Smartphone,
  backend: Braces,
  ai: Cpu,
  cloud: Cloud,
};
export function Capabilities() {
  return (
    <section id="capabilities" className="capabilities-section section-shell">
      <Reveal>
        <div className="section-kicker mono">
          <span>{siteCopy.capabilities.label}</span>
          <Plus size={17} />
        </div>
        <h2 className="display-heading" data-reveal>
          {siteCopy.capabilities.title}
        </h2>
        <div className="capabilities-grid">
          {siteCopy.capabilities.items.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <article
                className={`capability capability-${i}`}
                key={item.title}
              >
                <div className="capability-icon">
                  <Icon strokeWidth={1} />
                  <span className="icon-orbit" />
                </div>
                <span className="mono capability-index">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
        <div className="capability-process mono">
          {siteCopy.capabilities.process.map((step, i) => (
            <span key={step}>
              <i>0{i + 1}</i>
              {step}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
