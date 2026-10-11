import type { ReactNode } from "react";

/** Quiet single-column layout for legal pages. */
export function LegalLayout({ title, lede, children }: { title: string; lede?: string; children: ReactNode }) {
  return (
    <article className="bg-oe-ivory pt-[calc(var(--header-h)+4rem)] pb-28 sm:pt-[calc(var(--header-h)+6rem)]">
      <div className="container-narrow">
        <h1 className="display-lg">{title}</h1>
        {lede ? <p className="lede mt-6">{lede}</p> : null}
        <hr className="rule mt-12" />
        <div className="mt-4">{children}</div>
      </div>
    </article>
  );
}
