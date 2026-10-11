"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { confirmTwoStep, setFirstPassword, startTwoStep, verifyTwoStep, type EnrolState } from "@/app/admin/actions/security";
import { FormMessage, SubmitButton } from "./client";
import { Field } from "./ui";

export function FirstPasswordForm({ email }: { email: string }) {
  const [state, action] = useActionState(setFirstPassword, undefined);
  return (
    <form action={action} className="space-y-8">
      <input type="text" name="username" autoComplete="username" defaultValue={email} hidden readOnly />
      <Field label="New password" htmlFor="next" hint="At least 12 characters. A password manager makes this easy.">
        <input id="next" name="next" type="password" autoComplete="new-password" minLength={12} required className="field" />
      </Field>
      <Field label="Repeat the new password" htmlFor="confirm">
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" minLength={12} required className="field" />
      </Field>
      <FormMessage state={state} />
      <SubmitButton pendingLabel="Saving…">Save and continue</SubmitButton>
    </form>
  );
}

function CodeInput() {
  return (
    <input
      id="code"
      name="code"
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern="[0-9 ]{6,7}"
      maxLength={7}
      required
      autoFocus
      placeholder="123 456"
      className="field font-mono text-2xl! tracking-[0.3em]"
    />
  );
}

export function VerifyForm() {
  const [state, action] = useActionState(verifyTwoStep, undefined);
  return (
    <form action={action} className="space-y-8">
      <Field label="6-digit code" htmlFor="code">
        <CodeInput />
      </Field>
      <FormMessage state={state} />
      <SubmitButton pendingLabel="Checking…">Continue</SubmitButton>
    </form>
  );
}

export function EnrolForm() {
  const [enrol, setEnrol] = useState<EnrolState | null>(null);
  const [pending, start] = useTransition();
  const [state, action] = useActionState(confirmTwoStep, undefined);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return; // start the setup once, even if React re-runs effects
    started.current = true;
    start(async () => setEnrol(await startTwoStep()));
  }, []);

  if (pending || !enrol) return <p className="text-oe-graphite">Preparing…</p>;
  if (enrol.error) return <FormMessage state={enrol} />;
  return (
    <div className="space-y-8">
      <ol className="list-decimal space-y-2 pl-5 text-[0.95rem] text-oe-graphite">
        <li>Open an authenticator app on your phone (Google Authenticator, Microsoft Authenticator, 1Password, Authy…).</li>
        <li>Add an account and scan this code.</li>
        <li>Enter the 6-digit code the app shows.</li>
      </ol>
      <div className="flex justify-center border border-oe-rule bg-white p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={enrol.qr} alt="QR code for your authenticator app" width={200} height={200} />
      </div>
      <details className="text-sm text-oe-graphite">
        <summary className="cursor-pointer">Can’t scan? Enter this key instead</summary>
        <p className="mt-3 select-all break-all font-mono text-oe-ink">{enrol.secret}</p>
      </details>
      <form action={action} className="space-y-8">
        <input type="hidden" name="factorId" value={enrol.factorId} />
        <Field label="6-digit code" htmlFor="code">
          <CodeInput />
        </Field>
        <FormMessage state={state} />
        <SubmitButton pendingLabel="Checking…">Turn on two-step sign-in</SubmitButton>
      </form>
    </div>
  );
}
