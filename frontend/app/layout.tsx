import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { DevConfigBanner } from "@/components/dev-config-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { featureStatus, getEnv } from "@/lib/env";
import { resolveSiteUrl, site } from "@/lib/site";

import "./globals.css";

const env = getEnv();

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(env),
  title: {
    default: `${site.name} | Visual FoxPro to .NET migration`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1420" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const showBanner = process.env.NODE_ENV === "development";

  return (
    <html lang={site.locale} className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {showBanner ? <DevConfigBanner statuses={featureStatus(env)} /> : null}
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
