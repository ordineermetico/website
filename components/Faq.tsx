import { Reveal } from "./Reveal";

/** Native disclosure: works without JavaScript and is fully crawlable. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-oe-rule">
      {items.map((item, i) => (
        <Reveal key={item.q} delay={i * 80}>
          <details className="group border-b border-oe-rule">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-7 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-[1.45rem] leading-snug text-oe-ink sm:text-[1.7rem]">{item.q}</h3>
              <span aria-hidden="true" className="relative mt-3 block size-3.5 flex-none text-oe-bronze">
                <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                <span className="absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-500 group-open:scale-y-0" />
              </span>
            </summary>
            <p className="max-w-3xl pb-8 pr-10 text-oe-graphite">{item.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
