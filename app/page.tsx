import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeDollarSign,
  BarChart3,
  Bot,
  Boxes,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  Code2,
  FileDown,
  Layers3,
  Mail,
  MapPin,
  PanelsTopLeft,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  UsersRound,
  Workflow,
} from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { PdfModalCard } from "@/components/pdf-modal-card";
import { RoleRotator } from "@/components/role-rotator";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { getPublicExperiences, getPublicProfile, getPublicProjects, getPublicSkills } from "@/lib/data";
import { LOCALE_COOKIE } from "@/lib/locale-cookie";
import { siteUrl } from "@/lib/site-url";
import {
  localeHtmlLang,
  localizeExperiences,
  localizedCapabilities,
  localizedLegacy,
  localizedProofPoints,
  localizeProfile,
  localizeProjects,
  localizeSkillCategory,
  localizeSkills,
  resolveLocale,
  uiCopy,
  withLocale,
} from "@/lib/localization";

const proofIcons: LucideIcon[] = [UsersRound, TrendingDown, BadgeDollarSign, Boxes];
const capabilityIcons: LucideIcon[] = [Workflow, ShieldCheck, Bot];
const legacyIcons: LucideIcon[] = [Layers3, BarChart3, Sparkles];
const companyLogos: Record<string, { src: string; brand: string }[]> = {
  "Xingyun Group": [{ src: "/images/companies/xingyun-group.png", brand: "xingyun" }],
  Polibeli: [{ src: "/images/companies/polibeli.png", brand: "polibeli" }],
  GOTOKO: [{ src: "/images/companies/gotoko.png", brand: "gotoko" }],
  ULA: [{ src: "/images/companies/ula.png", brand: "ula" }],
};
const skillIcons: Record<string, LucideIcon> = {
  Operations: Workflow,
  Strategy: Workflow,
  Data: ChartNoAxesCombined,
  Automation: Sparkles,
  Delivery: PanelsTopLeft,
  Product: Code2,
};

type HomePageProps = { searchParams: Promise<{ lang?: string | string[] }> };

