import Link from "next/link";
import { getDictionary } from "@/content";
import { localePath, routes } from "@/lib/i18n";
import { Arrow } from "@/components/Arrow";
import Image from "next/image";

// Rendered inside the [lang] layout. Unknown English URLs resolve here via the catch-all route.
export default function NotFound() {
  const t = getDictionary("en");
  const fr = getDictionary("fr");
  return (
    <section className="on-dark grain relative flex min-h-[92vh] items-center overflow-hidden bg-oe-black pt-[var(--header-h)] text-oe-softwhite">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 w-[42rem] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]">
        <Image src="/brand/oe-emblem-gold-transparent.png" alt="" width={1032} height={993} sizes="672px" className="h-auto w-full" />
      </div>
      <div className="container-oe relative py-24 text-center">
        <p className="eyebrow justify-center">{t.notFound.eyebrow}</p>
        <h1 className="display-lg mx-auto mt-8 max-w-3xl">{t.notFound.title}</h1>
        <p className="lede mx-auto mt-6 max-w-xl">{t.notFound.body}</p>
        <p lang="fr" className="mx-auto mt-3 max-w-xl text-sm text-oe-muted-dark">
          {fr.notFound.title} {fr.notFound.body}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn btn-solid">
            {t.notFound.home} <Arrow />
          </Link>
          <Link href={localePath("en", routes.contact)} className="btn btn-ghost">
            {t.notFound.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}
