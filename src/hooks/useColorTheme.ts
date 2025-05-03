import { useTheme } from "next-themes";

type Theme = "light" | "dark";

const useColorTheme = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return {
    theme: theme as Theme,
    toggleTheme
  };
};

export default useColorTheme;
