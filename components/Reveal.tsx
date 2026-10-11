import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

/** Marks content for a quiet fade-and-rise when it enters the viewport (see RevealObserver). */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">) {
  return (
    <Tag className={`reveal ${className}`} style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined} {...rest}>
      {children}
    </Tag>
  );
}
