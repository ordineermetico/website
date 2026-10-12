/**
 * The corridor, drawn: Reims on one side, India on the other.
 * The upper arc (France → India) is the core; the lower, finer arc is the return route.
 */
export function CorridorDiagram({
  left,
  right,
  topLabel,
  bottomLabel,
  tone = "light",
}: {
  left: string;
  right: string;
  topLabel: string;
  bottomLabel: string;
  tone?: "light" | "dark";
}) {
  const ink = tone === "dark" ? "#F3EDE2" : "#1E1A16";
  const muted = tone === "dark" ? "#A79F93" : "#6E665C";
  const gold = "#B79A62";
  const L = 170;
  const R = 470;
  const Y = 140;
  return (
    <figure data-draw className="w-full">
      <p className="label text-center" style={{ color: muted }}>
        {topLabel}
      </p>
      <svg viewBox="0 30 640 220" className="h-auto w-full overflow-visible" role="img" aria-label={`${left} to ${right}: ${topLabel}; ${bottomLabel}`}>
        <line x1={L} y1={Y} x2={R} y2={Y} stroke={gold} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="1 7" strokeLinecap="round" />
        <path
          className="draw-path"
          style={{ ["--len" as string]: 520 }}
          d={`M${L + 14} ${Y - 4} C ${L + 110} 30, ${R - 110} 30, ${R - 14} ${Y - 4}`}
          fill="none"
          stroke={gold}
          strokeWidth="1.3"
        />
        <path
          className="draw-path"
          style={{ ["--len" as string]: 520, ["--d" as string]: "600ms" }}
          d={`M${R - 14} ${Y + 4} C ${R - 110} 250, ${L + 110} 250, ${L + 14} ${Y + 4}`}
          fill="none"
          stroke={gold}
          strokeOpacity="0.55"
          strokeWidth="0.9"
          strokeDasharray="3 4"
        />
        {/* direction marks at the crest of each arc */}
        <path d="M316 53 L324 57.5 L316 62" fill="none" stroke={gold} strokeWidth="1.3" />
        <path d="M324 218 L316 222.5 L324 227" fill="none" stroke={gold} strokeOpacity="0.7" strokeWidth="0.9" />
        {[L, R].map((x) => (
          <g key={x}>
            <circle cx={x} cy={Y} r="14" fill="none" stroke={gold} strokeOpacity="0.5" />
            <circle cx={x} cy={Y} r="4" fill={gold} />
          </g>
        ))}
        <text x={L - 26} y={Y + 9} textAnchor="end" fill={ink} style={{ font: "500 34px var(--font-display)" }}>
          {left}
        </text>
        <text x={R + 26} y={Y + 9} textAnchor="start" fill={ink} style={{ font: "500 34px var(--font-display)" }}>
          {right}
        </text>
      </svg>
      <p className="label text-center" style={{ color: muted }}>
        {bottomLabel}
      </p>
    </figure>
  );
}
