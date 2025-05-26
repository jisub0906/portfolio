import SectionTitle from "@/components/ui/SectionTitle";
import ProjectList from "@/components/ProjectList";
import { createClient } from "@/lib/server";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Project type for type safety
interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail_url: string;
  tech_stack: string[];
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

const getProjects = async (): Promise<Project[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      slug,
      summary,
      thumbnail_url,
      display_order,
      project_tech_links(
        tech_stack(name)
      )
    `)
    .order("display_order", { ascending: true });
  if (error) {
    // Optionally log error
    return [];
  }
  // tech_stack: string[]로 변환
  return (data ?? []).map((project: any) => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    summary: project.summary,
    thumbnail_url: project.thumbnail_url,
    tech_stack: Array.isArray(project.project_tech_links)
      ? project.project_tech_links
          .map((link: any) => link.tech_stack?.name)
          .filter((name: string | undefined) => !!name)
      : [],
  }));
};

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    projects = await getProjects();
  } catch (e) {
    // Optionally log error
    projects = [];
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
      <SectionTitle title="모든 프로젝트" />
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 mb-8 gap-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2 sm:mb-0">
          기술 스택 필터
        </label>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            {/* 실제 옵션은 추후 동적으로 생성 */}
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="nextjs">Next.js</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <ProjectList projects={projects} />
      </div>
    </div>
  );
} 