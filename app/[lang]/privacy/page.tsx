import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { getLang, routes, type LangParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/LegalLayout";
import { Placeholder } from "@/components/Placeholder";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = getDictionary(lang);
  return pageMetadata({ lang, path: routes.privacy, title: t.privacy.metaTitle, description: t.privacy.metaDescription });
}

export default async function PrivacyPage({ params }: LangParams) {
  const lang = await getLang(params);
  const p = getDictionary(lang).privacy;
  return (
    <LegalLayout title={p.title}>
      <p className="mt-8">
        <Placeholder label={p.lede} />
      </p>
      {p.sections.map((s) => (
        <section key={s.heading} className="mt-12">
          <h2 className="display-sm">{s.heading}</h2>
          <p className="mt-4 text-oe-graphite">{s.body}</p>
          {"placeholder" in s && s.placeholder ? (
            <p className="mt-4">
              <Placeholder label={s.placeholder} />
            </p>
          ) : null}
        </section>
      ))}
    </LegalLayout>
  );
}
