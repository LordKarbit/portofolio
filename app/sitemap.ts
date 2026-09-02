import type { MetadataRoute } from "next";
import { getPublicProjects } from "@/lib/data";
import { siteUrl } from "@/lib/site-url";

function localeAlternates(path: string) {
  return {
    languages: {
      id: `${siteUrl}${path}`,
      en: `${siteUrl}${path}?lang=en`,
      "zh-CN": `${siteUrl}${path}?lang=zh`,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublicProjects();
  const buildTime = new Date();

  return [
    { url: siteUrl, lastModified: buildTime, changeFrequency: "monthly", priority: 1, alternates: localeAlternates("") },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : buildTime,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: localeAlternates(`/projects/${project.slug}`),
    })),
  ];
}
