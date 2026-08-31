import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Layers3 } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { projects as fallbackProjects } from "@/lib/content";
import { getPublicProject, getPublicProjects } from "@/lib/data";
import { localeHtmlLang, localizeProject, localizeProjects, resolveLocale, uiCopy, withLocale } from "@/lib/localization";
import { siteUrl } from "@/lib/site-url";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export async function generateStaticParams() {
  return fallbackProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params, searchParams }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = resolveLocale((await searchParams).lang);
  const rawProject = await getPublicProject(slug);
  if (!rawProject) return { title: uiCopy[locale].case.missing };
  const project = localizeProject(rawProject, locale);
  const title = `${project.title} | ${uiCopy[locale].case.suffix}`;

  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      url: `/projects/${slug}`,
      images: [{ url: project.image, alt: `${uiCopy[locale].work.image} ${project.title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params, searchParams }: ProjectPageProps) {
  const { slug } = await params;
  const locale = resolveLocale((await searchParams).lang);
  const copy = uiCopy[locale];
  const [rawProject, rawProjects] = await Promise.all([getPublicProject(slug), getPublicProjects()]);
  if (!rawProject) notFound();
  const project = localizeProject(rawProject, locale);
  const allProjects = localizeProjects(rawProjects, locale);

  const currentIndex = allProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const projectUrl = `${siteUrl}/projects/${project.slug}`;
  const projectImage = project.image.startsWith("http") ? project.image : `${siteUrl}${project.image}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${projectUrl}#case-study`,
        url: projectUrl,
        name: `${project.title} — Operations Case Study`,
        headline: project.summary,
        description: project.outcome,
        image: projectImage,
        dateCreated: project.year,
        inLanguage: localeHtmlLang[locale],
        author: { "@id": `${siteUrl}/#person` },
        creator: { "@id": `${siteUrl}/#person` },
        keywords: project.tags.join(", "),
        about: [project.eyebrow, project.role],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Portfolio", item: siteUrl },
          { "@type": "ListItem", position: 2, name: project.title, item: projectUrl },
        ],
      },
    ],
  };

  return (
    <main lang={localeHtmlLang[locale]}>
      <StructuredData data={structuredData} />
      <SiteHeader locale={locale} />
      <article className="case-study shell">
        <Link className="case-back" href={withLocale("/#work", locale)}><ArrowLeft size={17} /> {copy.case.back}</Link>
        <header className="case-header">
          <div>
            <p className="eyebrow">{project.eyebrow}</p>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </div>
          <dl className="case-facts">
            <div><dt>{copy.case.year}</dt><dd>{project.year}</dd></div>
            <div><dt>{copy.case.role}</dt><dd>{project.role}</dd></div>
            <div><dt>{copy.case.proof}</dt><dd>{project.metric}</dd></div>
          </dl>
        </header>

        <div className="case-cover">
          <Image src={project.image} alt={`${copy.work.image} ${project.title}`} fill preload sizes="(max-width: 900px) 100vw, 1180px" />
        </div>

        <div className="case-narrative">
          <section>
            <span>01</span>
            <div><p className="eyebrow">{copy.case.challenge}</p><h2>{copy.case.challengeTitle}</h2><p>{project.challenge}</p></div>
          </section>
          <section>
            <span>02</span>
            <div><p className="eyebrow">{copy.case.approach}</p><h2>{copy.case.approachTitle}</h2><p>{project.approach}</p></div>
          </section>
          <section>
            <span>03</span>
            <div><p className="eyebrow">{copy.case.outcome}</p><h2>{copy.case.outcomeTitle}</h2><p>{project.outcome}</p></div>
          </section>
        </div>

        <section className="case-system">
          <div className="case-system-heading">
            <Layers3 size={30} aria-hidden="true" />
            <div><p className="eyebrow">{copy.case.scope}</p><h2>{copy.case.scopeTitle}</h2></div>
          </div>
          <div className="feature-list">
            {project.features.map((feature) => (
              <div key={feature}><Check size={18} aria-hidden="true" /><span>{feature}</span></div>
            ))}
          </div>
          <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </section>

        {project.disclosure && <p className="case-disclosure"><strong>{copy.case.privacy}:</strong> {project.disclosure}</p>}

        {nextProject && (
          <Link className="next-case" href={withLocale(`/projects/${nextProject.slug}`, locale)}>
            <span><small>{copy.case.next}</small><strong>{nextProject.title}</strong></span>
            <ArrowRight size={28} aria-hidden="true" />
          </Link>
        )}
      </article>
    </main>
  );
}
