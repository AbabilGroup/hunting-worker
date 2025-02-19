import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://connect-europe.vercel.app"),
  title: "Hunting Worker - Agency for Employment",
  description: "We connect the right workers with the right employers.",
  keywords:
    "job, jobs, work, employment, employer, employee, career, hiring, recruitment, recruitment agency, job hunting, job search, job board, job site, job listing, job application, job vacancy, job opening, job opportunity, job offer ",
  icons: {
    icon: {
      url: "/logo.svg",
      type: "image/svg+xml",
    },
    apple: {
      url: "/logo.svg",
      type: "image/svg+xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Hunting Worker - Agency for Employment",
    description: "We connect the right workers with the right employers.",
    siteName: "Hunting Jobs",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 800,
        type: "image/svg+xml",
        alt: "Consultants Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hunting Worker - Agency for Employment",
    description: "We connect the right workers with the right employers.",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 800,
        alt: "Logo",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
