"use server";

import { redirect } from "next/navigation";
import type { ActionState } from "@/lib/admin/forms";
import { getSession } from "@/lib/admin/session";
import { staffClient } from "@/lib/supabase/server";

/** First sign-in: replace the temporary password. */
export async function setFirstPassword(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  const me = await getSession();
  const next = String(fd.get("next") ?? "");
  const confirm = String(fd.get("confirm") ?? "");
  if (next.length < 12) return { error: "Use at least 12 characters." };
  if (next !== confirm) return { error: "The two passwords do not match." };
  const db = await staffClient();
  const { error } = await db.auth.updateUser({ password: next });
  if (error) {
    if (/same/i.test(error.message)) return { error: "Choose a password different from the temporary one." };
    if (/weak|pwned|leaked/i.test(error.message)) return { error: "That password is too common or has appeared in a data breach. Choose another." };
    return { error: `Could not set the password: ${error.message}` };
  }
  await db.from("profiles").update({ must_change_password: false }).eq("id", me.id);
  redirect("/admin");
}

export type EnrolState = ActionState & { factorId?: string; qr?: string; secret?: string };

/** Start setting up an authenticator app: returns a QR code and the manual key. */
export async function startTwoStep(): Promise<EnrolState> {
  await getSession();
  const db = await staffClient();
  // Clear any half-finished setup first.
  const { data: factors } = await db.auth.mfa.listFactors();
  for (const f of factors?.all ?? []) {
    if (f.status === "unverified") await db.auth.mfa.unenroll({ factorId: f.id });
  }
  const { data, error } = await db.auth.mfa.enroll({ factorType: "totp", friendlyName: `Authenticator ${new Date().toISOString().slice(0, 10)}` });
  if (error || !data) return { error: `Could not start the setup: ${error?.message ?? "unknown error"}` };
  return { factorId: data.id, qr: data.totp.qr_code, secret: data.totp.secret };
}

/** Confirm the first code from the app; this also upgrades the current session. */
export async function confirmTwoStep(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  await getSession();
  const factorId = String(fd.get("factorId") ?? "");
  const code = String(fd.get("code") ?? "").replace(/\s/g, "");
  if (!/^\d{6}$/.test(code)) return { error: "Enter the 6-digit code shown in your authenticator app." };
  const db = await staffClient();
  const { error } = await db.auth.mfa.challengeAndVerify({ factorId, code });
  if (error) return { error: "That code did not work. Codes change every 30 seconds; try the current one." };
  redirect("/admin?twostep=on");
}

/** At sign-in: enter the current code. */
export async function verifyTwoStep(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  await getSession();
  const code = String(fd.get("code") ?? "").replace(/\s/g, "");
  if (!/^\d{6}$/.test(code)) return { error: "Enter the 6-digit code from your authenticator app." };
  const db = await staffClient();
  const { data: factors } = await db.auth.mfa.listFactors();
  const factor = factors?.totp?.[0];
  if (!factor) redirect("/admin/two-step/setup");
  const { error } = await db.auth.mfa.challengeAndVerify({ factorId: factor.id, code });
  if (error) return { error: "That code did not work. Codes change every 30 seconds; try the current one." };
  redirect("/admin");
}

/** Optional for roles that do not require it. */
export async function turnOffTwoStep(): Promise<void> {
  const me = await getSession();
  if (me.role === "admin") redirect("/admin/account?twostep=required");
  const db = await staffClient();
  const { data: factors } = await db.auth.mfa.listFactors();
  for (const f of factors?.all ?? []) await db.auth.mfa.unenroll({ factorId: f.id });
  redirect("/admin/account?twostep=off");
}
