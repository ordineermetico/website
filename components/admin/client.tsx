"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

export function SubmitButton({ children, pendingLabel = "Saving…", variant = "solid", name, value }: { children: ReactNode; pendingLabel?: string; variant?: "solid" | "ghost"; name?: string; value?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      name={name}
      value={value}
      disabled={pending}
      aria-busy={pending}
      className={`btn ${variant === "solid" ? "btn-solid" : "btn-ghost"} min-h-11! px-5! py-3! disabled:cursor-wait disabled:opacity-60`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

/** A submit button that asks for confirmation first. */
export function ConfirmButton({ children, message, name, value, formAction }: { children: ReactNode; message: string; name?: string; value?: string; formAction?: (fd: FormData) => void }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      name={name}
      value={value}
      formAction={formAction}
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className="label min-h-11 px-1 text-[#9b2c1f] underline-offset-4 hover:underline disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function FormMessage({ state }: { state: { ok?: boolean; error?: string; message?: string } | undefined }) {
  if (!state || (!state.error && !state.message)) return null;
  return (
    <p role={state.error ? "alert" : "status"} className={`border-l px-4 py-2 text-sm ${state.error ? "border-[#9b2c1f] text-[#9b2c1f]" : "border-[#3d6b4a] text-[#2f5a3b]"}`}>
      {state.error ?? state.message}
    </p>
  );
}
