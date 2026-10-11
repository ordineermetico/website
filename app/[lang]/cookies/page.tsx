import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { getLang, routes, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/LegalLayout";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: routes.cookies, title: t.cookies.metaTitle, description: t.cookies.metaDescription });
}

export default async function CookiesPage({ params }: LangParams) {
  const lang = await getLang(params);
  const c = getDictionary(lang).cookies;
  return (
    <LegalLayout title={c.title} lede={c.lede}>
      <div className="mt-10 space-y-5 text-oe-graphite">
        {c.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <dl className="mt-12 grid gap-2 border-y border-oe-rule py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
        <dt className="label pt-1 text-oe-graphite">{c.inventory}</dt>
        <dd>{c.inventoryValue}</dd>
      </dl>
    </LegalLayout>
  );
}
