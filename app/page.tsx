import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectList from "@/components/ProjectList";
import { createClient } from "@/lib/server";
import AnimatedSection from "@/components/home/AnimatedSection";

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

  // 주요 기술 아이콘 및 라벨 정보
  const skills = [
    { name: "Next.js", icon: "/icons/nextjs.svg" },
    { name: "React", icon: "/icons/react.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "Supabase", icon: "/icons/supabase.svg" },
    { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
  ];

  return (
    <main>
      {/* Hero Section */}
      <AnimatedSection
        className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center items-center px-4"
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
        }}
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 text-slate-900 dark:text-slate-100">
            웹 개발자 지섭입니다. <br className="hidden md:block" />아이디어를 현실로 만드는 코드를 작성합니다.
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            끊임없는 학습과 도전을 통해 사용자에게 가치 있는 웹 경험을 제공하고자 합니다.
          </p>
          <div className="flex justify-center w-full">
            <Link href="/projects">
              <Button variant="default" size="lg">
                내 프로젝트 보기
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Projects Section */}
      <AnimatedSection className="w-full max-w-6xl mx-auto px-4 py-20">
        <SectionTitle
          title="주요 프로젝트"
          subtitle="제가 참여하고 개발한 대표적인 프로젝트들입니다."
        />
        <div className="mt-10">
          <ProjectList projects={projects} />
        </div>
      </AnimatedSection>

      {/* About Me Teaser Section */}
      <AnimatedSection className="w-full bg-muted/60 py-20 px-4">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <SectionTitle
            title="저에 대하여"
            subtitle="끊임없이 성장하는 개발자입니다."
          />
          <p className="mt-8 text-lg text-muted-foreground text-center">
            저는 N년차 웹 개발자로, 사용자 중심의 인터랙티브한 웹 애플리케이션 개발에 열정을 가지고 있습니다.<br className="hidden md:block" />
            최신 기술을 배우고 적용하는 것을 즐기며, 팀과의 협업을 통해 더 나은 결과를 만들어내는 데 보람을 느낍니다.
          </p>
          <div className="flex justify-center mt-8 w-full">
            <Link href="/about">
              <Button variant="outline" size="lg">
                더 알아보기
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Key Skills Section */}
      <AnimatedSection className="w-full py-20 px-4">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <SectionTitle
            title="핵심 기술"
            subtitle="제가 주로 사용하는 기술들입니다."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-8 w-full">
            {skills.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center w-24">
                {skill.icon ? (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="mb-2"
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-slate-200 rounded mb-2 text-xs text-slate-500">
                    {skill.name}
                  </div>
                )}
                <span className="text-sm font-medium text-center break-keep">{skill.name}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10 w-full">
            <Link href="/skills">
              <Button variant="outline" size="lg">
                모든 기술 보기
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Get in Touch Section */}
      <AnimatedSection className="w-full py-20 px-4 bg-gradient-to-b from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <SectionTitle
            title="함께 일하고 싶으신가요?"
            subtitle="언제든지 편하게 연락주세요."
          />
          <p className="mt-8 text-lg text-muted-foreground text-center">
            새로운 프로젝트, 협업 기회, 또는 커피 한 잔의 대화도 환영합니다.
          </p>
          <div className="flex justify-center mt-8 w-full">
            <Link href="/contact">
              <Button variant="default" size="lg">
                문의하기
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
