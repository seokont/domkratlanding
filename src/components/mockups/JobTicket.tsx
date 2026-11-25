/**
 * Hero visual: a paper job ticket (work order) laid over a workshop blueprint
 * of a car. Decorative — the wrapper in Hero carries role="img" + aria-label.
 */
import { Check, CheckCircle2, Clock, CreditCard, Wrench } from "lucide-react";
import type { Dictionary } from "@/i18n/config";
import { cn } from "@/components/ui/primitives";

type M = Dictionary["mock"];

/** Side-view car outline drawn like a technical drawing, with dimension lines. */
export function CarBlueprint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 300" className={className} fill="none" direction="ltr" aria-hidden="true">
      <g className="bp-body" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 200 L52 160 Q60 140 90 136 L190 128 L250 82 Q262 72 284 72 L430 72 Q452 72 470 86 L530 132 L592 144 Q612 148 614 168 L616 200" pathLength={1} />
        <path d="M40 200 L92 200 M196 200 L428 200 M532 200 L616 200" pathLength={1} />
        <path d="M212 130 L262 92 Q268 88 278 88 L340 88 L340 130 Z" pathLength={1} />
        <path d="M356 88 L428 88 Q440 88 452 98 L494 130 L356 130 Z" pathLength={1} />
        <path d="M348 88 L348 196 M232 132 L232 196 M470 132 L476 196" opacity="0.55" pathLength={1} />
        <circle cx="144" cy="200" r="50" pathLength={1} />
        <circle cx="144" cy="200" r="22" pathLength={1} />
        <circle cx="480" cy="200" r="50" pathLength={1} />
        <circle cx="480" cy="200" r="22" pathLength={1} />
      </g>
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.6">
        <path d="M144 268 L480 268 M144 260 L144 276 M480 260 L480 276" />
        <path d="M630 72 L630 250 M622 72 L638 72 M622 250 L638 250" />
        <path d="M144 200 L144 290 M480 200 L480 290" strokeDasharray="4 6" />
      </g>
      <g fill="currentColor" fontSize="13" fontFamily="ui-monospace, monospace" opacity="0.8">
        <text x="292" y="288">2 690</text>
        <text x="612" y="140" transform="rotate(90 612 140)">1 690</text>
      </g>
    </svg>
  );
}

/** 12 yellow stars in a ring — the EU band emblem, drawn small */
function EuStars() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <circle key={i} cx={6 + 4.6 * Math.sin(a)} cy={6 - 4.6 * Math.cos(a)} r="0.85" fill="#ffcc00" />;
      })}
    </svg>
  );
}

/** Small Israeli flag: white field, two blue stripes, blue star */
function IlFlag() {
  return (
    <svg viewBox="0 0 16 11" className="h-[7px] w-[10px] rounded-[1px]" aria-hidden="true">
      <rect width="16" height="11" fill="#fff" />
      <rect y="1.2" width="16" height="1.4" fill="#0038b8" />
      <rect y="8.4" width="16" height="1.4" fill="#0038b8" />
      <path d="M8 3.2 9.6 6 8 8.8 6.4 6Z M6.4 4.4H9.6L8 7.4Z" fill="none" stroke="#0038b8" strokeWidth="0.6" />
    </svg>
  );
}

/**
 * Licence plate in the market's style — always laid out left-to-right,
 * like the real plate, even on the Hebrew (RTL) page.
 *  ua: white, blue band with flag + UA
 *  eu: white, EU blue band with star ring + country code
 *  il: yellow, blue band with flag + IL
 */
function Plate({ number, style, code }: { number: string; style: string; code: string }) {
  const il = style === "il";
  return (
    <span
      dir="ltr"
      className={cn("inline-flex h-8 items-stretch overflow-hidden rounded-md ring-2 ring-ink", il ? "bg-[#ffcc00]" : "bg-white")}
    >
      <span
        className={cn(
          "flex w-5 flex-col items-center justify-between pt-1 pb-0.5 text-[8px] leading-none font-bold text-white",
          style === "ua" ? "bg-[#0057b8]" : "bg-[#003399]",
        )}
      >
        {style === "ua" && <span className="h-1.5 w-3 rounded-[1px] bg-[#ffd700]" />}
        {style === "eu" && <EuStars />}
        {il && <IlFlag />}
        {code}
      </span>
      <span className="flex items-center px-2 font-mono text-[15px] font-bold tracking-[0.12em] whitespace-nowrap text-ink">
        {number}
      </span>
    </span>
  );
}

