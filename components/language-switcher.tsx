"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALE_COOKIE } from "@/lib/locale-cookie";
import type { Locale } from "@/lib/localization";

const options: { locale: Locale; label: string; lang: string }[] = [
  { locale: "id", label: "ID", lang: "id" },
  { locale: "en", label: "EN", lang: "en" },
  { locale: "zh", label: "中", lang: "zh-CN" },
];

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function selectLocale(nextLocale: Locale) {
    const url = new URL(window.location.href);
    if (nextLocale === "id") url.searchParams.delete("lang");
    else url.searchParams.set("lang", nextLocale);
    // Explicit pick — persist it so it sticks on links/visits that don't carry `?lang=`.
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.replace(`${pathname}${url.search}${url.hash}`, { scroll: false });
    // Layouts (root layout's <html lang>) don't re-render on a searchParams-only
    // soft navigation — force a server refresh so it picks up the new cookie.
    router.refresh();
  }

  return (
    <div className="language-switcher" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          type="button"
          className={option.locale === locale ? "is-active" : ""}
          aria-pressed={option.locale === locale}
          lang={option.lang}
          onClick={() => selectLocale(option.locale)}
          key={option.locale}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
