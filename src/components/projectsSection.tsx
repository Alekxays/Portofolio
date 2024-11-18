"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../libs/firebaseConfig";
import { useLanguage } from "../contexts/LanguageContext";
import DotIcon from "../../public/img/dot.svg";
import PauseIcon from "../../public/img/pause.svg";
import FinishIcon from "../../public/img/finish.svg";
import GithubIcon from "../../public/img/github.svg";
import FigmaIcon from "../../public/img/figma.svg";
import WebsiteIcon from "../../public/img/website.svg";
import ProjectModal from "./projectModal";

export type ProjectStatus = "On going" | "Paused" | "Finished";

export interface ProjectLink {
  type: string; // Le type doit correspondre aux clés utilisées dans Firestore
  url: string;
}

export interface Project {
  id: string;
  title: string;
  desc_fr: string;
  desc_en: string;
  competence: string[];
  date: string;
  status: ProjectStatus;
  pitch_fr: string;
  pitch_en: string;
  image?: string[];
  links?: ProjectLink[]; // Les liens seront directement mappés depuis Firebase
}

const getStatusColor = (status: ProjectStatus): string => {
  const statusColorMap: Record<ProjectStatus, string> = {
    "On going": "bg-blue-500",
    Paused: "bg-yellow-500",
    Finished: "bg-green-500",
  };
  return statusColorMap[status] || "bg-gray-500";
};

const getStatusTranslation = (
  status: ProjectStatus,
  language: string
): string => {
  const statusTranslations: Record<string, Record<ProjectStatus, string>> = {
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

const truncateText = (text: string, maxLength: number): string =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

const renderLink = (link: ProjectLink, title: string) => {
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
    label: link.type, // Si le type est inconnu, affichez simplement le type
  };

  return (
    <a
      key={link.type}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-1 text-white hover:text-blue-400 transition duration-200"
      aria-label={`${label} link for ${title}`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </a>
  );
};

const ProjectsSection = () => {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const fetchedProjects = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          links: data.links
            ? Object.keys(data.links).map((key) => ({
                type: key,
                url: data.links[key],
              }))
            : [],
        } as Project;
      });
      setProjects(fetchedProjects);
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-4 py-16"
      aria-labelledby="projects-title"
    >
      <h2
        id="projects-title"
        className="text-3xl font-bold mb-8 italic text-black dark:text-white"
      >
        {language === "fr" ? "Projets" : "Projects"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <article
            key={project.id}
            className="relative bg-gradient-to-b from-slate-800 to-slate-700 p-5 rounded-lg shadow-lg min-h-[250px] lg:min-h-[300px] flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => setSelectedProject(project)}
            aria-labelledby={`project-${project.id}-title`}
          >
            <header className="flex justify-between items-center mb-6 border-b-2 pb-5">
              <span
                className={`flex items-center px-3 py-1 rounded-md space-x-2 ${getStatusColor(
                  project.status
                )}`}
                aria-label={getStatusTranslation(project.status, language)}
              >
                {project.status === "On going" && (
                  <DotIcon className="w-4 h-4" />
                )}
                {project.status === "Paused" && (
                  <PauseIcon className="w-4 h-4" />
                )}
                {project.status === "Finished" && (
                  <FinishIcon className="w-4 h-4" />
                )}
                <span className="text-sm">
                  {getStatusTranslation(project.status, language)}
                </span>
              </span>
              <div className="text-right">
                <h3
                  id={`project-${project.id}-title`}
                  className="text-white text-lg font-semibold"
                >
                  {project.title}
                </h3>
                <time
                  className="text-slate-400 text-sm"
                  dateTime={project.date}
                >
                  {project.date}
                </time>
              </div>
            </header>
            <p className="mb-4 text-slate-100 dark:text-gray-400 text-base">
              {truncateText(
                language === "fr" ? project.desc_fr : project.desc_en,
                100
              )}
            </p>
            <div className="flex flex-wrap gap-2 mb-12">
              {project.competence.map((comp, idx) => (
                <span
                  key={idx}
                  className="text-slate-900 px-3 py-1 rounded text-sm bg-amber-300 dark:bg-amber-300 min-w-[60px] text-center"
                  aria-label={`Compétence : ${comp}`}
                >
                  {comp}
                </span>
              ))}
            </div>
            <div className="absolute bottom-4 left-4 flex gap-4">
              {project.links?.map((link) => renderLink(link, project.title))}
            </div>
          </article>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          language={language}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
