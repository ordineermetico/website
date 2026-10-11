import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSection } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { JobForm, type JobValues } from "@/components/admin/JobForm";
import { PageHeader } from "@/components/admin/ui";

export const metadata = { title: "Position" };

export default async function EditJob({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  await requireSection("jobs");
  const { id } = await params;
  const { saved } = await searchParams;
  let values: JobValues = {
    slug: "",
    status: "draft",
    title_en: "",
    title_fr: "",
    location: "Reims, France",
    employment_type: "Full-time",
    department: "",
    summary_en: "",
    summary_fr: "",
    body_en: "",
    body_fr: "",
    closes_at: "",
  };
  if (id !== "new") {
    const db = await staffClient();
    const { data } = await db.from("jobs").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    values = {
      id: data.id,
      slug: data.slug,
      status: data.status,
      title_en: data.title_en ?? "",
      title_fr: data.title_fr ?? "",
      location: data.location ?? "",
      employment_type: data.employment_type ?? "",
      department: data.department ?? "",
      summary_en: data.summary_en ?? "",
      summary_fr: data.summary_fr ?? "",
      body_en: data.body_en ?? "",
      body_fr: data.body_fr ?? "",
      closes_at: data.closes_at ?? "",
    };
  }
  return (
    <>
      <Link href="/admin/jobs" className="label text-oe-bronze">
        ← All positions
      </Link>
      <div className="mt-6">
        <PageHeader title={id === "new" ? "New position" : values.title_en} />
      </div>
      <JobForm values={values} saved={Boolean(saved)} />
    </>
  );
}
