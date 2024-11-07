"use client";

import { useEffect, useState } from "react";
import useColorTheme from "../hooks/useColorTheme";
import { useLanguage } from "../contexts/LanguageContext";
import SunIcon from "../../public/img/sun.svg";
import MoonIcon from "../../public/img/moon.svg";
import HomeIcon from "../../public/img/home.svg";
import ProjectsIcon from "../../public/img/projects.svg";
import ContactIcon from "../../public/img/contact.svg";
import FranceIcon from "../../public/img/france.svg";
import USAIcon from "../../public/img/usa.svg";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const { theme, toggleTheme } = useColorTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["home", "projects", "contact"];
      const sectionOffsets = sections.map((section) => ({
        id: section,
        offset: document.getElementById(section)?.offsetTop ?? 0,
      }));

      const currentSection = sectionOffsets.find((section, index) => {
        const nextOffset = sectionOffsets[index + 1]?.offset || Infinity;
        return (
          window.scrollY >= section.offset - 100 &&
          window.scrollY < nextOffset - 100
        );
      });

      setActiveSection(currentSection?.id || "home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigationClick = (sectionId: string): void => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full p-4 lg:p-8 border-b-2 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-[#e9ecef]/80 dark:bg-[#212529]/80 border-slate-900 dark:border-slate-100"
          : "bg-[#e9ecef]/30 dark:bg-[#212529]/30 border-transparent"
      }`}
      style={{ backdropFilter: isScrolled ? "blur(4px)" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-16 flex items-center justify-between">
        <h1 className="text-xl lg:text-3xl text-black dark:text-white font-bold">
          Alexandre BOISSEL
        </h1>

        {/* Menu burger icon for mobile with animation */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="text-black dark:text-white focus:outline-none"
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>

          {/* Dropdown menu under the burger button */}
          {isMenuOpen && (
            <div className="absolute top-16 right-4 w-48 bg-[#e9ecef] dark:bg-[#212529] rounded-lg shadow-lg py-4 z-50">
              <nav className="flex flex-col items-start space-y-2 px-4">
                {[
                  { id: "home", label: "Accueil", icon: HomeIcon },
                  { id: "projects", label: "Projets", icon: ProjectsIcon },
                  { id: "contact", label: "Contact", icon: ContactIcon },
                ].map((item) => (
                  <a
                    key={item.id}
                    onClick={() => handleNavigationClick(item.id)}
                    className={`text-black dark:text-white flex items-center space-x-2 cursor-pointer transition-colors duration-200 w-full ${
                      activeSection === item.id
                        ? "text-blue-500 dark:text-[#8d99ae] font-semibold"
                        : ""
                    }`}
                    role="button"
                  >
                    <item.icon width={20} height={20} aria-label={item.label} />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
              <div className="flex justify-center items-center space-x-4 mt-4 px-4">
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle Dark Mode"
                  className="bg-[#F8F9FA] dark:bg-[#343A40] p-2 rounded-full"
                >
                  {theme === "dark" ? (
                    <SunIcon width={24} height={24} className="text-white" />
                  ) : (
                    <MoonIcon width={24} height={24} />
                  )}
                </button>

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
              </div>
            </div>
          )}
        </div>

        {/* Main navigation for large screens */}
        <div className={`hidden lg:flex items-center space-x-4`}>
          <nav className="flex items-center space-x-4">
            {[
              { id: "home", label: "Accueil", icon: HomeIcon },
              { id: "projects", label: "Projets", icon: ProjectsIcon },
              { id: "contact", label: "Contact", icon: ContactIcon },
            ].map((item) => (
              <a
                key={item.id}
                onClick={() => handleNavigationClick(item.id)}
                className={`text-sm lg:text-base text-black dark:text-white flex items-center space-x-1 cursor-pointer transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-blue-500 dark:text-[#8d99ae] font-semibold"
                    : ""
                }`}
                role="button"
              >
                <item.icon width={20} height={20} aria-label={item.label} />
                <span className="hidden sm:inline lg:pl-2">{item.label}</span>
              </a>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="bg-[#F8F9FA] border-2 border-[#495057] p-1 dark:border-none dark:bg-[#343A40] dark:p-2 rounded-md"
          >
            {theme === "dark" ? (
              <SunIcon width={24} height={24} className="text-white" />
            ) : (
              <MoonIcon width={24} height={24} />
            )}
          </button>

          <div className="relative flex items-center border border-slate-900 dark:border-slate-100 rounded-md overflow-hidden w-20 lg:w-24 h-10 bg-[#F8F9FA] dark:bg-[#343A40]">
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
              <FranceIcon width={20} height={20} className="ml-3" />
            </button>
            <button
              onClick={toggleLanguage}
              className={`w-1/2 text-center z-10 focus:outline-none transition-opacity duration-300 ${
                language === "en" ? "opacity-100" : "opacity-50"
              }`}
              aria-label="Select English"
            >
              <USAIcon width={20} height={20} className="ml-3" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
