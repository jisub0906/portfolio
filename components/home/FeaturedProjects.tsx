import SectionTitle from "@/components/ui/SectionTitle";
import ProjectList from "@/components/ProjectList";
import AnimatedSection from "./AnimatedSection";

interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail_url: string;
  tech_stack: string[];
}

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <AnimatedSection className="w-full max-w-6xl mx-auto px-4 py-20">
      <SectionTitle
        title="주요 프로젝트"
        subtitle="제가 참여하고 개발한 대표적인 프로젝트들입니다."
      />
      <div className="mt-10">
        <ProjectList projects={projects} />
      </div>
    </AnimatedSection>
  );
} 