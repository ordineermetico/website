import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSection } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { PersonForm, type PersonValues } from "@/components/admin/PersonForm";
import { PageHeader } from "@/components/admin/ui";

export const metadata = { title: "Profile" };

export default async function EditPerson({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  await requireSection("people");
  const { id } = await params;
  const { saved } = await searchParams;
  let values: PersonValues = {
    name: "",
    slug: "",
    role_en: "",
    role_fr: "",
    bio_en: "",
    bio_fr: "",
    photo_url: null,
    location: "",
    linkedin_url: "",
    x_url: "",
    instagram_url: "",
    website_url: "",
    public_email: "",
    sort_order: 100,
    status: "draft",
  };
  if (id !== "new") {
    const db = await staffClient();
    const { data } = await db.from("people").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    values = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      role_en: data.role_en ?? "",
      role_fr: data.role_fr ?? "",
      bio_en: data.bio_en ?? "",
      bio_fr: data.bio_fr ?? "",
      photo_url: data.photo_url,
      location: data.location ?? "",
      linkedin_url: data.linkedin_url ?? "",
      x_url: data.x_url ?? "",
      instagram_url: data.instagram_url ?? "",
      website_url: data.website_url ?? "",
      public_email: data.public_email ?? "",
      sort_order: data.sort_order,
      status: data.status,
    };
  }
  return (
    <>
      <Link href="/admin/people" className="label text-oe-bronze">
        ← All profiles
      </Link>
      <div className="mt-6">
        <PageHeader title={id === "new" ? "Add a profile" : values.name} />
      </div>
      <PersonForm values={values} saved={Boolean(saved)} />
    </>
  );
}
