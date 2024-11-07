import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { LanguageProvider } from "../contexts/LanguageContext";
import { useLanguage } from "../contexts/LanguageContext";
import "./globals.css";
import { Space_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Alexandre BOISSEL - Portfolio",
  description:
    "Explorez le portfolio d'Alexandre BOISSEL, développeur spécialisé en solutions numériques créatives.",
  openGraph: {
    title: "Alexandre BOISSEL - Portfolio",
    description:
      "Portfolio d'Alexandre BOISSEL, développeur expert en solutions numériques.",
    images: "/public/img/home_emoji.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandre BOISSEL - Portfolio",
    description:
      "Explorez les projets et compétences d'Alexandre BOISSEL, développeur créatif.",
    images: "/public/img/home_emoji.png",
  },
  viewport: "width=device-width, initial-scale=1",
};

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  return (
    <html lang={language} className="scroll-smooth">
      <body
        className={`${spaceMono.className} bg-[#e9ecef] dark:bg-[#212529] text-black dark:text-white`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </LanguageProvider>
  );
}
