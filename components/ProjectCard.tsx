'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail_url: string;
  tech_stack: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`} className="block group focus:outline-none">
      <motion.div
        whileHover={{ y: -4, boxShadow: "0px 6px 18px -6px rgba(30,41,59,0.10)" }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
      >
        <Card className="transition-shadow hover:shadow-md border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-t-xl">
            <Image
              src={project.thumbnail_url}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </AspectRatio>
          <CardContent className="pt-4 pb-2">
            <CardTitle className="text-lg font-semibold mb-1 truncate text-slate-900 dark:text-slate-100">
              {project.title}
            </CardTitle>
            <p className="text-muted-foreground text-sm line-clamp-2 min-h-[2.5em]">
              {project.summary}
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2 pt-2 pb-4">
            {project.tech_stack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                {tech}
              </Badge>
            ))}
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};

export default ProjectCard; 