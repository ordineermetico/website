import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { clientIp, emailLayout, makeRateLimiter, sendEmail } from "@/lib/email";
import { site } from "@/lib/site";
import { publicClient } from "@/lib/supabase/public";
import { serviceClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

const MAX_CV_BYTES = 4 * 1024 * 1024; // Vercel limits request bodies to 4.5 MB
const limited = makeRateLimiter(3, 10 * 60 * 1000);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accept a CV only if its first bytes really are a PDF, a .docx or a legacy .doc. */
function sniffCv(bytes: Uint8Array): { ext: string; type: string } | null {
  const b = (i: number) => bytes[i];
  if (b(0) === 0x25 && b(1) === 0x50 && b(2) === 0x44 && b(3) === 0x46) return { ext: "pdf", type: "application/pdf" };
  if (b(0) === 0x50 && b(1) === 0x4b && b(2) === 0x03 && b(3) === 0x04)
    return { ext: "docx", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" };
  if (b(0) === 0xd0 && b(1) === 0xcf && b(2) === 0x11 && b(3) === 0xe0) return { ext: "doc", type: "application/msword" };
  return null;
}

const text = (fd: FormData, k: string, max: number) => String(fd.get(k) ?? "").trim().slice(0, max);

export async function POST(request: Request) {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  if (text(fd, "website", 200)) return NextResponse.json({ ok: true }); // honeypot
  if (limited(clientIp(request))) return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });

  const jobSlug = text(fd, "job", 120);
  const fullName = text(fd, "fullName", 120);
  const email = text(fd, "email", 200);
  const phone = text(fd, "phone", 40);
  const location = text(fd, "location", 120);
  const linkedin = text(fd, "linkedin", 300);
  const message = text(fd, "message", 5000);
  const lang = text(fd, "lang", 2) === "fr" ? "fr" : "en";
  const consent = fd.get("consent") === "on";
  const cv = fd.get("cv");

  const fields: string[] = [];
  if (fullName.length < 2) fields.push("fullName");
  if (!EMAIL_RE.test(email)) fields.push("email");
  if (linkedin && !/^https:\/\/\S+$/.test(linkedin)) fields.push("linkedin");
  if (!consent) fields.push("consent");
  let cvBytes: Uint8Array | null = null;
  let cvKind: { ext: string; type: string } | null = null;
  if (!(cv instanceof File) || cv.size === 0 || cv.size > MAX_CV_BYTES) {
    fields.push("cv");
  } else {
    cvBytes = new Uint8Array(await cv.arrayBuffer());
    cvKind = sniffCv(cvBytes);
    if (!cvKind) fields.push("cv");
  }
  if (fields.length) return NextResponse.json({ ok: false, code: "invalid", fields }, { status: 422 });

  const admin = serviceClient();
  const pub = publicClient();
  if (!admin || !pub) return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });

  // The job must be open and published right now.
  const { data: job } = await pub.from("jobs").select("id,title_en,closes_at").eq("slug", jobSlug).eq("status", "open").maybeSingle();
  if (!job || (job.closes_at && job.closes_at < new Date().toISOString().slice(0, 10))) {
    return NextResponse.json({ ok: false, code: "job_closed" }, { status: 410 });
  }

  const path = `${new Date().toISOString().slice(0, 7)}/${randomUUID()}.${cvKind!.ext}`;
  const up = await admin.storage.from("cvs").upload(path, cvBytes!, { contentType: cvKind!.type, upsert: false });
  if (up.error) {
    console.error("CV upload failed", up.error.message);
    return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
  }

  const { data: inserted, error } = await admin
    .from("applications")
    .insert({
      job_id: job.id,
      job_title: job.title_en,
      full_name: fullName,
      email,
      phone: phone || null,
      location: location || null,
      linkedin_url: linkedin || null,
      message: message || null,
      cv_path: path,
      language: lang,
      consent: true,
    })
    .select("id")
    .single();
  if (error || !inserted) {
    console.error("Application insert failed", error?.message);
    await admin.storage.from("cvs").remove([path]);
    return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
  }

  // Alert HR. The CV is not attached: it stays in the private store, behind the admin login.
  const reviewUrl = `${site.url}/admin/applications/${inserted.id}`;
  await sendEmail({
    to: process.env.HR_NOTIFY_TO || site.email,
    replyTo: email,
    subject: `Application: ${job.title_en} — ${fullName}`,
    text: `New application for ${job.title_en}\n\nName: ${fullName}\nEmail: ${email}\n${location ? `Based in: ${location}\n` : ""}\nReview it (sign-in required): ${reviewUrl}\n`,
    html: emailLayout(
      "New application",
      [
        ["Position", job.title_en],
        ["Name", fullName],
        ["Email", email],
        ...(location ? ([["Based in", location]] as [string, string][]) : []),
      ],
      undefined,
      `<a href="${reviewUrl}" style="color:#7E5A1E">Review the application and CV</a> (sign-in required)`,
    ),
  });

  return NextResponse.json({ ok: true });
}
