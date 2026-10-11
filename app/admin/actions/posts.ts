"use server";

import { redirect } from "next/navigation";
import { dateToIso, optStr, slugify, str, today, type ActionState } from "@/lib/admin/forms";
import { refreshPublicSite } from "@/lib/admin/revalidate";
import { requireAdmin, requireSection } from "@/lib/admin/session";
import { uploadImage } from "@/lib/admin/upload";
import { emailLayout, sendEmail } from "@/lib/email";
import { site } from "@/lib/site";
import { staffClient } from "@/lib/supabase/server";

const KINDS = ["news", "press_release", "announcement", "milestone", "insight", "partnership"];
const STATUSES = ["draft", "published", "archived"];
const adminInbox = () => process.env.ADMIN_NOTIFY_TO || "it@ordineermetico.com";

async function notifyAdmins(postId: string, title: string, by: string) {
  const url = `${site.url}/admin/news/${postId}`;
  await sendEmail({
    to: adminInbox(),
    subject: `Sign-off needed: ${title}`,
    text: `${by} has submitted a news item for sign-off:\n\n${title}\n\nReview it (sign-in required): ${url}\n`,
    html: emailLayout("Sign-off needed", [["Item", title], ["Submitted by", by]], undefined, `<a href="${url}" style="color:#7E5A1E">Review and approve</a> (sign-in required)`),
  });
}

export async function savePost(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  const me = await requireSection("news");
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
  const wantsSignoff = kind === "partnership" || fd.get("requires_signoff") === "on";

  const before = id ? (await db.from("posts").select("signoff_status").eq("id", id).maybeSingle()).data : null;

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
    requires_signoff: wantsSignoff,
  };
  // "Submit for sign-off" asks for review without trying to publish.
  if (wantsSignoff && fd.get("submit_for_signoff") === "1") {
    row.status = "draft";
    row.signoff_status = "pending";
  }
  if (upload.url) row.cover_image = upload.url;
  else if (removeCover) row.cover_image = null;

  const res = id
    ? await db.from("posts").update(row).eq("id", id).select("id,status,signoff_status,requires_signoff").single()
    : await db.from("posts").insert(row).select("id,status,signoff_status,requires_signoff").single();
  if (res.error) {
    if (res.error.code === "23505") return { error: "Another item already uses that web address. Change the slug." };
    return { error: `Could not save: ${res.error.message}` };
  }
  refreshPublicSite();

  const saved = res.data;
  const nowPending = saved.requires_signoff && saved.signoff_status === "pending";
  if (nowPending && before?.signoff_status !== "pending") await notifyAdmins(saved.id, titleEn, me.fullName || me.email);

  if (!id) redirect(`/admin/news/${saved.id}?saved=${nowPending ? "pending" : "1"}`);
  if (nowPending) return { ok: true, message: "Saved and sent to an Admin for sign-off. It goes live once approved." };
  return { ok: true, message: saved.status === "published" ? "Saved and published. The site is updated." : "Saved." };
}

export async function deletePost(fd: FormData) {
  await requireSection("news");
  const db = await staffClient();
  await db.from("posts").delete().eq("id", str(fd, "id"));
  refreshPublicSite();
  redirect("/admin/news?deleted=1");
}

async function authorEmail(db: Awaited<ReturnType<typeof staffClient>>, postId: string) {
  const { data } = await db.from("posts").select("title_en,created_by").eq("id", postId).maybeSingle();
  if (!data?.created_by) return { title: data?.title_en ?? "", email: null as string | null };
  const { data: p } = await db.from("profiles").select("email").eq("id", data.created_by).maybeSingle();
  return { title: data.title_en, email: p?.email ?? null };
}

/** Admin only: approve a sign-off item and publish it (today, unless a date is already set). */
export async function approvePost(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin();
  const db = await staffClient();
  const id = str(fd, "id");
  const { data: cur } = await db.from("posts").select("published_at").eq("id", id).maybeSingle();
  const { error } = await db
    .from("posts")
    .update({ status: "published", signoff_status: "approved", signoff_note: null, published_at: cur?.published_at ?? dateToIso(today()) })
    .eq("id", id);
  if (error) return { error: `Could not approve: ${error.message}` };
  refreshPublicSite();
  const { title, email } = await authorEmail(db, id);
  if (email && email !== me.email) {
    await sendEmail({
      to: email,
      subject: `Approved and published: ${title}`,
      text: `${me.fullName || me.email} approved “${title}”. It is now live on ${site.url}/news.\n`,
      html: emailLayout("Approved", [["Item", title], ["Approved by", me.fullName || me.email]]),
    });
  }
  return { ok: true, message: "Approved and published." };
}

/** Admin only: send a sign-off item back with a note. */
export async function requestChanges(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin();
  const db = await staffClient();
  const id = str(fd, "id");
  const note = str(fd, "note", 2000);
  if (!note) return { error: "Write a short note saying what needs to change." };
  const { error } = await db.from("posts").update({ status: "draft", signoff_status: "changes_requested", signoff_note: note }).eq("id", id);
  if (error) return { error: `Could not save: ${error.message}` };
  refreshPublicSite();
  const { title, email } = await authorEmail(db, id);
  if (email && email !== me.email) {
    const url = `${site.url}/admin/news/${id}`;
    await sendEmail({
      to: email,
      subject: `Changes requested: ${title}`,
      text: `${me.fullName || me.email} asked for changes to “${title}”:\n\n${note}\n\nEdit it here: ${url}\n`,
      html: emailLayout("Changes requested", [["Item", title], ["From", me.fullName || me.email]], note, `<a href="${url}" style="color:#7E5A1E">Open the item</a>`),
    });
  }
  return { ok: true, message: "Sent back with your note." };
}
