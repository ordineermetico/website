/** Drawn arrow. Tenor Sans has no → glyph, so we never rely on the font for it. */
export function Arrow({ className = "", direction = "right" }: { className?: string; direction?: "right" | "up" }) {
  return (
    <svg
      aria-hidden="true"
      className={`arrow inline-block ${direction === "up" ? "-rotate-90" : ""} ${className}`}
      width="22"
      height="8"
      viewBox="0 0 22 8"
      fill="none"
    >
      <path d="M0 4h20.5M17.5 1l3 3-3 3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
