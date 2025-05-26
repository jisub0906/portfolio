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
        whileHover={{ y: -5, boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="transition-shadow hover:shadow-lg focus:ring-2 focus:ring-blue-500">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={project.thumbnail_url}
              alt={project.title}
              fill
              className="object-cover rounded-t-md group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </AspectRatio>
          <CardContent className="pt-4 pb-2">
            <CardTitle className="text-xl font-semibold mb-1 truncate">
              {project.title}
            </CardTitle>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {project.summary}
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2 pt-2 pb-4">
            {project.tech_stack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
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