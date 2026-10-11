import type { ReactNode } from "react";

/** The signature OE frame: a fine double hairline with small concave corners. Use sparingly. */
export function Frame({
  children,
  className = "",
  color,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div className={`oe-frame ${className}`} style={color ? ({ "--frame-c": color } as React.CSSProperties) : undefined}>
      <span aria-hidden="true" className="frame-layer" />
      <span aria-hidden="true" className="frame-layer inner" />
      {children}
    </div>
  );
}
