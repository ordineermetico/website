import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="on-dark grain relative hidden flex-col justify-between bg-oe-black p-14 text-oe-softwhite lg:flex">
        <Image src="/brand/oe-logo-gold-transparent.png" alt="Ordine Ermetico" width={1645} height={1290} className="h-auto w-56" priority />
        <p className="max-w-sm font-display text-3xl leading-snug">Website administration</p>
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Image src="/brand/oe-emblem-bronze-transparent.png" alt="" width={1032} height={993} className="h-14 w-auto lg:hidden" />
          <h1 className="mt-8 font-display text-[2.6rem] leading-none text-oe-ink lg:mt-0">Sign in</h1>
          <p className="mt-4 text-[0.95rem] text-oe-graphite">For Ordine Ermetico staff. If you have forgotten your password, ask an admin to reset it.</p>
          <div className="mt-12">
            <LoginForm next={next ?? ""} />
          </div>
        </div>
      </div>
    </main>
  );
}
