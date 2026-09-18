import type { NextRequest, NextResponse } from "next/server";
import { LOCALE_COOKIE } from "@/lib/locale-cookie";

/** Keep an explicit language link in sync with the visitor's manual preference. */
export function syncExplicitLocale(request: NextRequest, response: NextResponse) {
  if (request.nextUrl.pathname.startsWith("/admin")) return;

  const queryLang = request.nextUrl.searchParams.get("lang");
  if (queryLang === "en" || queryLang === "zh" || queryLang === "id") {
    if (request.cookies.get(LOCALE_COOKIE)?.value !== queryLang) {
      response.cookies.set(LOCALE_COOKIE, queryLang, { maxAge: 60 * 60 * 24 * 365, path: "/", sameSite: "lax" });
    }
  }
}
