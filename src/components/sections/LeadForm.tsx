"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import type { Dictionary } from "@/i18n/config";
import { LEAD_INTENT_EVENT } from "@/components/CtaTracker";
import { UTM_KEYS, readUtm, track, type Utm } from "@/lib/analytics";
import { cn } from "@/components/ui/primitives";

type F = Dictionary["finalCta"]["form"];
type Field = "name" | "phone" | "posts" | "city";
type Errors = Partial<Record<Field, string>>;

const PHONE_RE = /^\+380\d{9}$/;

/** Keeps "+380" prefix and formats as +380 XX XXX XX XX */
export function formatUaPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  let rest = digits;
  if (digits.startsWith("380")) rest = digits.slice(3);
  else if (digits.startsWith("80")) rest = digits.slice(2);
  else if (digits.startsWith("0")) rest = digits.slice(1);
  rest = rest.slice(0, 9);
  const parts = [rest.slice(0, 2), rest.slice(2, 5), rest.slice(5, 7), rest.slice(7, 9)].filter(Boolean);
  return ["+380", ...parts].join(" ");
}

const normalizePhone = (v: string) => v.replace(/[\s()-]/g, "");

export function LeadForm({ f, lang, endpoint }: { f: F; lang: string; endpoint: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Record<Field, string>>({ name: "", phone: "+380 ", posts: "", city: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [intent, setIntent] = useState("trial");
  const [utm, setUtm] = useState<Utm>({});

  useEffect(() => {
    setUtm(readUtm());
    const onIntent = (e: Event) => setIntent(String((e as CustomEvent).detail || "trial"));
    window.addEventListener(LEAD_INTENT_EVENT, onIntent);
    return () => window.removeEventListener(LEAD_INTENT_EVENT, onIntent);
  }, []);

  function validate(v = values): Errors {
    const e: Errors = {};
    if (v.name.trim().length < 2) e.name = f.errors.name;
    if (!PHONE_RE.test(normalizePhone(v.phone))) e.phone = f.errors.phone;
    if (!v.posts) e.posts = f.errors.posts;
    if (v.city.trim().length < 2) e.city = f.errors.city;
    return e;
  }

  function set(field: Field, value: string) {
    const next = { ...values, [field]: field === "phone" ? formatUaPhone(value) : value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  }

  function blur(field: Field) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, phone: true, posts: true, city: true });
    const firstInvalid = (Object.keys(errs) as Field[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const payload = {
      ...values,
      phone: normalizePhone(values.phone),
      intent,
      lang,
      page: typeof window !== "undefined" ? window.location.href : "",
      ...utm,
    };
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      track("generate_lead", { intent, lang, posts: values.posts });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-b-card bg-surface p-10 text-center">
        <CheckCircle2 className="size-14 text-success" aria-hidden="true" />
        <p className="text-lg font-semibold text-ink">{f.success}</p>
      </div>
    );
  }

  const fieldCls = (field: Field) =>
    cn(
      "block min-h-12 w-full rounded-xl bg-surface px-4 text-base text-ink ring-1 transition-shadow duration-200 outline-none placeholder:text-ink-3 focus:ring-2 focus:ring-brand",
      errors[field] && touched[field] ? "ring-danger" : "ring-line",
    );

  const label = (field: Field, text: string) => (
    <label htmlFor={`${uid}-${field}`} className="mb-1.5 block text-sm font-semibold text-ink-2">
      {text} <span className="text-danger" aria-hidden="true">*</span>
      <span className="sr-only"> ({f.required})</span>
    </label>
  );

  const err = (field: Field) =>
    errors[field] && touched[field] ? (
      <p id={`${uid}-${field}-err`} role="alert" className="mt-1.5 text-sm font-medium text-danger">
        {errors[field]}
      </p>
    ) : null;

  const aria = (field: Field) => ({
    id: `${uid}-${field}`,
    name: field,
    required: true,
    "aria-invalid": Boolean(errors[field] && touched[field]),
    "aria-describedby": errors[field] && touched[field] ? `${uid}-${field}-err` : undefined,
  });

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="rounded-b-card bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          {label("name", f.name)}
          <input
            {...aria("name")}
            type="text"
            autoComplete="given-name"
            placeholder={f.namePh}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            className={fieldCls("name")}
          />
          {err("name")}
        </div>
        <div>
          {label("phone", f.phone)}
          <input
            {...aria("phone")}
            type="tel"
            dir="ltr"
            inputMode="tel"
            autoComplete="tel"
            placeholder={f.phonePh}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => blur("phone")}
            className={cn(fieldCls("phone"), "tabular rtl:text-right")}
          />
          {err("phone")}
        </div>
        <div>
          {label("posts", f.posts)}
          <div className="relative">
            <select
              {...aria("posts")}
              value={values.posts}
              onChange={(e) => set("posts", e.target.value)}
              onBlur={() => blur("posts")}
              className={cn(fieldCls("posts"), "appearance-none pe-11", !values.posts && "text-ink-3")}
            >
              <option value="" disabled>
                {f.postsPh}
              </option>
              {f.postsOptions.map((o) => (
                <option key={o} value={o} className="text-ink">
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 inset-e-4 size-5 -translate-y-1/2 text-ink-3"
              aria-hidden="true"
            />
          </div>
          {err("posts")}
        </div>
        <div>
          {label("city", f.city)}
          <input
            {...aria("city")}
            type="text"
            autoComplete="address-level2"
            placeholder={f.cityPh}
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
            onBlur={() => blur("city")}
            className={fieldCls("city")}
          />
          {err("city")}
        </div>
      </div>

      {/* hidden fields: request type + UTM tags */}
      <input type="hidden" name="intent" value={intent} />
      <input type="hidden" name="lang" value={lang} />
      {UTM_KEYS.map((k) => (
        <input key={k} type="hidden" name={k} value={utm[k] ?? ""} />
      ))}

      <button
        type="submit"
        disabled={status === "sending"}
        data-cta="lead_submit"
        data-cta-location="final_form"
        className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-semibold text-white shadow-[0_8px_20px_-8px_rgb(3_105_161/0.6)] transition-colors duration-200 hover:bg-brand-hover disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" && <Loader2 className="size-5 animate-spin" aria-hidden="true" />}
        {status === "sending" ? f.sending : f.submit}
      </button>
      <div aria-live="polite">
        {status === "error" && (
          <p role="alert" className="mt-4 rounded-xl bg-danger-soft px-4 py-3 text-sm font-medium text-danger">
            {f.error}
          </p>
        )}
      </div>
      <p className="mt-4 text-center text-xs leading-relaxed text-ink-3">{f.consent}</p>
    </form>
  );
}
