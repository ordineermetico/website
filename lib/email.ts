import "server-only";
import { site } from "./site";

export type SendResult = { ok: true } | { ok: false; reason: "not_configured" | "send_failed" };

/** Sends one email through Resend. Never throws. */
export async function sendEmail(opts: { to: string; subject: string; text: string; html: string; replyTo?: string }): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "not_configured" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || `Ordine Ermetico <website@ordineermetico.com>`,
        to: [opts.to],
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
        subject: opts.subject.slice(0, 180),
        text: opts.text,
        html: opts.html,
      }),
    });
    if (res.ok) return { ok: true };
    const detail = await res.text().catch(() => "");
    console.error("Resend error", res.status, detail);
    // Key rejected or sending domain not verified: treat as not configured so callers fall back to email links.
    if (res.status === 401 || res.status === 403 || /not verified|domain/i.test(detail)) return { ok: false, reason: "not_configured" };
    return { ok: false, reason: "send_failed" };
  } catch (err) {
    console.error("Resend request failed", err);
    return { ok: false, reason: "send_failed" };
  }
}

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Plain, branded table layout used by all notification emails. */
export function emailLayout(kicker: string, rows: [string, string][], body?: string, footer?: string): string {
  return `<div style="font-family:Georgia,serif;color:#1E1A16">
<p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#7E5A1E">${escapeHtml(kicker)} · ${site.url.replace(/^https?:\/\//, "")}</p>
<table cellpadding="6" style="border-collapse:collapse;font-size:15px">${rows
    .map(([k, v]) => `<tr><td style="color:#6E665C;padding-right:18px;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table>${
    body
      ? `<p style="font-size:15px;line-height:1.6;white-space:pre-wrap;border-top:1px solid #D3C6AE;padding-top:16px;margin-top:16px">${escapeHtml(body)}</p>`
      : ""
  }${footer ? `<p style="font-size:14px;margin-top:20px">${footer}</p>` : ""}</div>`;
}

/** In-memory, per-instance rate limiter (best effort). */
export function makeRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (key: string) => {
    const now = Date.now();
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) hits.clear();
    return recent.length > max;
  };
}

export function clientIp(request: Request): string {
  return (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
}
