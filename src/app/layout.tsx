import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LanguageProvider } from "../contexts/LanguageContext";
import "./globals.css";
import { Space_Mono } from "next/font/google";

const Header = dynamic(() => import("@/components/header"));
const Footer = dynamic(() => import("@/components/footer"));

export const metadata: Metadata = {
  title: "Alexandre BOISSEL - Portfolio",
  description:
    "Explorez le portfolio d'Alexandre BOISSEL, développeur full-stack",
  keywords: [
    "Alexandre BOISSEL",
    "développeur",
    "portfolio",
    "web",
    "applications",
    "créatif",
  ],
  openGraph: {
    title: "Alexandre BOISSEL - Portfolio",
    description: "Portfolio d'Alexandre BOISSEL, développeur full-stack.",
    images: [
      {
        url: "/img/home_emoji.png",
        width: 800,
        height: 600,
        alt: "Portfolio d'Alexandre BOISSEL",
      },
    ],
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandre BOISSEL - Portfolio",
    description:
      "Explorez les projets et compétences d'Alexandre BOISSEL, développeur créatif.",
    images: [
      {
        url: "/img/home_emoji.png",
        alt: "Portfolio d'Alexandre BOISSEL",
      },
    ],
  },
};

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${spaceMono.className} bg-[#e9ecef] dark:bg-[#212529] text-black dark:text-white`}
      >
        <LanguageProvider>
          <Header />
          <main className={spaceMono.className} role="main">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}