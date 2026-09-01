import { NextResponse } from "next/server";
import { isAllowedAdmin } from "@/lib/auth";
import { siteUrl } from "@/lib/site-url";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next")?.startsWith("/") ? url.searchParams.get("next")! : "/admin";
  const origin = process.env.NODE_ENV === "development" ? url.origin : siteUrl;
  const supabase = await createServerSupabaseClient();

  if (!code || !supabase) {
    return NextResponse.redirect(`${origin}/admin/login?error=oauth`);
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(`${origin}/admin/login?error=oauth`);

  const { data: { user } } = await supabase.auth.getUser();
  if (!isAllowedAdmin(user)) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/admin/login?error=not-authorized`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
