import Image from "next/image";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ---------- Scroll reveal props: {...rv(i)} fades the element in when it scrolls into view, staggered by i ---------- */
export type RevealKind = "up" | "fade" | "pop" | "draw" | "print" | "chat";
export const rv = (i = 0, kind: RevealKind = "up") => ({
  "data-reveal": kind,
  style: { "--i": i } as CSSProperties,
});

/* ---------- Logo: Domkrat STO wordmark (public/domkrat-sto-logo*.svg, 553×150) ---------- */
export function Logo({ brand, className, inverted }: { brand: string; className?: string; inverted?: boolean }) {
  return (
    <Image
      src={inverted ? "/domkrat-sto-logo-light.svg" : "/domkrat-sto-logo.svg"}
      alt={brand}
      width={553}
      height={150}
      priority={!inverted}
      className={cn("h-10 w-auto shrink-0", className)}
    />
  );
}

/* ---------- Buttons / CTA links ---------- */
type Variant = "primary" | "secondary" | "ghost" | "light";
const variants: Record<Variant, string> = {
  primary:
    "btn-shine bg-brand text-white shadow-[0_8px_20px_-8px_rgb(3_105_161/0.6)] hover:bg-brand-hover active:translate-y-px",
  secondary: "bg-surface text-ink ring-1 ring-line hover:ring-ink-3/40 hover:bg-muted active:translate-y-px",
  ghost: "text-ink hover:bg-muted",
  light: "bg-white text-ink hover:bg-brand-soft active:translate-y-px",
};
const sizes = {
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-13 px-6 text-base whitespace-nowrap max-[380px]:whitespace-normal",
};

type CtaProps = ComponentProps<"a"> & {
  variant?: Variant;
  size?: keyof typeof sizes;
  /** analytics: CTA id */
  cta: string;
  /** analytics: where on the page */
  location: string;
  /** lead form preset: trial | demo | migration | sales */
  intent?: string;
};

export function CtaLink({ variant = "primary", size = "md", cta, location, intent, className, children, ...rest }: CtaProps) {
  return (
    <a
      {...rest}
      data-cta={cta}
      data-cta-location={location}
      data-intent={intent}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[background-color,box-shadow,transform,color] duration-200 ease-out",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}

/* ---------- Section scaffolding ---------- */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("cv-auto py-16 sm:py-24", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  inverted,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  inverted?: boolean;
}) {
  return (
    <div data-reveal="up" className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold tracking-wide uppercase",
            inverted ? "text-accent" : "text-brand",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "text-3xl leading-tight font-extrabold sm:text-4xl",
          inverted ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg leading-relaxed", inverted ? "text-slate-300" : "text-ink-3")}>{subtitle}</p>
      )}
    </div>
  );
}

export function PlaceholderBadge({ children = "[PLACEHOLDER]" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-dashed border-accent-ink/40 bg-accent-soft px-2 py-0.5 font-mono text-[11px] font-semibold text-accent-ink">
      {children}
    </span>
  );
}

/* ---------- Device frames for mockups ---------- */
export function BrowserFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-surface shadow-device ring-1 ring-ink/10", className)}>
      <div className="flex items-center gap-1.5 border-b border-line bg-muted px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#f87171]" />
        <span className="size-2.5 rounded-full bg-[#fbbf24]" />
        <span className="size-2.5 rounded-full bg-[#34d399]" />
        <span className="ml-3 h-5 flex-1 rounded-md bg-surface ring-1 ring-line" />
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative w-[240px] rounded-[2.4rem] bg-ink p-2.5 shadow-device ring-1 ring-white/10",
        className,
      )}
    >
      <div className="absolute top-4 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative h-[470px] overflow-hidden rounded-[1.9rem] bg-bg pt-8">{children}</div>
    </div>
  );
}
