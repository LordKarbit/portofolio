import type { MetadataRoute } from "next";
import { getPublicProjects } from "@/lib/data";
import { siteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublicProjects();
  const lastModified = new Date("2026-09-01T00:00:00.000Z");

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
