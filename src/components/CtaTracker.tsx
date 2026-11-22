"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export const LEAD_INTENT_EVENT = "lead-intent";

/**
 * One delegated listener for every element with `data-cta`:
 * sends a `cta_click` event (GA4 + Meta Pixel) and, if the element has
 * `data-intent` ("trial" | "demo" | "migration" | "sales"), tells the lead form
 * which request type to preselect.
 */
export function CtaTracker({ lang }: { lang: string }) {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cta]");
      if (!el) return;
      const { cta, ctaLocation, intent } = el.dataset;
      track("cta_click", { cta, location: ctaLocation, intent, lang });
      if (intent) window.dispatchEvent(new CustomEvent(LEAD_INTENT_EVENT, { detail: intent }));
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lang]);
  return null;
}
