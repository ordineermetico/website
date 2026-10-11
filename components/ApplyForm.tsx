"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import type { Dictionary } from "@/content";
import { site } from "@/lib/site";
import { Arrow } from "./Arrow";

type Field = "fullName" | "email" | "linkedin" | "cv" | "consent";
type Status = "idle" | "sending" | "success" | "error" | "fallback" | "closed";

const MAX_CV = 4 * 1024 * 1024;

export function ApplyForm({
  t,
  lang,
  jobSlug,
  jobTitle,
  privacyHref,
}: {
  t: Dictionary["careers"]["form"];
  lang: string;
  jobSlug: string;
  jobTitle: string;
  privacyHref: string;
}) {
  const [errors, setErrors] = useState<Field[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Application: ${jobTitle}`)}`;

  const validate = (fd: FormData): Field[] => {
    const errs: Field[] = [];
    const s = (k: string) => String(fd.get(k) ?? "").trim();
    if (s("fullName").length < 2) errs.push("fullName");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s("email"))) errs.push("email");
    if (s("linkedin") && !/^https:\/\/\S+$/.test(s("linkedin"))) errs.push("linkedin");
    const cv = fd.get("cv");
    if (!(cv instanceof File) || cv.size === 0 || cv.size > MAX_CV || !/\.(pdf|docx?)$/i.test(cv.name)) errs.push("cv");
    if (fd.get("consent") !== "on") errs.push("consent");
    return errs;
  };

  const show = (s: Status) => {
    setStatus(s);
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs = validate(fd);
    setErrors(errs);
    if (errs.length) {
      form.querySelector<HTMLElement>(`[name="${errs[0]}"]`)?.focus();
      return;
    }
    fd.set("job", jobSlug);
    fd.set("lang", lang);
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; fields?: Field[] };
      if (res.ok && json.ok) {
        form.reset();
        setFileName("");
        show("success");
      } else if (json.code === "not_configured") show("fallback");
      else if (json.code === "job_closed") show("closed");
      else if (json.code === "invalid" && json.fields) {
        setErrors(json.fields);
        setStatus("idle");
      } else show("error");
    } catch {
      show("error");
    }
  }

  const has = (k: Field) => errors.includes(k);
  const err = (k: Field) =>
    has(k) ? (
      <p id={`${k}-error`} className="mt-2 text-sm text-[#9b2c1f]">
        {t.errors[k]}
      </p>
    ) : null;
  const req = <span className="ml-1 text-oe-bronze" aria-hidden="true">*</span>;
  const opt = <span className="ml-2 normal-case tracking-normal text-oe-graphite">({t.optional})</span>;

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border-t border-oe-gold py-14 outline-none">
        <p className="font-display text-5xl text-oe-ink">{t.successTitle}</p>
        <p className="lede mt-6 max-w-lg">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} encType="multipart/form-data">
      {errors.length ? (
        <p role="alert" className="mb-10 border-l border-[#9b2c1f] pl-4 text-sm text-[#9b2c1f]">
          {t.errors.summary}
        </p>
      ) : null}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="apply-website">Website</label>
        <input id="apply-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="field-label">
            {t.fullName}
            {req}
          </label>
          <input id="fullName" name="fullName" autoComplete="name" className="field" aria-invalid={has("fullName")} aria-describedby={has("fullName") ? "fullName-error" : undefined} />
          {err("fullName")}
        </div>
        <div>
          <label htmlFor="apply-email" className="field-label">
            {t.email}
            {req}
          </label>
          <input id="apply-email" name="email" type="email" autoComplete="email" className="field" aria-invalid={has("email")} aria-describedby={has("email") ? "email-error" : undefined} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="phone" className="field-label">
            {t.phone}
            {opt}
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
        </div>
        <div>
          <label htmlFor="apply-location" className="field-label">
            {t.location}
            {opt}
          </label>
          <input id="apply-location" name="location" autoComplete="address-level2" className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="linkedin" className="field-label">
            {t.linkedin}
            {opt}
          </label>
          <input id="linkedin" name="linkedin" type="url" inputMode="url" placeholder="https://www.linkedin.com/in/…" className="field" aria-invalid={has("linkedin")} aria-describedby={has("linkedin") ? "linkedin-error" : undefined} />
          {err("linkedin")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="apply-message" className="field-label">
            {t.message}
            {opt}
          </label>
          <textarea id="apply-message" name="message" rows={5} placeholder={t.messageHint} className="field" />
        </div>
        <div className="sm:col-span-2">
          <span className="field-label" id="cv-label">
            {t.cv}
            {req}
          </span>
          <label
            htmlFor="cv"
            className={`flex cursor-pointer flex-col gap-1 border border-dashed px-6 py-6 transition-colors hover:border-oe-bronze sm:flex-row sm:items-center sm:justify-between ${
              has("cv") ? "border-[#9b2c1f]" : "border-oe-rule"
            }`}
          >
            <span className="text-oe-ink">{fileName || t.cvHint}</span>
            <span className="label text-oe-bronze">{fileName ? "✓" : "PDF · DOC · DOCX"}</span>
          </label>
          <input
            id="cv"
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            aria-labelledby="cv-label"
            aria-invalid={has("cv")}
            aria-describedby={has("cv") ? "cv-error" : undefined}
            onChange={(e) => setFileName(e.currentTarget.files?.[0]?.name ?? "")}
          />
          {err("cv")}
        </div>
      </div>

      <label htmlFor="apply-consent" className="mt-10 flex cursor-pointer items-start gap-4 text-[0.95rem] leading-relaxed text-oe-graphite">
        <input id="apply-consent" name="consent" type="checkbox" aria-invalid={has("consent")} className="mt-1 size-4 flex-none cursor-pointer accent-[#7E5A1E]" />
        <span>
          {t.consent}{" "}
          <Link href={privacyHref} className="text-oe-ink underline decoration-oe-gold underline-offset-4">
            {t.consentLink}
          </Link>
          .{req}
        </span>
      </label>
      {err("consent")}

      <button type="submit" disabled={status === "sending"} aria-busy={status === "sending"} className="btn btn-solid mt-12 disabled:cursor-wait disabled:opacity-70">
        {status === "sending" ? t.sending : t.submit} {status !== "sending" ? <Arrow /> : null}
      </button>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status === "fallback" || status === "closed" ? (
          <div className="mt-10 border border-oe-rule bg-oe-paper p-8">
            <p className="font-display text-2xl text-oe-ink">{t.fallbackTitle}</p>
            <p className="mt-3 text-oe-graphite">
              {t.fallbackBody}{" "}
              <a href={mailto} className="text-oe-ink underline decoration-oe-gold underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          </div>
        ) : null}
        {status === "error" ? (
          <div role="alert" className="mt-10 border-l border-[#9b2c1f] pl-5">
            <p className="font-display text-2xl text-oe-ink">{t.errorTitle}</p>
            <p className="mt-2 text-oe-graphite">
              {t.errorBody}{" "}
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
