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

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: "Samsul Arifin | Operations Systems & Automation Specialist",
  description:
    "Portofolio Samsul Arifin, spesialis sistem operasi dan otomasi yang merancang workflow, kontrol, data, serta aplikasi berbantuan AI.",
  openGraph: {
    title: "Samsul Arifin | Operations Systems & Automation Specialist",
    description: "Workflow, kontrol, data, dan aplikasi berbantuan AI untuk operasi yang lebih cepat dan akurat.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samsul Arifin | Operations Systems & Automation Specialist",
    description: "Workflow, kontrol, data, dan aplikasi berbantuan AI untuk operasi yang lebih cepat dan akurat.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${montserrat.variable} ${notoSansSC.variable}`}>{children}</body>
    </html>
  );
}
