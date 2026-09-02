import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, ExternalLink, MapPinned, Store, UserRoundCheck } from "lucide-react";
import type { Project } from "@/lib/content";
import { type Locale, uiCopy, withLocale } from "@/lib/localization";
import { TechStackIcons } from "@/lib/tech-icons";

const projectIcons = {
  geolead: MapPinned,
  "kayou-pos": Store,
  "klwt-surveyor": ClipboardCheck,
  narotama: UserRoundCheck,
};

export function ProjectCard({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  const ProjectIcon = projectIcons[project.slug as keyof typeof projectIcons] ?? MapPinned;
  const copy = uiCopy[locale].work;
  const projectHref = withLocale(`/projects/${project.slug}`, locale);

  return (
    <article className="project-card reveal">
      <Link className="project-image" href={projectHref} aria-label={`${copy.read} ${project.title}`}>
        <Image
          src={project.image}
          alt={project.imageAlt || `${copy.image} ${project.title}`}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
          priority={index < 2}
          style={{ objectPosition: project.imagePosition || "center" }}
        />
      </Link>
      <div className="project-copy">
        <div className="project-category-row">
          <p className="eyebrow"><ProjectIcon size={15} aria-hidden="true" /> {project.eyebrow}</p>
          <span>{project.year}</span>
        </div>
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <div className="project-title-actions">
            {project.url && (
              <a
                className="icon-link"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${copy.visitSite} ${project.title}`}
                title={copy.visitSite}
              >
                <ExternalLink size={18} aria-hidden="true" />
              </a>
            )}
            <Link className="icon-link" href={projectHref} aria-label={`${copy.open} ${project.title}`}>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <p>{project.summary}</p>
        <div className="project-meta">
          <strong>{project.metric}</strong>
          <TechStackIcons tags={project.tags} limit={3} variant="compact" />
        </div>
      </div>
    </article>
  );
}
