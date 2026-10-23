const glyphs: Record<string, string[]> = {
  S: ["11111", "10000", "10000", "11111", "00001", "00001", "11111"],
  I: ["111", "010", "010", "010", "010", "010", "111"],
  G: ["11111", "10000", "10000", "10111", "10001", "10001", "11111"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  L: ["1000", "1000", "1000", "1000", "1000", "1000", "1111"],
  "/": ["00001", "00001", "00010", "00100", "01000", "10000", "10000"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
};
export function PixelTitle() {
  let offset = 0;
  const pixels: { x: number; y: number }[] = [];
  for (const char of "SIGNAL / PLAY") {
    if (char === " ") {
      offset += 3;
      continue;
    }
    const g = glyphs[char];
    g.forEach((row, y) =>
      row.split("").forEach((bit, x) => {
        if (bit === "1") pixels.push({ x: offset + x, y });
      }),
    );
    offset += g[0].length + 1;
  }
  return (
    <h1 className="pixel-title" aria-label="Signal / Play">
      <svg
        viewBox={`0 0 ${offset} 7`}
        aria-hidden="true"
        shapeRendering="crispEdges"
      >
        {pixels.map((p, i) => (
          <rect
            key={i}
            x={p.x}
            y={p.y}
            width=".88"
            height=".88"
            fill="currentColor"
          />
        ))}
      </svg>
    </h1>
  );
}
