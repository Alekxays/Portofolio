"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import fr from "../../public/locales/fr.json";
import en from "../../public/locales/en.json";

type Language = "fr" | "en";
interface LanguageContextProps {
  language: Language;
  content: typeof fr; // Utiliser le type des traductions
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");
  const [content, setContent] = useState(fr);

  const toggleLanguage = () => {
    const newLanguage = language === "fr" ? "en" : "fr";
    setLanguage(newLanguage);
    setContent(newLanguage === "fr" ? fr : en); // Change le contenu dynamiquement
  };

  return (
    <LanguageContext.Provider value={{ language, content, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
