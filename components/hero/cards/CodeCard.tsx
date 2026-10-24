import { HeroCard } from "../HeroCard";

const lines = [
  <>
    <span className="code-punctuation">const </span>
    <span className="code-key">deshan</span>
    <span className="code-punctuation"> = {"{"}</span>
  </>,
  <>
    {"  "}
    <span className="code-key">role</span>
    <span className="code-punctuation">: </span>
    <span className="code-string">&apos;Full Stack + AI&apos;</span>
    <span className="code-punctuation">,</span>
  </>,
  <>
    {"  "}
    <span className="code-key">builds</span>
    <span className="code-punctuation">: [</span>
    <span className="code-string">
      &apos;Web&apos;, &apos;Mobile&apos;, &apos;IoT&apos;
    </span>
    <span className="code-punctuation">],</span>
  </>,
  <>
    {"  "}
    <span className="code-key">stack</span>
    <span className="code-punctuation">: [</span>
    <span className="code-string">
      &apos;Next.js&apos;, &apos;Python&apos;, &apos;C&apos;
    </span>
    <span className="code-punctuation">],</span>
  </>,
  <>
    {"  "}
    <span className="code-key">goal</span>
    <span className="code-punctuation">: </span>
    <span className="code-string">&apos;Better software&apos;</span>
    <span className="code-punctuation">,</span>
  </>,
  <>
    <span className="code-punctuation">{"};"}</span>
  </>,
];
export function CodeCard() {
  return (
    <HeroCard id="code" title="deshan.ts">
      <div className="hero-code">
        {lines.map((line, i) => (
          <div className="hero-code-line" key={i}>
            {line}
          </div>
        ))}
      </div>
    </HeroCard>
  );
}
