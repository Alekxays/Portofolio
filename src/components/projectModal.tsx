// ProjectModal.tsx
"use client";

import { useEffect } from "react";
import { Project } from "./projectsSection";
import { useLanguage } from "../contexts/LanguageContext";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  language: string;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { content, language } = useLanguage();

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

  // Fonction de traduction pour le statut
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#495057] p-8 rounded-lg shadow-lg max-w-2xl w-full relative">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl font-bold"
        >
          &times;
        </button>

        {/* En-tête avec statut, titre, date et compétences */}
        <div className="flex justify-between items-center border-b-2 pb-4 mb-4">
          <span
            className={`flex items-center px-3 py-1 rounded-md text-white text-sm ${getStatusColor(
              project.status
            )}`}
          >
            {getStatusTranslation(project.status, language)}
          </span>

          <div className="text-right mr-4 flex flex-col items-end">
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <p className="text-slate-400">{project.date}</p>

            {/* Compétences */}
            <div className="flex flex-wrap gap-2 mt-2">
              {project.competence.map((skill, idx) => (
                <div
                  key={idx}
                  className="text-slate-900 px-2 py-1 rounded text-sm bg-amber-300 dark:bg-amber-300 min-w-[60px] text-center"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contenu du modal */}
        <p className="text-left text-xl font-bold mb-2 mt-4">Pitch</p>
        <div
          className="text-gray-300 mb-6"
          dangerouslySetInnerHTML={{
            __html: language === "fr" ? project.pitch_fr : project.pitch_en,
          }}
        ></div>

        {/* Affichage de l'image ou texte de non-disponibilité */}
        <p className="text-left text-xl font-bold mb-2 mt-4">Image</p>
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} image`}
            className="rounded-lg max-w-full h-auto mb-6"
          />
        ) : (
          <p className="text-gray-400 mb-6">Pas disponible pour le moment</p>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
