"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localePath, routes, stripLocale, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content";
import { Logo } from "./Logo";
import { Arrow } from "./Arrow";

const navKeys = ["firm", "capabilities", "markets", "approach", "news", "contact"] as const;
/** Shown in the mobile menu only; on desktop Careers sits in the footer. */
const mobileExtra = ["careers"] as const;

export function Header({ lang, t }: { lang: Locale; t: Dictionary["nav"] }) {
  const pathname = usePathname() || "/";
  const path = stripLocale(pathname);
  const isHome = path === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll, close on Escape, keep focus inside the open menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a,button"));
        const all = [toggleRef.current!, ...items];
        const idx = all.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && idx <= 0) {
          e.preventDefault();
          all[all.length - 1].focus();
        } else if (!e.shiftKey && idx === all.length - 1) {
          e.preventDefault();
          all[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Over the black home hero the header is transparent and light; elsewhere it is ivory.
  const dark = (isHome && !scrolled) || open;
  const otherLang: Locale = lang === "en" ? "fr" : "en";
  const switchHref = localePath(otherLang, path);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ${
        dark
          ? "on-dark border-b border-transparent bg-transparent"
          : "border-b border-oe-rule/70 bg-oe-ivory/88 backdrop-blur-md supports-[backdrop-filter]:bg-oe-ivory/78"
      } ${open ? "bg-oe-black!" : ""}`}
    >
      <div className="container-oe flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo href={localePath(lang, "/")} label={t.homeAria} tone={dark ? "dark" : "light"} />

        <nav aria-label={t.primary} className="hidden items-center gap-7 min-[1320px]:flex">
          <ul className="flex items-center gap-6">
            {navKeys.slice(0, 5).map((key) => {
              const href = localePath(lang, routes[key]);
              const active = path === routes[key] || path.startsWith(routes[key] + "/");
              return (
                <li key={key}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`label link-line whitespace-nowrap transition-colors ${
                      dark ? "text-oe-softwhite/85 hover:text-oe-softwhite" : "text-oe-ink/80 hover:text-oe-ink"
                    } ${active ? (dark ? "text-oe-gold!" : "text-oe-bronze!") + " [background-size:100%_1px]" : ""}`}
                  >
                    {t[key]}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span aria-hidden="true" className={`h-5 w-px ${dark ? "bg-oe-gold/40" : "bg-oe-rule"}`} />
          <Link
            href={switchHref}
            hrefLang={otherLang}
            lang={otherLang}
            className={`label transition-colors ${dark ? "text-oe-softwhite/70 hover:text-oe-gold" : "text-oe-graphite hover:text-oe-bronze"}`}
            aria-label={t.switchTo}
          >
            {t.switchToShort}
          </Link>
          <Link href={localePath(lang, routes.contact)} className="btn btn-solid min-h-11! px-5! py-3! tracking-[0.18em]!">
            {t.cta}
          </Link>
        </nav>

        <div className="flex items-center gap-5 min-[1320px]:hidden">
          <Link
            href={switchHref}
            hrefLang={otherLang}
            lang={otherLang}
            aria-label={t.switchTo}
            className={`label hidden sm:inline ${dark ? "text-oe-softwhite/75" : "text-oe-graphite"}`}
          >
            {t.switchToShort}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`label flex min-h-11 items-center gap-3 ${dark ? "text-oe-softwhite" : "text-oe-ink"}`}
          >
            <span className="max-[400px]:sr-only">{open ? t.close : t.menu}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ${open ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-500 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="on-dark h-[calc(100dvh-var(--header-h))] overflow-y-auto bg-oe-black min-[1320px]:hidden"
      >
        <nav aria-label={t.primary} className="container-oe flex min-h-full flex-col justify-between py-10">
          <ul className="flex flex-col">
            {(["home", ...navKeys, ...mobileExtra] as const).map((key, i) => {
              const href = localePath(lang, routes[key]);
              const active = path === routes[key];
              return (
                <li key={key} className="border-b border-oe-gold/15">
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-baseline justify-between gap-4 py-4 font-display text-[1.9rem] leading-tight transition-colors ${
                      active ? "text-oe-gold" : "text-oe-softwhite hover:text-oe-gold"
                    }`}
                  >
                    <span>{t[key]}</span>
                    <span className="label text-oe-muted-dark">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 flex flex-col gap-6">
            <Link href={localePath(lang, routes.contact)} className="btn btn-solid w-full">
              {t.cta} <Arrow />
            </Link>
            <div className="flex items-center justify-between gap-6">
              <p className="label text-oe-muted-dark">Reims · France</p>
              <Link href={switchHref} hrefLang={otherLang} lang={otherLang} className="label link-line text-oe-softwhite">
                {t.switchTo}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
