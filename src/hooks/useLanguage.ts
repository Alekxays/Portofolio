import { useEffect, useState } from "react";

type Language = "fr" | "en";

const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem(
        "language"
      ) as Language | null;
      return storedLanguage === "en" ? "en" : "fr"; // Définit "fr" par défaut
    }
    return "fr";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "fr" ? "en" : "fr"));
  };

  return { language, toggleLanguage };
};

export default useLanguage;
