import uk from "./messages/uk.json";
import ru from "./messages/ru.json";
import en from "./messages/en.json";
import he from "./messages/he.json";

export const locales = ["uk", "ru", "en", "he"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uk";

export type Dictionary = typeof uk;

const dictionaries: Record<Locale, Dictionary> = { uk, ru, en, he };

export const localeNames: Record<Locale, string> = {
  uk: "Українська",
  ru: "Русский",
  en: "English",
  he: "עברית",
};

export const localeShort: Record<Locale, string> = { uk: "UA", ru: "RU", en: "EN", he: "HE" };

/** BCP-47 tags for hreflang / og:locale */
export const localeTags: Record<Locale, string> = { uk: "uk-UA", ru: "ru-UA", en: "en", he: "he-IL" };

/** Text direction per locale — Hebrew is right-to-left. */
export const localeDir: Record<Locale, "ltr" | "rtl"> = { uk: "ltr", ru: "ltr", en: "ltr", he: "rtl" };

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
