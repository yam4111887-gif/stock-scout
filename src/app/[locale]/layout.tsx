import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Analytics from "@/components/ui/Analytics";
import CookieConsent from "@/components/ui/CookieConsent";
import { locales } from "@/lib/i18n";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, GSC_VERIFICATION } from "@/lib/constants";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}｜CCL 供應鏈地圖・航運運價指南・除權息教學・到價哨兵`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: { index: true, follow: true },
  verification: { google: GSC_VERIFICATION },
  alternates: { canonical: `${SITE_URL}/zh-TW` },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "zh-TW",
    url: `${SITE_URL}/zh-TW`,
  },
};

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
