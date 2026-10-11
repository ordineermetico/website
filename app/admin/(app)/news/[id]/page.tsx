import Link from "next/link";
import { notFound } from "next/navigation";
import { isoToDate } from "@/lib/admin/forms";
import { requireSection } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { PostForm, type PostValues } from "@/components/admin/PostForm";
import { PageHeader } from "@/components/admin/ui";

export const metadata = { title: "Edit news item" };

export default async function EditPost({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  await requireSection("news");
  const { id } = await params;
  const { saved } = await searchParams;
  let values: PostValues = {
    slug: "",
    kind: "news",
    status: "draft",
    title_en: "",
    title_fr: "",
    excerpt_en: "",
    excerpt_fr: "",
    body_en: "",
    body_fr: "",
    cover_image: null,
    published_on: "",
  };
  if (id !== "new") {
    const db = await staffClient();
    const { data } = await db.from("posts").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    values = {
      id: data.id,
      slug: data.slug,
      kind: data.kind,
      status: data.status,
      title_en: data.title_en ?? "",
      title_fr: data.title_fr ?? "",
      excerpt_en: data.excerpt_en ?? "",
      excerpt_fr: data.excerpt_fr ?? "",
      body_en: data.body_en ?? "",
      body_fr: data.body_fr ?? "",
      cover_image: data.cover_image,
      published_on: isoToDate(data.published_at),
    };
  }
  return (
    <>
      <Link href="/admin/news" className="label text-oe-bronze">
        ← All news
      </Link>
      <div className="mt-6">
        <PageHeader title={id === "new" ? "New item" : "Edit item"} />
      </div>
      <PostForm values={values} saved={Boolean(saved)} />
    </>
  );
}
