"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../libs/firebaseConfig";
import { useLanguage } from "../contexts/LanguageContext";
import DotIcon from "/public/img/dot.svg";
import PauseIcon from "/public/img/pause.svg";
import FinishIcon from "/public/img/finish.svg";
import GithubIcon from "/public/img/github.svg";
import FigmaIcon from "/public/img/figma.svg";
import WebsiteIcon from "/public/img/website.svg";
import ProjectModal from "./projectModal";

export type ProjectStatus = "On going" | "Paused" | "Finished";

export interface ProjectLink {
  type: string;
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
  links?: ProjectLink[];
}

const getStatusColor = (status: ProjectStatus): string => {
  const statusColorMap: Record<ProjectStatus, string> = {
    "On going": "bg-primary",
    Paused: "bg-warning",
    Finished: "bg-success",
  };
  return statusColorMap[status] || "bg-muted";
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

// Configuration des types de liens avec leurs icônes
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

// Type pour les clés de linkTypes
type LinkType = keyof typeof linkTypes;

const renderLink = (link: ProjectLink, title: string) => {
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
        flex items-center gap-1.5
        hover:text-primary transition-colors duration-fast
        focus-visible-ring rounded p-1
      "
      aria-label={`${label} link for ${title}`}
      onClick={(e) => e.stopPropagation()}
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
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
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="container px-4 py-16 md:py-24 animate-slide-in"
      aria-labelledby="projects-title"
    >
      <h2
        id="projects-title"
        className="text-3xl font-bold mb-8 italic"
      >
        {language === "fr" ? "Projets" : "Projects"}
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-ping-slow w-16 h-16 rounded-full bg-primary/30"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="
                group relative bg-card border border-card-border
                p-5 rounded-lg shadow-sm min-h-[250px] lg:min-h-[300px]
                flex flex-col justify-between 
                transition-all duration-normal
                hover:shadow-md hover:border-primary/30
                hover:translate-y-[-4px]
                focus-within:ring-2 focus-within:ring-primary/50
                cursor-pointer
              "
              onClick={() => setSelectedProject(project)}
              tabIndex={0}
              aria-labelledby={`project-${project.id}-title`}
              role="button"
            >
              <header className="flex justify-between items-center mb-6 border-b border-card-border pb-4">
                <span
                  className={`
                    flex items-center px-3 py-1 rounded-md gap-2
                    text-sm font-medium ${getStatusColor(project.status)}
                  `}
                  aria-label={getStatusTranslation(project.status, language)}
                >
                  {project.status === "On going" && (
                    <DotIcon className="w-4 h-4 animate-pulse" />
                  )}
                  {project.status === "Paused" && (
                    <PauseIcon className="w-4 h-4" />
                  )}
                  {project.status === "Finished" && (
                    <FinishIcon className="w-4 h-4" />
                  )}
                  <span>
                    {getStatusTranslation(project.status, language)}
                  </span>
                </span>
                <div className="text-right">
                  <h3
                    id={`project-${project.id}-title`}
                    className="text-foreground text-lg font-semibold group-hover:text-primary transition-colors duration-normal"
                  >
                    {project.title}
                  </h3>
                  <time
                    className="text-muted text-sm"
                    dateTime={project.date}
                  >
                    {project.date}
                  </time>
                </div>
              </header>

              <p className="mb-6 text-foreground text-base">
                {truncateText(
                  language === "fr" ? project.desc_fr : project.desc_en,
                  100
                )}
              </p>

              <div className="flex flex-wrap gap-2 mb-12">
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

              <div className="absolute bottom-4 left-4 flex gap-4">
                {project.links?.map((link) => renderLink(link, project.title))}
              </div>
            </article>
          ))}
        </div>
      )}

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
