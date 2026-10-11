import Image from "next/image";
import type { ReactNode } from "react";

/** Ivory page header for inner pages: eyebrow, large editorial title, lede, and a faint emblem watermark. */
export function PageHero({ eyebrow, title, lede, children }: { eyebrow: string; title: string; lede?: string; children?: ReactNode }) {
  return (
    <section className="grain relative overflow-hidden border-b border-oe-rule/70 bg-oe-ivory pt-[calc(var(--header-h)+4rem)] pb-20 sm:pt-[calc(var(--header-h)+6.5rem)] sm:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-16 w-[30rem] opacity-[0.07] sm:-right-10 lg:right-[4%] lg:w-[34rem]">
        <Image src="/brand/oe-emblem-bronze-transparent.png" alt="" width={1032} height={993} sizes="544px" className="h-auto w-full" />
      </div>
      <div className="container-oe">
        <p className="eyebrow hero-in">{eyebrow}</p>
        <h1 className="display-lg hero-in mt-8 max-w-4xl text-oe-ink" style={{ ["--d" as string]: "120ms" }}>
          {title}
        </h1>
        {lede ? (
          <p className="lede hero-in mt-8 max-w-2xl" style={{ ["--d" as string]: "240ms" }}>
            {lede}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
