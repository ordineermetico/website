"use server";

import { str, type ActionState } from "@/lib/admin/forms";
import { getStaff } from "@/lib/admin/session";
import { createClient } from "@supabase/supabase-js";
import { supabasePublishableKey, supabaseUrl } from "@/lib/supabase/env";
import { staffClient } from "@/lib/supabase/server";

export async function updateName(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  const me = await getStaff();
  const db = await staffClient();
  const { error } = await db.from("profiles").update({ full_name: str(fd, "full_name", 120) || null }).eq("id", me.id);
  return error ? { error: `Could not save: ${error.message}` } : { ok: true, message: "Saved." };
}

export async function changePassword(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  const me = await getStaff();
  const current = String(fd.get("current") ?? "");
  const next = String(fd.get("next") ?? "");
  const confirm = String(fd.get("confirm") ?? "");
  if (next.length < 12) return { error: "Use at least 12 characters for your new password." };
  if (next !== confirm) return { error: "The two new passwords do not match." };
  // Check the current password on a throwaway client, so the signed-in (possibly two-step) session is untouched.
  const probe = createClient(supabaseUrl, supabasePublishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const check = await probe.auth.signInWithPassword({ email: me.email, password: current });
  if (check.error) return { error: "Your current password is not correct." };
  await probe.auth.signOut({ scope: "local" });
  const db = await staffClient();
  const { error } = await db.auth.updateUser({ password: next });
  if (error) return { error: `Could not change the password: ${error.message}` };
  await db.from("profiles").update({ must_change_password: false }).eq("id", me.id);
  return { ok: true, message: "Your password has been changed." };
}
