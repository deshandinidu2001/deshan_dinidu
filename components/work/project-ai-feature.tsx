import { ArrowRight, BrainCircuit } from "lucide-react";
import type { ProjectStudy } from "@/data/project-studies";

export function ProjectAiFeature({
  feature,
}: {
  feature: NonNullable<ProjectStudy["aiFeature"]>;
}) {
  return (
    <section
      className="study-section study-ai-feature"
      aria-labelledby="study-ai-heading"
    >
      <div className="study-ai-heading">
        <span className="mono">AI prediction · local prototype</span>
        <h2 id="study-ai-heading">{feature.title}</h2>
        <p>{feature.intro}</p>
      </div>
      <div className="study-ai-path">
        <div className="study-ai-inputs">
          <h3>Applicant context</h3>
          <ul>
            {feature.inputs.map((input) => (
              <li key={input}>{input}</li>
            ))}
          </ul>
        </div>
        <div className="study-ai-service">
          <ArrowRight className="study-ai-arrow" size={22} aria-hidden="true" />
          <div>
            <BrainCircuit size={35} strokeWidth={1.3} aria-hidden="true" />
            <h3>Prediction service</h3>
            <p className="mono">{feature.service}</p>
          </div>
          <ArrowRight className="study-ai-arrow" size={22} aria-hidden="true" />
        </div>
        <div className="study-ai-outputs">
          <h3>Returned for review</h3>
          <dl>
            {feature.outputs.map((output) => (
              <div key={output.label}>
                <dt>{output.label}</dt>
                <dd>{output.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <p className="study-ai-note">
        Eligibility and risk are model outputs. EMI and repayment figures are
        calculations displayed alongside them, giving the prediction context
        within the application workflow.
      </p>
    </section>
  );
}
