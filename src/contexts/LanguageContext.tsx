"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import fr from "../../public/locales/fr.json";
import en from "../../public/locales/en.json";

type Language = "fr" | "en";

interface LanguageContextProps {
  language: Language;
  content: typeof fr;
  toggleLanguage: () => void;
  contactSending: string;
  contactSuccess: string;
  contactError: string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");
  const [content, setContent] = useState(fr);

  useEffect(() => {
    // Charger la langue depuis le localStorage si elle existe
    const storedLanguage = localStorage.getItem("language") as Language | null;
    if (storedLanguage) {
      setLanguage(storedLanguage);
      setContent(storedLanguage === "fr" ? fr : en);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "fr" ? "en" : "fr";
    setLanguage(newLanguage);
    setContent(newLanguage === "fr" ? fr : en);
    localStorage.setItem("language", newLanguage); // Enregistrer la langue sélectionnée dans le localStorage
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        content,
        toggleLanguage,
        contactSending: content.contactSending,
        contactSuccess: content.contactSuccess,
        contactError: content.contactError,
      }}
    >
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
