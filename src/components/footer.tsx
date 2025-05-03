"use client";

import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
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
      className="py-6 border-t"
      aria-labelledby="footer-title"
    >
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 id="footer-title" className="sr-only">
          {language === "fr" ? "Pied de page" : "Footer"}
        </h2>
        <p className="text-base md:text-lg font-semibold">{footerText}</p>
        <p className="mt-2 text-sm">
          <time dateTime={String(copyrightYear)}>© {copyrightYear}</time>{" "}
          {copyrightText}
        </p>
      </div>
    </footer>
  );
}
