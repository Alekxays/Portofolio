"use client";

import { useEffect, useRef } from "react";
import { Project, ProjectLink } from "./projectsSection";
import { useLanguage } from "../contexts/LanguageContext";
import GithubIcon from "/public/img/github.svg";
import FigmaIcon from "/public/img/figma.svg";
import WebsiteIcon from "/public/img/website.svg";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  language: string;
}

const ProjectModal = ({ project, onClose, language }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { language: contextLanguage } = useLanguage();

  // Bloquer le scroll du body quand la modale est ouverte
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Gestion du focus pour l'accessibilité
    modalRef.current?.focus();

    // Gestion de la touche Escape pour fermer la modale
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const statusColorMap = {
    "On going": "bg-primary",
    Paused: "bg-warning",
    Finished: "bg-success",
  };

  const getStatusColor = (status: keyof typeof statusColorMap): string => {
    return statusColorMap[status] || "bg-muted";
  };

  const statusTranslations = {
    en: {
      "On going": "On going",
      Paused: "Paused",
      Finished: "Finished",
    },
    fr: {
      "On going": "En cours",
      Paused: "En pause",
      Finished: "Terminé",
    },
  };

  const getStatusTranslation = (
    status: "On going" | "Paused" | "Finished",
    language: keyof typeof statusTranslations
  ) => {
    return statusTranslations[language]?.[status] || status;
  };

  type LinkType = "github" | "figma" | "website";

  const linkTypes: Record<LinkType, { icon: React.JSX.Element; label: string }> = {
    github: {
      icon: <GithubIcon className="w-5 h-5" />,
      label: "GitHub",
    },
    figma: {
      icon: <FigmaIcon className="w-5 h-5" />,
      label: "Figma",
    },
    website: {
      icon: <WebsiteIcon className="w-5 h-5" />,
      label: "Website",
    },
  };

  const renderLink = (link: ProjectLink) => {
    const { icon, label } = linkTypes[link.type as LinkType] || {
      icon: null,
      label: link.type,
    };

    return (
      <a
        key={link.type}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex items-center gap-2 px-3 py-1.5 
          bg-primary/20 hover:bg-primary/30
          rounded-md transition-colors duration-fast
          focus-visible-ring
        "
        aria-label={`${label} link for ${project.title}`}
      >
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </a>
    );
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="
        fixed inset-0 bg-black/70 
        flex justify-center items-center z-50 
        px-4 py-8 md:px-0 overflow-y-auto
        backdrop-blur-sm animate-fade-in
      "
      onClick={handleBackgroundClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="
          bg-card p-6 md:p-8 rounded-lg 
          shadow-lg w-full max-w-lg md:max-w-2xl 
          max-h-[85vh] overflow-y-auto relative
          border border-card-border animate-slide-up
        "
        tabIndex={-1}
      >
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 p-2
            text-foreground hover:text-error
            rounded-full bg-card-hover/50
            hover:bg-card-hover
            transition-colors duration-fast
            focus-visible-ring
          "
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-card-border pb-4 mb-6 gap-4">
          <span
            className={`
              flex items-center px-3 py-1 rounded-md 
              text-sm font-medium ${getStatusColor(project.status)}
            `}
          >
            {getStatusTranslation(project.status, language as "fr" | "en")}
          </span>

          <div className="text-left md:text-right md:ml-4 flex flex-col items-start md:items-end w-full">
            <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-foreground">
              {project.title}
            </h2>
            <p className="text-muted text-sm md:text-base">
              {project.date}
            </p>

            <div className="flex flex-col items-end mt-2">
              <div className="flex flex-wrap gap-2 justify-end">
                {project.competence.map((comp, idx) => (
                  <span
                    key={idx}
                    className="
                      text-foreground px-3 py-1 rounded text-xs
                      bg-accent/10 border border-accent/20
                      min-w-[60px] text-center font-medium
                    "
                    aria-label={`Compétence : ${comp}`}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.links?.map((link) => renderLink(link))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-lg md:text-xl font-bold mb-3 text-foreground">
              Pitch
            </h3>
            <div
              className="text-foreground/90 text-sm md:text-base prose prose-sm prose-headings:text-foreground prose-a:text-primary"
              dangerouslySetInnerHTML={{
                __html: language === "fr" ? project.pitch_fr : project.pitch_en,
              }}
            ></div>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-bold mb-3 text-foreground">
              Images
            </h3>
            {project.image && project.image.length > 0 ? (
              <div className="space-y-4">
                {project.image.map((image: string, index: number) => (
                  <figure key={index} className="relative">
                    <img
                      src={`https://i.imgur.com/${image}.png`}
                      alt={`${project.title} image ${index + 1}`}
                      className="
                        rounded-md w-full h-auto 
                        border border-card-border
                        shadow-sm
                      "
                      loading="lazy"
                    />
                    <figcaption className="text-muted text-xs text-center mt-1">
                      {project.title} - Image {index + 1}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <p className="text-muted text-sm md:text-base italic">
                Pas d'images disponibles pour le moment
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
