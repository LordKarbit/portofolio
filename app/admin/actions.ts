"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ADMIN_EMAIL, requireAdmin } from "@/lib/auth";
import { siteUrl } from "@/lib/site-url";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function value(formData: FormData, key: string, max = 5000) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

function list(formData: FormData, key: string) {
  return value(formData, key, 10000)
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 30);
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function failure(path: string, message: string): never {
  redirect(`${path}${path.includes("?") ? "&" : "?"}error=${encodeURIComponent(message.slice(0, 160))}`);
}

async function uploadProjectImage(formData: FormData, slug: string) {
  const file = formData.get("image_file");
  if (!(file instanceof File) || file.size === 0) return null;
  if (!file.type.startsWith("image/")) failure("/admin", "Berkas harus berupa gambar.");
  if (file.size > 5 * 1024 * 1024) failure("/admin", "Ukuran gambar maksimum 5 MB.");

  const { supabase } = await requireAdmin();
  const extension = file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "jpg";
  const path = `projects/${slug}-${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("portfolio-media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) failure("/admin", `Gagal mengunggah gambar: ${error.message}`);

  return supabase.storage.from("portfolio-media").getPublicUrl(path).data.publicUrl;
}

function projectPayload(formData: FormData, imageUrl: string) {
  const title = value(formData, "title", 120);
  const slug = slugify(value(formData, "slug", 100) || title);
  if (!title || !slug) failure("/admin", "Judul dan slug proyek wajib diisi.");

  return {
    slug,
    title,
    eyebrow: value(formData, "eyebrow", 160),
    summary: value(formData, "summary", 1200),
    metric: value(formData, "metric", 160),
    image_url: imageUrl || "/images/projects/geolead.jpg",
    image_alt: value(formData, "image_alt", 240),
    image_position: value(formData, "image_position", 30) || "center",
    tags: list(formData, "tags"),
    year: value(formData, "year", 20),
    role: value(formData, "role", 300),
    challenge: value(formData, "challenge", 4000),
    approach: value(formData, "approach", 4000),
    outcome: value(formData, "outcome", 4000),
    features: list(formData, "features"),
    disclosure: value(formData, "disclosure", 1000) || null,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    sort_order: Math.max(0, Math.min(999, Number(value(formData, "sort_order", 4)) || 0)),
    updated_at: new Date().toISOString(),
  };
}

export async function loginAction() {
  if (!isSupabaseConfigured) redirect("/admin/login?error=setup");
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect("/admin/login?error=setup");
  const callbackOrigin = process.env.NODE_ENV === "development" ? "http://localhost:3000" : siteUrl;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${callbackOrigin}/auth/callback?next=/admin`,
      queryParams: { login_hint: ADMIN_EMAIL, prompt: "select_account" },
    },
  });
  if (error || !data.url) redirect("/admin/login?error=oauth");
  redirect(data.url);
}

export async function logoutAction() {
  const supabase = await createServerSupabaseClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveProfileAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = {
    slug: "samsul-arifin",
    name: value(formData, "name", 120),
    role: value(formData, "role", 180),
    intro: value(formData, "intro", 1200),
    about: value(formData, "about", 4000),
    location: value(formData, "location", 200),
    email: value(formData, "email", 254),
    phone: value(formData, "phone", 50),
    linkedin: value(formData, "linkedin", 500),
    availability: value(formData, "availability", 500),
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "slug" });
  if (error) failure("/admin", `Profil belum tersimpan: ${error.message}`);
  revalidateTag("profile", { expire: 0 });
  revalidatePath("/");
  redirect("/admin?saved=profile");
}

export async function createProjectAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const provisionalSlug = slugify(value(formData, "slug", 100) || value(formData, "title", 120));
  const uploadedUrl = await uploadProjectImage(formData, provisionalSlug || "project");
  const payload = projectPayload(formData, uploadedUrl || value(formData, "image_url", 1000));
  const { data, error } = await supabase.from("projects").insert(payload).select("id").single();
  if (error) failure("/admin", `Proyek belum dibuat: ${error.message}`);
  revalidateTag("projects", { expire: 0 });
  revalidatePath("/");
  revalidatePath(`/projects/${payload.slug}`);
  revalidatePath("/sitemap.xml");
  redirect(`/admin/projects/${data.id}?saved=created`);
}

