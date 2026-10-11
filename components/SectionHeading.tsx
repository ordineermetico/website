import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  as: Tag = "h2",
  size = "md",
  children,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
  size?: "md" | "lg";
  children?: ReactNode;
}) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p> : null}
      <Tag className={`${size === "lg" ? "display-lg" : "display-md"} mt-6`}>{title}</Tag>
      {body ? <p className={`lede mt-6 ${center ? "mx-auto" : ""} max-w-2xl`}>{body}</p> : null}
      {children}
    </Reveal>
  );
}
