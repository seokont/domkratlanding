import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

/** Minimal root layout for "/" — it only redirects to a language version. */
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
