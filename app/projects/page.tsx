// app/projects/page.tsx - 프로젝트 목록 페이지

import { Metadata } from "next";
import ProjectList from "@/components/features/projects/ProjectList";
import PageTitle from "@/components/common/PageTitle";
import { createClient } from "@/lib/supabase/server";
import { ProjectWithTechStacks, TechStack } from "@/types/supabase_portfolio";

export const metadata: Metadata = {
  title: "프로젝트 | 지섭의 포트폴리오",
  description: "개발자 지섭이 참여하고 만들어온 다양한 웹 및 애플리케이션 프로젝트들을 살펴보세요. 각 프로젝트의 상세 정보와 사용 기술을 확인할 수 있습니다.",
};

export default async function ProjectsPage() {
  let projects: ProjectWithTechStacks[] = [];

  try {
    const supabase = await createClient();
    
    // 게시된 프로젝트와 관련 기술 스택 정보를 함께 조회
    const { data, error } = await supabase
      .schema("portfolio")
      .from("projects")
      .select(`
        id,
        name,
        slug,
        summary,
        description_markdown,
        role_description_markdown,
        tech_stack_description_markdown,
        results_retrospective_markdown,
        main_image_url,
        thumbnail_url,
        screenshots_urls,
        live_demo_url,
        github_repo_url,
        start_date,
        end_date,
        is_featured,
        is_published,
        published_at,
        created_at,
        updated_at,
        project_tech_stacks (
          tech_stacks (
            id,
            name,
            category_id,
            icon_svg_content,
            icon_url,
            proficiency_level,
            summary,
            created_at,
            updated_at
          )
        )
      `)
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("프로젝트 데이터 조회 중 오류 발생:", error);
    } else if (data) {
      // 데이터 구조를 ProjectWithTechStacks 형태로 변환
      projects = data.map((project) => ({
        ...project,
        tech_stacks: project.project_tech_stacks?.map((pts: { tech_stacks: TechStack }) => pts.tech_stacks) || [],
      }));
    }
  } catch (error) {
    console.error("프로젝트 데이터 페칭 중 예상치 못한 오류:", error);
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8 sm:px-6 md:gap-12 md:py-12 lg:px-8 lg:py-16">
      <PageTitle 
        title="프로젝트" 
        subtitle="제가 경험하고 만들어온 다양한 작업들을 소개합니다." 
      />
      <ProjectList initialProjects={projects} />
    </div>
  );
} 