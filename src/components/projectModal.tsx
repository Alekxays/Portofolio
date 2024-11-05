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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#495057] p-8 rounded-lg shadow-lg max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">{project.title}</h2>
        <p className="text-slate-400 mb-4">{project.date}</p>

        <div
          className="text-gray-300 mb-6"
          dangerouslySetInnerHTML={{
            __html: language === "fr" ? project.pitch_fr : project.pitch_en,
          }}
        ></div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.competence.map((comp, idx) => (
            <p
              key={idx}
              className="text-slate-900 px-3 py-1 rounded text-sm bg-amber-300 dark:bg-amber-300 rounded-lg min-w-[60px] text-center"
            >
              {comp}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
