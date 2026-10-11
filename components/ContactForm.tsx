"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import type { Dictionary } from "@/content";
import { validateContact, type ContactInput, type FieldKey } from "@/lib/contact";
import { site } from "@/lib/site";
import { Arrow } from "./Arrow";

type Status = "idle" | "sending" | "success" | "error" | "rate_limited" | "fallback";

export function ContactForm({
  t,
  lang,
  privacyHref,
  emailConfigured,
}: {
  t: Dictionary["contact"]["form"];
  lang: string;
  privacyHref: string;
  emailConfigured: boolean;
}) {
  const [errors, setErrors] = useState<FieldKey[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [mailto, setMailto] = useState<string>(`mailto:${site.email}`);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const read = (form: HTMLFormElement): ContactInput => {
    const fd = new FormData(form);
    const g = (k: string) => String(fd.get(k) ?? "");
    return {
      name: g("name"),
      organisation: g("organisation"),
      email: g("email"),
      country: g("country"),
      iam: g("iam"),
      category: g("category"),
      message: g("message"),
      consent: fd.get("consent") === "on",
      website: g("website"),
      lang,
    };
  };

  const buildMailto = (d: ContactInput) => {
    const iam = t.iamOptions.find((o) => o.value === d.iam)?.label ?? d.iam;
    const cat = t.categoryOptions.find((o) => o.value === d.category)?.label ?? d.category;
    const body = [
      `${t.name}: ${d.name}`,
      `${t.organisation}: ${d.organisation}`,
      `${t.email}: ${d.email}`,
      `${t.country}: ${d.country}`,
      `${t.iam} ${iam}`,
      `${t.category}: ${cat}`,
      "",
      d.message,
    ].join("\n");
    return `mailto:${site.email}?subject=${encodeURIComponent(`${t.emailSubject} — ${d.organisation}`)}&body=${encodeURIComponent(body)}`;
  };

  const focusFirstError = (errs: FieldKey[]) => {
    const first = errs[0];
    if (!first || !formRef.current) return;
    formRef.current.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const showStatus = (s: Status) => {
    setStatus(s);
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = read(form);
    const errs = validateContact(data);
    setErrors(errs);
    if (errs.length) {
      focusFirstError(errs);
      return;
    }
    const link = buildMailto(data);
    setMailto(link);

    if (!emailConfigured) {
      showStatus("fallback");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; fields?: FieldKey[] };
      if (res.ok && json.ok) {
        form.reset();
        showStatus("success");
      } else if (json.code === "not_configured") {
        showStatus("fallback");
      } else if (json.code === "rate_limited") {
        showStatus("rate_limited");
      } else if (json.code === "invalid" && json.fields) {
        setErrors(json.fields);
        setStatus("idle");
        focusFirstError(json.fields);
      } else {
        showStatus("error");
      }
    } catch {
      showStatus("error");
    }
  }

  const has = (k: FieldKey) => errors.includes(k);
  const errId = (k: FieldKey) => (has(k) ? `${k}-error` : undefined);
  const ErrorText = ({ k }: { k: FieldKey }) =>
    has(k) ? (
      <p id={`${k}-error`} className="mt-2 text-sm text-[#9b2c1f]">
        {t.errors[k]}
      </p>
    ) : null;

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border-t border-oe-gold py-16 outline-none">
        <p className="font-display text-5xl text-oe-ink">{t.successTitle}</p>
        <p className="lede mt-6 max-w-lg">{t.successBody}</p>
      </div>
    );
  }

  const sending = status === "sending";
  const req = <span className="ml-1 text-oe-bronze" aria-hidden="true">*</span>;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={errors.length ? "form-errors" : undefined}>
      {errors.length > 0 ? (
        <p id="form-errors" role="alert" className="mb-10 border-l border-[#9b2c1f] pl-4 text-sm text-[#9b2c1f]">
          {t.errors.summary}
        </p>
      ) : null}

      {/* Honeypot: hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            {t.name}
            {req}
          </label>
          <input id="name" name="name" type="text" autoComplete="name" required className="field" aria-invalid={has("name")} aria-describedby={errId("name")} />
          <ErrorText k="name" />
        </div>
        <div>
          <label htmlFor="organisation" className="field-label">
            {t.organisation}
            {req}
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            autoComplete="organization"
            required
            className="field"
            aria-invalid={has("organisation")}
            aria-describedby={errId("organisation")}
          />
          <ErrorText k="organisation" />
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            {t.email}
            {req}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            className="field"
            aria-invalid={has("email")}
            aria-describedby={errId("email")}
          />
          <ErrorText k="email" />
        </div>
        <div>
          <label htmlFor="country" className="field-label">
            {t.country}
            {req}
          </label>
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            required
            className="field"
            aria-invalid={has("country")}
            aria-describedby={errId("country")}
          />
          <ErrorText k="country" />
        </div>
        <div>
          <label htmlFor="iam" className="field-label">
            {t.iam}
            {req}
          </label>
          <select id="iam" name="iam" required defaultValue="" className="field" aria-invalid={has("iam")} aria-describedby={errId("iam")}>
            <option value="" disabled>
              {t.select}
            </option>
            {t.iamOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ErrorText k="iam" />
        </div>
        <div>
          <label htmlFor="category" className="field-label">
            {t.category}
            {req}
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue=""
            className="field"
            aria-invalid={has("category")}
            aria-describedby={errId("category")}
          >
            <option value="" disabled>
              {t.select}
            </option>
            {t.categoryOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ErrorText k="category" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="field-label">
            {t.message}
            {req}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder={t.messageHint}
            className="field"
            aria-invalid={has("message")}
            aria-describedby={errId("message")}
          />
          <ErrorText k="message" />
        </div>
      </div>

      <div className="mt-10">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-4 text-[0.95rem] leading-relaxed text-oe-graphite">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={has("consent")}
            aria-describedby={errId("consent")}
            className="mt-1 size-4 flex-none cursor-pointer accent-[#7E5A1E]"
          />
          <span>
            {t.consent}{" "}
            <Link href={privacyHref} className="text-oe-ink underline decoration-oe-gold underline-offset-4">
              {t.consentLink}
            </Link>
            .{req}
          </span>
        </label>
        <ErrorText k="consent" />
      </div>

      <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <button type="submit" disabled={sending} aria-busy={sending} className="btn btn-solid disabled:cursor-wait disabled:opacity-70">
          {sending ? t.sending : t.submit} {!sending ? <Arrow /> : null}
        </button>
        <p className="text-xs text-oe-graphite">
          <span className="text-oe-bronze">*</span> {t.required}
        </p>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status === "fallback" ? (
          <div className="mt-10 border border-oe-rule bg-oe-paper p-8">
            <p className="font-display text-2xl text-oe-ink">{t.fallbackTitle}</p>
            <p className="mt-3 text-oe-graphite">{t.fallbackBody}</p>
            <a href={mailto} className="btn btn-ghost mt-6">
              {t.fallbackCta} <Arrow />
            </a>
          </div>
        ) : null}
        {status === "error" || status === "rate_limited" ? (
          <div role="alert" className="mt-10 border-l border-[#9b2c1f] pl-5">
            {status === "error" ? <p className="font-display text-2xl text-oe-ink">{t.errorTitle}</p> : null}
            <p className="mt-2 text-oe-graphite">
              {status === "error" ? t.errorBody : t.rateLimited}{" "}
              <a href={mailto} className="text-oe-ink underline decoration-oe-gold underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
