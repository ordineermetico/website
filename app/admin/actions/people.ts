"use server";

import { redirect } from "next/navigation";
import { optStr, slugify, str, type ActionState } from "@/lib/admin/forms";
import { refreshPublicSite } from "@/lib/admin/revalidate";
import { requireSection } from "@/lib/admin/session";
import { uploadImage } from "@/lib/admin/upload";
import { staffClient } from "@/lib/supabase/server";

const httpsOrNull = (v: string) => (v ? v : null);

export async function savePerson(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  await requireSection("people");
  const db = await staffClient();
  const id = str(fd, "id");
  const name = str(fd, "name", 120);
  const roleEn = str(fd, "role_en", 120);
  if (name.length < 2) return { error: "The name is required." };
  if (roleEn.length < 2) return { error: "The English designation is required." };

  const links = ["linkedin_url", "x_url", "instagram_url", "website_url"].map((k) => [k, str(fd, k, 300)] as const);
  const bad = links.find(([, v]) => v && !/^https:\/\/\S+$/.test(v));
  if (bad) return { error: "Profile links must be full addresses starting with https://" };
  const email = str(fd, "public_email", 200);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { error: "The public email address is not valid." };

  const upload = await uploadImage(db, fd.get("photo"), "people");
  if (upload.error) return { error: upload.error };

  const status = ["draft", "published", "archived"].includes(str(fd, "status")) ? str(fd, "status") : "draft";
  const row: Record<string, unknown> = {
    name,
    slug: slugify(str(fd, "slug") || name),
    role_en: roleEn,
    role_fr: optStr(fd, "role_fr", 120),
    bio_en: optStr(fd, "bio_en", 4000),
    bio_fr: optStr(fd, "bio_fr", 4000),
    location: optStr(fd, "location", 120),
    public_email: email || null,
    sort_order: Number.parseInt(str(fd, "sort_order"), 10) || 100,
    status,
    ...Object.fromEntries(links.map(([k, v]) => [k, httpsOrNull(v)])),
  };
  if (upload.url) row.photo_url = upload.url;
  else if (fd.get("remove_photo") === "on") row.photo_url = null;

  const res = id ? await db.from("people").update(row).eq("id", id).select("id").single() : await db.from("people").insert(row).select("id").single();
  if (res.error) {
    if (res.error.code === "23505") return { error: "Another profile already uses that identifier (slug)." };
    return { error: `Could not save: ${res.error.message}` };
  }
  refreshPublicSite();
  if (!id) redirect(`/admin/people/${res.data.id}?saved=1`);
  return { ok: true, message: status === "published" ? "Saved. The profile is shown on the site." : "Saved. The profile is not shown on the site." };
}

export async function deletePerson(fd: FormData) {
  await requireSection("people");
  const db = await staffClient();
  await db.from("people").delete().eq("id", str(fd, "id"));
  refreshPublicSite();
  redirect("/admin/people?deleted=1");
}
