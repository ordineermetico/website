import type { Locale } from "@/lib/i18n";
import type { Fact } from "@/content/facts";
import { Reveal } from "./Reveal";

export function SourceLine({ fact, label }: { fact: Fact; label: string }) {
  return (
    <p className="mt-5 text-[0.8rem] leading-relaxed text-oe-graphite">
      <span className="label mr-2 text-[0.62rem] text-oe-bronze">{label}</span>
      {fact.sources.map((s, i) => (
        <span key={s.label}>
          {i > 0 ? " · " : ""}
          {s.url ? (
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-oe-rule underline-offset-4 hover:decoration-oe-bronze">
              {s.label}
            </a>
          ) : (
            s.label
          )}
          , {s.date}
        </span>
      ))}
    </p>
  );
}

/** Verified market facts, each with its source and date. */
export function FactsGrid({ facts, lang, sourceLabel }: { facts: Fact[]; lang: Locale; sourceLabel: string }) {
  return (
    <ul className="grid border-l border-t border-oe-rule sm:grid-cols-2 lg:grid-cols-3">
      {facts.map((f, i) => (
        <Reveal as="li" key={f.id} delay={(i % 3) * 120} className="flex flex-col border-b border-r border-oe-rule bg-oe-ivory p-8 sm:p-10">
          <p className="font-display text-[2.6rem] leading-none text-oe-bronze sm:text-5xl">{f.figure}</p>
          <p className="mt-6 flex-1 text-[0.98rem] leading-relaxed text-oe-ink">{f.text[lang]}</p>
          <SourceLine fact={f} label={sourceLabel} />
        </Reveal>
      ))}
    </ul>
  );
}
