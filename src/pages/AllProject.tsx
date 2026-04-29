import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Magnetic } from "../components/portfolio/Magnetic";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ExternalLink } from "lucide-react";

const IK_URL = import.meta.env.VITE_IK_URL_ENDPOINT ?? "";

/** Builds an ImageKit URL with properly encoded path segments */
const ikUrl = (path: string) =>
  `${IK_URL}/${path.split("/").map(encodeURIComponent).join("/")}`;

// Independent project list for this page only
const ALL_WORKS = [
  {
    id: "apuni-sarkar",
    title: "Apuni Sarkar",
    description: "AI-powered platform simplifying access to Uttarakhand government schemes.",
    tech: ["React 19", "Gemini API", "Tailwind CSS"],
    badge: "🥇 HACKATHON WINNER",
    image: "Project_img/Apuni_Sarkar.png",
    github: "https://github.com/Aman-Bam/Apuni_Sarkar",
    live: "https://apuni-sarkar-citizen-services-done.vercel.app/",
  },
  {
    id: "Employee Management System (RBAC Dashboard)",
    title: "Employee Management System (RBAC Dashboard)",
    description: "Advanced role-based dashboard for seamless employee management with precise access control.",
    tech: ["TypeScript", "Next.js 14", "Tailwind CSS", "Shadcn UI"],
    image: "Project_img/EmploymentManagementSystem.png",
    github: "https://github.com/Aman-Bam/Employee-Management-System",
    live: "https://employe-mangement-using-rbac-dashboard.vercel.app/",
  },
  {
    id: "banking-backend",
    title: "Banking System Backend",
    description: "Pure backend REST API for account management and transactions.",
    tech: ["Node.js", "Express.js", "MongoDB"],
    type: "Backend API",
    image: "Project_img/bankingsystem.png",
    github: "https://github.com/Aman-Bam/Banking-System",
    live: "",
  },
  {
    id: "lead-extension",
    title: "Lead Extension",
    description: "Browser-based lead capture tool for extracting prospect data.",
    tech: ["Chrome Extension APIs", "JavaScript"],
    type: "Chrome Extension",
    image: "Project_img/Lead_Extension.png",
    github: "https://github.com/Aman-Bam/lead-Extension",
    live: "",
  },
  {
    id: "dentocare",
    title: "Dentocare",
    description: "Professional dental clinic management system focusing on appointment scheduling and patient record tracking.",
    tech: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    image: "Project_img/Dentocare.png",
    github: "https://github.com/Aman-Bam/Dentocare1",
    live: "",
  },
];

const AllProject = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 mt-20">
          <p className="text-mint font-mono text-xs tracking-widest uppercase mb-4">Archive</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            ALL <span className="text-green-800">WORKS</span>.
          </h1>
          <p className="text-slate-400 mt-4 text-lg">
            {ALL_WORKS.length} total projects in the archive.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_WORKS.map((project, index) => (
            <Magnetic key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group relative bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden cursor-pointer"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-5xl font-black text-white/5 group-hover:text-mint/20 transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="aspect-video overflow-hidden">
                  <img
                    src={ikUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <div className="p-6">
                  {project.badge && (
                    <span className="text-[10px] font-mono px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-500 inline-block mb-3">
                      {project.badge}
                    </span>
                  )}
                  {project.status && (
                    <span className="text-[10px] font-mono px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-amber-500 inline-block mb-3">
                      {project.status}
                    </span>
                  )}
                  {project.type && !project.badge && !project.status && (
                    <span className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-zinc-500 inline-block mb-3">
                      {project.type}
                    </span>
                  )}

                  <h3 className="text-xl font-bold mb-2 group-hover:text-mint transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-zinc-400 hover:border-mint/50 hover:text-mint transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GitHubLogoIcon width={14} height={14} />
                        Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink width={14} height={14} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </Magnetic>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProject;