export function JobTicketMock({ m }: { m: M }) {
  const [carModel, plate = ""] = m.carName.split(" · ");
  const works = [
    { name: m.workRows[0], sum: m.workSums[0] },
    { name: m.workRows[1], sum: m.workSums[1] },
    { name: m.workRows[2], sum: m.workSums[2] },
  ];
  const stage = 2; // current step of m.timeline (0-based)
  const last = m.timeline.length - 1;

  return (
    <div className="relative" aria-hidden="true">
      <div className="relative rotate-[-1.5deg] rounded-[1.4rem] bg-surface shadow-device ring-1 ring-ink/10">
        {/* header band with punch hole */}
        <div className="flex items-center justify-between gap-3 rounded-t-[1.4rem] bg-ink px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <span className="size-4 shrink-0 rounded-full bg-bg ring-4 ring-white/15" />
            <p className="font-display text-base font-bold sm:text-lg">{m.orderNo}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-ink">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink/50" />
              <span className="relative inline-flex size-2 rounded-full bg-ink" />
            </span>
            {m.status}
          </span>
        </div>

        <div className="px-5 pt-5 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold tracking-wide text-ink-3 uppercase">{m.car}</p>
              <p className="font-display text-lg font-extrabold text-ink">{carModel}</p>
            </div>
            {plate && <Plate number={plate} style={m.plateStyle} code={m.plateCode} />}
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
            {[
              [m.client, m.clientName],
              [m.mileage, m.mileageValue],
              [m.post, m.postValue.split(" · ")[0]],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0 rounded-lg border border-dashed border-line px-2.5 py-2">
                <dt className="text-ink-3">{k}</dt>
                <dd className="tabular mt-0.5 truncate font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-[11px] font-semibold tracking-wide text-ink-3 uppercase">{m.works}</p>
          <ul className="mt-1 divide-y divide-dashed divide-line text-[13px]">
            {works.map((w, i) => (
              <li key={w.name} className="flex items-center gap-2.5 py-2">
                <span
                  style={{ animationDelay: `${0.9 + i * 0.22}s` }}
                  className={cn(
                    "animate-pop grid size-5 shrink-0 place-items-center rounded-md",
                    i < 2 ? "bg-success text-white" : "ring-2 ring-line",
                  )}
                >
                  {i < 2 && <Check className="size-3.5" strokeWidth={3} />}
                </span>
                <span className={cn("flex-1", i < 2 ? "text-ink-3 line-through decoration-ink-3/40" : "text-ink-2")}>
                  {w.name}
                </span>
                <span className="tabular font-semibold text-ink">{w.sum}</span>
              </li>
            ))}
          </ul>

          {/* repair stage track */}
          <div className="relative mt-5 flex justify-between px-2">
            <span className="absolute top-[9px] inset-e-2 inset-s-2 h-1 rounded-full bg-muted" />
            <span
              className="absolute top-[9px] inset-s-2 h-1 rounded-full animate-grow-x bg-gradient-to-r from-brand to-accent rtl:bg-gradient-to-l"
              style={{ width: `calc((100% - 1rem) * ${stage / last})` }}
            />
            {m.timeline.map((s, i) => (
              <span key={s} className="relative flex w-0 flex-col items-center">
                <span
                  className={cn(
                    "grid size-[22px] place-items-center rounded-full ring-4 ring-surface",
                    i < stage && "bg-brand text-white",
                    i === stage && "bg-accent text-ink",
                    i > stage && "bg-muted",
                  )}
                >
                  {i < stage && <Check className="size-3" strokeWidth={3.5} />}
                  {i === stage && <Wrench className="size-3" />}
                </span>
                <span
                  className={cn(
                    "mt-1.5 text-[10px] whitespace-nowrap",
                    i === stage ? "font-bold text-ink" : "text-ink-3",
                    i !== stage && "max-sm:hidden",
                  )}
                >
                  {s}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* perforated tear line with side notches */}
        <div className="relative h-0">
          <span className="absolute -top-3 -inset-s-3 size-6 rounded-full bg-bg" />
          <span className="absolute -top-3 -inset-e-3 size-6 rounded-full bg-bg" />
          <span className="absolute inset-x-5 top-0 border-t-2 border-dashed border-line" />
        </div>

        {/* stub */}
        <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-5">
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-ink-3 uppercase">{m.total}</p>
            <p className="tabular font-display text-2xl font-extrabold text-ink">{m.totalValue}</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-success-soft px-3 py-2 text-success">
            <CreditCard className="size-4 shrink-0" />
            <div className="text-[11px] leading-tight">
              <p className="font-bold">{m.receipt}</p>
              <p>{m.fiscalized}</p>
            </div>
          </div>
        </div>

        {/* rubber stamp */}
        <span className="animate-stamp pointer-events-none absolute top-[44%] inset-e-3 max-w-36 rounded-lg border-[3px] border-double border-success/70 bg-surface/40 px-3 py-1.5 text-center text-[11px] leading-tight font-extrabold tracking-wider text-success/85 uppercase sm:inset-e-8">
          <CheckCircle2 className="mx-auto mb-0.5 size-4" />
          {m.approved}
        </span>
      </div>

      {/* floating: key tag */}
      <div className="absolute -bottom-12 -inset-s-3 animate-swing-in hidden rotate-[7deg] items-center rtl:rotate-[-7deg] gap-2 rounded-s-[2rem] rounded-e-xl bg-accent py-2 pe-4 ps-3 shadow-lift sm:flex xl:-inset-s-8">
        <span className="size-4 rounded-full bg-bg ring-2 ring-accent-ink/30" />
        <span className="tabular font-mono text-lg font-extrabold text-ink">#1048</span>
        <Clock className="size-4 text-accent-ink" />
      </div>
    </div>
  );
}
