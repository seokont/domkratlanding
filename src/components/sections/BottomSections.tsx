import { ArrowRight, Check, ChevronDown, Clock, Mail, Phone, Send } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n/config";
import { localeNames, locales } from "@/i18n/config";
import { Container, CtaLink, Logo, Section, SectionHeading, cn, rv } from "@/components/ui/primitives";
import { LeadForm } from "./LeadForm";
import { site } from "@/lib/site";

/* ================= 16. MIGRATION: one-day moving schedule ================= */
export function Migration({ t, brand }: { t: Dictionary["migration"]; brand: string }) {
  return (
    <Section labelledBy="migration-title" className="bg-surface">
      <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading id="migration-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.text} align="left" />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-ink-3">{t.from}:</span>
            {t.sources.map((s) => (
              <span key={s} className="rounded-lg bg-muted px-3 py-1.5 text-sm font-bold text-ink-2">
                {s}
              </span>
            ))}
            <ArrowRight className="size-5 text-ink-3 rtl:-scale-x-100" aria-hidden="true" />
            <span className="rounded-lg bg-ink px-3 py-1.5 text-sm font-bold text-white">{brand}</span>
          </div>
          <CtaLink href="#lead" cta="migration" location="migration" intent="migration" size="lg" className="mt-8">
            {t.cta}
            <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden="true" />
          </CtaLink>
        </div>

        {/* one-day schedule like a shift sheet */}
        <ol className="relative rounded-2xl bg-bg p-6 ring-1 ring-line sm:p-8">
          <span aria-hidden="true" className="absolute top-10 bottom-10 inset-s-[6.45rem] w-0.5 bg-[repeating-linear-gradient(to_bottom,var(--color-line)_0_6px,transparent_6px_12px)] sm:inset-s-[7.7rem]" />
          {t.steps.map((s, i) => (
            <li key={s.time} {...rv(i)} className="relative grid grid-cols-[3.5rem_1.5rem_1fr] items-start gap-3 py-3 sm:grid-cols-[4rem_2rem_1fr]">
              <span className="tabular pt-0.5 font-mono text-sm font-bold text-ink-3">{s.time}</span>
              <span
                className={cn(
                  "relative z-10 mx-auto mt-0.5 grid size-6 place-items-center rounded-full ring-4 ring-bg",
                  i === t.steps.length - 1 ? "bg-success text-white" : "bg-ink text-white",
                )}
                aria-hidden="true"
              >
                {i === t.steps.length - 1 ? <Check className="size-3.5" strokeWidth={3} /> : <Clock className="size-3" />}
              </span>
              <span className="text-[15px] leading-snug font-semibold text-ink">{s.text}</span>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ================= 15. FAQ ================= */
export function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <Section id="faq" labelledBy="faq-title">
      <Container className="max-w-3xl">
        <SectionHeading id="faq-title" eyebrow={t.eyebrow} title={t.title} />
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {t.items.map((item, i) => (
            <details
              key={item.q}
              name="faq"
              {...rv(Math.min(i, 5), "fade")}
              className="group rounded-2xl bg-surface shadow-soft ring-1 ring-line open:ring-brand/30"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="flex min-h-14 list-none items-center justify-between gap-4 px-5 py-4 text-start text-base font-semibold text-ink sm:text-lg [&::-webkit-details-marker]:hidden">
                <span className="flex items-baseline gap-3">
                  <span className="tabular shrink-0 font-mono text-xs font-bold text-brand">Q-{String(i + 1).padStart(2, "0")}</span>
                  {item.q}
                </span>
                <ChevronDown
                  className="size-5 shrink-0 text-ink-3 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="border-t border-dashed border-line px-5 pt-4 pb-5 text-[15px] leading-relaxed text-ink-3 sm:ps-[4.1rem]">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ================= 16. FINAL CTA ================= */
export function FinalCta({ t, lang }: { t: Dictionary["finalCta"]; lang: Locale }) {
  return (
    <section id="lead" aria-labelledby="lead-title" className="cv-auto relative overflow-hidden bg-ink py-16 sm:py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.15] invert" />
      <div className="pointer-events-none absolute -top-32 inset-e-0 size-[520px] rounded-full bg-brand/40 blur-3xl" />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div {...rv(0)}>
          <h2 id="lead-title" className="text-3xl leading-tight font-extrabold text-white sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-300">{t.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-slate-400">{t.or}</span>
            <a
              href={site.contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="telegram"
              data-cta-location="final_cta"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white/10 px-5 font-semibold text-white ring-1 ring-white/20 transition-colors duration-200 hover:bg-white/20"
            >
              <Send className="size-5" aria-hidden="true" />
              {t.telegram}
            </a>
          </div>
        </div>
        <div {...rv(1)} className="overflow-hidden rounded-[1.4rem] shadow-device">
          <div className="flex items-center gap-3 bg-accent px-5 py-3.5 text-ink">
            <span className="size-4 shrink-0 rounded-full bg-ink ring-4 ring-ink/15" aria-hidden="true" />
            <span className="font-display text-base font-extrabold">{t.ticket}</span>
          </div>
          <div>
            <LeadForm f={t.form} lang={lang} endpoint={site.leadsEndpoint} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ================= 17. FOOTER ================= */
export function Footer({ t, nav, lang }: { t: Dictionary["footer"]; nav: Dictionary["nav"]; lang: Locale }) {
  const sections = [
    ["#features", nav.features],
    ["#audience", nav.audience],
    ["#pricing", nav.pricing],
    ["#integrations", nav.integrations],
    ["#faq", nav.faq],
  ] as const;
  const linkCls = "inline-flex min-h-9 items-center text-[15px] text-slate-300 transition-colors duration-200 hover:text-white";
  return (
    <footer className="bg-[#0b1120] text-slate-300">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo brand={site.brand} inverted />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-slate-400">{t.tagline}</p>
          <nav aria-label={nav.language} className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
            {locales.map((l) => (
              <a key={l} href={`/${l}/`} hrefLang={l} lang={l} aria-current={l === lang ? "true" : undefined} className={linkCls}>
                {localeNames[l]}
              </a>
            ))}
          </nav>
        </div>
        <nav aria-labelledby="footer-sections">
          <h2 id="footer-sections" className="text-sm font-bold tracking-wide text-white uppercase">
            {t.sections}
          </h2>
          <ul className="mt-4 space-y-1">
            {sections.map(([href, label]) => (
              <li key={href}>
                <a href={href} className={linkCls}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-bold tracking-wide text-white uppercase">{t.contacts}</h2>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={`tel:${site.contacts.phone.replace(/\s/g, "")}`} data-cta="phone" data-cta-location="footer" className={`${linkCls} gap-2`}>
                <Phone className="size-4" aria-hidden="true" />
                {site.contacts.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contacts.email}`} data-cta="email" data-cta-location="footer" className={`${linkCls} gap-2`}>
                <Mail className="size-4" aria-hidden="true" />
                {site.contacts.email}
              </a>
            </li>
            <li>
              <a href={site.contacts.telegram} target="_blank" rel="noopener noreferrer" data-cta="telegram" data-cta-location="footer" className={`${linkCls} gap-2`}>
                <Send className="size-4" aria-hidden="true" />
                Telegram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold tracking-wide text-white uppercase">{t.legal}</h2>
          <ul className="mt-4 space-y-1">
            <li>
              <a href="#privacy" className={linkCls}>
                {t.privacy}
              </a>
            </li>
            <li>
              <a href="#offer" className={linkCls}>
                {t.offer}
              </a>
            </li>
          </ul>
          <h2 className="mt-6 text-sm font-bold tracking-wide text-white uppercase">{t.social}</h2>
          <ul className="mt-3 flex flex-wrap gap-x-4">
            {Object.entries(site.social).map(([name, href]) => (
              <li key={name}>
                <a href={href} className={`${linkCls} capitalize`}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-6 text-sm text-slate-400">
          © {new Date().getFullYear()} {site.brand}. {t.rights}
        </Container>
      </div>
    </footer>
  );
}
