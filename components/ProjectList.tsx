'use client'

import React from "react";
import { motion, Variants } from "framer-motion";
import ProjectCard, { Project } from "@/components/ProjectCard";

interface ProjectListProps {
  projects: Project[];
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        표시할 프로젝트가 없습니다.
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={itemVariants} className="h-full">
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectList; 