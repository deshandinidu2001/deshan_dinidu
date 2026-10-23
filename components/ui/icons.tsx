import type { SVGProps } from "react";
export function SignalMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <path
        d="M5 24 15 7h8L13 24H5Zm10 5L27 8h5L20 29h-5Z"
        fill="currentColor"
      />
      <path d="M23 29h9v-5h-6l-3 5Z" fill="currentColor" />
    </svg>
  );
}
export function Crosshair(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
export function ReactMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      {[0, 60, 120].map((deg) => (
        <ellipse
          key={deg}
          cx="20"
          cy="20"
          rx="18"
          ry="7"
          stroke="currentColor"
          strokeWidth="1.4"
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="2.6" fill="currentColor" />
    </svg>
  );
}
export function TechMark({ name }: { name: string }) {
  if (name === "react")
    return <ReactMark className="tech-symbol" aria-hidden="true" />;
  if (name === "expo")
    return (
      <svg className="tech-symbol" viewBox="0 0 40 40" aria-hidden="true">
        <path d="m7 29 11-20h4l11 20-5 3-8-15-8 15Z" fill="currentColor" />
      </svg>
    );
  if (name === "node")
    return (
      <svg
        className="tech-symbol"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m20 3 15 8v18l-15 8-15-8V11Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16 14v12c0 4-5 3-6 2m13-3c1 4 9 3 8-1-1-3-9-1-8-6 0-4 7-5 8-1"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  if (name === "db")
    return (
      <svg
        className="tech-symbol"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <ellipse
          cx="20"
          cy="9"
          rx="12"
          ry="5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M8 9v22c0 7 24 7 24 0V9M8 19c0 7 24 7 24 0m-24 10c0 7 24 7 24 0"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  return (
    <span
      className={`tech-letter mark-${name.toLowerCase().replace(/[^a-z]/g, "")}`}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
