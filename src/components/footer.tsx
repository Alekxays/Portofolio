"use client";

import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();

  // Texte en fonction de la langue
  const footerText =
    language === "fr"
      ? "Conçu et développé avec le ❤️ par Alexandre."
      : "Designed and developed with ❤️ by Alexandre.";

  const copyrightYear = new Date().getFullYear();
  const copyrightText =
    language === "fr"
      ? `© ${copyrightYear} Alexandre. Tous droits réservés.`
      : `© ${copyrightYear} Alexandre. All rights reserved.`;

  return (
    <footer className="bg-[#e9ecef] dark:bg-[#212529] py-5 border-t border-slate-900 dark:border-slate-100">
      <div className="max-w-7xl mx-auto text-center px-4 text-black dark:text-white">
        <p className="text-base md:text-lg font-semibold">{footerText}</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={String(copyrightYear)}>{copyrightYear}</time> -{" "}
          {copyrightText}
        </p>
      </div>
    </footer>
  );
}
