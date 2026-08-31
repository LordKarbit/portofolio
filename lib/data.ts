import "server-only";

import {
  experiences as fallbackExperiences,
  profile as fallbackProfile,
  projects as fallbackProjects,
  skills as fallbackSkills,
  type Experience,
  type Profile,
  type Project,
  type Skill,
} from "@/lib/content";
import { createPublicSupabaseClient } from "@/lib/supabase/public";

type Row = Record<string, unknown>;

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

export function mapProjectRow(row: Row): Project {
  return {
    id: asString(row.id) || undefined,
    slug: asString(row.slug),
    title: asString(row.title),
    eyebrow: asString(row.eyebrow),
    summary: asString(row.summary),
    metric: asString(row.metric),
    image: asString(row.image_url, "/images/projects/geolead.jpg"),
    tags: asStringArray(row.tags),
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    sortOrder: Number(row.sort_order ?? 0),
    year: asString(row.year),
    role: asString(row.role),
    challenge: asString(row.challenge),
    approach: asString(row.approach),
    outcome: asString(row.outcome),
    features: asStringArray(row.features),
    disclosure: asString(row.disclosure) || undefined,
  };
}

export async function getPublicProfile(): Promise<Profile> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return fallbackProfile;

  const { data, error } = await supabase.from("profiles").select("*").eq("slug", "samsul-arifin").maybeSingle();
  if (error || !data) return fallbackProfile;

  return {
    slug: asString(data.slug, fallbackProfile.slug),
    name: asString(data.name, fallbackProfile.name),
    role: asString(data.role, fallbackProfile.role),
    intro: asString(data.intro, fallbackProfile.intro),
    about: asString(data.about, fallbackProfile.about),
    location: asString(data.location, fallbackProfile.location),
    email: asString(data.email, fallbackProfile.email),
    phone: asString(data.phone, fallbackProfile.phone),
    linkedin: asString(data.linkedin, fallbackProfile.linkedin),
    availability: asString(data.availability, fallbackProfile.availability),
  };
}

export async function getPublicProjects(): Promise<Project[]> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return fallbackProjects;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return error || !data?.length ? fallbackProjects : data.map(mapProjectRow);
}

export async function getPublicProject(slug: string): Promise<Project | null> {
  const supabase = createPublicSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (!error && data) return mapProjectRow(data);
  }

  return fallbackProjects.find((project) => project.slug === slug) ?? null;
}

export async function getPublicExperiences(): Promise<Experience[]> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return fallbackExperiences;

  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error || !data?.length) return fallbackExperiences;

  return data.map((row) => ({
    id: asString(row.id) || undefined,
    period: asString(row.period),
    title: asString(row.title),
    company: asString(row.company),
    summary: asString(row.summary),
    achievements: asStringArray(row.achievements),
    sortOrder: Number(row.sort_order ?? 0),
    published: Boolean(row.published),
  }));
}

export async function getPublicSkills(): Promise<Skill[]> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return fallbackSkills;

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error || !data?.length) return fallbackSkills;

  return data.map((row) => ({
    id: asString(row.id) || undefined,
    name: asString(row.name),
    category: asString(row.category),
    sortOrder: Number(row.sort_order ?? 0),
    published: Boolean(row.published),
  }));
}
