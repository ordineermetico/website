"use client";

import { useActionState } from "react";
import { changePassword, updateName } from "@/app/admin/actions/account";
import { FormMessage, SubmitButton } from "./client";
import { Field } from "./ui";

export function NameForm({ fullName }: { fullName: string }) {
  const [state, action] = useActionState(updateName, undefined);
  return (
    <form action={action} className="space-y-6">
      <Field label="Full name" htmlFor="full_name">
        <input id="full_name" name="full_name" defaultValue={fullName} className="field" />
      </Field>
      <SubmitButton>Save</SubmitButton>
      <FormMessage state={state} />
    </form>
  );
}

export function PasswordForm({ email }: { email: string }) {
  const [state, action] = useActionState(changePassword, undefined);
  return (
    <form action={action} className="space-y-6">
      <input type="text" name="username" autoComplete="username" defaultValue={email} hidden readOnly />
      <Field label="Current password" htmlFor="current">
        <input id="current" name="current" type="password" autoComplete="current-password" required className="field" />
      </Field>
      <Field label="New password" htmlFor="next" hint="At least 12 characters. A password manager makes this easy.">
        <input id="next" name="next" type="password" autoComplete="new-password" minLength={12} required className="field" />
      </Field>
      <Field label="Repeat the new password" htmlFor="confirm">
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" minLength={12} required className="field" />
      </Field>
      <SubmitButton pendingLabel="Changing…">Change password</SubmitButton>
      <FormMessage state={state} />
    </form>
  );
}
