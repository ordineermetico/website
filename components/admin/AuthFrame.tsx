import Image from "next/image";
import type { ReactNode } from "react";
import { signOut } from "@/app/admin/actions/auth";

/** Narrow centred frame for the sign-in steps (welcome, two-step). */
export function AuthFrame({ step, title, intro, children }: { step?: string; title: string; intro: ReactNode; children: ReactNode }) {
  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Image src="/brand/oe-emblem-bronze-transparent.png" alt="" width={1032} height={993} className="h-14 w-auto" priority />
        {step ? <p className="label mt-10 text-oe-bronze">{step}</p> : null}
        <h1 className="mt-3 font-display text-[2.4rem] leading-tight text-oe-ink">{title}</h1>
        <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-oe-graphite">{intro}</div>
        <div className="mt-10">{children}</div>
        <form action={signOut} className="mt-12 border-t border-oe-rule pt-6">
          <button type="submit" className="label text-oe-graphite hover:text-oe-ink">
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
