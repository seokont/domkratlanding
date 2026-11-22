import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary, hasLocale, locales } from "@/i18n/config";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  // Satori (next/og) has no RTL text layout, so the Hebrew card uses the English copy.
  const d = getDictionary(!hasLocale(lang) ? "uk" : lang === "he" ? "en" : lang);

  const svg = await readFile(join(process.cwd(), "public/domkrat-sto-logo-light.svg"));
  const logo = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%)",
          color: "white",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
        <img src={logo} width={331} height={90} alt={site.brand} />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 60, lineHeight: 1.1, fontWeight: 700, maxWidth: 1000 }}>{d.hero.title}</div>
          <div style={{ fontSize: 30, color: "#cbd5e1", display: "flex", gap: 28 }}>
            {d.hero.notes.map((n) => (
              <span key={n}>• {n}</span>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
