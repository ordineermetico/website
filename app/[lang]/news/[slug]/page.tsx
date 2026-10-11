import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { getPost } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { isLocale, localePath, routes, type Locale } from "@/lib/i18n";
import { renderMarkdown } from "@/lib/markdown";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/structured-data";
import { Arrow } from "@/components/Arrow";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 300;
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ lang: string; slug: string }> };

async function load(params: Props["params"]) {
  const { lang: raw, slug } = await params;
  const lang: Locale = isLocale(raw) ? raw : "en";
  return { lang, slug, post: await getPost(lang, slug) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug, post } = await load(params);
  if (!post) return { title: getDictionary(lang).notFound.metaTitle, robots: { index: false } };
  const meta = pageMetadata({
    lang,
    path: `${routes.news}/${slug}`,
    title: post.title,
    description: post.excerpt ?? getDictionary(lang).news.metaDescription,
  });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.publishedAt, ...(post.coverImage ? { images: [post.coverImage] } : {}) },
  };
}

export default async function NewsArticle({ params }: Props) {
  const { lang, slug, post } = await load(params);
  if (!post) notFound();
  const t = getDictionary(lang);
  const n = t.news;
  const url = absoluteUrl(`${localePath(lang, routes.news)}/${slug}`);

  return (
    <>
      <article className="bg-oe-ivory pt-[calc(var(--header-h)+4rem)] pb-28 sm:pt-[calc(var(--header-h)+6rem)]">
        <header className="container-narrow">
          <Link href={localePath(lang, routes.news)} className="link-arrow">
            <Arrow className="rotate-180" /> {n.back}
          </Link>
          <p className="label mt-12 text-oe-bronze">
            {n.kinds[post.kind]} · <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang)}</time>
          </p>
          <h1 className="display-lg mt-6">{post.title}</h1>
          {post.excerpt ? <p className="lede mt-8">{post.excerpt}</p> : null}
          {!post.translated ? <p className="mt-6 text-sm italic text-oe-graphite">{n.englishOnly}</p> : null}
        </header>

        {post.coverImage ? (
          <div className="container-oe mt-14">
            <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden bg-oe-paper">
              <Image src={post.coverImage} alt="" fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
            </div>
          </div>
        ) : null}

        <div className="container-narrow mt-14">
          <hr className="rule mb-12 w-16 bg-oe-gold!" />
          <div className="prose-oe" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />
          <p className="mt-16 border-t border-oe-rule pt-8 text-sm text-oe-graphite">
            {n.pressBody}{" "}
            <a href={`mailto:${site.email}`} className="text-oe-ink underline decoration-oe-gold underline-offset-4">
              {site.email}
            </a>
          </p>
        </div>
      </article>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": post.kind === "press_release" || post.kind === "news" || post.kind === "announcement" ? "NewsArticle" : "Article",
            headline: post.title,
            description: post.excerpt ?? undefined,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            inLanguage: lang === "fr" && post.translated ? "fr-FR" : "en-GB",
            mainEntityOfPage: url,
            ...(post.coverImage ? { image: [post.coverImage] } : {}),
            author: { "@id": `${site.url}/#organization` },
            publisher: { "@id": `${site.url}/#organization` },
          },
          breadcrumbLd(lang, t, [
            { name: t.nav.news, path: routes.news },
            { name: post.title, path: `${routes.news}/${slug}` },
          ]),
        ]}
      />
    </>
  );
}
