// ProjectsSection.tsx
"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../libs/firebaseConfig";
import { useLanguage } from "../contexts/LanguageContext";
import DotIcon from "../../public/img/dot.svg";
import PauseIcon from "../../public/img/pause.svg";
import FinishIcon from "../../public/img/finish.svg";
import ProjectModal from "./projectModal";

export interface Project {
  id: string;
  title: string;
  desc_fr: string;
  desc_en: string;
  competence: string[];
  comp: string[];
  date: string;
  status: string;
  pitch_fr: string;
  pitch_en: string;
}

interface StatusColorMap {
  [key: string]: string;
}

function getStatusColor(status: string): string {
  const statusColorMap: StatusColorMap = {
    "On going": "bg-blue-500",
    Paused: "bg-yellow-500",
    Finished: "bg-green-500",
  };

  return statusColorMap[status] || "bg-gray-500";
}

const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const ProjectsSection = () => {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const fetchedProjects = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
      setProjects(fetchedProjects);
    };

    fetchProjects();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 pt-72 mb-60">
      <h2 className="text-3xl font-bold mb-8 italic">Projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#495057] p-5 rounded-lg shadow-lg min-h-[250px] lg:min-h-[300px] flex flex-col justify-between cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div>
              <div className="flex justify-between items-center mb-6 border-b-2 pb-5">
                <span
                  className={`flex items-center px-3 py-1 rounded-md space-x-2 ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status === "On going" && (
                    <DotIcon className="w-4 h-4 text-black dark:text-white" />
                  )}
                  {project.status === "Paused" && (
                    <PauseIcon className="w-4 h-4 text-black dark:text-white" />
                  )}
                  {project.status === "Finished" && (
                    <FinishIcon className="w-4 h-4 text-black dark:text-white" />
                  )}
                  <span className="text-sm">{project.status}</span>
                </span>
                <div className="flex flex-col text-right">
                  <span className="text-white text-lg font-semibold">
                    {project.title}
                  </span>
                  <span className="text-slate-400 text-sm">{project.date}</span>
                </div>
              </div>
              <p className="mb-4 text-gray-400 text-base">
                {truncateText(
                  language === "fr" ? project.desc_fr : project.desc_en,
                  100
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.competence.map((comp: string, idx: number) => (
                <p
                  key={idx}
                  className="text-slate-900 px-3 py-1 rounded text-sm bg-amber-300 dark:bg-amber-300 rounded-lg min-w-[60px] text-center"
                >
                  {comp}
                </p>
              ))}
            </div>
          </div>
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
