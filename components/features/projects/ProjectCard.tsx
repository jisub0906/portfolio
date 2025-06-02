// components/features/projects/ProjectCard.tsx - 프로젝트 목록용 카드 컴포넌트

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/common/Icon";
import { ProjectWithTechStacks } from "@/types/supabase_portfolio";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectWithTechStacks;
  className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("block h-full group", className)}
    >
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">
        {/* 이미지 영역 */}
        <div className="relative aspect-video w-full overflow-hidden">
          {project.thumbnail_url ? (
            <Image
              src={project.thumbnail_url}
              alt={project.name || "Project thumbnail"}
              fill={true}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-muted">
              <Icon name="Image" className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* 내용 영역 */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {/* 프로젝트 제목 */}
          <h3 className="text-lg font-semibold leading-snug tracking-tight line-clamp-2 group-hover:text-primary">
            {project.name}
          </h3>

          {/* 프로젝트 요약 */}
          <div className="mt-2 flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {project.summary || "프로젝트 요약이 없습니다."}
            </p>
          </div>

          {/* 기술 스택 태그 */}
          {project.tech_stacks && project.tech_stacks.length > 0 && (
            <div className="mt-4 pt-0">
              <div className="flex flex-wrap gap-1.5">
                {project.tech_stacks.slice(0, 3).map((techStack) => (
                  <Badge
                    key={techStack.id}
                    variant="secondary"
                    className="px-1.5 py-0.5 text-xs font-normal"
                  >
                    {techStack.name}
                  </Badge>
                ))}
                {project.tech_stacks.length > 3 && (
                  <Badge
                    variant="outline"
                    className="px-1.5 py-0.5 text-xs font-normal"
                  >
                    +{project.tech_stacks.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
} 