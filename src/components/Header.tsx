"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n/config";
import { localeNames, localeShort, locales } from "@/i18n/config";
import { CtaLink, Logo, cn } from "@/components/ui/primitives";

type Props = { nav: Dictionary["nav"]; lang: Locale; brand: string; appUrl: string };

function LangSwitch({ lang, label, className }: { lang: Locale; label: string; className?: string }) {
  return (
    <nav aria-label={label} className={cn("flex rounded-lg bg-muted p-0.5", className)}>
      {locales.map((l) => (
        <a
          key={l}
          href={`/${l}/`}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          title={localeNames[l]}
          className={cn(
            "grid min-h-9 min-w-10 place-items-center rounded-md px-2 text-xs font-semibold transition-colors duration-200",
            l === lang ? "bg-surface text-ink shadow-soft" : "text-ink-3 hover:text-ink",
          )}
        >
          {localeShort[l]}
        </a>
      ))}
    </nav>
  );
}

export function Header({ nav, lang, brand, appUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    ["#features", nav.features],
    ["#audience", nav.audience],
    ["#pricing", nav.pricing],
    ["#integrations", nav.integrations],
    ["#faq", nav.faq],
  ] as const;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-200",
        scrolled || open
          ? "border-line bg-surface/90 shadow-soft backdrop-blur-md"
          : "border-transparent bg-bg/70 backdrop-blur-sm",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:inset-s-2 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2"
      >
        {nav.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href={`/${lang}/`} className="shrink-0 rounded-lg" aria-label={brand}>
          <Logo brand={brand} className="h-11 sm:h-12" />
        </a>

        <nav aria-label="Main" className="ms-4 hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-2 transition-colors duration-200 hover:bg-muted hover:text-ink"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <LangSwitch lang={lang} label={nav.language} className="hidden sm:flex" />
          <a
            href={appUrl}
            data-cta="login"
            data-cta-location="header"
            className="hidden min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-ink-2 transition-colors duration-200 hover:bg-muted hover:text-ink md:inline-flex"
          >
            {nav.login}
          </a>
          <span className="hidden sm:block">
            <CtaLink href="#lead" cta="trial" location="header" intent="trial">
              {nav.cta}
            </CtaLink>
          </span>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl text-ink hover:bg-muted lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-surface lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <ul className="space-y-1">
            {links.map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-3 text-base font-semibold text-ink hover:bg-muted"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
            <LangSwitch lang={lang} label={nav.language} />
            <a
              href={appUrl}
              data-cta="login"
              data-cta-location="mobile_menu"
              className="inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-ink-2 hover:bg-muted"
            >
              {nav.login}
            </a>
          </div>
          <CtaLink
            href="#lead"
            cta="trial"
            location="mobile_menu"
            intent="trial"
            size="lg"
            className="mt-4 w-full"
            onClick={() => setOpen(false)}
          >
            {nav.cta}
          </CtaLink>
        </nav>
      </div>
    </header>
  );
}
