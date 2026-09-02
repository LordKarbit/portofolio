import type { NextRequest, NextResponse } from "next/server";
import { LOCALE_COOKIE } from "@/lib/locale-cookie";
import type { Locale } from "@/lib/localization";

export { LOCALE_COOKIE };

/**
 * Auto-picks a locale for first-time visitors based on Vercel's IP-geolocation
 * header and the browser's Accept-Language, then remembers the decision in a
 * cookie. Never runs if the visitor already made a choice (explicit `?lang=`
 * or an existing cookie) — auto-detection must not override a real pick.
 */
export function applyLocaleDetection(request: NextRequest, response: NextResponse) {
  if (request.nextUrl.pathname.startsWith("/admin")) return;

  // An explicit `?lang=` on this request is the visitor's clearest signal —
  // keep the cookie in sync with it (so e.g. `<html lang>`, which can't see
  // searchParams, still matches) and skip auto-detection entirely.
  const queryLang = request.nextUrl.searchParams.get("lang");
  if (queryLang === "en" || queryLang === "zh" || queryLang === "id") {
    if (request.cookies.get(LOCALE_COOKIE)?.value !== queryLang) {
      response.cookies.set(LOCALE_COOKIE, queryLang, { maxAge: 60 * 60 * 24 * 365, path: "/", sameSite: "lax" });
    }
    return;
  }

  if (request.cookies.has(LOCALE_COOKIE)) return;

  const country = request.headers.get("x-vercel-ip-country");
  const acceptLanguage = request.headers.get("accept-language") ?? "";

  let locale: Locale;
  if (country === "CN") {
    locale = "zh";
  } else if (country === "ID") {
    if (/\bzh\b/i.test(acceptLanguage)) locale = "zh";
    else if (/\ben\b/i.test(acceptLanguage)) locale = "en";
    else locale = "id";
  } else {
    locale = "en";
  }

  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
}