export async function updateProjectAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(formData, "id", 80);
  if (!id) failure("/admin", "ID proyek tidak ditemukan.");

  const provisionalSlug = slugify(value(formData, "slug", 100) || value(formData, "title", 120));
  const uploadedUrl = await uploadProjectImage(formData, provisionalSlug || "project");
  const payload = projectPayload(formData, uploadedUrl || value(formData, "image_url", 1000));
  const { error } = await supabase.from("projects").update(payload).eq("id", id);
  if (error) failure(`/admin/projects/${id}`, `Perubahan belum tersimpan: ${error.message}`);
  revalidateTag("projects", { expire: 0 });
  revalidatePath("/");
  revalidatePath(`/projects/${payload.slug}`);
  revalidatePath("/sitemap.xml");
  redirect(`/admin/projects/${id}?saved=updated`);
}

export async function deleteProjectAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(formData, "id", 80);
  if (!id) failure("/admin", "ID proyek tidak ditemukan.");
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) failure("/admin", `Proyek belum dihapus: ${error.message}`);
  revalidateTag("projects", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  redirect("/admin?saved=deleted");
}

export async function createExperienceAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = {
    period: value(formData, "period", 100),
    title: value(formData, "title", 160),
    company: value(formData, "company", 160),
    summary: value(formData, "summary", 1200),
    achievements: list(formData, "achievements"),
    logo_url: value(formData, "logo_url", 1000),
    sort_order: Number(value(formData, "sort_order", 4)) || 0,
    published: formData.get("published") === "on",
  };
  if (!payload.title || !payload.company) failure("/admin", "Jabatan dan perusahaan wajib diisi.");
  const { error } = await supabase.from("experiences").insert(payload);
  if (error) failure("/admin", `Pengalaman belum ditambahkan: ${error.message}`);
  revalidateTag("experiences", { expire: 0 });
  revalidatePath("/");
  redirect("/admin?saved=experience");
}

export async function updateExperienceAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(formData, "id", 80);
  const payload = {
    period: value(formData, "period", 100),
    title: value(formData, "title", 160),
    company: value(formData, "company", 160),
    summary: value(formData, "summary", 1200),
    achievements: list(formData, "achievements"),
    logo_url: value(formData, "logo_url", 1000),
    sort_order: Math.max(0, Math.min(999, Number(value(formData, "sort_order", 4)) || 0)),
    published: formData.get("published") === "on",
  };
  if (!id || !payload.title || !payload.company) failure("/admin", "Data pengalaman belum lengkap.");
  const { error } = await supabase.from("experiences").update(payload).eq("id", id);
  if (error) failure("/admin", `Pengalaman belum tersimpan: ${error.message}`);
  revalidateTag("experiences", { expire: 0 });
  revalidatePath("/");
  redirect("/admin?saved=experience-updated#experience");
}

export async function deleteExperienceAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(formData, "id", 80);
  if (id) await supabase.from("experiences").delete().eq("id", id);
  revalidateTag("experiences", { expire: 0 });
  revalidatePath("/");
  redirect("/admin?saved=experience-deleted");
}

export async function createSkillAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = {
    name: value(formData, "name", 120),
    category: value(formData, "category", 80),
    sort_order: Number(value(formData, "sort_order", 4)) || 0,
    published: formData.get("published") === "on",
  };
  if (!payload.name || !payload.category) failure("/admin", "Nama dan kategori keahlian wajib diisi.");
  const { error } = await supabase.from("skills").insert(payload);
  if (error) failure("/admin", `Keahlian belum ditambahkan: ${error.message}`);
  revalidateTag("skills", { expire: 0 });
  revalidatePath("/");
  redirect("/admin?saved=skill");
}

export async function updateSkillAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(formData, "id", 80);
  const payload = {
    name: value(formData, "name", 120),
    category: value(formData, "category", 80),
    sort_order: Math.max(0, Math.min(999, Number(value(formData, "sort_order", 4)) || 0)),
    published: formData.get("published") === "on",
  };
  if (!id || !payload.name || !payload.category) failure("/admin", "Data keahlian belum lengkap.");
  const { error } = await supabase.from("skills").update(payload).eq("id", id);
  if (error) failure("/admin", `Keahlian belum tersimpan: ${error.message}`);
  revalidateTag("skills", { expire: 0 });
  revalidatePath("/");
  redirect("/admin?saved=skill-updated#skills");
}

export async function deleteSkillAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(formData, "id", 80);
  if (id) await supabase.from("skills").delete().eq("id", id);
  revalidateTag("skills", { expire: 0 });
  revalidatePath("/");
  redirect("/admin?saved=skill-deleted");
}
