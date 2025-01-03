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
      ? `Alexandre - Tous droits réservés.`
      : `Alexandre - All rights reserved.`;

  return (
    <footer
      className="bg-[#e9ecef] dark:bg-[#212529] py-6 border-t border-slate-900 dark:border-slate-100"
      aria-labelledby="footer-title"
    >
      <div className="max-w-7xl mx-auto text-center px-4 text-black dark:text-white">
        {/* Titre sémantique pour le footer */}
        <h2 id="footer-title" className="sr-only">
          {language === "fr" ? "Pied de page" : "Footer"}
        </h2>
        <p className="text-base md:text-lg font-semibold">{footerText}</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={String(copyrightYear)}>© {copyrightYear}</time>{" "}
          {copyrightText}
        </p>
      </div>
    </footer>
  );
}
