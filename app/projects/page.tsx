import SectionTitle from "@/components/ui/SectionTitle";
import { createClient } from "@/lib/server";
import ProjectsFilterSection from "@/components/projects/ProjectsFilterSection";

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
  return (data ?? []).map((project) => {
    const p = project as {
      id: string;
      title: string;
      slug: string;
      summary: string;
      thumbnail_url: string;
      project_tech_links?: { tech_stack?: { name?: string } }[];
    };
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      thumbnail_url: p.thumbnail_url,
      tech_stack: Array.isArray(p.project_tech_links)
        ? p.project_tech_links
            .map((link) => link.tech_stack?.name)
            .filter((name): name is string => !!name)
        : [],
    };
  });
};

const getAllTechStackNames = async (): Promise<string[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tech_stack")
    .select("name")
    .order("name", { ascending: true });
  if (error) return [];
  return (data ?? []).map((item: { name: string }) => item.name);
};

export default async function ProjectsPage() {
  let projects: Project[] = [];
  let techStackNames: string[] = [];
  try {
    [projects, techStackNames] = await Promise.all([
      getProjects(),
      getAllTechStackNames(),
    ]);
  } catch {
    projects = [];
    techStackNames = [];
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
      <SectionTitle title="Projects" />
      <ProjectsFilterSection projects={projects} techStackNames={techStackNames} />
    </div>
  );
} 