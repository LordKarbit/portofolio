import "server-only";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect("/admin/login?error=setup");

  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("portfolio_admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (!admin) {
    redirect("/admin/login?error=not-authorized");
  }

  return { supabase, userId };
}
