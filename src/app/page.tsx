"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";

import GithubIcon from "../../public/img/github.svg";
import LinkedinIcon from "../../public/img/linkedin.svg";
import CVIcon from "../../public/img/cv.svg";
import MailIcon from "../../public/img/mail.svg";
import ArrowIcon from "../../public/img/arrow.svg";

const ProjectsSection = dynamic(() => import("@/components/projectsSection"));
const ContactForm = dynamic(() => import("@/components/contactForm"));
const AboutMe = dynamic(() => import("@/components/aboutMe"));

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
    <React.Fragment>
      <main
        className="min-h-screen bg-[#e9ecef] dark:bg-[#212529] text-black dark:text-white"
        role="main"
      >
        {/* Hero Section */}
        <section
          id="home"
          className="max-w-7xl mx-auto px-4 py-32 md:py-48 flex flex-col md:flex-row items-center min-h-screen space-y-8 md:space-y-0"
          aria-labelledby="hero-title"
        >
          <div className="w-32 md:w-1/2 lg:w-1/3 flex justify-center md:justify-start">
            <Image
              src="/img/home_emoji.png"
              alt="Portrait of Alexandre Boissel"
              width={200}
              height={200}
              priority
            />
          </div>
          <div className="text-center md:text-left space-y-4">
            <h1
              id="hero-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              {content.welcome}
            </h1>
            <p className="text-base md:text-lg lg:text-xl">
              {content.introduction}
            </p>
            <div className="flex justify-center md:justify-start space-x-3 mt-4">
              {[
                {
                  href: "https://github.com/Alekxays",
                  label: "Github",
                  icon: <GithubIcon className="w-5 md:w-6 h-5 md:h-6" />,
                },
                {
                  href: "https://www.linkedin.com/in/alexandreboissel/",
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
                  className="flex items-center space-x-2 text-blue-500 dark:text-blue-400 hover:underline text-sm md:text-base"
                  aria-label={`Visit ${link.label}`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Flèche de défilement vers le bas */}
        {!isScrolled && (
          <div className="fixed bottom-6 transform -translate-x-1/2 text-center animate-bounce w-full">
            <div className="flex flex-col items-center space-y-2 text-gray-700 dark:text-gray-300">
              <span className="text-xs sm:text-sm md:text-lg">Scroll Down</span>
              <ArrowIcon
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300"
                aria-label="Scroll to next section"
              />
            </div>
          </div>
        )}

        {/* About Me Section */}
        <section
          id="about-me"
          className="max-w-7xl mx-auto px-4 py-32 md:py-48 min-h-screen"
          aria-labelledby="about-me-title"
        >
          <AboutMe />
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="max-w-7xl mx-auto px-4 py-32 md:py-48 min-h-screen"
          aria-labelledby="projects-title"
        >
          <ProjectsSection />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="max-w-7xl mx-auto px-4 py-32 md:py-48 min-h-screen"
          aria-labelledby="contact-title"
        >
          <h2
            id="contact-title"
            className="text-2xl md:text-3xl font-bold mb-6 text-left italic"
          >
            {content.contactTitle}
          </h2>
          <p className="text-black dark:text-white text-sm md:text-base mb-6 text-center">
            {content.contactDescription}
          </p>
          <div className="flex flex-col md:flex-row items-center md:space-x-4 mb-4 md:mb-6 space-y-4 md:space-y-0 justify-center">
            <a
              href="mailto:hey@alexandreboissel.me"
              className="flex items-center space-x-2 text-blue-500 dark:text-blue-400 hover:underline text-sm md:text-base"
              aria-label="Email Alexandre Boissel"
            >
              <MailIcon className="w-5 md:w-6 h-5 md:h-6" />
              <span>hey@alexandreboissel.me</span>
            </a>
            <a
              href="https://www.linkedin.com/in/alexandreboissel/"
              target="_blank"
              className="flex items-center space-x-2 text-blue-500 dark:text-blue-400 hover:underline text-sm md:text-base"
              aria-label="Visit Alexandre's LinkedIn"
            >
              <LinkedinIcon className="w-5 md:w-6 h-5 md:h-6" />
              <span>Linkedin</span>
            </a>
          </div>
          <ContactForm />
        </section>
      </main>
    </React.Fragment>
  );
}
