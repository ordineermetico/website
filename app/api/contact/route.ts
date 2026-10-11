import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Best-effort rate limit: 5 submissions per IP per 10 minutes, per server instance.
 * Serverless instances do not share memory; for a hard limit add Vercel WAF rate limiting.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

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

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  const errors = validateContact(body);
  if (errors.length) {
    return NextResponse.json({ ok: false, code: "invalid", fields: errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Never fake success: the client falls back to mailto.
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  const d = body as ContactInput;
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Organisation", d.organisation],
    ["Email", d.email],
    ["Country", d.country],
    ["I am", labels[d.iam] || d.iam],
    ["Category", labels[d.category] || d.category],
    ["Site language", d.lang === "fr" ? "French" : "English"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v.trim()}`).join("\n")}\n\nMessage:\n${d.message.trim()}\n`;
  const html = `<div style="font-family:Georgia,serif;color:#1E1A16">
<p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#7E5A1E">New enquiry · ordineermetico.com</p>
<table cellpadding="6" style="border-collapse:collapse;font-size:15px">${rows
    .map(([k, v]) => `<tr><td style="color:#6E665C;padding-right:18px">${k}</td><td>${escapeHtml(v.trim())}</td></tr>`)
    .join("")}</table>
<p style="font-size:15px;line-height:1.6;white-space:pre-wrap;border-top:1px solid #D3C6AE;padding-top:16px;margin-top:16px">${escapeHtml(
    d.message.trim(),
  )}</p></div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Ordine Ermetico <website@ordineermetico.com>",
        to: [process.env.CONTACT_TO || site.email],
        reply_to: d.email.trim(),
        subject: `Enquiry: ${d.organisation.trim()} (${labels[d.category] || d.category})`.slice(0, 180),
        text,
        html,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend error", res.status, detail);
      // Key rejected or sending domain not yet verified: treat as "not configured" so the visitor gets the mailto fallback.
      if (res.status === 401 || res.status === 403 || /not verified|domain/i.test(detail)) {
        return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
      }
      return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend request failed", err);
    return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
  }
}
