import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/content";
import { getPartners, getPosts, joinNames } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { getLang, localePath, routes, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/structured-data";
import { Arrow } from "@/components/Arrow";
import { CopyButton } from "@/components/CopyButton";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const revalidate = 300;

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: routes.press, title: t.press.metaTitle, description: t.press.metaDescription });
}

const colours = [
  { name: "Ivory", hex: "#F4F0E8", ink: "#1E1A16" },
  { name: "Ink", hex: "#1E1A16", ink: "#F3EDE2" },
  { name: "Black", hex: "#111111", ink: "#F3EDE2" },
  { name: "Gold", hex: "#B79A62", ink: "#111111" },
  { name: "Bronze", hex: "#7E5A1E", ink: "#F3EDE2" },
  { name: "Logo gold", hex: "#E6AA3B", ink: "#111111" },
];

export default async function PressPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  const p = t.press;
  const [partners, posts] = await Promise.all([getPartners(lang), getPosts(lang, 30)]);
  const releases = posts.filter((x) => x.kind === "press_release" || x.kind === "partnership").slice(0, 4);
  const g = p.glance;
  const glance: [string, React.ReactNode][] = [
    [g.name, "Ordine Ermetico"],
    [g.what, g.whatValue],
    [g.base, g.baseValue],
    [g.activity, g.activityValue],
    [g.categories, g.categoriesValue],
    ...(partners.length ? ([[g.partners, joinNames(partners.map((x) => x.name), lang)]] as [string, string][]) : []),
    [g.founder, "Chakravarthi Kundavarapu"],
    [g.website, site.url.replace(/^https?:\/\//, "")],
    [
      g.press,
      <a key="m" href={`mailto:${site.email}`} className="underline decoration-oe-gold underline-offset-4">
        {site.email}
      </a>,
    ],
  ];

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} lede={p.lede}>
        <div className="hero-in mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6" style={{ ["--d" as string]: "360ms" }}>
          <a href="/press/ordine-ermetico-press-kit.zip" download className="btn btn-solid">
            {p.downloadAll} <Arrow />
          </a>
          <span className="text-sm text-oe-graphite">{p.downloadAllNote}</span>
        </div>
      </PageHero>

      {/* At a glance */}
      <section className="section bg-oe-ivory">
        <div className="container-oe grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading title={p.glanceTitle} />
          </div>
          <Reveal as="dl" delay={100} className="border-t border-oe-rule lg:col-span-8">
            {glance.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-oe-rule py-4 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <dt className="label pt-1 text-oe-graphite">{k}</dt>
                <dd className="text-oe-ink">{v}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Approved descriptions */}
      <section className="section border-t border-oe-rule bg-oe-paper">
        <div className="container-oe">
          <SectionHeading title={p.textsTitle} body={p.textsIntro} />
          <div className="mt-14 grid gap-px border border-oe-rule bg-oe-rule lg:grid-cols-3">
            {p.texts.map((x, i) => (
              <Reveal key={x.label} delay={i * 100} className="flex flex-col bg-oe-ivory p-8 sm:p-10">
                <div className="flex items-center justify-between gap-4">
                  <p className="label text-oe-bronze">{x.label}</p>
                  <CopyButton text={x.text} label={p.copy} done={p.copied} />
                </div>
                <p className="mt-5 flex-1 leading-relaxed text-oe-ink">{x.text}</p>
                <p className="mt-6 text-xs text-oe-graphite">{x.text.split(/\s+/).length} {lang === "fr" ? "mots" : "words"}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="section bg-oe-ivory">
        <div className="container-oe">
          <SectionHeading title={p.logosTitle} body={p.logosIntro} />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.logos.map((l, i) => (
              <Reveal as="li" key={l.file} delay={i * 80} className="flex flex-col border border-oe-rule">
                <div className={`flex aspect-[4/3] items-center justify-center p-8 ${l.tone === "dark" ? "bg-oe-black" : "bg-oe-ivory"}`}>
                  <Image src={l.file} alt="" width={600} height={480} sizes="280px" className="h-full w-auto object-contain" />
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-oe-rule px-5 py-4">
                  <div>
                    <p className="text-[0.95rem] text-oe-ink">{l.label}</p>
                    <p className="text-xs text-oe-graphite">{l.use} · PNG</p>
                  </div>
                  <a href={l.file} download className="label text-oe-bronze underline-offset-4 hover:underline">
                    {p.download}
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="mt-16 grid gap-14 lg:grid-cols-2">
            <Reveal>
              <h3 className="label text-oe-ink" style={{ fontFamily: "var(--font-label)" }}>
                {p.rulesTitle}
              </h3>
              <ul className="mt-6 space-y-3">
                {p.rules.map((r) => (
                  <li key={r} className="flex gap-4 text-[0.98rem] text-oe-ink">
                    <span aria-hidden="true" className="mt-[0.8rem] block h-px w-4 flex-none bg-oe-gold" />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="label text-oe-ink" style={{ fontFamily: "var(--font-label)" }}>
                {p.coloursTitle}
              </h3>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {colours.map((c) => (
                  <li key={c.hex} className="border border-oe-rule">
                    <div className="flex h-20 items-end p-3 font-mono text-xs" style={{ background: c.hex, color: c.ink }}>
                      {c.hex}
                    </div>
                    <p className="px-3 py-2 text-sm text-oe-ink">{c.name}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder portrait */}
      <section className="on-dark grain bg-oe-black text-oe-softwhite">
        <div className="container-oe section grid items-center gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <Image src="/founder/chakravarthi-kundavarapu.jpg" alt={p.founderAlt} width={960} height={1200} sizes="(min-width: 768px) 360px, 90vw" className="h-auto w-full max-w-sm" />
          </Reveal>
          <Reveal delay={120} className="md:col-span-7 md:col-start-6">
            <h2 className="display-md">{p.founderTitle}</h2>
            <p className="mt-5 text-oe-muted-dark">{p.founderCaption}</p>
            <a href="/founder/chakravarthi-kundavarapu.jpg" download className="btn btn-ghost mt-10">
              {p.download} · JPG
            </a>
          </Reveal>
        </div>
      </section>

      {/* Latest releases + contact */}
      <section className="section bg-oe-ivory">
        <div className="container-oe grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading title={p.releasesTitle} />
            {releases.length ? (
              <ul className="mt-10 border-t border-oe-rule">
                {releases.map((r) => (
                  <li key={r.slug} className="border-b border-oe-rule">
                    <Link href={`${localePath(lang, routes.news)}/${r.slug}`} className="group block py-6">
                      <p className="label text-oe-graphite">{formatDate(r.publishedAt, lang)}</p>
                      <p className="mt-2 font-display text-[1.5rem] leading-snug text-oe-ink group-hover:text-oe-bronze">{r.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-8 font-display text-2xl italic text-oe-bronze">{p.releasesEmpty}</p>
            )}
            <Link href={localePath(lang, routes.news)} className="link-arrow mt-8">
              {p.allNews} <Arrow />
            </Link>
          </div>
          <Reveal delay={100} className="lg:col-span-4 lg:col-start-9">
            <div className="border border-oe-rule bg-oe-paper p-8">
              <h2 className="display-sm">{p.contactTitle}</h2>
              <p className="mt-4 text-oe-graphite">{p.contactBody}</p>
              <a href={`mailto:${site.email}?subject=${encodeURIComponent("Press enquiry")}`} className="link-line mt-3 inline-block whitespace-nowrap font-display text-[1.4rem] text-oe-ink">
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      <JsonLd data={breadcrumbLd(lang, t, [{ name: t.nav.press, path: routes.press }])} />
    </>
  );
}
