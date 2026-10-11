"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const path = usePathname();
  const active = href === "/admin" ? path === "/admin" : path === href || path.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`block whitespace-nowrap px-3 py-2.5 text-[0.95rem] transition-colors lg:px-3 ${
        active ? "bg-oe-softwhite/8 text-oe-gold" : "text-oe-softwhite/75 hover:text-oe-softwhite"
      }`}
    >
      {children}
    </Link>
  );
}
