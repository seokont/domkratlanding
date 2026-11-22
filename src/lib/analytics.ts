type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Sends an event to GA4 and Meta Pixel (whichever is loaded). Safe to call anywhere on the client. */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  if (window.fbq) {
    if (event === "generate_lead") window.fbq("track", "Lead", params);
    else window.fbq("trackCustom", event, params);
  }
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event, params);
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;
const UTM_STORAGE = "sto_utm";

/** Reads UTM tags from the URL (persisting them for the session) or from sessionStorage. */
export function readUtm(): Utm {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Utm = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) fromUrl[key] = v;
  }
  try {
    if (Object.keys(fromUrl).length) {
      sessionStorage.setItem(UTM_STORAGE, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE) || "{}") as Utm;
  } catch {
    return fromUrl;
  }
}

export { UTM_KEYS };
