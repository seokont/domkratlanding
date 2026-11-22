import Link from "next/link";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * "/" → /uk/ | /ru/ | /en/ | /he/ based on the browser language.
 * Static export has no server redirects, so this is done on the client,
 * with a <meta refresh> fallback for no-JS clients and crawlers.
 */
const script = `(function(){var s=${JSON.stringify(locales)};var l=(navigator.languages||[navigator.language||""]).map(function(x){return String(x).slice(0,2).toLowerCase().replace("iw","he")});var t="${defaultLocale}";for(var i=0;i<l.length;i++){if(s.indexOf(l[i])>-1){t=l[i];break}}location.replace("/"+t+"/"+location.search+location.hash)})();`;

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`2;url=/${defaultLocale}/`} />
      <link rel="canonical" href={`/${defaultLocale}/`} />
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <p style={{ fontFamily: "system-ui", padding: 24 }}>
        <Link href={`/${defaultLocale}/`}>Українська</Link> · <Link href="/ru/">Русский</Link> ·{" "}
        <Link href="/en/">English</Link> ·{" "}
        <Link href="/he/" lang="he" dir="rtl">
          עברית
        </Link>
      </p>
    </>
  );
}
