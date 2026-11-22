import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Heebo, Manrope } from "next/font/google";
import "../globals.css";
import { getDictionary, hasLocale, localeDir, localeTags, locales } from "@/i18n/config";
import { site } from "@/lib/site";
import { Analytics } from "@/components/Analytics";
import { CtaTracker } from "@/components/CtaTracker";
import { RevealBootScript, RevealObserver } from "@/components/Reveal";

/**
 * One variable font for headings and body (latin + cyrillic, weights 200–800).
 * A single family keeps font bytes small, which matters for mobile LCP.
 */
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

/** Hebrew + Latin for the RTL version; not preloaded on uk/ru/en pages. */
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  const title = `${site.brand} — ${t.title}`;

  return {
    metadataBase: new URL(site.url),
    title,
    description: t.description,
    applicationName: site.brand,
    alternates: {
      canonical: `/${lang}/`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeTags[l], `/${l}/`])),
        "x-default": "/uk/",
      },
    },
    openGraph: {
      type: "website",
      url: `/${lang}/`,
      siteName: site.brand,
      title,
      description: t.description,
      locale: localeTags[lang].replace("-", "_"),
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeTags[l].replace("-", "_")),
    },
    twitter: { card: "summary_large_image", title, description: t.description },
    formatDetection: { telephone: false },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={localeDir[lang]}
      className={`${manrope.variable} ${heebo.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh">
        <RevealBootScript />
        {children}
        <RevealObserver />
        <CtaTracker lang={lang} />
        <Analytics />
      </body>
    </html>
  );
}
