import { useEffect, useState } from "react";

const useColorTheme = () => {
  const [theme, setTheme] = useState<string>(
    typeof window !== "undefined" ? localStorage.theme : "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
};

export default useColorTheme;
