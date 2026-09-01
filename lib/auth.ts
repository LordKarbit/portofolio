import "server-only";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const ADMIN_EMAIL = "syamsul.ar313@gmail.com";

export function isAllowedAdmin(user: { email?: string | null; app_metadata?: Record<string, unknown> } | null) {
  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL) return false;
  return user.app_metadata?.provider === "google";
}

export async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect("/admin/login?error=setup");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  if (!isAllowedAdmin(user)) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=not-authorized");
  }

  return { supabase, userId: user.id, user };
}
