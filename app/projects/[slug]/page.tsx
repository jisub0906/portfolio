import { notFound } from "next/navigation";
import { createClient } from "@/lib/server";
import ProjectDetailView, { ProjectDetail } from "@/components/projects/ProjectDetailView";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ProjectPageProps {
  params: { slug: string };
}

export const revalidate = 60; // ISR: 1분마다 갱신

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  // (선택) SEO 개선을 위한 메타데이터 동적 생성
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("title, description")
    .eq("slug", params.slug)
    .single();
  if (!project) return {};
  return {
    title: project.title,
    description: project.description?.slice(0, 100),
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const supabase = await createClient();
  // 프로젝트 + 사용 기술 이름 배열(조인)
  const { data: project, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      description,
      my_role,
      start_date,
      end_date,
      image_urls,
      video_url,
      live_demo_url,
      github_repo_url,
      project_tech_links(tech_stack(name))
    `)
    .eq("slug", params.slug)
    .single();

  if (!project || error) {
    notFound();
  }

  // tech_names 배열 생성
  const tech_names = (project.project_tech_links || [])
    .map((link: any) => link.tech_stack?.name)
    .filter(Boolean);

  const projectDetail: ProjectDetail = {
    ...project,
    tech_names,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <Button asChild variant="link" className="mb-8">
        <Link href="/projects" className="flex items-center gap-2">
          <ArrowLeft size={18} />
          <span>프로젝트 목록으로 돌아가기</span>
        </Link>
      </Button>
      <ProjectDetailView project={projectDetail} />
    </div>
  );
} 