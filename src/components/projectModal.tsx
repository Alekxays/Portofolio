"use client";

import { useEffect } from "react";
import { Project, ProjectLink } from "./projectsSection";
import { useLanguage } from "../contexts/LanguageContext";
import GithubIcon from "../../public/img/github.svg";
import FigmaIcon from "../../public/img/figma.svg";
import WebsiteIcon from "../../public/img/website.svg";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { language } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const getStatusColor = (status: keyof typeof statusColorMap): string => {
    const statusColorMap = {
      "On going": "bg-blue-500",
      Paused: "bg-yellow-500",
      Finished: "bg-green-500",
    };
    return statusColorMap[status] || "bg-gray-500";
  };

  const getStatusTranslation = (
    status: "On going" | "Paused" | "Finished",
    language: keyof typeof statusTranslations
  ) => {
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
    return statusTranslations[language]?.[status] || status;
  };

  const renderLink = (link: ProjectLink) => {
    const linkTypes = {
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

    const { icon, label } = linkTypes[link.type] || {
      icon: null,
      label: link.type,
    };

    return (
      <a
        key={link.type}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-white hover:text-blue-400 transition duration-200"
        aria-label={`${label} link for ${project.title}`}
      >
        {icon}
        <span>{label}</span>
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
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4 md:px-0 overflow-y-auto"
      onClick={handleBackgroundClick}
    >
      <div className="bg-gradient-to-b from-slate-700 to-slate-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* En-tête avec statut, titre, date et compétences */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 pb-4 mb-4">
          <span
            className={`flex items-center px-3 py-1 rounded-md text-white text-sm ${getStatusColor(
              project.status
            )} mb-4 md:mb-0`}
          >
            {getStatusTranslation(project.status, language)}
          </span>

          <div className="text-left md:text-right md:ml-4 flex flex-col items-start md:items-end">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {project.title}
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              {project.date}
            </p>

            {/* Compétences */}
            <div className="flex flex-wrap gap-2 mt-2">
              {project.competence.map((skill, idx) => (
                <div
                  key={idx}
                  className="text-slate-900 px-2 py-1 rounded text-xs md:text-sm bg-amber-300 dark:bg-amber-300 min-w-[60px] text-center"
                >
                  {skill}
                </div>
              ))}
            </div>

            {/* Liens */}
            <div className="flex flex-wrap gap-4 mt-4">
              {project.links?.map((link) => renderLink(link))}
            </div>
          </div>
        </div>

        {/* Contenu du modal */}
        <p className="text-left text-lg md:text-xl font-bold mb-2 mt-4">
          Pitch
        </p>
        <div
          className="text-gray-300 mb-6 text-sm md:text-base"
          dangerouslySetInnerHTML={{
            __html: language === "fr" ? project.pitch_fr : project.pitch_en,
          }}
        ></div>

        {/* Affichage des images ou texte de non-disponibilité */}
        <p className="text-left text-lg md:text-xl font-bold mb-2 mt-4">
          Images
        </p>
        {project.image && project.image.length > 0 ? (
          <div className="mb-6">
            {project.image.map((image: string, index: number) => (
              <img
                key={index}
                src={`https://i.imgur.com/${image}.png`}
                alt={`${project.title} image ${index + 1}`}
                className="rounded-lg w-full h-auto"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 mb-6 text-sm md:text-base">
            Pas disponible pour le moment
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
