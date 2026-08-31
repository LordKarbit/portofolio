import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, MapPinned, Store, UserRoundCheck } from "lucide-react";
import type { Project } from "@/lib/content";
import { type Locale, uiCopy, withLocale } from "@/lib/localization";

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
          alt={`${copy.image} ${project.title}`}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
          priority={index < 2}
        />
      </Link>
      <div className="project-copy">
        <div className="project-category-row">
          <p className="eyebrow"><ProjectIcon size={15} aria-hidden="true" /> {project.eyebrow}</p>
          <span>{project.year}</span>
        </div>
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <Link className="icon-link" href={projectHref} aria-label={`${copy.open} ${project.title}`}>
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <p>{project.summary}</p>
        <div className="project-meta">
          <strong>{project.metric}</strong>
          <span>{project.tags.slice(0, 2).join(" · ")}</span>
        </div>
      </div>
    </article>
  );
}
