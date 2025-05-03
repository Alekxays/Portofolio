import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { LanguageProvider } from "../contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Space_Mono } from "next/font/google";

const Header = dynamic(() => import("@/components/header"));
const Footer = dynamic(() => import("@/components/footer"));

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexandre BOISSEL - Développeur Full-Stack | Portfolio",
  description: "Portfolio d'Alexandre BOISSEL, développeur full-stack spécialisé dans la création d'applications web innovantes et performantes",
  keywords: [
    "Alexandre BOISSEL",
    "développeur full-stack",
    "portfolio",
    "développement web",
    "applications web",
    "React",
    "NextJS",
    "TypeScript",
    "développeur français",
  ],
  authors: [{ name: "Alexandre BOISSEL" }],
  creator: "Alexandre BOISSEL",
  publisher: "Alexandre BOISSEL",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9ecef" },
    { media: "(prefers-color-scheme: dark)", color: "#212529" }
  ],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: "https://www.alexandreboissel.me/",
    languages: {
      'fr-FR': '/fr',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: "Alexandre BOISSEL - Développeur Full-Stack | Portfolio",
    description: "Découvrez mes projets et compétences en développement web full-stack. Spécialisé en React, NextJS et TypeScript.",
    url: "https://www.alexandreboissel.me/",
    siteName: "Portfolio Alexandre BOISSEL",
    images: [
      {
        url: "/img/home_emoji.png",
        width: 800,
        height: 600,
        alt: "Portfolio d'Alexandre BOISSEL - Développeur Full-Stack",
      },
    ],
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Alekxays",
    creator: "@Alekxays",
    title: "Alexandre BOISSEL - Développeur Full-Stack | Portfolio",
    description: "Découvrez mes projets et compétences en développement web full-stack. Spécialisé en React, NextJS et TypeScript.",
    images: [
      {
        url: "/img/home_emoji.png",
        alt: "Portfolio d'Alexandre BOISSEL - Développeur Full-Stack",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <body
        className={`${spaceMono.className} bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <Header />
            <main className={`${spaceMono.className} flex-grow`} role="main">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}