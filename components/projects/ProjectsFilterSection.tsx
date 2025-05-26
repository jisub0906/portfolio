'use client'

import React, { useState, useMemo } from "react";
import ProjectList from "@/components/ProjectList";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail_url: string;
  tech_stack: string[];
}

interface ProjectsFilterSectionProps {
  projects: Project[];
  techStackNames: string[];
}

const ProjectsFilterSection: React.FC<ProjectsFilterSectionProps> = ({ projects, techStackNames }) => {
  const [search, setSearch] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  // 필터링 로직
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTitle = project.title.toLowerCase().includes(search.toLowerCase());
      const matchesTech =
        selectedTechs.length === 0 || selectedTechs.every((tech) => project.tech_stack.includes(tech));
      return matchesTitle && matchesTech;
    });
  }, [projects, search, selectedTechs]);

  // 멀티셀렉트 토글
  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 mt-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-4">
        <Input
          type="text"
          placeholder="프로젝트 제목 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-64 w-full"
        />
        <div className="relative md:w-80 w-full">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full min-w-[180px] border rounded px-3 py-2 text-left bg-background hover:bg-accent transition-colors"
              >
                {selectedTechs.length > 0 ? (
                  <span className="flex flex-wrap gap-1">
                    {selectedTechs.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded px-2 py-0.5 text-xs font-medium"
                      >
                        {tech}
                        <span
                          role="button"
                          tabIndex={0}
                          className="ml-1 hover:text-red-500 cursor-pointer"
                          onClick={e => { e.stopPropagation(); toggleTech(tech); }}
                          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); toggleTech(tech); } }}
                          aria-label={`${tech} 제거`}
                        >
                          <X className="w-3 h-3" />
                        </span>
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="text-muted-foreground">기술스택으로 필터</span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {techStackNames.map((tech) => (
                  <label key={tech} className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-accent">
                    <Checkbox
                      checked={selectedTechs.includes(tech)}
                      onCheckedChange={() => toggleTech(tech)}
                    />
                    <span>{tech}</span>
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <ProjectList projects={filteredProjects} />
    </div>
  );
};

export default ProjectsFilterSection; 