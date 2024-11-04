import { useEffect, useState } from "react";

type Language = "fr" | "en";

const useLanguage = () => {
  const [language, setLanguage] = useState<Language>("fr");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "fr" ? "en" : "fr";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return { language, toggleLanguage };
};

export default useLanguage;
