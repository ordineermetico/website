import { NextResponse } from "next/server";
import { serviceClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

/**
 * Daily (vercel.json): deletes applications, and their CVs, whose retention date has passed.
 * Vercel Cron calls this with `Authorization: Bearer $CRON_SECRET`.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const admin = serviceClient();
  if (!admin) return NextResponse.json({ ok: false, error: "SUPABASE_SECRET_KEY is not set" }, { status: 503 });

  const today = new Date().toISOString().slice(0, 10);
  const { data: expired, error } = await admin.from("applications").select("id,cv_path").lt("delete_after", today).limit(500);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  if (!expired?.length) return NextResponse.json({ ok: true, deleted: 0 });

  const paths = expired.map((a) => a.cv_path).filter(Boolean);
  if (paths.length) await admin.storage.from("cvs").remove(paths);
  await admin.from("applications").delete().in("id", expired.map((a) => a.id));
  return NextResponse.json({ ok: true, deleted: expired.length });
}
