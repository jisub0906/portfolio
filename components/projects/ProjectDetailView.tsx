import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  my_role: string;
  start_date: string; // ISO string or 'YYYY-MM' format
  end_date: string;   // ISO string or 'YYYY-MM' format
  image_urls?: string[];
  video_url?: string;
  live_demo_url?: string;
  github_repo_url?: string;
  tech_names: string[];
}

interface ProjectDetailViewProps {
  project: ProjectDetail;
}

const formatPeriod = (start: string, end: string) => {
  // Expecting 'YYYY-MM' or ISO, returns 'YYYY.MM' or '진행중'
  const format = (date: string) => date ? date.slice(0, 7).replace("-", ".") : "";
  return `기간: ${format(start)} - ${end ? format(end) : "진행중"}`;
};

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project }) => {
  return (
    <div className="px-4">
      {/* 1. Title */}
      <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
      {/* 2. Role and Period */}
      <p className="text-lg text-muted-foreground mb-1">{project.my_role}</p>
      <p className="text-sm text-muted-foreground mb-4">{formatPeriod(project.start_date, project.end_date)}</p>
      {/* 3. Description (Markdown) */}
      <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none mb-6">
        <ReactMarkdown>{project.description}</ReactMarkdown>
      </div>
      {/* 4. Images (Carousel or List) */}
      {project.image_urls && project.image_urls.length > 0 && (
        <div className="mb-6">
          <Carousel>
            <CarouselContent>
              {project.image_urls.map((url, idx) => (
                <CarouselItem key={idx} className="flex justify-center">
                  <AspectRatio ratio={16 / 9} className="w-full max-w-xl">
                    <Image
                      src={url}
                      alt={`Project image ${idx + 1}`}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 700px"
                      priority={idx === 0}
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
      {/* 5. Video */}
      {project.video_url && (
        <div className="mb-6">
          <div className="aspect-video w-full max-w-xl mx-auto rounded-lg overflow-hidden">
            <iframe
              src={project.video_url}
              title="Project Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
      {/* 6. Tech Stack */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">사용 기술</h3>
        <div className="flex flex-wrap gap-2">
          {project.tech_names.map((tech) => (
            <Badge key={tech} variant="outline">{tech}</Badge>
          ))}
        </div>
      </div>
      {/* 7. Links */}
      <div className="flex gap-4 mt-4">
        {project.live_demo_url && (
          <Button asChild variant="default">
            <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              Live Demo <ExternalLink size={16} />
            </a>
          </Button>
        )}
        {project.github_repo_url && (
          <Button asChild variant="secondary">
            <a href={project.github_repo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              GitHub <ExternalLink size={16} />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailView; 