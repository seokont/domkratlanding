import {
  ArrowRight,
  Calculator,
  CalendarDays,
  Camera,
  Car,
  Check,
  ClipboardCheck,
  ClipboardList,
  Cog,
  CreditCard,
  Droplets,
  FileCheck2,
  Gauge,
  Package,
  PhoneCall,
  ScanLine,
  SearchCheck,
  Timer,
  Users,
  Wallet,
  Warehouse,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n/config";
import type { CSSProperties } from "react";
import { Container, CtaLink, Section, SectionHeading, cn, rv } from "@/components/ui/primitives";
import { CarBlueprint, JobTicketMock } from "@/components/mockups/JobTicket";

/* ================= 2. HERO ================= */
export function Hero({ t, m }: { t: Dictionary["hero"]; m: Dictionary["mock"] }) {
  const colon = t.title.indexOf(":");
  const lead = colon > 0 ? t.title.slice(0, colon + 1) : t.title;
  const rest = colon > 0 ? t.title.slice(colon + 1).trim() : "";
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_70%)]" />
      <CarBlueprint className="pointer-events-none absolute top-24 inset-e-[-14rem] hidden w-[54rem] text-brand/15 lg:block xl:inset-e-[-10rem]" />
      <Container className="relative grid items-center gap-14 pt-10 pb-20 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pt-20 lg:pb-28">
        <div>
          <p {...rv(0)} className="inline-flex items-center gap-2 rounded-full bg-ink py-1.5 pe-3.5 ps-1.5 text-sm font-semibold text-white">
            <span className="grid size-6 place-items-center rounded-full bg-accent text-ink" aria-hidden="true">
              <Wrench className="size-3.5" strokeWidth={2.5} />
            </span>
            {t.badge}
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[2.15rem] leading-[1.08] font-extrabold text-ink sm:text-5xl xl:text-[3.6rem]"
          >
            <span className="bg-[linear-gradient(transparent_62%,var(--color-accent-soft)_62%,var(--color-accent-soft)_92%,transparent_92%)] box-decoration-clone">
              {lead}
            </span>
            {rest && (
              <span className="mt-3 block text-[1.35rem] leading-snug font-bold text-ink-2 sm:text-[1.7rem] xl:text-[1.9rem]">
                {rest}
              </span>
            )}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-3">{t.subtitle}</p>
          <div {...rv(1)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink href="#lead" cta="trial" location="hero" intent="trial" size="lg">
              {t.ctaPrimary}
              <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden="true" />
            </CtaLink>
            <CtaLink href="#lead" cta="demo" location="hero" intent="demo" size="lg" variant="secondary">
              {t.ctaSecondary}
            </CtaLink>
          </div>
          <ul {...rv(2)} className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink-2">
            {t.notes.map((n) => (
              <li key={n} className="flex items-center gap-1.5">
                <Check className="size-4 text-success" strokeWidth={3} aria-hidden="true" />
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div role="img" aria-label={t.mockLabel} className="animate-ticket-in relative mx-auto w-full max-w-[34rem] pt-4 pb-6 sm:px-6 lg:px-0">
          <JobTicketMock m={m} />
        </div>
      </Container>
    </section>
  );
}

/* ================= 3. PAINS: notebook page → ticket stub ================= */
const painIcons: Record<string, LucideIcon> = {
  calendar: CalendarDays,
  camera: Camera,
  package: Package,
  calculator: Calculator,
};

export function Pains({ t }: { t: Dictionary["pains"] }) {
  return (
    <Section labelledBy="pains-title" className="bg-surface">
      <Container>
        <SectionHeading id="pains-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <ul className="mt-14 grid gap-x-8 gap-y-12 lg:grid-cols-2">
          {t.items.map((item, i) => {
            const Icon = painIcons[item.icon] ?? Wrench;
            return (
              <li key={item.title} {...rv(i % 2)}>
                <h3 className="flex items-center gap-3 text-xl font-bold text-ink">
                  <span className="grid size-10 place-items-center rounded-xl bg-ink text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  {item.title}
                </h3>
                <div className="mt-5 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-3">
                  {/* before: torn notebook page */}
                  <div
                    className={cn(
                      "paper-lined relative rounded-sm px-5 pt-7 pb-5 ps-9 shadow-soft",
                      i % 2 ? "rotate-[1deg]" : "rotate-[-1.2deg]",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-3deg] bg-accent/40"
                    />
                    <p className="text-[11px] font-bold tracking-wider text-danger uppercase">{t.before}</p>
                    <p className="mt-1 text-[15px] leading-[26px] text-ink-2 italic rtl:not-italic">{item.before}</p>
                  </div>
                  <ArrowRight className="mx-auto size-6 rotate-90 text-ink-3 sm:rotate-0 sm:rtl:-scale-x-100" aria-hidden="true" />
                  {/* after: ticket stub */}
                  <div className="ticket-notch relative rounded-xl bg-bg p-5 ring-1 ring-line">
                    <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-success uppercase">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                      {t.after}
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{item.after}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/* ================= 4. PROCESS: a road with km posts ================= */
const processIcons: LucideIcon[] = [PhoneCall, ClipboardCheck, SearchCheck, FileCheck2, Wrench, CreditCard];

export function Process({ t }: { t: Dictionary["process"] }) {
  return (
    <Section labelledBy="process-title">
      <Container>
        <SectionHeading id="process-title" eyebrow={t.eyebrow} title={t.title} />

        <div className="mt-12 hidden items-center justify-between text-sm font-semibold text-ink-2 lg:flex">
          <span className="inline-flex items-center gap-2">
            <span className="size-3 rounded-full bg-success" aria-hidden="true" />
            {t.start}
          </span>
          <span className="inline-flex items-center gap-2">
            {t.finish}
            <span className="flag-checker size-5 rounded-sm" aria-hidden="true" />
          </span>
        </div>

        <ol className="relative mt-8 grid gap-6 lg:mt-4 lg:grid-cols-6 lg:gap-4">
          {/* asphalt: vertical on mobile, horizontal on desktop */}
          <span aria-hidden="true" className="road-v absolute top-0 bottom-0 inset-s-0 w-14 rounded-full lg:hidden" />
          <span aria-hidden="true" className="road-h absolute top-0 inset-e-0 inset-s-0 hidden h-14 rounded-full lg:block" />
          <span aria-hidden="true" className="absolute top-0 inset-x-0 hidden h-14 overflow-hidden rounded-full lg:block">
            <span className="road-car absolute top-0 flex h-14 items-center text-accent">
              <Car className="size-7 rtl:-scale-x-100" strokeWidth={2.2} />
            </span>
          </span>
          {t.steps.map((step, i) => {
            const Icon = processIcons[i] ?? Wrench;
            return (
              <li key={step.title} {...rv(i)} className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                <span className="relative z-10 ms-1 flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-surface text-ink shadow-lift ring-2 ring-ink lg:mt-1 lg:ms-0">
                  <Icon className="size-5 text-brand" aria-hidden="true" />
                  <span className="tabular font-mono text-[10px] leading-none font-bold">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <div className="pt-1 lg:pt-6">
                  <h3 className="text-base font-bold text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-3">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-8 flex items-center gap-2 ps-1 text-sm font-semibold text-ink-2 lg:hidden">
          <span className="flag-checker size-5 rounded-sm" aria-hidden="true" />
          {t.finish}
        </p>
      </Container>
    </Section>
  );
}

/* ================= 5. AUTOMOTIVE DEPTH: blueprint with callouts ================= */
const depthIcons: Record<string, LucideIcon> = {
  vin: ScanLine,
  mileage: Gauge,
  service: Droplets,
  hours: Timer,
  parts: Cog,
  act: FileCheck2,
};
/** callout pin positions over the CarBlueprint viewBox (640×300), in % */
const depthPins: Record<string, [number, number]> = {
  act: [11, 52],
  vin: [36, 40],
  mileage: [52, 31],
  hours: [62, 55],
  parts: [75, 67],
  service: [89, 51],
};

export function Depth({ t }: { t: Dictionary["depth"] }) {
  return (
    <section id="features" aria-labelledby="depth-title" className="cv-auto relative overflow-hidden bg-[#0b2540] py-16 sm:py-24">
      <div className="bg-blueprint pointer-events-none absolute inset-0" />
      <Container className="relative">
        <SectionHeading id="depth-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} inverted />

        <div className="relative mx-auto mt-12 max-w-4xl" role="img" aria-label={t.label} {...rv(0, "draw")}>
          <CarBlueprint className="w-full text-sky-100/70" />
          {t.items.map((item, i) => {
            const [x, y] = depthPins[item.id] ?? [50, 50];
            return (
              <span
                key={item.id}
                aria-hidden="true"
                className="bp-pin absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent font-mono text-xs font-extrabold text-ink ring-4 ring-accent/25 sm:size-9 sm:text-sm"
                style={{ left: `${x}%`, top: `${y}%`, "--i": i } as CSSProperties}
              >
                <span className="bp-pin-ping absolute inset-0 rounded-full bg-accent" />
                <span className="relative">{i + 1}</span>
              </span>
            );
          })}
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-sky-100/15 ring-1 ring-sky-100/15 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = depthIcons[item.id] ?? Wrench;
            return (
              <li key={item.id} {...rv(i % 3)} className="flex gap-4 bg-[#0b2540] p-5 sm:p-6">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent font-mono text-sm font-extrabold text-ink">
                  {i + 1}
                </span>
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                    {item.title}
                    <Icon className="size-4 text-sky-200/70" aria-hidden="true" />
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-sky-100/75">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/* ================= 6. MODULES: a spec sheet ================= */
const featureIcons: Record<string, LucideIcon> = {
  orders: ClipboardList,
  booking: CalendarDays,
  estimates: FileCheck2,
  inspection: Camera,
  stock: Warehouse,
  payments: Wallet,
  payroll: Users,
  clients: Car,
};

export function Features({ t }: { t: Dictionary["features"] }) {
  return (
    <Section id="modules" labelledBy="features-title" className="bg-surface">
      <Container>
        <SectionHeading id="features-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-12 overflow-hidden rounded-xl bg-bg ring-2 ring-ink">
          <div className="flex items-center justify-between gap-4 border-b-2 border-ink px-5 py-3 font-mono text-xs font-bold tracking-wider text-ink uppercase sm:px-6">
            <span>{t.sheet}</span>
            <span className="text-ink-3">{t.rev}</span>
          </div>
          <ul className="grid lg:grid-cols-2">
            {t.items.map((f, i) => {
              const Icon = featureIcons[f.id] ?? Wrench;
              return (
                <li
                  key={f.id}
                  {...rv(i % 2)}
                  className={cn(
                    "grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-dashed border-line p-5 sm:p-6",
                    i > 0 && "border-t",
                    i === 1 && "lg:border-t-0",
                    i % 2 === 1 && "lg:border-s",
                  )}
                >
                  <span className="flex flex-col items-center gap-1.5">
                    <span className="tabular font-mono text-[11px] font-bold text-ink-3">M-{String(i + 1).padStart(2, "0")}</span>
                    <span className="grid size-10 place-items-center rounded-lg bg-surface text-brand ring-1 ring-line">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </span>
                  <div>
                    <h3 className="text-lg leading-snug font-bold text-ink">{f.title}</h3>
                    <ul className="mt-2 space-y-1.5">
                      {f.points.map((p) => (
                        <li key={p} className="flex gap-2 text-[15px] leading-snug text-ink-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={2.5} aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
