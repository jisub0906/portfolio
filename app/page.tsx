import { createClient } from "@/lib/server";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import AboutPreview from "@/components/home/AboutPreview";
import TechStackPreview from "@/components/home/TechStackPreview";
import ContactPreview from "@/components/home/ContactPreview";

// Supabase Project type for ProjectList
interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail_url: string;
  tech_stack: string[];
}

export default async function Home() {
  // Fetch featured projects from Supabase
  const supabase = await createClient();
  const { data: projectsData } = await supabase
    .from("projects")
    .select("id, title, slug, summary, thumbnail_url")
    .eq("is_featured", true)
    .order("display_order", { ascending: true })
    .limit(3);

  let projects: Project[] = [];
  if (projectsData && projectsData.length > 0) {
    const projectIds = projectsData.map((p) => p.id);
    const { data: techLinks } = await supabase
      .from("project_tech_links")
      .select("project_id, tech_stack!inner(name)")
      .in("project_id", projectIds);
    const techMap: Record<string, string[]> = {};
    if (techLinks) {
      for (const link of techLinks) {
        if (!techMap[link.project_id]) techMap[link.project_id] = [];
        if (Array.isArray(link.tech_stack)) {
          for (const tech of link.tech_stack) {
            if (tech?.name) techMap[link.project_id].push(tech.name);
          }
        }
      }
    }
    projects = projectsData.map((p) => ({
      ...p,
      tech_stack: techMap[p.id] || [],
    }));
  }

  // 주요 기술 아이콘 및 라벨 정보 (DB에서 동적으로 가져오기)
  const { data: skillsData } = await supabase
    .from("tech_stack")
    .select("name, icon_url")
    .limit(5);

  const skills = Array.isArray(skillsData)
    ? skillsData.map((s) => ({ name: s.name, icon: s.icon_url }))
    : [];

  return (
    <main>
      <HeroSection />
      <FeaturedProjects projects={projects} />
      <AboutPreview />
      <TechStackPreview skills={skills} />
      <ContactPreview />
    </main>
  );
}
