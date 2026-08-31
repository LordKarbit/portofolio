"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-FLQYP6RWMF";
const CLARITY_PROJECT_ID = "yb38tfkh85";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    clarity: (...args: unknown[]) => void;
  }
}

function sendEvent(name: string, parameters: Record<string, string | number> = {}) {
  window.gtag?.("event", name, parameters);
  window.clarity?.("event", name);
}

type TrackedLink = {
  name: string;
  parameters: Record<string, string | number>;
};

function classifyLink(anchor: HTMLAnchorElement): TrackedLink | null {
  const href = anchor.getAttribute("href") ?? "";

  if (href.startsWith("mailto:")) return { name: "generate_lead", parameters: { method: "email" } };
  if (href.startsWith("tel:")) return { name: "generate_lead", parameters: { method: "phone" } };
  if (href.includes("wa.me/")) return { name: "generate_lead", parameters: { method: "whatsapp" } };
  if (href.endsWith(".pdf")) return { name: "cv_download", parameters: { asset: "cv" } };
  if (href.includes("linkedin.com")) return { name: "linkedin_click", parameters: { destination: "linkedin" } };
  if (href.includes("/projects/")) {
    const project = href.split("/projects/")[1]?.split(/[?#]/)[0] || "project";
    return { name: "select_content", parameters: { content_type: "portfolio_project", item_id: project } };
  }
  if (href === "#work" || href.includes("/#work")) return { name: "view_portfolio", parameters: { section: "work" } };
  if (href.includes("lang=")) {
    const language = new URL(anchor.href).searchParams.get("lang") ?? "id";
    return { name: "language_change", parameters: { language } };
  }

  return null;
}

function AnalyticsEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    window.gtag?.("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pagePath,
    });
    window.clarity?.("set", "page_path", pagePath);
    window.clarity?.("set", "language", searchParams.get("lang") ?? "id");
  }, [pathname, searchParams]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const eventData = classifyLink(anchor);
      if (eventData) sendEvent(eventData.name, eventData.parameters);
    };

    const reached = new Set<number>();
    const milestones = [25, 50, 75, 90];
    const onScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (documentHeight <= 0) return;
      const depth = Math.round((window.scrollY / documentHeight) * 100);
      milestones.forEach((milestone) => {
        if (depth >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          sendEvent("scroll_depth", { percent_scrolled: milestone });
        }
      });
    };

    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}

export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `}
      </Script>
      <AnalyticsEvents />
    </>
  );
}