export async function generateMetadata({ searchParams }: HomePageProps): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolveLocale((await searchParams).lang, cookieStore.get(LOCALE_COOKIE)?.value);
  return {
    alternates: {
      canonical: withLocale("/", locale),
      languages: { id: "/", en: "/?lang=en", "zh-CN": "/?lang=zh", "x-default": "/" },
    },
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const cookieStore = await cookies();
  const locale = resolveLocale((await searchParams).lang, cookieStore.get(LOCALE_COOKIE)?.value);
  const copy = uiCopy[locale];
  const [profile, projects, experiences, skills] = await Promise.all([
    getPublicProfile(),
    getPublicProjects(),
    getPublicExperiences(),
    getPublicSkills(),
  ]);
  const currentProfile = localizeProfile(profile, locale);
  const currentProjects = localizeProjects(projects, locale);
  const currentExperiences = localizeExperiences(experiences, locale);
  const currentSkills = localizeSkills(skills, locale);
  const proofPoints = localizedProofPoints[locale];
  const capabilities = localizedCapabilities[locale];
  const legacyWork = localizedLegacy[locale];

  const skillGroups = Object.entries(
    currentSkills.reduce<Record<string, string[]>>((groups, skill) => {
      groups[skill.category] ??= [];
      groups[skill.category].push(skill.name);
      return groups;
    }, {}),
  );

  const splitAt = Math.ceil(currentExperiences.length / 2);
  const experienceColumns = [
    {
      eyebrow: copy.journey.latest,
      title: copy.journey.latestTitle,
      icon: BriefcaseBusiness,
      items: currentExperiences.slice(0, splitAt),
    },
    {
      eyebrow: copy.journey.foundation,
      title: copy.journey.foundationTitle,
      icon: ChartNoAxesCombined,
      items: currentExperiences.slice(splitAt),
    },
  ];
  const whatsappHref = `https://wa.me/${currentProfile.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    copy.hero.whatsapp,
  )}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile-page`,
        url: siteUrl,
        name: "Samsul Arifin — Business Process & Operations Systems",
        description: currentProfile.intro,
        inLanguage: localeHtmlLang[locale],
        dateModified: "2026-09-01",
        mainEntity: { "@id": `${siteUrl}/#person` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: currentProfile.name,
        url: siteUrl,
        image: `${siteUrl}/images/profile.png`,
        jobTitle: currentProfile.role,
        description: currentProfile.about,
        email: currentProfile.email,
        telephone: currentProfile.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sidoarjo",
          addressRegion: "Jawa Timur",
          addressCountry: "ID",
        },
        sameAs: [currentProfile.linkedin, "https://github.com/LordKarbit"],
        knowsAbout: [
          "Business Process Improvement",
          "Operational Excellence",
          "Operations Systems",
          "Business Systems Analysis",
          "Operations Transformation",
          "Process Mapping",
          "Requirements and User Acceptance Testing",
          "KPI and Performance Systems",
          "AI-assisted Workflow Automation",
        ],
        hasOccupation: [
          { "@type": "Occupation", name: "Business Process Improvement Specialist" },
          { "@type": "Occupation", name: "Operations Systems Specialist" },
          { "@type": "Occupation", name: "Business Systems Analyst" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Portfolio Samsul Arifin",
        inLanguage: ["id-ID", "en", "zh-CN"],
        publisher: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <main lang={localeHtmlLang[locale]}>
      <StructuredData data={structuredData} />
      <ScrollReveal />
      <SiteHeader locale={locale} />

      <section className="hero shell" id="home">
        <div className="hero-copy">
          <p className="kicker">{copy.hero.kicker}</p>
          <h1>
            {copy.hero.hello} <span className="accent-text">Samsul Arifin</span>
            <span className="hero-role-line"><RoleRotator key={locale} roles={copy.hero.roles} summary={copy.hero.roleSummary} /></span>
          </h1>
          <p className="hero-lead">{currentProfile.intro}</p>
          <div className="hero-actions">
            <a className="button" href="#work">
              {copy.hero.viewWork} <ArrowDownRight size={18} aria-hidden="true" />
            </a>
            <a className="text-link" href={`mailto:${currentProfile.email}`}>
              <Mail size={18} aria-hidden="true" /> {copy.hero.discuss}
            </a>
          </div>

          <div className="hero-quick-links">
            <div className="quick-link-group">
              <p>{copy.hero.connect}</p>
              <div>
                <a className="quick-icon quick-icon-linkedin" href={currentProfile.linkedin} target="_blank" rel="noreferrer" aria-label="Buka LinkedIn Samsul Arifin" title="LinkedIn">
                  <FaLinkedinIn size={20} aria-hidden="true" />
                </a>
                <a className="quick-icon quick-icon-gmail" href={`mailto:${currentProfile.email}`} aria-label="Kirim Gmail kepada Samsul Arifin" title="Gmail">
                  <SiGmail size={20} aria-hidden="true" />
                </a>
                <a className="quick-icon quick-icon-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Hubungi Samsul Arifin melalui WhatsApp" title="WhatsApp">
                  <FaWhatsapp size={21} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="quick-link-group">
              <p>{copy.hero.strengths}</p>
              <div>
                <span className="quick-icon" title="Process mapping"><Workflow size={20} aria-hidden="true" /></span>
                <span className="quick-icon" title="Operational control"><ChartNoAxesCombined size={20} aria-hidden="true" /></span>
                <span className="quick-icon" title="AI-assisted delivery"><Bot size={20} aria-hidden="true" /></span>
              </div>
            </div>
          </div>
        </div>

        <div className="portrait-wrap" aria-label={copy.hero.photoRegion}>
          <div className="portrait-backdrop" />
          <div className="portrait-card">
            <Image src="/images/profile.png" alt={copy.hero.photo} fill priority sizes="(max-width: 900px) 82vw, 42vw" />
          </div>
          <div className="portrait-label portrait-label-role">
            <Workflow size={17} aria-hidden="true" />
            <div><span>{copy.hero.role}</span><strong>{currentProfile.role}</strong></div>
          </div>
          <div className="portrait-label portrait-label-location">
            <MapPin size={17} aria-hidden="true" />
            <div><span>{copy.hero.based}</span><strong>{copy.hero.location}</strong></div>
          </div>
        </div>

        <a className="scroll-cue" href="#proof" aria-label={copy.hero.scroll}>
          <ChevronDown size={18} aria-hidden="true" />
        </a>
      </section>

      <section className="proof-bar" id="proof" aria-label={copy.proofAria}>
        <div className="shell mobile-quick-links">
          <div className="quick-link-group">
            <p>{copy.hero.connect}</p>
            <div>
              <a className="quick-icon quick-icon-linkedin" href={currentProfile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <FaLinkedinIn size={20} aria-hidden="true" />
              </a>
              <a className="quick-icon quick-icon-gmail" href={`mailto:${currentProfile.email}`} aria-label="Gmail" title="Gmail">
                <SiGmail size={20} aria-hidden="true" />
              </a>
              <a className="quick-icon quick-icon-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp">
                <FaWhatsapp size={21} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="quick-link-group">
            <p>{copy.hero.strengths}</p>
            <div>
              <span className="quick-icon" title="Process mapping"><Workflow size={20} aria-hidden="true" /></span>
              <span className="quick-icon" title="Operational control"><ChartNoAxesCombined size={20} aria-hidden="true" /></span>
              <span className="quick-icon" title="AI-assisted delivery"><Bot size={20} aria-hidden="true" /></span>
            </div>
          </div>
        </div>
        <div className="shell proof-grid">
          {proofPoints.map((item, index) => {
            const Icon = proofIcons[index] ?? Sparkles;
            return (
              <div className="proof-item reveal" key={item.label}>
                <Icon size={21} aria-hidden="true" />
                <div><strong>{item.value}</strong><span>{item.label}</span></div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="capability-section shell section-separator" id="capabilities">
        <div className="section-heading compact-heading reveal">
          <div>
            <p className="eyebrow">{copy.capabilities.eyebrow}</p>
            <h2>{copy.capabilities.title}</h2>
          </div>
          <p>{copy.capabilities.intro}</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability, index) => {
            const Icon = capabilityIcons[index] ?? Code2;
            return (
              <article className="capability-card reveal" key={capability.number}>
                <div className="capability-icon"><Icon size={30} aria-hidden="true" /></div>
                <div className="capability-copy">
                  <span>{capability.number}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.copy}</p>
                  <ArrowRight className="capability-arrow" size={22} aria-hidden="true" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="work-section shell section-separator" id="work">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">{copy.work.eyebrow}</p>
            <h2>{copy.work.title}</h2>
          </div>
          <p>{copy.work.intro}</p>
        </div>
        <div className="project-grid">
          {currentProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} locale={locale} />)}
        </div>
      </section>

      <section className="about-section shell section-separator" id="about">
        <div className="about-copy reveal">
          <p className="eyebrow">{copy.about.eyebrow}</p>
          <h2>{copy.about.title}</h2>
          <p>{currentProfile.about}</p>
          <div className="about-actions">
            <a className="button" href="/Samsul-Arifin-CV.pdf" download>
              {copy.nav.downloadCv} <FileDown size={18} aria-hidden="true" />
            </a>
            <a className="text-link" href={currentProfile.linkedin} target="_blank" rel="noreferrer">
              {copy.about.openLinkedin} <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="skills-panel reveal">
          <p className="panel-label">{copy.about.skills}</p>
          {skillGroups.map(([category, items]) => {
            const Icon = skillIcons[category] ?? Sparkles;
            return (
              <div className="skill-group" key={category}>
                <h3><Icon size={17} aria-hidden="true" /> {localizeSkillCategory(category, locale)}</h3>
                <div className="skill-list">
                  {items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="journey-section shell section-separator" id="journey">
        <div className="section-heading journey-heading reveal">
          <div>
            <p className="eyebrow">{copy.journey.eyebrow}</p>
            <h2>{copy.journey.title}</h2>
          </div>
          <p>{copy.journey.intro}</p>
        </div>
        <div className="timeline-columns">
          {experienceColumns.map((column) => {
            const ColumnIcon = column.icon;
            return (
              <div className="timeline-column" key={column.title}>
                <p className="timeline-eyebrow">{column.eyebrow}</p>
                <h3 className="timeline-column-title"><ColumnIcon size={26} aria-hidden="true" /> {column.title}</h3>
                <div className="experience-list">
                  {column.items.map((experience) => (
                    <article className="timeline-card reveal" key={`${experience.company}-${experience.period}`}>
                      <div className="timeline-card-head">
                        <div className="timeline-card-identity">
                          <div className={`company-logos${(companyLogos[experience.company]?.length ?? 0) > 1 ? " is-multiple" : ""}`} aria-hidden="true">
                            {(experience.logo ? [{ src: experience.logo, brand: "custom" }] : companyLogos[experience.company] ?? []).map((logo) => (
                              <span className="company-logo-tile" data-brand={logo.brand} key={logo.brand}>
                                <Image src={logo.src} alt="" fill sizes="92px" />
                              </span>
                            ))}
                          </div>
                          <div>
                            <h4>{experience.title}</h4>
                            <p>{experience.company}</p>
                          </div>
                        </div>
                        <span>{experience.period}</span>
                      </div>
                      <p className="timeline-summary">{experience.summary}</p>
                      <ul>
                        {experience.achievements.map((achievement) => (
                          <li key={achievement}><Check size={15} aria-hidden="true" /> {achievement}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="legacy-section shell section-separator">
        <div className="section-heading compact-heading reveal">
          <div>
            <p className="eyebrow">{copy.legacy.eyebrow}</p>
            <h2>{copy.legacy.title}</h2>
          </div>
          <p>{copy.legacy.intro}</p>
        </div>
        <div className="legacy-grid">
          {legacyWork.map((item, index) => {
            const Icon = legacyIcons[index] ?? Sparkles;
            return (
              <PdfModalCard key={item.title} locale={locale} pdf={item.pdf} title={item.title}>
                <div className="legacy-image">
                  <Image src={item.image} alt={`${copy.work.image} ${item.title}`} width={800} height={600} sizes="(max-width: 800px) 100vw, 33vw" />
                </div>
                <div>
                  <Icon size={22} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </PdfModalCard>
            );
          })}
        </div>
      </section>

      <section className="contact-strip shell reveal" id="contact">
        <div className="contact-icon"><Mail size={28} aria-hidden="true" /></div>
        <p className="eyebrow">{copy.contact.eyebrow}</p>
        <h2>{copy.contact.title}</h2>
        <p>{currentProfile.availability}</p>
        <div className="contact-actions">
          <a className="button" href={`mailto:${currentProfile.email}`}>
            {copy.contact.action} <Mail size={18} aria-hidden="true" />
          </a>
          <a className="contact-link" href={`tel:${currentProfile.phone.replace(/[^+\d]/g, "")}`}>
            <Phone size={18} aria-hidden="true" /> {currentProfile.phone}
          </a>
        </div>
      </section>

      <footer className="site-footer shell">
        <div>
          <span className="brand-mark">SA</span>
          <p>© {new Date().getFullYear()} Samsul Arifin. {copy.footer}</p>
        </div>
        <div className="footer-links">
          <a href={currentProfile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${currentProfile.email}`}>Email</a>
          <Link href="/admin/login">Admin</Link>
        </div>
      </footer>
    </main>
  );
}
