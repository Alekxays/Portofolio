"use client";

import { useEffect, useState } from "react";
import useColorTheme from "../hooks/useColorTheme";
import { useLanguage } from "../contexts/LanguageContext";
import SunIcon from "../../public/img/sun.svg";
import MoonIcon from "../../public/img/moon.svg";
import HomeIcon from "../../public/img/home.svg";
import ProjectsIcon from "../../public/img/projects.svg";
import ContactIcon from "../../public/img/contact.svg";
import AboutMeIcon from "../../public/img/aboutme.svg"; // Assurez-vous que ce fichier existe
import FranceIcon from "../../public/img/france.svg";
import USAIcon from "../../public/img/usa.svg";
import { HiMenu, HiX } from "react-icons/hi";

const NAV_ITEMS = [
  { id: "home", label: "Accueil", icon: HomeIcon },
  { id: "about-me", label: "À propos", icon: AboutMeIcon },
  { id: "projects", label: "Projets", icon: ProjectsIcon },
  { id: "contact", label: "Contact", icon: ContactIcon },
];

export default function Header() {
  const { theme, toggleTheme } = useColorTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map(({ id }) => ({
        id,
        offset: document.getElementById(id)?.offsetTop ?? 0,
      }));

      const currentSection = sections.find((section, index) => {
        const nextOffset = sections[index + 1]?.offset || Infinity;
        return (
          window.scrollY >= section.offset - 100 &&
          window.scrollY < nextOffset - 100
        );
      });

      setActiveSection(currentSection?.id || "home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigationClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full p-4 lg:p-6 border-b z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-[#e9ecef]/80 dark:bg-[#212529]/80 border-slate-900 dark:border-slate-100"
          : "bg-[#e9ecef]/30 dark:bg-[#212529]/30 border-transparent"
      }`}
      style={{ backdropFilter: isScrolled ? "blur(4px)" : "none" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-16">
        {/* Logo */}
        <h1 className="text-xl lg:text-3xl text-black dark:text-white font-bold">
          Alexandre BOISSEL
        </h1>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="text-black dark:text-white"
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
          {isMenuOpen && (
            <div className="absolute top-16 right-4 w-48 bg-[#e9ecef] dark:bg-[#212529] rounded-lg shadow-lg py-4 z-50">
              <nav className="flex flex-col items-start space-y-2 px-4">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    onClick={() => handleNavigationClick(item.id)}
                    className={`flex items-center space-x-2 cursor-pointer text-sm transition-colors duration-200 ${
                      activeSection === item.id
                        ? "text-blue-500 dark:text-[#8d99ae] font-semibold"
                        : "text-black dark:text-white"
                    }`}
                  >
                    <item.icon width={20} height={20} aria-label={item.label} />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
              {/* Lang & Theme Toggle */}
              <div className="flex justify-between items-center mt-4 px-4 space-x-4">
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle Dark Mode"
                  className="p-2 rounded-full bg-[#F8F9FA] dark:bg-[#343A40]"
                >
                  {theme === "dark" ? (
                    <SunIcon width={24} height={24} className="text-white" />
                  ) : (
                    <MoonIcon width={24} height={24} />
                  )}
                </button>
                <LanguageToggle
                  language={language}
                  toggleLanguage={toggleLanguage}
                />
              </div>
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                onClick={() => handleNavigationClick(item.id)}
                className={`text-sm lg:text-base flex items-center space-x-1 cursor-pointer transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-blue-500 dark:text-[#8d99ae] font-semibold"
                    : "text-black dark:text-white"
                }`}
              >
                <item.icon width={20} height={20} aria-label={item.label} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-full bg-[#F8F9FA] dark:bg-[#343A40]"
            >
              {theme === "dark" ? (
                <SunIcon width={24} height={24} className="text-white" />
              ) : (
                <MoonIcon width={24} height={24} />
              )}
            </button>
            <LanguageToggle
              language={language}
              toggleLanguage={toggleLanguage}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

const LanguageToggle = ({
  language,
  toggleLanguage,
}: {
  language: string;
  toggleLanguage: () => void;
}) => (
  <div className="relative flex items-center border border-slate-900 dark:border-slate-100 rounded-md overflow-hidden w-20 h-10 bg-[#F8F9FA] dark:bg-[#343A40]">
    <div
      className={`absolute top-0 left-0 h-full w-1/2 border-slate-900 dark:border-slate-100 border-2 rounded-md transition-transform duration-300 ${
        language === "fr" ? "translate-x-0" : "translate-x-full"
      }`}
    ></div>
    <button
      onClick={toggleLanguage}
      className={`w-1/2 text-center z-10 focus:outline-none transition-opacity duration-300 ${
        language === "fr" ? "opacity-100" : "opacity-50"
      }`}
      aria-label="Select French"
    >
      <FranceIcon width={14} height={14} className="ml-3" />
    </button>
    <button
      onClick={toggleLanguage}
      className={`w-1/2 text-center z-10 focus:outline-none transition-opacity duration-300 ${
        language === "en" ? "opacity-100" : "opacity-50"
      }`}
      aria-label="Select English"
    >
      <USAIcon width={14} height={14} className="ml-3" />
    </button>
  </div>
);
