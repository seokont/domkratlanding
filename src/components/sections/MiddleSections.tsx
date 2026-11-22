import {
  ArrowRight,
  Camera,
  Check,
  CheckCheck,
  CircleDot,
  Building2,
  Database,
  FileText,
  Mic,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n/config";
import { Container, CtaLink, PlaceholderBadge, Section, SectionHeading, cn, rv } from "@/components/ui/primitives";
import { CarBlueprint } from "@/components/mockups/JobTicket";

const CheckList = ({ items, inverted }: { items: string[]; inverted?: boolean }) => (
  <ul className="space-y-3">
    {items.map((p) => (
      <li key={p} className={cn("flex gap-3 text-base leading-snug", inverted ? "text-slate-200" : "text-ink-2")}>
        <span
          className={cn(
            "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
            inverted ? "bg-accent text-ink" : "bg-brand-soft text-brand",
          )}
        >
          <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
        </span>
        {p}
      </li>
    ))}
  </ul>
);

/* ================= 7. HONEST NUMBERS: till receipt ================= */
export function Numbers({ t, demo }: { t: Dictionary["numbers"]; demo: string }) {
  const r = t.receipt;
  return (
    <Section labelledBy="numbers-title" className="bg-muted/60">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <SectionHeading id="numbers-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.text} align="left" />
          <ol className="mt-8 space-y-4">
            {t.rules.map((rule, i) => (
              <li key={rule.title} {...rv(i)} className="flex gap-4 rounded-2xl bg-surface p-5 shadow-soft ring-1 ring-line">
                <span className="grid size-10 shrink-0 rotate-[-6deg] place-items-center rounded-lg border-2 border-double border-success font-mono text-sm font-extrabold text-success">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{rule.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-3">{rule.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <ul className="mt-6 flex flex-wrap gap-2">
            {t.points.map((p) => (
              <li key={p} className="rounded-full bg-surface px-3.5 py-1.5 text-sm font-semibold text-ink-2 ring-1 ring-line">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div role="img" aria-label={`${r.title}: ${r.total} ${r.totalValue}`} {...rv(0, "print")} className="relative mx-auto w-full max-w-sm">
          <div aria-hidden="true" className="receipt-edge relative rotate-[1.5deg] bg-surface px-7 py-9 font-mono text-[13px] text-ink shadow-device">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold tracking-wide uppercase">{r.title}</p>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-ink-3">{demo}</span>
            </div>
            <p className="mt-1 text-ink-3">{"=".repeat(30)}</p>
            <ul className="mt-3 space-y-2.5">
              {r.rows.map(([k, v]) => (
                <li key={k} className="flex items-baseline gap-2">
                  <span className="shrink-0">{k}</span>
                  <span className="mb-1 flex-1 border-b border-dotted border-ink-3/50" />
                  <span className="tabular shrink-0 font-bold">{v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-md bg-accent-soft px-2.5 py-2 text-[12px] text-accent-ink">
              {r.late} <b className="whitespace-nowrap">{r.lateTag}</b>
            </p>
            <p className="mt-4 text-ink-3">{"-".repeat(30)}</p>
            <p className="mt-2 flex items-baseline justify-between gap-2 text-base font-bold">
              <span>{r.total}</span>
              <span className="tabular text-lg">{r.totalValue}</span>
            </p>
            <div className="mt-6 flex items-center justify-between gap-3">
              <div className="flex h-8 gap-[3px]">
                {Array.from({ length: 22 }, (_, i) => (
                  <span key={i} className="bg-ink" style={{ width: [1, 2, 1, 3, 1, 2][i % 6] }} />
                ))}
              </div>
              <span className="receipt-stamp shrink-0 rotate-[-10deg] rounded-md border-[3px] border-double border-success/75 px-2.5 py-1 text-center font-sans text-[11px] leading-tight font-extrabold tracking-wider text-success/85 uppercase">
                <Check className="me-1 inline size-3.5" strokeWidth={3} />
                {r.stamp}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ================= 8. TELEGRAM-FIRST: chat thread ================= */
function Bubble({
  side = "in",
  time,
  i,
  children,
}: {
  side?: "in" | "out";
  time?: string;
  /** reveal order in the thread; omit for a bubble nested in another revealed block */
  i?: number;
  children: React.ReactNode;
}) {
  return (
    <div {...(i === undefined ? {} : rv(i, "chat"))} className={cn("flex", side === "out" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-soft",
          side === "out" ? "rounded-ee-md bg-brand text-white" : "rounded-es-md bg-surface text-ink",
        )}
      >
        {children}
        {time && (
          <span className={cn("mt-0.5 flex items-center justify-end gap-1 text-[10px]", side === "out" ? "text-white/70" : "text-ink-3")}>
            {time}
            {side === "out" && <CheckCheck className="size-3" />}
          </span>
        )}
      </div>
    </div>
  );
}

export function ClientPage({ t }: { t: Dictionary["clientPage"] }) {
  const c = t.chat;
  return (
    <Section labelledBy="client-title" className="relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -bottom-40 -inset-s-40 size-[520px] rounded-full bg-brand/30 blur-3xl" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading id="client-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.text} align="left" inverted />
          <div className="mt-8">
            <CheckList items={t.points} inverted />
          </div>
          <p className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 font-display text-lg font-bold text-white ring-1 ring-white/15">
            <Smartphone className="size-5 text-accent" aria-hidden="true" />
            {t.caption}
          </p>
        </div>

        <div role="img" aria-label={t.title} className="mx-auto w-full max-w-md">
          <div aria-hidden="true" className="overflow-hidden rounded-[1.75rem] bg-[#dfe7ef] shadow-device ring-1 ring-white/10">
            <div className="flex items-center gap-3 bg-surface px-4 py-3">
              <span className="grid size-10 place-items-center rounded-full bg-ink text-accent">
                <Wrench className="size-5" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-ink">{c.name}</p>
                <p className="text-[11px] text-success">{c.status}</p>
              </div>
            </div>
            <div className="space-y-2.5 bg-[radial-gradient(rgb(15_23_42/0.06)_1px,transparent_1px)] [background-size:14px_14px] px-3.5 py-4">
              <Bubble i={0} time={c.times[0]}>{c.accepted}</Bubble>
              <div {...rv(1, "chat")} className="flex">
                <div className="w-[70%] overflow-hidden rounded-2xl rounded-es-md bg-surface shadow-soft">
                  <div className="relative grid h-28 place-items-center bg-[linear-gradient(135deg,#1e293b,#475569)]">
                    <CarBlueprint className="absolute inset-x-3 bottom-1 text-white/25" />
                    <Camera className="relative size-7 text-white/80" />
                  </div>
                  <p className="px-3.5 py-2 text-[13px] leading-snug text-ink">{c.found}</p>
                </div>
              </div>
              <div {...rv(2, "chat")} className="max-w-[82%]">
                <Bubble time={c.times[1]}>{c.ask}</Bubble>
                <div className="mt-1 grid grid-cols-2 gap-1">
                  <span className="rounded-xl bg-surface/80 py-2 text-center text-[13px] font-semibold text-brand">{c.approve}</span>
                  <span className="rounded-xl bg-surface/80 py-2 text-center text-[13px] font-semibold text-ink-3">{c.later}</span>
                </div>
              </div>
              <Bubble i={3} side="out" time={c.times[2]}>
                {c.approved}
              </Bubble>
              <Bubble i={4} time={c.times[3]}>
                <span className="font-semibold">{c.ready}</span>
                <span className="mt-2 block rounded-lg bg-brand py-1.5 text-center text-[13px] font-semibold text-white">{c.pay}</span>
              </Bubble>
              <Bubble i={5} time={c.times[4]}>
                <span className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-success-soft text-success">
                    <FileText className="size-4" />
                  </span>
                  {c.receipt}
                </span>
              </Bubble>
              <div {...rv(6, "chat")} className="flex justify-center pt-1">
                <span className="rounded-full bg-accent px-3 py-1 text-[12px] font-semibold text-ink shadow-soft">{c.reminder}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ================= 9. AUDIENCE: key tags on a pegboard ================= */
const audienceIcons: Record<string, LucideIcon> = {
  sto: Wrench,
  tires: CircleDot,
  detailing: Sparkles,
  network: Building2,
};
const tagColors = ["bg-accent", "bg-surface", "bg-brand-soft", "bg-success-soft"];
const tagTilt = ["rotate-[-3deg]", "rotate-[2deg]", "rotate-[-1.5deg]", "rotate-[3deg]"];

export function Audience({ t }: { t: Dictionary["audience"] }) {
  return (
    <Section id="audience" labelledBy="audience-title">
      <Container>
        <SectionHeading id="audience-title" eyebrow={t.eyebrow} title={t.title} />
        <div className="pegboard mt-12 rounded-[1.75rem] px-5 pt-10 pb-12 shadow-[inset_0_2px_12px_rgb(68_52_30/0.25)] ring-1 ring-[#cdbb98] sm:px-8">
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {t.items.map((a, i) => {
              const Icon = audienceIcons[a.id] ?? Wrench;
              return (
                <li key={a.id} {...rv(i)} className="relative flex flex-col items-center">
                  {/* hook */}
                  <span aria-hidden="true" className="relative z-10 size-4 rounded-full bg-ink-2 ring-4 ring-ink-3/40" />
                  <span aria-hidden="true" className="h-5 w-0.5 bg-ink-2" />
                  <a
                    href={a.href}
                    data-cta={`audience_${a.id}`}
                    data-cta-location="audience"
                    style={{ animationDelay: `${i * -1.3}s` }}
                    className={cn(
                      "animate-sway group relative flex w-full flex-1 origin-top flex-col rounded-[1.5rem] rounded-t-[2.5rem] p-6 pt-9 text-ink shadow-lift ring-1 ring-ink/10 transition-transform duration-300 ease-out hover:rotate-0",
                      tagColors[i % 4],
                      tagTilt[i % 4],
                    )}
                  >
                    <span aria-hidden="true" className="absolute top-3 left-1/2 size-4 -translate-x-1/2 rounded-full bg-[#e9dcc3] ring-2 ring-ink/15" />
                    <span className="flex items-center justify-between">
                      <span className="tabular font-mono text-sm font-extrabold">#{String(i + 1).padStart(2, "0")}</span>
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-3 text-xl font-extrabold">{a.title}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-2">{a.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">
                      {t.more}
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/* ================= 10. TECHNICIAN TABLET ================= */
function StoreBadge({ store, soon }: { store: string; soon: string }) {
  return (
    <span className="inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-ink px-4 text-white opacity-90">
      <Smartphone className="size-5" aria-hidden="true" />
      <span className="leading-tight">
        <span className="block text-[10px] text-slate-300">{soon}</span>
        <span className="block text-sm font-semibold">{store}</span>
      </span>
    </span>
  );
}

const levelTone: Record<string, string> = {
  ok: "bg-success-soft text-success",
  warn: "bg-accent-soft text-accent-ink",
  urgent: "bg-danger-soft text-danger",
};
const levelDot: Record<string, string> = { ok: "bg-success", warn: "bg-accent", urgent: "bg-danger" };

export function MobileApp({ t }: { t: Dictionary["mobile"] }) {
  const tb = t.tablet;
  const levels = tb.levels as Record<string, string>;
  return (
    <Section labelledBy="mobile-title" className="bg-surface">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <SectionHeading id="mobile-title" eyebrow={t.eyebrow} title={t.title} align="left" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[t.master, t.owner].map((block) => (
              <div key={block.title}>
                <h3 className="mb-4 text-lg font-bold text-ink">{block.title}</h3>
                <CheckList items={block.points} />
              </div>
            ))}
          </div>
          <p className="mt-8 rounded-xl bg-brand-soft px-4 py-3 text-[15px] leading-relaxed text-brand-ink">{t.pwa}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <StoreBadge store="App Store" soon={t.soon} />
            <StoreBadge store="Google Play" soon={t.soon} />
            <PlaceholderBadge />
          </div>
        </div>

        {/* landscape tablet */}
        <div role="img" aria-label={t.title} {...rv(0)} className="mx-auto w-full max-w-xl">
          <div aria-hidden="true" className="rounded-[2rem] bg-ink p-3 shadow-device ring-1 ring-white/10 sm:p-4">
            <div className="overflow-hidden rounded-[1.25rem] bg-bg">
              <div className="flex items-center justify-between bg-surface px-4 py-2.5 text-[12px] ring-1 ring-line">
                <span className="font-bold text-ink">{tb.order}</span>
                <span className="tabular font-mono text-ink-3">09:52</span>
              </div>
              <div className="grid gap-3 p-3 sm:grid-cols-[0.9fr_1.1fr] sm:p-4">
                {/* timer */}
                <div className="flex flex-col items-center rounded-2xl bg-surface p-4 ring-1 ring-line">
                  <p className="self-start text-[12px] font-semibold text-ink-2">{tb.job}</p>
                  <div
                    className="timer-ring mt-3 grid size-32 place-items-center rounded-full"
                  >
                    <div className="grid size-[6.5rem] place-items-center rounded-full bg-surface text-center">
                      <div>
                        <p className="text-[10px] font-semibold tracking-wide text-ink-3 uppercase">{tb.timer}</p>
                        <p className="tabular font-mono text-2xl font-extrabold text-ink">0:52</p>
                        <p className="text-[10px] text-ink-3">{tb.norm}</p>
                      </div>
                    </div>
                  </div>
                  <span className="mt-4 w-full rounded-xl bg-success py-2.5 text-center text-[13px] font-bold text-white">{tb.done}</span>
                </div>
                {/* traffic-light checklist */}
                <div className="flex flex-col gap-2">
                  {tb.checks.map(([name, value, level]) => (
                    <div key={name} className="flex items-center gap-3 rounded-2xl bg-surface p-3 ring-1 ring-line">
                      <span className="flex flex-col gap-1 rounded-md bg-ink p-1">
                        {["urgent", "warn", "ok"].map((l) => (
                          <span key={l} className={cn("size-2 rounded-full", l === level ? levelDot[l] : "bg-white/15", l === level && l === "urgent" && "animate-blink")} />
                        ))}
                      </span>
                      <span className="flex-1">
                        <span className="block text-[13px] font-semibold text-ink">{name}</span>
                        <span className="block text-[11px] text-ink-3">{value}</span>
                      </span>
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", levelTone[level])}>{levels[level]}</span>
                    </div>
                  ))}
                  <div className="mt-auto grid grid-cols-[1fr_auto] gap-2">
                    <span className="flex items-center gap-2 rounded-2xl bg-accent px-3 py-3 text-[12px] font-bold text-ink">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-accent">
                        <Mic className="size-4" />
                      </span>
                      <span className="leading-tight">{tb.voice}</span>
                    </span>
                    <span className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-surface px-4 text-[11px] font-semibold text-ink-2 ring-1 ring-line">
                      <Camera className="size-5 text-brand" />
                      {tb.photo}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ================= 11. INTEGRATIONS: parts-cabinet drawers ================= */
export function Integrations({ t }: { t: Dictionary["integrations"] }) {
  return (
    <Section id="integrations" labelledBy="integrations-title" className="bg-bg">
      <Container>
        <SectionHeading id="integrations-title" eyebrow={t.eyebrow} title={t.title} />
        <div className="mt-12 rounded-[1.5rem] bg-ink-2 p-3 shadow-device sm:p-4">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.groups.map((g, i) => (
              <li key={g.title} {...rv(i % 4)} className="flex flex-col rounded-xl bg-surface p-4 shadow-[inset_0_-4px_0_rgb(15_23_42/0.08)]">
                <h3 className="mx-auto rounded-sm border-2 border-ink-3/40 bg-bg px-3 py-0.5 font-mono text-[11px] font-bold tracking-widest text-ink-2 uppercase shadow-[inset_0_1px_2px_rgb(15_23_42/0.15)]">
                  {g.title}
                </h3>
                <ul className="mt-4 flex flex-1 flex-wrap content-start justify-center gap-1.5">
                  {g.items.map((name) => (
                    <li key={name} className="rounded-lg bg-muted px-2.5 py-1.5 text-sm font-semibold text-ink-2">
                      {name}
                    </li>
                  ))}
                </ul>
                <span aria-hidden="true" className="mx-auto mt-4 h-2 w-16 rounded-full bg-ink-3/40" />
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-center text-sm text-ink-3">{t.note}</p>
      </Container>
    </Section>
  );
}

/* ================= 12. SECURITY: compact dark band ================= */
const securityIcons: Record<string, LucideIcon> = {
  server: Server,
  database: Database,
  users: Users,
  shield: ShieldCheck,
};

export function Security({ t }: { t: Dictionary["security"] }) {
  return (
    <section aria-labelledby="security-title" className="cv-auto bg-ink py-14 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:items-center">
        <SectionHeading id="security-title" eyebrow={t.eyebrow} title={t.title} align="left" inverted />
        <ul className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
          {t.items.map((s, i) => {
            const Icon = securityIcons[s.icon] ?? ShieldCheck;
            return (
              <li key={s.title} {...rv(i)} className="flex gap-4 bg-ink p-5">
                <Icon className="mt-0.5 size-6 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-white">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-slate-400">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/* ================= 13. PILOT: five open bays ================= */
export function Pilot({ t }: { t: Dictionary["pilot"] }) {
  return (
    <Section labelledBy="pilot-title" className="bg-accent-soft/60">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading id="pilot-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.text} align="left" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.terms.map((term, i) => (
              <li key={term} {...rv(i)} className="flex items-start gap-3 rounded-xl bg-surface p-4 text-[15px] font-semibold text-ink shadow-soft">
                <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
                {term}
              </li>
            ))}
          </ul>
          <CtaLink href="#lead" cta="pilot" location="pilot" intent="pilot" size="lg" className="mt-8">
            {t.cta}
            <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden="true" />
          </CtaLink>
        </div>

        <div role="img" aria-label={t.slotsLabel} className="rounded-[1.5rem] bg-ink p-5 shadow-device sm:p-7">
          <div aria-hidden="true" className="grid grid-cols-5 border-x-2 border-white/80">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                {...rv(i, "pop")}
                className={cn(
                  "flex h-48 flex-col items-center justify-between py-4 sm:h-56",
                  i > 0 && "border-s-2 border-white/80",
                )}
              >
                <span className="font-mono text-2xl font-extrabold text-accent sm:text-3xl">{i + 1}</span>
                <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase sm:text-xs">{t.slot}</span>
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="mt-4 h-1 rounded-full bg-[repeating-linear-gradient(to_right,var(--color-accent)_0_18px,transparent_18px_30px)]" />
        </div>
      </Container>
    </Section>
  );
}
