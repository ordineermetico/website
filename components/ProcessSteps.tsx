import { Reveal } from "./Reveal";

type Stage = { number: string; title: string; summary: string };

/** Evaluate › Architect › Engage › Develop, as a horizontal timeline (vertical on small screens). */
export function ProcessSteps({ stages, tone = "light" }: { stages: Stage[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className="relative grid gap-0 md:grid-cols-4">
      <span
        aria-hidden="true"
        className={`absolute left-[7px] top-2 bottom-2 w-px md:left-0 md:right-0 md:top-[7px] md:bottom-auto md:h-px md:w-auto ${
          dark ? "bg-oe-gold/30" : "bg-oe-rule"
        }`}
      />
      {stages.map((s, i) => (
        <Reveal as="li" key={s.number} delay={i * 140} className="relative pb-12 pl-10 md:pb-0 md:pl-0 md:pr-8">
          <span
            aria-hidden="true"
            className={`absolute left-0 top-0 grid size-[15px] place-items-center rounded-full border ${
              dark ? "border-oe-gold/60 bg-oe-black" : "border-oe-gold bg-oe-ivory"
            }`}
          >
            <span className="size-[5px] rounded-full bg-oe-gold" />
          </span>
          <p className={`label md:mt-10 ${dark ? "text-oe-gold" : "text-oe-bronze"}`}>{s.number}</p>
          <h3 className={`mt-3 font-display text-[2rem] leading-none ${dark ? "text-oe-softwhite" : "text-oe-ink"}`}>{s.title}</h3>
          <p className={`mt-4 max-w-xs text-[0.98rem] ${dark ? "text-oe-muted-dark" : "text-oe-graphite"}`}>{s.summary}</p>
        </Reveal>
      ))}
    </ol>
  );
}
