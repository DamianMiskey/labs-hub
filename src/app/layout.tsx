import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SITE_URL } from "@/lib/site";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Damian Miskey's labs", template: "%s · djmiskey.com" },
  description: "Hands-on labs, one technique per page with a live demo and the code: Vercel, Cloudflare, motion, APIs, observability and Tailwind CSS.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the inline script sets data-theme before React
    // hydrates, so the attribute differs from the server's HTML on purpose.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        {/* minmax(0, 1fr), not 1fr: a column sized to its content would let a
            wide code block or response widen the whole page on a phone. */}
        <div className="grid min-h-screen grid-cols-[minmax(0,1fr)] md:grid-cols-[240px_minmax(0,1fr)]">
          <Nav />
          <main className="w-full min-w-0 max-w-250 px-[clamp(16px,4vw,3rem)] py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
