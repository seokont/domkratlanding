/**
 * Stylized UI mockups (div/SVG only, no screenshots). All labels come from the
 * locale dictionary (`mock` section). Mockups are decorative: the wrapping
 * element carries role="img" + aria-label, inner content is aria-hidden.
 */
import { Camera, Check, CheckCircle2, Circle, Clock, CreditCard, ScanLine, Wrench } from "lucide-react";
import type { Dictionary } from "@/i18n/config";
import { cn } from "@/components/ui/primitives";

type M = Dictionary["mock"];

const Pill = ({ tone = "brand", children }: { tone?: "brand" | "success" | "accent" | "muted"; children: React.ReactNode }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap",
      tone === "brand" && "bg-brand-soft text-brand-ink",
      tone === "success" && "bg-success-soft text-success",
      tone === "accent" && "bg-accent-soft text-accent-ink",
      tone === "muted" && "bg-muted text-ink-3",
    )}
  >
    {children}
  </span>
);

const Bar = ({ w, className }: { w: string; className?: string }) => (
  <span className={cn("block h-1.5 rounded-full bg-line", className)} style={{ width: w }} />
);

/* ================= HERO: desktop work order ================= */
export function WorkOrderMock({ m }: { m: M }) {
  const works = [
    { name: m.workRows[0], h: "1,2", sum: "1 080" },
    { name: m.workRows[1], h: "0,8", sum: "720" },
    { name: m.workRows[2], h: "0,5", sum: "450" },
  ];
  const parts = [
    { name: m.partRows[0], q: "1", sum: "1 650", tag: m.reserved },
    { name: m.partRows[1], q: "1", sum: "1 240", tag: m.inStock },
    { name: m.partRows[2], q: "1", sum: "260", tag: m.inStock },
  ];
  return (
    <div className="grid grid-cols-[150px_1fr] text-[11px] sm:grid-cols-[170px_1fr]" aria-hidden="true">
      {/* sidebar */}
      <div className="hidden flex-col gap-1 border-r border-line bg-bg p-3 min-[480px]:flex">
        {m.kanban.map((k, i) => (
          <div
            key={k}
            className={cn(
              "flex items-center justify-between rounded-lg px-2.5 py-2 font-medium",
              i === 2 ? "bg-surface text-ink shadow-soft" : "text-ink-3",
            )}
          >
            {k}
            <span className="tabular text-[10px] text-ink-3">{[4, 2, 6, 3][i]}</span>
          </div>
        ))}
        <div className="mt-3 space-y-2 px-2.5">
          <Bar w="80%" />
          <Bar w="60%" />
          <Bar w="70%" />
        </div>
      </div>
      {/* main */}
      <div className="col-span-2 p-4 min-[480px]:col-span-1 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-display text-sm font-bold text-ink sm:text-base">{m.orderNo}</p>
          <Pill tone="brand">
            <Clock className="size-3" /> {m.status}
          </Pill>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            [m.client, m.clientName],
            [m.car, m.carName],
            [m.mileage, m.mileageValue],
            [m.post, m.postValue],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-bg px-2.5 py-2 ring-1 ring-line">
              <p className="text-[10px] text-ink-3">{k}</p>
              <p className="truncate font-semibold text-ink">{v}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 mb-1.5 text-[10px] font-semibold tracking-wide text-ink-3 uppercase">{m.works}</p>
        <div className="divide-y divide-line rounded-lg ring-1 ring-line">
          {works.map((w) => (
            <div key={w.name} className="flex items-center gap-2 px-2.5 py-1.5">
              <Wrench className="size-3 shrink-0 text-brand" />
              <span className="flex-1 truncate text-ink-2">{w.name}</span>
              <span className="tabular w-12 text-right text-ink-3">
                {w.h} {m.hours}
              </span>
              <span className="tabular w-14 text-right font-semibold text-ink">{w.sum} ₴</span>
            </div>
          ))}
        </div>

        <p className="mt-3 mb-1.5 text-[10px] font-semibold tracking-wide text-ink-3 uppercase">{m.parts}</p>
        <div className="divide-y divide-line rounded-lg ring-1 ring-line">
          {parts.map((p) => (
            <div key={p.name} className="flex items-center gap-2 px-2.5 py-1.5">
              <span className="flex-1 truncate text-ink-2">{p.name}</span>
              <span className="hidden sm:inline">
                <Pill tone={p.tag === m.reserved ? "accent" : "success"}>{p.tag}</Pill>
              </span>
              <span className="tabular w-14 text-right font-semibold text-ink">{p.sum} ₴</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
          <Pill tone="success">
            <CheckCircle2 className="size-3" /> {m.approved}
          </Pill>
          <div className="flex items-center gap-3">
            <span className="text-ink-3">{m.total}</span>
            <span className="tabular font-display text-base font-extrabold text-ink">5 400 ₴</span>
            <span className="rounded-md bg-brand px-3 py-1.5 font-semibold text-white">{m.pay}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= HERO: phone — technician checklist ================= */
export function ChecklistPhoneMock({ m }: { m: M }) {
  return (
    <div className="px-3.5 text-[11px]" aria-hidden="true">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold text-ink">{m.checklist}</p>
        <Pill tone="brand">3/4</Pill>
      </div>
      <p className="mt-0.5 text-[10px] text-ink-3">{m.carName}</p>
      <div className="mt-3 space-y-2">
        {m.checkItems.map((item, i) => (
          <div key={item} className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2.5 shadow-soft">
            {i < 3 ? (
              <span className="grid size-5 place-items-center rounded-full bg-success text-white">
                <Check className="size-3" strokeWidth={3} />
              </span>
            ) : (
              <Circle className="size-5 text-line" />
            )}
            <span className={cn("font-medium", i < 3 ? "text-ink" : "text-ink-3")}>{item}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 mb-2 font-semibold text-ink">
        {m.photos} · 6
      </p>
      <div className="grid grid-cols-3 gap-1.5">
        {["#cbd5e1", "#94a3b8", "#bfdbfe", "#e2e8f0", "#a5b4c8"].map((c, i) => (
          <div key={i} className="aspect-square rounded-lg" style={{ background: `linear-gradient(135deg, ${c}, #f1f5f9)` }} />
        ))}
        <div className="grid aspect-square place-items-center rounded-lg border border-dashed border-brand/50 bg-brand-soft text-brand">
          <Camera className="size-4" />
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-brand py-2.5 text-center font-semibold text-white">{m.done}</div>
    </div>
  );
}

/* ================= FEATURE MINI-MOCKS ================= */
const MiniCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("h-full rounded-xl bg-bg p-3 text-[10px] ring-1 ring-line", className)} aria-hidden="true">
    {children}
  </div>
);

export function KanbanMini({ m }: { m: M }) {
  return (
    <MiniCard className="grid grid-cols-4 gap-1.5">
      {m.kanban.map((col, ci) => (
        <div key={col} className="min-w-0">
          <p className="mb-1 truncate font-semibold text-ink-3">{col}</p>
          {Array.from({ length: [2, 1, 3, 1][ci] }).map((_, i) => (
            <div key={i} className="mb-1 rounded-md bg-surface p-1.5 shadow-soft">
              <Bar w="80%" className={ci === 2 && i === 0 ? "bg-brand/40" : undefined} />
              <Bar w="50%" className="mt-1" />
            </div>
          ))}
        </div>
      ))}
    </MiniCard>
  );
}

export function CalendarMini({ m }: { m: M }) {
  const slots: Record<string, [number, number, string][]> = {
    0: [[0, 2, "bg-brand/80"], [3, 1, "bg-accent"]],
    1: [[1, 2, "bg-ink-2/70"], [4, 1, "bg-brand/80"]],
    2: [[0, 1, "bg-accent"], [2, 3, "bg-brand/80"]],
  };
  return (
    <MiniCard>
      <div className="grid grid-cols-[34px_repeat(5,1fr)] gap-1">
        <span />
        {m.days.map((d) => (
          <span key={d} className="text-center font-semibold text-ink-3">
            {d}
          </span>
        ))}
        {m.posts.map((p, pi) => (
          <div key={p} className="contents">
            <span className="truncate self-center font-medium text-ink-3">{p}</span>
            <div className="relative col-span-5 h-5 rounded-md bg-surface ring-1 ring-line">
              {slots[pi].map(([start, len, color], i) => (
                <span
                  key={i}
                  className={cn("absolute inset-y-0.5 rounded", color)}
                  style={{ left: `${(start / 5) * 100 + 1}%`, width: `${(len / 5) * 100 - 2}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </MiniCard>
  );
}

export function EstimateMini({ m }: { m: M }) {
  return (
    <MiniCard>
      <p className="font-semibold text-ink">{m.estimate} · 5 400 ₴</p>
      <div className="mt-2 space-y-1">
        {m.workRows.slice(0, 2).map((w) => (
          <div key={w} className="flex items-center gap-1.5 rounded-md bg-surface px-2 py-1 shadow-soft">
            <CheckCircle2 className="size-3 text-success" />
            <span className="truncate text-ink-2">{w}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5">
        <span className="flex-1 rounded-md bg-brand py-1 text-center font-semibold text-white">{m.approve}</span>
        <span className="flex-1 rounded-md bg-surface py-1 text-center font-semibold text-ink-3 ring-1 ring-line">
          {m.decline}
        </span>
      </div>
    </MiniCard>
  );
}

/** Top-view car body diagram with damage markers */
export function BodyDiagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 64" className={className} aria-hidden="true">
      <rect x="8" y="10" width="104" height="44" rx="20" fill="var(--color-surface)" stroke="var(--color-ink-3)" strokeWidth="1.5" />
      <rect x="34" y="16" width="44" height="32" rx="8" fill="var(--color-muted)" stroke="var(--color-ink-3)" strokeWidth="1" />
      <path d="M34 20 24 14M34 44 24 50M78 20l10-6M78 44l10 6" stroke="var(--color-ink-3)" strokeWidth="1" />
      <circle cx="18" cy="22" r="4" fill="var(--color-danger)" opacity=".85" />
      <circle cx="96" cy="48" r="4" fill="var(--color-accent)" />
      <circle cx="60" cy="54" r="3.2" fill="var(--color-accent)" />
    </svg>
  );
}

export function InspectionMini({ m }: { m: M }) {
  return (
    <MiniCard className="flex items-center gap-3">
      <BodyDiagram className="w-1/2 shrink-0" />
      <div className="min-w-0 flex-1 space-y-1">
        {m.checkItems.slice(0, 3).map((c) => (
          <div key={c} className="flex items-center gap-1">
            <Check className="size-3 shrink-0 text-success" strokeWidth={3} />
            <span className="truncate text-ink-2">{c}</span>
          </div>
        ))}
      </div>
    </MiniCard>
  );
}

export function StockMini({ m }: { m: M }) {
  const rows = [
    [m.partRows[0], "12", m.reserved, "accent"],
    [m.partRows[1], "34", m.inStock, "success"],
    [m.partRows[2], "2", m.toOrder, "muted"],
  ] as const;
  return (
    <MiniCard className="space-y-1">
      {rows.map(([name, qty, tag, tone]) => (
        <div key={name} className="flex items-center gap-1.5 rounded-md bg-surface px-2 py-1.5 shadow-soft">
          <span className="flex-1 truncate text-ink-2">{name}</span>
          <span className="tabular font-semibold text-ink">{qty}</span>
          <Pill tone={tone}>{tag}</Pill>
        </div>
      ))}
    </MiniCard>
  );
}

export function ReceiptMini({ m }: { m: M }) {
  return (
    <MiniCard className="flex gap-2">
      <div className="flex flex-1 flex-col justify-between rounded-md bg-surface p-2 shadow-soft">
        <p className="font-semibold text-ink">{m.cash}</p>
        <p className="tabular font-display text-sm font-extrabold text-ink">5 400 ₴</p>
        <span className="inline-flex items-center gap-1 text-ink-3">
          <CreditCard className="size-3" /> •••• 4521
        </span>
      </div>
      <div className="w-[46%] rounded-md bg-surface p-2 font-mono shadow-soft">
        <p className="font-semibold text-ink">{m.receipt}</p>
        <Bar w="90%" className="mt-1.5" />
        <Bar w="70%" className="mt-1" />
        <Bar w="80%" className="mt-1" />
        <p className="mt-1.5 inline-flex items-center gap-0.5 font-sans font-semibold text-success">
          <Check className="size-3" strokeWidth={3} />
          {m.fiscalized}
        </p>
      </div>
    </MiniCard>
  );
}

export function PayrollMini({ m }: { m: M }) {
  const vals = [86, 64, 72];
  return (
    <MiniCard>
      <p className="mb-1.5 font-semibold text-ink">{m.payroll}</p>
      <div className="space-y-1.5">
        {m.masters.map((name, i) => (
          <div key={name} className="flex items-center gap-2">
            <span className="w-14 truncate text-ink-2">{name}</span>
            <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface ring-1 ring-line">
              <span className="block h-full rounded-full bg-brand" style={{ width: `${vals[i]}%` }} />
            </span>
            <span className="tabular w-12 text-right font-semibold text-ink">{[24, 18, 20][i]} 400</span>
          </div>
        ))}
      </div>
    </MiniCard>
  );
}

export function HistoryMini({ m }: { m: M }) {
  return (
    <MiniCard>
      <p className="font-semibold text-ink">{m.carName}</p>
      <div className="mt-1.5 space-y-1 border-l-2 border-brand/30 pl-2">
        {m.historyRows.map((h, i) => (
          <p key={h} className="text-ink-2">
            <span className="tabular text-ink-3">{["03.2026", "11.2025", "06.2025"][i]}</span> · {h}
          </p>
        ))}
      </div>
      <p className="mt-1.5 rounded-md bg-accent-soft px-2 py-1 font-semibold text-accent-ink">{m.reminder}</p>
    </MiniCard>
  );
}

export const featureMocks = {
  orders: KanbanMini,
  booking: CalendarMini,
  estimates: EstimateMini,
  inspection: InspectionMini,
  stock: StockMini,
  payments: ReceiptMini,
  payroll: PayrollMini,
  clients: HistoryMini,
} as const;

/* ================= CLIENT PUBLIC PAGE (phone) ================= */
export function ClientStatusPhoneMock({ m, brand }: { m: M; brand: string }) {
  return (
    <div className="px-3.5 text-[11px]" aria-hidden="true">
      <p className="text-[10px] font-semibold text-ink-3">{brand}</p>
      <p className="font-display text-base font-bold text-ink">{m.clientPageTitle}</p>
      <p className="text-[10px] text-ink-3">{m.carName}</p>

      <div className="mt-3 rounded-xl bg-surface p-3 shadow-soft">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-ink">{m.timeline[2]}</span>
          <Pill tone="brand">{m.progress}</Pill>
        </div>
        <div className="mt-2.5 flex gap-1">
          {m.timeline.map((s, i) => (
            <span key={s} className={cn("h-1.5 flex-1 rounded-full", i < 3 ? "bg-brand" : "bg-line")} />
          ))}
        </div>
      </div>

      <div className="mt-2.5 rounded-xl bg-surface p-3 shadow-soft">
        <p className="mb-2 font-semibold text-ink">{m.masterPhoto}</p>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-slate-300 to-slate-100" />
          <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-sky-200 to-slate-100" />
        </div>
      </div>

      <div className="mt-2.5 rounded-xl bg-accent-soft p-3 ring-1 ring-accent/40">
        <p className="text-[10px] font-semibold text-accent-ink">{m.extraWork}</p>
        <div className="mt-0.5 flex items-center justify-between">
          <span className="font-semibold text-ink">{m.extraWorkName}</span>
          <span className="tabular font-bold text-ink">2 300 ₴</span>
        </div>
        <div className="mt-2 flex gap-1.5">
          <span className="flex-1 rounded-lg bg-brand py-1.5 text-center font-semibold text-white">{m.approve}</span>
          <span className="flex-1 rounded-lg bg-surface py-1.5 text-center font-semibold text-ink-3">{m.decline}</span>
        </div>
      </div>

      <div className="mt-2.5 rounded-xl bg-ink py-2.5 text-center font-semibold text-white">
        {m.payOnline} · 5 400 ₴
      </div>
    </div>
  );
}

/* ================= MOBILE APP: technician ================= */
export function MasterAppPhoneMock({ m }: { m: M }) {
  return (
    <div className="px-3.5 text-[11px]" aria-hidden="true">
      <p className="font-display text-base font-bold text-ink">{m.myOrders}</p>
      <div className="mt-3 space-y-2">
        {[
          [m.carName, m.workRows[0], "brand", m.status],
          ["VW Passat · KA 5521 CE", m.workRows[1], "accent", m.kanban[1]],
          ["Skoda Octavia · AI 0042 HP", m.workRows[2], "success", m.done],
        ].map(([car, work, tone, st]) => (
          <div key={car} className="rounded-xl bg-surface p-3 shadow-soft">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate font-semibold text-ink">{car}</span>
              <Pill tone={tone as "brand"}>{st}</Pill>
            </div>
            <p className="mt-0.5 truncate text-ink-3">{work}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="flex flex-col items-center gap-1 rounded-xl bg-brand-soft py-3 font-semibold text-brand-ink">
          <Camera className="size-5" />
          {m.photos}
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl bg-ink py-3 font-semibold text-white">
          <ScanLine className="size-5" />
          {m.scan}
        </div>
      </div>
      <div className="mt-3 rounded-xl bg-surface p-3 shadow-soft">
        <p className="text-ink-3">{m.payroll}</p>
        <p className="tabular font-display text-lg font-extrabold text-ink">24 400 ₴</p>
      </div>
    </div>
  );
}

/* ================= Shared revenue chart ================= */
const revenueSeries = [42, 55, 48, 61, 58, 72, 66, 78, 74, 88, 82, 95];

function RevenueBars({ className }: { className?: string }) {
  const max = Math.max(...revenueSeries);
  return (
    <svg viewBox="0 0 240 90" className={className} preserveAspectRatio="none" aria-hidden="true">
      {[0, 30, 60].map((y) => (
        <line key={y} x1="0" x2="240" y1={y + 0.5} y2={y + 0.5} stroke="var(--color-line)" strokeWidth="1" />
      ))}
      {revenueSeries.map((v, i) => {
        const h = (v / max) * 80;
        return (
          <rect
            key={i}
            x={i * 20 + 4}
            y={90 - h}
            width="12"
            height={h}
            rx="3"
            fill={i === revenueSeries.length - 1 ? "var(--color-brand)" : "var(--color-brand)"}
            opacity={i === revenueSeries.length - 1 ? 1 : 0.35}
          />
        );
      })}
    </svg>
  );
}

/* ================= MOBILE APP: owner ================= */
export function OwnerAppPhoneMock({ m }: { m: M }) {
  return (
    <div className="px-3.5 text-[11px]" aria-hidden="true">
      <p className="text-[10px] font-semibold text-ink-3">{m.today}</p>
      <p className="font-display text-base font-bold text-ink">{m.revenue}</p>
      <p className="tabular font-display text-2xl font-extrabold text-ink">48 250 ₴</p>
      <Pill tone="success">+12%</Pill>
      <div className="mt-3 rounded-xl bg-surface p-3 shadow-soft">
        <RevenueBars className="h-24 w-full" />
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-surface p-2.5 shadow-soft">
          <p className="text-ink-3">{m.postLoad}</p>
          <p className="tabular font-display text-base font-extrabold text-ink">82%</p>
        </div>
        <div className="rounded-xl bg-surface p-2.5 shadow-soft">
          <p className="text-ink-3">{m.debts}</p>
          <p className="tabular font-display text-base font-extrabold text-danger">7 300 ₴</p>
        </div>
      </div>
      <div className="mt-2.5 rounded-xl bg-surface p-2.5 shadow-soft">
        <p className="mb-1.5 text-ink-3">{m.masterOutput}</p>
        {m.masters.map((name, i) => (
          <div key={name} className="mb-1 flex items-center gap-2">
            <span className="w-14 truncate text-ink-2">{name}</span>
            <span className="h-2 flex-1 rounded-full bg-muted">
              <span className="block h-full rounded-full bg-accent" style={{ width: `${[92, 70, 78][i]}%` }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= ANALYTICS: desktop dashboard ================= */
export function DashboardMock({ m }: { m: M }) {
  const kpis = [
    [m.revenue, "1 284 600 ₴", "+12%", "success"],
    [m.profit, "412 300 ₴", "+8%", "success"],
    [m.avgCheck, "4 870 ₴", "+3%", "success"],
    [m.debts, "38 900 ₴", "−5%", "accent"],
  ] as const;
  const load = [
    [m.posts[0], 92],
    [m.posts[1], 78],
    [m.posts[2], 64],
  ] as const;
  return (
    <div className="p-4 text-[11px] sm:p-6" aria-hidden="true">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-sm font-bold text-ink sm:text-base">{m.month}</p>
        <Pill tone="muted">{m.demoData}</Pill>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {kpis.map(([k, v, d, tone]) => (
          <div key={k} className="rounded-xl bg-bg p-3 ring-1 ring-line">
            <p className="text-ink-3">{k}</p>
            <p className="tabular mt-0.5 font-display text-sm font-extrabold text-ink sm:text-lg">{v}</p>
            <Pill tone={tone}>{d}</Pill>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-[1.6fr_1fr]">
        <div className="rounded-xl bg-bg p-3 ring-1 ring-line">
          <p className="mb-2 font-semibold text-ink">{m.revenue}</p>
          <RevenueBars className="h-32 w-full" />
        </div>
        <div className="space-y-3">
          <div className="rounded-xl bg-bg p-3 ring-1 ring-line">
            <p className="mb-2 font-semibold text-ink">{m.postLoad}</p>
            {load.map(([p, v]) => (
              <div key={p} className="mb-1.5 flex items-center gap-2">
                <span className="w-12 text-ink-2">{p}</span>
                <span className="h-2.5 flex-1 rounded-full bg-surface ring-1 ring-line">
                  <span className="block h-full rounded-full bg-brand" style={{ width: `${v}%` }} />
                </span>
                <span className="tabular w-8 text-right font-semibold text-ink">{v}%</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-bg p-3 ring-1 ring-line">
            <p className="mb-2 font-semibold text-ink">{m.masterOutput}</p>
            {m.masters.map((name, i) => (
              <div key={name} className="mb-1 flex items-center justify-between">
                <span className="text-ink-2">{name}</span>
                <span className="tabular font-semibold text-ink">
                  {[164, 131, 142][i]} {m.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
