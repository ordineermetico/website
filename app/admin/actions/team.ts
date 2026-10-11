"use server";

import { randomInt } from "node:crypto";
import { revalidatePath } from "next/cache";
import { str, type ActionState } from "@/lib/admin/forms";
import { requireSection, getStaff } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";
import { serviceClient } from "@/lib/supabase/service";

const ROLES = ["admin", "communications", "hr"];
const NO_SECRET = "Add SUPABASE_SECRET_KEY in Vercel (then redeploy) to manage accounts from here.";

/** 16 characters, no look-alike letters. Shown once to the admin, who passes it on securely. */
function temporaryPassword(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < 16; i++) out += alphabet[randomInt(alphabet.length)];
  return `${out.slice(0, 4)}-${out.slice(4, 8)}-${out.slice(8, 12)}-${out.slice(12)}`;
}

export type TeamState = ActionState & { password?: string; forEmail?: string };

export async function addMember(_prev: TeamState | undefined, fd: FormData): Promise<TeamState> {
  await requireSection("team");
  const admin = serviceClient();
  if (!admin) return { error: NO_SECRET };
  const email = str(fd, "email", 200).toLowerCase();
  const fullName = str(fd, "full_name", 120);
  const role = str(fd, "role");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { error: "Enter a valid email address." };
  if (!ROLES.includes(role)) return { error: "Choose a role." };
  const password = temporaryPassword();
  const { data: created, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName || null },
    app_metadata: { staff_role: role },
  });
  if (error || !created.user) return { error: error && /already/i.test(error.message) ? "An account with this email already exists." : `Could not create the account: ${error?.message ?? "unknown error"}` };
  await admin.from("profiles").update({ must_change_password: true }).eq("id", created.user.id);
  revalidatePath("/admin/team");
  return { ok: true, message: `Account created for ${email}.`, password, forEmail: email };
}

export async function updateMember(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  const me = await requireSection("team");
  const id = str(fd, "id");
  if (id === me.id) return { error: "You cannot change your own role or access. Ask another admin." };
  const role = str(fd, "role");
  const active = str(fd, "active") === "true";
  if (!ROLES.includes(role)) return { error: "Choose a role." };
  const db = await staffClient();
  const { error } = await db.from("profiles").update({ role, active }).eq("id", id);
  if (error) return { error: `Could not save: ${error.message}` };
  // Suspended accounts are also blocked from signing in.
  const admin = serviceClient();
  if (admin) await admin.auth.admin.updateUserById(id, { ban_duration: active ? "none" : "876000h" });
  revalidatePath("/admin/team");
  return { ok: true, message: active ? "Saved." : "Saved. This person can no longer sign in." };
}

export async function resetPassword(_prev: TeamState | undefined, fd: FormData): Promise<TeamState> {
  await requireSection("team");
  const admin = serviceClient();
  if (!admin) return { error: NO_SECRET };
  const id = str(fd, "id");
  const password = temporaryPassword();
  const { data, error } = await admin.auth.admin.updateUserById(id, { password });
  if (error) return { error: `Could not reset the password: ${error.message}` };
  await admin.from("profiles").update({ must_change_password: true }).eq("id", id);
  return { ok: true, message: "New temporary password created. They must choose their own at next sign-in.", password, forEmail: data.user?.email ?? "" };
}

/** For a lost or replaced phone: removes the person's authenticator so they can set it up again. */
export async function resetTwoStep(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  const me = await requireSection("team");
  const id = str(fd, "id");
  if (id === me.id) return { error: "Ask another admin to reset your own two-step sign-in." };
  const admin = serviceClient();
  if (!admin) return { error: NO_SECRET };
  const { data, error } = await admin.auth.admin.mfa.listFactors({ userId: id });
  if (error) return { error: `Could not read their two-step settings: ${error.message}` };
  for (const f of data?.factors ?? []) await admin.auth.admin.mfa.deleteFactor({ userId: id, id: f.id });
  return { ok: true, message: data?.factors?.length ? "Two-step sign-in reset. They will set it up again at next sign-in." : "They had no two-step sign-in set up." };
}

export async function deleteMember(fd: FormData) {
  const me = await getStaff();
  await requireSection("team");
  const id = str(fd, "id");
  const admin = serviceClient();
  if (!admin || id === me.id) return;
  await admin.auth.admin.deleteUser(id);
  revalidatePath("/admin/team");
}
