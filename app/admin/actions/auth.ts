"use server";

import { redirect } from "next/navigation";
import { staffClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/admin/forms";

export async function signIn(_prev: ActionState | undefined, fd: FormData): Promise<ActionState> {
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  const password = String(fd.get("password") ?? "");
  const next = String(fd.get("next") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };
  const db = await staffClient();
  const { error } = await db.auth.signInWithPassword({ email, password });
  if (error) return { error: "Those details did not match an account. Check them and try again." };
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function signOut() {
  const db = await staffClient();
  await db.auth.signOut();
  redirect("/admin/login");
}
