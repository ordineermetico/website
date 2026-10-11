"use server";

import { redirect } from "next/navigation";
import { dateToIso, optStr, slugify, str, type ActionState } from "@/lib/admin/forms";
import { refreshPublicSite } from "@/lib/admin/revalidate";
import { requireSection } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";

export async function saveJob(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  await requireSection("jobs");
  const db = await staffClient();
  const id = str(fd, "id");
  const titleEn = str(fd, "title_en", 160);
  if (titleEn.length < 3) return { error: "The English job title is required." };
  if (!str(fd, "body_en")) return { error: "Add the English job description." };
  const status = ["draft", "open", "closed"].includes(str(fd, "status")) ? str(fd, "status") : "draft";
  const closes = str(fd, "closes_at");

  const row: Record<string, unknown> = {
    slug: slugify(str(fd, "slug") || titleEn),
    status,
    title_en: titleEn,
    title_fr: optStr(fd, "title_fr", 160),
    location: str(fd, "location", 120) || "Reims, France",
    employment_type: str(fd, "employment_type", 60) || "Full-time",
    department: optStr(fd, "department", 80),
    summary_en: optStr(fd, "summary_en", 400),
    summary_fr: optStr(fd, "summary_fr", 400),
    body_en: str(fd, "body_en", 60000),
    body_fr: optStr(fd, "body_fr", 60000),
    closes_at: /^\d{4}-\d{2}-\d{2}$/.test(closes) ? closes : null,
  };
  // The first time a job opens, stamp its publication date (used by Google for Jobs).
  if (status === "open") {
    const existing = id ? (await db.from("jobs").select("published_at").eq("id", id).maybeSingle()).data : null;
    if (!existing?.published_at) row.published_at = dateToIso(new Date().toISOString().slice(0, 10));
  }

  const res = id ? await db.from("jobs").update(row).eq("id", id).select("id").single() : await db.from("jobs").insert(row).select("id").single();
  if (res.error) {
    if (res.error.code === "23505") return { error: "Another job already uses that web address (slug)." };
    return { error: `Could not save: ${res.error.message}` };
  }
  refreshPublicSite();
  if (!id) redirect(`/admin/jobs/${res.data.id}?saved=1`);
  return { ok: true, message: status === "open" ? "Saved. The position is open on the Careers page." : "Saved. The position is not on the site." };
}

export async function deleteJob(fd: FormData) {
  await requireSection("jobs");
  const db = await staffClient();
  await db.from("jobs").delete().eq("id", str(fd, "id"));
  refreshPublicSite();
  redirect("/admin/jobs?deleted=1");
}
