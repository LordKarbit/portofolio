import type { NextRequest } from "next/server";
import { applyLocaleDetection } from "@/lib/locale-proxy";
import { refreshSupabaseSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const response = await refreshSupabaseSession(request);
  applyLocaleDetection(request, response);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)"],
};
