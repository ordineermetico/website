import Link from "next/link";
import { notFound } from "next/navigation";
import { isoToDate } from "@/lib/admin/forms";
import { requireSection } from "@/lib/admin/session";
import { formatAdminDate } from "@/components/admin/ui";
import { staffClient } from "@/lib/supabase/server";
import { PostForm, SignoffBanner, SignoffReview, type PostValues } from "@/components/admin/PostForm";
import { PageHeader } from "@/components/admin/ui";

export const metadata = { title: "Edit news item" };

export default async function EditPost({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const me = await requireSection("news");
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
    requires_signoff: false,
    signoff_status: "none",
    signoff_note: null,
    signoff_by: null,
    signoff_at: null,
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
      requires_signoff: data.requires_signoff,
      signoff_status: data.signoff_status,
      signoff_note: data.signoff_note,
      signoff_by: data.signoff_by ? ((await db.from("profiles").select("full_name,email").eq("id", data.signoff_by).maybeSingle()).data?.full_name ?? "an Admin") : null,
      signoff_at: data.signoff_at ? formatAdminDate(data.signoff_at) : null,
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
      <SignoffBanner values={values} />
      {me.role === "admin" && values.id && values.requires_signoff && values.signoff_status === "pending" ? <SignoffReview id={values.id} /> : null}
      <PostForm values={values} saved={saved === "pending" ? "pending" : saved ? "1" : undefined} isAdmin={me.role === "admin"} />
    </>
  );
}
