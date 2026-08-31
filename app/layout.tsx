import type { Metadata } from "next";
import { Montserrat, Noto_Sans_SC, Poppins } from "next/font/google";
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

const productionUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
const socialTitle = "Samsul Arifin — Operations Systems & Automation Specialist";
const socialDescription =
  "Saya memetakan proses, workflow, kontrol, dan data—lalu menggunakan AI untuk mewujudkannya menjadi sistem kerja yang cepat, akurat, dan siap dipakai.";

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: socialTitle,
  description: socialDescription,
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Portfolio Samsul Arifin",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Samsul Arifin — Operations Systems & Automation Specialist" }],
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
      <body className={`${poppins.variable} ${montserrat.variable} ${notoSansSC.variable}`}>{children}</body>
    </html>
  );
}
