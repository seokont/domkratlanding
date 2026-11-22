"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __revealOn?: boolean;
  }
}

/**
 * Scroll reveal: one IntersectionObserver marks every `[data-reveal]` element
 * with `data-shown` once it enters the viewport; CSS in globals.css does the
 * motion. `<html class="reveal-ready">` is set by an inline script before
 * paint (see RevealBootScript), and removed again if this never runs, so
 * content is never left hidden.
 */
export function RevealObserver() {
  useEffect(() => {
    window.__revealOn = true;
    const root = document.documentElement;
    if (!("IntersectionObserver" in window)) {
      root.classList.remove("reveal-ready");
      return;
    }
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        fired = true;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.shown = "";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    targets.forEach((el) => io.observe(el));
    // Safety net: the observer reports every target once right after observe();
    // if that never happens (broken/throttled observer), show everything.
    const safety = window.setTimeout(() => {
      if (fired) return;
      io.disconnect();
      targets.forEach((el) => (el.dataset.shown = ""));
    }, 2000);
    return () => {
      window.clearTimeout(safety);
      io.disconnect();
    };
  }, []);
  return null;
}

/** Runs before first paint: hide reveal targets only when JS is alive; give up after 4s. */
const boot = `(function(){var d=document.documentElement;d.classList.add("reveal-ready");setTimeout(function(){if(!window.__revealOn)d.classList.remove("reveal-ready")},4000)})();`;

export function RevealBootScript() {
  return <script dangerouslySetInnerHTML={{ __html: boot }} />;
}
