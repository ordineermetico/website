import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";
import { clientIp, emailLayout, makeRateLimiter, sendEmail } from "@/lib/email";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/** 5 submissions per IP per 10 minutes, per server instance. Add a Vercel WAF rule for a hard limit. */
const limited = makeRateLimiter(5, 10 * 60 * 1000);

const labels: Record<string, string> = {
  house: "A house seeking India",
  "indian-brand": "An Indian brand seeking Europe",
  "trade-partner": "A trade partner in India",
  other: "Other",
  champagne: "Champagne",
  wine: "Wine",
  luxury: "Luxury goods",
  beauty: "Cosmetics and beauty",
};

export async function POST(request: Request) {
  let body: Partial<ContactInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  // Honeypot: quietly accept and drop.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  if (limited(clientIp(request))) {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }
  const errors = validateContact(body);
  if (errors.length) {
    return NextResponse.json({ ok: false, code: "invalid", fields: errors }, { status: 422 });
  }

  const d = body as ContactInput;
  const rows: [string, string][] = [
    ["Name", d.name.trim()],
    ["Organisation", d.organisation.trim()],
    ["Email", d.email.trim()],
    ["Country", d.country.trim()],
    ["I am", labels[d.iam] || d.iam],
    ["Category", labels[d.category] || d.category],
    ["Site language", d.lang === "fr" ? "French" : "English"],
  ];
  const result = await sendEmail({
    to: process.env.CONTACT_TO || site.email,
    replyTo: d.email.trim(),
    subject: `Enquiry: ${d.organisation.trim()} (${labels[d.category] || d.category})`,
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${d.message.trim()}\n`,
    html: emailLayout("New enquiry", rows, d.message.trim()),
  });

  if (result.ok) return NextResponse.json({ ok: true });
  // Never fake success: the client falls back to a pre-filled mailto link.
  if (result.reason === "not_configured") return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
}
