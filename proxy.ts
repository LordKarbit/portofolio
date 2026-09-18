import type { NextRequest } from "next/server";
import { syncExplicitLocale } from "@/lib/locale-proxy";
import { refreshSupabaseSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const response = await refreshSupabaseSession(request);
  syncExplicitLocale(request, response);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)"],
};
