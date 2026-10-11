"use server";

import { redirect } from "next/navigation";
import { str, type ActionState } from "@/lib/admin/forms";
import { requireSection } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";

const STATUSES = ["new", "reviewing", "interview", "offer", "hired", "rejected", "withdrawn"];

export async function updateApplication(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  await requireSection("applications");
  const db = await staffClient();
  const status = str(fd, "status");
  if (!STATUSES.includes(status)) return { error: "Choose a status." };
  const { error } = await db
    .from("applications")
    .update({ status, notes: str(fd, "notes", 10000) || null })
    .eq("id", str(fd, "id"));
  if (error) return { error: `Could not save: ${error.message}` };
  return { ok: true, message: "Saved." };
}

/** Deletes the application and its CV (for withdrawals and data-deletion requests). */
export async function deleteApplication(fd: FormData) {
  await requireSection("applications");
  const db = await staffClient();
  const id = str(fd, "id");
  const { data } = await db.from("applications").select("cv_path").eq("id", id).maybeSingle();
  if (data?.cv_path) await db.storage.from("cvs").remove([data.cv_path]);
  await db.from("applications").delete().eq("id", id);
  redirect("/admin/applications?deleted=1");
}
