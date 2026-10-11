import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSection } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { PartnerForm, type PartnerValues } from "@/components/admin/PartnerForm";
import { PageHeader } from "@/components/admin/ui";

export const metadata = { title: "Partner house" };

export default async function EditPartner({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  await requireSection("partners");
  const { id } = await params;
  const { saved } = await searchParams;
  let values: PartnerValues = {
    name: "",
    slug: "",
    line_en: "",
    line_fr: "",
    logo_url: null,
    logo_alt_en: "",
    logo_alt_fr: "",
    logo_height_rem: 5.5,
    website_url: "",
    sort_order: 100,
    status: "draft",
  };
  if (id !== "new") {
    const db = await staffClient();
    const { data } = await db.from("partners").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    values = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      line_en: data.line_en ?? "",
      line_fr: data.line_fr ?? "",
      logo_url: data.logo_url,
      logo_alt_en: data.logo_alt_en ?? "",
      logo_alt_fr: data.logo_alt_fr ?? "",
      logo_height_rem: Number(data.logo_height_rem) || 5.5,
      website_url: data.website_url ?? "",
      sort_order: data.sort_order,
      status: data.status,
    };
  }
  return (
    <>
      <Link href="/admin/partners" className="label text-oe-bronze">
        ← All partner houses
      </Link>
      <div className="mt-6">
        <PageHeader title={id === "new" ? "Add a house" : values.name} />
      </div>
      <PartnerForm values={values} saved={Boolean(saved)} />
    </>
  );
}
