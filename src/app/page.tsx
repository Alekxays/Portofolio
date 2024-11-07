"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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

  const cvLink =
    language === "fr"
      ? "/files/CV-Alexandre-BOISSEL-FR.pdf"
      : "/files/CV-Alexandre-BOISSEL-EN.pdf";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <main className="min-h-screen bg-[#e9ecef] dark:bg-[#212529] text-black dark:text-white">
        {/* Hero Section */}
        <section
          id="home"
          className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center pt-40 md:pt-72 mb-20 md:mb-60 relative space-y-8 md:space-y-0"
          aria-labelledby="hero-title"
        >
          <Image
            src="/public/img/home_emoji.png"
            alt="Alexandre Boissel"
            className="w-40 md:w-6/12 lg:w-7/12"
            loading="lazy"
          />
          <div className="text-center md:text-left">
            <h1
              id="hero-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              {content.welcome}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6">
              {content.introduction}
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              {[
                {
                  href: "https://github.com/Alekxays",
                  label: "Github",
                  icon: <GithubIcon className="w-5 md:w-6 h-5 md:h-6" />,
                },
                {
                  href: "https://www.linkedin.com/in/alexandre-boissel/",
                  label: "Linkedin",
                  icon: <LinkedinIcon className="w-5 md:w-6 h-5 md:h-6" />,
                },
                {
                  href: cvLink,
                  label: "CV",
                  icon: <CVIcon className="w-5 md:w-6 h-5 md:h-6" />,
                },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-black dark:text-white hover:underline text-sm md:text-base"
                  aria-label={link.label}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Scroll down arrow */}
        {!isScrolled && (
          <div className="fixed bottom-6 left-[44%] transform -translate-x-1/2 text-center animate-bounce">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <ArrowIcon className="w-5 md:w-6 h-5 md:h-6" />
              <span className="text-sm md:text-lg">Scroll Down</span>
              <ArrowIcon className="w-5 md:w-6 h-5 md:h-6" />
            </div>
          </div>
        )}

        {/* Projects Section */}
        <section id="projects" className="max-w-7xl mx-auto px-4 py-16">
          <ProjectsSection />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="max-w-7xl mx-auto px-4 py-8 md:py-16 pt-16 pb-24"
          aria-labelledby="contact-title"
        >
          <div className="border-b-2 mb-10 md:mb-14 border-black dark:border-white">
            <h2
              id="contact-title"
              className="text-2xl md:text-3xl font-bold mb-4 italic"
            >
              {content.contactTitle}
            </h2>
            <p className="text-black dark:text-white text-sm md:text-base mb-6 md:mb-8">
              {content.contactDescription}
            </p>
            <div className="flex flex-col md:flex-row items-center md:space-x-4 mb-8 justify-center space-y-4 md:space-y-0">
              <a
                href="mailto:hey@alexandreboissel.me"
                className="flex items-center space-x-2 text-black dark:text-white hover:underline text-sm md:text-base"
                aria-label="Email"
              >
                <MailIcon className="w-5 md:w-6 h-5 md:h-6" />
                <span>hey@alexandreboissel.me</span>
              </a>
              <a
                href="https://linkedin.com"
                className="flex items-center space-x-2 text-black dark:text-white hover:underline text-sm md:text-base"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 md:w-6 h-5 md:h-6" />
                <span>Linkedin</span>
              </a>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
    </>
  );
}
