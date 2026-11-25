import { BadgeCheck, Check, Rocket } from "lucide-react";
import type { Dictionary } from "@/i18n/config";
import { Container, CtaLink, Section, SectionHeading, cn, rv } from "@/components/ui/primitives";

/* ================= 15. PRICING: price tags (2 plans in UA, 3 in IL/EU) ================= */
const salesPlans = new Set(["network", "business"]);

export function Pricing({ t }: { t: Dictionary["pricing"] }) {
  const three = t.plans.length >= 3;
  return (
    <Section id="pricing" labelledBy="pricing-title">
      <Container>
        <SectionHeading id="pricing-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {t.promises.map((p, i) => (
            <li key={p} {...rv(i, "pop")} className="inline-flex items-center gap-2 rounded-full bg-success-soft px-4 py-2 text-sm font-bold text-success">
              <BadgeCheck className="size-4" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>

        {t.offer && (
          <p
            {...rv(0, "pop")}
            className="mx-auto mt-5 flex w-fit max-w-full items-center gap-2.5 rounded-xl border-2 border-dashed border-accent bg-accent-soft px-4 py-2.5 text-center text-sm font-bold text-accent-ink"
          >
            <Rocket className="size-4 shrink-0" aria-hidden="true" />
            {t.offer}
          </p>
        )}

        <ul
          className={cn(
            "mx-auto mt-14 grid items-start gap-8",
            three ? "max-w-6xl lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-6" : "max-w-5xl lg:grid-cols-[1.35fr_1fr]",
          )}
        >
          {t.plans.map((plan, i) => {
            const main = plan.featured;
            return (
              <li
                key={plan.id}
                {...rv(i)}
                className={cn(
                  "relative flex h-full flex-col rounded-[1.75rem] rounded-ss-[3.5rem] p-7 pt-10 sm:p-9 sm:pt-12",
                  main ? "bg-ink text-white shadow-device" : "bg-surface shadow-soft ring-1 ring-line lg:mt-10 lg:h-[calc(100%-2.5rem)]",
                  three && "lg:p-7 lg:pt-11",
                )}
              >
                {/* tag eyelet + string */}
                <span
                  aria-hidden="true"
                  className={cn("absolute top-6 inset-s-6 size-5 rounded-full ring-4", main ? "bg-bg ring-accent" : "bg-bg ring-line")}
                />
                <span
                  aria-hidden="true"
                  className="absolute -top-8 inset-s-[2.15rem] h-14 w-0.5 origin-bottom rotate-[-20deg] bg-ink-3/60 rtl:rotate-[20deg]"
                />

                <div className="flex flex-wrap items-start justify-between gap-3 ps-8">
                  <div>
                    <h3 className={cn("text-3xl font-extrabold", main ? "text-white" : "text-ink")}>{plan.name}</h3>
                    <p className={cn("mt-1 text-[15px]", main ? "text-slate-300" : "text-ink-3")}>{plan.desc}</p>
                  </div>
                  {main && <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-ink">{t.popular}</span>}
                </div>

                <p className="mt-7 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  {plan.from && <span className={cn("text-lg font-semibold", main ? "text-slate-300" : "text-ink-3")}>{plan.from}</span>}
                  <span className={cn("tabular font-display text-5xl font-extrabold", main ? "text-white" : "text-ink")}>{plan.price}</span>
                  <span className={main ? "text-slate-300" : "text-ink-3"}>{t.perMonth}</span>
                </p>
                <p className={cn("mt-1 min-h-5 text-sm font-semibold", main ? "text-accent" : "text-brand")}>{plan.yearly}</p>
                <p
                  className={cn(
                    "mt-4 rounded-lg border border-dashed px-3 py-2 text-sm font-semibold",
                    main ? "border-white/25 text-white" : "border-line text-ink-2",
                  )}
                >
                  {plan.limits}
                </p>

                <ul className={cn("mt-7 grid flex-1 content-start gap-3", main && !three && "sm:grid-cols-2")}>
                  {plan.features.map((f) => (
                    <li key={f} className={cn("flex gap-2.5 text-[15px] leading-snug", main ? "text-slate-200" : "text-ink-2")}>
                      <Check className={cn("mt-0.5 size-4 shrink-0", main ? "text-accent" : "text-brand")} strokeWidth={3} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                <CtaLink
                  href="#lead"
                  cta={`pricing_${plan.id}`}
                  location="pricing"
                  intent={salesPlans.has(plan.id) ? "sales" : "trial"}
                  variant={main ? "light" : "secondary"}
                  size="lg"
                  className="mt-9 w-full"
                >
                  {plan.cta}
                </CtaLink>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-center text-sm font-medium text-ink-3">{t.note}</p>
        {t.extras && <p className="mx-auto mt-2 max-w-3xl text-center text-[13px] leading-relaxed text-ink-3">{t.extras}</p>}
      </Container>
    </Section>
  );
}
