"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { LOCALE_COOKIE } from "@/lib/locale-cookie";
import type { Locale } from "@/lib/localization";

const options: { locale: Locale; label: string; lang: string }[] = [
  { locale: "id", label: "ID", lang: "id" },
  { locale: "en", label: "EN", lang: "en" },
  { locale: "zh", label: "中", lang: "zh-CN" },
];

const TOUR_STORAGE_KEY = "samsul-portfolio-language-tour-v2";

function hasSeenTour() {
  try {
    return window.localStorage.getItem(TOUR_STORAGE_KEY) === "done";
  } catch {
    return false;
  }
}

const tourCopy = {
  id: {
    title: "Pilih bahasa yang nyaman untuk Anda",
    dismiss: "Mengerti",
    close: "Tutup petunjuk bahasa",
  },
  en: {
    title: "Read in your preferred language",
    dismiss: "Got it",
    close: "Close language guide",
  },
  zh: {
    title: "选择适合您的阅读语言",
    dismiss: "知道了",
    close: "关闭语言提示",
  },
} satisfies Record<Locale, { title: string; dismiss: string; close: string }>;

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showTour, setShowTour] = useState(false);
  const dismissRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let timer: number | undefined;
    if (!hasSeenTour()) {
      timer = window.setTimeout(() => {
        if (!hasSeenTour()) setShowTour(true);
      }, 550);
    }
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showTour) return;
    dismissRef.current?.focus();
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismissTour();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [showTour]);

  function dismissTour() {
    setShowTour(false);
    try {
      window.localStorage.setItem(TOUR_STORAGE_KEY, "done");
    } catch {
      // Keep the tour dismissible even when storage is blocked.
    }
  }

  function selectLocale(nextLocale: Locale) {
    dismissTour();
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
    <div className={`language-tour-anchor${showTour ? " is-touring" : ""}`}>
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
      {showTour && (
        <div className="language-tour-card" role="region" aria-labelledby="language-tour-title">
          <span className="language-tour-eyebrow">ID / EN / 中文</span>
          <h2 id="language-tour-title" lang={locale === "zh" ? "zh-CN" : locale}>{tourCopy[locale].title}</h2>
          <p lang="id"><strong>ID</strong> Bahasa Indonesia tampil pertama. Gunakan tombol di atas untuk mengganti bahasa.</p>
          <p lang="en"><strong>EN</strong> This site opens in Indonesian. Use the buttons above to switch languages.</p>
          <p lang="zh-CN"><strong>中文</strong> 网站默认显示印尼语。点击上方按钮切换语言。</p>
          <button ref={dismissRef} type="button" className="language-tour-dismiss" onClick={dismissTour} aria-label={tourCopy[locale].close}>
            {tourCopy[locale].dismiss}
          </button>
        </div>
      )}
      {showTour && typeof document !== "undefined" && createPortal(
        <div className="language-tour-backdrop" aria-hidden="true" onClick={dismissTour} />,
        document.body,
      )}
    </div>
  );
}
