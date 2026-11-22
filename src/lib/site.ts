/**
 * Site-wide settings. Brand name and contacts are placeholders — edit here
 * or override via environment variables (see .env.example).
 */
export const site = {
  brand: process.env.NEXT_PUBLIC_BRAND_NAME || "Domkrat STO",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, ""),
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "#login",
  leadsEndpoint: process.env.NEXT_PUBLIC_LEADS_ENDPOINT || "/api/leads",
  contacts: {
    phone: "+380 00 000 00 00",
    email: "hello@example.com",
    telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/example",
  },
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  },
} as const;
