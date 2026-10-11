"use server";

import { redirect } from "next/navigation";
import { dateToIso, optStr, slugify, str, today, type ActionState } from "@/lib/admin/forms";
import { refreshPublicSite } from "@/lib/admin/revalidate";
import { requireSection } from "@/lib/admin/session";
import { uploadImage } from "@/lib/admin/upload";
import { staffClient } from "@/lib/supabase/server";

const KINDS = ["news", "press_release", "announcement", "milestone", "insight"];
const STATUSES = ["draft", "published", "archived"];

export async function savePost(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  await requireSection("news");
  const db = await staffClient();
  const id = str(fd, "id");
  const titleEn = str(fd, "title_en", 200);
  if (titleEn.length < 3) return { error: "The English title is required." };
  const slug = slugify(str(fd, "slug") || titleEn);
  if (!slug) return { error: "Choose a web address (slug) for this item." };
  const kind = KINDS.includes(str(fd, "kind")) ? str(fd, "kind") : "news";
  const status = STATUSES.includes(str(fd, "status")) ? str(fd, "status") : "draft";
  let publishedAt = dateToIso(optStr(fd, "published_on"));
  if (status === "published" && !publishedAt) publishedAt = dateToIso(today());

  const upload = await uploadImage(db, fd.get("cover"), "news");
  if (upload.error) return { error: upload.error };
  const removeCover = fd.get("remove_cover") === "on";

  const row: Record<string, unknown> = {
    slug,
    kind,
    status,
    title_en: titleEn,
    title_fr: optStr(fd, "title_fr", 200),
    excerpt_en: optStr(fd, "excerpt_en", 400),
    excerpt_fr: optStr(fd, "excerpt_fr", 400),
    body_en: str(fd, "body_en", 60000),
    body_fr: optStr(fd, "body_fr", 60000),
    published_at: publishedAt,
  };
  if (upload.url) row.cover_image = upload.url;
  else if (removeCover) row.cover_image = null;

  const res = id ? await db.from("posts").update(row).eq("id", id).select("id").single() : await db.from("posts").insert(row).select("id").single();
  if (res.error) {
    if (res.error.code === "23505") return { error: "Another item already uses that web address. Change the slug." };
    return { error: `Could not save: ${res.error.message}` };
  }
  refreshPublicSite();
  if (!id) redirect(`/admin/news/${res.data.id}?saved=1`);
  return { ok: true, message: status === "published" ? "Saved and published. The site is updated." : "Saved." };
}

export async function deletePost(fd: FormData) {
  await requireSection("news");
  const db = await staffClient();
  await db.from("posts").delete().eq("id", str(fd, "id"));
  refreshPublicSite();
  redirect("/admin/news?deleted=1");
}
