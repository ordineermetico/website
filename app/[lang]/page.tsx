import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/content";
import { getFacts } from "@/content/facts";
import { getLang, localePath, routes, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { faqLd } from "@/lib/structured-data";
import { getPartners, joinNames } from "@/lib/db";
import { Arrow } from "@/components/Arrow";
import { CorridorDiagram } from "@/components/CorridorDiagram";
import { Faq } from "@/components/Faq";
import { SourceLine } from "@/components/Facts";
import { Frame } from "@/components/Frame";
import { JsonLd } from "@/components/JsonLd";
import { PartnerHouses } from "@/components/PartnerHouses";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const revalidate = 300;

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  return {
    ...pageMetadata({ lang, path: "/", title: t.home.metaTitle, description: t.home.metaDescription }),
    title: { absolute: t.home.metaTitle },
  };
}

export default async function Home({ params }: LangParams) {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  const h = t.home;
  const [wineDuty] = getFacts(["wine-duty"]);
  const partners = await getPartners(lang);
  const houses = joinNames(partners.map((p) => p.name), lang);
  // The FAQ answer about partner houses follows the live list; it is dropped if no house is published.
  const faq = t.faq
    .map((item) => (item.a.includes("{houses}") ? (houses ? { ...item, a: item.a.replace("{houses}", houses) } : null) : item))
    .filter((item): item is (typeof t.faq)[number] => item !== null);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="on-dark grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-oe-black text-oe-softwhite">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 55% at 72% 46%, rgba(183,154,98,0.13), rgba(17,17,17,0) 70%), radial-gradient(40% 40% at 10% 100%, rgba(183,154,98,0.06), rgba(17,17,17,0) 70%)",
          }}
        />
        <div className="container-oe grid flex-1 items-center gap-14 pt-[calc(var(--header-h)+3rem)] pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-[var(--header-h)]">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <p className="eyebrow hero-in" style={{ ["--d" as string]: "200ms" }}>
              {h.hero.eyebrow}
            </p>
            <h1 className="display-xl mt-8 text-oe-softwhite">
              <span className="hero-in block" style={{ ["--d" as string]: "350ms" }}>
                {h.hero.titleA}
              </span>
              <span className="hero-in block italic text-oe-gold" style={{ ["--d" as string]: "520ms" }}>
                {h.hero.titleB}
              </span>
            </h1>
            <p className="lede hero-in mt-9 max-w-xl text-[1.08rem]! sm:text-[1.2rem]!" style={{ ["--d" as string]: "700ms" }}>
              {h.hero.body}
            </p>
            <div className="hero-in mt-12 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "860ms" }}>
              <Link href={localePath(lang, routes.contact)} className="btn btn-solid">
                {h.hero.primary} <Arrow />
              </Link>
              <Link href={localePath(lang, routes.approach)} className="btn btn-ghost">
                {h.hero.secondary}
              </Link>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
            <Frame className="emblem-in w-[15rem] p-8 sm:w-[19rem] sm:p-10 lg:w-full lg:max-w-[27rem] lg:p-14">
              <Image
                src="/brand/oe-emblem-gold-transparent.png"
                alt="Ordine Ermetico emblem: a tree of life within a circle"
                width={1032}
                height={993}
                priority
                sizes="(min-width: 1024px) 380px, 240px"
                className="relative h-auto w-full"
              />
            </Frame>
          </div>
        </div>

        <div className="container-oe relative pb-10">
          <hr className="rule" />
          <div className="mt-6 flex items-center justify-between gap-6">
            <p className="label text-oe-muted-dark">{h.hero.line}</p>
            <p className="label hidden items-center gap-4 text-oe-muted-dark sm:flex">
              {t.meta.descriptor}
              <span aria-hidden="true" className="relative block h-8 w-px overflow-hidden bg-oe-gold/20">
                <span className="scroll-cue absolute inset-0 bg-oe-gold" />
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Premise ─────────────────────────────────────────── */}
      <section className="section grain bg-oe-ivory">
        <div className="container-oe grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{h.intro.eyebrow}</p>
            <h2 className="display-lg mt-7">{h.intro.title}</h2>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5 lg:pt-16">
            <p className="text-[1.15rem] leading-[1.75] text-oe-ink">{h.intro.body}</p>
            <hr className="rule my-9 w-16 bg-oe-gold!" />
            <p className="text-oe-graphite">{h.intro.aside}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Two directions ──────────────────────────────────── */}
      <section className="section-tight bg-oe-ivory pb-[clamp(5rem,11vw,10rem)]">
        <div className="container-oe">
          <SectionHeading eyebrow={h.directions.eyebrow} title={h.directions.title} />
          <Reveal className="mx-auto mt-16 max-w-3xl">
            <CorridorDiagram
              left="Reims"
              right={lang === "fr" ? "Inde" : "India"}
              topLabel={`${h.directions.items[0].from} → ${h.directions.items[0].to}`}
              bottomLabel={`${h.directions.items[1].from} → ${h.directions.items[1].to}`}
            />
          </Reveal>
          <div className="mt-20 grid gap-px border border-oe-rule bg-oe-rule md:grid-cols-2">
            {h.directions.items.map((d, i) => (
              <Reveal key={d.title} delay={i * 150} className="bg-oe-ivory p-9 sm:p-12">
                <div className="flex items-center justify-between gap-4">
                  <p className="label text-oe-bronze">
                    {d.from} <span aria-hidden="true">→</span> {d.to}
                  </p>
                  <p className="label text-oe-graphite">{d.label}</p>
                </div>
                <h3 className="display-sm mt-10">{d.title}</h3>
                <p className="mt-5 text-oe-graphite">{d.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ────────────────────────────────────── */}
      <section className="section border-t border-oe-rule bg-oe-paper">
        <div className="container-oe">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow={h.capabilities.eyebrow} title={h.capabilities.title} />
            <Reveal>
              <Link href={localePath(lang, routes.capabilities)} className="link-arrow whitespace-nowrap">
                {h.capabilities.cta} <Arrow />
              </Link>
            </Reveal>
          </div>
          <ol className="mt-16 grid border-t border-oe-rule sm:grid-cols-2 lg:grid-cols-4">
            {t.capabilityList.map((c, i) => (
              <Reveal
                as="li"
                key={c.id}
                delay={i * 120}
                className="group relative border-b border-oe-rule py-10 sm:px-8 sm:odd:pl-0 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:[&:not(:first-child)]:border-l"
              >
                <Link href={`${localePath(lang, routes.capabilities)}#${c.id}`} className="block">
                  <p className="label text-oe-bronze">{c.number}</p>
                  <h3 className="mt-6 font-display text-[1.6rem] leading-tight text-oe-ink">{c.title}</h3>
                  <p className="mt-4 text-[0.98rem] text-oe-graphite">{c.summary}</p>
                  <span className="link-arrow mt-8 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────── */}
      <section className="section bg-oe-ivory">
        <div className="container-oe">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow={h.process.eyebrow} title={h.process.title} body={h.process.body} />
            <Reveal>
              <Link href={localePath(lang, routes.approach)} className="link-arrow whitespace-nowrap">
                {h.process.cta} <Arrow />
              </Link>
            </Reveal>
          </div>
          <div className="mt-20">
            <ProcessSteps stages={t.approach.stages} />
          </div>
        </div>
      </section>

      {/* ── India–EU FTA (feature band) ─────────────────────── */}
      <section className="on-dark grain relative overflow-hidden bg-oe-black text-oe-softwhite">
        <div className="container-oe section grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{h.fta.eyebrow}</p>
            <h2 className="display-md mt-7">{h.fta.title}</h2>
            <p className="lede mt-7">{h.fta.body}</p>
            <Link href={localePath(lang, routes.markets)} className="link-arrow mt-10">
              {h.fta.cta} <Arrow />
            </Link>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7">
            <Frame className="p-8 sm:p-14">
              <p className="label relative text-oe-muted-dark">{h.fta.caption}</p>
              <div className="relative mt-10 grid grid-cols-[1fr_auto_1fr] items-end gap-4 sm:gap-8">
                <div>
                  <p className="label text-oe-muted-dark">{h.fta.from}</p>
                  <p className="mt-3 font-display text-[3.4rem] leading-none text-oe-softwhite/55 line-through decoration-oe-gold/60 decoration-1 sm:text-[6rem]">
                    150%
                  </p>
                </div>
                <span aria-hidden="true" className="mb-6 block h-px w-10 bg-oe-gold sm:mb-10 sm:w-20" />
                <div>
                  <p className="label text-oe-gold">{h.fta.to}</p>
                  <p className="mt-3 font-display text-[3.4rem] leading-none text-oe-gold sm:text-[6rem]">20%</p>
                </div>
              </div>
              <p className="relative mt-10 text-[0.95rem] leading-relaxed text-oe-muted-dark">{wineDuty.text[lang]}</p>
              <div className="relative [&_p]:text-oe-muted-dark! [&_a]:text-oe-softwhite/80 [&_span.label]:text-oe-gold!">
                <SourceLine fact={wineDuty} label={t.common.source} />
              </div>
            </Frame>
          </Reveal>
        </div>
      </section>

      {/* ── Partner Houses ──────────────────────────────────── */}
      <section className="section bg-oe-ivory">
        <div className="container-oe">
          <SectionHeading eyebrow={h.partners.eyebrow} title={h.partners.title} body={h.partners.body} align="center" />
          <div className="mt-16">
            <PartnerHouses houses={partners} />
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="section border-t border-oe-rule bg-oe-paper">
        <div className="container-oe grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={h.faq.eyebrow} title={h.faq.title} />
          </div>
          <div className="lg:col-span-8">
            <Faq items={faq} />
          </div>
        </div>
        <JsonLd data={faqLd(faq)} />
      </section>

      {/* ── Closing CTA ─────────────────────────────────────── */}
      <section className="section grain bg-oe-ivory">
        <div className="container-oe">
          <Reveal>
            <Frame className="px-6 py-20 text-center sm:px-16 sm:py-28" color="var(--color-oe-gold)">
              <div className="relative">
                <p className="eyebrow justify-center">{h.closing.eyebrow}</p>
                <h2 className="display-lg mx-auto mt-8 max-w-3xl">{h.closing.title}</h2>
                <p className="lede mx-auto mt-7 max-w-xl">{h.closing.body}</p>
                <Link href={localePath(lang, routes.contact)} className="btn btn-solid mt-12">
                  {h.closing.cta} <Arrow />
                </Link>
              </div>
            </Frame>
          </Reveal>
        </div>
      </section>
    </>
  );
}
