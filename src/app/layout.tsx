import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { LanguageProvider } from "../contexts/LanguageContext";
import "./globals.css";
import { Space_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Alexandre BOISSEL",
  description: "Portfolio d'Alexandre BOISSEL",
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
    <html lang="en">
      <body
        className={`${spaceMono.className} bg-[#e9ecef] dark:bg-[#212529] text-black dark:text-white`}
      >
        <LanguageProvider>
          <Header />
          <main className={spaceMono.className}>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
