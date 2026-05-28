import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder } from 'lucide-react';

const Projects = () => {
  const projectsData = [
    {
      title: "Pebble",
      description: "Developed Pebble, a high-performance and scalable backend system designed for efficient data management, robust request handling, and optimized resource utilization.",
      techStack: ["Golang", "Distributed Systems", "Backend Architecture"], // Adjust based on your exact implementation
      github: "https://github.com/JaipreethTiruvaipati/Pebble",
      live: "#",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]", // Green glow
      accent: "text-[#39ff14]"
    },
    {
      title: "TCP-Cluster Server",
      description: "Engineered a highly concurrent TCP cluster server in Go, leveraging goroutines and channels for efficient connection handling, load distribution, and low-latency network communication.",
      techStack: ["Golang", "TCP/IP", "Concurrency", "Networking"],
      github: "https://github.com/sainathmanda7/cluster-tcp-server", // Update with exact repo name
      live: "#",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]", // Purple glow
      accent: "text-[#8b5cf6]"
    },
    {
      title: "AI-Mock Interview",
      description: "Built an AI-powered mock interview platform utilizing Large Language Models to simulate technical and behavioral interviews, providing users with real-time, actionable feedback.",
      techStack: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
      github: "https://github.com/Molankulasrija/AI-Mock-Interview", // Update with exact repo name
      live: "#",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.1)]", // Blue glow
      accent: "text-blue-400"
    }
  ];

  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <p className="text-[#39ff14] font-mono text-sm tracking-[0.2em] uppercase mb-4">
          02. Featured Work
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Things I've built.
        </h2>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className={`group relative flex flex-col p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 ${project.glowColor}`}
          >
            {/* Top Bar: Folder Icon + Links */}
            <div className="flex justify-between items-center mb-8">
              <Folder className={`w-10 h-10 ${project.accent} opacity-80`} strokeWidth={1.5} />
              <div className="flex gap-4">
                <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href={project.live} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#39ff14] transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-gray-200 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              {project.description}
            </p>

            {/* Tech Stack Tags */}
            <ul className="flex flex-wrap gap-3 mt-auto">
              {project.techStack.map((tech, i) => (
                <li key={i} className="text-xs font-mono text-gray-500 tracking-wide">
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;