import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

/**
 * Static export (`out/`) for any static hosting.
 *
 * In `next dev` we additionally pick up files with the `.dev.ts` extension —
 * this enables the `/api/leads` stub (src/app/api/leads/route.dev.ts), which
 * cannot exist in a static export. In production the form posts to
 * NEXT_PUBLIC_LEADS_ENDPOINT (see README).
 */
export default function config(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
    pageExtensions: isDev ? ["tsx", "ts", "dev.ts"] : ["tsx", "ts"],
    turbopack: {
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
  };
}
