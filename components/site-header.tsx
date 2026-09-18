import Link from "next/link";
import { FileDown } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ShareButton } from "@/components/share-button";
import { type Locale, uiCopy, withLocale } from "@/lib/localization";
import { siteUrl } from "@/lib/site-url";

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = uiCopy[locale];

  return (
    <header className="site-header">
      <Link className="brand" href={withLocale("/", locale)} aria-label={copy.nav.homeAria}>
        <span className="brand-mark">SA</span>
        <span>Samsul Arifin</span>
      </Link>
      <nav aria-label={copy.nav.navAria}>
        <Link href={withLocale("/#home", locale)}>{copy.nav.home}</Link>
        <Link href={withLocale("/#capabilities", locale)}>{copy.nav.capabilities}</Link>
        <Link href={withLocale("/#work", locale)}>{copy.nav.work}</Link>
        <Link href={withLocale("/#journey", locale)}>{copy.nav.resume}</Link>
        <Link href={withLocale("/#contact", locale)}>{copy.nav.contact}</Link>
      </nav>
      <div className="header-actions">
        <LanguageSwitcher locale={locale} label={copy.nav.languageAria} />
        <div className="header-action-buttons">
          <ShareButton locale={locale} url={`${siteUrl}/`} />
          <a className="button button-compact header-cv" href="/Samsul-Arifin-CV.pdf" download aria-label={copy.nav.downloadCv} title={copy.nav.downloadCv}>
            <span className="header-action-label">{copy.nav.downloadCv}</span><FileDown size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
