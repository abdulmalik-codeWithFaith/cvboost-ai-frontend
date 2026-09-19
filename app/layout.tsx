import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL in production so social previews use absolute URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title = "CV Boost AI: optimize your CV for every job";
const description =
  "Upload your CV, paste a job description, and get an ATS-optimized resume and personalized cover letter in seconds. Try it free, no sign-up.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | CV Boost AI",
  },
  description,
  applicationName: "CV Boost AI",
  keywords: ["CV optimizer", "ATS resume checker", "AI cover letter", "resume keywords", "job application"],
  openGraph: {
    type: "website",
    siteName: "CV Boost AI",
    title,
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  // Tip: drop an opengraph-image.png (1200x630) into /app and Next picks it up automatically.
};

export const viewport: Viewport = {
  themeColor: "#10131c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} h-full`}>
      <head>
        {/*
          Material Symbols is only needed by pages that use it (e.g. dashboard).
          The landing page uses lucide-react, so remove these three tags if
          nothing else in the app renders <span className="material-symbols-outlined">.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}