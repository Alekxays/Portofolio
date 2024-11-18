"use client";

import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const AboutMe = () => {
  const { content } = useLanguage();

  return (
    <section
      id="about-me"
      className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-black dark:text-white"
      aria-labelledby="about-me-title"
    >
      <h2
        id="about-me-title"
        className="text-3xl md:text-4xl font-bold mb-12 text-left italic"
      >
        {content.aboutMeTitle}
      </h2>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Texte */}
        <article className="flex-1 text-center md:text-left space-y-6 md:space-y-8">
          <p className="text-lg md:text-xl leading-relaxed">
            {content.aboutMeParagraph1}
          </p>
          <p className="text-lg md:text-xl leading-relaxed">
            {content.aboutMeParagraph2}
          </p>
          <p className="text-lg md:text-xl leading-relaxed">
            {content.aboutMeParagraph3}
          </p>
          <p className="text-lg md:text-xl font-bold leading-relaxed">
            {content.aboutMeConclusion}
          </p>
        </article>
      </div>
    </section>
  );
};

export default AboutMe;
