import type { MetadataRoute } from "next";
import { localeTags, locales } from "@/i18n/config";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [localeTags[l], `${site.url}/${l}/`]));
  return locales.map((l) => ({
    url: `${site.url}/${l}/`,
    changeFrequency: "weekly",
    priority: l === "uk" ? 1 : 0.8,
    alternates: { languages },
  }));
}
