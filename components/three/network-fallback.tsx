export function NetworkFallback({ lab = false }: { lab?: boolean }) {
  const nodes = Array.from({ length: 24 }, (_, i) => {
    const angle = i * 2.39996;
    const r = 45 + Math.sqrt(i / 24) * 165;
    return { x: 300 + Math.cos(angle) * r, y: 260 + Math.sin(angle) * r * 0.8 };
  });
  return (
    <svg
      className={`network-fallback ${lab ? "lab-fallback" : ""}`}
      viewBox="0 0 600 520"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={lab ? "lab-halo" : "hero-halo"}>
          <stop stopColor="#C8FF3D" stopOpacity=".07" />
          <stop offset="1" stopColor="#C8FF3D" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx="300"
        cy="260"
        r="220"
        fill={`url(#${lab ? "lab-halo" : "hero-halo"})`}
      />
      <g fill="none" stroke="#87949F" strokeWidth=".65" opacity=".5">
        <ellipse
          cx="300"
          cy="260"
          rx="235"
          ry="110"
          transform="rotate(-32 300 260)"
        />
        <ellipse
          cx="300"
          cy="260"
          rx="225"
          ry="120"
          transform="rotate(55 300 260)"
        />
        {nodes.map((n, i) => (
          <path
            key={i}
            d={`M${n.x} ${n.y}L${nodes[(i + 5) % 24].x} ${nodes[(i + 5) % 24].y}L300 260`}
          />
        ))}
      </g>
      <g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i % 5 === 0 ? 6 : 3}
            fill={i % 4 === 0 ? "#C8FF3D" : "#87949F"}
          />
        ))}
      </g>
      <g stroke="#C8FF3D" fill="#151b14" strokeWidth="1">
        <path d="m300 199 53 30v61l-53 31-53-31v-61Z" />
        <path d="m247 229 53 31 53-31m-53 31v61m0-122v61" />
      </g>
    </svg>
  );
}
