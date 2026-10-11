import Link from "next/link";
import type { Dictionary } from "@/content";
import { localePath, routes, type Locale } from "@/lib/i18n";
import { Arrow } from "./Arrow";
import { Reveal } from "./Reveal";

/** Closing invitation used at the foot of inner pages. */
export function CtaBand({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <section className="border-t border-oe-rule bg-oe-paper">
      <div className="container-oe section-tight flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <Reveal>
          <p className="eyebrow">{t.home.closing.eyebrow}</p>
          <h2 className="display-md mt-6">{t.home.closing.title}</h2>
          <p className="mt-4 max-w-xl text-oe-graphite">{t.home.closing.body}</p>
        </Reveal>
        <Reveal delay={120}>
          <Link href={localePath(lang, routes.contact)} className="btn btn-solid">
            {t.home.closing.cta} <Arrow />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
