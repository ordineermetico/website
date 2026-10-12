import Image from "next/image";
import type { Person } from "@/lib/db";
import { renderMarkdown } from "@/lib/markdown";
import { PersonLinks } from "./PersonLinks";
import { Reveal } from "./Reveal";

/** Portrait tiles on a dark band. `withBio` shows each person's bio (used on the Team page). */
export function PeopleTiles({ people, withBio = false }: { people: Person[]; withBio?: boolean }) {
  return (
    <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {people.map((p, i) => (
        <Reveal as="li" key={p.slug} delay={(i % 4) * 100} className="flex flex-col">
          <div className="relative aspect-[4/5] overflow-hidden border border-oe-gold/25 bg-oe-softwhite/5">
            {p.photoUrl ? (
              <Image src={p.photoUrl} alt={p.name} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw" className="object-cover" />
            ) : (
              <span aria-hidden="true" className="absolute inset-0 grid place-items-center font-display text-6xl tracking-[0.1em] text-oe-gold/70">
                {p.name
                  .split(/\s+/)
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            )}
          </div>
          <h3 className="mt-6 font-display text-[1.6rem] leading-tight text-oe-softwhite">{p.name}</h3>
          <p className="label mt-2 text-oe-gold">{p.role}</p>
          {p.location ? <p className="mt-2 text-sm text-oe-muted-dark">{p.location}</p> : null}
          {withBio && p.bio ? (
            <div className="prose-oe mt-5 text-[0.95rem]! leading-relaxed text-oe-muted-dark! [&_a]:text-oe-softwhite" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.bio) }} />
          ) : null}
          <div className="mt-5">
            <PersonLinks person={p} />
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
