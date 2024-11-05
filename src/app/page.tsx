"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import home_emoji from "../../public/img/home_emoji.png";
import ProjectsSection from "../components/projectsSection";
import ContactForm from "../components/contactForm";
import { useLanguage } from "../contexts/LanguageContext";

import GithubIcon from "../../public/img/github.svg";
import LinkedinIcon from "../../public/img/linkedin.svg";
import CVIcon from "../../public/img/cv.svg";
import MailIcon from "../../public/img/mail.svg";
import ArrowIcon from "../../public/img/arrow.svg";

export default function Home() {
  const { content, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cvLink =
    language === "fr"
      ? "/files/CV-Without S-Info-FR.pdf"
      : "/files/CV-Without S-Info-EN.pdf";

  return (
    <div className="min-h-screen bg-[#e9ecef] dark:bg-[#212529] text-black dark:text-white">
      <section
        id="home"
        className="max-w-7xl mx-auto px-4 py-16 flex items-center pt-96 mb-60 relative"
      >
        <div className="flex-shrink-0">
          <Image src={home_emoji} alt="emoji" className="w-7/12" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{content.welcome}</h1>
          <p className="text-xl mb-6">{content.introduction}</p>
          <div className="flex space-x-6 mt-4">
            {[
              {
                href: "https://github.com/Alekxays",
                label: "Github",
                icon: (
                  <GithubIcon className="w-6 h-6 text-black dark:text-white" />
                ),
              },
              {
                href: "https://www.linkedin.com/in/alexandre-boissel10/",
                label: "Linkedin",
                icon: (
                  <LinkedinIcon className="w-6 h-6 text-black dark:text-white" />
                ),
              },
              {
                href: cvLink, // Utilisez le lien du CV basé sur la langue ici
                label: "CV",
                icon: <CVIcon className="w-6 h-6 text-black dark:text-white" />,
              },
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-black dark:text-white hover:underline"
                aria-label={link.label}
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {!isScrolled && (
        <div className="fixed bottom-6 left-[44%] transform -translate-x-1/2 text-center animate-bounce">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <ArrowIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="text-lg">Scroll Down</span>
            <ArrowIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      )}

      {/* Section Projets */}
      <section id="projects" className="max-w-7xl mx-auto px-4 py-16">
        <ProjectsSection />
      </section>

      {/* Section Contact avec le composant ContactForm */}
      <section
        id="contact"
        className="max-w-7xl mx-auto px-4 py-16 pt-36 pb-24"
      >
        <div className="border-b-2 mb-14 border-black dark:border-white">
          <h2 className="text-3xl font-bold mb-4 italic">
            {content.contactTitle}
          </h2>
          <p className="text-black dark:text-white mb-8">
            {content.contactDescription}
          </p>
          <div className="flex space-x-4 mb-8 justify-center">
            <a
              href="mailto:hey@alexandreboissel.me"
              className="flex items-center space-x-2 text-black dark:text-white hover:underline"
              aria-label="Email"
            >
              <MailIcon className="w-6 h-6 text-black dark:text-white" />
              <span>hey@alexandreboissel.me</span>
            </a>
            <a
              href="https://linkedin.com"
              className="flex items-center space-x-2 text-black dark:text-white hover:underline"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-6 h-6 text-black dark:text-white" />
              <span>Linkedin</span>
            </a>
          </div>
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
