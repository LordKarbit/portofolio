import type { Metadata } from "next";
import { Montserrat, Noto_Sans_SC, Poppins } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@/components/analytics";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sc",
  display: "swap",
});

const socialTitle = "Samsul Arifin | Business Process & Operations Systems";
const socialDescription =
  "Portfolio Samsul Arifin: business process improvement, operational excellence, operations systems, dan AI automation untuk kerja yang cepat dan terukur.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: socialTitle,
    template: "%s | Samsul Arifin",
  },
  description: socialDescription,
  applicationName: "Portfolio Samsul Arifin",
  authors: [{ name: "Samsul Arifin", url: "/" }],
  creator: "Samsul Arifin",
  publisher: "Samsul Arifin",
  category: "Professional Portfolio",
  keywords: [
    "Business Process Improvement",
    "Operational Excellence",
    "Operations Systems",
    "Business Systems Analyst",
    "Operations Transformation",
    "AI Automation",
    "Process Mapping",
    "Samsul Arifin",
    "Sidoarjo",
    "Indonesia",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Portfolio Samsul Arifin",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Samsul Arifin — Business Process & Operations Systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${montserrat.variable} ${notoSansSC.variable}`}>
        {children}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
