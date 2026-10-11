import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/content";
import { getLang, localePath, routes, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd } from "@/lib/structured-data";
import { Arrow } from "@/components/Arrow";
import { CorridorDiagram } from "@/components/CorridorDiagram";
import { CtaBand } from "@/components/CtaBand";
import { Frame } from "@/components/Frame";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: routes.firm, title: t.firm.metaTitle, description: t.firm.metaDescription });
}

export default async function FirmPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  const f = t.firm;

  return (
    <>
      <PageHero eyebrow={f.eyebrow} title={f.title} lede={f.lede} />

      {/* Why */}
      <section className="section bg-oe-ivory">
        <div className="container-oe grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow={f.why.eyebrow} title={f.why.title} />
          </div>
          <Reveal delay={120} className="space-y-6 text-[1.1rem] leading-[1.75] lg:col-span-5 lg:col-start-8 lg:pt-14">
            {f.why.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Corridor */}
      <section className="on-dark grain bg-oe-black text-oe-softwhite">
        <div className="container-oe section grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{f.corridor.eyebrow}</p>
            <h2 className="display-md mt-7">{f.corridor.title}</h2>
            <p className="lede mt-7">{f.corridor.body}</p>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-6 lg:col-start-7">
            <CorridorDiagram
              tone="dark"
              left="Reims"
              right={lang === "fr" ? "Inde" : "India"}
              topLabel={`${t.home.directions.items[0].from} → ${t.home.directions.items[0].to}`}
              bottomLabel={`${t.home.directions.items[1].from} → ${t.home.directions.items[1].to}`}
            />
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="section bg-oe-ivory">
        <div className="container-oe">
          <SectionHeading eyebrow={f.principles.eyebrow} title={f.principles.title} />
          <ul className="mt-16 grid border-t border-oe-rule sm:grid-cols-2 lg:grid-cols-5">
            {f.principles.items.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 100}
                className="border-b border-oe-rule py-10 lg:border-b-0 lg:px-6 lg:first:pl-0 lg:[&:not(:first-child)]:border-l"
              >
                <p className="font-display text-[2rem] leading-none text-oe-ink">{p.title}</p>
                <p className="mt-3 font-display text-xl italic text-oe-graphite">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Structure */}
      <section className="section border-t border-oe-rule bg-oe-paper">
        <div className="container-oe">
          <SectionHeading eyebrow={f.structure.eyebrow} title={f.structure.title} />
          <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center">
            <Reveal className="w-full">
              <Frame className="bg-oe-ivory p-9 text-center sm:p-12">
                <p className="label relative text-oe-bronze">{f.structure.parent.label}</p>
                <p className="relative mt-5 font-display text-4xl text-oe-ink">{f.structure.parent.name}</p>
                <p className="relative mx-auto mt-5 max-w-xl text-oe-graphite">{f.structure.parent.role}</p>
              </Frame>
            </Reveal>
            <Reveal delay={120} className="flex flex-col items-center py-2" aria-hidden="true">
              <span className="block h-14 w-px bg-oe-gold" />
              <span className="label my-3 text-oe-graphite">{f.structure.link}</span>
              <span className="block h-14 w-px bg-oe-gold" />
            </Reveal>
            <p className="sr-only">{f.structure.link}</p>
            <Reveal delay={200} className="w-full">
              <div className="border border-dashed border-oe-gold/70 bg-oe-ivory/60 p-9 text-center sm:p-12">
                <p className="label text-oe-bronze">{f.structure.child.label}</p>
                <p className="mt-5 font-display text-4xl text-oe-ink">{f.structure.child.name}</p>
                <p className="label mt-4 text-oe-graphite">{f.structure.child.status}</p>
                <p className="mx-auto mt-5 max-w-xl text-oe-graphite">{f.structure.child.role}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section bg-oe-ivory">
        <div className="container-oe grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{f.founder.eyebrow}</p>
            <div className="mt-8 flex aspect-[4/5] w-full max-w-sm flex-col items-center justify-center gap-6 border border-oe-rule bg-oe-paper p-6 text-center">
              <span aria-hidden="true" className="font-display text-7xl tracking-[0.12em] text-oe-gold">
                CK
              </span>
              <Placeholder label={f.founder.photoPlaceholder} />
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            <h2 className="display-md">{f.founder.name}</h2>
            <p className="label mt-4 text-oe-bronze">{f.founder.role} · Reims</p>
            <div className="mt-10 space-y-6 text-[1.08rem] leading-[1.75]">
              {f.founder.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h3 className="label mt-14 text-oe-ink" style={{ fontFamily: "var(--font-label)" }}>
              {f.founder.educationTitle}
            </h3>
            <ul className="mt-6 border-t border-oe-rule">
              {f.founder.education.map((e) => (
                <li key={e.school} className="flex flex-col justify-between gap-1 border-b border-oe-rule py-5 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="font-display text-[1.4rem] text-oe-ink">{e.school}</span>
                  <span className="text-[0.95rem] text-oe-graphite sm:text-right">{e.detail}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Placeholder label={f.founder.linkedinPlaceholder} />
            </p>
          </Reveal>
        </div>
      </section>

      {/* Partner mention */}
      <section className="border-t border-oe-rule bg-oe-ivory">
        <div className="container-oe section-tight flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Reveal>
            <p className="eyebrow">{f.partners.eyebrow}</p>
            <p className="mt-5 font-display text-3xl text-oe-ink">{f.partners.body}</p>
          </Reveal>
          <Reveal delay={100}>
            <Link href={`${localePath(lang, routes.markets)}#france-india`} className="link-arrow whitespace-nowrap">
              {t.nav.markets} <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand lang={lang} t={t} />
      <JsonLd data={breadcrumbLd(lang, t, [{ name: t.nav.firm, path: routes.firm }])} />
    </>
  );
}
