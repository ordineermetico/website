import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({ title, intro, action }: { title: string; intro?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 border-b border-oe-rule pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-[2.6rem] leading-none text-oe-ink">{title}</h1>
        {intro ? <p className="mt-4 max-w-2xl text-[0.98rem] text-oe-graphite">{intro}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function ButtonLink({ href, children, variant = "solid" }: { href: string; children: ReactNode; variant?: "solid" | "ghost" }) {
  return (
    <Link href={href} className={`btn ${variant === "solid" ? "btn-solid" : "btn-ghost"} min-h-11! px-5! py-3!`}>
      {children}
    </Link>
  );
}

const badgeTones: Record<string, string> = {
  published: "border-[#3d6b4a] text-[#2f5a3b]",
  open: "border-[#3d6b4a] text-[#2f5a3b]",
  hired: "border-[#3d6b4a] text-[#2f5a3b]",
  offer: "border-[#3d6b4a] text-[#2f5a3b]",
  draft: "border-oe-rule text-oe-graphite",
  new: "border-oe-bronze text-oe-bronze",
  reviewing: "border-oe-bronze text-oe-bronze",
  interview: "border-oe-bronze text-oe-bronze",
  scheduled: "border-oe-bronze text-oe-bronze",
  archived: "border-oe-rule text-oe-graphite",
  closed: "border-oe-rule text-oe-graphite",
  rejected: "border-oe-rule text-oe-graphite",
  withdrawn: "border-oe-rule text-oe-graphite",
  inactive: "border-[#9b2c1f] text-[#9b2c1f]",
};

export function Badge({ value, label }: { value: string; label?: string }) {
  return (
    <span className={`inline-flex items-center whitespace-nowrap border px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.16em] ${badgeTones[value] ?? "border-oe-rule text-oe-graphite"}`} style={{ fontFamily: "var(--font-label)" }}>
      {label ?? value.replace(/_/g, " ")}
    </span>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
      {children}
      {hint ? <p className="mt-2 text-xs leading-relaxed text-oe-graphite">{hint}</p> : null}
    </div>
  );
}

export function Panel({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`border border-oe-rule bg-oe-ivory p-6 sm:p-8 ${className}`}>
      {title ? (
        <h2 className="label mb-6 text-oe-bronze" style={{ fontFamily: "var(--font-label)" }}>
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="py-16 text-center font-display text-2xl italic text-oe-graphite">{children}</p>;
}

export const formatAdminDate = (iso: string | null | undefined) =>
  iso ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Paris" }).format(new Date(iso)) : "Not set";

export const formatAdminDateTime = (iso: string | null | undefined) =>
  iso
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }).format(new Date(iso))
    : "Not set";

export const FORMAT_HELP = (
  <>
    Formatting: a blank line starts a new paragraph · <code>## Heading</code> · <code>- bullet</code> · <code>1. numbered</code> · <code>**bold**</code> ·{" "}
    <code>*italic*</code> · <code>[link text](https://…)</code> · <code>&gt; quotation</code>
  </>
);
