import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and Next internals
  if (pathname.startsWith("/_next") || pathname.includes(".")) return;

  // Already has a locale prefix
  const hasLocale = locales.some((l) => pathname.startsWith(`/${l}`));
  if (hasLocale) return;

  // Detect browser language (zh variants map to zh-TW)
  const acceptLang = request.headers.get("accept-language") || "";
  const preferred = acceptLang
    .split(",")
    .map((l) => l.split(";")[0].trim().toLowerCase());

  let locale = defaultLocale;
  for (const lang of preferred) {
    if (lang.startsWith("zh")) {
      locale = "zh-TW";
      break;
    }
  }

  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  if (saved && (locales as readonly string[]).includes(saved)) {
    locale = saved as (typeof locales)[number];
  }

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = { matcher: ["/((?!_next|api|favicon|.*\\..*).*)"] };
