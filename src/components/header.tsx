"use client";

import { useEffect, useState } from "react";
import useColorTheme from "../hooks/useColorTheme";
import { useLanguage } from "../contexts/LanguageContext";
import SunIcon from "/public/img/sun.svg";
import MoonIcon from "/public/img/moon.svg";
import HomeIcon from "/public/img/home.svg";
import ProjectsIcon from "/public/img/projects.svg";
import ContactIcon from "/public/img/contact.svg";
import AboutMeIcon from "/public/img/aboutme.svg";
import FranceIcon from "/public/img/france.svg";
import USAIcon from "/public/img/usa.svg";
import { HiMenu, HiX } from "react-icons/hi";

const NAV_ITEMS = [
  { id: "home", label: "Accueil", icon: HomeIcon },
  { id: "about-me", label: "À propos", icon: AboutMeIcon },
  { id: "projects", label: "Projets", icon: ProjectsIcon },
  { id: "contact", label: "Contact", icon: ContactIcon },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useColorTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (typeof window !== "undefined") {
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
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigationClick = (sectionId: string) => {
    if (typeof window !== "undefined") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
        setIsMenuOpen(false);
      }
    }
  };

  if (!mounted) {
    return (
      <header className="fixed top-0 w-full p-4 lg:p-6 border-b z-50 bg-background/30 border-transparent">
        <div className="container flex items-center justify-between">
          <h1 className="text-xl lg:text-3xl font-bold text-foreground">
            Alexandre BOISSEL
          </h1>
          <div className="lg:hidden">
            <button aria-label="Toggle Menu" className="p-2 text-foreground rounded-full">
              <HiMenu size={24} />
            </button>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center">
              {NAV_ITEMS.map((item) => (
                <span key={item.id} className="px-4 py-2 text-base">
                  {item.label}
                </span>
              ))}
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`
        fixed top-0 w-full p-4 lg:p-6 border-b z-50 
        transition-colors duration-normal backdrop-blur-[4px]
        ${isScrolled
          ? "bg-background/80 border-card-border shadow-sm"
          : "bg-background/30 border-transparent"
        }
      `}
    >
      <div className="container flex items-center justify-between">
        <h1 className="text-xl lg:text-3xl font-bold text-foreground">
          Alexandre BOISSEL
        </h1>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 text-foreground rounded-full hover:bg-card-hover focus-visible-ring"
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>

          {isMenuOpen && (
            <div className="
              absolute top-16 right-4 w-56 
              bg-card rounded-lg shadow-lg py-4 z-50
              border border-card-border 
              animate-fade-in
            ">
              <nav className="flex flex-col items-start space-y-2 px-4">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    onClick={() => handleNavigationClick(item.id)}
                    className={`
                      group flex items-center w-full space-x-2 px-3 py-2
                      rounded-md cursor-pointer text-sm 
                      transition-colors duration-normal
                      hover:bg-card-hover focus-visible-ring
                      ${activeSection === item.id
                        ? "text-primary font-semibold bg-primary/10"
                        : "text-foreground"
                      }
                    `}
                  >
                    <item.icon width={20} height={20} aria-label={item.label} className="
                      transition-transform duration-normal
                      group-hover:scale-110
                    " />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
              <div className="flex justify-between items-center mt-4 px-4 pt-4 border-t border-card-border">
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle Dark Mode"
                  className="
                    p-2 rounded-full bg-card-hover hover:bg-primary/10
                    transition-colors duration-fast focus-visible-ring
                  "
                >
                  {theme === "dark" ? (
                    <SunIcon width={20} height={20} className="text-foreground" />
                  ) : (
                    <MoonIcon width={20} height={20} className="text-foreground" />
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
          <nav className="flex items-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                onClick={() => handleNavigationClick(item.id)}
                className={`
                  group flex items-center space-x-1 px-4 py-2
                  text-base cursor-pointer rounded-md
                  transition-colors duration-normal
                  hover:bg-card-hover focus-visible-ring
                  ${activeSection === item.id
                    ? "text-primary font-semibold"
                    : "text-foreground"
                  }
                `}
              >
                <item.icon
                  width={20}
                  height={20}
                  aria-label={item.label}
                  className="
                    transition-transform duration-normal
                    group-hover:scale-110
                  "
                />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="
                p-2 rounded-full bg-card hover:bg-card-hover
                transition-colors duration-fast focus-visible-ring
              "
            >
              {theme === "dark" ? (
                <SunIcon width={20} height={20} className="text-foreground" />
              ) : (
                <MoonIcon width={20} height={20} className="text-foreground" />
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
  <div className="
    relative flex items-center rounded-md overflow-hidden
    w-20 h-10 bg-card border border-card-border
  ">
    <div
      className={`
        absolute top-0 left-0 h-full w-1/2 
        border border-primary rounded-md transition-transform
        duration-normal bg-primary/10
        ${language === "fr" ? "translate-x-0" : "translate-x-full"}
      `}
    />
    <button
      onClick={toggleLanguage}
      className={`
        w-1/2 h-full text-center z-10 focus:outline-none
        transition-opacity duration-normal focus-visible-ring
        ${language === "fr" ? "opacity-100" : "opacity-50"}
      `}
      aria-label="Select French"
    >
      <FranceIcon width={14} height={14} className="inline-block" />
    </button>
    <button
      onClick={toggleLanguage}
      className={`
        w-1/2 h-full text-center z-10 focus:outline-none
        transition-opacity duration-normal focus-visible-ring
        ${language === "en" ? "opacity-100" : "opacity-50"}
      `}
      aria-label="Select English"
    >
      <USAIcon width={14} height={14} className="inline-block" />
    </button>
  </div>
);
