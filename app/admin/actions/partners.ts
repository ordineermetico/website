"use server";

import { redirect } from "next/navigation";
import { optStr, slugify, str, type ActionState } from "@/lib/admin/forms";
import { refreshPublicSite } from "@/lib/admin/revalidate";
import { requireSection } from "@/lib/admin/session";
import { uploadImage } from "@/lib/admin/upload";
import { staffClient } from "@/lib/supabase/server";

export async function savePartner(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  await requireSection("partners");
  const db = await staffClient();
  const id = str(fd, "id");
  const name = str(fd, "name", 120);
  const lineEn = str(fd, "line_en", 240);
  if (name.length < 2) return { error: "The house name is required." };
  if (!lineEn) return { error: "The English one-line description is required." };
  const website = str(fd, "website_url", 300);
  if (website && !/^https:\/\/\S+$/.test(website)) return { error: "The website must be a full address starting with https://" };

  const upload = await uploadImage(db, fd.get("logo"), "partners");
  if (upload.error) return { error: upload.error };
  if (!id && !upload.url) return { error: "Upload the house's logo (for light backgrounds)." };

  const height = Math.min(9, Math.max(2, Number(str(fd, "logo_height_rem")) || 5.5));
  const status = ["draft", "published", "archived"].includes(str(fd, "status")) ? str(fd, "status") : "draft";
  const row: Record<string, unknown> = {
    name,
    slug: slugify(str(fd, "slug") || name),
    line_en: lineEn,
    line_fr: optStr(fd, "line_fr", 240),
    logo_alt_en: str(fd, "logo_alt_en", 160) || `${name} logo`,
    logo_alt_fr: optStr(fd, "logo_alt_fr", 160) ?? `Logo ${name}`,
    logo_height_rem: Math.round(height * 10) / 10,
    website_url: website || null,
    sort_order: Number.parseInt(str(fd, "sort_order"), 10) || 100,
    status,
  };
  if (upload.url) row.logo_url = upload.url;

  const res = id ? await db.from("partners").update(row).eq("id", id).select("id").single() : await db.from("partners").insert(row).select("id").single();
  if (res.error) {
    if (res.error.code === "23505") return { error: "Another house already uses that web address (slug)." };
    return { error: `Could not save: ${res.error.message}` };
  }
  refreshPublicSite();
  if (!id) redirect(`/admin/partners/${res.data.id}?saved=1`);
  return { ok: true, message: status === "published" ? "Saved. The house is shown on the site." : "Saved. The house is not shown on the site." };
}

export async function deletePartner(fd: FormData) {
  await requireSection("partners");
  const db = await staffClient();
  await db.from("partners").delete().eq("id", str(fd, "id"));
  refreshPublicSite();
  redirect("/admin/partners?deleted=1");
}
